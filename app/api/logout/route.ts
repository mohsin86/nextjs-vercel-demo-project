// File: app/api/logout/route.ts
// This API route handles user logout by clearing the JWT token cookie.
// It is called from the userAuthMiddleware when the user's token is invalid or when they try to access unauthorized routes.

import { NextResponse } from 'next/server';

export async function POST() {
  const res = NextResponse.json({ message: 'Logged out' });

  // clear cookie
  res.cookies.set('token', '', {
    httpOnly: true,
    expires: new Date(0),
    path: '/',
  });

  return res;
}