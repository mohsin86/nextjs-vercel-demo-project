import { NextRequest, NextResponse } from 'next/server';

export function authMiddleware(req: NextRequest) {
  // Get API key from headers
  const headerApiKey = req.headers.get('apikey');

  // Get API key from query params
  const queryApiKey =
    req.nextUrl.searchParams.get('apiKey');

  const validApiKey = process.env.API_KEY;

  if (
    (!headerApiKey && !queryApiKey) ||
    (headerApiKey !== validApiKey &&
      queryApiKey !== validApiKey)
  ) {
    return NextResponse.json(
      {
        message: 'Unauthorized',
      },
      {
        status: 401,
      }
    );
  }

  return null;
}