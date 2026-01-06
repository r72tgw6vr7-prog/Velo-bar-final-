import { z } from 'zod';
import validator from 'validator';
import { checkRateLimit } from './middleware/rateLimiter.js';
import { csrfProtection } from './middleware/csrfProtection.js';
import { applyCors } from './utils/cors.js';

// Runtime type validation schema
const bookingSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  email: z.string().email('Invalid email format'),
  phone: z.string().regex(/^[\d\s\-\+\(\)]+$/, 'Invalid phone format'),
  date: z.string().refine(
    (val) => {
      const selectedDate = new Date(val);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return !Number.isNaN(selectedDate.getTime()) && selectedDate >= today;
    },
    { message: 'Please select a future date' },
  ),
  time: z.string().min(1, 'Time is required'),
  guests: z.number().int().min(1).max(20).default(1).or(z.string().transform(Number)),
  specialRequests: z.string().max(1000, 'Special requests too long').optional().default(''),
});

export default async function handler(req, res) {
  // Apply dynamic allowlist CORS with credentials support
  if (!applyCors(req, res)) return;

  if (req.method !== 'POST') {
    res.status(405).json({ success: false, error: 'Method not allowed' });
    return;
  }

  // Rate limiting (lower limit for bookings) - support async when KV is enabled
  {
    const rl = checkRateLimit(req, res, { max: 10, windowMs: 15 * 60 * 1000 });
    if (rl && typeof rl.then === 'function') {
      const ok = await rl;
      if (!ok) return; // already responded
    } else if (!rl) {
      return; // Response already sent by rate limiter
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
    // Runtime type validation with Zod
    const validatedData = bookingSchema.parse(req.body || {});

    // Input sanitization to prevent XSS
    const sanitizedData = {
      name: validator.escape(validatedData.name.trim()),
      email: validator.normalizeEmail(validatedData.email) || validatedData.email,
      phone: validator.escape(validatedData.phone.trim()),
      date: validatedData.date,
      time: validator.escape(validatedData.time.trim()),
      guests:
        typeof validatedData.guests === 'string'
          ? parseInt(validatedData.guests, 10)
          : validatedData.guests,
      specialRequests: validatedData.specialRequests
        ? validator.escape(validatedData.specialRequests.trim())
        : '',
    };

    // Generate booking ID
    const now = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    const bookingId = `MEDUSA-${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}-${Math.floor(1000 + Math.random() * 9000)}`;

    // Optional: notify studio and customer via SendGrid if configured
    const sendgridKey = process.env.SENDGRID_API_KEY || process.env.VITE_SENDGRID_API_KEY;
    const fromEmail = process.env.FROM_EMAIL || process.env.VITE_FROM_EMAIL || 'hallo@velo-bar.com';
    const studioEmail =
      process.env.BOOKING_EMAIL || process.env.VITE_BOOKING_EMAIL || 'hallo@velo-bar.com';

    if (sendgridKey) {
      const sendEmail = async (payload) => {
        const resp = await fetch('https://api.sendgrid.com/v3/mail/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sendgridKey}`,
          },
          body: JSON.stringify(payload),
        });
        if (!resp.ok) {
          const txt = await resp.text().catch(() => '');
          console.error('SendGrid error:', resp.status, txt);
        }
      };

      // Studio notification
      await sendEmail({
        personalizations: [
          { to: [{ email: studioEmail }], subject: `Neue Buchungsanfrage - ${sanitizedData.name}` },
        ],
        from: { email: fromEmail },
        content: [
          {
            type: 'text/plain',
            value: `Booking ID: ${bookingId}\nName: ${sanitizedData.name}\nEmail: ${sanitizedData.email}\nPhone: ${sanitizedData.phone}\nDate: ${sanitizedData.date}\nTime: ${sanitizedData.time}\nGuests: ${sanitizedData.guests}\nRequests: ${sanitizedData.specialRequests}`,
          },
          {
            type: 'text/html',
            value: `<p><strong>Booking ID:</strong> ${bookingId}</p><p><strong>Name:</strong> ${sanitizedData.name}</p><p><strong>Email:</strong> ${sanitizedData.email}</p><p><strong>Phone:</strong> ${sanitizedData.phone}</p><p><strong>Date:</strong> ${sanitizedData.date}</p><p><strong>Time:</strong> ${sanitizedData.time}</p><p><strong>Guests:</strong> ${sanitizedData.guests}</p><p><strong>Requests:</strong> ${sanitizedData.specialRequests || '—'}</p>`,
          },
        ],
      });

      // Customer confirmation
      await sendEmail({
        personalizations: [
          { to: [{ email: sanitizedData.email }], subject: 'Buchungsbestätigung' },
        ],
        from: { email: fromEmail },
        content: [
          {
            type: 'text/plain',
            value: `Ihre Buchungsanfrage ist eingegangen.\nBuchungs-ID: ${bookingId}\nTermin: ${sanitizedData.date} ${sanitizedData.time}`,
          },
          {
            type: 'text/html',
            value: `<p>Ihre Buchungsanfrage ist eingegangen.</p><p><strong>Buchungs-ID:</strong> ${bookingId}</p><p><strong>Termin:</strong> ${sanitizedData.date} ${sanitizedData.time}</p>`,
          },
        ],
      });
    }

    res.status(200).json({
      success: true,
      bookingId,
      message: 'Buchungsanfrage erfolgreich gesendet',
      estimatedResponse: '24 hours',
    });
  } catch (err) {
    console.error('Booking API error:', err);

    // Handle Zod validation errors
    if (err instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: 'VALIDATION_ERROR',
        message: 'Invalid input data',
        details: err.errors.map((e) => ({ field: e.path.join('.'), message: e.message })),
      });
    }

    res
      .status(500)
      .json({ success: false, error: 'SERVER_ERROR', message: 'Internal server error' });
  }
}
