import { promises as fs } from 'fs';
import path from 'path';

export default async function handler(request: Request) {
  try {
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    const { image } = await request.json();
    const manifestPath = path.join(process.cwd(), 'src/data/gallery-manifest.json');

    // Read current manifest
    const manifestContent = await fs.readFile(manifestPath, 'utf8');
    const manifest = JSON.parse(manifestContent);

    // Add new image
    manifest.push(image);

    // Write updated manifest
    await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2));

    return Response.json({ success: true });
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Manifest update error:', error);
    }
    return new Response('Manifest update failed', { status: 500 });
  }
}
