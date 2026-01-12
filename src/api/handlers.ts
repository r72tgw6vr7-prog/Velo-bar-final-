/**
 * Complete Backend API Implementation
 * Ready for deployment - just needs environment variables
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import { sendEmail } from '../services/emailService.ts';

// Build CORS headers dynamically per-request to respect allowed origins env and avoid wildcard origin
function getCORSHeaders(origin?: string): Record<string, string> {
  const allowedEnv = process.env.ALLOWED_ORIGINS || process.env.VITE_ALLOWED_ORIGINS || '';
  const allowedOrigins = allowedEnv ? allowedEnv.split(',').map((s) => s.trim()) : [];
  const headers: Record<string, string> = {
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
    'Access-Control-Max-Age': '86400',
  };
  if (origin && allowedOrigins.length && allowedOrigins.includes(origin)) {
    headers['Access-Control-Allow-Origin'] = origin;
    headers['Vary'] = 'Origin';
  } else if (allowedOrigins.length === 1) {
    headers['Access-Control-Allow-Origin'] = allowedOrigins[0];
  }
  return headers;
}

/**
 * Handle CORS preflight requests
 */
export function handleCORS(req: Request): Response | null {
  if (req.method === 'OPTIONS') {
    const origin = req.headers.get('origin') || undefined;
    const headers = getCORSHeaders(origin);
    return new Response(null, {
      status: 200,
      headers,
    });
  }
  return null;
}

/**
 * Add CORS headers to response
 */
export function addCORSHeaders(response: Response): Response {
  // Add generic CORS headers (origin may be added by hosting layer or preflight handler)
  const headers = getCORSHeaders();
  Object.entries(headers).forEach(([key, value]) => response.headers.set(key, value));
  return response;
}

/**
 * Validate request body
 */
function validateRequestBody(body: any, requiredFields: string[]): string | null {
  for (const field of requiredFields) {
    if (!body[field]) {
      return `Missing required field: ${field}`;
    }
  }
  return null;
}

/**
 * CONTACT API ENDPOINT - POST /api/contact
 * Canonical Velobar inquiry pipeline used by /anfrage and event forms.
 * Accepts optional event details (eventType, eventDate, eventLocation,
 * guestCount, budget) in addition to basic contact fields.
 */
export async function handleContactSubmission(req: Request): Promise<Response> {
  // Handle CORS
  const corsResponse = handleCORS(req);
  if (corsResponse) return corsResponse;

  if (req.method !== 'POST') {
    return addCORSHeaders(
      new Response(JSON.stringify({ success: false, error: 'Method not allowed' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json' },
      }),
    );
  }

  try {
    const body = await req.json();

    // Validate required fields for first contact
    const requiredFields = ['name', 'email', 'subject', 'message'];
    const validationError = validateRequestBody(body, requiredFields);

    if (validationError) {
      return addCORSHeaders(
        new Response(
          JSON.stringify({
            success: false,
            error: 'VALIDATION_ERROR',
            message: validationError,
          }),
          { status: 400, headers: { 'Content-Type': 'application/json' } },
        ),
      );
    }

    // Send notification email to studio with optional event details
    await sendEmail({
      to: process.env.CONTACT_EMAIL || process.env.VITE_CONTACT_EMAIL || 'contact@yourdomain.com',
      from: process.env.FROM_EMAIL || process.env.VITE_FROM_EMAIL || 'contact@yourdomain.com',
      subject: `Kontaktanfrage: ${body.subject}`,
      template: 'contact-notification',
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone || 'Nicht angegeben',
        subject: body.subject,
        message: body.message,
        eventType: body.eventType || 'Nicht angegeben',
        eventDate: body.eventDate || 'Nicht angegeben',
        eventLocation: body.eventLocation || 'Nicht angegeben',
        guestCount: body.guestCount || 'Nicht angegeben',
        budget: body.budget || 'Nicht angegeben',
      },
      language: body.language || 'DE',
    });

    // Return success response
    return addCORSHeaders(
      new Response(
        JSON.stringify({
          success: true,
          message:
            body.language === 'EN'
              ? 'Your message has been sent successfully. We will contact you shortly.'
              : 'Ihre Nachricht wurde erfolgreich gesendet. Wir werden uns in Kürze bei Ihnen melden.',
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } },
      ),
    );
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Contact submission error:', error);
    }

    return addCORSHeaders(
      new Response(
        JSON.stringify({
          success: false,
          error: 'SERVER_ERROR',
          message: 'Internal server error. Please try again later.',
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } },
      ),
    );
  }
}

/**
 * HEALTH CHECK ENDPOINT - GET /api/health
 */
export async function handleHealthCheck(req: Request): Promise<Response> {
  const corsResponse = handleCORS(req);
  if (corsResponse) return corsResponse;

  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    services: {
      email: Boolean(
        process.env.SENDGRID_API_KEY ||
          process.env.MAILGUN_API_KEY ||
          process.env.VITE_SENDGRID_API_KEY ||
          process.env.VITE_MAILGUN_API_KEY,
      ),
      crm: Boolean(process.env.ZOHO_CLIENT_ID || process.env.VITE_ZOHO_CLIENT_ID),
    },
  };

  return addCORSHeaders(
    new Response(JSON.stringify(health), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }),
  );
}
