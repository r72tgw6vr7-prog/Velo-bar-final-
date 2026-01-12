import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';
import { z } from 'zod';
import { sendBookingEmail } from '../../src/lib/api/sendBookingEmail';
import { bookingPayloadSchema, type BookingPayload } from '../../src/lib/api/types';

// Basic in-memory rate limiter for Netlify function
const RATE_LIMIT_MAX = Number(process.env.RATE_LIMIT_MAX || process.env.VITE_RATE_LIMIT_MAX || 30);
const RATE_LIMIT_WINDOW = Number(process.env.RATE_LIMIT_WINDOW || process.env.VITE_RATE_LIMIT_WINDOW || 600); // seconds
const rateLimitStore = new Map<string, { count: number; first: number }>();
function checkRateLimit(key: string) {
  const now = Date.now();
  const entry = rateLimitStore.get(key) || { count: 0, first: now };
  if (now - entry.first > RATE_LIMIT_WINDOW * 1000) {
    entry.count = 0;
    entry.first = now;
  }
  entry.count += 1;
  rateLimitStore.set(key, entry);
  return entry.count <= RATE_LIMIT_MAX;
}

function formatZodErrors(error: z.ZodError): string {
  return error.issues.map((e) => `${e.path.join('.')}: ${e.message}`).join(', ');
}

export const handler: Handler = async (event: HandlerEvent, _context: HandlerContext) => {
  // Build headers dynamically based on allowed origins to tighten CORS
  const allowedEnv = process.env.ALLOWED_ORIGINS || process.env.VITE_ALLOWED_ORIGINS || '';
  const allowedOrigins = allowedEnv ? allowedEnv.split(',').map((s) => s.trim()) : [];
  const origin = event.headers?.origin;

  const headers: Record<string, string> = {
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (origin && allowedOrigins.length && allowedOrigins.includes(origin)) {
    headers['Access-Control-Allow-Origin'] = origin;
    headers['Vary'] = 'Origin';
  } else if (allowedOrigins.length === 1) {
    headers['Access-Control-Allow-Origin'] = allowedOrigins[0];
  }


  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  // Gentle rate limiting to protect endpoints from abuse
  const ip = event.headers['x-forwarded-for'] || event.headers['client-ip'] || 'unknown';
  const key = `booking:${ip}`;
  if (!checkRateLimit(key)) {
    return {
      statusCode: 429,
      headers,
      body: JSON.stringify({ ok: false, error: 'Too many requests. Please try again later.' }),
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ ok: false, error: 'Method not allowed' }),
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
    console.error('Email sending error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        ok: false,
        error: error instanceof Error ? error.message : 'Email service error',
      }),
    };
  }
};
