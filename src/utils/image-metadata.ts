const metaCache = new Map<string, { placeholder: string }>();

export async function getImageMeta(basePath: string) {
  if (metaCache.has(basePath)) {
    return metaCache.get(basePath);
  }

  try {
    const response = await fetch(`${basePath}.meta.json`);
    const meta = await response.json();
    metaCache.set(basePath, meta);
    return meta;
  } catch {
    return { placeholder: '' };
  }
}
