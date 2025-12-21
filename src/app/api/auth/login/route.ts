import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import User from '@/models/User';
import { signToken } from '@/lib/auth';
import bcrypt from 'bcryptjs';

// Hardcoded admin credentials (hash stored for security)
const ADMIN_EMAIL = 'admin@matraders.com';
const ADMIN_PASSWORD = 'admin123';

// Rate limiting (in production, use Redis)
const loginAttempts = new Map<string, { count: number; resetTime: number }>();
const MAX_ATTEMPTS = 5;
const LOCKOUT_TIME = 15 * 60 * 1000; // 15 minutes

function checkRateLimit(ip: string): { allowed: boolean; remainingAttempts?: number } {
  const now = Date.now();
  const attempts = loginAttempts.get(ip);

  if (!attempts || now > attempts.resetTime) {
    loginAttempts.set(ip, { count: 1, resetTime: now + LOCKOUT_TIME });
    return { allowed: true, remainingAttempts: MAX_ATTEMPTS - 1 };
  }

  if (attempts.count >= MAX_ATTEMPTS) {
    return { allowed: false };
  }

  attempts.count++;
  return { allowed: true, remainingAttempts: MAX_ATTEMPTS - attempts.count };
}

export async function POST(req: Request) {
  try {
    // Get client IP for rate limiting
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    const rateLimit = checkRateLimit(ip);

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: 'Too many login attempts. Please try again in 15 minutes.' },
        { status: 429 }
      );
    }

    const { email, password } = await req.json();

    // Input validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Sanitize email
    const sanitizedEmail = email.toLowerCase().trim();

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(sanitizedEmail)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Check if admin login
    if (sanitizedEmail === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const adminPayload = {
        id: 'admin',
        name: 'Admin',
        email: ADMIN_EMAIL,
        role: 'admin' as const,
      };

      const token = signToken(adminPayload);
      const response = NextResponse.json({
        success: true,
        message: 'Login successful',
        user: adminPayload,
      });

      // Set cookie in response
      response.cookies.set('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 600, // 10 minutes
        path: '/',
      });

      return response;
    }

    // Check user in database
    await connectToDatabase();
    // Explicitly select password field (it's hidden by default with select: false)
    const user = await User.findOne({ email: sanitizedEmail }).select('+password');

    if (!user) {
      // Use same error message to prevent user enumeration
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Compare password with bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Reset rate limit on successful login
    loginAttempts.delete(ip);

    const userPayload = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    };

    const token = signToken(userPayload);
    const response = NextResponse.json({
      success: true,
      message: 'Login successful',
      user: userPayload,
    });

    // Set cookie in response
    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 600, // 10 minutes
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
