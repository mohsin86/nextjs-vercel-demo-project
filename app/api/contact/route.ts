import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  console.log('Received data on server 22:', body);
  return NextResponse.json(
    {
      message: 'Contact Send',
      data: body,
    },
    { status: 201 }
  );
}