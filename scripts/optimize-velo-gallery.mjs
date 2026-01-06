#!/usr/bin/env node
/**
 * Optimize Velo Gallery Images
 * - Generates responsive variants for images in public/Velo Gallery
 * - Outputs both WebP and JPEG variants with naming: filename-<width>w.webp/.jpg
 * - Also writes a base WebP (filename.webp) for default <img> fallback
 */

import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GALLERY_DIR = path.join(__dirname, '..', 'public', 'Velo Gallery');
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

async function processImage(fullPath) {
  const dir = path.dirname(fullPath);
  const { name, ext } = path.parse(fullPath);
  const base = path.join(dir, name); // without extension

  // Read metadata once
  const image = sharp(fullPath);
  const metadata = await image.metadata();
  console.log(`\nProcessing: ${path.basename(fullPath)} (${metadata.width}x${metadata.height})`);

  // Base webp (no width suffix) for default image
  const baseWebp = `${base}.webp`;
  if (!(await fileExists(baseWebp))) {
    await image.webp({ quality: 82 }).toFile(baseWebp);
    const s = await fs.stat(baseWebp);
    console.log(`  + ${path.basename(baseWebp)} ${(s.size / 1024).toFixed(1)} KB`);
  } else {
    console.log(`  = ${path.basename(baseWebp)} (exists)`);
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
  const images = entries
    .filter((f) => f.match(/\.(jpg|jpeg|png)$/i))
    .map((f) => path.join(GALLERY_DIR, f));

  if (images.length === 0) {
    console.log('No JPG/PNG images found in public/Velo Gallery');
    return;
  }

  console.log('🖼  Optimizing Velo Gallery Images');
  console.log('=================================');
  console.log(`Found ${images.length} source images`);

  for (const img of images) {
    try {
      await processImage(img);
    } catch (e) {
      console.warn(`  ! Failed: ${path.basename(img)} → ${e.message}`);
    }
  }

  console.log('\nDone. Responsive variants are ready.');
  console.log(
    'Tip: The ResponsiveImage component will now resolve -320w/-640w/-1024w/-1920w for both webp and jpg.',
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
