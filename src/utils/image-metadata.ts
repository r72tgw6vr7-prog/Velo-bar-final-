import { resolvePublicPath } from '@/utils/resolvePublicPath.ts';

const metaCache = new Map<string, { placeholder: string }>();

export async function getImageMeta(basePath: string) {
  if (metaCache.has(basePath)) {
    return metaCache.get(basePath);
  }

  try {
    // Resolve the meta.json path through Cloudinary manifest if available
    const metaPath = `${basePath}.meta.json`;
    const resolvedPath = resolvePublicPath(metaPath);
    const response = await fetch(resolvedPath);
    const meta = await response.json();
    metaCache.set(basePath, meta);
    return meta;
  } catch {
    return { placeholder: '' };
  }
}
