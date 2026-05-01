// File: proxy.ts
// This file defines a proxy function that acts as a middleware for various routes in the Next.js application.
// It handles rate limiting for API routes, user authentication for dashboard and user-profile routes, and admin route protection.
// It also includes logging for all requests.

import { NextRequest, NextResponse } from 'next/server';
import { authMiddleware } from './middleware/auth';
import { rateLimitMiddleware } from './middleware/rateLimit';
import { userAuthMiddleware } from './middleware/userAuth';
import { loggerMiddleware } from './middleware/logger';

export async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // -------------------------
  // 1. Rate limit API routes
  // -------------------------
  if (path.startsWith('/api')) {
    const rateLimitResponse = await rateLimitMiddleware(req);

    if (rateLimitResponse) {
      return rateLimitResponse;
    }
  }
/*
  // -------------------------
  // 2. API authentication
  // -------------------------
  if (path.startsWith('/api')) {
    const authResponse = await authMiddleware(req);

     if (authResponse) {
      return authResponse;
     }
  }
*/
  // -------------------------
  // 3. User authentication
  // dashboard/user-profile
  // -------------------------
  if (
    path.startsWith('/backend') ||
    path.startsWith('/user-profile')
  ) {
    const userResponse = await userAuthMiddleware(req);

    if (userResponse) {
      return userResponse;
    }
  }

  // -------------------------
  // 4. Admin route protection
  // -------------------------
  if (path.startsWith('/admin')) {
    const role = req.cookies.get('role');

    if (role?.value !== 'admin') {
      return NextResponse.redirect(
        new URL('/unauthorized', req.url)
      );
    }
  }

  // -------------------------
  // 5. Logging
  // -------------------------
  loggerMiddleware(req);

  return NextResponse.next();
}

export const config = {
  matcher: [
    //'/api/:path*',
    '/backend/:path*',
    '/user-profile/:path*'
  ],
};