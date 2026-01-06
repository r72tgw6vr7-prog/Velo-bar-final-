import { put } from '@vercel/blob';

export default async function handler(request: Request) {
  try {
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    const form = await request.formData();
    const file = form.get('file');
    if (!(file instanceof File)) {
      return new Response('No file provided', { status: 400 });
    }

    const blob = await put(file.name, file, {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN,
      contentType: file.type || 'application/octet-stream',
    });

    return Response.json(blob);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Upload error:', error);
    }
    return new Response('Upload failed', { status: 500 });
  }
}
