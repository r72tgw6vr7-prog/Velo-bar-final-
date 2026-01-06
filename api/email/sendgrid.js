export default async function handler(req, res) {
  const { applyCors } = await import('../utils/cors.js');
  if (!applyCors(req, res)) return;

  if (req.method !== 'POST') {
    res.status(405).json({ success: false, error: 'Method not allowed' });
    return;
  }

  try {
    const apiKey = process.env.SENDGRID_API_KEY || process.env.VITE_SENDGRID_API_KEY;
    if (!apiKey) {
      res.status(501).json({ success: false, error: 'SENDGRID_NOT_CONFIGURED' });
      return;
    }

    const payload = req.body;
    if (!payload || !payload.from || !payload.personalizations || !payload.content) {
      res.status(400).json({ success: false, error: 'INVALID_PAYLOAD' });
      return;
    }

    const sgResp = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    if (!sgResp.ok) {
      const text = await sgResp.text().catch(() => '');
      console.error('SendGrid relay failed:', sgResp.status, text);
      res.status(sgResp.status).json({ success: false, error: 'SENDGRID_ERROR', detail: text });
      return;
    }

    res
      .status(200)
      .json({ success: true, messageId: sgResp.headers.get('x-message-id') || undefined });
  } catch (err) {
    console.error('SendGrid handler error:', err);
    res.status(500).json({ success: false, error: 'SERVER_ERROR' });
  }
}
