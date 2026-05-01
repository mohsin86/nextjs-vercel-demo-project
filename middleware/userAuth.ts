import { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth-edge';
import { logout } from '@/lib/logout/logout';

export async function userAuthMiddleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  console.log('userAuthMiddleware token:', token);

  if (!token) {
    return logout(req);
  }

  try {
    const decoded = await verifyToken(token);
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