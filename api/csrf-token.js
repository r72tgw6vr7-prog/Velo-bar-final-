/**
 * CSRF Token Endpoint
 *
 * GET /api/csrf-token - Returns a new CSRF token for the client
 * This should be called before making any POST requests from forms
 */

import { handleGetCsrfToken } from './middleware/csrfProtection.js';
import { applyCors } from './utils/cors.js';

export default async function handler(req, res) {
  // Apply CORS with dynamic allowlist and credentials
  if (!applyCors(req, res)) return;

  if (req.method !== 'GET') {
    res.status(405).json({ success: false, error: 'Method not allowed' });
    return;
  }

  try {
    handleGetCsrfToken(req, res);
  } catch (err) {
    console.error('CSRF token generation error:', err);
    res.status(500).json({ success: false, error: 'SERVER_ERROR' });
  }
}
