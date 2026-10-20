import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse): void {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'Method not allowed' });
    return;
  }

  const report = req.body || {};
  // eslint-disable-next-line no-console
  console.log(
    JSON.stringify({
      level: 'security',
      message: 'CSP violation report',
      timestamp: new Date().toISOString(),
      service: 'velo-bar',
      'csp-report': report['csp-report'] || report,
      userAgent: req.headers['user-agent'],
    }),
  );

  res.status(204).end();
}
