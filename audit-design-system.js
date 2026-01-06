#!/usr/bin/env node
/**
 * Medusa Tattoo - Design System Forensic Audit
 * -------------------------------------------------
 * A self-contained Node.js script to scan a codebase for design system violations.
 *
 * Run: node audit-design-system.js ./src
 * Optional: node audit-design-system.js ./src --debug
 *
 * Dependencies: Only Node built-ins (fs, path)
 */

const fs = require('fs');
const path = require('path');

// -------------------------------
// Configuration: Rules & Settings
// -------------------------------
const CONFIG = {
  // Directory to scan (fixed to repository src to prevent path traversal)
  rootDir: path.resolve(__dirname, 'src'),
  debug: process.argv.includes('--debug'),

  // Forbidden spacing: Any spacing class not aligned to 8px system is a violation.
  // Allowed: multiples of 8 (e.g., 0, 8, 16, 24, 32, 48, 64, 96, 128)
  // Disallowed: any numeric not multiple of 8, or arbitrary values like p-[13px]
  spacingClassPrefixes: [
    'p',
    'px',
    'py',
    'pt',
    'pr',
    'pb',
    'pl',
    'm',
    'mx',
    'my',
    'mt',
    'mr',
    'mb',
    'ml',
    'gap',
    'space-x',
    'space-y',
  ],

  // Forbidden container widths. You can extend or tighten as your DS requires.
  // This flags: non-token max-w-*, arbitrary max-w-[...], and specific banned scales.
  forbiddenMaxW: new Set(['6xl', '5xl', '4xl']),

  // Heuristic for Card Layout Pattern: Elements that look like a "card"
  // should include: flex flex-col h-full to ensure equal heights.
  // We'll look for cues like rounded, shadow, border, bg-*, card, ring, overflow-hidden etc.
  cardCues: ['card', 'rounded', 'shadow', 'border', 'bg-', 'ring', 'overflow-hidden'],
  requiredCardClasses: ['flex', 'flex-col', 'h-full'],

  // Transition pattern: When hover: is used, require at least one transition class
  // such as transition, transition-all, duration-*, ease-*
  transitionCues: ['transition', 'transition-all', 'duration-', 'ease-'],

  // Output file
  reportFile: 'design-system-audit-report.json',
};

// Restrict scanning to within the repository root (directory of this script)
const ALLOWED_ROOT = fs.realpathSync(path.resolve(__dirname, '.'));

function isPathInside(parent, child) {
  const rel = path.relative(parent, child);
  return !!rel && !rel.startsWith('..') && !path.isAbsolute(rel);
}

// -------------------------------
// Utilities
// -------------------------------
function logDebug(...args) {
  if (CONFIG.debug) console.log('[DEBUG]', ...args);
}

function isSourceFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return ext === '.tsx' || ext === '.jsx';
}

function readFileSafe(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (e) {
    logDebug('Failed to read', filePath, e.message);
    return '';
  }
}

function walkDir(dir, files = []) {
  let entries = [];
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch (e) {
    logDebug('Failed to read directory', dir, e.message);
    return files;
  }

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(fullPath, files);
    } else if (entry.isFile() && isSourceFile(fullPath)) {
      files.push(fullPath);
    }
  }
  return files;
}

