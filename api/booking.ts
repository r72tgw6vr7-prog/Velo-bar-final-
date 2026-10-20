import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';
import nodemailer from 'nodemailer';
import crypto from 'node:crypto';

// ═════════════════════════════════════════════════════════════════════════════
// Self-contained booking handler — inlined helpers to avoid Vercel bundling
// issues with cross-directory TypeScript imports.
// ═════════════════════════════════════════════════════════════════════════════

// ── Logger ──────────────────────────────────────────────────────────────────
function serializeError(error: unknown): Record<string, unknown> {
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      stack: process.env.NODE_ENV === 'production' ? undefined : error.stack,
    };
  }
  return { value: error };
}

function log(level: string, message: string, context: Record<string, unknown> = {}): void {
  const entry = {
    level,
    message,
    timestamp: new Date().toISOString(),
    service: 'velo-bar',
    env: process.env.NODE_ENV || 'development',
    ...context,
  };

  if (process.env.NODE_ENV === 'production' || process.env.VERCEL === '1') {
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(entry));
  } else {
    // eslint-disable-next-line no-console
    console.log(`[${entry.level}] ${entry.message}`, context);
  }
}

const logger = {
  info: (message: string, context?: Record<string, unknown>) => log('info', message, context),
  warn: (message: string, context?: Record<string, unknown>) => log('warn', message, context),
  error: (message: string, error?: unknown, context?: Record<string, unknown>) =>
    log('error', message, { ...context, error: error ? serializeError(error) : undefined }),
  security: (message: string, context?: Record<string, unknown>) => log('security', message, context),
};

// ── CSRF ────────────────────────────────────────────────────────────────────
const CSRF_COOKIE_NAME = 'XSRF-TOKEN';
const CSRF_HEADER_NAME = 'x-csrf-token';

function getCsrfSecret(): string {
  const secret = process.env.CSRF_SECRET;
  if (!secret) {
    throw new Error('CSRF_SECRET environment variable is not configured');
  }
  return secret;
}

function verifyCsrfToken(signedToken: string): boolean {
  try {
    const [encodedPayload, signature] = signedToken.split('.');
    if (!encodedPayload || !signature) return false;

    const data = Buffer.from(encodedPayload, 'base64url').toString('utf-8');
    const expectedSignature = crypto
      .createHmac('sha256', getCsrfSecret())
      .update(data)
      .digest('base64url');

    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
      return false;
    }

    const payload = JSON.parse(data) as { token: string; expiresAt: number };
    if (typeof payload.token !== 'string' || typeof payload.expiresAt !== 'number') {
      return false;
    }

    return Date.now() <= payload.expiresAt;
  } catch {
    return false;
  }
}

function getCsrfTokenFromRequest(
  getHeader: (name: string) => string | string[] | undefined,
  getCookie: (name: string) => string | undefined,
): string | null {
  const headerValue = getHeader(CSRF_HEADER_NAME);
  const header = Array.isArray(headerValue) ? headerValue[0] : headerValue;
  return header || getCookie(CSRF_COOKIE_NAME) || null;
}

function validateCsrfToken(
  getHeader: (name: string) => string | string[] | undefined,
  getCookie: (name: string) => string | undefined,
): boolean {
  const token = getCsrfTokenFromRequest(getHeader, getCookie);
  if (!token) return false;
  return verifyCsrfToken(token);
}

// ── Rate limiting ───────────────────────────────────────────────────────────
interface RateLimitEntry {
  count: number;
  first: number;
  consecutiveFailures: number;
}

const store = new Map<string, RateLimitEntry>();
const RATE_LIMIT_MAX = Number(process.env.RATE_LIMIT_MAX || 30);
const RATE_LIMIT_WINDOW_MS = Number(process.env.RATE_LIMIT_WINDOW || 600) * 1000;
const RATE_LIMIT_BACKOFF_MAX_MS = 60 * 60 * 1000;

function rateLimitCleanup(now: number): void {
  for (const [key, entry] of store.entries()) {
    if (now - entry.first > RATE_LIMIT_WINDOW_MS * 4) {
      store.delete(key);
    }
  }
}

