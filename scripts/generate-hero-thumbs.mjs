#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const workspaceRoot = path.resolve(
  decodeURIComponent(new URL(import.meta.url).pathname),
  '..',
  '..',
);
const publicRoot = path.join(workspaceRoot, 'public');
const reportPath = path.join(workspaceRoot, 'artifacts', 'image-path-report.json');
const srcListPath = path.join(workspaceRoot, 'src', 'data', 'parallaxGalleryImages.ts');

if (!fs.existsSync(reportPath)) {
  console.error('Missing report:', reportPath);
  process.exit(2);
}
if (!fs.existsSync(srcListPath)) {
  console.error('Missing parallax images list:', srcListPath);
  process.exit(2);
}

const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
const srcContent = fs.readFileSync(srcListPath, 'utf8');
let basePaths = Array.from(srcContent.matchAll(/\{\s*basePath:\s*"([^"]+)"/g)).map((m) => m[1]);

// Also include images referenced in HomePage (service cards + location cards)
const homePagePath = path.join(workspaceRoot, 'src', 'pages', 'HomePage.tsx');
if (fs.existsSync(homePagePath)) {
  const homeContent = fs.readFileSync(homePagePath, 'utf8');
  const homeImageMatches = Array.from(homeContent.matchAll(/image:\s*['"]([^'"]+)['"]/g)).map(
    (m) => m[1],
  );
  basePaths = basePaths.concat(homeImageMatches);
}

// Deduplicate
basePaths = Array.from(new Set(basePaths));

// Thumbnails to produce (main thumb sizes for hero/carousel)
const sizes = [80, 120];
const format = 'webp';

async function ensureThumbs() {
  for (const bp of basePaths) {
    // find match in report (exact or decoded)
    const entry = report.report.find(
      (r) => r.reference === bp || r.decoded === bp || r.reference === decodeURIComponent(bp),
    );
    if (!entry || !entry.match) {
      console.warn('No match for', bp);
      continue;
    }
    const match = entry.match; // like '/Velo Gallery/.../FILE.jpg'
    const absSrc = path.join(publicRoot, match.replace(/^\//, ''));
    if (!fs.existsSync(absSrc)) {
      console.warn('Source file missing on disk, skipping:', absSrc);
      continue;
    }

    const dir = path.dirname(absSrc);
    const base = path.basename(match, path.extname(match));

    // generate sizes/webp thumbnails
    for (const s of sizes) {
      const outName = `${base}-${s}w.${format}`;
      const outPath = path.join(dir, outName);
      try {
        if (fs.existsSync(outPath)) continue;
        await sharp(absSrc).resize({ width: s }).webp({ quality: 60 }).toFile(outPath);
        console.log('Wrote', outPath);
      } catch (err) {
        console.error('Failed to generate', outPath, err.message);
      }
    }

    // generate/update meta with placeholder (from smallest thumb) and aspectRatio
    const metaPath = path.join(dir, `${base}.meta.json`);
    try {
      // read original dimensions
      const metaInfo = await sharp(absSrc).metadata();
      const origW = metaInfo.width || 1;
      const origH = metaInfo.height || 1;
      const aspectRatio = +(origW / origH).toFixed(3);

      // create tiny placeholder from 80px WebP if available, otherwise fallback to tiny blur
      let placeholderDataUri = '';
      const tinyPath = path.join(dir, `${base}-${Math.min(...sizes)}w.${format}`);
      if (fs.existsSync(tinyPath)) {
        const buf = fs.readFileSync(tinyPath);
        placeholderDataUri = `data:image/webp;base64,${buf.toString('base64')}`;
      } else {
        const buf = await sharp(absSrc)
          .resize({ width: 20 })
          .blur(1)
          .webp({ quality: 50 })
          .toBuffer();
        placeholderDataUri = `data:image/webp;base64,${buf.toString('base64')}`;
      }

      const newMeta = { placeholder: placeholderDataUri, aspectRatio };
      fs.writeFileSync(metaPath, JSON.stringify(newMeta));
      console.log('Wrote meta', metaPath);
    } catch (err) {
      console.error('Failed to write meta for', absSrc, err.message);
    }
  }
}

ensureThumbs()
  .then(() => {
    console.log('Done generating hero thumbnails');
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
