#!/usr/bin/env node
/**
 * Design System Audit
 * ===================
 * CI-friendly, repo-wide enforcement for "no new design system violations".
 *
 * Why:
 * - ESLint catches some design-system issues in TS/TSX, but many DS escapes live in CSS and in Tailwind class strings.
 * - The codebase already contains legacy violations; a baseline lets us enforce “no regressions” immediately.
 *
 * Usage:
 * - Audit against baseline (fails if new violations are introduced):
 *   - `npm run design:audit`
 * - Update baseline to current state (intentional snapshot):
 *   - `npm run design:audit:update-baseline`
 *
 * Baseline file:
 * - `scripts/design-system-audit.baseline.json`
 */

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { globSync } from 'glob';

const PROJECT_ROOT = process.cwd();
const BASELINE_PATH = path.join(PROJECT_ROOT, 'scripts', 'design-system-audit.baseline.json');

const args = new Set(process.argv.slice(2));
const shouldUpdateBaseline = args.has('--update-baseline');
const verbose = args.has('--verbose');

// Keep this aligned with `scripts/lint-colors.sh`
const ALLOWED_HEXES = new Set([
  'ee7868',
  'f08b7d',
  'f6b0a6',
  'fab81d',
  'f8c84d',
  'fde29a',
  '003141',
  '002635',
  '0a4f60',
  'fff8ec',
  'fff2de',
  'ffffff',
  'bbbbbb',
]);

/**
 * Rules
 * -----
 * We intentionally keep these coarse-grained (counts per file) so the baseline stays stable and small.
 */
const RULES = /** @type {const} */ ({
  forbiddenHexColors: 'forbiddenHexColors',
  largeTypographyUtilities: 'largeTypographyUtilities',
  cssOutsideStylesDir: 'cssOutsideStylesDir',
});

/**
 * Files:
 * - Scan `src/` only (the website runtime code)
 * - Ignore build artifacts, tests, and token definition files where raw values are expected
 */
const SRC_GLOBS = ['src/**/*.{ts,tsx,css}'];

const IGNORE_GLOBS = [
  '**/node_modules/**',
  '**/dist/**',
  '**/coverage/**',
  '**/__tests__/**',
  'src/styles/design-tokens.css', // token definitions include hex values by design
  'src/design-tokens.ts', // generated/mapped tokens often include hex values
  'src/tokens/colors.ts', // color token map includes hex values by design
];

