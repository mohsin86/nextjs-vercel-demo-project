import { jwtVerify, SignJWT } from 'jose';

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || 'my_secret_key'
);

// ✅ future-ready role (no hard restriction now)
export type JwtPayload = {
  id: string;
  username: string;
  role: string | null; // 👈 flexible for later ENV upgrade
};

// VERIFY TOKEN
export async function verifyToken(token: string): Promise<JwtPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as JwtPayload;
  } catch {
    return null;
  }
}

// SIGN TOKEN
export async function signJwtToken(payload: JwtPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('1h')
    .sign(secret);
}