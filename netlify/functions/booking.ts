import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';
import { z } from 'zod';
import { sendBookingEmail } from '../../src/lib/api/sendBookingEmail';
import { bookingPayloadSchema, type BookingPayload } from '../../src/lib/api/types';
import { validateCsrfToken } from '../../src/lib/api/csrf';
import { logger } from '../../src/lib/logger';
import { checkBookingRateLimits, recordRateLimitFailure } from '../../src/lib/api/rateLimiter';

function formatZodErrors(error: z.ZodError): string {
  return error.issues.map((e) => `${e.path.join('.')}: ${e.message}`).join(', ');
}

function getClientIp(event: HandlerEvent): string {
  const forwarded = event.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.trim()) {
    const parts = forwarded.split(',');
    return parts[parts.length - 1].trim();
  }
  return event.headers['client-ip'] || 'unknown';
}

export const handler: Handler = async (event: HandlerEvent, _context: HandlerContext) => {
  // Build headers dynamically based on allowed origins to tighten CORS
  const allowedEnv = process.env.ALLOWED_ORIGINS || process.env.VITE_ALLOWED_ORIGINS || '';
  const allowedOrigins = allowedEnv ? allowedEnv.split(',').map((s) => s.trim()) : [];
  const origin = event.headers?.origin;

  const headers: Record<string, string> = {
    'Access-Control-Allow-Headers': 'Content-Type, X-CSRF-Token',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (origin && allowedOrigins.length && allowedOrigins.includes(origin)) {
    headers['Access-Control-Allow-Origin'] = origin;
    headers['Vary'] = 'Origin';
  }

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ ok: false, error: 'Method not allowed' }),
    };
  }

  const ip = getClientIp(event);

  // Validate CSRF token from header, body, or cookie
  const headerCsrf = event.headers['x-csrf-token'];
  const cookieHeader = event.headers['cookie'] || '';
  const cookies = Object.fromEntries(
    cookieHeader.split(';').map((c) => {
      const [k, ...v] = c.trim().split('=');
      return [k, v.join('=')];
    }),
  );
  const bodyCsrf =
    event.body && typeof event.body === 'object' && 'csrfToken' in event.body
      ? String((event.body as Record<string, unknown>).csrfToken)
      : undefined;

  const csrfValid = validateCsrfToken(
    () => headerCsrf || bodyCsrf,
    (name) => cookies[name],
  );
  if (!csrfValid) {
    logger.security('CSRF validation failed', { ip, path: event.path });
    return {
      statusCode: 403,
      headers,
      body: JSON.stringify({ ok: false, error: 'CSRF_VALIDATION_FAILED' }),
    };
  }

  let body: unknown;
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ ok: false, error: 'Invalid JSON body' }),
    };
  }

  const parsed = bookingPayloadSchema.safeParse(body);
  if (!parsed.success) {
    logger.security('Booking validation failed', {
      ip,
      errors: parsed.error.issues.map((i) => i.path.join('.')),
    });
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({
        ok: false,
        error: 'Validation failed',
        details: formatZodErrors(parsed.error),
      }),
    };
  }

  // Rate limiting by IP and email to stop automated abuse
  const limitCheck = checkBookingRateLimits(ip, parsed.data.customerEmail);
  if (!limitCheck.allowed) {
    logger.security('Rate limit exceeded', { ip, key: limitCheck.key, path: event.path });
    recordRateLimitFailure(limitCheck.key);
    return {
      statusCode: 429,
      headers,
      body: JSON.stringify({ ok: false, error: 'Too many requests. Please try again later.' }),
    };
  }

  if (parsed.data.website) {
    logger.security('Honeypot triggered', { ip, email: parsed.data.customerEmail });
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ ok: false, error: 'Validation failed' }),
    };
  }

  const data = parsed.data as BookingPayload;

  try {
    await sendBookingEmail(data);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        ok: true,
        message: 'Booking request submitted successfully',
      }),
    };
  } catch (error) {
    logger.error('Email sending error', error, { ip, path: event.path });
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        ok: false,
        error: 'Email service error',
      }),
    };
  }
};
