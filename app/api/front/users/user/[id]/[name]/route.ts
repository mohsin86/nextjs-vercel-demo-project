// /api/users/:id/:name
// for [id]/[name] → multiple dynamic params

import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; name: string }> }
) {
  const { id, name } = await params;

  return NextResponse.json({
    message: 'User details fetched successfully',
    id,
    name,
  });
}