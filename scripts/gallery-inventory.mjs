#!/usr/bin/env node
/*
  scripts/gallery-inventory.mjs
  - Inventories ALL images under common asset roots
  - Gets dimensions via `sips` (fallback to `mdls`) on macOS
  - Groups filename variants by a normalized base name
  - Picks a single master per group based on resolution and preferred format
  - Writes:
      - tmp-gallery-inventory.json
      - tmp-gallery-consolidation-plan.json
  - Does NOT modify, move, or delete any files.
*/

import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';

const repoRoot = process.cwd();
const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.JPG', '.JPEG', '.PNG', '.WEBP']);
const ASSET_ROOTS = [
  'public',
  'assets',
  'images',
  path.join('src', 'assets'),
  path.join('src', 'images'),
  'static',
  path.join('src', 'static'),
];
const CONSOLIDATED_FOLDER = path.join('public', 'gallery');

function isImageFile(p) {
  const ext = path.extname(p);
  return IMAGE_EXTS.has(ext);
}

function safeStat(p) {
  try {
    return fs.statSync(p);
  } catch {
    return null;
  }
}

function getFormatFromExt(p) {
  const ext = path.extname(p).toLowerCase();
  if (ext === '.jpg' || ext === '.jpeg') return 'jpg';
  if (ext === '.png') return 'png';
  if (ext === '.webp') return 'webp';
  return ext.replace('.', '') || 'unknown';
}

function getDimensionsViaSips(filePath) {
  try {
    const out = execFileSync('sips', ['-g', 'pixelWidth', '-g', 'pixelHeight', filePath], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    const wMatch = out.match(/pixelWidth:\s*(\d+)/);
    const hMatch = out.match(/pixelHeight:\s*(\d+)/);
    if (wMatch && hMatch) {
      return { width: Number(wMatch[1]), height: Number(hMatch[1]) };
    }
  } catch (_) {}
  return null;
}

function getDimensionsViaMdls(filePath) {
  try {
    const out = execFileSync(
      'mdls',
      ['-name', 'kMDItemPixelWidth', '-name', 'kMDItemPixelHeight', filePath],
      {
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'pipe'],
      },
    );
    const wMatch = out.match(/kMDItemPixelWidth\s*=\s*(\d+)/);
    const hMatch = out.match(/kMDItemPixelHeight\s*=\s*(\d+)/);
    if (wMatch && hMatch) {
      return { width: Number(wMatch[1]), height: Number(hMatch[1]) };
    }
  } catch (_) {}
  return null;
}

function getImageDimensions(filePath) {
  // Try sips first, fallback to mdls
  return (
    getDimensionsViaSips(filePath) ||
    getDimensionsViaMdls(filePath) || { width: null, height: null }
  );
}

function normalizeGroupKey(filename) {
  // remove extension
  let base = filename.replace(/\.[^.]+$/, '');
  base = base.toLowerCase();
  base = base.replace(/[\s_]+/g, '-');
  // common size/variant suffixes
  base = base.replace(/@\d+x\b/g, ''); // @2x, @3x
  base = base.replace(/[\-_]\d{2,5}w\b/g, ''); // -1024w, _2048w
  base = base.replace(/[\-_]\d{2,5}x\d{2,5}\b/g, ''); // -800x600
  base = base.replace(
    /[\-_](small|sm|medium|md|large|lg|xl|xxl|thumbnail|thumb|min|minified|compressed|retina)\b/g,
    '',
  );
  base = base.replace(/[\-_](copy|final|new|v\d+)\b/g, '');
  base = base.replace(/\(\d+\)$/g, ''); // (1), (2)
  base = base.replace(/--+/g, '-');
  base = base.replace(/^-+|-+$/g, '');
  return base;
}

function formatRank(format) {
  if (format === 'webp') return 3;
  if (format === 'jpg') return 2;
  if (format === 'png') return 1;
  return 0;
}

