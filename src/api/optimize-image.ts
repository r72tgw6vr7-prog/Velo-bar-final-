import sharp from 'sharp';

const ALLOWED_WIDTHS = new Set([400, 800, 1200, 1600]);
const MAX_CACHE_AGE = 86400 * 30; // 30 days

export async function handler(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get('key');
    const width = Number.parseInt(searchParams.get('w') || '800');
    const quality = Number.parseInt(searchParams.get('q') || '75');

    if (!key || !ALLOWED_WIDTHS.has(width)) {
      return new Response(JSON.stringify({ error: 'Invalid parameters' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Validate origin strictly (prevent SSRF)
    // Sanitize provided key path: allow only safe characters and no traversal
    const normalizedKey = key.replace(/\\+/g, '/');
    const segments = normalizedKey.split('/').filter((seg) => /^[A-Za-z0-9._-]+$/.test(seg));
    const safePath = '/' + segments.join('/');
    const safeUrl = `https://public.blob.vercel-storage.com${safePath}`;

    // Fetch + optimize
    const response = await fetch(safeUrl);
    const buffer = await response.arrayBuffer();

    // Clamp quality to sane bounds
    const q = Number.isFinite(quality) ? Math.min(95, Math.max(50, quality)) : 75;

    const optimized = await sharp(Buffer.from(buffer))
      .resize(width, null, {
        fit: 'contain',
        withoutEnlargement: true,
      })
      .webp({ quality: q })
      .toBuffer();

    // Ensure BodyInit is a compatible type across environments
    const body = new Uint8Array(optimized);
    return new Response(body, {
      headers: {
        'Content-Type': 'image/webp',
        'Cache-Control': `public, max-age=${MAX_CACHE_AGE}, immutable`,
      },
    });
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[Image Optimize]', error);
    }
    return new Response(JSON.stringify({ error: 'Processing failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
