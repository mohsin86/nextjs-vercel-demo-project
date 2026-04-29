// /api/users/:id/:name
// for [id]/[name] → multiple dynamic params

import { NextResponse } from 'next/server';

type Params = {
  params: {
    id: string;
    name: string;
  };
};

export async function GET(
  req: Request,
  { params }: Params
) {
  const { id, name } = params;

  return NextResponse.json({
    message: 'User details fetched successfully',
    id,
    name,
  });
}