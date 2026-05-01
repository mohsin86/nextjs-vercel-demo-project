// file: app/api/backend/users/[id]/route.ts


import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db-instance/prisma';
import { userUpdateSchema } from '@/lib/zod/userUpdateSchema';


export async function GET( req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params; // ✅ IMPORTANT FIX

    if (!id) {
      return NextResponse.json(
        { message: 'Missing user id' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Server error' },
      { status: 500 }
    );
  }
}

export async function PUT( req: Request, { params }:  { params: Promise<{ id: string }> }) {
  try {
    const body = await req.json();
    const { id } = await params; 

    // ✅ Validate partial input
    const parsed = userUpdateSchema.safeParse(body);

    if (!parsed.success) {
      const errors: Record<string, string> = {};

      parsed.error.issues.forEach((err) => {
        errors[String(err.path[0])] = err.message;
      });

      return NextResponse.json(
        { message: 'Validation failed', errors },
        { status: 422 }
      );
    }

    // ✅ Remove undefined fields
    const cleanedData = Object.fromEntries(
      Object.entries(parsed.data).filter(([_, v]) => v !== undefined)
    );

    // Prevent empty update
    if (Object.keys(cleanedData).length === 0) {
      return NextResponse.json(
        { message: 'No data to update' },
        { status: 400 }
      );
    }

    // 🔒 Optional: prevent email/username change
    delete cleanedData.email;
    delete cleanedData.username;

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id },
      data: cleanedData,
    });

    return NextResponse.json({
      message: 'User updated successfully',
      user: updatedUser,
    });

  } catch (error) {
    console.error('Update error:', error);

    return NextResponse.json(
      { message: 'Update failed' },
      { status: 500 }
    );
  }
}