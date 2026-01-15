import nodemailer from 'nodemailer';
import type { BookingPayload } from './types.ts';

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
  const locationLabel = LOCATION_LABELS[data.location] || data.location;
  const eventTypeLabel = EVENT_TYPE_LABELS[data.eventType] || data.eventType;

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
        <div class="value">${data.company}</div>
      </div>
      <div class="field">
        <div class="label">Kontaktperson</div>
        <div class="value">${data.customerName}</div>
      </div>
      <div class="field">
        <div class="label">E-Mail</div>
        <div class="value"><a href="mailto:${data.customerEmail}">${data.customerEmail}</a></div>
      </div>
      ${data.phone ? `
      <div class="field">
        <div class="label">Telefon</div>
        <div class="value"><a href="tel:${data.phone}">${data.phone}</a></div>
      </div>
      ` : ''}
      <div class="field">
        <div class="label">Event-Typ</div>
        <div class="value">${eventTypeLabel}</div>
      </div>
      <div class="field">
        <div class="label">Gästeanzahl</div>
        <div class="value">${data.guestCount}</div>
      </div>
      <div class="field">
        <div class="label">Wunschtermin</div>
        <div class="value">${data.eventDate}</div>
      </div>
      ${data.vatId ? `
      <div class="field">
        <div class="label">USt-ID</div>
        <div class="value">${data.vatId}</div>
      </div>
      ` : ''}
      ${data.costCenter ? `
      <div class="field">
        <div class="label">Kostenstelle</div>
        <div class="value">${data.costCenter}</div>
      </div>
      ` : ''}
      ${data.message ? `
      <div class="field">
        <div class="label">Nachricht</div>
        <div class="message-box">${data.message.replace(/\n/g, '<br>')}</div>
      </div>
      ` : ''}
      ${data.source ? `
      <div class="field">
        <div class="label">Quelle</div>
        <div class="value" style="font-size: 12px; color: #666;">${data.source}</div>
      </div>
      ` : ''}
    </div>
  </div>
</body>
</html>
  `.trim();
}

function generateCustomerHtml(data: BookingPayload): string {
  const locationLabel = LOCATION_LABELS[data.location] || data.location;
  const eventTypeLabel = EVENT_TYPE_LABELS[data.eventType] || data.eventType;

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
      <p>Sehr geehrte/r ${data.customerName},</p>
      <p>wir haben Ihre Buchungsanfrage erhalten und werden uns innerhalb von 24 Stunden bei Ihnen melden.</p>
      
      <div class="summary">
        <div class="summary-item">
          <span class="summary-label">Standort</span>
          <span class="summary-value">${locationLabel}</span>
        </div>
        <div class="summary-item">
          <span class="summary-label">Event-Typ</span>
          <span class="summary-value">${eventTypeLabel}</span>
        </div>
        <div class="summary-item">
          <span class="summary-label">Gästeanzahl</span>
          <span class="summary-value">${data.guestCount}</span>
        </div>
        <div class="summary-item">
          <span class="summary-label">Wunschtermin</span>
          <span class="summary-value">${data.eventDate}</span>
        </div>
      </div>

      <p>Bei dringenden Fragen erreichen Sie uns telefonisch unter:</p>
      <div class="cta">
        <a href="tel:+4916094623196">+49 160 9462 3196</a>
      </div>
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

export async function sendBookingEmail(data: BookingPayload): Promise<void> {
  // Validate environment variables
  if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
    throw new Error('Gmail credentials not configured');
  }

  // Create transporter
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // TLS
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  // Route based on location
  const internalEmail = data.location === 'munich' 
    ? process.env.BOOKING_TO_MUNICH || 'Muenchen@velo-bar.com'
    : process.env.BOOKING_TO_COBURG || 'coburg@velo-bar.com';

  const fromEmail = process.env.BOOKING_FROM_EMAIL || 'Velo Bar Booking <booking@velo-bar.com>';
  const replyTo = process.env.BOOKING_REPLY_TO_EMAIL || 'booking@velo-bar.com';

  // Send emails in parallel
  await Promise.all([
    // 1) Internal notification
    transporter.sendMail({
      from: fromEmail,
      to: internalEmail,
      replyTo: data.customerEmail,
      subject: `Neue Buchungsanfrage: ${data.company} – ${data.eventDate}`,
      html: generateInternalHtml(data),
    }),
    
    // 2) Customer confirmation
    transporter.sendMail({
      from: fromEmail,
      to: data.customerEmail,
      replyTo: replyTo,
      subject: 'Ihre Anfrage bei Velo Bar – Buchungsbestätigung',
      html: generateCustomerHtml(data),
    }),
  ]);
}
