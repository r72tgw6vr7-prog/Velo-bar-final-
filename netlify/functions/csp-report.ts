import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';
import { logger } from '../../src/lib/logger';

export const handler: Handler = async (event: HandlerEvent, _context: HandlerContext) => {
  const headers: Record<string, string> = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ ok: false, error: 'Method not allowed' }),
    };
  }

  let body: unknown;
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    body = {};
  }

  const report = (body as Record<string, unknown>) || {};
  logger.security('CSP violation report', {
    'csp-report': report['csp-report'] || report,
    userAgent: event.headers['user-agent'],
  });

  return { statusCode: 204, headers, body: '' };
};
