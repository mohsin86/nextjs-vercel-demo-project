// File: app/api/users/index.ts
// Note: api should not be tsx, otherwise it will be treated as route handler and cause type error

import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    message: 'Fetching users',
  });
}

export async function POST(req: Request) {
  const body = await req.json();

  return NextResponse.json(
    {
      message: 'User created',
      data: body,
    },
    { status: 201 }
  );
}

export async function PUT(req: Request) {
  const body = await req.json();

  return NextResponse.json({
    message: 'User updated',
    data: body,
  });
}

export async function DELETE() {
  return NextResponse.json({
    message: 'User deleted',
  });
}