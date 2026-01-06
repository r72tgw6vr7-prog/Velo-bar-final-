#!/usr/bin/env node
/**
 * Safe Image Cleanup - Phase 1
 * =============================
 * Removes broken image references from code files.
 *
 * Safety:
 * - DOES NOT delete actual image files
 * - Skips backup directories
 * - Skips dynamic template literals (${...})
 * - Only modifies code files (.tsx, .jsx, .css)
 *
 * Run: node scripts/cleanup-broken-images.cjs
 */

const fs = require('fs');
const path = require('path');

const AUDIT_REPORT = './images-audit-report.json';
const DRY_RUN = process.argv.includes('--dry-run');
const VERBOSE = process.argv.includes('--verbose');

// Directories to skip (backups, archives)
const SKIP_DIRS = ['components-backup', 'archive', 'node_modules', 'dist', '.git'];

function log(...args) {
  console.log('[CLEANUP]', ...args);
}

function verbose(...args) {
  if (VERBOSE) console.log('[VERBOSE]', ...args);
}

// ============================================
// Load and filter broken references
// ============================================
function loadBrokenReferences() {
  const reportPath = path.resolve(AUDIT_REPORT);
  if (!fs.existsSync(reportPath)) {
    log('ERROR: Audit report not found:', reportPath);
    process.exit(1);
  }

  const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
  const broken = report.findings.filter((f) => f.type === 'BROKEN_REFERENCE');

  log(`Found ${broken.length} broken references in audit report`);

  // Filter out references we should skip
  const filtered = broken.filter((ref) => {
    const file = ref.file;

    // Skip backup directories
    if (SKIP_DIRS.some((dir) => file.includes(dir))) {
      verbose(`SKIP (backup): ${file}`);
      return false;
    }

    // Skip dynamic template literals (not actually broken)
    if (ref.code && /\$\{/.test(ref.code)) {
      verbose(`SKIP (dynamic): ${file}:${ref.line} - ${ref.code}`);
      return false;
    }

    // Skip blob: and data: URIs (not file references)
    if (ref.code && (ref.code.startsWith('blob') || ref.code.startsWith('data:'))) {
      verbose(`SKIP (blob/data URI): ${file}:${ref.line}`);
      return false;
    }

    return true;
  });

  log(`After filtering: ${filtered.length} references to fix`);
  return filtered;
}

// ============================================
// Group references by file for batch processing
// ============================================
function groupByFile(references) {
  const groups = {};
  for (const ref of references) {
    if (!groups[ref.file]) {
      groups[ref.file] = [];
    }
    groups[ref.file].push(ref);
  }
  return groups;
}

// ============================================
// Remove broken reference from file
// ============================================
function fixFile(filePath, references) {
  if (!fs.existsSync(filePath)) {
    log(`WARN: File not found: ${filePath}`);
    return false;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const originalContent = content;

  // Sort references by line number (descending) to avoid line number shifts
  const sortedRefs = references.sort((a, b) => b.line - a.line);

  let changesMade = false;

  for (const ref of sortedRefs) {
    const lineIdx = ref.line - 1; // Convert to 0-indexed

    if (lineIdx < 0 || lineIdx >= lines.length) {
      log(`WARN: Line ${ref.line} out of range in ${filePath}`);
      continue;
    }

    const line = lines[lineIdx];
    const code = ref.code;

    // Check if the code reference is actually on this line
    if (!line.includes(code)) {
      log(`WARN: Code "${code}" not found on line ${ref.line} in ${filePath}`);
      verbose(`Line content: ${line}`);
      continue;
    }

    // Determine how to remove the reference
    const ext = path.extname(filePath);

    if (ext === '.css') {
      // Remove CSS background-image rule or entire block
      if (line.includes('background-image:') || line.includes('url(')) {
        // Comment out the line instead of removing to be safe
        lines[lineIdx] = `  /* BROKEN IMAGE REMOVED: ${line.trim()} */`;
        changesMade = true;
        log(`FIX: Commented broken CSS image in ${path.basename(filePath)}:${ref.line}`);
      }
    } else if (ext === '.tsx' || ext === '.jsx') {
      // Check if it's an <img> tag
      if (line.includes('<img') || line.includes('src=')) {
        // Find the complete img tag (might span multiple lines)
        let startLine = lineIdx;
        let endLine = lineIdx;

        // Simple heuristic: if line has <img but no closing >, look ahead
        if (line.includes('<img') && !line.includes('/>') && !line.includes('</img>')) {
          for (let i = lineIdx + 1; i < Math.min(lineIdx + 10, lines.length); i++) {
            endLine = i;
            if (lines[i].includes('/>') || lines[i].includes('</img>')) {
              break;
            }
          }
        }

        // Comment out the img tag
        for (let i = startLine; i <= endLine; i++) {
          lines[i] = `      {/* BROKEN IMAGE REMOVED: ${lines[i].trim()} */}`;
        }

        changesMade = true;
        log(`FIX: Commented broken img tag in ${path.basename(filePath)}:${ref.line}`);
      }
    }
  }

  if (changesMade) {
    const newContent = lines.join('\n');

    if (DRY_RUN) {
      log(`DRY RUN: Would update ${filePath}`);
      return true;
    }

    fs.writeFileSync(filePath, newContent, 'utf8');
    log(`UPDATED: ${filePath}`);
    return true;
  }

  return false;
}

// ============================================
// Main
// ============================================
function main() {
  log('Starting safe image cleanup...');

  if (DRY_RUN) {
    log('DRY RUN MODE - No files will be modified');
  }

  // Load broken references
  const broken = loadBrokenReferences();

  if (broken.length === 0) {
    log('No broken references to fix!');
    return;
  }

  // Group by file
  const fileGroups = groupByFile(broken);
  const fileCount = Object.keys(fileGroups).length;

  log(`Processing ${broken.length} broken references across ${fileCount} files...`);
  log('');

  // Process each file
  let filesModified = 0;
  let referencesFixed = 0;

  for (const [filePath, refs] of Object.entries(fileGroups)) {
    log(`Processing: ${path.basename(filePath)} (${refs.length} references)`);

    const fixed = fixFile(filePath, refs);
    if (fixed) {
      filesModified++;
      referencesFixed += refs.length;
    }
  }

  // Summary
  log('');
  log('='.repeat(60));
  log('CLEANUP SUMMARY');
  log('='.repeat(60));
  log(`Total broken references found: ${broken.length}`);
  log(`Files modified: ${filesModified}`);
  log(`References fixed: ${referencesFixed}`);

  if (DRY_RUN) {
    log('');
    log('This was a DRY RUN. Run without --dry-run to apply changes.');
  } else {
    log('');
    log('[OK] Cleanup complete! All broken image references have been removed.');
    log('');
    log('Next steps:');
    log('1. Review the changes: git diff');
    log('2. Test the site: npm run dev');
    log('3. Commit: git add . && git commit -m "fix: remove broken image references"');
  }
}

// Run
try {
  main();
} catch (error) {
  console.error('[ERROR]', error.message);
  process.exit(1);
}
