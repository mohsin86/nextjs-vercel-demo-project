import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'my_secret_key';

export async function POST(req: Request) {
    console.log('Login API called');
  const { username, password } = await req.json();

  // Fake users
  let role = '';

  if (username === 'admin' && password === '123456') {
    role = 'admin';
  } else if (username === 'user' && password === '123456') {
    role = 'user';
  } else {
    return NextResponse.json(
      { message: 'Invalid credentials' },
      { status: 401 }
    );
  }

  const token = jwt.sign(
    {
      username,
      role,
    },
    SECRET,
    {
      expiresIn: '1h',
    }
  );

  const response = NextResponse.json({
    message: 'Login successful',
    role,
  });

  response.cookies.set('token', token, {
    httpOnly: true,
    path: '/',
    secure: false, // true in production HTTPS
  });

   console.log(response);

  return response;
}