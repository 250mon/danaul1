import { NextRequest, NextResponse } from 'next/server';
import { createClient } from 'redis';
import { PopupContent, defaultPopupContents } from '@/app/lib/data';
import { verifyAdminRequest } from '@/app/lib/admin-auth';
import fs from 'fs/promises';
import path from 'path';

const POPUP_CONTENTS_KEY = 'popup_contents';
const STORAGE_FILE = process.env.POPUP_STORAGE_FILE || path.join(process.cwd(), 'popups-config.json');

// Create Redis client
function createRedisClient() {
  const redis = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379',
    // Add authentication if needed
    ...(process.env.REDIS_PASSWORD && { password: process.env.REDIS_PASSWORD }),
    socket: {
      connectTimeout: 5000, // 5 second timeout
    }
  });
  
  return redis;
}

// Read popup contents from Redis or local file
async function readPopupContents(): Promise<Record<string, PopupContent>> {
  // Try Redis first if configured
  if (process.env.REDIS_URL) {
    let redis;
    try {
      redis = createRedisClient();
      await redis.connect();
      const data = await redis.get(POPUP_CONTENTS_KEY);
      if (data) return JSON.parse(data);
    } catch (err) {
      console.error('Error reading from Redis:', err);
    } finally {
      if (redis) await redis.disconnect();
    }
  }

  // Fallback to local file in development or if Redis fails
  try {
    const data = await fs.readFile(STORAGE_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    // If file doesn't exist, use defaults
    return defaultPopupContents;
  }
}

// Write popup contents to Redis or local file
async function writePopupContents(contents: Record<string, PopupContent>) {
  // Write to Redis if configured
  if (process.env.REDIS_URL) {
    let redis;
    try {
      redis = createRedisClient();
      await redis.connect();
      await redis.set(POPUP_CONTENTS_KEY, JSON.stringify(contents));
      return;
    } catch (err) {
      console.error('Failed to write to Redis:', err);
      // Fall through to file write as backup
    } finally {
      if (redis) await redis.disconnect();
    }
  }

  // Always write to local file as backup/development storage
  try {
    await fs.writeFile(STORAGE_FILE, JSON.stringify(contents, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to write to local storage file:', err);
    throw err;
  }
}

const MAX_POPUPS = 12;
const FIELD_LIMITS = { title: 200, content: 4000, buttonText: 60, buttonAction: 40 } as const;

// Anything persisted here is rendered on the public site, so accept only the
// PopupContent shape and reject oversized payloads.
function validateContents(value: unknown): Record<string, PopupContent> | null {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) return null;

  const entries = Object.entries(value as Record<string, unknown>);
  if (entries.length === 0 || entries.length > MAX_POPUPS) return null;

  const validated: Record<string, PopupContent> = {};

  for (const [key, raw] of entries) {
    if (!/^[a-z0-9_-]{1,40}$/i.test(key)) return null;
    if (typeof raw !== 'object' || raw === null || Array.isArray(raw)) return null;

    const popup = raw as Record<string, unknown>;
    if (popup.id !== key) return null;
    if (typeof popup.title !== 'string' || popup.title.length > FIELD_LIMITS.title) return null;
    if (typeof popup.content !== 'string' || popup.content.length > FIELD_LIMITS.content) return null;
    if (typeof popup.enabled !== 'boolean') return null;
    if (popup.buttonText !== undefined &&
        (typeof popup.buttonText !== 'string' || popup.buttonText.length > FIELD_LIMITS.buttonText)) return null;
    if (popup.buttonAction !== undefined &&
        (typeof popup.buttonAction !== 'string' || popup.buttonAction.length > FIELD_LIMITS.buttonAction)) return null;

    validated[key] = {
      id: key,
      title: popup.title,
      content: popup.content,
      enabled: popup.enabled,
      ...(popup.buttonText !== undefined && { buttonText: popup.buttonText as string }),
      ...(popup.buttonAction !== undefined && { buttonAction: popup.buttonAction as string }),
    };
  }

  return validated;
}

// GET: Fetch popup contents
export async function GET() {
  try {
    const contents = await readPopupContents();
    return NextResponse.json({ success: true, contents });
  } catch {
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to fetch popup contents' 
    }, { status: 500 });
  }
}

// PUT: Update popup contents (admin only)
export async function PUT(request: NextRequest) {
  try {
    // Verify admin authentication
    if (!verifyAdminRequest(request)) {
      return NextResponse.json({ 
        success: false, 
        error: 'Unauthorized - invalid or missing admin token' 
      }, { status: 401 });
    }

    const requestBody = await request.json();
    const contents = validateContents(requestBody?.contents);
    
    if (!contents) {
      return NextResponse.json({ 
        success: false, 
        error: 'Invalid request body - contents must be a valid popup map' 
      }, { status: 400 });
    }

    await writePopupContents(contents);
    
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Error in PUT /api/admin/popups:', err);
    return NextResponse.json({ 
      success: false, 
      error: `Failed to update popup contents: ${err instanceof Error ? err.message : 'Unknown error'}` 
    }, { status: 500 });
  }
}

// POST: Reset to defaults (admin only)
export async function POST(request: NextRequest) {
  try {
    // Verify admin authentication
    if (!verifyAdminRequest(request)) {
      return NextResponse.json({ 
        success: false, 
        error: 'Unauthorized' 
      }, { status: 401 });
    }

    await writePopupContents(defaultPopupContents);
    
    return NextResponse.json({ 
      success: true, 
      contents: defaultPopupContents 
    });
  } catch {
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to reset popup contents' 
    }, { status: 500 });
  }
}
