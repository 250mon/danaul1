import { NextRequest, NextResponse } from 'next/server';
import { writeFile, readFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

interface PopupContent {
  id: string;
  title: string;
  content: string;
  enabled: boolean;
  buttonText?: string;
  buttonAction?: string;
}

const defaultPopupContents: Record<string, PopupContent> = {
  notice: {
    id: 'notice',
    title: '공지사항',
    content: 'x월 xx일(금)~x월 xx일(일) 휴진합니다.\n진료 예약은 전화로 문의해 주세요.',
    enabled: false,
    buttonText: '닫기'
  },
  promo: {
    id: 'promo',
    title: '특별 이벤트',
    content: '...',
    enabled: true,
    buttonText: '예약하기',
    buttonAction: 'contact'
  },
  contact: {
    id: 'contact',
    title: '예약 문의',
    content: '전화: 02-465-9898\n평일: 09:00 - 18:00\n화요일야간: 18:00 - 20:00\n토요일: 09:00 - 13:00',
    enabled: true,
    buttonText: '확인'
  }
};

const DATA_DIR = path.join(process.cwd(), 'data');
const POPUP_FILE = path.join(DATA_DIR, 'popups.json');

// Ensure data directory exists
async function ensureDataDir() {
  if (!existsSync(DATA_DIR)) {
    await mkdir(DATA_DIR, { recursive: true });
  }
}

// Read popup contents from file
async function readPopupContents(): Promise<Record<string, PopupContent>> {
  try {
    await ensureDataDir();
    if (existsSync(POPUP_FILE)) {
      const data = await readFile(POPUP_FILE, 'utf-8');
      return JSON.parse(data);
    }
    return defaultPopupContents;
  } catch {
    return defaultPopupContents;
  }
}

// Write popup contents to file
async function writePopupContents(contents: Record<string, PopupContent>) {
  try {
    await ensureDataDir();
    await writeFile(POPUP_FILE, JSON.stringify(contents, null, 2));
  } catch (error) {
    console.error('Failed to write popup contents:', error);
    throw error;
  }
}

// Verify admin token (simple check - in production use proper JWT validation)
function verifyAdminToken(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return false;
  }
  
  const token = authHeader.substring(7);
  // Simple token validation - in production, use proper JWT verification
  return token.startsWith('admin_');
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
        error: 'Unauthorized' 
      }, { status: 401 });
    }

    const { contents } = await request.json();
    
    if (!contents) {
      return NextResponse.json({ 
        success: false, 
        error: 'Invalid request body' 
      }, { status: 400 });
    }

    await writePopupContents(contents);
    
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to update popup contents' 
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