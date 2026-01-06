#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const workspaceRoot = path.resolve(
  decodeURIComponent(new URL(import.meta.url).pathname),
  '..',
  '..',
);
console.log('workspaceRoot', workspaceRoot);
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
const reportMap = new Map(report.report.map((r) => [r.reference, r.match]));

const srcContent = fs.readFileSync(srcListPath, 'utf8');
const basePaths = Array.from(srcContent.matchAll(/\{\s*basePath:\s*"([^"]+)"/g)).map((m) => m[1]);

const sizes = [320, 640];
const formats = ['webp', 'jpg'];

async function ensureThumbs() {
  for (const bp of basePaths) {
    // find match in report (exact or decoded)
    const entry = report.report.find((r) => r.reference === bp || r.decoded === bp);
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

    // generate sizes/formats
    for (const s of sizes) {
      for (const f of formats) {
        const outName = `${base}-${s}w.${f}`;
        const outPath = path.join(dir, outName);
        try {
          // skip if exists
          if (fs.existsSync(outPath)) continue;
          await sharp(absSrc)
            .resize({ width: s })
            .toFormat(
              f === 'jpg' ? 'jpeg' : f,
              f === 'jpg' ? { mozjpeg: true, quality: 80 } : { quality: 70 },
            )
            .toFile(outPath);
          console.log('Wrote', outPath);
        } catch (err) {
          console.error('Failed to generate', outPath, err.message);
        }
      }
    }

    // generate a tiny placeholder meta if not exists
    const metaPath = path.join(dir, `${base}.meta.json`);
    if (!fs.existsSync(metaPath)) {
      try {
        const buf = await sharp(absSrc)
          .resize({ width: 20 })
          .blur(1)
          .webp({ quality: 50 })
          .toBuffer();
        const dataUri = `data:image/webp;base64,${buf.toString('base64')}`;
        const meta = { placeholder: dataUri };
        fs.writeFileSync(metaPath, JSON.stringify(meta));
        console.log('Wrote meta', metaPath);
      } catch (err) {
        console.error('Failed to write meta for', absSrc, err.message);
      }
    }
  }
}

ensureThumbs()
  .then(() => {
    console.log('Done generating parallax thumbs');
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
