// File: app/api/front/users/[username]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getUserByUsername } from '@/lib/services/user.service';

type params = {
  params?: Promise<{username:string}>
}

export async function GET( req: NextRequest,  { params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;

  if (!username) {
    return NextResponse.json(
      { message: 'Username is required' },
      { status: 400 }
    );
  }

  const user = await getUserByUsername(username);

  return NextResponse.json({
    message: 'User details fetched successfully',
    user,
  });
}