import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'my_secret_key';

export async function userAuthMiddleware(
  req: NextRequest
) {
  const token = req.cookies.get('token')?.value;
  
  console.log('userAuthMiddleware processing , token:', token);
  
  if (!token) {
    return NextResponse.redirect(
      new URL('/login', req.url)
    );
  }

  try {
    console.log('decodeding:');
    const decoded = jwt.verify(token, SECRET) as {
      username: string;
      role: string;
    };

   

 console.log('decoded: ', decoded);
    
    const path = req.nextUrl.pathname;

    // admin -> dashboard only
    if (
      path.startsWith('/dashboard') &&
      decoded.role !== 'admin'
    ) {
      return NextResponse.redirect(
        new URL('/user-profile', req.url)
      );
    }

    // normal user -> user-profile only
    if (
      path.startsWith('/user-profile') &&
      decoded.role !== 'user'
    ) {
      return NextResponse.redirect(
        new URL('/dashboard', req.url)
      );
    }

    return null;
  } catch (error) {
      console.log('JWT ERROR:', error);
    return NextResponse.redirect(
      new URL('/login', req.url)
    );
  }
}