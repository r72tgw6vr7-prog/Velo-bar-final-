#!/usr/bin/env node

/**
 * CI Extension Validator
 * Phase 4: Enforce explicit extensions in CI
 */

import { readFileSync, readdirSync, statSync } from 'fs';
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

let violations = [];

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
 * Validate that a local import has an explicit extension
 */
function validateImport(importPath, filePath, line) {
  if (!isLocalImport(importPath)) return true;
  
  if (!extname(importPath)) {
    violations.push({
      file: relative(ROOT, filePath),
      line,
      import: importPath,
      reason: 'Missing file extension',
    });
    return false;
  }

  // Verify the file actually exists
  let basePath = importPath;
  if (importPath.startsWith('@/')) {
    basePath = importPath.replace('@/', './src/');
  }

  const resolvedPath = join(dirname(filePath), basePath);
  try {
    statSync(resolvedPath);
    return true;
  } catch {
    violations.push({
      file: relative(ROOT, filePath),
      line,
      import: importPath,
      reason: 'File does not exist',
    });
    return false;
  }
}

/**
 * Validate a single file
 */
function validateFile(filePath) {
  const content = readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const importRegex = /import\s+(?:[\w,\s{}*]+\s+from\s+)?['"]([^'"]+)['"]/g;

  lines.forEach((line, index) => {
    let match;
    while ((match = importRegex.exec(line)) !== null) {
      const importPath = match[1];
      validateImport(importPath, filePath, index + 1);
    }
  });
}

/**
 * Print results
 */
function printResults() {
  console.log(`\n${COLORS.blue}╔════════════════════════════════════════╗`);
  console.log(`║   CI Extension Validation Report      ║`);
  console.log(`╚════════════════════════════════════════╝${COLORS.reset}\n`);

  if (violations.length > 0) {
    console.log(`${COLORS.red}[ERROR] Extension violations (${violations.length})${COLORS.reset}`);
    console.log(`   Local imports must have explicit extensions and exist on disk\n`);

    violations.forEach(({ file, line, import: imp, reason }) => {
      console.log(`   ${file}:${line}`);
      console.log(`   └─ ${COLORS.yellow}${imp}${COLORS.reset} (${reason})`);
      console.log();
    });
  }

  console.log(`${COLORS.blue}═══════════════════════════════════════${COLORS.reset}`);

  if (violations.length === 0) {
    console.log(`${COLORS.green}[OK] All local imports have explicit extensions${COLORS.reset}`);
  } else {
    console.log(`${COLORS.red}Violations: ${violations.length}${COLORS.reset}`);
  }

  console.log();
  return violations.length;
}

/**
 * Main execution
 */
function main() {
  console.log('[CI] Validating import extensions...\n');

  const files = getAllTsFiles(ROOT);
  console.log(`Scanning ${files.length} files...\n`);

  files.forEach(validateFile);

  const violationCount = printResults();

  // Fail CI if violations found
  process.exit(violationCount > 0 ? 1 : 0);
}

main();
