import { NextRequest, NextResponse } from 'next/server';
import { authMiddleware } from './middleware/auth';
import { rateLimitMiddleware } from './middleware/rateLimit';
import { loggerMiddleware } from './middleware/logger';

export async function middleware(req: NextRequest) {
  // rate limiting
  const rateLimitResponse = await rateLimitMiddleware(req);
  if (rateLimitResponse) return rateLimitResponse;

  // auth check
  const authResponse = await authMiddleware(req);
  if (authResponse) return authResponse;

  // logging / preprocessing
  loggerMiddleware(req);

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*', '/dashboard/:path*'],
};