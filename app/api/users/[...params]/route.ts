import { NextRequest } from 'next/server';

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ params: string[] }> }
) {
  const { params } = await context.params;

  return Response.json({
    allParams: params
  });
}