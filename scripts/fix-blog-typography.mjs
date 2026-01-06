#!/usr/bin/env node
/**
 * Codemod: Fix typography contrast violations in blog pages
 * Replaces text-gray-* with semantic utilities based on context
 */

import { readFileSync, writeFileSync } from 'fs';
import { glob } from 'glob';

const fixes = [
  // Headings on light backgrounds
  {
    pattern: /className=['"]([^'"]*)\btext-gray-900\b([^'"]*)['"]/g,
    replacement: "className='$1text-on-light$2'",
  },

  // Body text on light backgrounds
  {
    pattern: /className=['"]([^'"]*)\btext-gray-600\b([^'"]*)['"]/g,
    replacement: "className='$1text-on-light$2'",
  },
  {
    pattern: /className=['"]([^'"]*)\btext-gray-500\b([^'"]*)['"]/g,
    replacement: "className='$1text-on-light$2'",
  },

  // Secondary/muted text on light backgrounds
  {
    pattern: /className=['"]([^'"]*)\btext-gray-700\b([^'"]*)['"]/g,
    replacement: "className='$1text-on-light$2'",
  },
  {
    pattern: /className=['"]([^'"]*)\btext-gray-800\b([^'"]*)['"]/g,
    replacement: "className='$1text-on-light$2'",
  },

  // White text on dark backgrounds (hero sections)
  {
    pattern: /className=['"]([^'"]*)\btext-white\/90\b([^'"]*)['"]/g,
    replacement: "className='$1text-on-dark-bold$2'",
  },
  {
    pattern: /className=['"]([^'"]*)\btext-white\/70\b([^'"]*)['"]/g,
    replacement: "className='$1text-on-dark$2'",
  },

  // Gray text in dark sections (should be white)
  {
    pattern: /className=['"]([^'"]*)\btext-gray-300\b([^'"]*)['"]/g,
    replacement: "className='$1text-on-dark$2'",
  },
];

async function fixFile(filePath) {
  let content = readFileSync(filePath, 'utf-8');
  let modified = false;

  for (const { pattern, replacement } of fixes) {
    const newContent = content.replace(pattern, replacement);
    if (newContent !== content) {
      content = newContent;
      modified = true;
    }
  }

  if (modified) {
    writeFileSync(filePath, content, 'utf-8');
    console.log(`✓ Fixed: ${filePath}`);
    return true;
  }

  return false;
}

async function main() {
  const blogFiles = await glob('src/pages/blog/**/*.tsx', { cwd: process.cwd() });

  console.log(`Found ${blogFiles.length} blog files to check...\n`);

  let fixedCount = 0;
  for (const file of blogFiles) {
    if (await fixFile(file)) {
      fixedCount++;
    }
  }

  console.log(`\n✓ Fixed ${fixedCount} files`);
}

main().catch(console.error);
