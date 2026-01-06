#!/usr/bin/env node
// Dry-run codemod to suggest replacements for Tailwind *-3 utilities and inline 12px -> 16px
// Prints suggested diffs to stdout (no file changes).

const fs = require('fs');
const path = require('path');
const glob = require('glob');

const root = process.cwd();
const patterns = ['**/*.{ts,tsx,js,jsx,css,html,md}'];

const tailwindPattern =
  /\b(?:(?:p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr|gap|space-x|space-y|top|right|left|bottom)-3)\b/g;
const inline12px = /(?<!\w)(?:"|'|`)?(\d+px)(?:"|'|`)?/g; // crude

const files = glob.sync(patterns[0], {
  cwd: root,
  nodir: true,
  ignore: ['**/node_modules/**', '**/.git/**', 'artifacts/**'],
});

let totalMatches = 0;

files.forEach((rel) => {
  const file = path.join(root, rel);
  let src = '';
  try {
    src = fs.readFileSync(file, 'utf8');
  } catch (e) {
    return;
  }
  const twMatches = [...src.matchAll(tailwindPattern)];
  const pxMatches = [...src.matchAll(inline12px)].filter((m) => m[1] && m[1] === '12px');

  if (twMatches.length || pxMatches.length) {
    console.log('---');
    console.log('File:', rel);
  }

  if (twMatches.length) {
    twMatches.forEach((m) => {
      totalMatches++;
      const found = m[0];
      const suggestion = found.replace(/-3$/, '-4');
      console.log(`  Tailwind: ${found} -> ${suggestion}`);
    });
  }

  if (pxMatches.length) {
    pxMatches.forEach((m) => {
      totalMatches++;
      const idx = m.index;
      // show context
      const start = Math.max(0, idx - 40);
      const end = Math.min(src.length, idx + 40);
      const snippet = src.slice(start, end).replace(/\n/g, ' ');
      console.log(`  Inline: 12px -> 16px (suggest var(--space-2))`);
      console.log(`    ...${snippet}...`);
    });
  }
});

console.log('\nSummary:');
console.log(`  Files scanned: ${files.length}`);
console.log(`  Potential replacements found: ${totalMatches}`);

if (totalMatches === 0) {
  console.log('No matches found.');
}

process.exit(0);
