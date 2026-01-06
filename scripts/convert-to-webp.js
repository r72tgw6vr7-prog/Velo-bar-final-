#!/usr/bin/env node

/**
 * Image Optimization Script - Convert JPG/PNG to WebP
 *
 * This script converts all JPG and PNG images in public/images to WebP format
 * while preserving the original files for fallback support.
 *
 * Requirements: npm install sharp (already in project)
 * Usage: node scripts/convert-to-webp.js
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

// Configuration
const IMAGE_DIR = path.join(__dirname, '../public/images');
const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png'];
const WEBP_QUALITY = 85; // Quality for WebP conversion (1-100)
const DRY_RUN = process.argv.includes('--dry-run');

// Statistics
let stats = {
  total: 0,
  converted: 0,
  skipped: 0,
  errors: 0,
  sizeSaved: 0,
};

/**
 * Check if sharp is available
 */
async function checkSharp() {
  try {
    require('sharp');
    return true;
  } catch (error) {
    console.error('[ERROR] Sharp is not installed. Installing...');
    try {
      await execAsync('npm install sharp --save-dev');
      console.log('[OK] Sharp installed successfully');
      return true;
    } catch (installError) {
      console.error('[ERROR] Failed to install sharp:', installError.message);
      console.log('\nPlease install sharp manually: npm install sharp --save-dev');
      return false;
    }
  }
}

/**
 * Get all image files recursively
 */
function getAllImages(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      getAllImages(filePath, fileList);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (SUPPORTED_FORMATS.includes(ext)) {
        fileList.push(filePath);
      }
    }
  });

  return fileList;
}

/**
 * Convert a single image to WebP
 */
async function convertToWebP(imagePath) {
  const sharp = require('sharp');
  const ext = path.extname(imagePath);
  const webpPath = imagePath.replace(ext, '.webp');

  // Skip if WebP already exists
  if (fs.existsSync(webpPath)) {
    stats.skipped++;
    console.log(`⏭️  Skipped (exists): ${path.relative(IMAGE_DIR, imagePath)}`);
    return;
  }

  if (DRY_RUN) {
    stats.converted++;
    console.log(`🔄 Would convert: ${path.relative(IMAGE_DIR, imagePath)}`);
    return;
  }

  try {
    // Get original file size
    const originalSize = fs.statSync(imagePath).size;

    // Convert to WebP
    await sharp(imagePath).webp({ quality: WEBP_QUALITY }).toFile(webpPath);

    // Get new file size
    const webpSize = fs.statSync(webpPath).size;
    const saved = originalSize - webpSize;
    const percentSaved = ((saved / originalSize) * 100).toFixed(1);

    stats.converted++;
    stats.sizeSaved += saved;

    console.log(`[OK] Converted: ${path.relative(IMAGE_DIR, imagePath)}`);
    console.log(
      `   [SAVE] Size: ${formatBytes(originalSize)} → ${formatBytes(webpSize)} (${percentSaved}% smaller)`,
    );
  } catch (error) {
    stats.errors++;
    console.error(
      `[ERROR] Error converting ${path.relative(IMAGE_DIR, imagePath)}:`,
      error.message,
    );
  }
}

/**
 * Format bytes to human readable
 */
function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Main execution
 */
async function main() {
  console.log('🖼️  Medusa Image Optimization - WebP Converter\n');
  console.log('================================================\n');

  if (DRY_RUN) {
    console.log('[CHECK] DRY RUN MODE - No files will be modified\n');
  }

  // Check if sharp is available
  const sharpAvailable = await checkSharp();
  if (!sharpAvailable) {
    process.exit(1);
  }

  // Check if image directory exists
  if (!fs.existsSync(IMAGE_DIR)) {
    console.error(`[ERROR] Image directory not found: ${IMAGE_DIR}`);
    process.exit(1);
  }

  console.log(`📂 Scanning: ${IMAGE_DIR}\n`);

  // Get all images
  const images = getAllImages(IMAGE_DIR);
  stats.total = images.length;

  if (images.length === 0) {
    console.log('[ERROR] No images found to convert');
    process.exit(0);
  }

  console.log(`Found ${images.length} images to process\n`);
  console.log('Converting...\n');

  // Convert all images
  for (const imagePath of images) {
    await convertToWebP(imagePath);
  }

  // Print summary
  console.log('\n================================================');
  console.log(' CONVERSION SUMMARY');
  console.log('================================================\n');
  console.log(`Total images found:     ${stats.total}`);
  console.log(`[OK] Converted:           ${stats.converted}`);
  console.log(`⏭️  Skipped (exists):    ${stats.skipped}`);
  console.log(`[ERROR] Errors:              ${stats.errors}`);
  console.log(`[SAVE] Total space saved:   ${formatBytes(stats.sizeSaved)}\n`);

  if (!DRY_RUN && stats.converted > 0) {
    console.log('✨ Next steps:');
    console.log('1. Update components to use <picture> tags with WebP + fallback');
    console.log('2. Test image loading in different browsers');
    console.log('3. Consider adding AVIF format for even better compression\n');
    console.log('Example <picture> usage:');
    console.log('<picture>');
    console.log('  <source srcSet="/images/photo.webp" type="image/webp" />');
    console.log('  <img src="/images/photo.jpg" alt="Description" />');
    console.log('</picture>\n');
  }

  if (DRY_RUN) {
    console.log('[TIP] Run without --dry-run to actually convert images\n');
  }
}

// Run the script
main().catch((error) => {
  console.error('💥 Fatal error:', error);
  process.exit(1);
});
