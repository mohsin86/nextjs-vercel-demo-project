// file: app/api/backend/users/route.ts

import { NextResponse } from 'next/server';
import { createUser, getAllUsers, getUsersForDropdown, getUser } from '@/lib/services/user.service';


export async function GET(req?: Request) {
   // safe default if no req
  const url = req ? new URL(req.url) : null;
  const type = url?.searchParams.get('type');

  if (type === 'dropdown') {
    const users = await getUsersForDropdown();
    return NextResponse.json(users);
  }

  // default response
  const users = await getAllUsers();
  return NextResponse.json(users);
}

export async function POST(req: Request) {
  const body = await req.json();

  const user = await createUser(body);

  return NextResponse.json(user);
}
