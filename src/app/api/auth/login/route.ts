import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import User from '@/models/User';
import { signToken } from '@/lib/auth';

// Hardcoded admin credentials
const ADMIN_EMAIL = 'admin@matraders.com';
const ADMIN_PASSWORD = 'admin123';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Check if admin login
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
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
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user || user.password !== password) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

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
