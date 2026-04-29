import { NextRequest } from 'next/server';

export function loggerMiddleware(req: NextRequest) {
  console.log(`${req.method} ${req.nextUrl.pathname}`);
}