function readUtf8(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function normalizePath(p) {
  return p.split(path.sep).join('/');
}

function isCssOutsideStylesDir(relPath) {
  if (!relPath.endsWith('.css')) return false;
  if (relPath.startsWith('src/styles/')) return false;
  // CSS Modules are allowed in many codebases, but we still want visibility.
  // Treat them as violations so we can gradually consolidate / standardize.
  return true;
}

function countForbiddenHexColors(text) {
  const matches = text.match(/#[0-9a-fA-F]{3}\b|#[0-9a-fA-F]{6}\b/g);
  if (!matches) return 0;
  let bad = 0;
  for (const raw of matches) {
    const hex = raw.slice(1).toLowerCase();
    // Normalize 3-digit hex to 6-digit for comparison (e.g. #fff -> ffffff)
    const normalized =
      hex.length === 3
        ? hex
            .split('')
            .map((c) => c + c)
            .join('')
        : hex;
    if (!ALLOWED_HEXES.has(normalized)) bad += 1;
  }
  return bad;
}

function countLargeTypographyUtilities(text) {
  // Flag large Tailwind typography utilities that tend to break fluid scaling.
  // We count raw occurrences in the file; baseline makes this “no new ones”.
  //
  // Examples matched:
  // - text-xl
  // - md:text-2xl
  // - lg:text-5xl
  // - xl:text-6xl
  //
  // Not matched:
  // - text-[var(--font-size-h2)]
  // - prose (Tailwind typography plugin)
  const re = /\b(?:sm:|md:|lg:|xl:|2xl:)?text-(?:xl|2xl|3xl|4xl|5xl|6xl)\b/g;
  const matches = text.match(re);
  return matches ? matches.length : 0;
}

function computeAudit() {
  const files = globSync(SRC_GLOBS, {
    cwd: PROJECT_ROOT,
    ignore: IGNORE_GLOBS,
    nodir: true,
  }).map((p) => normalizePath(p));

  /** @type {Record<string, Record<string, number>>} */
  const byFile = {};

  for (const rel of files) {
    const abs = path.join(PROJECT_ROOT, rel);
    const text = readUtf8(abs);

    const counts = {
      [RULES.forbiddenHexColors]: countForbiddenHexColors(text),
      [RULES.largeTypographyUtilities]: rel.endsWith('.css')
        ? 0
        : countLargeTypographyUtilities(text),
      [RULES.cssOutsideStylesDir]: isCssOutsideStylesDir(rel) ? 1 : 0,
    };

    // Keep baseline sparse: store only files with any hits.
    const hasAny = Object.values(counts).some((n) => n > 0);
    if (hasAny) byFile[rel] = counts;
  }

  return {
    version: 1,
    generatedAt: new Date().toISOString(),
    rules: Object.values(RULES),
    files: byFile,
  };
}

function readBaseline() {
  if (!fs.existsSync(BASELINE_PATH)) return null;
  try {
    return JSON.parse(fs.readFileSync(BASELINE_PATH, 'utf8'));
  } catch {
    return null;
  }
}

function writeBaseline(audit) {
  fs.writeFileSync(BASELINE_PATH, JSON.stringify(audit, null, 2) + '\n', 'utf8');
}

function sumRule(audit, ruleName) {
  let total = 0;
  for (const counts of Object.values(audit.files)) {
    total += counts?.[ruleName] ?? 0;
  }
  return total;
}

function topFilesByRule(audit, ruleName, limit = 10) {
  return Object.entries(audit.files)
    .map(([file, counts]) => ({ file, count: counts?.[ruleName] ?? 0 }))
    .filter((x) => x.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

function diffAgainstBaseline(current, baseline) {
  /** @type {Array<{file: string, rule: string, baseline: number, current: number}>} */
  const regressions = [];

  const allFiles = new Set([
    ...Object.keys(baseline.files || {}),
    ...Object.keys(current.files || {}),
  ]);
  for (const file of allFiles) {
    const baseCounts = baseline.files?.[file] || {};
    const curCounts = current.files?.[file] || {};

    for (const rule of current.rules) {
      const b = baseCounts[rule] ?? 0;
      const c = curCounts[rule] ?? 0;
      if (c > b) regressions.push({ file, rule, baseline: b, current: c });
    }
  }

  return regressions;
}

function printSummary(audit) {
  console.log('\nDesign System Audit (snapshot)\n-----------------------------');
  for (const rule of audit.rules) {
    console.log(`- ${rule}: ${sumRule(audit, rule)}`);
  }
  if (verbose) {
    for (const rule of audit.rules) {
      const top = topFilesByRule(audit, rule, 10);
      if (top.length === 0) continue;
      console.log(`\nTop files for ${rule}:`);
      for (const t of top) console.log(`  - ${t.count}  ${t.file}`);
    }
  }
  console.log('');
}

const current = computeAudit();

if (shouldUpdateBaseline) {
  writeBaseline(current);
  printSummary(current);
  console.log(`✅ Baseline updated: ${normalizePath(path.relative(PROJECT_ROOT, BASELINE_PATH))}`);
  process.exit(0);
}

const baseline = readBaseline();
if (!baseline) {
  printSummary(current);
  console.error(
    `❌ Missing or unreadable baseline at ${normalizePath(path.relative(PROJECT_ROOT, BASELINE_PATH))}`,
  );
  console.error('   Run: npm run design:audit:update-baseline');
  process.exit(1);
}

const regressions = diffAgainstBaseline(current, baseline);

printSummary(current);

if (regressions.length > 0) {
  console.error(`❌ Design system regressions detected (${regressions.length})`);
  // Print a small, stable diff list
  const max = 30;
  for (const r of regressions.slice(0, max)) {
    console.error(`- ${r.rule}: ${r.file} (${r.baseline} -> ${r.current})`);
  }
  if (regressions.length > max) {
    console.error(`... and ${regressions.length - max} more`);
  }
  console.error(
    '\nFix the violations or update the baseline intentionally: npm run design:audit:update-baseline\n',
  );
  process.exit(1);
}

console.log('✅ No new design system violations (matches baseline).');
process.exit(0);
