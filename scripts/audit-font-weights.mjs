#!/usr/bin/env node

/**
 * Font Weight Consistency Audit Script
 *
 * This script audits font weights across the codebase and ensures
 * they align with design tokens. It identifies inconsistencies and
 * provides recommendations for fixes.
 */

import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the correct font weights from design tokens
const DESIGN_TOKEN_WEIGHTS = {
  light: '300',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
  black: '900',
};

// CSS and inline style patterns to check
const PATTERNS = {
  css: {
    hardcoded: /font-weight:\s*([0-9]+|normal|bold|lighter|bolder);/g,
    variable: /font-weight:\s*var\(--font-weight-([^)]+)\);/g,
    className: /font-([a-z]+)/g,
  },
  inline: {
    fontWeight: /fontWeight:\s*([0-9]+|'[^']*'|"[^"]*"),?/g,
    fontWeightNumeric: /fontWeight:\s*([0-9]+)/g,
  },
};

// File extensions to audit
const FILE_EXTENSIONS = ['.tsx', '.ts', '.css', '.scss'];

// Directories to search
const SEARCH_DIRS = ['src/'];

class FontWeightAudit {
  constructor() {
    this.issues = [];
    this.summary = {
      totalFiles: 0,
      filesWithIssues: 0,
      totalIssues: 0,
      issueTypes: {
        hardcodedCSS: 0,
        hardcodedInline: 0,
        incorrectVariable: 0,
        inconsistentUsage: 0,
      },
    };
  }

  async run() {
    console.log('[CHECK] Starting Font Weight Consistency Audit...\n');

    for (const dir of SEARCH_DIRS) {
      await this.auditDirectory(dir);
    }

    this.generateReport();
    await this.createFixedFiles();
  }

