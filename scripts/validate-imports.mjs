#!/usr/bin/env node
/**
 * validate-imports.mjs
 *
 * - Scans all .ts/.tsx/.js files in src/
 * - For each import/export specifier that is local (./ ../ @/):
 *   - Checks it resolves via TypeScript resolver
 *   - Ensures specifier contains an explicit extension (ts/tsx/jsx/js)
 *   - Ensures exact on-disk casing for each path segment
 *
 * Exit code: 0 if all checks pass; 1 if any violation found.
 *
 * Usage (CI): node scripts/validate-imports.mjs
 */

import fs from 'fs';
import path from 'path';
import ts from 'typescript';

const ROOT = process.cwd();
const SRC = path.join(ROOT, 'src');

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

// load tsconfig for compiler options
function getCompilerOptions() {
  const cfgPath = ts.findConfigFile(ROOT, ts.sys.fileExists, 'tsconfig.json');
  if (!cfgPath) return {};
  const read = ts.readConfigFile(cfgPath, ts.sys.readFile);
  const parsed = ts.parseJsonConfigFileContent(read.config, ts.sys, path.dirname(cfgPath));
  return parsed.options || {};
}

const compilerOptions = getCompilerOptions();
const host = ts.createCompilerHost(compilerOptions);

const files = walk(SRC);
const importRe = /(?:import|export)\s[^;]*?from\s*['"]([^'"]+)['"]/g;
let errors = [];

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  // Remove comments to avoid parsing commented imports
  const contentWithoutComments = content.replace(/\/\/.*$/gm, '');
  let m;
  while ((m = importRe.exec(contentWithoutComments)) !== null) {
    const spec = m[1];
    if (!/^(?:\.{1,2}\/|@\/)/.test(spec)) continue; // not local

    // check explicit extension
    if (!/\.(ts|tsx|js|jsx|json)$/.test(spec)) {
      errors.push({
        file,
        spec,
        type: 'MISSING_EXTENSION',
        msg: `Import does not include explicit extension: '${spec}' in ${path.relative(ROOT, file)}` 
      });
      continue;
    }

    // resolve module via TS
    let resolved;
    if (spec.startsWith('@/')) {
      // mimic TS path mapping @/ -> src/
      const candidate = path.join(ROOT, spec.replace(/^@\//, 'src/'));
      // try exact path
      if (fs.existsSync(candidate)) {
        resolved = candidate;
      } else {
        // try with extensions
        const exts = ['.tsx', '.ts', '.jsx', '.js'];
        for (const ex of exts) {
          if (fs.existsSync(candidate + ex)) {
            resolved = candidate + ex;
            break;
          }
        }
      }
    } else {
      const containing = file;
      const result = ts.resolveModuleName(spec, containing, compilerOptions, host);
      if (result && result.resolvedModule && result.resolvedModule.resolvedFileName) {
        resolved = result.resolvedModule.resolvedFileName;
      }
    }

    if (!resolved || !fs.existsSync(resolved)) {
      errors.push({
        file,
        spec,
        type: 'UNRESOLVED',
        msg: `Cannot resolve import '${spec}' in ${path.relative(ROOT, file)} (resolved -> ${resolved})` 
      });
      continue;
    }

    // casing check: walk each path segment and ensure exact string match in parent dir
    const rel = path.relative(ROOT, resolved);
    const segments = rel.split(path.sep);
    let cur = ROOT;
    let badSegment = null;
    for (const seg of segments) {
      const entries = fs.readdirSync(cur);
      if (!entries.includes(seg)) {
        badSegment = { cur, seg, entries };
        break;
      }
      cur = path.join(cur, seg);
    }
    if (badSegment) {
      errors.push({
        file,
        spec,
        type: 'CASING_MISMATCH',
        msg: `Casing mismatch for import '${spec}' in ${path.relative(ROOT, file)}; expected segment '${badSegment.seg}' exists with different case in ${path.relative(ROOT, badSegment.cur)}` 
      });
    }
  }
}

if (errors.length > 0) {
  console.error('validate-imports: Found issues:');
  for (const e of errors) {
    console.error(`- [${e.type}] ${e.msg}`);
  }
  process.exit(1);
} else {
  console.log('validate-imports: all imports resolved, have explicit extensions, and casing matches on-disk files.');
  process.exit(0);
}
