#!/usr/bin/env node
/**
 * Gallery Image Audit & Duplicate Detection
 * ==========================================
 *
 * Phase 1: Image File Audit & Preparation Check
 * - Scans /public folder for all images
 * - Validates formats, sizes, dimensions
 * - Checks naming conventions
 * - Flags quality issues (oversized, non-web formats)
 *
 * Phase 2: Duplicate Detection
 * - File-level duplicates (identical filenames, file hashes)
 * - Visual similarity detection (perceptual hashing)
 * - Burst shot detection (sequential images from same event)
 *
 * Phase 3: Gallery Integration Check
 * - Validates paths in ParallaxScrollDemo.tsx
 * - Checks for missing responsive variants
 * - Identifies broken references
 *
 * Output: JSON + Markdown reports with actionable recommendations
 *
 * Usage:
 *   node scripts/audit-gallery-images.mjs
 *   node scripts/audit-gallery-images.mjs --json-only
 *   node scripts/audit-gallery-images.mjs --verbose
 */

import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const VELO_GALLERY_DIR = path.join(PUBLIC_DIR, 'Velo Gallery');
const GALLERY_COMPONENT = path.join(
  __dirname,
  '..',
  'src',
  'components',
  'gallery',
  'ParallaxScrollDemo.tsx',
);

const ARGS = {
  jsonOnly: process.argv.includes('--json-only'),
  verbose: process.argv.includes('--verbose'),
};

// Quality thresholds
const MAX_FILE_SIZE = 500 * 1024; // 500KB
const MIN_WIDTH = 800;
const RECOMMENDED_FORMATS = ['jpg', 'jpeg', 'webp', 'png'];
const NON_WEB_FORMATS = ['heic', 'tiff', 'tif'];
const RESPONSIVE_WIDTHS = [320, 640, 1024, 1920];

// Results storage
const auditResults = {
  timestamp: new Date().toISOString(),
  summary: {
    totalImages: 0,
    webOptimized: 0,
    needsOptimization: 0,
    nonWebFormats: 0,
    oversized: 0,
    duplicates: 0,
    missingVariants: 0,
    brokenReferences: 0,
  },
  images: [],
  duplicates: [],
  galleryIntegration: {
    referencedImages: [],
    missingFiles: [],
    missingVariants: [],
  },
  recommendations: [],
};

/**
 * Get file hash for duplicate detection
 */
async function getFileHash(filePath) {
  try {
    const buffer = await fs.readFile(filePath);
    return crypto.createHash('md5').update(buffer).digest('hex');
  } catch (error) {
    return null;
  }
}

/**
 * Get perceptual hash for visual similarity (simplified)
 */
async function getPerceptualHash(filePath) {
  try {
    const image = sharp(filePath);
    const { data, info } = await image
      .resize(8, 8, { fit: 'fill' })
      .greyscale()
      .raw()
      .toBuffer({ resolveWithObject: true });

    // Simple average hash
    const avg = data.reduce((sum, val) => sum + val, 0) / data.length;
    let hash = '';
    for (let i = 0; i < data.length; i++) {
      hash += data[i] > avg ? '1' : '0';
    }
    return hash;
  } catch (error) {
    return null;
  }
}

/**
 * Calculate hamming distance between two binary strings
 */
function hammingDistance(hash1, hash2) {
  if (!hash1 || !hash2 || hash1.length !== hash2.length) return 100;
  let distance = 0;
  for (let i = 0; i < hash1.length; i++) {
    if (hash1[i] !== hash2[i]) distance++;
  }
  return distance;
}

/**
 * Scan directory recursively for images
 */
async function scanDirectory(dir, baseDir = dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const images = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      // Skip hidden directories
      if (entry.name.startsWith('.')) continue;
      const subImages = await scanDirectory(fullPath, baseDir);
      images.push(...subImages);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase().slice(1);
      if ([...RECOMMENDED_FORMATS, ...NON_WEB_FORMATS].includes(ext)) {
        images.push({
          fullPath,
          relativePath: path.relative(baseDir, fullPath),
          publicPath: '/' + path.relative(PUBLIC_DIR, fullPath).replace(/\\/g, '/'),
          name: entry.name,
          ext,
        });
      }
    }
  }

  return images;
}

