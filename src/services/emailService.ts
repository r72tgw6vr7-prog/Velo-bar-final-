/**
 * Universal Email Service
 * Supports: SendGrid, Mailgun, Amazon SES, SMTP
 */

export interface EmailProvider {
  name: 'sendgrid' | 'mailgun' | 'amazonses' | 'smtp';
  apiKey?: string;
  domain?: string;
  endpoint?: string;
}

export interface EmailTemplate {
  subject: string;
  html: string;
  text: string;
}

export interface EmailRequest {
  to: string;
  from: string;
  subject: string;
  template:
    | 'booking-confirmation'
    | 'booking-notification'
    | 'contact-notification'
    | 'payment-confirmation';
  data: Record<string, any>;
  language?: 'DE' | 'EN';
}

export interface EmailResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

/**
 * Email templates in German and English
 */
const EMAIL_TEMPLATES: Record<string, Record<'DE' | 'EN', EmailTemplate>> = {
  'booking-confirmation': {
    DE: {
      subject: 'Buchungsbestätigung - Velo.Bar – Mobile Cocktailbar & Event Catering',
      html: generateBookingConfirmationHTML('DE'),
      text: generateBookingConfirmationText('DE'),
    },
    EN: {
      subject: 'Booking Confirmation - Velo.Bar – Mobile Cocktailbar & Event Catering',
      html: generateBookingConfirmationHTML('EN'),
      text: generateBookingConfirmationText('EN'),
    },
  },
  'booking-notification': {
    DE: {
      subject: 'Neue Buchungsanfrage - {{customerName}}',
      html: generateBookingNotificationHTML('DE'),
      text: generateBookingNotificationText('DE'),
    },
    EN: {
      subject: 'New Booking Request - {{customerName}}',
      html: generateBookingNotificationHTML('EN'),
      text: generateBookingNotificationText('EN'),
    },
  },
  'contact-notification': {
    DE: {
      subject: 'Neue Kontaktanfrage - {{subject}}',
      html: generateContactNotificationHTML('DE'),
      text: generateContactNotificationText('DE'),
    },
    EN: {
      subject: 'New Contact Request - {{subject}}',
      html: generateContactNotificationHTML('EN'),
      text: generateContactNotificationText('EN'),
    },
  },
  'payment-confirmation': {
    DE: {
      subject: 'Zahlungsbestätigung - Velo.Bar – Mobile Cocktailbar & Event Catering',
      html: generatePaymentConfirmationHTML('DE'),
      text: generatePaymentConfirmationText('DE'),
    },
    EN: {
      subject: 'Payment Confirmation - Velo.Bar – Mobile Cocktailbar & Event Catering',
      html: generatePaymentConfirmationHTML('EN'),
      text: generatePaymentConfirmationText('EN'),
    },
  },
};

/**
 * Send email via configured provider
 */
export const sendEmail = async (request: EmailRequest): Promise<EmailResponse> => {
  try {
    const provider = detectEmailProvider();
    const template = EMAIL_TEMPLATES[request.template]?.[request.language || 'DE'];

    if (!template) {
      throw new Error(`Template ${request.template} not found for language ${request.language}`);
    }

    const processedTemplate = processTemplate(template, request.data);

    switch (provider.name) {
      case 'sendgrid':
        return await sendViaSendGrid(request, processedTemplate, provider);
      case 'mailgun':
        return await sendViaMailgun(request, processedTemplate, provider);
      case 'amazonses':
        return await sendViaAmazonSES(request, processedTemplate, provider);
      case 'smtp':
        return await sendViaSMTP(request, processedTemplate, provider);
      default:
        throw new Error(`Unsupported email provider: ${provider.name}`);
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Email sending error:', error);
    }
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Email sending failed',
    };
  }
};

/**
 * Detect configured email provider
 */
function detectEmailProvider(): EmailProvider {
  const env = import.meta.env;

  if (env.VITE_SENDGRID_API_KEY) {
    return {
      name: 'sendgrid',
      apiKey: env.VITE_SENDGRID_API_KEY,
    };
  }

  if (env.VITE_MAILGUN_API_KEY && env.VITE_MAILGUN_DOMAIN) {
    return {
      name: 'mailgun',
      apiKey: env.VITE_MAILGUN_API_KEY,
      domain: env.VITE_MAILGUN_DOMAIN,
    };
  }

  if (env.VITE_AWS_SES_ACCESS_KEY) {
    return {
      name: 'amazonses',
      apiKey: env.VITE_AWS_SES_ACCESS_KEY,
    };
  }

  if (env.VITE_SMTP_HOST) {
    return {
      name: 'smtp',
      endpoint: env.VITE_SMTP_HOST,
    };
  }

  throw new Error('No email provider configured');
}

/**
 * Process template with data substitution
 */
function processTemplate(template: EmailTemplate, data: Record<string, any>): EmailTemplate {
  const processString = (str: string): string => {
    return str.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return data[key] !== undefined ? String(data[key]) : match;
    });
  };

  return {
    subject: processString(template.subject),
    html: processString(template.html),
    text: processString(template.text),
  };
}

