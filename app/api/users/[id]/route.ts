import { NextResponse } from 'next/server';

type Params = {
  params: Promise<{ id: string }>;
};

// GET /api/users/:id
export async function GET(req: Request, { params }: Params) {
  const { id } = await params;
  return NextResponse.json({ message: `Fetching user with ID: ${id}` });
}

// POST /api/users/:id
export async function POST(req: Request, { params }: Params) {
  const { id } = await params;
  const body = await req.json();
  return NextResponse.json({ message: `Creating data for user ID: ${id}`, data: body }, { status: 201 });
}

// PUT /api/users/:id
export async function PUT(req: Request, { params }: Params) {
  const { id } = await params;
  const body = await req.json();
  return NextResponse.json({ message: `Updating user with ID: ${id}`, updatedData: body });
}

// DELETE /api/users/:id
export async function DELETE(req: Request, { params }: Params) {
  const { id } = await params;
  return NextResponse.json({ message: `Deleting user with ID: ${id}` });
}