#!/usr/bin/env node

/**
 * Image Optimization Script
 * ==========================
 * - Converts JPG/PNG to WebP
 * - Generates responsive sizes (320w, 640w, 1024w, 1920w)
 * - Compresses images to <100KB
 * - Preserves originals in _originals folder
 */

import { readdir, mkdir, copyFile, stat } from 'fs/promises';
import { join, dirname, basename, extname } from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PUBLIC_DIR = join(__dirname, '..', 'public', 'assets');
const RESPONSIVE_SIZES = [320, 640, 1024, 1920];
const WEBP_QUALITY = 80;
const MAX_SIZE_KB = 100;

// Track statistics
const stats = {
  processed: 0,
  skipped: 0,
  errors: 0,
  totalSaved: 0,
};

/**
 * Format bytes to human readable
 */
function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Get all image files recursively
 */
async function getImageFiles(dir, files = []) {
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);

    if (entry.isDirectory()) {
      // Skip _originals and optimized directories
      if (entry.name === '_originals' || entry.name === 'optimized') {
        continue;
      }
      await getImageFiles(fullPath, files);
    } else if (entry.isFile()) {
      const ext = extname(entry.name).toLowerCase();
      if (['.jpg', '.jpeg', '.png'].includes(ext)) {
        files.push(fullPath);
      }
    }
  }

  return files;
}

/**
 * Optimize a single image
 */
async function optimizeImage(inputPath) {
  const dir = dirname(inputPath);
  const name = basename(inputPath, extname(inputPath));
  const originalSize = (await stat(inputPath)).size;

  // Create _originals directory if it doesn't exist
  const originalsDir = join(dir, '_originals');
  await mkdir(originalsDir, { recursive: true });

  // Backup original
  const originalBackup = join(originalsDir, basename(inputPath));
  try {
    await copyFile(inputPath, originalBackup);
    console.log(`[PKG] Backed up: ${basename(inputPath)}`);
  } catch (err) {
    if (err.code !== 'EEXIST') {
      console.warn(`[WARN]  Could not backup ${basename(inputPath)}`);
    }
  }

  // Load image
  const image = sharp(inputPath);
  const metadata = await image.metadata();

  console.log(
    `\n🖼️  Processing: ${basename(inputPath)} (${metadata.width}x${metadata.height}, ${formatBytes(originalSize)})`,
  );

  let totalSaved = 0;

  // Generate responsive sizes
  for (const width of RESPONSIVE_SIZES) {
    // Skip if image is smaller than target width
    if (metadata.width < width) {
      console.log(`   ⏭️  Skipping ${width}w (image is ${metadata.width}px wide)`);
      continue;
    }

    const outputPath = join(dir, `${name}-${width}w.webp`);

    try {
      const resized = await image
        .clone()
        .resize(width, null, { withoutEnlargement: true })
        .webp({ quality: WEBP_QUALITY })
        .toFile(outputPath);

      const sizeDiff = originalSize - resized.size;
      totalSaved += sizeDiff;

      const sizeKB = (resized.size / 1024).toFixed(1);
      const savedPercent = ((sizeDiff / originalSize) * 100).toFixed(1);

      console.log(`   [OK] ${width}w: ${formatBytes(resized.size)} (saved ${savedPercent}%)`);

      // Warn if file is still large
      if (resized.size > MAX_SIZE_KB * 1024) {
        console.log(`   [WARN]  Warning: File is ${sizeKB}KB (target: <${MAX_SIZE_KB}KB)`);
      }
    } catch (err) {
      console.error(`   [ERROR] Error creating ${width}w:`, err.message);
      stats.errors++;
    }
  }

  // Create default WebP at original size
  const defaultOutput = join(dir, `${name}.webp`);
  try {
    const converted = await sharp(inputPath).webp({ quality: WEBP_QUALITY }).toFile(defaultOutput);

    const sizeDiff = originalSize - converted.size;
    totalSaved += sizeDiff;

    const savedPercent = ((sizeDiff / originalSize) * 100).toFixed(1);
    console.log(
      `   [OK] Original size WebP: ${formatBytes(converted.size)} (saved ${savedPercent}%)`,
    );
  } catch (err) {
    console.error(`   [ERROR] Error creating default WebP:`, err.message);
    stats.errors++;
  }

  stats.totalSaved += totalSaved;
  stats.processed++;

  console.log(`   [SAVE] Total saved for this image: ${formatBytes(totalSaved)}`);
}

/**
 * Main execution
 */
async function main() {
  console.log('[START] Starting image optimization...\n');
  console.log(`[DIR] Scanning: ${PUBLIC_DIR}\n`);

  const imageFiles = await getImageFiles(PUBLIC_DIR);

  if (imageFiles.length === 0) {
    console.log('ℹ️  No images found to optimize');
    return;
  }

  console.log(` Found ${imageFiles.length} images to process\n`);
  console.log('='.repeat(60));

  for (const file of imageFiles) {
    try {
      await optimizeImage(file);
    } catch (err) {
      console.error(`\n[ERROR] Error processing ${basename(file)}:`, err.message);
      stats.errors++;
      stats.skipped++;
    }
  }

  // Print summary
  console.log('\n' + '='.repeat(60));
  console.log('\n OPTIMIZATION SUMMARY');
  console.log('='.repeat(60));
  console.log(`[OK] Successfully processed: ${stats.processed}`);
  console.log(`⏭️  Skipped: ${stats.skipped}`);
  console.log(`[ERROR] Errors: ${stats.errors}`);
  console.log(`[SAVE] Total space saved: ${formatBytes(stats.totalSaved)}`);
  console.log('\n[DONE] Done!');
  console.log('\nℹ️  Original files backed up in _originals/ folders');
  console.log('ℹ️  Update your components to use the new responsive images');
}

main().catch(console.error);
