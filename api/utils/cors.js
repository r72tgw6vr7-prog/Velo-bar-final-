/**
 * CORS utility for Vercel serverless functions
 */
export function applyCors(req, res, options = {}) {
  const {
    allowList = (process.env.VITE_ALLOWED_ORIGINS || '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean),
    allowMethods = 'GET, POST, PUT, DELETE, OPTIONS',
    allowHeaders = 'Content-Type, X-Requested-With, X-CSRF-Token, Authorization',
    allowCredentials = true,
    maxAge = '86400',
  } = options;

  const origin = req.headers?.origin || '';
  const isAllowed =
    origin && allowList.some((o) => o && origin && o.toLowerCase() === origin.toLowerCase());

  // Ensure caches differentiate by Origin
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', allowMethods);
  res.setHeader('Access-Control-Allow-Headers', allowHeaders);
  res.setHeader('Access-Control-Max-Age', maxAge);

  if (isAllowed) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    if (allowCredentials) {
      res.setHeader('Access-Control-Allow-Credentials', 'true');
    }
  }

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return false; // handled preflight
  }

  return true;
}
