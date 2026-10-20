import crypto from 'node:crypto';

const CSRF_TOKEN_TTL_MS = 60 * 60 * 1000; // 1 hour
const CSRF_COOKIE_NAME = 'XSRF-TOKEN';
const CSRF_HEADER_NAME = 'x-csrf-token';

export interface CsrfTokenPayload {
  token: string;
  expiresAt: number;
}

function getSecret(): string {
  const secret = process.env.CSRF_SECRET;
  if (!secret) {
    throw new Error('CSRF_SECRET environment variable is not configured');
  }
  return secret;
}

export function generateCsrfToken(): CsrfTokenPayload {
  const random = crypto.randomBytes(32).toString('base64url');
  const expiresAt = Date.now() + CSRF_TOKEN_TTL_MS;
  const payload: CsrfTokenPayload = { token: random, expiresAt };
  return payload;
}

export function signCsrfToken(payload: CsrfTokenPayload): string {
  const data = JSON.stringify(payload);
  const signature = crypto.createHmac('sha256', getSecret()).update(data).digest('base64url');
  return `${Buffer.from(data).toString('base64url')}.${signature}`;
}

export function verifyCsrfToken(signedToken: string): CsrfTokenPayload | null {
  try {
    const [encodedPayload, signature] = signedToken.split('.');
    if (!encodedPayload || !signature) return null;

    const data = Buffer.from(encodedPayload, 'base64url').toString('utf-8');
    const expectedSignature = crypto
      .createHmac('sha256', getSecret())
      .update(data)
      .digest('base64url');

    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
      return null;
    }

    const payload = JSON.parse(data) as CsrfTokenPayload;
    if (typeof payload.token !== 'string' || typeof payload.expiresAt !== 'number') {
      return null;
    }

    if (Date.now() > payload.expiresAt) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export function createCsrfCookieValue(token: string): string {
  const maxAge = Math.floor(CSRF_TOKEN_TTL_MS / 1000);
  return `${CSRF_COOKIE_NAME}=${encodeURIComponent(token)}; Path=/; Max-Age=${maxAge}; SameSite=Strict; Secure; HttpOnly=false`;
}

export function getCsrfTokenFromRequest(
  getHeader: (name: string) => string | string[] | undefined,
  getCookie: (name: string) => string | undefined,
): string | null {
  const headerValue = getHeader(CSRF_HEADER_NAME);
  const header = Array.isArray(headerValue) ? headerValue[0] : headerValue;
  return header || getCookie(CSRF_COOKIE_NAME) || null;
}

export function validateCsrfToken(
  getHeader: (name: string) => string | string[] | undefined,
  getCookie: (name: string) => string | undefined,
): boolean {
  const token = getCsrfTokenFromRequest(getHeader, getCookie);
  if (!token) return false;
  return verifyCsrfToken(token) !== null;
}
