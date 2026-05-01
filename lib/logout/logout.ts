// File: lib/logout/logout.ts
// This function handles user logout by clearing the JWT token cookie.


import { NextRequest, NextResponse } from 'next/server';

export function logout(request: NextRequest) {
  const response = NextResponse.redirect(
    new URL('/login', request.url)
  );

  // Clear the token cookie by setting it to an empty value and expiring it immediately
  response.cookies.set('token', '', {
    httpOnly: true,
    path: '/',
    expires: new Date(0),
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });

  // Also clear the role cookie if it exists
  response.cookies.set('role', '', {
    path: '/',
    expires: new Date(0),
  });

  return response;
}