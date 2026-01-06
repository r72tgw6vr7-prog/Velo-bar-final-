import { promises as fs } from 'fs';
import path from 'path';
import sharp from 'sharp';

const RESPONSIVE_WIDTHS = [320, 640, 1024, 1920];

const QUALITY = {
  avif: 65,
  webp: 80,
  jpg: 85,
};

// Generate blur placeholder
async function generateBlurPlaceholder(inputPath) {
  try {
    const buffer = await sharp(inputPath)
      .resize(20, null, { fit: 'inside' })
      .blur(5)
      .webp({ quality: 20 })
      .toBuffer();

    return `data:image/webp;base64,${buffer.toString('base64')}`;
  } catch (error) {
    console.error(`Blur placeholder failed for ${inputPath}:`, error.message);
    return '';
  }
}

async function createOptimizedVariant(inputPath, outputDir, width, format) {
  const filename = path.basename(inputPath, path.extname(inputPath));
  const outputPath = path.join(outputDir, `${filename}-${width}w.${format}`);

  // Skip if already exists
  try {
    await fs.access(outputPath);
    return outputPath; // File exists, skip
  } catch {
    // File doesn't exist, continue
  }

  try {
    let pipeline = sharp(inputPath).resize(width, null, {
      withoutEnlargement: true,
      fit: 'inside',
    });

    if (format === 'avif') {
      pipeline = pipeline.avif({ quality: QUALITY.avif, effort: 4 });
    } else if (format === 'webp') {
      pipeline = pipeline.webp({ quality: QUALITY.webp });
    } else {
      pipeline = pipeline.jpeg({ quality: QUALITY.jpg });
    }

    await pipeline.toFile(outputPath);
    return outputPath;
  } catch (error) {
    console.error(`Failed ${format} @ ${width}w for ${inputPath}:`, error.message);
    return null;
  }
}

async function processImage(imagePath) {
  const dir = path.dirname(imagePath);
  const ext = path.extname(imagePath);
  const base = path.basename(imagePath, ext);

  console.log(`\n📸 ${base}${ext}`);

  // Check if meta.json already exists
  const metaPath = path.join(dir, `${base}.meta.json`);
  let skipMeta = false;
  try {
    await fs.access(metaPath);
    skipMeta = true;
    console.log('  ⏭️  Metadata exists');
  } catch {
    // Generate metadata
    const placeholder = await generateBlurPlaceholder(imagePath);
    await fs.writeFile(
      metaPath,
      JSON.stringify(
        {
          placeholder,
          originalFile: path.basename(imagePath),
          generated: new Date().toISOString(),
        },
        null,
        2,
      ),
    );
    console.log('  ✓ Blur placeholder');
  }

  // Generate all variants
  const formats = ['avif', 'webp', 'jpg'];
  let generatedCount = 0;

  for (const width of RESPONSIVE_WIDTHS) {
    for (const format of formats) {
      const result = await createOptimizedVariant(imagePath, dir, width, format);
      if (result) generatedCount++;
    }
  }

  if (generatedCount > 0) {
    console.log(`  ✓ Generated ${generatedCount} new variants`);
  } else {
    console.log('  ⏭️  All variants exist');
  }
}

async function findSourceImages(dir, exclude = ['node_modules', 'dist']) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const images = [];

  for (const entry of entries) {
    if (exclude.includes(entry.name) || entry.name.startsWith('.')) continue;

    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      images.push(...(await findSourceImages(fullPath, exclude)));
    } else if (
      /\.(jpe?g|png)$/i.test(entry.name) &&
      !/-\d+w\.(avif|webp|jpe?g)$/i.test(entry.name)
    ) {
      images.push(fullPath);
    }
  }

  return images;
}

async function main() {
  const targetDir = process.argv[2] || path.join(process.cwd(), 'public/Velo Gallery');

  console.log('🚀 Enhanced Image Optimizer with AVIF + Blur Placeholders');
  console.log(`📁 Target: ${targetDir}\n`);

  const images = await findSourceImages(targetDir);
  console.log(`Found ${images.length} source images\n`);

  for (const img of images) {
    await processImage(img);
  }

  console.log('\n✨ Complete!');
  console.log(`Generated: AVIF + WebP + JPEG @ 4 sizes + blur placeholders`);
}

main().catch(console.error);