/**
 * SendGrid implementation
 */
async function sendViaSendGrid(
  request: EmailRequest,
  template: EmailTemplate,
  provider: EmailProvider,
): Promise<EmailResponse> {
  const response = await fetch('/api/email/sendgrid', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${provider.apiKey}`,
    },
    body: JSON.stringify({
      personalizations: [
        {
          to: [{ email: request.to }],
          subject: template.subject,
        },
      ],
      from: { email: request.from },
      content: [
        { type: 'text/plain', value: template.text },
        { type: 'text/html', value: template.html },
      ],
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`SendGrid error: ${error}`);
  }

  return {
    success: true,
    messageId: response.headers.get('x-message-id') || undefined,
  };
}

/**
 * Mailgun implementation
 */
async function sendViaMailgun(
  request: EmailRequest,
  template: EmailTemplate,
  provider: EmailProvider,
): Promise<EmailResponse> {
  const formData = new FormData();
  formData.append('from', request.from);
  formData.append('to', request.to);
  formData.append('subject', template.subject);
  formData.append('text', template.text);
  formData.append('html', template.html);

  const response = await fetch(`/api/email/mailgun`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${btoa(`api:${provider.apiKey}`)}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Mailgun error: ${error}`);
  }

  const data = await response.json();
  return {
    success: true,
    messageId: data.id,
  };
}

/**
 * Amazon SES implementation
 */
