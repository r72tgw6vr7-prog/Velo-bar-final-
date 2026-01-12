#!/usr/bin/env node
// Normalize gallery image references in src/data/galleryImages.ts
// Remove .jpg / .JPG / .jpeg / .JPEg suffixes so ResponsiveImage uses srcset

import fs from 'fs/promises';
import path from 'path';

const file = path.resolve(process.cwd(), 'src', 'data', 'galleryImages.ts');

async function run() {
  const content = await fs.readFile(file, 'utf8');
  // Replace .jpg/.JPG/.jpeg/.JPEG occurrences inside string literals
  const updated = content.replace(/(\/Velo%20Gallery\/[\w%20\-\/]+?)\.(jpe?g|JPE?G)('|\")/g, "$1$3");
  if (updated === content) {
    console.log('No changes necessary.');
    return;
  }
  await fs.writeFile(file, updated, 'utf8');
  console.log('Updated gallery image references in src/data/galleryImages.ts');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});