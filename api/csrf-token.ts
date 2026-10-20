import type { VercelRequest, VercelResponse } from '@vercel/node';
import crypto from 'node:crypto';

const CSRF_TOKEN_TTL_MS = 60 * 60 * 1000;
const CSRF_COOKIE_NAME = 'XSRF-TOKEN';

function getSecret(): string {
  const secret = process.env.CSRF_SECRET;
  if (!secret) {
    throw new Error('CSRF_SECRET environment variable is not configured');
  }
  return secret;
}

function generateCsrfToken(): { token: string; expiresAt: number } {
  const random = crypto.randomBytes(32).toString('base64url');
  const expiresAt = Date.now() + CSRF_TOKEN_TTL_MS;
  return { token: random, expiresAt };
}

function signCsrfToken(payload: { token: string; expiresAt: number }): string {
  const data = JSON.stringify(payload);
  const signature = crypto.createHmac('sha256', getSecret()).update(data).digest('base64url');
  return `${Buffer.from(data).toString('base64url')}.${signature}`;
}

function createCsrfCookieValue(token: string): string {
  const maxAge = Math.floor(CSRF_TOKEN_TTL_MS / 1000);
  return `${CSRF_COOKIE_NAME}=${encodeURIComponent(token)}; Path=/; Max-Age=${maxAge}; SameSite=Strict; Secure`;
}

function getAllowedOrigin(req: VercelRequest): string | null {
  const allowedEnv = process.env.ALLOWED_ORIGINS || process.env.VITE_ALLOWED_ORIGINS || '';
  const allowedOrigins = allowedEnv
    ? allowedEnv
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
    : [];
  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) return origin;
  return null;
}

export default function handler(req: VercelRequest, res: VercelResponse): void {
  const allowedOrigin = getAllowedOrigin(req);
  if (allowedOrigin) {
    res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method !== 'GET') {
    res.status(405).json({ ok: false, error: 'Method not allowed' });
    return;
  }

  try {
    const payload = generateCsrfToken();
    const signedToken = signCsrfToken(payload);

    res.setHeader('Set-Cookie', createCsrfCookieValue(signedToken));
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');

    res.status(200).json({
      ok: true,
      success: true,
      csrfToken: signedToken,
    });
  } catch (error) {
    console.error('CSRF token generation error:', error);
    res.status(500).json({ ok: false, error: 'Failed to generate CSRF token' });
  }
}