/**
 * Analyze a single image file
 */
async function analyzeImage(imageInfo) {
  const { fullPath, name, ext, publicPath } = imageInfo;

  try {
    const stats = await fs.stat(fullPath);
    const metadata = await sharp(fullPath).metadata();
    const fileHash = await getFileHash(fullPath);
    const perceptualHash = await getPerceptualHash(fullPath);

    const analysis = {
      path: publicPath,
      name,
      format: ext,
      size: stats.size,
      sizeKB: Math.round(stats.size / 1024),
      width: metadata.width,
      height: metadata.height,
      aspectRatio:
        metadata.width && metadata.height ? (metadata.width / metadata.height).toFixed(2) : null,
      fileHash,
      perceptualHash,
      issues: [],
      warnings: [],
    };

    // Check format
    if (NON_WEB_FORMATS.includes(ext)) {
      analysis.issues.push(`Non-web format (${ext.toUpperCase()}) - needs conversion to WebP/JPG`);
      auditResults.summary.nonWebFormats++;
    } else if (!RECOMMENDED_FORMATS.includes(ext)) {
      analysis.warnings.push(`Uncommon format: ${ext}`);
    }

    // Check file size
    if (stats.size > MAX_FILE_SIZE) {
      analysis.issues.push(`Oversized: ${analysis.sizeKB}KB (recommended <500KB)`);
      auditResults.summary.oversized++;
    }

    // Check dimensions
    if (metadata.width && metadata.width < MIN_WIDTH) {
      analysis.warnings.push(
        `Low resolution: ${metadata.width}px wide (recommended ≥${MIN_WIDTH}px)`,
      );
    }

    // Check naming
    if (/\s/.test(name)) {
      analysis.warnings.push('Filename contains spaces');
    }
    if (/[A-Z]/.test(name) && !name.match(/^[A-Z0-9]+\./)) {
      analysis.warnings.push('Filename contains uppercase (prefer lowercase)');
    }

    // Determine optimization status
    if (
      analysis.issues.length === 0 &&
      stats.size <= MAX_FILE_SIZE &&
      RECOMMENDED_FORMATS.includes(ext)
    ) {
      auditResults.summary.webOptimized++;
    } else {
      auditResults.summary.needsOptimization++;
    }

    return analysis;
  } catch (error) {
    return {
      path: publicPath,
      name,
      format: ext,
      error: error.message,
      issues: [`Failed to analyze: ${error.message}`],
      warnings: [],
    };
  }
}

/**
 * Detect duplicates
 */
function detectDuplicates(images) {
  const duplicates = [];
  const hashMap = new Map();
  const pHashMap = new Map();

  // Exact duplicates (file hash)
  for (const img of images) {
    if (!img.fileHash) continue;

    if (hashMap.has(img.fileHash)) {
      const original = hashMap.get(img.fileHash);
      duplicates.push({
        type: 'exact',
        original: original.path,
        duplicate: img.path,
        reason: 'Identical file content (MD5 match)',
        recommendation: `Keep: ${original.name} | Remove: ${img.name}`,
      });
      auditResults.summary.duplicates++;
    } else {
      hashMap.set(img.fileHash, img);
    }
  }

  // Visual similarity (perceptual hash)
  const analyzed = [];
  for (const img of images) {
    if (!img.perceptualHash) continue;

    for (const other of analyzed) {
      if (!other.perceptualHash) continue;
      const distance = hammingDistance(img.perceptualHash, other.perceptualHash);

      // Threshold: 0-5 = very similar, 6-10 = similar
      if (distance <= 10 && img.path !== other.path) {
        const similarity = Math.round((1 - distance / 64) * 100);
        duplicates.push({
          type: 'visual',
          original: other.path,
          duplicate: img.path,
          similarity: `${similarity}%`,
          reason: `Visually similar (${similarity}% match) - possible burst shot or crop variation`,
          recommendation: `Review manually: compare ${other.name} vs ${img.name}`,
        });
        if (distance <= 5) {
          auditResults.summary.duplicates++;
        }
      }
    }
    analyzed.push(img);
  }

  return duplicates;
}

