import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import User from '@/models/User';
import { signToken, setAuthCookie } from '@/lib/auth';

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
      await setAuthCookie(token);

      return NextResponse.json({
        user: adminPayload,
        token,
      });
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
    await setAuthCookie(token);

    return NextResponse.json({
      user: userPayload,
      token,
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
