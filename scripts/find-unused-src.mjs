#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const rootDir = path.resolve(path.dirname(__filename), '..');
const srcRoot = path.join(rootDir, 'src');

/** Collect all TS/TSX source files under src (excluding tests/specs/__tests__) */
const allFiles = [];

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === '__tests__') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
    } else if (
      /\.tsx?$/.test(entry.name) &&
      !/(\.test|\.spec)\.tsx?$/.test(entry.name) &&
      !/\.d\.ts$/.test(entry.name)
    ) {
      allFiles.push(full);
    }
  }
}

walk(srcRoot);

/** Resolve a module specifier to a concrete file under src, if possible */
function resolveWithExtensions(base) {
  const candidates = [
    base,
    `${base}.tsx`,
    `${base}.ts`,
    path.join(base, 'index.tsx'),
    path.join(base, 'index.ts'),
  ];
  for (const candidate of candidates) {
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) return candidate;
  }
  return null;
}

function resolveAsSrc(rel) {
  const base = path.join(srcRoot, rel);
  return resolveWithExtensions(base);
}

function resolveSpecifier(spec, importer) {
  if (!spec) return null;

  // Alias-based internal imports
  if (spec.startsWith('@/')) {
    const rel = spec.replace(/^@\//, '');
    return resolveAsSrc(rel);
  }
  if (spec.startsWith('@core/')) {
    const rel = spec.replace(/^@core\//, 'core/');
    return resolveAsSrc(rel);
  }

  // Relative imports
  if (spec.startsWith('.') || spec.startsWith('..')) {
    const base = path.resolve(path.dirname(importer), spec);
    return resolveWithExtensions(base);
  }

  // Bare module or other alias we don't know => treat as external
  return null;
}

/** Build adjacency map: file -> Set of internal dependencies */
const deps = new Map();

function addDepsForFile(file) {
  const text = fs.readFileSync(file, 'utf8');
  const imports = new Set();

  const importFromRegex = /import\s+[^'";]*?from\s+['"]([^'"\n]+)['"]/g;
  const dynamicImportRegex = /import\(\s*['"]([^'"\n]+)['"]\s*\)/g;
  const lazyImportRegex = /lazy\(\s*\(\s*=>\s*import\(\s*['"]([^'"\n]+)['"]\s*\)/g;
  const exportFromRegex = /export\s+\*\s+from\s+['"]([^'"\n]+)['"]/g;
  const exportNamedFromRegex = /export\s+{[^}]+}\s+from\s+['"]([^'"\n]+)['"]/g;

  function addMatches(re) {
    let m;
    while ((m = re.exec(text)) !== null) {
      const spec = m[1];
      const resolved = resolveSpecifier(spec, file);
      if (resolved) imports.add(resolved);
    }
  }

  addMatches(importFromRegex);
  addMatches(dynamicImportRegex);
  addMatches(lazyImportRegex);
  addMatches(exportFromRegex);
  addMatches(exportNamedFromRegex);

  deps.set(file, imports);
}

for (const file of allFiles) {
  addDepsForFile(file);
}

/** Treat roots as always-used entrypoints */
const roots = [];
function maybeAddRoot(rel) {
  const full = path.join(rootDir, rel);
  if (fs.existsSync(full)) roots.push(full);
}

maybeAddRoot('src/main.tsx');
maybeAddRoot('src/main.ts');
maybeAddRoot('src/App.tsx');
maybeAddRoot('src/routes.tsx');
maybeAddRoot('src/ssg.routes.ts');
maybeAddRoot('src/contexts/LanguageContext.tsx');
maybeAddRoot('src/contexts/ThemeContext.tsx');
maybeAddRoot('src/foundation/BusinessProvider.tsx');

/** Also treat root-level API entrypoints as roots for src dependencies */
function scanExternalEntry(entryPath) {
  if (!fs.existsSync(entryPath)) return;
  const text = fs.readFileSync(entryPath, 'utf8');
  const importFromRegex = /import\s+[^'";]*?from\s+['"]([^'"\n]+)['"]/g;
  const dynamicImportRegex = /import\(\s*['"]([^'"\n]+)['"]\s*\)/g;
  const lazyImportRegex = /lazy\(\s*\(\s*=>\s*import\(\s*['"]([^'"\n]+)['"]\s*\)/g;

  function addMatches(re) {
    let m;
    while ((m = re.exec(text)) !== null) {
      const spec = m[1];
      const resolved = resolveSpecifier(spec, entryPath);
      if (resolved && resolved.startsWith(srcRoot) && fs.existsSync(resolved)) {
        if (!roots.includes(resolved)) roots.push(resolved);
      }
    }
  }

  addMatches(importFromRegex);
  addMatches(dynamicImportRegex);
  addMatches(lazyImportRegex);
}

function scanExternalTree(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanExternalTree(full);
    } else if (/\.ts$/.test(entry.name) && !/(\.test|\.spec)\.ts$/.test(entry.name)) {
      scanExternalEntry(full);
    }
  }
}

scanExternalTree(path.join(rootDir, 'api'));
scanExternalTree(path.join(rootDir, 'netlify', 'functions'));

/** Also mark modules imported from vite.config.ts as used (e.g. src/api/optimize-image.ts) */
const viteConfigPath = path.join(rootDir, 'vite.config.ts');
if (fs.existsSync(viteConfigPath)) {
  const text = fs.readFileSync(viteConfigPath, 'utf8');
  const importFromRegex = /import\s+[^'";]*?from\s+['"]([^'"\n]+)['"]/g;
  const dynamicImportRegex = /import\(\s*['"]([^'"\n]+)['"]\s*\)/g;

  function collectFrom(re) {
    let m;
    while ((m = re.exec(text)) !== null) {
      const spec = m[1];
      const resolved = resolveSpecifier(spec, viteConfigPath);
      if (resolved) roots.push(resolved);
    }
  }

  collectFrom(importFromRegex);
  collectFrom(dynamicImportRegex);
}

/** Traverse dependency graph from roots to find all reachable (used) files */
const used = new Set();
const stack = [];

for (const r of roots) {
  if (!used.has(r) && fs.existsSync(r)) {
    used.add(r);
    stack.push(r);
  }
}

while (stack.length > 0) {
  const current = stack.pop();
  if (!current) continue;
  const children = deps.get(current);
  if (!children) continue;
  for (const child of children) {
    if (!used.has(child)) {
      used.add(child);
      stack.push(child);
    }
  }
}

/** Determine unused files: all src TS/TSX minus used set */
const unused = allFiles.filter((f) => !used.has(f));

const tmpUnusedPath = '/tmp/unused_files.txt';
fs.writeFileSync(
  tmpUnusedPath,
  unused.map((f) => path.relative(rootDir, f)).join('\n') + (unused.length ? '\n' : ''),
  'utf8',
);

// Also print a short summary for the terminal
let totalSize = 0;
for (const f of unused) {
  try {
    const stat = fs.statSync(f);
    totalSize += stat.size;
  } catch {}
}

console.log(`Total TS/TSX files scanned: ${allFiles.length}`);
console.log(`Total unused files: ${unused.length}`);
console.log(`Approximate size of unused files: ${Math.round(totalSize / 1024)} KB`);
console.log(`Unused file list written to ${tmpUnusedPath}`);