/**
 * Check gallery integration
 */
async function checkGalleryIntegration(images) {
  try {
    const componentContent = await fs.readFile(GALLERY_COMPONENT, 'utf-8');

    // Extract basePath values from galleryImages array
    const basePathRegex = /basePath:\s*['"]([^'"]+)['"]/g;
    const referencedPaths = [];
    let match;

    while ((match = basePathRegex.exec(componentContent)) !== null) {
      referencedPaths.push(match[1]);
    }

    auditResults.galleryIntegration.referencedImages = referencedPaths;

    // Check for missing files and variants
    for (const basePath of referencedPaths) {
      const cleanPath = basePath.replace(/^\//, '');

      // Check for base WebP
      const baseWebP = `${cleanPath}.webp`;
      const baseExists = images.some((img) => img.publicPath === `/${baseWebP}`);

      if (!baseExists) {
        auditResults.galleryIntegration.missingFiles.push({
          basePath,
          missing: `${baseWebP}`,
          type: 'base',
        });
        auditResults.summary.brokenReferences++;
      }

      // Check for responsive variants
      for (const width of RESPONSIVE_WIDTHS) {
        const webpVariant = `${cleanPath}-${width}w.webp`;
        const jpgVariant = `${cleanPath}-${width}w.jpg`;

        const webpExists = images.some((img) => img.publicPath === `/${webpVariant}`);
        const jpgExists = images.some((img) => img.publicPath === `/${jpgVariant}`);

        if (!webpExists || !jpgExists) {
          auditResults.galleryIntegration.missingVariants.push({
            basePath,
            width,
            missingWebP: !webpExists,
            missingJPG: !jpgExists,
          });
          auditResults.summary.missingVariants++;
        }
      }
    }
  } catch (error) {
    console.error('Failed to check gallery integration:', error.message);
  }
}

/**
 * Generate recommendations
 */
function generateRecommendations() {
  const recs = [];

  if (auditResults.summary.nonWebFormats > 0) {
    recs.push({
      priority: 'high',
      category: 'Format Conversion',
      issue: `${auditResults.summary.nonWebFormats} images in non-web formats (HEIC, TIFF)`,
      action: 'Run: npm run optimize:gallery to convert to WebP/JPG',
    });
  }

  if (auditResults.summary.oversized > 0) {
    recs.push({
      priority: 'high',
      category: 'File Size',
      issue: `${auditResults.summary.oversized} images exceed 500KB`,
      action: 'Run: npm run optimize:gallery to compress images',
    });
  }

  if (auditResults.summary.duplicates > 0) {
    recs.push({
      priority: 'medium',
      category: 'Duplicates',
      issue: `${auditResults.summary.duplicates} duplicate or near-duplicate images found`,
      action: 'Review duplicates section below and remove redundant files manually',
    });
  }

  if (auditResults.summary.missingVariants > 0) {
    recs.push({
      priority: 'high',
      category: 'Missing Variants',
      issue: `${auditResults.summary.missingVariants} missing responsive image variants`,
      action: 'Run: npm run optimize:gallery to generate missing variants',
    });
  }

  if (auditResults.summary.brokenReferences > 0) {
    recs.push({
      priority: 'critical',
      category: 'Broken References',
      issue: `${auditResults.summary.brokenReferences} images referenced in gallery but missing from disk`,
      action: 'Check ParallaxScrollDemo.tsx and remove/fix broken paths',
    });
  }

  auditResults.recommendations = recs;
}

/**
 * Write JSON report
 */
async function writeJSONReport() {
  const reportPath = path.join(__dirname, '..', 'gallery-audit-report.json');
  await fs.writeFile(reportPath, JSON.stringify(auditResults, null, 2));
  return reportPath;
}

/**
 * Write Markdown report
 */
async function writeMarkdownReport() {
  const reportPath = path.join(__dirname, '..', 'GALLERY_AUDIT_REPORT.md');

  let md = `# Gallery Image Audit Report\n\n`;
  md += `**Generated:** ${new Date(auditResults.timestamp).toLocaleString()}\n\n`;

  md += `## Executive Summary\n\n`;
  md += `| Metric | Count |\n`;
  md += `|--------|-------|\n`;
  md += `| Total Images | ${auditResults.summary.totalImages} |\n`;
  md += `| ✅ Web-Optimized | ${auditResults.summary.webOptimized} |\n`;
  md += `| ⚠️ Needs Optimization | ${auditResults.summary.needsOptimization} |\n`;
  md += `| 🚫 Non-Web Formats | ${auditResults.summary.nonWebFormats} |\n`;
  md += `| 📦 Oversized (>500KB) | ${auditResults.summary.oversized} |\n`;
  md += `| 🔄 Duplicates | ${auditResults.summary.duplicates} |\n`;
  md += `| 🔗 Broken References | ${auditResults.summary.brokenReferences} |\n`;
  md += `| 📸 Missing Variants | ${auditResults.summary.missingVariants} |\n\n`;

  // Recommendations
  if (auditResults.recommendations.length > 0) {
    md += `## 🎯 Recommendations\n\n`;
    for (const rec of auditResults.recommendations) {
      const emoji = rec.priority === 'critical' ? '🔴' : rec.priority === 'high' ? '🟠' : '🟡';
      md += `### ${emoji} ${rec.category} (${rec.priority.toUpperCase()})\n\n`;
      md += `**Issue:** ${rec.issue}\n\n`;
      md += `**Action:** ${rec.action}\n\n`;
    }
  }

  // Duplicates
  if (auditResults.duplicates.length > 0) {
    md += `## 🔄 Duplicate Images\n\n`;
    md += `Found ${auditResults.duplicates.length} potential duplicates:\n\n`;

    for (const dup of auditResults.duplicates.slice(0, 20)) {
      md += `### ${dup.type === 'exact' ? '🎯 Exact' : '👁️ Visual'} Duplicate\n\n`;
      md += `- **Original:** \`${dup.original}\`\n`;
      md += `- **Duplicate:** \`${dup.duplicate}\`\n`;
      if (dup.similarity) md += `- **Similarity:** ${dup.similarity}\n`;
      md += `- **Reason:** ${dup.reason}\n`;
      md += `- **Recommendation:** ${dup.recommendation}\n\n`;
    }

    if (auditResults.duplicates.length > 20) {
      md += `\n*... and ${auditResults.duplicates.length - 20} more (see JSON report for full list)*\n\n`;
    }
  }

  // Gallery Integration Issues
  if (auditResults.galleryIntegration.missingFiles.length > 0) {
    md += `## 🔗 Broken Gallery References\n\n`;
    for (const missing of auditResults.galleryIntegration.missingFiles) {
      md += `- ❌ \`${missing.basePath}\` → Missing: \`${missing.missing}\`\n`;
    }
    md += `\n`;
  }

  // Missing Variants
  if (auditResults.galleryIntegration.missingVariants.length > 0) {
    md += `## 📸 Missing Responsive Variants\n\n`;
    const grouped = {};
    for (const mv of auditResults.galleryIntegration.missingVariants) {
      if (!grouped[mv.basePath]) grouped[mv.basePath] = [];
      grouped[mv.basePath].push(mv);
    }

    for (const [basePath, variants] of Object.entries(grouped)) {
      md += `### \`${basePath}\`\n\n`;
      for (const v of variants) {
        const missing = [];
        if (v.missingWebP) missing.push(`${v.width}w.webp`);
        if (v.missingJPG) missing.push(`${v.width}w.jpg`);
        md += `- Missing: ${missing.join(', ')}\n`;
      }
      md += `\n`;
    }
  }

  // Non-web formats
  const nonWebImages = auditResults.images.filter((img) => NON_WEB_FORMATS.includes(img.format));
  if (nonWebImages.length > 0) {
    md += `## 🚫 Non-Web Format Images\n\n`;
    md += `These images need conversion to WebP/JPG:\n\n`;
    for (const img of nonWebImages.slice(0, 15)) {
      md += `- \`${img.path}\` (${img.format.toUpperCase()}, ${img.sizeKB}KB)\n`;
    }
    if (nonWebImages.length > 15) {
      md += `\n*... and ${nonWebImages.length - 15} more*\n`;
    }
    md += `\n`;
  }

  // Oversized images
  const oversizedImages = auditResults.images.filter((img) => img.size > MAX_FILE_SIZE);
  if (oversizedImages.length > 0) {
    md += `## 📦 Oversized Images (>500KB)\n\n`;
    oversizedImages.sort((a, b) => b.size - a.size);
    for (const img of oversizedImages.slice(0, 15)) {
      md += `- \`${img.path}\` (**${img.sizeKB}KB**, ${img.width}×${img.height})\n`;
    }
    if (oversizedImages.length > 15) {
      md += `\n*... and ${oversizedImages.length - 15} more*\n`;
    }
    md += `\n`;
  }

  md += `---\n\n`;
  md += `**Full details:** See \`gallery-audit-report.json\`\n`;

  await fs.writeFile(reportPath, md);
  return reportPath;
}

/**
 * Main execution
 */
async function main() {
  console.log('🔍 Gallery Image Audit & Duplicate Detection');
  console.log('='.repeat(60));
  console.log('');

  // Phase 1: Scan and analyze all images
  console.log('📂 Phase 1: Scanning /public for images...');
  const allImages = await scanDirectory(PUBLIC_DIR);
  auditResults.summary.totalImages = allImages.length;
  console.log(`   Found ${allImages.length} image files\n`);

  console.log('🔬 Analyzing images...');
  for (let i = 0; i < allImages.length; i++) {
    if (ARGS.verbose || i % 10 === 0) {
      process.stdout.write(`   Progress: ${i + 1}/${allImages.length}\r`);
    }
    const analysis = await analyzeImage(allImages[i]);
    auditResults.images.push(analysis);
  }
  console.log(`   ✅ Analyzed ${allImages.length} images\n`);

  // Phase 2: Detect duplicates
  console.log('🔄 Phase 2: Detecting duplicates...');
  auditResults.duplicates = detectDuplicates(auditResults.images);
  console.log(`   Found ${auditResults.duplicates.length} potential duplicates\n`);

  // Phase 3: Check gallery integration
  console.log('🔗 Phase 3: Checking gallery integration...');
  await checkGalleryIntegration(auditResults.images);
  console.log(
    `   Checked ${auditResults.galleryIntegration.referencedImages.length} gallery references\n`,
  );

  // Generate recommendations
  generateRecommendations();

  // Write reports
  console.log('📝 Writing reports...');
  const jsonPath = await writeJSONReport();
  console.log(`   ✅ JSON: ${path.basename(jsonPath)}`);

  if (!ARGS.jsonOnly) {
    const mdPath = await writeMarkdownReport();
    console.log(`   ✅ Markdown: ${path.basename(mdPath)}`);
  }

  console.log('');
  console.log('='.repeat(60));
  console.log('📊 AUDIT SUMMARY');
  console.log('='.repeat(60));
  console.log(`Total Images:        ${auditResults.summary.totalImages}`);
  console.log(`✅ Web-Optimized:    ${auditResults.summary.webOptimized}`);
  console.log(`⚠️  Needs Work:       ${auditResults.summary.needsOptimization}`);
  console.log(`🚫 Non-Web Formats:  ${auditResults.summary.nonWebFormats}`);
  console.log(`📦 Oversized:        ${auditResults.summary.oversized}`);
  console.log(`🔄 Duplicates:       ${auditResults.summary.duplicates}`);
  console.log(`🔗 Broken Refs:      ${auditResults.summary.brokenReferences}`);
  console.log(`📸 Missing Variants: ${auditResults.summary.missingVariants}`);
  console.log('');

  if (auditResults.recommendations.length > 0) {
    console.log('🎯 TOP RECOMMENDATIONS:');
    for (const rec of auditResults.recommendations.slice(0, 3)) {
      console.log(`   ${rec.priority.toUpperCase()}: ${rec.action}`);
    }
    console.log('');
  }

  console.log(`📄 Full report: GALLERY_AUDIT_REPORT.md`);
  console.log('');

  // Exit code based on critical issues
  if (auditResults.summary.brokenReferences > 0) {
    console.error('❌ CRITICAL: Broken gallery references found!');
    process.exit(1);
  }
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
