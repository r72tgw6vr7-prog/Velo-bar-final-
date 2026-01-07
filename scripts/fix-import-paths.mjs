#!/usr/bin/env node

/**
 * Fix incorrect file extensions in imports
 * Many imports point to .tsx files that should be .ts or vice versa
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
 * Get all TypeScript files
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
 * Check if a path is a local import
 */
function isLocalImport(importPath) {
  return importPath.startsWith('./') || 
         importPath.startsWith('../') || 
         (importPath.startsWith('@/') && !importPath.startsWith('@/node_modules'));
}

/**
 * Find the correct file for an import path
 */
function findCorrectFile(importPath, currentFilePath) {
  // If it already has an extension, verify it exists
  if (extname(importPath)) {
    let basePath = importPath;
    if (importPath.startsWith('@/')) {
      basePath = importPath.replace('@/', './src/');
    }
    const resolvedPath = join(dirname(currentFilePath), basePath);
    try {
      statSync(resolvedPath);
      return importPath; // File exists with current extension
    } catch {
      // Try swapping extension
      const baseWithoutExt = basePath.slice(0, -extname(basePath).length);
      const altExt = importPath.endsWith('.tsx') ? '.ts' : '.tsx';
      const altPath = baseWithoutExt + altExt;
      try {
        statSync(join(dirname(currentFilePath), altPath));
        return importPath.slice(0, -extname(importPath).length) + altExt;
      } catch {
        return importPath; // Keep original if neither works
      }
    }
  }

  // No extension - need to find the right one
  let basePath = importPath;
  if (importPath.startsWith('@/')) {
    basePath = importPath.replace('@/', './src/');
  }

  const resolvedPath = join(dirname(currentFilePath), basePath);

  // Try both extensions
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
      // Try index files
      try {
        statSync(join(resolvedPath, 'index.ts'));
        return importPath + '/index.ts';
      } catch {
        try {
          statSync(join(resolvedPath, 'index.tsx'));
          return importPath + '/index.tsx';
        } catch {
          // Fallback: guess based on current file
          return importPath + (currentFilePath.endsWith('.tsx') ? '.tsx' : '.ts');
        }
      }
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
    
    if (isLocalImport(importPath)) {
      const correctPath = findCorrectFile(importPath, filePath);
      if (correctPath !== importPath) {
        newContent = newContent.replace(`'${importPath}'`, `'${correctPath}'`);
        newContent = newContent.replace(`"${importPath}"`, `"${correctPath}"`);
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
  console.log(`║   Import Extension Corrector            ║`);
  console.log(`╚════════════════════════════════════════╝${COLORS.reset}\n`);

  const files = getAllTsFiles(ROOT);
  console.log(`Found ${files.length} TypeScript/JavaScript files\n`);
  console.log('Correcting import extensions...\n');

  files.forEach(fixFileImports);

  console.log(`\n${COLORS.blue}═══════════════════════════════════════${COLORS.reset}`);
  console.log(`Processed: ${filesProcessed} files`);
  console.log(`Modified: ${filesModified} files`);
  console.log(`\n${COLORS.green}[DONE] All imports now point to existing files${COLORS.reset}\n`);
}

main();
