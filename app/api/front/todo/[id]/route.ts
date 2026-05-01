// File: app/api/front/todo/[id]/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db-instance/prisma';

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params; // 🔥 MUST await

  const { completed } = await req.json();

  if (!id) {
    return NextResponse.json(
      { message: 'Todo ID is required' },
      { status: 400 }
    );
  }

  const updated = await prisma.todo.update({
    where: { id },
    data: { completed },
  });

  return NextResponse.json(updated);
}