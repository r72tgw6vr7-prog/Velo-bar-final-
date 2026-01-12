#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';

const ROOT = path.resolve(process.cwd(), 'public', 'Velo Gallery');
const ARCHIVE = path.join(ROOT, 'originals-archive');
const SIZE_THRESHOLD = 200 * 1024; // 200KB

async function collectLargeOriginals() {
  const results = [];
  async function walk(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const e of entries) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) {
        if (e.name === 'optimized' || e.name === 'originals-archive') continue;
        await walk(full);
      } else {
        const ext = path.extname(e.name).toLowerCase();
        if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue;
        if (/-\d+w\.(webp|avif|jpg|png)$/i.test(e.name)) continue; // skip variants
        const st = await fs.stat(full);
        if (st.size >= SIZE_THRESHOLD) results.push({ path: full, size: st.size });
      }
    }
  }
  await walk(ROOT);
  return results;
}

async function main() {
  const args = process.argv.slice(2);
  const exec = args.includes('--execute');

  const list = await collectLargeOriginals();
  if (list.length === 0) {
    console.log('No candidate originals above threshold found.');
    return;
  }

  console.log('Candidate originals (>=200KB):');
  list.forEach((l) => console.log(` - ${path.relative(ROOT, l.path)} (${Math.round(l.size / 1024)} KB)`));

  if (!exec) {
    console.log('\nDry run. To move these files to archive, re-run:');
    console.log('  node scripts/archive-originals.mjs --execute');
    return;
  }

  // ensure archive dir
  await fs.mkdir(ARCHIVE, { recursive: true });
  for (const item of list) {
    const dest = path.join(ARCHIVE, path.relative(ROOT, item.path));
    await fs.mkdir(path.dirname(dest), { recursive: true });
    await fs.rename(item.path, dest);
    console.log(`Moved ${path.relative(ROOT, item.path)} -> originals-archive/${path.relative(ROOT, item.path)}`);
  }
  console.log('Archive complete. Keep originals in originals-archive/ for 30 days before deletion.');
}

main().catch((err) => { console.error(err); process.exit(1); });