import { applyCors } from './utils/cors.js';

export default async function handler(req, res) {
  if (!applyCors(req, res)) return;
  try {
    const health = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        email: Boolean(
          process.env.SENDGRID_API_KEY ||
            process.env.MAILGUN_API_KEY ||
            process.env.AWS_SES_ACCESS_KEY ||
            process.env.SMTP_HOST ||
            process.env.VITE_SENDGRID_API_KEY ||
            process.env.VITE_MAILGUN_API_KEY ||
            process.env.VITE_AWS_SES_ACCESS_KEY ||
            process.env.VITE_SMTP_HOST,
        ),
        crm: Boolean(process.env.ZOHO_CLIENT_ID || process.env.VITE_ZOHO_CLIENT_ID),
      },
      env: {
        site: process.env.VITE_SITE_URL || null,
      },
    };

    res.setHeader('Content-Type', 'application/json');
    res.status(200).end(JSON.stringify(health));
  } catch (err) {
    console.error('Health error:', err);
    res.status(500).json({ status: 'unhealthy' });
  }
}
