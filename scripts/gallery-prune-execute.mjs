#!/usr/bin/env node
/**
 * Gallery Prune Executor (DESTRUCTIVE)
 * - Reads gallery-prune-candidates.json
 * - Permanently deletes listed files (restricted to repo/public/*)
 * - Removes empty directories after deletion
 *
 * Safety:
 * - Only deletes paths beginning with repo/public
 * - Only deletes paths present in gallery-prune-candidates.json
 * - Prints a summary of deletions and skipped items
 */

import fs from 'fs/promises';
import fssync from 'fs';
import path from 'path';

const repoRoot = process.cwd();
const PUBLIC_DIR = path.join(repoRoot, 'public');
const INPUT = path.join(repoRoot, 'gallery-prune-candidates.json');

async function fileExists(p) {
  try {
    await fs.stat(p);
    return true;
  } catch {
    return false;
  }
}

function withinPublic(absPath) {
  const normalized = path.resolve(absPath);
  return normalized.startsWith(path.resolve(PUBLIC_DIR) + path.sep);
}

async function deleteFile(absPath) {
  try {
    await fs.unlink(absPath);
    return true;
  } catch (e) {
    return false;
  }
}

async function removeEmptyDirs(startDir) {
  // Post-order traversal: delete a dir if it is empty after processing children
  async function walk(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const e of entries) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) await walk(full);
    }
    // Attempt remove if empty
    try {
      await fs.rmdir(dir);
    } catch (_) {
      // not empty or cannot remove
    }
  }
  await walk(startDir);
}

async function main() {
  if (!(await fileExists(INPUT))) {
    console.error(
      'Missing gallery-prune-candidates.json. Run: node scripts/gallery-prune-plan.mjs',
    );
    process.exit(1);
  }

  const raw = await fs.readFile(INPUT, 'utf8');
  const report = JSON.parse(raw);
  const candidates = report.safeToDelete || [];

  let deleted = 0;
  let skipped = 0;
  const errors = [];

  for (const c of candidates) {
    const abs = path.join(repoRoot, c.path);
    if (!withinPublic(abs)) {
      skipped++;
      continue;
    }
    if (!(await fileExists(abs))) {
      // Already gone
      continue;
    }
    const ok = await deleteFile(abs);
    if (ok) deleted++;
    else {
      skipped++;
      errors.push(c.path);
    }
  }

  // Cleanup empty directories under public/Velo Gallery and public/gallery
  await removeEmptyDirs(path.join(PUBLIC_DIR, 'Velo Gallery')).catch(() => {});
  await removeEmptyDirs(path.join(PUBLIC_DIR, 'gallery')).catch(() => {});

  console.log('Gallery prune completed');
  console.log('========================');
  console.log(`Deleted: ${deleted}`);
  console.log(`Skipped: ${skipped}`);
  if (errors.length) {
    console.log('Errors (could not delete):');
    for (const p of errors.slice(0, 20)) console.log(' -', p);
    if (errors.length > 20) console.log(` ...and ${errors.length - 20} more`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
