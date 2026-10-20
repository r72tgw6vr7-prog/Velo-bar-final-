import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';
import { generateCsrfToken, signCsrfToken, createCsrfCookieValue } from '../../src/lib/api/csrf';

function getAllowedOrigin(event: HandlerEvent): string | null {
  const allowedEnv = process.env.ALLOWED_ORIGINS || process.env.VITE_ALLOWED_ORIGINS || '';
  const allowedOrigins = allowedEnv
    ? allowedEnv
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
    : [];
  const origin = event.headers?.origin;
  if (origin && allowedOrigins.includes(origin)) return origin;
  return null;
}

export const handler: Handler = async (event: HandlerEvent, _context: HandlerContext) => {
  const allowedOrigin = getAllowedOrigin(event);
  const headers: Record<string, string> = {
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Credentials': 'true',
    'Content-Type': 'application/json',
  };

  if (allowedOrigin) {
    headers['Access-Control-Allow-Origin'] = allowedOrigin;
    headers['Vary'] = 'Origin';
  }

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ ok: false, error: 'Method not allowed' }),
    };
  }

  try {
    const payload = generateCsrfToken();
    const signedToken = signCsrfToken(payload);

    headers['Set-Cookie'] = createCsrfCookieValue(signedToken);
    headers['Cache-Control'] = 'no-store, no-cache, must-revalidate, proxy-revalidate';
    headers['Pragma'] = 'no-cache';

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        ok: true,
        success: true,
        csrfToken: signedToken,
      }),
    };
  } catch (error) {
    console.error('CSRF token generation error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ ok: false, error: 'Failed to generate CSRF token' }),
    };
  }
};
