#!/usr/bin/env node

/**
 * Test file extension fixer
 * Handles test files and config files outside src/
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, dirname, relative, extname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, '..');

const COLORS = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  green: '\x1b[32m',
  blue: '\x1b[36m',
};

let filesProcessed = 0;
let filesModified = 0;

/**
 * Get all TypeScript files including tests and config
 */
function getAllTsFiles(dir, fileList = []) {
  const files = readdirSync(dir);

  files.forEach((file) => {
    const filePath = join(dir, file);
    const stat = statSync(filePath);

    if (stat.isDirectory()) {
      if (!['node_modules', 'dist', '.git', 'coverage', '.next', 'build', '.snapshots'].includes(file)) {
        getAllTsFiles(filePath, fileList);
      }
    } else if (file.match(/\.(ts|tsx|js|mjs)$/)) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

/**
 * Check if a path is a local import (starts with . or @/ but not a package)
 */
function isLocalImport(importPath) {
  return importPath.startsWith('./') || 
         importPath.startsWith('../') || 
         (importPath.startsWith('@/') && !importPath.startsWith('@/node_modules'));
}

/**
 * Determine the correct extension for a local import
 */
function guessExtension(importPath, currentFilePath) {
  // If it already has an extension, return it
  if (extname(importPath)) return importPath;

  // Handle @/ paths
  let basePath = importPath;
  if (importPath.startsWith('@/')) {
    basePath = importPath.replace('@/', './src/');
  }

  const resolvedPath = join(dirname(currentFilePath), basePath);

  // Try .ts then .tsx
  const tsPath = resolvedPath + '.ts';
  const tsxPath = resolvedPath + '.tsx';

  try {
    statSync(tsPath);
    return importPath + '.ts';
  } catch {
    try {
      statSync(tsxPath);
      return importPath + '.tsx';
    } catch {
      // Fallback: assume .ts for non-JSX, .tsx for JSX
      return importPath + (currentFilePath.endsWith('.tsx') || currentFilePath.endsWith('.jsx') ? '.tsx' : '.ts');
    }
  }
}

/**
 * Fix imports in a single file
 */
function fixFileImports(filePath) {
  const content = readFileSync(filePath, 'utf-8');
  const importRegex = /import\s+(?:[\w,\s{}*]+\s+from\s+)?['"]([^'"]+)['"]/g;
  let modified = false;
  let newContent = content;

  let match;
  while ((match = importRegex.exec(content)) !== null) {
    const importPath = match[1];
    
    if (isLocalImport(importPath) && !extname(importPath)) {
      const fixedPath = guessExtension(importPath, filePath);
      if (fixedPath !== importPath) {
        newContent = newContent.replace(`'${importPath}'`, `'${fixedPath}'`);
        newContent = newContent.replace(`"${importPath}"`, `"${fixedPath}"`);
        modified = true;
      }
    }
  }

  if (modified) {
    writeFileSync(filePath, newContent, 'utf-8');
    filesModified++;
    console.log(`${COLORS.green}✓ Fixed${COLORS.reset} ${relative(ROOT, filePath)}`);
  }

  filesProcessed++;
}

/**
 * Main execution
 */
function main() {
  console.log(`${COLORS.blue}╔════════════════════════════════════════╗`);
  console.log(`║   Test & Config Extension Normalizer ║`);
  console.log(`╚════════════════════════════════════════╝${COLORS.reset}\n`);

  const files = getAllTsFiles(ROOT);

  console.log(`Found ${files.length} TypeScript/JavaScript files\n`);
  console.log('Normalizing imports...\n');

  files.forEach(fixFileImports);

  console.log(`\n${COLORS.blue}═══════════════════════════════════════${COLORS.reset}`);
  console.log(`Processed: ${filesProcessed} files`);
  console.log(`Modified: ${filesModified} files`);
  console.log(`\n${COLORS.green}[DONE] All local imports now have explicit extensions${COLORS.reset}\n`);
}

main();
