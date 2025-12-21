import { NextRequest, NextResponse } from 'next/server';
import { createClient } from 'redis';
import { PopupContent, defaultPopupContents } from '@/app/lib/data';
import fs from 'fs/promises';
import path from 'path';

const POPUP_CONTENTS_KEY = 'popup_contents';
const STORAGE_FILE = path.join(process.cwd(), 'popups-config.json');

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

// Verify admin token (simple check - in production use proper JWT validation)
function verifyAdminToken(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return false;
  }
  
  const token = authHeader.substring(7);
  
  try {
    // Decode base64 token
    const decodedToken = Buffer.from(token, 'base64').toString('utf-8');
    
    // Simple token validation - in production, use proper JWT verification
    const isValid = decodedToken.startsWith('admin_');
    
    return isValid;
  } catch {
    return false;
  }
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
    if (!verifyAdminToken(request)) {
      return NextResponse.json({ 
        success: false, 
        error: 'Unauthorized - invalid or missing admin token' 
      }, { status: 401 });
    }

    const requestBody = await request.json();
    const { contents } = requestBody;
    
    if (!contents) {
      return NextResponse.json({ 
        success: false, 
        error: 'Invalid request body - contents field is required' 
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
    if (!verifyAdminToken(request)) {
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