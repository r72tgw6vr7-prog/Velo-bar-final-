import { applyCors } from './utils/cors.js';

export default async function handler(req, res) {
  if (!applyCors(req, res)) return;

  res.status(410).json({
    success: false,
    error: 'GONE',
    message: 'Payments have been removed from this website.',
  });
}
