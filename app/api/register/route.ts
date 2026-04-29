import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

import { prisma } from '@/lib/db-instance/prisma'
import { userRegisterSchema } from '@/lib/userRegisterSchema';

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function POST(req: Request) {
  try {
    // 🔐 verify JWT from Authorization header
    const authHeader = req.headers.get('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];

    try {
      await jwtVerify(token, secret);
    } catch {
      return NextResponse.json({ message: 'Invalid or expired token' }, { status: 401 });
    }

    const body = await req.json();

    // 🔥 ZOD VALIDATION
    const result = userRegisterSchema.safeParse(body);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        fieldErrors[String(err.path[0])] = err.message;
      });
      return NextResponse.json(
        { message: 'Validation failed', errors: fieldErrors },
        { status: 422 }
      );
    }

    // 🔍 check duplicate
    const existing = await prisma.user.findFirst({
      where: {
        OR: [
          { email: result.data.email },
          { phone: result.data.phone },
        ],
      },
    });

    if (existing) {
      return NextResponse.json(
        {
          message: 'User already exists',
          errors: {
            email: existing.email === result.data.email ? 'Email already taken' : '',
            phone: existing.phone === result.data.phone ? 'Phone already taken' : '',
          },
        },
        { status: 409 }
      );
    }

    // 💾 SAVE TO DB
    const user = await prisma.user.create({
      data: {
        firstName:  result.data.firstName,
        middleName: result.data.middleName,
        lastName:   result.data.lastName,
        email:      result.data.email,
        phone:      result.data.phone,
        address:    result.data.address,
        gender:     result.data.gender,
        jobType:    result.data.jobType,
        hobbies:    result.data.hobbies,
      },
    });

    return NextResponse.json(
      { message: 'Registered successfully!', userId: user.id },
      { status: 201 }
    );

  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}