#!/usr/bin/env node

/**
 * Project Health Check
 * Comprehensive verification of project setup and configuration
 */

import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { execSync } from 'child_process';

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

const checks = {
  passed: [],
  warnings: [],
  failed: [],
};

/**
 * Check if file exists
 */
function checkFile(path, name, critical = false) {
  const fullPath = join(ROOT, path);
  if (existsSync(fullPath)) {
    checks.passed.push(`[OK] ${name}`);
    return true;
  } else {
    const message = `[FAIL] ${name} not found`;
    if (critical) {
      checks.failed.push(message);
    } else {
      checks.warnings.push(message);
    }
    return false;
  }
}

/**
 * Check package.json scripts
 */
function checkPackageScripts() {
  const pkgPath = join(ROOT, 'package.json');
  if (!existsSync(pkgPath)) {
    checks.failed.push('[FAIL] package.json not found');
    return;
  }

  const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
  const requiredScripts = ['dev', 'build', 'test', 'lint'];

  requiredScripts.forEach((script) => {
    if (pkg.scripts && pkg.scripts[script]) {
      checks.passed.push(`[OK] Script: ${script}`);
    } else {
      checks.warnings.push(`[WARN] Script missing: ${script}`);
    }
  });
}

/**
 * Check Node version
 */
function checkNodeVersion() {
  try {
    const version = process.version;
    const major = parseInt(version.slice(1).split('.')[0]);

    if (major >= 20) {
      checks.passed.push(`[OK] Node.js ${version}`);
    } else {
      checks.warnings.push(`[WARN] Node.js ${version} (recommended: >=20)`);
    }
  } catch (error) {
    checks.warnings.push('[WARN] Could not check Node version');
  }
}

/**
 * Check git setup
 */
function checkGit() {
  try {
    execSync('git --version', { stdio: 'ignore' });
    checks.passed.push('[OK] Git installed');

    // Check if repo is initialized
    if (existsSync(join(ROOT, '.git'))) {
      checks.passed.push('[OK] Git repository initialized');
    } else {
      checks.warnings.push('[WARN] Not a git repository');
    }
  } catch (error) {
    checks.failed.push('[FAIL] Git not installed');
  }
}

/**
 * Check dependencies
 */
function checkDependencies() {
  if (existsSync(join(ROOT, 'node_modules'))) {
    checks.passed.push('[OK] Dependencies installed');
  } else {
    checks.failed.push('[FAIL] Dependencies not installed (run: npm install)');
  }
}

/**
 * Check TypeScript config
 */
function checkTypeScript() {
  if (checkFile('tsconfig.json', 'TypeScript config', true)) {
    try {
      const tsconfig = JSON.parse(readFileSync(join(ROOT, 'tsconfig.json'), 'utf-8'));
      if (tsconfig.compilerOptions?.strict) {
        checks.passed.push('[OK] TypeScript strict mode enabled');
      } else {
        checks.warnings.push('[WARN] TypeScript strict mode not enabled');
      }
    } catch (error) {
      checks.warnings.push('[WARN] Could not parse tsconfig.json');
    }
  }
}

/**
 * Check environment setup
 */
function checkEnvironment() {
  if (checkFile('.env.example', 'Environment example')) {
    if (existsSync(join(ROOT, '.env.local')) || existsSync(join(ROOT, '.env'))) {
      checks.passed.push('[OK] Environment variables configured');
    } else {
      checks.warnings.push('[WARN] No .env.local file (copy from .env.example)');
    }
  }
}

/**
 * Check VS Code setup
 */
function checkVSCode() {
  if (existsSync(join(ROOT, '.vscode'))) {
    checks.passed.push('[OK] VS Code configuration present');

    if (existsSync(join(ROOT, '.vscode', 'snippets.code-snippets'))) {
      checks.passed.push('[OK] VS Code snippets configured');
    }

    if (existsSync(join(ROOT, '.vscode', 'settings.json'))) {
      checks.passed.push('[OK] VS Code settings present');
    }
  } else {
    checks.warnings.push('[WARN] No .vscode folder');
  }
}

/**
 * Check linting setup
 */
function checkLinting() {
  checkFile('.eslintrc.js', 'ESLint config');
  checkFile('.prettierrc', 'Prettier config');

  const pkgPath = join(ROOT, 'package.json');
  if (existsSync(pkgPath)) {
    const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
    if (pkg.devDependencies?.eslint && pkg.devDependencies?.prettier) {
      checks.passed.push('[OK] Linting tools installed');
    }
  }
}

