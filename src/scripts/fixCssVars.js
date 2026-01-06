#!/usr/bin/env node
/**
 * Script to fix CSS variable usage in Tailwind classes
 *
 * This script replaces:
 * 1. `(--variable)` with `(--variable)`
 * 2. Standardizes transitions by replacing redundant transition properties
 *
 * Usage: node fixCssVars.js <file_path>
 */

import fs from 'fs';
import path from 'path';

function fixCssVariableUsage(content) {
  // Replace (--variable) with (--variable)
  let updated = content.replace(/\[var\((--.+?)\)\]/g, '($1)');

  // Fix bg-white/3 to bg-white/3
  updated = updated.replace(/bg-white\/\[0\.03\]/g, 'bg-white/3');

  // Standardize transitions - replace transition-colors + transition with just transition
  updated = updated.replace(
    /transition-colors\s+duration-\d+\s+ease-\w+\s+transition/g,
    'transition',
  );
  updated = updated.replace(
    /transition\s+transition-colors\s+duration-\d+\s+ease-\w+/g,
    'transition',
  );
  updated = updated.replace(
    /transition-colors\s+duration-\d+\s+ease-\w+/g,
    'transition duration-200 ease-out',
  );

  return updated;
}

function processFile(filePath) {
  try {
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.error(`File not found: ${filePath}`);
      return;
    }

    // Read file content
    const content = fs.readFileSync(filePath, 'utf8');

    // Fix CSS variable usage
    const updatedContent = fixCssVariableUsage(content);

    // Only write if changes were made
    if (content !== updatedContent) {
      fs.writeFileSync(filePath, updatedContent, 'utf8');
      console.log(`Successfully updated CSS variables in: ${filePath}`);
    } else {
      console.log(`No CSS variable issues found in: ${filePath}`);
    }
  } catch (error) {
    console.error(`Error processing file: ${filePath}`, error);
  }
}

function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error('Please provide a file path.');
    process.exit(1);
  }

  const inputPath = args[0];
  const projectRoot = process.cwd();
  const resolvedPath = path.resolve(projectRoot, inputPath);

  if (!resolvedPath.startsWith(projectRoot + path.sep)) {
    console.error('Invalid path: Outside of project root.');
    process.exit(1);
  }

  const allowedExt = new Set(['.css', '.ts', '.tsx', '.js', '.jsx']);
  const ext = path.extname(resolvedPath).toLowerCase();
  if (!allowedExt.has(ext)) {
    console.error(`Unsupported file extension: ${ext}`);
    process.exit(1);
  }

  let stat;
  try {
    stat = fs.statSync(resolvedPath);
  } catch (e) {
    console.error(`Cannot stat path: ${resolvedPath}`);
    process.exit(1);
  }

  if (!stat.isFile()) {
    console.error('Path is not a regular file.');
    process.exit(1);
  }

  processFile(resolvedPath);
}

main();
