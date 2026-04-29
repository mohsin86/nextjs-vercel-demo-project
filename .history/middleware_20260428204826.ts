// middleware.ts

import { NextRequest, NextResponse } from 'next/server';
import { authMiddleware } from './middleware/auth';
import { rateLimitMiddleware } from './middleware/rateLimit';
import { userAuthMiddleware } from './middleware/userAuth';
import { loggerMiddleware } from './middleware/logger';

export async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;

  // 1. Rate limiting
  // Rate limit for API routes
  if (path.startsWith('/api')) {
    const rateLimitResponse = await rateLimitMiddleware(req);
    if (rateLimitResponse) return rateLimitResponse;
  }

  if (path.startsWith('/api')) {
    const authResponse = await authMiddleware(req);
    if (authResponse) {
        return authResponse;
    }
  }

  // 2. Authentication check


   // User dashboard routes
  if (path.startsWith('/dashboard')) {
   const userResponse = await userAuthMiddleware(req);
   if (userResponse) return userResponse;
  }

  // 3. Admin role protection
  if (path.startsWith('/admin')) {
    const role = req.cookies.get('role');

    if (role?.value !== 'admin') {
      return NextResponse.redirect(
        new URL('/unauthorized', req.url)
      );
    }
  }

  // 4. Logging / preprocessing
  loggerMiddleware(req);

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/api/:path*',
    '/dashboard/:path*',
    '/admin/:path*',
  ],
};