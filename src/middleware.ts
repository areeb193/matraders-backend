import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get token from cookie (just check existence, verification happens in API routes)
  const hasAuthToken = !!request.cookies.get('auth_token')?.value;

  // Protect admin routes - redirect to login if no auth token
  if (pathname.startsWith('/backendadmin') || pathname.startsWith('/admin')) {
    if (!hasAuthToken) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Note: We can't verify JWT role in Edge Runtime middleware
  // Role-based access control is handled in the layout components
  
  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|login|register).*)',
  ],
};