function checkRateLimit(key: string, max?: number, windowMs?: number): boolean {
  const now = Date.now();
  const limit = max ?? RATE_LIMIT_MAX;
  const window = windowMs ?? RATE_LIMIT_WINDOW_MS;

  if (Math.random() < 0.01) {
    rateLimitCleanup(now);
  }

  const entry = store.get(key) || { count: 0, first: now, consecutiveFailures: 0 };

  if (now - entry.first > window) {
    entry.count = 0;
    entry.first = now;
  }

  const backoffMs = Math.min(
    RATE_LIMIT_BACKOFF_MAX_MS,
    Math.pow(2, entry.consecutiveFailures) * 1000,
  );
  if (now - entry.first < backoffMs && entry.count >= limit) {
    return false;
  }

  entry.count += 1;

  if (entry.count > limit) {
    entry.consecutiveFailures += 1;
    store.set(key, entry);
    return false;
  }

  entry.consecutiveFailures = Math.max(0, entry.consecutiveFailures - 1);
  store.set(key, entry);
  return true;
}

function recordRateLimitFailure(key: string): void {
  const entry = store.get(key);
  if (entry) {
    entry.consecutiveFailures += 1;
    store.set(key, entry);
  }
}

function checkBookingRateLimits(
  ip: string,
  email: string,
): { allowed: true } | { allowed: false; key: string } {
  const ipKey = `ip:${ip}`;
  const emailKey = `email:${email.toLowerCase()}`;

  if (!checkRateLimit(ipKey)) {
    return { allowed: false, key: ipKey };
  }

  if (!checkRateLimit(emailKey, 10, RATE_LIMIT_WINDOW_MS)) {
    return { allowed: false, key: emailKey };
  }

  return { allowed: true };
}

// ── Booking handler ─────────────────────────────────────────────────────────
function escapeHtml(value: string | undefined | null): string {
  if (value == null) return '';
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getClientIp(req: VercelRequest): string {
  const vercelIp = req.headers['x-vercel-forwarded-for'];
  if (typeof vercelIp === 'string' && vercelIp.trim()) {
    return vercelIp.split(',')[0].trim();
  }

  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.trim()) {
    const parts = forwarded.split(',');
    return parts[parts.length - 1].trim();
  }

  if (Array.isArray(forwarded) && forwarded.length > 0) {
    const last = forwarded[forwarded.length - 1];
    return last.split(',').pop()?.trim() || last;
  }

  return (req.socket && (req.socket.remoteAddress || 'unknown')) || 'unknown';
}

const STRING_MAX = 5000;

const bookingPayloadSchema = z.object({
  location: z.enum(['munich', 'coburg']),
  eventType: z.enum(['corporate', 'wedding', 'birthday', 'christmas', 'other']),
  guestCount: z.string().min(1).max(50),
  eventDate: z.string().min(1).max(100),
  company: z.string().min(1).max(200),
  customerName: z.string().min(1).max(200),
  customerEmail: z.string().email().max(200),
  phone: z.string().max(50).optional(),
  vatId: z.string().max(50).optional(),
  costCenter: z.string().max(100).optional(),
  message: z.string().max(STRING_MAX).optional(),
  source: z.string().max(500).optional(),
  website: z.string().max(100).optional(),
});

type BookingPayload = z.infer<typeof bookingPayloadSchema>;

const LOCATION_LABELS: Record<string, string> = {
  munich: 'München',
  coburg: 'Coburg',
};

const EVENT_TYPE_LABELS: Record<string, string> = {
  corporate: 'Firmenevent',
  wedding: 'Hochzeit',
  birthday: 'Geburtstag',
  christmas: 'Weihnachtsfeier',
  other: 'Sonstiges',
};

