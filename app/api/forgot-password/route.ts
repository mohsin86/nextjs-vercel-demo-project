import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { PrismaClient } from '@/generated/prisma'
import nodemailer from 'nodemailer';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { email } = await req.json();

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return NextResponse.json(
      { message: 'If email exists, reset link sent' },
      { status: 200 }
    );
  }

  // 🔐 create token
  const token = crypto.randomBytes(32).toString('hex');
  const expiry = new Date(Date.now() + 1000 * 60 * 15); // 15 min

  // store HASHED token (security best practice)
  const hashedToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');

  await prisma.user.update({
    where: { email },
    data: {
      resetToken: hashedToken,
      resetTokenExpiry: expiry,
    },
  });

  // 📩 email setup
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const resetUrl = `http://localhost:3000/reset-password?token=${token}&email=${email}`;

  await transporter.sendMail({
    to: email,
    subject: 'Password Reset',
    html: `
      <h2>Password Reset Request</h2>
      <p>Click below to reset password:</p>
      <a href="${resetUrl}">Reset Password</a>
    `,
  });

  return NextResponse.json({ message: 'Reset email sent' });
}