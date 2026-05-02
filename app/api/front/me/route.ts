import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db-instance/prisma';
import { verifyToken } from '@/lib/auth-edge';

export async function GET(req: Request) {
  try {
    // 1. Get token from cookies
    const cookieHeader = req.headers.get('cookie') || '';
    const token = cookieHeader
      .split('; ')
      .find((c) => c.startsWith('token='))
      ?.split('=')[1];

    if (!token) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    // 2. Verify JWT
    const decoded = await verifyToken(token);

    if (!decoded) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    // 3. Fetch fresh user from DB
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        username: true,
        firstName: true,
        middleName: true,
        lastName: true,
        email: true,
        role: true,
      },
    });

    if (!user) {
      return NextResponse.json({ user: null }, { status: 404 });
    }

    // 4. Format response
    return NextResponse.json({
      user: {
        username: user.username,
        fullName: `${user.firstName || ''} ${user.middleName || ''} ${user.lastName || ''}`.trim(),
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ user: null }, { status: 500 });
  }
}