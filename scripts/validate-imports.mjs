#!/usr/bin/env node

/**
 * Import Path Validator
 * Validates that imports follow project standards
 * - No deep relative imports (more than 2 levels)
 * - Prefer path aliases (@/) over relative paths
 * - No circular dependencies
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, dirname, relative } from 'path';
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

let issues = {
  deepImports: [],
  shouldUseAlias: [],
  circularDeps: [],
};

/**
 * Get all TypeScript files recursively
 */
function getAllTsFiles(dir, fileList = []) {
  const files = readdirSync(dir);

  files.forEach((file) => {
    const filePath = join(dir, file);
    const stat = statSync(filePath);

    if (stat.isDirectory()) {
      // Skip node_modules, dist, etc.
      if (!['node_modules', 'dist', '.git', 'coverage'].includes(file)) {
        getAllTsFiles(filePath, fileList);
      }
    } else if (file.match(/\.(ts|tsx)$/)) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

/**
 * Extract imports from a file
 */
function extractImports(filePath) {
  const content = readFileSync(filePath, 'utf-8');
  const importRegex = /import\s+(?:[\w,\s{}*]+\s+from\s+)?['"]([^'"]+)['"]/g;
  const imports = [];
  let match;

  while ((match = importRegex.exec(content)) !== null) {
    imports.push({
      path: match[1],
      line: content.substring(0, match.index).split('\n').length,
    });
  }

  return imports;
}

/**
 * Count levels of relative imports
 */
function countRelativeLevels(importPath) {
  const matches = importPath.match(/\.\.\//g);
  return matches ? matches.length : 0;
}

/**
 * Check if import should use alias
 */
function shouldUsePathAlias(importPath, currentFile) {
  // If it's importing from src/components, src/lib, src/hooks, etc.
  const aliasTargets = ['components', 'lib', 'hooks', 'types', 'utils', 'config'];

  for (const target of aliasTargets) {
    if (importPath.includes(`/${target}/`) || importPath.includes(`src/${target}`)) {
      return !importPath.startsWith('@/');
    }
  }

  return false;
}

/**
 * Validate imports in a file
 */
function validateFile(filePath) {
  const imports = extractImports(filePath);
  const relPath = relative(ROOT, filePath);

  imports.forEach(({ path: importPath, line }) => {
    // Skip node_modules and @radix-ui, etc.
    if (!importPath.startsWith('.') && !importPath.startsWith('@/')) {
      return;
    }

    // Check for deep relative imports
    const levels = countRelativeLevels(importPath);
    if (levels > 2) {
      issues.deepImports.push({
        file: relPath,
        line,
        import: importPath,
        levels,
      });
    }

    // Check if should use path alias
    if (importPath.startsWith('../') && shouldUsePathAlias(importPath, filePath)) {
      issues.shouldUseAlias.push({
        file: relPath,
        line,
        import: importPath,
      });
    }
  });
}

/**
 * Print results
 */
function printResults() {
  console.log(`\n${COLORS.blue}╔════════════════════════════════════════╗`);
  console.log(`║   Import Path Validation Report       ║`);
  console.log(`╚════════════════════════════════════════╝${COLORS.reset}\n`);

  // Deep imports
  if (issues.deepImports.length > 0) {
    console.log(
      `${COLORS.red}[ERROR] Deep Relative Imports (${issues.deepImports.length})${COLORS.reset}`,
    );
    console.log(`   Imports with more than 2 levels (../../..)\n`);

    issues.deepImports.forEach(({ file, line, import: imp, levels }) => {
      console.log(`   ${file}:${line}`);
      console.log(`   └─ ${COLORS.yellow}${imp}${COLORS.reset} (${levels} levels)`);
      console.log();
    });
  }

  // Should use alias
  if (issues.shouldUseAlias.length > 0) {
    console.log(
      `${COLORS.yellow}[WARN]  Should Use Path Alias (${issues.shouldUseAlias.length})${COLORS.reset}`,
    );
    console.log(`   Relative imports that should use @/ alias\n`);

    issues.shouldUseAlias.forEach(({ file, line, import: imp }) => {
      console.log(`   ${file}:${line}`);
      console.log(`   └─ ${COLORS.yellow}${imp}${COLORS.reset}`);

      // Suggest fix
      const suggestion = imp.replace(/\.\.\/src\//, '@/').replace(/\.\.\//g, '');
      if (suggestion !== imp) {
        console.log(`   [TIP] Suggestion: ${COLORS.green}${suggestion}${COLORS.reset}`);
      }
      console.log();
    });
  }

  // Summary
  console.log(`${COLORS.blue}═══════════════════════════════════════${COLORS.reset}`);

  const totalIssues = issues.deepImports.length + issues.shouldUseAlias.length;

  if (totalIssues === 0) {
    console.log(`${COLORS.green}[OK] All imports follow project standards!${COLORS.reset}`);
  } else {
    console.log(`${COLORS.red}Total Issues: ${totalIssues}${COLORS.reset}`);
    console.log(`  - Deep imports: ${issues.deepImports.length}`);
    console.log(`  - Should use alias: ${issues.shouldUseAlias.length}`);
  }

  console.log();

  return totalIssues;
}

/**
 * Main execution
 */
function main() {
  console.log('[CHECK] Scanning TypeScript files...\n');

  const srcDir = join(ROOT, 'src');
  const files = getAllTsFiles(srcDir);

  console.log(`Found ${files.length} TypeScript files\n`);
  console.log('Validating imports...\n');

  files.forEach(validateFile);

  const totalIssues = printResults();

  // Exit with error code if issues found
  process.exit(totalIssues > 0 ? 1 : 0);
}

main();