/**
 * Check testing setup
 */
function checkTesting() {
  const pkgPath = join(ROOT, 'package.json');
  if (existsSync(pkgPath)) {
    const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));

    if (pkg.devDependencies?.vitest || pkg.devDependencies?.jest) {
      checks.passed.push('[OK] Test framework installed');
    } else {
      checks.warnings.push('[WARN] No test framework found');
    }

    if (existsSync(join(ROOT, 'src', '__tests__'))) {
      checks.passed.push('[OK] Test directory present');
    }
  }
}

/**
 * Check build output
 */
function checkBuild() {
  if (existsSync(join(ROOT, 'dist'))) {
    checks.passed.push('[OK] Build output exists');
  } else {
    checks.warnings.push('[WARN] No build output (run: npm run build)');
  }
}

/**
 * Print results
 */
function printResults() {
  console.log(`\n${COLORS.blue}${COLORS.bold}╔════════════════════════════════════════╗`);
  console.log(`║       Project Health Check Report      ║`);
  console.log(`╚════════════════════════════════════════╝${COLORS.reset}\n`);

  // Passed checks
  if (checks.passed.length > 0) {
    console.log(
      `${COLORS.green}${COLORS.bold}[OK] Passed (${checks.passed.length})${COLORS.reset}`,
    );
    checks.passed.forEach((check) => {
      console.log(`   ${COLORS.green}${check}${COLORS.reset}`);
    });
    console.log();
  }

  // Warnings
  if (checks.warnings.length > 0) {
    console.log(
      `${COLORS.yellow}${COLORS.bold}[WARN]  Warnings (${checks.warnings.length})${COLORS.reset}`,
    );
    checks.warnings.forEach((check) => {
      console.log(`   ${COLORS.yellow}${check}${COLORS.reset}`);
    });
    console.log();
  }

  // Failed checks
  if (checks.failed.length > 0) {
    console.log(
      `${COLORS.red}${COLORS.bold}[ERROR] Failed (${checks.failed.length})${COLORS.reset}`,
    );
    checks.failed.forEach((check) => {
      console.log(`   ${COLORS.red}${check}${COLORS.reset}`);
    });
    console.log();
  }

  // Summary
  console.log(`${COLORS.blue}═══════════════════════════════════════${COLORS.reset}`);

  const total = checks.passed.length + checks.warnings.length + checks.failed.length;
  const score = (checks.passed.length / total) * 100;

  let scoreColor = COLORS.green;
  let scoreStatus = 'Excellent';

  if (score < 70) {
    scoreColor = COLORS.red;
    scoreStatus = 'Needs Attention';
  } else if (score < 90) {
    scoreColor = COLORS.yellow;
    scoreStatus = 'Good';
  }

  console.log(
    `${COLORS.bold}Health Score: ${scoreColor}${score.toFixed(0)}%${COLORS.reset} (${scoreStatus})`,
  );
  console.log(`Total Checks: ${total}`);
  console.log(`  Passed: ${COLORS.green}${checks.passed.length}${COLORS.reset}`);
  console.log(`  Warnings: ${COLORS.yellow}${checks.warnings.length}${COLORS.reset}`);
  console.log(`  Failed: ${COLORS.red}${checks.failed.length}${COLORS.reset}`);
  console.log();

  if (checks.failed.length > 0) {
    console.log(
      `${COLORS.red}Action Required: Fix failed checks before proceeding${COLORS.reset}\n`,
    );
    return 1;
  } else if (checks.warnings.length > 0) {
    console.log(`${COLORS.yellow}Recommended: Address warnings for optimal setup${COLORS.reset}\n`);
    return 0;
  } else {
    console.log(`${COLORS.green}✨ Project setup is excellent!${COLORS.reset}\n`);
    return 0;
  }
}

/**
 * Main execution
 */
function main() {
  console.log(`${COLORS.blue}[CHECK] Running project health check...${COLORS.reset}\n`);

  // Run all checks
  checkNodeVersion();
  checkGit();
  checkDependencies();
  checkFile('package.json', 'package.json', true);
  checkPackageScripts();
  checkTypeScript();
  checkFile('vite.config.ts', 'Vite config', true);
  checkFile('tailwind.config.mjs', 'Tailwind config');
  checkEnvironment();
  checkVSCode();
  checkLinting();
  checkTesting();
  checkFile('.gitignore', '.gitignore', true);
  checkFile('README.md', 'README.md');
  checkBuild();

  const exitCode = printResults();
  process.exit(exitCode);
}

main();
