import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    
    // Check password against server-side environment variable
    const adminPassword = process.env.ADMIN_PASSWORD || 'danaul2024';
    
    if (password === adminPassword) {
      // Generate a simple session token (in production, use JWT or proper session management)
      const sessionToken = Buffer.from(`admin_${Date.now()}`).toString('base64');
      
      return NextResponse.json({ 
        success: true, 
        token: sessionToken 
      });
    } else {
      return NextResponse.json({ 
        success: false, 
        error: 'Invalid password' 
      }, { status: 401 });
    }
  } catch {
    return NextResponse.json({ 
      success: false, 
      error: 'Server error' 
    }, { status: 500 });
  }
} 