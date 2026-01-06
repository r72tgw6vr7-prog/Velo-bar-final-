#!/usr/bin/env node
/**
 * IMAGE VALIDATION SCRIPT
 * ========================
 * Validates all image references in the codebase against actual files.
 * Run: node scripts/validate-images.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, '../public');
const srcDir = path.join(__dirname, '../src');

console.log('[CHECK] IMAGE VALIDATION REPORT');
console.log('========================\n');

// Get all image files in public directory
function getAllImages(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      getAllImages(filePath, fileList);
    } else if (/\.(jpg|jpeg|png|svg|gif|webp)$/i.test(file)) {
      // Convert to relative path from public directory
      const relativePath = filePath.replace(publicDir, '').replace(/\\/g, '/');
      fileList.push(relativePath);
    }
  });

  return fileList;
}

// Extract image references from source files
function extractImageRefs(dir, refs = new Set()) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory() && !file.includes('node_modules')) {
      extractImageRefs(filePath, refs);
    } else if (/\.(tsx?|jsx?|css)$/.test(file)) {
      const content = fs.readFileSync(filePath, 'utf8');

      // Match various image reference patterns
      const patterns = [
        /['"]\/images\/[^'"]+\.(?:jpg|jpeg|png|svg|gif|webp)['"]/gi,
        /['"]\/hero\/[^'"]+\.(?:jpg|jpeg|png|svg|gif|webp)['"]/gi,
        /url\(['"]?\/[^'"()]+\.(?:jpg|jpeg|png|svg|gif|webp)['"]?\)/gi,
      ];

      patterns.forEach((pattern) => {
        const matches = content.match(pattern) || [];
        matches.forEach((match) => {
          // Clean up the match to get just the path
          const cleanPath = match.replace(/['"()url]/g, '').trim();
          refs.add(cleanPath);
        });
      });
    }
  });

  return Array.from(refs);
}

const imageFiles = getAllImages(publicDir);
const imageRefs = extractImageRefs(srcDir);

console.log(`[DIR] Found ${imageFiles.length} image files in /public`);
console.log(`[NOTE] Found ${imageRefs.length} image references in /src\n`);

// Find referenced images that don't exist
const missingFiles = imageRefs.filter((ref) => !imageFiles.includes(ref));

// Find image files that aren't referenced
const unusedFiles = imageFiles.filter((file) => {
  // Check if any reference points to this file
  return !imageRefs.some((ref) => ref === file || ref.endsWith(file));
});

// Check for case sensitivity issues
const caseIssues = [];
imageRefs.forEach((ref) => {
  const lowerRef = ref.toLowerCase();
  const matchingFiles = imageFiles.filter((file) => file.toLowerCase() === lowerRef);

  if (matchingFiles.length > 0 && !matchingFiles.includes(ref)) {
    caseIssues.push({
      referenced: ref,
      actual: matchingFiles[0],
    });
  }
});

// Check for naming convention violations
const namingIssues = imageFiles.filter((file) => {
  const filename = path.basename(file);
  // Check for spaces, uppercase, or underscores in certain contexts
  return (
    /\s|[A-Z]|_/.test(filename) &&
    !/^(AAron|ANGIE|Eli-luquez|Debi|Loui|Oli|Vive|Sasha)/.test(filename)
  );
});

// Print results
if (missingFiles.length > 0) {
  console.log('[ERROR] MISSING FILES (referenced but not found):');
  missingFiles.forEach((file) => console.log(`   ${file}`));
  console.log('');
}

if (caseIssues.length > 0) {
  console.log('[WARN]  CASE SENSITIVITY ISSUES:');
  caseIssues.forEach((issue) => {
    console.log(`   Referenced: ${issue.referenced}`);
    console.log(`   Actual:     ${issue.actual}\n`);
  });
}

if (namingIssues.length > 0) {
  console.log('[WARN]  NAMING CONVENTION VIOLATIONS:');
  namingIssues.forEach((file) => console.log(`   ${file}`));
  console.log('');
}

if (unusedFiles.length > 0 && unusedFiles.length < 50) {
  console.log(`ℹ️  POTENTIALLY UNUSED FILES (${unusedFiles.length}):`);
  unusedFiles.slice(0, 20).forEach((file) => console.log(`   ${file}`));
  if (unusedFiles.length > 20) {
    console.log(`   ... and ${unusedFiles.length - 20} more`);
  }
  console.log('');
}

// Summary
console.log(' SUMMARY:');
console.log(`   Total images: ${imageFiles.length}`);
console.log(`   Total references: ${imageRefs.length}`);
console.log(`   Missing files: ${missingFiles.length}`);
console.log(`   Case issues: ${caseIssues.length}`);
console.log(`   Naming violations: ${namingIssues.length}`);
console.log(`   Unused files: ${unusedFiles.length}\n`);

if (missingFiles.length === 0 && caseIssues.length === 0) {
  console.log('[OK] All image references are valid!');
} else {
  console.log('[ERROR] Issues found. Please fix the problems above.');
  process.exit(1);
}
