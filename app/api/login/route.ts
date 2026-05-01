// File: app/api/login/route.ts
// This file defines the API route for user login in the Next.js application. It handles POST requests to authenticate users by verifying their credentials against the database, generating a JWT token upon successful authentication, and setting it as an HTTP-only cookie in the response.

import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/db-instance/prisma';
import { signJwtToken } from '@/lib/auth-edge';


const SECRET = process.env.JWT_SECRET || 'my_secret_key';

export async function POST(req: Request) {
  try {
    console.log('Login API called');

    const { username, password } = await req.json();

    // 🔍 Find user in DB (username OR email login optional)
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { username },
          { email: username },
        ],
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    // 🔐 Check password hash
    const isPasswordValid = await bcrypt.compare(
      password,
      user.password!
    );

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // 🎟️ Create JWT
    // const token = jwt.sign(
    //   {
    //     id: user.id,
    //     username: user.username,
    //     role: user.role,
    //   },
    //   SECRET,
    //   { expiresIn: '1h' }
    // );
    const token = await signJwtToken({
      id: user.id,
      username: user.username,
      role: user.role,
    });

    const response = NextResponse.json({
      message: 'Login successful',
      role: user.role,
    });

    // 🍪 Set cookie
    response.cookies.set('token', token, {
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    return response;

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Server error' },
      { status: 500 }
    );
  }
}