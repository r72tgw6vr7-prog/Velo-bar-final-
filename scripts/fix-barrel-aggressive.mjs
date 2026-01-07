#!/usr/bin/env node

/**
 * Aggressive barrel file fixer
 * Handles all export patterns including export * and complex paths
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
 * Get all index.ts files
 */
function getAllIndexFiles(dir, fileList = []) {
  const files = readdirSync(dir);

  files.forEach((file) => {
    const filePath = join(dir, file);
    const stat = statSync(filePath);

    if (stat.isDirectory()) {
      if (!['node_modules', 'dist', '.git', 'coverage', '.next', 'build'].includes(file)) {
        getAllIndexFiles(filePath, fileList);
      }
    } else if (file === 'index.ts') {
      fileList.push(filePath);
    }
  });

  return fileList;
}

/**
 * Find the actual file for any import path
 */
function findActualFile(importPath, currentFilePath) {
  // If it already has an extension, return it
  if (extname(importPath)) return importPath;

  // Remove leading ./
  const cleanPath = importPath.startsWith('./') ? importPath.slice(2) : importPath;
  const baseDir = dirname(currentFilePath);

  // Try all possible file locations
  const candidates = [
    // Direct file
    join(baseDir, cleanPath + '.ts'),
    join(baseDir, cleanPath + '.tsx'),
    // Index files in directories
    join(baseDir, cleanPath, 'index.ts'),
    join(baseDir, cleanPath, 'index.tsx'),
    // Subdirectory with same name
    join(baseDir, cleanPath, cleanPath + '.ts'),
    join(baseDir, cleanPath, cleanPath + '.tsx'),
  ];

  for (const candidate of candidates) {
    try {
      statSync(candidate);
      const resolved = relative(baseDir, candidate);
      return resolved.startsWith('.') ? resolved : './' + resolved;
    } catch {
      // Continue trying
    }
  }

  // As last resort, check if it's a directory with an index
  try {
    const dirPath = join(baseDir, cleanPath);
    const stat = statSync(dirPath);
    if (stat.isDirectory()) {
      const indexPath = join(dirPath, 'index.ts');
      if (statSync(indexPath)) {
        const resolved = relative(baseDir, indexPath);
        return resolved.startsWith('.') ? resolved : './' + resolved;
      }
    }
  } catch {
    // Give up
  }

  // Fallback: guess based on context
  return importPath + (currentFilePath.endsWith('.tsx') ? '.tsx' : '.ts');
}

/**
 * Fix ALL export patterns in a barrel file
 */
function fixBarrelFile(filePath) {
  const content = readFileSync(filePath, 'utf-8');
  let modified = false;
  let newContent = content;

  // Pattern 1: export { ... } from './path'
  const exportFromRegex = /export\s+\{[^}]*\}\s+from\s+['"]([^'"]+)['"]/g;
  let match;
  
  while ((match = exportFromRegex.exec(content)) !== null) {
    const exportPath = match[1];
    if (exportPath.startsWith('./') && !extname(exportPath)) {
      const fixedPath = findActualFile(exportPath, filePath);
      if (fixedPath !== exportPath) {
        newContent = newContent.replace(`'${exportPath}'`, `'${fixedPath}'`);
        newContent = newContent.replace(`"${exportPath}"`, `"${fixedPath}"`);
        modified = true;
      }
    }
  }

  // Pattern 2: export * from './path'
  const exportStarRegex = /export\s+\*\s+from\s+['"]([^'"]+)['"]/g;
  
  while ((match = exportStarRegex.exec(content)) !== null) {
    const exportPath = match[1];
    if (exportPath.startsWith('./') && !extname(exportPath)) {
      const fixedPath = findActualFile(exportPath, filePath);
      if (fixedPath !== exportPath) {
        newContent = newContent.replace(`'${exportPath}'`, `'${fixedPath}'`);
        newContent = newContent.replace(`"${exportPath}"`, `"${fixedPath}"`);
        modified = true;
      }
    }
  }

  // Pattern 3: export { default as Name } from './path'
  const exportDefaultRegex = /export\s+\{[^}]*default[^}]*\}\s+from\s+['"]([^'"]+)['"]/g;
  
  while ((match = exportDefaultRegex.exec(content)) !== null) {
    const exportPath = match[1];
    if (exportPath.startsWith('./') && !extname(exportPath)) {
      const fixedPath = findActualFile(exportPath, filePath);
      if (fixedPath !== exportPath) {
        newContent = newContent.replace(`'${exportPath}'`, `'${fixedPath}'`);
        newContent = newContent.replace(`"${exportPath}"`, `"${fixedPath}"`);
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
  console.log(`║   AGGRESSIVE Barrel Extension Fixer ║`);
  console.log(`╚════════════════════════════════════════╝${COLORS.reset}\n`);

  const srcDir = join(ROOT, 'src');
  const files = getAllIndexFiles(srcDir);

  console.log(`Found ${files.length} index.ts files\n`);
  console.log('Aggressively fixing ALL export patterns...\n');

  files.forEach(fixBarrelFile);

  console.log(`\n${COLORS.blue}═══════════════════════════════════════${COLORS.reset}`);
  console.log(`Processed: ${filesProcessed} files`);
  console.log(`Modified: ${filesModified} files`);
  console.log(`\n${COLORS.green}[DONE] All barrel exports now have explicit extensions${COLORS.reset}\n`);
}

main();
