export default async function handler(req, res) {
  const { applyCors } = await import('./utils/cors.js');
  if (!applyCors(req, res)) return;

  res.status(410).json({
    success: false,
    error: 'GONE',
    message: 'Payments have been removed from this website.',
  });
}
