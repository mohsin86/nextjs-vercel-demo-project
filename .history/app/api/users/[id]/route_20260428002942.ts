import { NextResponse } from 'next/server';

type Params = {
  params: {
    id: string;
  };
};

export async function GET(
  req: Request,
  { params }: Params
) {
  const { id } = params;

  return NextResponse.json({
    message: `Fetching user with ID: ${id}`,
  });
}