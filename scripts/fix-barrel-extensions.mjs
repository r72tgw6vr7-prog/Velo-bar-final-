#!/usr/bin/env node

/**
 * Barrel file extension fixer
 * Handles index.ts files that export from subdirectories
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
 * Resolve the actual file for a barrel export
 */
function resolveExportPath(exportPath, currentFilePath) {
  // If it already has an extension, return it
  if (extname(exportPath)) return exportPath;

  // Remove leading ./
  const cleanPath = exportPath.startsWith('./') ? exportPath.slice(2) : exportPath;
  const basePath = join(dirname(currentFilePath), cleanPath);

  // Try different combinations
  const candidates = [
    basePath + '.ts',
    basePath + '.tsx',
    join(basePath, 'index.ts'),
    join(basePath, 'index.tsx'),
    join(basePath, cleanPath + '.ts'),
    join(basePath, cleanPath + '.tsx'),
  ];

  for (const candidate of candidates) {
    try {
      statSync(candidate);
      // Return the relative path with correct extension
      const resolved = relative(dirname(currentFilePath), candidate);
      return resolved.startsWith('.') ? resolved : './' + resolved;
    } catch {
      // Continue to next candidate
    }
  }

  // Fallback: assume .ts for non-JSX, .tsx for JSX
  return exportPath + (currentFilePath.endsWith('.tsx') ? '.tsx' : '.ts');
}

/**
 * Fix exports in a barrel file
 */
function fixBarrelFile(filePath) {
  const content = readFileSync(filePath, 'utf-8');
  const exportRegex = /export\s+(?:\{[^}]*\}|\*\s+|\w+(?:\s+as\s+\w+)?)\s+from\s+['"]([^'"]+)['"]/g;
  let modified = false;
  let newContent = content;

  let match;
  while ((match = exportRegex.exec(content)) !== null) {
    const exportPath = match[1];
    
    // Only fix local exports (not packages)
    if (exportPath.startsWith('./') && !extname(exportPath)) {
      const fixedPath = resolveExportPath(exportPath, filePath);
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
  console.log(`║   Barrel File Extension Normalizer   ║`);
  console.log(`╚════════════════════════════════════════╝${COLORS.reset}\n`);

  const srcDir = join(ROOT, 'src');
  const files = getAllIndexFiles(srcDir);

  console.log(`Found ${files.length} index.ts files\n`);
  console.log('Normalizing barrel exports...\n');

  files.forEach(fixBarrelFile);

  console.log(`\n${COLORS.blue}═══════════════════════════════════════${COLORS.reset}`);
  console.log(`Processed: ${filesProcessed} files`);
  console.log(`Modified: ${filesModified} files`);
  console.log(`\n${COLORS.green}[DONE] All barrel exports now have explicit extensions${COLORS.reset}\n`);
}

main();