// -------------------------------
// Detection Helpers
// -------------------------------
function extractClassAttributes(content) {
  // Capture class or className JSX attributes including multi-line values
  // Matches: class="..." | className='...' | className={`...`}
  const regex = /(class|className)\s*=\s*(["'`])([\s\S]*?)\2/gm;
  const matches = [];
  let m;
  while ((m = regex.exec(content)) !== null) {
    const startIndex = m.index;
    const value = m[3];
    matches.push({ value, startIndex });
  }
  return matches;
}

function indexToLineNumber(str, index) {
  // Return 1-based line number for index position
  const pre = str.slice(0, index);
  return pre.split('\n').length;
}

function splitClasses(classStr) {
  // Split classes by whitespace while keeping hover: and responsive prefixes intact
  // Tailwind classes are whitespace separated; template literals may include JS, we ignore interpolations
  return classStr
    .replace(/\{\s*\}/g, '')
    .split(/\s+/)
    .filter(Boolean);
}

function isArbitraryValue(token) {
  // e.g., p-[13px], max-w-[1100px]
  return /\[[^\]]+\]/.test(token);
}

function parseNumericSuffix(token) {
  // Extract trailing number for classes like p-16, gap-24, mt-12
  const m = token.match(/-(\d+)(?![a-zA-Z])/);
  return m ? parseInt(m[1], 10) : null;
}

function hasAny(str, needles) {
  return needles.some((n) => str.includes(n));
}

// -------------------------------
// Rule Checks
// -------------------------------
function checkSpacingViolations(filePath, content, classAttr) {
  const results = [];
  const classes = splitClasses(classAttr.value);
  for (const cls of classes) {
    // Check if token starts with any spacing prefix
    const prefix = CONFIG.spacingClassPrefixes.find((p) => cls === p || cls.startsWith(p + '-'));
    if (!prefix) continue;

    // Ignore variants like sm:, md: etc.
    const core = cls.split(':').pop();
    if (!core) continue;

    // Skip auto/px units from Tailwind scale when non-numeric (like px=1px utility)
    if (/-(auto|px)$/.test(core)) continue;

    // Arbitrary values are forbidden
    if (isArbitraryValue(core)) {
      results.push({
        type: 'SPACING_VIOLATION',
        severity: 'MAJOR',
        message: `Arbitrary spacing value detected: ${cls}`,
        fix: 'Use spacing tokens that are multiples of 8 (e.g., 8, 16, 24, 32, 48, 64, 96, 128).',
      });
      continue;
    }

    const n = parseNumericSuffix(core);
    if (n === null) continue; // Not numeric

    if (n % 8 !== 0) {
      results.push({
        type: 'SPACING_VIOLATION',
        severity: 'MAJOR',
        message: `Non-8px spacing: ${cls}`,
        fix: 'Replace with the nearest 8px multiple (e.g., 8, 16, 24, 32, 48, 64, 96, 128).',
      });
    }
  }

  // Enrich with file/line after generation below
  return results.map((r) => ({
    ...r,
    file: filePath,
    line: indexToLineNumber(content, classAttr.startIndex),
    code: classAttr.value.trim(),
  }));
}

function checkContainerViolations(filePath, content, classAttr) {
  const out = [];
  const classes = splitClasses(classAttr.value);
  for (const cls of classes) {
    const core = cls.split(':').pop();
    if (!core) continue;
    if (!core.startsWith('max-w-')) continue;

    const v = core.replace('max-w-', '');

    // Arbitrary value like max-w-[1100px]
    if (isArbitraryValue(v)) {
      out.push({
        type: 'CONTAINER_VIOLATION',
        severity: 'MAJOR',
        message: `Arbitrary max-w value: ${cls}`,
        fix: 'Use approved container tokens (e.g., max-w-screen-xl, max-w-7xl) per design system.',
      });
      continue;
    }

    // Explicitly forbidden sizes
    if (CONFIG.forbiddenMaxW.has(v)) {
      out.push({
        type: 'CONTAINER_VIOLATION',
        severity: 'MAJOR',
        message: `Forbidden container width: ${cls}`,
        fix: 'Use approved container tokens (e.g., max-w-screen-xl, max-w-7xl) per design system.',
      });
    }

    // Fixed sizes like max-w-1100, max-w-900
    if (/^\d+$/.test(v)) {
      out.push({
        type: 'CONTAINER_VIOLATION',
        severity: 'MAJOR',
        message: `Fixed numeric max-w: ${cls}`,
        fix: 'Use responsive container tokens instead of fixed numeric widths.',
      });
    }
  }

  return out.map((r) => ({
    ...r,
    file: filePath,
    line: indexToLineNumber(content, classAttr.startIndex),
    code: classAttr.value.trim(),
  }));
}

function checkCardLayoutViolations(filePath, content, classAttr, fileHasGrid) {
  // Heuristic: If class looks like a card but misses required equal-height pattern
  const classes = classAttr.value;
  const looksLikeCard = hasAny(classes, CONFIG.cardCues);
  if (!looksLikeCard) return [];

  const missing = CONFIG.requiredCardClasses.filter((req) => !classes.includes(req));
  if (missing.length === 0) return [];

  // Prioritize when in grid-heavy files
  const severity = fileHasGrid ? 'CRITICAL' : 'MAJOR';
  return [
    {
      type: 'CARD_LAYOUT_VIOLATION',
      severity,
      message: `Card-like element missing required classes: ${missing.join(', ')}`,
      fix: 'Add "flex flex-col h-full" to card containers so cards have equal heights across rows.',
    },
  ].map((r) => ({
    ...r,
    file: filePath,
    line: indexToLineNumber(content, classAttr.startIndex),
    code: classAttr.value.trim(),
  }));
}

function checkTransitionViolations(filePath, content, classAttr) {
  const classes = classAttr.value;
  if (!classes.includes('hover:')) return [];

  const hasTransition = CONFIG.transitionCues.some((c) => classes.includes(c));
  if (hasTransition) return [];

  return [
    {
      type: 'TRANSITION_VIOLATION',
      severity: 'MINOR',
      message: 'hover: class used without a transition class',
      fix: 'Add transition utilities (e.g., transition, duration-200, ease-out) to smooth hover effects.',
    },
  ].map((r) => ({
    ...r,
    file: filePath,
    line: indexToLineNumber(content, classAttr.startIndex),
    code: classAttr.value.trim(),
  }));
}

// -------------------------------
// File Scanner
// -------------------------------
function scanFile(filePath) {
  const content = readFileSafe(filePath);
  if (!content) return [];

  const fileHasGrid = /\bgrid\b|grid-cols-/.test(content);
  const classAttrs = extractClassAttributes(content);
  const violations = [];

  for (const attr of classAttrs) {
    violations.push(
      ...checkSpacingViolations(filePath, content, attr),
      ...checkContainerViolations(filePath, content, attr),
      ...checkCardLayoutViolations(filePath, content, attr, fileHasGrid),
      ...checkTransitionViolations(filePath, content, attr),
    );
  }

  return violations;
}

// -------------------------------
// Report & Summary
// -------------------------------
function groupBy(arr, keyFn) {
  return arr.reduce((acc, item) => {
    const key = keyFn(item);
    acc[key] = acc[key] || [];
    acc[key].push(item);
    return acc;
  }, {});
}

function sortBySeverityFirst(a, b) {
  const order = { CRITICAL: 0, MAJOR: 1, MINOR: 2 };
  return (order[a.severity] ?? 99) - (order[b.severity] ?? 99);
}

function printSummary(violations) {
  const byType = groupBy(violations, (v) => v.type);
  const counts = Object.entries(byType)
    .map(([type, arr]) => ({
      type,
      count: arr.length,
      critical: arr.filter((v) => v.severity === 'CRITICAL').length,
    }))
    .sort((a, b) => b.critical - a.critical || b.count - a.count);

  console.log('\n=== Design System Audit Summary ===');
  if (counts.length === 0) {
    console.log('No violations found. Great job!');
    return;
  }

  for (const { type, count, critical } of counts) {
    const tag = critical > 0 ? ' [CRITICAL present]' : '';
    console.log(`${type}: ${count} found${tag}`);
  }
}

function writeReport(violations, rootDir) {
  const report = {
    meta: {
      tool: 'Medusa Tattoo - Design System Forensic Audit',
      version: '1.0.0',
      scannedAt: new Date().toISOString(),
      rootDir: path.resolve(rootDir),
    },
    summary: {
      total: violations.length,
      byType: Object.fromEntries(
        Object.entries(groupBy(violations, (v) => v.type)).map(([k, v]) => [k, v.length]),
      ),
      critical: violations.filter((v) => v.severity === 'CRITICAL').length,
    },
    violations: violations.sort(sortBySeverityFirst),
  };

  fs.writeFileSync(CONFIG.reportFile, JSON.stringify(report, null, 2), 'utf8');
  return path.resolve(CONFIG.reportFile);
}

// -------------------------------
// Main
// -------------------------------
(function main() {
  const targetDir = CONFIG.rootDir;
  if (!targetDir) {
    console.error('Usage: node audit-design-system.js <directory-to-scan>');
    process.exit(1);
  }

  const absDir = path.resolve(targetDir);
  if (!fs.existsSync(absDir)) {
    console.error(`Error: Directory not found: ${absDir}`);
    process.exit(1);
  }

  console.log('Medusa Design System Audit');
  console.log('Scanning:', absDir);

  // Resolve real path and enforce scanning within allowed root
  let realAbsDir;
  try {
    realAbsDir = fs.realpathSync(absDir);
  } catch (e) {
    console.error('Error resolving real path:', e?.message || e);
    process.exit(1);
  }

  const realAllowed = ALLOWED_ROOT;
  const inside = realAbsDir === realAllowed || isPathInside(realAllowed, realAbsDir);
  if (!inside) {
    console.error('Error: Target directory is outside of the repository root and is not allowed.');
    console.error('Allowed root:', realAllowed);
    console.error('Requested path:', realAbsDir);
    process.exit(1);
  }

  const files = walkDir(realAbsDir);
  console.log(`Found ${files.length} source files (.tsx/.jsx).`);

  const allViolations = [];
  for (const file of files) {
    const fileViolations = scanFile(file);
    if (fileViolations.length) logDebug(`Violations in ${file}: ${fileViolations.length}`);
    allViolations.push(...fileViolations);
  }

  printSummary(allViolations);
  const reportPath = writeReport(allViolations, realAbsDir);
  console.log(`\nFull report written to: ${reportPath}`);
  console.log('Tip: Re-run with --debug for detailed logs.');
})();
