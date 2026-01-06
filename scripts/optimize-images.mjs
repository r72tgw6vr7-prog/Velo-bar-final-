import { promises as fs } from 'fs';
import path from 'path';
import sharp from 'sharp';

const SIZES = {
  thumbnail: 400,
  medium: 800,
  large: 1200,
  xlarge: 2400,
};

const QUALITY = {
  webp: 85,
  jpeg: 85,
};

async function createOptimizedImage(inputPath, outputDir, size, format) {
  const filename = path.basename(inputPath, path.extname(inputPath));
  const outputPath = path.join(outputDir, `${filename}@${size}w.${format}`);

  try {
    let pipeline = sharp(inputPath).resize(size, null, {
      withoutEnlargement: true,
      fit: 'inside',
    });

    if (format === 'webp') {
      pipeline = pipeline.webp({ quality: QUALITY.webp });
    } else {
      pipeline = pipeline.jpeg({ quality: QUALITY.jpeg });
    }

    await pipeline.toFile(outputPath);
    console.log(`[OK] Created ${path.relative(process.cwd(), outputPath)}`);
  } catch (error) {
    console.error(`[FAIL] Error processing ${inputPath}:`, error.message);
  }
}

async function processImage(imagePath) {
  const outputDir = path.join(path.dirname(imagePath), 'optimized');
  await fs.mkdir(outputDir, { recursive: true });

  // Create WebP and JPEG versions in all sizes
  for (const [sizeName, width] of Object.entries(SIZES)) {
    await createOptimizedImage(imagePath, outputDir, width, 'webp');
    await createOptimizedImage(imagePath, outputDir, width, 'jpeg');
  }
}

async function findImages(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const images = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (
        !entry.name.startsWith('.') &&
        entry.name !== 'node_modules' &&
        entry.name !== 'optimized'
      ) {
        images.push(...(await findImages(fullPath)));
      }
    } else if (/\.(jpe?g|png)$/i.test(entry.name)) {
      images.push(fullPath);
    }
  }

  return images;
}

async function main() {
  try {
    // Find all images in the public directory
    const publicDir = path.join(process.cwd(), 'public');
    const images = await findImages(publicDir);

    console.log(`Found ${images.length} images to process`);

    // Process each image
    for (const imagePath of images) {
      console.log(`\nProcessing ${path.relative(process.cwd(), imagePath)}`);
      await processImage(imagePath);
    }

    console.log('\n✨ Image optimization complete!');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

main();
