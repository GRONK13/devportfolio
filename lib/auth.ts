import { SignJWT, jwtVerify } from 'jose';
import crypto from 'crypto';

const JWT_SECRET = new TextEncoder().encode(process.env.ADMIN_JWT_SECRET || '');
const PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || '';

export async function verifyPassword(password: string): Promise<boolean> {
  const hash = crypto.createHash('sha256').update(password).digest('hex');
  return hash === PASSWORD_HASH;
}

export async function createToken(): Promise<string> {
  return new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('2h')
    .sign(JWT_SECRET);
}

export async function verifyToken(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}
