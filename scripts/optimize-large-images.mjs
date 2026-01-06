#!/usr/bin/env node
/**
 * Image Optimization Script
 * Resizes and compresses large images for web performance
 * Generates responsive image variants (small, medium, large)
 */

import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DIR = path.join(__dirname, '..', 'public');

// Image configurations for responsive variants
const SIZES = {
  small: 640, // Mobile
  medium: 1024, // Tablet
  large: 1920, // Desktop
  xlarge: 2560, // 4K displays
};

// Quality settings for WebP
const QUALITY = {
  webp: 82,
  avif: 75,
};

/**
 * Optimize a single image and create responsive variants
 */
async function optimizeImage(inputPath, outputDir, baseName) {
  try {
    const metadata = await sharp(inputPath).metadata();
    console.log(`\nProcessing: ${baseName}`);
    console.log(`Original size: ${metadata.width}x${metadata.height}`);

    // Create output directory if it doesn't exist
    await fs.mkdir(outputDir, { recursive: true });

    const results = [];

    // Generate responsive variants
    for (const [sizeName, width] of Object.entries(SIZES)) {
      // Skip if original is smaller than target width
      if (metadata.width < width) continue;

      const outputFileName = `${baseName}-${width}w`;

      // Generate WebP
      const webpPath = path.join(outputDir, `${outputFileName}.webp`);
      await sharp(inputPath)
        .resize(width, null, {
          fit: 'inside',
          withoutEnlargement: true,
        })
        .webp({ quality: QUALITY.webp })
        .toFile(webpPath);

      const webpStats = await fs.stat(webpPath);
      results.push({
        file: `${outputFileName}.webp`,
        size: `${(webpStats.size / 1024).toFixed(2)} KB`,
        width,
      });

      // Generate AVIF (better compression, modern browsers)
      const avifPath = path.join(outputDir, `${outputFileName}.avif`);
      await sharp(inputPath)
        .resize(width, null, {
          fit: 'inside',
          withoutEnlargement: true,
        })
        .avif({ quality: QUALITY.avif })
        .toFile(avifPath);

      const avifStats = await fs.stat(avifPath);
      results.push({
        file: `${outputFileName}.avif`,
        size: `${(avifStats.size / 1024).toFixed(2)} KB`,
        width,
      });
    }

    console.log('Generated variants:');
    results.forEach((r) => console.log(`  - ${r.file}: ${r.size} @ ${r.width}w`));

    return results;
  } catch (error) {
    console.error(`Error optimizing ${baseName}:`, error);
    return [];
  }
}

/**
 * Main execution
 */
async function main() {
  console.log('🖼️  Image Optimization Tool');
  console.log('===========================\n');

  // Images to optimize (flagged by Lighthouse audit)
  const imagesToOptimize = [
    {
      input: 'public/assets/images/photos/studio/img3876.webp',
      output: 'public/assets/images/photos/studio/optimized',
      name: 'img3876',
    },
  ];

  // Also optimize artist images
  const artistsDir = path.join(PUBLIC_DIR, 'assets/images/photos/artists');
  try {
    const artistFolders = await fs.readdir(artistsDir);

    for (const folder of artistFolders) {
      const folderPath = path.join(artistsDir, folder);
      const stat = await fs.stat(folderPath);

      if (stat.isDirectory()) {
        const files = await fs.readdir(folderPath);
        for (const file of files) {
          if (file.match(/\.(jpg|jpeg|png|webp)$/i)) {
            imagesToOptimize.push({
              input: path.join('public/assets/images/photos/artists', folder, file),
              output: path.join('public/assets/images/photos/artists', folder, 'optimized'),
              name: path.parse(file).name,
            });
          }
        }
      }
    }
  } catch (error) {
    console.log('Note: Artist images directory not fully accessible');
  }

  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;

  for (const image of imagesToOptimize) {
    const inputPath = path.join(__dirname, '..', image.input);
    const outputDir = path.join(__dirname, '..', image.output);

    try {
      const originalStats = await fs.stat(inputPath);
      totalOriginalSize += originalStats.size;

      await optimizeImage(inputPath, outputDir, image.name);

      // Calculate optimized size
      const files = await fs.readdir(outputDir);
      for (const file of files) {
        if (file.startsWith(image.name)) {
          const stats = await fs.stat(path.join(outputDir, file));
          totalOptimizedSize += stats.size;
        }
      }
    } catch (error) {
      console.log(`Skipping ${image.input}: ${error.message}`);
    }
  }

  console.log('\n Summary');
  console.log('==========');
  console.log(`Original total: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Optimized total: ${(totalOptimizedSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(
    `Savings: ${(((totalOriginalSize - totalOptimizedSize) / totalOriginalSize) * 100).toFixed(1)}%`,
  );
  console.log('\n[OK] Optimization complete!');
  console.log('\nNext steps:');
  console.log('1. Update components to use responsive images with <picture> and srcset');
  console.log('2. Run `npm run build` to create production build');
  console.log('3. Run `npm run preview` to test optimized build');
  console.log('4. Run Lighthouse audit on preview build for accurate scores');
}

main().catch(console.error);
