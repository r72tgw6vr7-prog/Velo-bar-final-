import manifest from '@/generated/imageManifest.ts';

function norm(u: string) {
  try {
    return decodeURIComponent(u).trim();
  } catch {
    return u.trim();
  }
}

export function resolvePublicPath(src: string): string {
  if (!src) return src;
  // absolute urls should pass through
  if (/^https?:\/\//i.test(src) || src.startsWith('data:')) return src;

  const candidates = new Set<string>([src, src.toLowerCase(), norm(src), norm(src).toLowerCase()]);

  for (const c of candidates) {
    if (c in manifest) return manifest[c as keyof typeof manifest] as string;
  }

  // try filename variants (add extension or try lower-cased paths)
  const ext = src.match(/\.[a-zA-Z0-9]+$/)?.[0] || '';
  const noext = ext ? src.slice(0, -ext.length) : src;
  const noextCandidates = [
    noext,
    decodeURIComponent(noext),
    noext.toLowerCase(),
    decodeURIComponent(noext).toLowerCase(),
  ];
  const exts = ['.webp', '.jpg', '.jpeg', '.png', '.svg', '.avif'];
  for (const ne of noextCandidates) {
    for (const e of exts) {
      const key = ne + e;
      if (key in manifest) return manifest[key as keyof typeof manifest] as string;
    }
  }

  return src; // fallback to original
}

export function publicHas(src: string): boolean {
  const resolved = resolvePublicPath(src);
  return (
    resolved !== src ||
    src in manifest ||
    src.toLowerCase() in manifest ||
    decodeURIComponent(src) in manifest
  );
}
