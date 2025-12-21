import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

// Validate required environment variables
if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is not set. Please add it to .env.local');
}

if (process.env.NODE_ENV === 'production' && process.env.JWT_SECRET === 'ma-traders-super-secret-jwt-key-2024') {
  console.warn('WARNING: Using default JWT_SECRET in production. Please change it!');
}

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRY = process.env.JWT_EXPIRY || '600s'; // 10 minutes default
const COOKIE_MAX_AGE = 600; // 10 minutes in seconds

export interface JWTPayload {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

/**
 * Sign a JWT token with user payload
 */
export function signToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET as string, {
    expiresIn: JWT_EXPIRY,
  });
}

/**
 * Verify and decode JWT token
 */
export function verifyToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    return decoded;
  } catch (error) {
    // Don't log details in production to avoid exposing sensitive info
    if (process.env.NODE_ENV === 'development') {
      console.error('JWT verification failed:', error);
    }
    return null;
  }
}

/**
 * Set auth cookie in response
 */
export async function setAuthCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set('auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: COOKIE_MAX_AGE,
    path: '/',
  });
}

/**
 * Get token from cookies
 */
export async function getAuthToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token');
  return token?.value || null;
}

/**
 * Clear auth cookie
 */
export async function clearAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete('auth_token');
}

/**
 * Get user from request (cookie or header)
 */
export async function getUserFromRequest(req: Request): Promise<JWTPayload | null> {
  // Try cookie first
  const cookieStore = await cookies();
  let token = cookieStore.get('auth_token')?.value;

  // Fallback to Authorization header
  if (!token) {
    const authHeader = req.headers.get('authorization');
    if (authHeader?.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    }
  }

  if (!token) return null;

  return verifyToken(token);
}
