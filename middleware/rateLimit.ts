import { NextRequest, NextResponse } from 'next/server';

export async function rateLimitMiddleware(req: NextRequest) {
  // pseudo logic
  const exceeded = false;

  if (exceeded) {
    return NextResponse.json(
      { message: 'Too many requests' },
      { status: 429 }
    );
  }

  return null;
}