import { promises as fs } from 'fs';
import path from 'path';

export default async function handler(request: Request) {
  if (request.method !== 'GET') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const manifestPath = path.join(process.cwd(), 'src/data/gallery-manifest.json');
    const manifestContent = await fs.readFile(manifestPath, 'utf8');
    const manifest = JSON.parse(manifestContent);

    return Response.json(manifest);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error reading manifest:', error);
    }
    return new Response('Failed to load gallery manifest', { status: 500 });
  }
}
