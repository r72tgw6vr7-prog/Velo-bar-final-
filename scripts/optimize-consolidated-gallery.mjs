#!/usr/bin/env node
/**
 * Optimize Consolidated Gallery Images (public/gallery)
 * - For each image in public/gallery (webp/jpg/jpeg/png), generate:
 *   - Base WebP (name.webp) if missing
 *   - Base JPG (name.jpg) if missing
 *   - Responsive variants for widths [320,640,1024,1920] for both webp and jpg
 * - Skips variants that already exist
 */

import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GALLERY_DIR = path.join(__dirname, '..', 'public', 'gallery');
const WIDTHS = [320, 640, 1024, 1920];

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true }).catch(() => {});
}

async function fileExists(p) {
  try {
    await fs.stat(p);
    return true;
  } catch {
    return false;
  }
}

function withoutExt(p) {
  const parsed = path.parse(p);
  return path.join(parsed.dir, parsed.name);
}

async function processImage(fullPath) {
  const dir = path.dirname(fullPath);
  const { name, ext } = path.parse(fullPath);
  const base = withoutExt(fullPath); // no extension

  const image = sharp(fullPath);
  const metadata = await image.metadata();
  console.log(`\nProcessing: ${path.basename(fullPath)} (${metadata.width}x${metadata.height})`);

  // Base webp
  const baseWebp = `${base}.webp`;
  if (!(await fileExists(baseWebp))) {
    await image.webp({ quality: 82 }).toFile(baseWebp);
    const s = await fs.stat(baseWebp);
    console.log(`  + ${path.basename(baseWebp)} ${(s.size / 1024).toFixed(1)} KB`);
  } else {
    console.log(`  = ${path.basename(baseWebp)} (exists)`);
  }

  // Base jpg
  const baseJpg = `${base}.jpg`;
  if (!(await fileExists(baseJpg))) {
    await image.jpeg({ quality: 82 }).toFile(baseJpg);
    const s = await fs.stat(baseJpg);
    console.log(`  + ${path.basename(baseJpg)} ${(s.size / 1024).toFixed(1)} KB`);
  } else {
    console.log(`  = ${path.basename(baseJpg)} (exists)`);
  }

  for (const w of WIDTHS) {
    if (metadata.width && metadata.width < w) continue;

    const webpOut = `${base}-${w}w.webp`;
    const jpgOut = `${base}-${w}w.jpg`;

    if (!(await fileExists(webpOut))) {
      await sharp(fullPath)
        .resize(w, null, { fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 82 })
        .toFile(webpOut);
      const s = await fs.stat(webpOut);
      console.log(`  + ${path.basename(webpOut)} ${(s.size / 1024).toFixed(1)} KB`);
    } else {
      console.log(`  = ${path.basename(webpOut)} (exists)`);
    }

    if (!(await fileExists(jpgOut))) {
      await sharp(fullPath)
        .resize(w, null, { fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: 82 })
        .toFile(jpgOut);
      const s = await fs.stat(jpgOut);
      console.log(`  + ${path.basename(jpgOut)} ${(s.size / 1024).toFixed(1)} KB`);
    } else {
      console.log(`  = ${path.basename(jpgOut)} (exists)`);
    }
  }
}

async function main() {
  await ensureDir(GALLERY_DIR);
  const entries = await fs.readdir(GALLERY_DIR);

  // Only process master images (skip already-generated variants)
  const masters = entries
    .filter((f) => f.match(/\.(webp|jpg|jpeg|png)$/i))
    .filter((f) => !f.match(/-\d{2,5}w\.(webp|jpg)$/i));

  if (masters.length === 0) {
    console.log('No source images found in public/gallery');
    return;
  }

  console.log('🖼  Optimizing Consolidated Gallery Images');
  console.log('==========================================');
  console.log(`Found ${masters.length} source images`);

  for (const f of masters) {
    const full = path.join(GALLERY_DIR, f);
    try {
      await processImage(full);
    } catch (e) {
      console.warn(`  ! Failed: ${f} → ${e.message}`);
    }
  }

  console.log('\nDone. Consolidated variants are ready for ResponsiveImage.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
