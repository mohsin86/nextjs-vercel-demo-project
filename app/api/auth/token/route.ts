import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function GET() {
  const token = await new SignJWT({ purpose: 'register' })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('5m') // expires in 5 minutes
    .sign(secret);

  return NextResponse.json({ token });
}