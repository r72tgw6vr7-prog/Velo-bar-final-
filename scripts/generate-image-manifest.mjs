#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';

const PUBLIC = path.resolve(process.cwd(), 'public');
const OUT = path.resolve(process.cwd(), 'src', 'generated', 'imageManifest.ts');

function walk(dir, prefix = '') {
  return fs.readdir(dir, { withFileTypes: true }).then(async (entries) => {
    const files = [];
    for (const e of entries) {
      const full = path.join(dir, e.name);
      const rel = path.posix.join(prefix, e.name);
      if (e.isDirectory()) {
        const children = await walk(full, rel);
        files.push(...children);
      } else {
        files.push(rel);
      }
    }
    return files;
  });
}

function pickDefaultVariant(variants) {
  // prefer 120w.webp -> 256w.webp -> 320w.webp -> 640w.webp -> 1024w.webp -> 1920w.webp -> any webp -> any avif -> fallback
  const order = ['-120w.webp','-256w.webp','-320w.webp','-640w.webp','-1024w.webp','-1920w.webp','.webp','.avif','.jpg','.jpeg','.png'];
  const lower = variants.map((v) => ({orig: v, low: v.toLowerCase()}));
  for (const o of order) {
    const found = lower.find((v) => v.low.endsWith(o));
    if (found) return found.orig;
  }
  return variants[0];
}

(async () => {
  console.log('Scanning public for image files...');
  const files = await walk(PUBLIC, '');
  // map base -> variants
  const map = new Map();
  for (const f of files) {
    const ext = path.extname(f).toLowerCase();
    if (!['.jpg','.jpeg','.png','.webp','.avif'].includes(ext)) continue;
    const key = '/' + f.replace(/\\/g, '/');

    // register base names
    // normalize by removing extension and trailing -<num>w width tokens so variants like foo-120w.webp group under /foo
    let base = key.replace(/\.[a-zA-Z0-9]+$/, '');
    base = base.replace(/(-\d+w)+$/, '');
    if (!map.has(base)) map.set(base, []);
    map.get(base).push(key);
  }

  // Build manifest object text
  const entries = [];
  for (const [base, variants] of map.entries()) {
    // default mapping for base -> pickDefaultVariant
    let defaultVariant = pickDefaultVariant(variants);
    // If default picked a jpg but webp variants are present, prefer a webp
    const hasWebp = variants.some((v) => v.toLowerCase().endsWith('.webp'));
    if (hasWebp && defaultVariant.toLowerCase().endsWith('.jpg')) {
      // pick default among webp variants only
      const webpOnly = variants.filter((v) => v.toLowerCase().endsWith('.webp'));
      const webpPick = pickDefaultVariant(webpOnly);
      console.warn(`Note: base ${base} had webp variants; overriding default ${defaultVariant} -> ${webpPick}`);
      defaultVariant = webpPick;
    }

    entries.push({ key: base, val: defaultVariant });
    // also map explicit variant paths
    for (const v of variants) {
      entries.push({ key: v, val: v });
    }
    // meta.json mapping
    const metaKey = `${base}.meta.json`;
    if (variants.some((v) => v.endsWith('.meta.json'))) {
      entries.push({ key: metaKey, val: `${base}.meta.json` });
    } else if (await (async () => { try { await fs.access(path.join(PUBLIC, base + '.meta.json')); return true;} catch {return false;} })()) {
      entries.push({ key: metaKey, val: `${base}.meta.json` });
    }
  }

  // Build TypeScript file
  const lines = [];
  lines.push('/* Auto-generated image manifest. Regenerate with scripts/generate-image-manifest.mjs */');
  lines.push('export default {');
  for (const e of entries) {
    const k = e.key.replace(/\\/g, '/');
    const v = e.val.replace(/\\/g, '/');
    lines.push(`  "${k}": "${v}",`);
    // also lower-cased version for robustness
    lines.push(`  "${k.toLowerCase()}": "${v}",`);
  }
  lines.push('};');

  // backup existing manifest
  try {
    const old = await fs.readFile(OUT, 'utf8');
    await fs.writeFile(OUT + '.bak', old, 'utf8');
    console.log('Backed up existing manifest to imageManifest.ts.bak');
  } catch {
    // ignore
  }

  await fs.writeFile(OUT, lines.join('\n'), 'utf8');
  console.log('Wrote new image manifest to src/generated/imageManifest.ts');
})();