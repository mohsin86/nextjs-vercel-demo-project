import { NextRequest, NextResponse } from 'next/server';

export function adminAuthMiddleware(req: NextRequest) {
  const role = req.cookies.get('role');

  if (role?.value !== 'admin') {
    return NextResponse.redirect(
      new URL('/unauthorized', req.url)
    );
  }

  return null;
}