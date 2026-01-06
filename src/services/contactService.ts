import validator from 'validator';
import { validateContact, ContactData } from '@/server/validation';
import { csrfFetch } from '@/lib/csrfHelper';

/**
 * Service wrapper for contact submissions.
 * - Validates payload using shared Zod schema
 * - Sanitizes fields to reduce XSS risk
 * - Sends mail via SendGrid when API key present, otherwise POSTs to local `/api/contact`
 */

export async function submitContact(raw: unknown): Promise<{ success: boolean; message?: string }> {
  const validated = validateContact(raw);

  const sanitized: ContactData = {
    name: validator.escape(validated.name.trim()),
    email: validator.normalizeEmail(validated.email) || validated.email,
    phone: validated.phone ? validator.escape(validated.phone.trim()) : '',
    subject: validator.escape(validated.subject.trim()),
    message: validator.escape(validated.message.trim()),
    company: validated.company ? validator.escape(validated.company.trim()) : undefined,
    vatId: validated.vatId ? validator.escape(validated.vatId.trim()) : undefined,
    costCenter: validated.costCenter ? validator.escape(validated.costCenter.trim()) : undefined,
    eventType: validated.eventType ? validator.escape(validated.eventType.trim()) : undefined,
    eventDate: validated.eventDate ? validator.escape(validated.eventDate.trim()) : undefined,
    eventLocation: validated.eventLocation
      ? validator.escape(validated.eventLocation.trim())
      : undefined,
    preferredRegion: validated.preferredRegion
      ? validator.escape(validated.preferredRegion.trim())
      : undefined,
    guestCount: validated.guestCount ? validator.escape(validated.guestCount.trim()) : undefined,
    budget: validated.budget ? validator.escape(validated.budget.trim()) : undefined,
    website: validated.website ? validator.escape(validated.website.trim()) : undefined,
    language: validated.language,
    privacyPolicy: !!validated.privacyPolicy,
  } as ContactData;

  const sendgridKey = process.env.SENDGRID_API_KEY || process.env.VITE_SENDGRID_API_KEY;
  const fromEmail = process.env.FROM_EMAIL || process.env.VITE_FROM_EMAIL || 'hallo@velo-bar.com';
  const contactEmail =
    process.env.CONTACT_EMAIL || process.env.VITE_CONTACT_EMAIL || 'hallo@velo-bar.com';

  if (sendgridKey) {
    const payload = {
      personalizations: [
        {
          to: [{ email: contactEmail }],
          subject: `${sanitized.language === 'EN' ? 'New Contact Request' : 'Neue Kontaktanfrage'}: ${sanitized.subject}`,
        },
      ],
      from: { email: fromEmail },
      content: [
        {
          type: 'text/plain',
          value: `${sanitized.name} <${sanitized.email}>\n\n${sanitized.message}`,
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
      throw new Error(`SendGrid error: ${resp.status} ${txt}`);
    }

    return { success: true, message: 'Email sent' };
  }

  // If no SendGrid key, forward to local API route with CSRF protection (browser only)
  if (typeof window !== 'undefined') {
    const r = await csrfFetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify(sanitized),
    });
    if (!r.ok) {
      const txt = await r.text().catch(() => '');
      throw new Error(`Local API error: ${r.status} ${txt}`);
    }
    return { success: true, message: 'Forwarded to API' };
  }

  // Server-side fallback: simply log and return success (avoid crashing without a mailer)
  // TODO: wire a DB or notification channel here
  // eslint-disable-next-line no-console
  if (process.env.NODE_ENV === 'development') {
    console.warn('No mailer configured; contact submission validated but not sent.');
  }
  return { success: true, message: 'Validated (no mailer configured)' };
}

export default { submitContact };
