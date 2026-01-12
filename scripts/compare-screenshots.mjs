#!/usr/bin/env node
/*
Compare baseline vs candidate screenshots using pixelmatch.
Usage: node scripts/compare-screenshots.mjs --baseline=tests/baseline --candidate=tests/candidate/VITE_PERF_HERO_SVG
Returns non-zero exit code if any mismatch is found.
*/
import fs from 'fs';
import path from 'path';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';

const argv = Object.fromEntries(process.argv.slice(2).map((arg) => arg.split('=').map((s) => s.replace(/^--/, ''))));
const baselineDir = argv.baseline || 'tests/baseline';
const candidateDir = argv.candidate || 'tests/candidate';
const diffDir = argv.diff || 'tests/diffs';

async function listPngs(dir) {
  try {
    const files = await fs.promises.readdir(dir);
    return files.filter((f) => f.endsWith('.png'));
  } catch {
    return [];
  }
}

async function compare() {
  await fs.promises.mkdir(diffDir, { recursive: true });
  const files = await listPngs(baselineDir);
  let failures = [];

  for (const file of files) {
    const basePath = path.join(baselineDir, file);
    const candPath = path.join(candidateDir, file);
    if (!fs.existsSync(candPath)) {
      console.warn(`Missing candidate: ${candPath}`);
      failures.push({ file, reason: 'missing-candidate' });
      continue;
    }

    const img1 = PNG.sync.read(fs.readFileSync(basePath));
    const img2 = PNG.sync.read(fs.readFileSync(candPath));

    if (img1.width !== img2.width || img1.height !== img2.height) {
      console.warn(`Size mismatch for ${file}: baseline ${img1.width}x${img1.height} vs candidate ${img2.width}x${img2.height}`);
      failures.push({ file, reason: 'size-mismatch' });
      continue;
    }

    const diff = new PNG({ width: img1.width, height: img1.height });
    const mismatched = pixelmatch(img1.data, img2.data, diff.data, img1.width, img1.height, { threshold: 0.1 });

    if (mismatched > 0) {
      const outPath = path.join(diffDir, `${file.replace('.png', '')}-diff.png`);
      fs.writeFileSync(outPath, PNG.sync.write(diff));
      console.log(`DIFF ${file}: ${mismatched} pixels -> ${outPath}`);
      failures.push({ file, reason: 'pixels-mismatch', mismatched, diffPath: outPath });
    } else {
      console.log(`OK ${file}`);
    }
  }

  if (failures.length > 0) {
    console.error(`Comparison finished: ${failures.length} mismatches found.`);
    console.error(JSON.stringify(failures, null, 2));
    process.exit(2);
  }

  console.log('All images are identical.');
}

compare().catch((err) => {
  console.error(err);
  process.exit(1);
});
