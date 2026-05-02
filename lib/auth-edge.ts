// file: lib/auth-edge.ts
// This file contains utility functions for handling JWT authentication in a Next.js application. It provides functions to verify and sign JWT tokens using the 'jose' library. The verifyToken function checks the validity of a token and returns the decoded payload if valid, while the signJwtToken function creates a new JWT token with a specified payload and expiration time. These functions are used in API routes and frontend components to manage user authentication and session handling.

import { jwtVerify, SignJWT } from 'jose';

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || 'my_secret_key'
);

// VERIFY TOKEN (simple)
export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as {
      id: string;
      username: string;
      role: string;
    };
  } catch {
    return null; // invalid / expired
  }
}

//  SIGN TOKEN (simple)
export async function signJwtToken(payload: {
  id: string;
  username: string;
  role: string;
}) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('1h')
    .sign(secret);
}