  async auditDirectory(dirPath) {
    try {
      const entries = await fs.readdir(dirPath, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = path.join(dirPath, entry.name);

        if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
          await this.auditDirectory(fullPath);
        } else if (entry.isFile() && this.shouldAuditFile(entry.name)) {
          await this.auditFile(fullPath);
        }
      }
    } catch (error) {
      console.error(`Error reading directory ${dirPath}:`, error.message);
    }
  }

  shouldAuditFile(filename) {
    return FILE_EXTENSIONS.some((ext) => filename.endsWith(ext));
  }

  async auditFile(filePath) {
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      this.summary.totalFiles++;

      const fileIssues = [];

      // Check for hardcoded CSS font-weights
      const cssMatches = [...content.matchAll(PATTERNS.css.hardcoded)];
      for (const match of cssMatches) {
        const weight = match[1];
        if (this.isHardcodedWeight(weight)) {
          fileIssues.push({
            type: 'hardcodedCSS',
            line: this.getLineNumber(content, match.index),
            issue: `Hardcoded font-weight: ${weight}`,
            suggestion: this.suggestCSSFix(weight),
            code: match[0],
          });
        }
      }

      // Check for hardcoded inline styles
      const inlineMatches = [...content.matchAll(PATTERNS.inline.fontWeight)];
      for (const match of inlineMatches) {
        const weight = match[1];
        if (this.isHardcodedWeight(weight)) {
          fileIssues.push({
            type: 'hardcodedInline',
            line: this.getLineNumber(content, match.index),
            issue: `Hardcoded fontWeight: ${weight}`,
            suggestion: this.suggestInlineFix(weight),
            code: match[0],
          });
        }
      }

      // Check for incorrect variable usage
      const varMatches = [...content.matchAll(PATTERNS.css.variable)];
      for (const match of varMatches) {
        const varName = match[1];
        if (!DESIGN_TOKEN_WEIGHTS.hasOwnProperty(varName)) {
          fileIssues.push({
            type: 'incorrectVariable',
            line: this.getLineNumber(content, match.index),
            issue: `Unknown font-weight variable: --font-weight-${varName}`,
            suggestion: `Use one of: ${Object.keys(DESIGN_TOKEN_WEIGHTS).join(', ')}`,
            code: match[0],
          });
        }
      }

      if (fileIssues.length > 0) {
        this.issues.push({
          file: filePath,
          issues: fileIssues,
        });
        this.summary.filesWithIssues++;
        this.summary.totalIssues += fileIssues.length;

        // Update issue type counts
        fileIssues.forEach((issue) => {
          this.summary.issueTypes[issue.type]++;
        });
      }
    } catch (error) {
      console.error(`Error reading file ${filePath}:`, error.message);
    }
  }

  isHardcodedWeight(weight) {
    // Check if it's a numeric value or hardcoded string that's not using design tokens
    return /^[0-9]+$/.test(weight) || ['bold', 'normal', 'lighter', 'bolder'].includes(weight);
  }

  suggestCSSFix(weight) {
    const numericWeight = parseInt(weight) || this.mapWordToNumber(weight);
    const tokenName = this.findClosestToken(numericWeight);
    return `font-weight: var(--font-weight-${tokenName}); /* ${DESIGN_TOKEN_WEIGHTS[tokenName]} */`;
  }

  suggestInlineFix(weight) {
    const cleanWeight = weight.replace(/['"]/g, '');
    const numericWeight = parseInt(cleanWeight) || this.mapWordToNumber(cleanWeight);
    const tokenName = this.findClosestToken(numericWeight);
    return `fontWeight: designTokens.typography.fontWeight.${tokenName} /* ${DESIGN_TOKEN_WEIGHTS[tokenName]} */`;
  }

  mapWordToNumber(word) {
    const mapping = {
      normal: 400,
      bold: 700,
      lighter: 300,
      bolder: 800,
    };
    return mapping[word] || 400;
  }

  findClosestToken(numericWeight) {
    const weights = Object.entries(DESIGN_TOKEN_WEIGHTS).map(([name, value]) => ({
      name,
      value: parseInt(value),
    }));

    let closest = weights[0];
    let minDiff = Math.abs(numericWeight - closest.value);

    for (const weight of weights) {
      const diff = Math.abs(numericWeight - weight.value);
      if (diff < minDiff) {
        minDiff = diff;
        closest = weight;
      }
    }

    return closest.name;
  }

  getLineNumber(content, index) {
    return content.substring(0, index).split('\n').length;
  }

  generateReport() {
    console.log('📋 FONT WEIGHT AUDIT REPORT');
    console.log('═'.repeat(50));
    console.log(` Summary:`);
    console.log(`   Total Files Scanned: ${this.summary.totalFiles}`);
    console.log(`   Files with Issues: ${this.summary.filesWithIssues}`);
    console.log(`   Total Issues Found: ${this.summary.totalIssues}\n`);

    if (this.summary.totalIssues === 0) {
      console.log('[OK] No font weight consistency issues found!\n');
      return;
    }

    console.log(`[CHECK] Issue Breakdown:`);
    console.log(`   Hardcoded CSS: ${this.summary.issueTypes.hardcodedCSS}`);
    console.log(`   Hardcoded Inline: ${this.summary.issueTypes.hardcodedInline}`);
    console.log(`   Incorrect Variables: ${this.summary.issueTypes.incorrectVariable}`);
    console.log(`   Other Issues: ${this.summary.issueTypes.inconsistentUsage}\n`);

    console.log('[DIR] Files with Issues:');
    console.log('-'.repeat(50));

    this.issues.forEach((fileIssue) => {
      console.log(`\n[FILE] ${fileIssue.file}`);
      fileIssue.issues.forEach((issue, index) => {
        console.log(`   ${index + 1}. Line ${issue.line}: ${issue.issue}`);
        console.log(`      Current: ${issue.code}`);
        console.log(`      Suggested: ${issue.suggestion}`);
      });
    });

    console.log('\n[TIP] Recommendations:');
    console.log('-'.repeat(50));
    console.log('1. Replace hardcoded font weights with design token variables');
    console.log('2. Use: var(--font-weight-[name]) in CSS');
    console.log('3. Use: designTokens.typography.fontWeight.[name] in TypeScript');
    console.log('4. Available tokens:', Object.keys(DESIGN_TOKEN_WEIGHTS).join(', '));
  }

  async createFixedFiles() {
    if (this.summary.totalIssues === 0) return;

    console.log('\n🔧 Creating fix suggestions...');

    const fixScript = this.generateFixScript();
    const outputPath = path.join(process.cwd(), 'font-weight-fixes.md');

    await fs.writeFile(outputPath, fixScript);
    console.log(`[OK] Fix suggestions written to: ${outputPath}`);
  }

  generateFixScript() {
    let script = `# Font Weight Consistency Fixes

## Summary
- Total Issues: ${this.summary.totalIssues}
- Files Affected: ${this.summary.filesWithIssues}

## Design Token Reference
\`\`\`css
:root {
${Object.entries(DESIGN_TOKEN_WEIGHTS)
  .map(([name, value]) => `  --font-weight-${name}: ${value};`)
  .join('\n')}
}
\`\`\`

## Issues and Fixes

`;

    this.issues.forEach((fileIssue) => {
      script += `### ${fileIssue.file}\n\n`;

      fileIssue.issues.forEach((issue, index) => {
        script += `**Issue ${index + 1}** (Line ${issue.line}): ${issue.issue}\n\n`;
        script += `\`\`\`\n${issue.code}\n\`\`\`\n\n`;
        script += `**Fix:**\n`;
        script += `\`\`\`\n${issue.suggestion}\n\`\`\`\n\n`;
      });

      script += '---\n\n';
    });

    return script;
  }
}

// Run the audit
if (import.meta.url === `file://${process.argv[1]}`) {
  const audit = new FontWeightAudit();
  audit.run().catch(console.error);
}

export default FontWeightAudit;