function generateInternalHtml(data: BookingPayload): string {
  const locationLabel = escapeHtml(LOCATION_LABELS[data.location] || data.location);
  const eventTypeLabel = escapeHtml(EVENT_TYPE_LABELS[data.eventType] || data.eventType);
  const company = escapeHtml(data.company);
  const customerName = escapeHtml(data.customerName);
  const customerEmail = escapeHtml(data.customerEmail);
  const phone = escapeHtml(data.phone);
  const guestCount = escapeHtml(data.guestCount);
  const eventDate = escapeHtml(data.eventDate);
  const vatId = escapeHtml(data.vatId);
  const costCenter = escapeHtml(data.costCenter);
  const source = escapeHtml(data.source);
  const message = data.message ? escapeHtml(data.message).replace(/\n/g, '<br>') : '';

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Neue Buchungsanfrage</title>
  <style>
    body { font-family: Arial, sans-serif; background-color: #f5f5f5; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; }
    .header { background: #003141; color: #fff8ec; padding: 24px; text-align: center; }
    .header h1 { margin: 0; font-size: 24px; }
    .content { padding: 24px; }
    .field { margin-bottom: 16px; padding-bottom: 16px; border-bottom: 1px solid #e5e5e5; }
    .field:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
    .label { font-weight: 600; color: #003141; margin-bottom: 4px; font-size: 12px; text-transform: uppercase; }
    .value { color: #333; font-size: 16px; }
    .highlight { background: #ee7868; color: #fff; padding: 4px 8px; border-radius: 4px; display: inline-block; }
    .message-box { background: #f9f9f9; padding: 16px; border-radius: 4px; margin-top: 8px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🍸 Neue Buchungsanfrage</h1>
      <p style="margin: 8px 0 0 0; opacity: 0.9;">Standort: <span class="highlight">${locationLabel}</span></p>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">Unternehmen</div>
        <div class="value">${company}</div>
      </div>
      <div class="field">
        <div class="label">Kontaktperson</div>
        <div class="value">${customerName}</div>
      </div>
      <div class="field">
        <div class="label">E-Mail</div>
        <div class="value"><a href="mailto:${customerEmail}">${customerEmail}</a></div>
      </div>
      ${phone ? `<div class="field"><div class="label">Telefon</div><div class="value"><a href="tel:${phone}">${phone}</a></div></div>` : ''}
      <div class="field">
        <div class="label">Event-Typ</div>
        <div class="value">${eventTypeLabel}</div>
      </div>
      <div class="field">
        <div class="label">Gästeanzahl</div>
        <div class="value">${guestCount} Gäste</div>
      </div>
      <div class="field">
        <div class="label">Wunschtermin</div>
        <div class="value">${eventDate}</div>
      </div>
      ${vatId ? `<div class="field"><div class="label">USt-ID</div><div class="value">${vatId}</div></div>` : ''}
      ${costCenter ? `<div class="field"><div class="label">Kostenstelle</div><div class="value">${costCenter}</div></div>` : ''}
      ${message ? `<div class="field"><div class="label">Nachricht</div><div class="message-box">${message}</div></div>` : ''}
      ${source ? `<div class="field"><div class="label">Quelle</div><div class="value" style="font-size: 12px; color: #666;">${source}</div></div>` : ''}
    </div>
  </div>
</body>
</html>
  `.trim();
}

function generateCustomerHtml(data: BookingPayload): string {
  const locationLabel = escapeHtml(LOCATION_LABELS[data.location] || data.location);
  const eventTypeLabel = escapeHtml(EVENT_TYPE_LABELS[data.eventType] || data.eventType);
  const customerName = escapeHtml(data.customerName);
  const guestCount = escapeHtml(data.guestCount);
  const eventDate = escapeHtml(data.eventDate);

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Buchungsbestätigung - Velo Bar</title>
  <style>
    body { font-family: Arial, sans-serif; background-color: #003141; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: #003141; border: 1px solid #ee7868; border-radius: 8px; }
    .header { background: linear-gradient(135deg, #ee7868, #f08b7d); color: #003141; padding: 32px; text-align: center; }
    .header h1 { margin: 0; font-size: 28px; }
    .content { padding: 32px; color: #fff8ec; }
    .summary { background: rgba(255,248,236,0.1); padding: 20px; border-radius: 8px; margin: 20px 0; }
    .summary-item { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(255,248,236,0.2); }
    .summary-item:last-child { border-bottom: none; }
    .summary-label { color: #ee7868; font-weight: 600; }
    .summary-value { color: #fff8ec; }
    .cta { text-align: center; margin-top: 24px; }
    .cta a { display: inline-block; background: #ee7868; color: #003141; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; }
    .footer { text-align: center; padding: 24px; color: rgba(255,248,236,0.7); font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Vielen Dank für Ihre Anfrage!</h1>
    </div>
    <div class="content">
      <p>Sehr geehrte/r ${customerName},</p>
      <p>wir haben Ihre Buchungsanfrage erhalten und werden uns innerhalb von 24 Stunden bei Ihnen melden.</p>
      <div class="summary">
        <div class="summary-item"><span class="summary-label">Standort</span><span class="summary-value">${locationLabel}</span></div>
        <div class="summary-item"><span class="summary-label">Event-Typ</span><span class="summary-value">${eventTypeLabel}</span></div>
        <div class="summary-item"><span class="summary-label">Gästeanzahl</span><span class="summary-value">${guestCount}</span></div>
        <div class="summary-item"><span class="summary-label">Wunschtermin</span><span class="summary-value">${eventDate}</span></div>
      </div>
      <p>Bei dringenden Fragen erreichen Sie uns telefonisch unter:</p>
      <div class="cta"><a href="tel:+4916094623196">+49 160 9462 3196</a></div>
    </div>
    <div class="footer">
      <p>Velo Bar – Mobile Cocktailbar & Event Catering</p>
      <p>München | Coburg</p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

function formatZodErrors(error: z.ZodError): string {
  return error.issues.map((e) => `${e.path.join('.')}: ${e.message}`).join(', ');
}

async function sendBookingEmail(data: BookingPayload): Promise<void> {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
    throw new Error('Gmail credentials not configured');
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const internalEmail =
    data.location === 'munich'
      ? process.env.BOOKING_TO_MUNICH || 'Muenchen@velo-bar.com'
      : process.env.BOOKING_TO_COBURG || 'coburg@velo-bar.com';

  const fromEmail = process.env.BOOKING_FROM_EMAIL || 'Velo Bar Booking <booking@velo-bar.com>';
  const replyTo = process.env.BOOKING_REPLY_TO_EMAIL || 'booking@velo-bar.com';

  await Promise.all([
    transporter.sendMail({
      from: fromEmail,
      to: internalEmail,
      replyTo: data.customerEmail,
      subject: `Neue Buchungsanfrage: ${data.company} – ${data.eventDate}`,
      html: generateInternalHtml(data),
    }),
    transporter.sendMail({
      from: fromEmail,
      to: data.customerEmail,
      replyTo: replyTo,
      subject: 'Ihre Anfrage bei Velo Bar – Buchungsbestätigung',
      html: generateCustomerHtml(data),
    }),
  ]);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const allowedEnv = process.env.ALLOWED_ORIGINS || process.env.VITE_ALLOWED_ORIGINS || '';
  const allowedOrigins = allowedEnv
    ? allowedEnv
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
    : [];
  const origin = req.headers.origin as string | undefined;
  if (origin && allowedOrigins.length && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-CSRF-Token');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const ip = getClientIp(req);

  const bodyCsrf =
    req.body && typeof req.body === 'object' && 'csrfToken' in req.body
      ? String((req.body as Record<string, unknown>).csrfToken)
      : undefined;
  const csrfValid = validateCsrfToken(
    (name) => req.headers[name.toLowerCase()] || bodyCsrf,
    (name) => {
      const value = req.cookies?.[name];
      return typeof value === 'string' ? value : undefined;
    },
  );
  if (!csrfValid) {
    logger.security('CSRF validation failed', { ip, path: req.url });
    return res.status(403).json({ ok: false, error: 'CSRF_VALIDATION_FAILED' });
  }

  const parsed = bookingPayloadSchema.safeParse(req.body);
  if (!parsed.success) {
    logger.security('Booking validation failed', {
      ip,
      errors: parsed.error.issues.map((i) => i.path.join('.')),
    });
    return res.status(400).json({
      ok: false,
      error: 'Validation failed',
      details: formatZodErrors(parsed.error),
    });
  }

  const limitCheck = checkBookingRateLimits(ip, parsed.data.customerEmail);
  if (!limitCheck.allowed) {
    logger.security('Rate limit exceeded', { ip, key: limitCheck.key, path: req.url });
    recordRateLimitFailure(limitCheck.key);
    return res.status(429).json({ ok: false, error: 'Too many requests. Please try again later.' });
  }

  if (parsed.data.website) {
    logger.security('Honeypot triggered', { ip, email: parsed.data.customerEmail });
    return res.status(400).json({ ok: false, error: 'Validation failed' });
  }

  try {
    await sendBookingEmail(parsed.data);
    return res.status(200).json({
      ok: true,
      message: 'Booking request submitted successfully',
    });
  } catch (error) {
    logger.error('Email sending error', error, { ip, path: req.url });
    return res.status(500).json({
      ok: false,
      error: 'Email service error',
    });
  }
}
