import { NextRequest, NextResponse } from 'next/server';
import { isAdminConfigured, issueAdminToken, verifyAdminPassword } from '@/app/lib/admin-auth';

const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 8;

// Per-instance throttle. Enough for a single-container deployment; a multi-
// instance setup would need shared state.
const attempts = new Map<string, { count: number; resetAt: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = attempts.get(ip);

  if (!entry || entry.resetAt < now) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    if (attempts.size > 1000) {
      for (const [key, value] of attempts) {
        if (value.resetAt < now) attempts.delete(key);
      }
    }
    return false;
  }

  entry.count += 1;
  return entry.count > MAX_ATTEMPTS;
}

export async function POST(request: NextRequest) {
  if (!isAdminConfigured()) {
    return NextResponse.json({
      success: false,
      error: 'Admin login is not configured on this server',
    }, { status: 503 });
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown';
  if (rateLimited(ip)) {
    return NextResponse.json({
      success: false,
      error: '로그인 시도가 너무 많습니다. 잠시 후 다시 시도해 주세요.',
    }, { status: 429 });
  }

  try {
    const { password } = await request.json();

    if (!verifyAdminPassword(password)) {
      return NextResponse.json({
        success: false,
        error: 'Invalid password',
      }, { status: 401 });
    }

    return NextResponse.json({
      success: true,
      token: issueAdminToken(),
    });
  } catch {
    return NextResponse.json({
      success: false,
      error: 'Server error',
    }, { status: 500 });
  }
}
