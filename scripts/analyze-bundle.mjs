#!/usr/bin/env node

/**
 * Bundle Size Analyzer
 * Analyzes the production build and reports on bundle sizes
 */

import { readFileSync, readdirSync, statSync, existsSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, '..');
const DIST_DIR = join(ROOT, 'dist');

const COLORS = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  green: '\x1b[32m',
  blue: '\x1b[36m',
  bold: '\x1b[1m',
};

const SIZE_LIMITS = {
  js: 500 * 1024, // 500 KB
  css: 100 * 1024, // 100 KB
  total: 2 * 1024 * 1024, // 2 MB
};

/**
 * Format bytes to human-readable
 */
function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Get color for size based on limits
 */
function getColorForSize(size, type) {
  const limit = SIZE_LIMITS[type] || SIZE_LIMITS.total;
  const percentage = (size / limit) * 100;

  if (percentage > 100) return COLORS.red;
  if (percentage > 80) return COLORS.yellow;
  return COLORS.green;
}

/**
 * Get all files recursively
 */
function getAllFiles(dir, fileList = []) {
  if (!existsSync(dir)) {
    return fileList;
  }

  const files = readdirSync(dir);

  files.forEach((file) => {
    const filePath = join(dir, file);
    const stat = statSync(filePath);

    if (stat.isDirectory()) {
      getAllFiles(filePath, fileList);
    } else {
      fileList.push({
        path: filePath,
        size: stat.size,
        name: file,
      });
    }
  });

  return fileList;
}

/**
 * Categorize files
 */
function categorizeFiles(files) {
  const categories = {
    js: [],
    css: [],
    html: [],
    images: [],
    fonts: [],
    other: [],
  };

  files.forEach((file) => {
    if (file.name.match(/\.js$/)) categories.js.push(file);
    else if (file.name.match(/\.css$/)) categories.css.push(file);
    else if (file.name.match(/\.html$/)) categories.html.push(file);
    else if (file.name.match(/\.(png|jpg|jpeg|gif|svg|webp)$/)) categories.images.push(file);
    else if (file.name.match(/\.(woff|woff2|ttf|eot)$/)) categories.fonts.push(file);
    else categories.other.push(file);
  });

  return categories;
}

/**
 * Print category summary
 */
function printCategorySummary(name, files, type) {
  if (files.length === 0) return;

  const totalSize = files.reduce((sum, f) => sum + f.size, 0);
  const color = getColorForSize(totalSize, type);

  console.log(`\n${COLORS.bold}${name}:${COLORS.reset}`);
  console.log(`${color}  Total: ${formatBytes(totalSize)}${COLORS.reset}`);
  console.log(`  Files: ${files.length}`);

  // Show top 5 largest files
  const sorted = [...files].sort((a, b) => b.size - a.size).slice(0, 5);
  sorted.forEach((file) => {
    const fileColor = getColorForSize(file.size, type);
    console.log(`    ${fileColor}${file.name}: ${formatBytes(file.size)}${COLORS.reset}`);
  });
}

/**
 * Analyze chunk names from manifest
 */
function analyzeChunks(jsFiles) {
  const chunks = {
    vendor: [],
    app: [],
    ui: [],
    pages: [],
    other: [],
  };

  jsFiles.forEach((file) => {
    if (file.name.includes('vendor')) chunks.vendor.push(file);
    else if (file.name.includes('app')) chunks.app.push(file);
    else if (file.name.includes('ui')) chunks.ui.push(file);
    else if (file.name.includes('page')) chunks.pages.push(file);
    else chunks.other.push(file);
  });

  return chunks;
}

/**
 * Main execution
 */
function main() {
  console.log(`${COLORS.blue}${COLORS.bold}`);
  console.log('╔════════════════════════════════════════╗');
  console.log('║      Bundle Size Analysis Report      ║');
  console.log('╚════════════════════════════════════════╝');
  console.log(COLORS.reset);

  if (!existsSync(DIST_DIR)) {
    console.log(`${COLORS.red}[ERROR] Build directory not found: ${DIST_DIR}${COLORS.reset}`);
    console.log(`   Run 'npm run build' first`);
    process.exit(1);
  }

  const files = getAllFiles(DIST_DIR);
  const categories = categorizeFiles(files);
  const totalSize = files.reduce((sum, f) => sum + f.size, 0);

  // Print overview
  console.log(`\n${COLORS.bold}Overview:${COLORS.reset}`);
  const totalColor = getColorForSize(totalSize, 'total');
  console.log(`${totalColor}  Total Bundle Size: ${formatBytes(totalSize)}${COLORS.reset}`);
  console.log(`  Total Files: ${files.length}`);

  // Print category summaries
  printCategorySummary('JavaScript', categories.js, 'js');
  printCategorySummary('CSS', categories.css, 'css');
  printCategorySummary('HTML', categories.html, 'html');
  printCategorySummary('Images', categories.images, 'images');
  printCategorySummary('Fonts', categories.fonts, 'fonts');

  // Analyze JS chunks
  if (categories.js.length > 0) {
    console.log(`\n${COLORS.bold}JavaScript Chunks:${COLORS.reset}`);
    const chunks = analyzeChunks(categories.js);

    Object.entries(chunks).forEach(([name, files]) => {
      if (files.length > 0) {
        const size = files.reduce((sum, f) => sum + f.size, 0);
        console.log(`  ${name}: ${formatBytes(size)} (${files.length} files)`);
      }
    });
  }

  // Print recommendations
  console.log(`\n${COLORS.blue}${COLORS.bold}Recommendations:${COLORS.reset}`);

  const jsSize = categories.js.reduce((sum, f) => sum + f.size, 0);
  const cssSize = categories.css.reduce((sum, f) => sum + f.size, 0);

  if (jsSize > SIZE_LIMITS.js) {
    console.log(
      `  ${COLORS.yellow}[WARN]  JavaScript bundle exceeds ${formatBytes(SIZE_LIMITS.js)}${COLORS.reset}`,
    );
    console.log(`     Consider code splitting or lazy loading`);
  }

  if (cssSize > SIZE_LIMITS.css) {
    console.log(
      `  ${COLORS.yellow}[WARN]  CSS bundle exceeds ${formatBytes(SIZE_LIMITS.css)}${COLORS.reset}`,
    );
    console.log(`     Consider removing unused styles`);
  }

  if (totalSize > SIZE_LIMITS.total) {
    console.log(
      `  ${COLORS.yellow}[WARN]  Total bundle exceeds ${formatBytes(SIZE_LIMITS.total)}${COLORS.reset}`,
    );
    console.log(`     Review asset optimization and compression`);
  }

  if (jsSize <= SIZE_LIMITS.js && cssSize <= SIZE_LIMITS.css && totalSize <= SIZE_LIMITS.total) {
    console.log(`  ${COLORS.green}[OK] Bundle size is within acceptable limits${COLORS.reset}`);
  }

  console.log(`\n${COLORS.blue}═══════════════════════════════════════${COLORS.reset}\n`);
}

main();
