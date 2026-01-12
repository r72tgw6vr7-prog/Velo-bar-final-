#!/usr/bin/env node
/* Image optimization script
   - Uses sharp to generate responsive WebP/AVIF sizes and a blur placeholder meta.json
   - Safe: will not overwrite if target files already exist

Usage: node scripts/image-optimize.mjs

Before running: npm i sharp
*/

import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

const ROOT = path.resolve(process.cwd(), 'public', 'Velo Gallery');
const WIDTHS = [256, 320, 640, 1024, 1920];
const SIZE_THRESHOLD = 200 * 1024; // 200KB

async function collectTargetsRecursively() {
  const list = [];
  async function walk(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) await walk(full);
      else {
        const ext = path.extname(entry.name).toLowerCase();
        if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) continue;
        // ignore already sized variants (e.g., -320w.webp)
        if (/-\d+w\.(webp|jpe?g|png)$/i.test(entry.name)) continue;
        const st = await fs.stat(full);
        if (st.size >= SIZE_THRESHOLD) {
          // compute base relative path from ROOT without extension
          const rel = path.relative(ROOT, full);
          const base = '/' + rel.replace(/\.[a-zA-Z0-9]+$/, '');
          // normalize forward slashes and remove leading ./
          list.push(base.replace(/\\/g, '/'));
        }
      }
    }
  }
  await walk(ROOT);
  return Array.from(new Set(list));
}


async function fileExists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function optimize(base) {
  const candidates = ['.jpg', '.jpeg', '.png', '.webp'];
  let srcFile = null;

  // Try base.ext first
  for (const ext of candidates) {
    const p = path.join(ROOT, base + ext);
    if (await fileExists(p)) {
      srcFile = p;
      break;
    }
  }

  // If base not found, try common size-suffix variants (e.g., -1920w.webp)
  if (!srcFile) {
    const suffixes = ['-1920w.webp', '-1920w.jpg', '-1024w.webp', '-640w.webp', '-640w.jpg'];
    for (const s of suffixes) {
      const p = path.join(ROOT, base + s);
      if (await fileExists(p)) {
        srcFile = p;
        break;
      }
    }
  }

  if (!srcFile) {
    console.warn(`Source not found for ${base}, skipping`);
    return;
  }

  const image = sharp(srcFile);
  const meta = await image.metadata();
  const origWidth = meta.width || 0;
  const origHeight = meta.height || 0;
  const aspectRatio = origWidth && origHeight ? origWidth / origHeight : undefined;
  console.log(`Processing ${base}: ${origWidth}x${origHeight} (${path.basename(srcFile)})`);

  // generate sizes
  for (const w of WIDTHS) {
    if (w > origWidth) continue;
    const outWebp = path.join(ROOT, `${base}-${w}w.webp`);
    const outAvif = path.join(ROOT, `${base}-${w}w.avif`);
    if (!(await fileExists(outWebp))) {
      await sharp(srcFile).resize({ width: w }).webp({ quality: 80 }).toFile(outWebp);
      console.log(`  -> ${path.basename(outWebp)}`);
    }
    if (!(await fileExists(outAvif))) {
      await sharp(srcFile).resize({ width: w }).avif({ quality: 50 }).toFile(outAvif);
      console.log(`  -> ${path.basename(outAvif)}`);
    }
  }

  // generate placeholder (20px wide webp base64)
  const placeholderPath = path.join(ROOT, `${base}.meta.json`);
  if (!(await fileExists(placeholderPath))) {
    const buf = await sharp(srcFile).resize({ width: 20 }).webp({ quality: 50 }).toBuffer();
    const b64 = `data:image/webp;base64,${buf.toString('base64')}`;
    const obj = { placeholder: b64, aspectRatio: aspectRatio || 1 };
    await fs.writeFile(placeholderPath, JSON.stringify(obj, null, 2));
    console.log(`  -> wrote ${path.basename(placeholderPath)}`);
  } else {
    console.log(`  -> meta exists ${path.basename(placeholderPath)}`);
  }
}

async function main() {
  console.log('Scanning public/Velo Gallery for large source images (>= 200KB) ...');
  const targets = await collectTargetsRecursively();
  console.log(`Found ${targets.length} targets to process.`);
  for (const t of targets) {
    try {
      // strip leading slash when passing into optimize
      await optimize(t.replace(/^\//, ''));
    } catch (e) {
      console.error(`Error processing ${t}:`, e);
    }
  }
  console.log('Done');
}


main().catch((err) => {
  console.error(err);
  process.exit(1);
});