async function sendViaAmazonSES(
  request: EmailRequest,
  template: EmailTemplate,
  provider: EmailProvider,
): Promise<EmailResponse> {
  const response = await fetch('/api/email/amazonses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      Source: request.from,
      Destination: {
        ToAddresses: [request.to],
      },
      Message: {
        Subject: {
          Data: template.subject,
          Charset: 'UTF-8',
        },
        Body: {
          Text: {
            Data: template.text,
            Charset: 'UTF-8',
          },
          Html: {
            Data: template.html,
            Charset: 'UTF-8',
          },
        },
      },
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Amazon SES error: ${error}`);
  }

  const data = await response.json();
  return {
    success: true,
    messageId: data.MessageId,
  };
}

/**
 * SMTP implementation
 */
async function sendViaSMTP(
  request: EmailRequest,
  template: EmailTemplate,
  provider: EmailProvider,
): Promise<EmailResponse> {
  const response = await fetch('/api/email/smtp', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: request.from,
      to: request.to,
      subject: template.subject,
      text: template.text,
      html: template.html,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`SMTP error: ${error}`);
  }

  return {
    success: true,
  };
}

// Template generators (simplified versions)
function generateBookingConfirmationHTML(language: 'DE' | 'EN'): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>${language === 'DE' ? 'Buchungsbestätigung' : 'Booking Confirmation'}</title>
        <style>
          body { font-family: Arial, sans-serif; background-color: #003141; color: #fff8ec; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background: #003141; border: 1px solid #ee7868; border-radius: 8px; }
          .header { background: linear-gradient(135deg, #ee7868, #f08b7d); color: #003141; padding: 20px; text-align: center; }
          .content { padding: 20px; }
          .field { margin-bottom: 16px; padding-bottom: 16px; border-bottom: 1px solid #C0C0C0; }
          .label { font-weight: 600; color: #ee7868; margin-bottom: 4px; }
          .value { color: #fff8ec; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Your Business Name</h1>
            <p>${language === 'DE' ? 'Buchungsbestätigung' : 'Booking Confirmation'}</p>
          </div>
          <div class="content">
            <p>${language === 'DE' ? 'Liebe/r {{customerName}},' : 'Dear {{customerName}},'}</p>
            <p>${language === 'DE' ? 'Vielen Dank für Ihre Buchungsanfrage!' : 'Thank you for your booking request!'}</p>
            
            <div class="field">
              <div class="label">${language === 'DE' ? 'Buchungs-ID' : 'Booking ID'}</div>
              <div class="value">{{bookingId}}</div>
            </div>
            
            <div class="field">
              <div class="label">${language === 'DE' ? 'Event-Typ' : 'Event Type'}</div>
              <div class="value">{{eventType}}</div>
            </div>
            
            <div class="field">
              <div class="label">${language === 'DE' ? 'Service' : 'Service'}</div>
              <div class="value">{{serviceName}}</div>
            </div>
            
            <div class="field">
              <div class="label">${language === 'DE' ? 'Gewünschter Termin' : 'Preferred Date'}</div>
              <div class="value">{{preferredDate}} um {{preferredTime}}</div>
            </div>
            
            <p>${language === 'DE' ? 'Wir werden uns innerhalb von 24 Stunden bei Ihnen melden.' : 'We will contact you within 24 hours.'}</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

function generateBookingConfirmationText(language: 'DE' | 'EN'): string {
  return language === 'DE'
    ? `Buchungsbestätigung - Velobar Event Catering\n\nSehr geehrte(r) {{customerName}},\n\nVielen Dank für Ihre Anfrage!\n\nBuchungs-ID: {{bookingId}}\nEvent-Typ: {{eventType}}\nService: {{serviceName}}\nGewünschter Termin: {{preferredDate}} um {{preferredTime}}\n\nWir melden uns innerhalb von 24 Stunden bei Ihnen.`
    : `Booking Confirmation - Velobar Event Catering\n\nDear {{customerName}},\n\nThank you for your booking request!\n\nBooking ID: {{bookingId}}\nEvent Type: {{eventType}}\nService: {{serviceName}}\nPreferred Date: {{preferredDate}} at {{preferredTime}}\n\nWe will contact you within 24 hours.`;
}

function generateBookingNotificationHTML(language: 'DE' | 'EN'): string {
  return `<h1>${language === 'DE' ? 'Neue Buchungsanfrage' : 'New Booking Request'}</h1><p><strong>${language === 'DE' ? 'Kunde' : 'Customer'}:</strong> {{customerName}} ({{customerEmail}})</p><p><strong>${language === 'DE' ? 'Buchungs-ID' : 'Booking ID'}:</strong> {{bookingId}}</p>`;
}

function generateBookingNotificationText(language: 'DE' | 'EN'): string {
  return `${language === 'DE' ? 'Neue Buchungsanfrage' : 'New Booking Request'}\n\n${language === 'DE' ? 'Kunde' : 'Customer'}: {{customerName}} ({{customerEmail}})\n${language === 'DE' ? 'Buchungs-ID' : 'Booking ID'}: {{bookingId}}`;
}

function generateContactNotificationHTML(language: 'DE' | 'EN'): string {
  if (language === 'DE') {
    return `
      <h1>Neue Event-Anfrage</h1>
      <p><strong>Von:</strong> {{name}} ({{email}})</p>
      <p><strong>Betreff:</strong> {{subject}}</p>
      <p><strong>Event-Typ:</strong> {{eventType}}</p>
      <p><strong>Event-Datum:</strong> {{eventDate}}</p>
      <p><strong>Ort / PLZ:</strong> {{eventLocation}}</p>
      <p><strong>Gästezahl:</strong> {{guestCount}}</p>
      <p><strong>Budgetrahmen:</strong> {{budget}}</p>
      <p><strong>Nachricht:</strong></p>
      <p>{{message}}</p>
    `;
  }
  return `
    <h1>New Event Inquiry</h1>
    <p><strong>From:</strong> {{name}} ({{email}})</p>
    <p><strong>Subject:</strong> {{subject}}</p>
    <p><strong>Event Type:</strong> {{eventType}}</p>
    <p><strong>Event Date:</strong> {{eventDate}}</p>
    <p><strong>Location / ZIP:</strong> {{eventLocation}}</p>
    <p><strong>Guest Count:</strong> {{guestCount}}</p>
    <p><strong>Budget:</strong> {{budget}}</p>
    <p><strong>Message:</strong></p>
    <p>{{message}}</p>
  `;
}

function generateContactNotificationText(language: 'DE' | 'EN'): string {
  if (language === 'DE') {
    return `Neue Event-Anfrage\n\nVon: {{name}} ({{email}})\nBetreff: {{subject}}\nEvent-Typ: {{eventType}}\nEvent-Datum: {{eventDate}}\nOrt / PLZ: {{eventLocation}}\nGästezahl: {{guestCount}}\nBudgetrahmen: {{budget}}\n\nNachricht:\n{{message}}`;
  }
  return `New Event Inquiry\n\nFrom: {{name}} ({{email}})\nSubject: {{subject}}\nEvent Type: {{eventType}}\nEvent Date: {{eventDate}}\nLocation / ZIP: {{eventLocation}}\nGuest Count: {{guestCount}}\nBudget: {{budget}}\n\nMessage:\n{{message}}`;
}

function generatePaymentConfirmationHTML(language: 'DE' | 'EN'): string {
  return `<h1>${language === 'DE' ? 'Zahlungsbestätigung' : 'Payment Confirmation'}</h1><p>${language === 'DE' ? 'Ihre Zahlung wurde erfolgreich verarbeitet.' : 'Your payment has been processed successfully.'}</p><p><strong>${language === 'DE' ? 'Zahlungs-ID' : 'Payment ID'}:</strong> {{paymentId}}</p><p><strong>${language === 'DE' ? 'Betrag' : 'Amount'}:</strong> {{amount}}€</p>`;
}

function generatePaymentConfirmationText(language: 'DE' | 'EN'): string {
  return `${language === 'DE' ? 'Zahlungsbestätigung' : 'Payment Confirmation'}\n\n${language === 'DE' ? 'Ihre Zahlung wurde erfolgreich verarbeitet.' : 'Your payment has been processed successfully.'}\n\n${language === 'DE' ? 'Zahlungs-ID' : 'Payment ID'}: {{paymentId}}\n${language === 'DE' ? 'Betrag' : 'Amount'}: {{amount}}€`;
}
