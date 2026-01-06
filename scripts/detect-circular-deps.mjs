#!/usr/bin/env node

/**
 * Circular Dependency Detector
 * Detects circular dependencies in the codebase
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, dirname, relative, resolve } from 'path';
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
  bold: '\x1b[1m',
};

// Map of file -> imports
const dependencyGraph = new Map();
const circularDeps = [];

/**
 * Get all TypeScript files
 */
function getAllTsFiles(dir, fileList = []) {
  const files = readdirSync(dir);

  files.forEach((file) => {
    const filePath = join(dir, file);
    const stat = statSync(filePath);

    if (stat.isDirectory()) {
      if (!['node_modules', 'dist', '.git', 'coverage'].includes(file)) {
        getAllTsFiles(filePath, fileList);
      }
    } else if (file.match(/\.(ts|tsx)$/) && !file.endsWith('.d.ts')) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

/**
 * Extract imports from file
 */
function extractImports(filePath) {
  const content = readFileSync(filePath, 'utf-8');
  const importRegex = /import\s+(?:[\w,\s{}*]+\s+from\s+)?['"]([^'"]+)['"]/g;
  const imports = [];
  let match;

  while ((match = importRegex.exec(content)) !== null) {
    let importPath = match[1];

    // Skip node_modules
    if (!importPath.startsWith('.') && !importPath.startsWith('@/')) {
      continue;
    }

    // Resolve relative paths
    if (importPath.startsWith('.')) {
      importPath = resolve(dirname(filePath), importPath);
    } else if (importPath.startsWith('@/')) {
      importPath = resolve(ROOT, 'src', importPath.replace('@/', ''));
    }

    // Add common extensions if missing
    if (!importPath.match(/\.(ts|tsx|js|jsx)$/)) {
      const extensions = ['.ts', '.tsx', '/index.ts', '/index.tsx'];
      for (const ext of extensions) {
        try {
          const testPath = importPath + ext;
          statSync(testPath);
          importPath = testPath;
          break;
        } catch (e) {
          // File doesn't exist, try next extension
        }
      }
    }

    imports.push(importPath);
  }

  return imports;
}

/**
 * Build dependency graph
 */
function buildDependencyGraph(files) {
  files.forEach((file) => {
    const imports = extractImports(file);
    dependencyGraph.set(file, imports);
  });
}

/**
 * Detect cycles using DFS
 */
function detectCycles(node, visited = new Set(), path = []) {
  if (path.includes(node)) {
    // Found a cycle
    const cycleStart = path.indexOf(node);
    const cycle = path.slice(cycleStart).concat(node);

    // Create readable cycle path
    const readableCycle = cycle.map((f) => relative(ROOT, f));

    // Check if this exact cycle was already found
    const cycleKey = readableCycle.sort().join('->');
    if (!circularDeps.some((c) => c.key === cycleKey)) {
      circularDeps.push({
        key: cycleKey,
        files: readableCycle,
      });
    }
    return;
  }

  if (visited.has(node)) {
    return;
  }

  visited.add(node);
  path.push(node);

  const imports = dependencyGraph.get(node) || [];
  imports.forEach((importPath) => {
    if (dependencyGraph.has(importPath)) {
      detectCycles(importPath, visited, [...path]);
    }
  });
}

/**
 * Print results
 */
function printResults() {
  console.log(`\n${COLORS.blue}${COLORS.bold}╔════════════════════════════════════════╗`);
  console.log(`║   Circular Dependency Analysis         ║`);
  console.log(`╚════════════════════════════════════════╝${COLORS.reset}\n`);

  if (circularDeps.length === 0) {
    console.log(`${COLORS.green}[OK] No circular dependencies detected!${COLORS.reset}\n`);
    return 0;
  }

  console.log(
    `${COLORS.red}[ERROR] Found ${circularDeps.length} circular dependencies:${COLORS.reset}\n`,
  );

  circularDeps.forEach((cycle, index) => {
    console.log(`${COLORS.yellow}Cycle ${index + 1}:${COLORS.reset}`);
    cycle.files.forEach((file, i) => {
      const isLast = i === cycle.files.length - 1;
      const arrow = isLast ? '  └─→ ' : '  ├─→ ';
      const color = isLast ? COLORS.red : COLORS.reset;
      console.log(`${arrow}${color}${file}${COLORS.reset}`);
    });
    console.log();
  });

  console.log(`${COLORS.blue}═══════════════════════════════════════${COLORS.reset}`);
  console.log(
    `${COLORS.yellow}Recommendation: Refactor to remove circular dependencies${COLORS.reset}`,
  );
  console.log(`- Extract shared code to separate modules`);
  console.log(`- Use dependency injection`);
  console.log(`- Consider architectural patterns (e.g., layers)\n`);

  return circularDeps.length;
}

/**
 * Main execution
 */
function main() {
  console.log('[CHECK] Scanning for circular dependencies...\n');

  const srcDir = join(ROOT, 'src');
  const files = getAllTsFiles(srcDir);

  console.log(`Found ${files.length} TypeScript files`);
  console.log('Building dependency graph...\n');

  buildDependencyGraph(files);

  console.log('Detecting cycles...');

  // Run cycle detection from each file
  files.forEach((file) => {
    detectCycles(file);
  });

  const issueCount = printResults();
  process.exit(issueCount > 0 ? 1 : 0);
}

main();
