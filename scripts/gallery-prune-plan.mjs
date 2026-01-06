#!/usr/bin/env node
/**
 * Gallery Prune Plan Generator
 * - Reads tmp-gallery-consolidation-plan.json
 * - Produces a list of variant images safe to delete because they are NOT referenced anywhere in the repo
 * - This script DOES NOT delete files; it only writes gallery-prune-candidates.json
 */

import fs from 'fs/promises';
import fssync from 'fs';
import path from 'path';

const repoRoot = process.cwd();
const PLAN_PATH = path.join(repoRoot, 'tmp-gallery-consolidation-plan.json');
const OUTPUT_PATH = path.join(repoRoot, 'gallery-prune-candidates.json');

// Limit search to application code to avoid false positives in docs/reports
const TEXT_EXTS = new Set(['.ts', '.tsx', '.js', '.jsx', '.css', '.html', '.mjs', '.cjs']);

// Only scan these directories for references
const SCAN_DIRS = ['src', 'scripts', 'templates'];

async function fileExists(p) {
  try {
    await fs.stat(p);
    return true;
  } catch {
    return false;
  }
}

function isTextFile(fp) {
  return TEXT_EXTS.has(path.extname(fp).toLowerCase());
}

function walkSync(dir, out) {
  for (const entry of fssync.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === '.git' || entry.name === 'node_modules' || entry.name.startsWith('.'))
      continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkSync(full, out);
    else if (entry.isFile() && isTextFile(full)) out.push(full);
  }
}

async function loadPlan() {
  const raw = await fs.readFile(PLAN_PATH, 'utf8');
  return JSON.parse(raw);
}

function toPublicUrl(p) {
  // p is like "public/...."
  const rel = p.replace(/^public\//, '').replace(/\\/g, '/');
  return `/${rel}`;
}

async function main() {
  if (!(await fileExists(PLAN_PATH))) {
    console.error('Plan not found. Run: node scripts/gallery-inventory.mjs');
    process.exit(1);
  }

  const plan = await loadPlan();
  const candidates = [];

  for (const group of Object.values(plan.groups)) {
    for (const item of group.delete) {
      candidates.push({
        path: item.path,
        publicUrl: toPublicUrl(item.path),
        baseName: path.basename(item.path),
      });
    }
  }

  // Build searchable corpus from allowlisted directories only
  const files = [];
  for (const d of SCAN_DIRS) {
    const abs = path.join(repoRoot, d);
    try {
      const st = fssync.statSync(abs);
      if (st.isDirectory()) walkSync(abs, files);
    } catch {}
  }

  const referenced = new Set();

  for (const fp of files) {
    const content = fssync.readFileSync(fp, 'utf8');
    for (const c of candidates) {
      if (referenced.has(c.path)) continue;
      if (
        content.includes(c.publicUrl) ||
        content.includes(c.path) ||
        content.includes(c.baseName)
      ) {
        referenced.add(c.path);
      }
    }
  }

  const safeToDelete = candidates.filter((c) => !referenced.has(c.path));

  const report = {
    generatedAt: new Date().toISOString(),
    totalCandidates: candidates.length,
    referencedCount: referenced.size,
    safeToDeleteCount: safeToDelete.length,
    scannedFiles: files.length,
    examples: safeToDelete.slice(0, 20),
    safeToDelete,
  };

  await fs.writeFile(OUTPUT_PATH, JSON.stringify(report, null, 2), 'utf8');
  console.log(`Wrote prune plan: ${path.relative(repoRoot, OUTPUT_PATH)}`);
  console.log(`Safe to delete: ${safeToDelete.length} / ${candidates.length}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
