// file: middleware/userAuth.ts
// This middleware function is designed to protect routes in a Next.js application by verifying the presence and validity of a JWT token in the request cookies. It checks if the token exists and is valid, and then verifies the user's role to ensure they have the appropriate permissions for accessing certain routes (e.g., admin routes). If the token is missing, invalid, or the user does not have the required role, the middleware will trigger a logout action, effectively preventing unauthorized access to protected routes.\

import { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth-edge';
import { logout } from '@/lib/logout/logout';

export async function userAuthMiddleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  if (!token) {
    return logout(req);
  }

  try {
    const decoded = await verifyToken(token);

    if (!decoded) {
      return logout(req);
    }

    const path = req.nextUrl.pathname;

    // ADMIN route protection
    if (path.startsWith('/backend') && decoded.role !== 'ADMIN') {
      return logout(req);
    }

    // USER route protection
    if (path.startsWith('/user-profile') && decoded.role !== 'USER') {
      return logout(req);
    }

    return null;
  } catch (error) {
    console.log('JWT ERROR:', error);
    return logout(req);
  }
}