function chooseMaster(items) {
  // items: [{ width, height, sizeBytes, format, path }]
  const withDims = items.filter((i) => i.width && i.height);
  if (withDims.length === 0) {
    // Fallback: pick the largest file size, prefer modern format
    return items.sort((a, b) => {
      const fr = formatRank(b.format) - formatRank(a.format);
      if (fr !== 0) return fr;
      return (b.sizeBytes || 0) - (a.sizeBytes || 0);
    })[0];
  }
  const maxRes = Math.max(...withDims.map((i) => i.width * i.height));
  const bestWebp = withDims
    .filter((i) => i.format === 'webp')
    .sort((a, b) => b.width * b.height - a.width * a.height)[0];
  if (bestWebp && bestWebp.width * bestWebp.height >= 0.9 * maxRes) {
    return bestWebp;
  }
  // Otherwise pick highest resolution; tiebreaker by format rank then smaller size
  return withDims.sort((a, b) => {
    const res = b.width * b.height - a.width * a.height;
    if (res !== 0) return res;
    const fr = formatRank(b.format) - formatRank(a.format);
    if (fr !== 0) return fr;
    return (a.sizeBytes || 0) - (b.sizeBytes || 0);
  })[0];
}

function walk(dir, results) {
  const list = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of list) {
    if (entry.name === '.git' || entry.name === 'node_modules' || entry.name === '.DS_Store')
      continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, results);
    } else if (entry.isFile() && isImageFile(full)) {
      results.push(full);
    }
  }
}

function ensureUnique(arr) {
  return Array.from(new Set(arr));
}

function main() {
  const roots = ASSET_ROOTS.map((r) => path.join(repoRoot, r)).filter((r) =>
    safeStat(r)?.isDirectory(),
  );
  const files = [];
  for (const root of roots) walk(root, files);
  const uniqueFiles = ensureUnique(files);

  const inventory = uniqueFiles.map((p) => {
    const st = safeStat(p) || { size: null };
    const { width, height } = getImageDimensions(p);
    const format = getFormatFromExt(p);
    const relPath = path.relative(repoRoot, p);
    const base = path.basename(p);
    return {
      path: relPath,
      sizeBytes: st.size ?? null,
      width,
      height,
      format,
      baseName: base,
      groupKey: normalizeGroupKey(base),
    };
  });

  const groups = new Map();
  for (const item of inventory) {
    if (!groups.has(item.groupKey)) groups.set(item.groupKey, []);
    groups.get(item.groupKey).push(item);
  }

  const plan = {
    consolidatedFolder: CONSOLIDATED_FOLDER,
    groups: {},
    keptCount: 0,
    deleteCount: 0,
  };

  for (const [key, items] of groups.entries()) {
    const master = chooseMaster(items);
    const toDelete = items.filter((i) => i !== master);
    const newName = `gallery-${key}.${master.format}`;
    const newPath = path.join(CONSOLIDATED_FOLDER, newName);
    plan.groups[key] = {
      chosen: {
        ...master,
        proposedNewName: newName,
        proposedNewPath: newPath,
      },
      delete: toDelete,
    };
    plan.keptCount += 1;
    plan.deleteCount += toDelete.length;
  }

  // Write outputs at repo root (consistent with existing tmp-gallery-*.json files)
  const invOut = path.join(repoRoot, 'tmp-gallery-inventory.json');
  const planOut = path.join(repoRoot, 'tmp-gallery-consolidation-plan.json');
  fs.writeFileSync(
    invOut,
    JSON.stringify(
      {
        collectedAt: new Date().toISOString(),
        roots: roots.map((r) => path.relative(repoRoot, r)),
        totalImages: inventory.length,
        inventory,
      },
      null,
      2,
    ),
  );
  fs.writeFileSync(
    planOut,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        consolidatedFolder: CONSOLIDATED_FOLDER,
        groupCount: Object.keys(plan.groups).length,
        keptCount: plan.keptCount,
        deleteCount: plan.deleteCount,
        groups: plan.groups,
      },
      null,
      2,
    ),
  );

  console.log(`Inventory written to ${path.relative(repoRoot, invOut)}`);
  console.log(`Consolidation plan written to ${path.relative(repoRoot, planOut)}`);
}

main();
