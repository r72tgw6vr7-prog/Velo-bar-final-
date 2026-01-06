import { z } from 'zod';
import validator from 'validator';
import { checkRateLimit } from './middleware/rateLimiter.js';
import { csrfProtection } from './middleware/csrfProtection.js';
import { applyCors } from './utils/cors.js';

// Runtime type validation schema
const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  email: z.string().email('Invalid email format'),
  phone: z
    .string()
    .regex(/^[\d\s\-\+\(\)]+$/, 'Invalid phone format')
    .optional()
    .or(z.literal('')),
  subject: z.string().min(1, 'Subject is required').max(200, 'Subject too long'),
  message: z.string().min(10, 'Message too short').max(2000, 'Message too long'),
  // Corporate / billing fields
  company: z.string().max(200, 'Company name too long').optional().or(z.literal('')),
  vatId: z.string().max(50, 'VAT ID too long').optional().or(z.literal('')),
  costCenter: z.string().max(50, 'Cost center too long').optional().or(z.literal('')),
  // Optional event context fields from the inquiry form
  eventType: z.string().max(200, 'Event type too long').optional().or(z.literal('')),
  eventDate: z.string().max(50, 'Event date too long').optional().or(z.literal('')),
  eventLocation: z.string().max(200, 'Event location too long').optional().or(z.literal('')),
  preferredRegion: z.string().max(50, 'Preferred region too long').optional().or(z.literal('')),
  guestCount: z.string().max(50, 'Guest count too long').optional().or(z.literal('')),
  budget: z.string().max(100, 'Budget too long').optional().or(z.literal('')),
  // Honeypot field to reduce spam (should be empty in legitimate submissions)
  website: z.string().optional().or(z.literal('')),
  language: z.enum(['DE', 'EN']).default('DE'),
  privacyPolicy: z
    .boolean()
    .refine((v) => v === true, { message: 'Privacy policy must be accepted' })
    .optional(),
});

export default async function handler(req, res) {
  if (!applyCors(req, res)) return;

  if (req.method !== 'POST') {
    res.status(405).json({ success: false, error: 'Method not allowed' });
    return;
  }

  // Rate limiting (supports async when KV is enabled)
  {
    const rl = checkRateLimit(req, res, { max: 20, windowMs: 15 * 60 * 1000 });
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
    const validatedData = contactSchema.parse(req.body || {});
    // Honeypot anti-spam: if the 'website' field is filled, treat as bot
    if (
      validatedData.website &&
      typeof validatedData.website === 'string' &&
      validatedData.website.trim() !== ''
    ) {
      // Silently accept to avoid giving bots feedback
      res.status(200).json({ success: true, message: 'Received' });
      return;
    }

    // Input sanitization to prevent XSS
    const sanitizedData = {
      name: validator.escape(validatedData.name.trim()),
      email: validator.normalizeEmail(validatedData.email) || validatedData.email,
      phone: validatedData.phone ? validator.escape(validatedData.phone.trim()) : '',
      subject: validator.escape(validatedData.subject.trim()),
      message: validator.escape(validatedData.message.trim()),
      // Corporate fields
      company: validatedData.company ? validator.escape(validatedData.company.trim()) : '',
      vatId: validatedData.vatId ? validator.escape(validatedData.vatId.trim()) : '',
      costCenter: validatedData.costCenter ? validator.escape(validatedData.costCenter.trim()) : '',
      // Optional event context
      eventType: validatedData.eventType ? validator.escape(validatedData.eventType.trim()) : '',
      eventDate: validatedData.eventDate ? validator.escape(validatedData.eventDate.trim()) : '',
      eventLocation: validatedData.eventLocation
        ? validator.escape(validatedData.eventLocation.trim())
        : '',
      preferredRegion: validatedData.preferredRegion
        ? validator.escape(validatedData.preferredRegion.trim())
        : '',
      guestCount: validatedData.guestCount ? validator.escape(validatedData.guestCount.trim()) : '',
      budget: validatedData.budget ? validator.escape(validatedData.budget.trim()) : '',
      language: validatedData.language,
      privacyPolicy: !!validatedData.privacyPolicy,
    };

    const sendgridKey = process.env.SENDGRID_API_KEY || process.env.VITE_SENDGRID_API_KEY;
    const fromEmail = process.env.FROM_EMAIL || process.env.VITE_FROM_EMAIL || 'hallo@velo-bar.com';
    const contactEmail =
      process.env.CONTACT_EMAIL || process.env.VITE_CONTACT_EMAIL || 'hallo@velo-bar.com';

    if (sendgridKey) {
      const payload = {
        personalizations: [
          {
            to: [{ email: contactEmail }],
            subject: `${sanitizedData.language === 'EN' ? 'New Contact Request' : 'Neue Kontaktanfrage'}: ${sanitizedData.subject}`,
          },
        ],
        from: { email: fromEmail },
        content: [
          {
            type: 'text/plain',
            value:
              `From: ${sanitizedData.name} <${sanitizedData.email}>\n` +
              `Company: ${sanitizedData.company || '—'}\n` +
              `VAT ID: ${sanitizedData.vatId || '—'}\n` +
              `Cost Center: ${sanitizedData.costCenter || '—'}\n` +
              `Phone: ${sanitizedData.phone || '—'}\n` +
              `Event Type: ${sanitizedData.eventType || '—'}\n` +
              `Event Date: ${sanitizedData.eventDate || '—'}\n` +
              `Event Location: ${sanitizedData.eventLocation || '—'}\n` +
              `Preferred Region: ${sanitizedData.preferredRegion || '—'}\n` +
              `Guest Count: ${sanitizedData.guestCount || '—'}\n` +
              `Budget: ${sanitizedData.budget || '—'}\n\n` +
              sanitizedData.message,
          },
          {
            type: 'text/html',
            value:
              `<p><strong>From:</strong> ${sanitizedData.name} &lt;${sanitizedData.email}&gt;</p>` +
              `<p><strong>Company:</strong> ${sanitizedData.company || '—'}</p>` +
              `<p><strong>VAT ID:</strong> ${sanitizedData.vatId || '—'}</p>` +
              `<p><strong>Cost Center:</strong> ${sanitizedData.costCenter || '—'}</p>` +
              `<p><strong>Phone:</strong> ${sanitizedData.phone || '—'}</p>` +
              `<p><strong>Event Type:</strong> ${sanitizedData.eventType || '—'}</p>` +
              `<p><strong>Event Date:</strong> ${sanitizedData.eventDate || '—'}</p>` +
              `<p><strong>Event Location:</strong> ${sanitizedData.eventLocation || '—'}</p>` +
              `<p><strong>Preferred Region:</strong> ${sanitizedData.preferredRegion || '—'}</p>` +
              `<p><strong>Guest Count:</strong> ${sanitizedData.guestCount || '—'}</p>` +
              `<p><strong>Budget:</strong> ${sanitizedData.budget || '—'}</p>` +
              `<p>${sanitizedData.message.replace(/\n/g, '<br/>')}</p>`,
          },
        ],
      };

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
        return res.status(502).json({
          success: false,
          error: 'MAIL_ERROR',
          message: 'Failed to deliver email',
          details: txt ? (typeof txt === 'string' ? txt.slice(0, 200) : '') : undefined,
        });
      }
    }

    res.status(200).json({
      success: true,
      message:
        sanitizedData.language === 'EN'
          ? 'Your message has been sent successfully. We will contact you shortly.'
          : 'Ihre Nachricht wurde erfolgreich gesendet. Wir werden uns in Kürze bei Ihnen melden.',
    });
  } catch (err) {
    console.error('Contact API error:', err);

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
