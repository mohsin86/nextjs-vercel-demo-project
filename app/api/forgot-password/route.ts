import { NextResponse } from 'next/server';
import crypto from 'crypto';

import { prisma } from '@/lib/db-instance/prisma';
import nodemailer from 'nodemailer';



export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ message: 'Email is required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { message: 'If email exists, reset link will be sent' },
        { status: 200 }
      );
    }

    // 🔐 create token
    const token = crypto.randomBytes(32).toString('hex');
    const expiry = new Date(Date.now() + 1000 * 60 * 15); // 15 min

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    await prisma.user.update({
      where: { email },
      data: {
        resetToken: hashedToken,
        resetTokenExpiry: expiry,
      },
    });

    // 📩 send email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}&email=${email}`;

    await transporter.sendMail({
      from: `"Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Password Reset Request',
      html: `
        <h2>Password Reset Request</h2>
        <p>Hello ${user.firstName},</p>
        <p>Click below to reset your password. Expires in <strong>15 minutes</strong>.</p>
        <a href="${resetUrl}" style="padding:10px 20px;background:#4F46E5;color:white;border-radius:5px;text-decoration:none;">
          Reset Password
        </a>
        <p>If you didn't request this, ignore this email.</p>
      `,
    });

    return NextResponse.json({ message: 'Reset email sent' }, { status: 200 });

  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}