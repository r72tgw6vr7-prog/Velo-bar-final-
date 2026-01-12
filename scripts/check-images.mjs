#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';

const ROOT = path.resolve(process.cwd(), 'public', 'Velo Gallery');
const MAX_BYTES = 200 * 1024; // 200 KB

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(full);
    else {
      const ext = path.extname(entry.name).toLowerCase();
      if (!['.jpg', '.jpeg', '.png', '.webp', '.avif'].includes(ext)) continue;
      const st = await fs.stat(full);
      if (st.size > MAX_BYTES) {
        console.log(`${path.relative(ROOT, full)} - ${(st.size / 1024).toFixed(1)} KB`);
      }
    }
  }
}

(async () => {
  console.log('Large images (>200KB) in public/Velo Gallery:');
  await walk(ROOT);
})();