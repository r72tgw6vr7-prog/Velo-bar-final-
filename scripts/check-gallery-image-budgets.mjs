import path from 'path';
import { promises as fs } from 'fs';
import sharp from 'sharp';

const GALLERY_ROOT_PREFIX = 'public/Velo Gallery/';
const WIDTHS = [320, 400, 640, 800, 1024, 1200, 1600, 1920];

// Budgets are intentionally set to catch obvious regressions while not failing the existing baseline.
// If you later tighten budgets, do it gradually and update the workflow baseline accordingly.
const BUDGET_KIB = {
  320: { avif: 45, webp: 60, jpg: 75 },
  400: { avif: 65, webp: 85, jpg: 110 },
  640: { avif: 120, webp: 160, jpg: 190 },
  800: { avif: 150, webp: 200, jpg: 250 },
  1024: { avif: 200, webp: 260, jpg: 320 },
  1200: { avif: 240, webp: 320, jpg: 380 },
  1600: { avif: 310, webp: 420, jpg: 560 },
  1920: { avif: 350, webp: 500, jpg: 750 },
};

const isVariant = (file) => /-\d+w\.(avif|webp|jpe?g|png)$/i.test(file);
const isMeta = (file) => file.endsWith('.meta.json');

const statIfExists = async (absPath) => {
  try {
    return await fs.stat(absPath);
  } catch {
    return null;
  }
};

const bytesToKiB = (bytes) => bytes / 1024;

const getChangedFiles = () => {
  if (process.env.CHANGED_FILES && process.env.CHANGED_FILES.trim()) {
    return process.env.CHANGED_FILES.split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
  }
  return process.argv.slice(2).filter(Boolean);
};

const isGalleryPath = (p) => p.replaceAll('\\', '/').startsWith(GALLERY_ROOT_PREFIX);

const fail = (msg) => {
  // eslint-disable-next-line no-console
  console.error(msg);
  process.exitCode = 1;
};

const checkVariantBudget = async ({ absPath, width, format, relPath }) => {
  const stat = await statIfExists(absPath);
  if (!stat) return;

  const budget = BUDGET_KIB?.[width]?.[format];
  if (!budget) return;

  const sizeKiB = bytesToKiB(stat.size);
  if (sizeKiB > budget) {
    fail(`BUDGET_EXCEEDED: ${relPath} is ${sizeKiB.toFixed(1)} KiB (budget ${budget} KiB)`);
  }
};

const checkSourceImage = async ({ repoRoot, relPath }) => {
  const absSource = path.join(repoRoot, relPath);

  let metadataWidth;
  try {
    const meta = await sharp(absSource).metadata();
    metadataWidth = meta.width;
  } catch {
    // If sharp cannot read it, fail the file (we can't validate variants).
    fail(`INVALID_IMAGE: Cannot read metadata for ${relPath}`);
    return;
  }

  const base = relPath.replace(/\.[a-zA-Z0-9]+$/, '');
  const requiredWidths = WIDTHS.filter((w) => (metadataWidth ? metadataWidth >= w : w <= 640));

  for (const w of requiredWidths) {
    const webp = `${base}-${w}w.webp`;
    const jpg = `${base}-${w}w.jpg`;
    const avif = `${base}-${w}w.avif`;

    const absWebp = path.join(repoRoot, webp);
    const absJpg = path.join(repoRoot, jpg);
    const absAvif = path.join(repoRoot, avif);

    const webpStat = await statIfExists(absWebp);
    const jpgStat = await statIfExists(absJpg);
    const avifStat = await statIfExists(absAvif);

    if (!webpStat) fail(`MISSING_VARIANT: ${webp} (required for ${relPath})`);
    if (!jpgStat) fail(`MISSING_VARIANT: ${jpg} (required for ${relPath})`);
    if (!avifStat) fail(`MISSING_VARIANT: ${avif} (required for ${relPath})`);

    await checkVariantBudget({ absPath: absWebp, width: w, format: 'webp', relPath: webp });
    await checkVariantBudget({ absPath: absAvif, width: w, format: 'avif', relPath: avif });
    await checkVariantBudget({ absPath: absJpg, width: w, format: 'jpg', relPath: jpg });
  }
};

const checkVariantHasAvifSibling = async ({ repoRoot, relPath }) => {
  const match = relPath.match(/^(.*)-(\d+)w\.(webp|jpe?g|png)$/i);
  if (!match) return;

  const base = match[1];
  const width = Number(match[2]);
  if (!WIDTHS.includes(width)) return;

  const avif = `${base}-${width}w.avif`;
  const absAvif = path.join(repoRoot, avif);
  const stat = await statIfExists(absAvif);

  if (!stat) {
    fail(`MISSING_AVIF: ${avif} (expected alongside ${relPath})`);
    return;
  }

  await checkVariantBudget({ absPath: absAvif, width, format: 'avif', relPath: avif });
};

async function main() {
  const repoRoot = process.cwd();
  const changed = getChangedFiles();

  if (!changed.length) {
    // eslint-disable-next-line no-console
    console.log('No changed files provided; skipping gallery budget checks.');
    return;
  }

  const relevant = changed.filter(isGalleryPath).filter((p) => !isMeta(p));

  if (!relevant.length) {
    // eslint-disable-next-line no-console
    console.log('No changed gallery files; skipping.');
    return;
  }

  // eslint-disable-next-line no-console
  console.log(`Checking ${relevant.length} changed gallery file(s)...`);

  for (const relPath of relevant) {
    const lower = relPath.toLowerCase();

    // Source image: jpg/jpeg/png without size suffix
    if (/\.(jpe?g|png)$/i.test(lower) && !isVariant(relPath)) {
      await checkSourceImage({ repoRoot, relPath });
      continue;
    }

    // Variant changed: require AVIF sibling
    if (isVariant(relPath)) {
      await checkVariantHasAvifSibling({ repoRoot, relPath });
    }
  }

  if (process.exitCode && process.exitCode !== 0) {
    // eslint-disable-next-line no-console
    console.error(
      '\nGallery image checks failed. To regenerate variants (AVIF/WebP/JPG + blur placeholders):\n' +
        '  npm run optimize:images:gallery\n',
    );
    process.exit(process.exitCode);
  }

  // eslint-disable-next-line no-console
  console.log('Gallery image checks passed.');
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});
