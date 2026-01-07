#!/usr/bin/env node

/**
 * fix-import-extensions.mjs
 *
 * - Finds local imports (./ ../ @/) that lack explicit extensions
 * - Resolves the intended file by checking .tsx, .ts, .jsx, .js in that order
 * - Rewrites the import/export specifier to include the resolved extension
 *
 * Usage: node scripts/fix-import-extensions.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = process.cwd();
const SRC = path.join(ROOT, 'src');
const EXT_ORDER = ['.tsx', '.ts', '.jsx', '.js'];

function walk(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'dist' || entry.name === 'node_modules') continue;
      files.push(...walk(p));
    } else if (/\.(ts|tsx|js|jsx)$/.test(entry.name)) {
      files.push(p);
    }
  }
  return files;
}

function findExistingCandidate(basePathNoExt) {
  for (const ext of EXT_ORDER) {
    const candidate = basePathNoExt + ext;
    if (fs.existsSync(candidate)) return ext;
  }
  return null;
}

const files = walk(SRC);
let totalEdits = 0;

for (const file of files) {
  const src = fs.readFileSync(file, 'utf8');
  // import x from '...'; export * from '...'
  const re = /((?:import|export)\s[\s\S]*?from\s*|require\()\s*(['"])([^'"]+)\2/g;
  let replaced = src;
  let m;
  while ((m = re.exec(src)) !== null) {
    const full = m[0];
    const spec = m[3];
    // only local or alias @/ paths
    if (!/^(?:\.{1,2}\/|@\/)/.test(spec)) continue;

    if (/\.(ts|tsx|js|jsx|json)$/.test(spec)) continue; // already has extension

    // compute path on disk
    let resolvedBase;
    if (spec.startsWith('@/')) {
      // assume tsconfig baseUrl paths map '@/' -> 'src/'
      resolvedBase = path.join(ROOT, spec.replace(/^@\//, 'src/'));
    } else {
      const dir = path.dirname(file);
      resolvedBase = path.resolve(dir, spec);
    }

    const ext = findExistingCandidate(resolvedBase);
    if (!ext) {
      // No candidate found - skip (we'll catch this in validate script)
      continue;
    }

    // build replacement specifier relative to file
    let newSpec;
    if (spec.startsWith('@/')) {
      newSpec = spec + ext;
    } else {
      newSpec = spec + ext;
    }

    // replace **only** the first occurrence inside this file (safer)
    const importRe = new RegExp(escapeRegExp(spec));
    if (!importRe.test(replaced)) continue;
    replaced = replaced.replace(importRe, newSpec);
    totalEdits++;
    console.log(`Edited ${path.relative(ROOT, file)}: ${spec} → ${newSpec}`);
  }

  if (replaced !== src) {
    fs.writeFileSync(file, replaced, 'utf8');
  }
}

console.log(`Done. Total edits: ${totalEdits}`);
if (totalEdits === 0) {
  console.log('No changes made; repository already uses explicit extensions (or no resolvable candidates found).');
}

function escapeRegExp(s) {
  return s.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&');
}
