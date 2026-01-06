import { z } from 'zod';
import validator from 'validator';
import { checkRateLimit } from './middleware/rateLimiter.js';
import { csrfProtection } from './middleware/csrfProtection.js';
import { applyCors } from './utils/cors.js';

const expressQuoteSchema = z.object({
  email: z.string().email('Invalid email format'),
  type: z.literal('express_quote').optional(),
});

export default async function handler(req, res) {
  if (!applyCors(req, res)) return;

  if (req.method !== 'POST') {
    res.status(405).json({ success: false, error: 'Method not allowed' });
    return;
  }

  // Rate limiting - stricter for this simple endpoint
  {
    const rl = checkRateLimit(req, res, { max: 10, windowMs: 15 * 60 * 1000 });
    if (rl && typeof rl.then === 'function') {
      const ok = await rl;
      if (!ok) return;
    } else if (!rl) {
      return;
    }
  }

  // CSRF protection (supports async when KV is enabled)
  {
    const csrfCheck = csrfProtection(req, res);
    if (csrfCheck && typeof csrfCheck.then === 'function') {
      const v = await csrfCheck;
      if (!v.valid) return;
    } else if (!csrfCheck.valid) {
      return; // Response already sent by CSRF protection
    }
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const validated = expressQuoteSchema.parse(body);
    const sanitizedEmail = validator.normalizeEmail(validated.email) || validated.email;

    // Log for monitoring (in production, send to CRM/email service)
    console.log('[Express Quote Request]', {
      email: sanitizedEmail,
      timestamp: new Date().toISOString(),
      ip: req.headers['x-forwarded-for'] || req.socket?.remoteAddress,
    });

    // In production: integrate with email service (e.g., Resend, SendGrid)
    // await sendExpressQuoteNotification(sanitizedEmail);

    res.status(200).json({
      success: true,
      message: 'Express quote request received',
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: error.errors.map((e) => e.message),
      });
      return;
    }

    console.error('[Express Quote Error]', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
}
