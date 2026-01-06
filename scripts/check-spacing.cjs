#!/usr/bin/env node
// Conservative spacing checker. Flags Tailwind `*-3` utilities and raw `NNpx` values not in allowed set.

const fs = require('fs');
const path = require('path');
const glob = require('glob');

const root = process.cwd();
const files = glob.sync('**/*.{ts,tsx,js,jsx,css,html,md}', {
  cwd: root,
  nodir: true,
  ignore: ['**/node_modules/**', '**/.git/**', 'artifacts/**'],
});

const tailwindPattern =
  /\b(?:(?:p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr|gap|space-x|space-y|top|right|left|bottom)-3)\b/;
const pxPattern = /\b(\d{1,3})px\b/;

const allowed = new Set(['4', '8', '16', '24', '32', '40', '48', '56', '64', '80', '96']); // allowed px values when represented as numbers (these are units in px but we expect tokens)

let problems = 0;

files.forEach((rel) => {
  const file = path.join(root, rel);
  let src = '';
  try {
    src = fs.readFileSync(file, 'utf8');
  } catch (e) {
    return;
  }

  if (tailwindPattern.test(src)) {
    console.log(`TAILWIND-*3 found in ${rel}`);
    problems++;
  }

  let m;
  const lines = src.split('\n');
  lines.forEach((line, idx) => {
    const match = line.match(pxPattern);
    if (match) {
      const val = match[1];
      if (!allowed.has(val) && val !== '12') {
        // flag any px values not in allowed set (12 will be specially suggested to map to 16)
        console.log(`RAW px ${val}px in ${rel}:${idx + 1} -> suggest mapping to 8pt-grid tokens`);
        problems++;
      } else if (val === '12') {
        console.log(`INLINE 12px in ${rel}:${idx + 1} -> suggest 16px (var(--space-2))`);
        problems++;
      }
    }
  });
});

if (problems > 0) {
  console.log(`\nSpacing check failed: ${problems} issues found.`);
  process.exit(1);
}

console.log('Spacing check passed.');
process.exit(0);
