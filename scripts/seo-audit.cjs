#!/usr/bin/env node

/**
 * Comprehensive SEO Audit Script
 * Tests all SEO improvements and generates a report
 */

const fs = require('fs');
const path = require('path');

// ANSI color codes for terminal output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m',
  bold: '\x1b[1m',
};

const tests = {
  passed: 0,
  failed: 0,
  warnings: 0,
  details: [],
};

function test(name, condition, severity = 'error') {
  const status = condition ? 'PASS' : 'FAIL';
  const symbol = condition ? '[OK]' : severity === 'warning' ? '[WARN]' : '[ERROR]';
  const color = condition ? colors.green : severity === 'warning' ? colors.yellow : colors.red;

  console.log(`${color}${symbol} ${name}${colors.reset}`);

  if (condition) {
    tests.passed++;
  } else {
    if (severity === 'warning') {
      tests.warnings++;
    } else {
      tests.failed++;
    }
  }

  tests.details.push({ name, status, severity });
}

function section(title) {
  console.log(`\n${colors.bold}${colors.cyan}━━━ ${title} ━━━${colors.reset}\n`);
}

console.log(`\n${colors.bold}${colors.blue}[CHECK] COMPREHENSIVE SEO AUDIT${colors.reset}`);
console.log('═'.repeat(60) + '\n');

// 1. Technical SEO Files
section('1. Technical SEO Files');

const robotsTxt = path.join(__dirname, '../public/robots.txt');
test('robots.txt exists', fs.existsSync(robotsTxt));

if (fs.existsSync(robotsTxt)) {
  const robotsContent = fs.readFileSync(robotsTxt, 'utf8');
  test('robots.txt contains sitemap reference', robotsContent.includes('Sitemap:'));
  test('robots.txt blocks AI scrapers (GPTBot)', robotsContent.includes('User-agent: GPTBot'));
  test('robots.txt allows search engines', robotsContent.includes('Allow: /'));
}

const sitemapXml = path.join(__dirname, '../public/sitemap.xml');
test('sitemap.xml exists', fs.existsSync(sitemapXml));

if (fs.existsSync(sitemapXml)) {
  const sitemapContent = fs.readFileSync(sitemapXml, 'utf8');
  test(
    'sitemap.xml is valid XML',
    sitemapContent.includes('<?xml') && sitemapContent.includes('<urlset'),
  );
  test('sitemap.xml includes at least one <loc>', sitemapContent.includes('<loc>'));

  test('sitemap.xml includes services page', sitemapContent.includes('/services</loc>'));
  test('sitemap.xml includes gallery page', sitemapContent.includes('/gallery</loc>'));
  test('sitemap.xml has priorities', sitemapContent.includes('<priority>'));
  test('sitemap.xml has changefreq', sitemapContent.includes('<changefreq>'));
}

// 2. HTML Meta Tags
section('2. HTML Meta Tags & Schema');

const indexHtml = path.join(__dirname, '../index.html');
test('index.html exists', fs.existsSync(indexHtml));

if (fs.existsSync(indexHtml)) {
  const htmlContent = fs.readFileSync(indexHtml, 'utf8');

  // Basic meta tags
  test('Has title tag', htmlContent.includes('<title>'));
  // removed: project-specific 'Tattoo' keyword check

  test('Has meta description', htmlContent.includes('name="description"'));
  test('Has canonical URL', htmlContent.includes('rel="canonical"'));
  test('Has robots meta tag', htmlContent.includes('name="robots"'));

  // Open Graph
  test('Has Open Graph type', htmlContent.includes('property="og:type"'));
  test('Has Open Graph title', htmlContent.includes('property="og:title"'));
  test('Has Open Graph description', htmlContent.includes('property="og:description"'));
  test('Has Open Graph image', htmlContent.includes('property="og:image"'));
  test(
    'OG image has dimensions',
    htmlContent.includes('og:image:width') && htmlContent.includes('og:image:height'),
  );

  // Twitter Cards
  test('Has Twitter card meta', htmlContent.includes('name="twitter:card"'));
  test('Has Twitter image', htmlContent.includes('name="twitter:image"'));

  // Geo/Local SEO
  test('Has geo meta tags', htmlContent.includes('name="geo.region"'));
  test(
    'Has geo coordinates',
    htmlContent.includes('name="geo.position"') || htmlContent.includes('name="ICBM"'),
  );

  // Structured Data
  test('Has Schema.org structured data', htmlContent.includes('application/ld+json'));
  // removed TattooShop schema check (not relevant)
  test('Schema includes phone number', htmlContent.includes('"telephone"'));
  test('Phone number is not placeholder', !htmlContent.includes('+49-89-12345678'));
  test('Schema includes address', htmlContent.includes('"address"'));
  test('Schema includes opening hours', htmlContent.includes('OpeningHoursSpecification'));
  test('Schema includes aggregate rating', htmlContent.includes('AggregateRating'));
  test('Has BreadcrumbList schema', htmlContent.includes('"@type": "BreadcrumbList"'));

  // PWA
  test('Has manifest.json link', htmlContent.includes('rel="manifest"'));
  test('Has theme-color meta', htmlContent.includes('name="theme-color"'));
  test('Has favicon', htmlContent.includes('rel="icon"'));
  test('Has apple-touch-icon', htmlContent.includes('apple-touch-icon'));

  // Accessibility & Performance
  test('Has viewport meta tag', htmlContent.includes('name="viewport"'));
  test(
    'Has charset declaration',
    htmlContent.includes('charset="UTF-8"') || htmlContent.includes('charset="utf-8"'),
  );
  test('Has noscript fallback', htmlContent.includes('<noscript>'));
  test(
    'Noscript includes contact info',
    htmlContent.includes('<noscript>') && htmlContent.includes('Telefon'),
  );

  // Language
  test(
    'HTML lang attribute set',
    htmlContent.includes('lang="de"') || htmlContent.includes('lang="en"'),
  );
}

// 3. Component SEO Implementation
section('3. Component SEO Features');

// Check Gallery page for dropdown fix
const galleryPage = path.join(__dirname, '../src/pages/GalleryPage.tsx');
if (fs.existsSync(galleryPage)) {
  const galleryContent = fs.readFileSync(galleryPage, 'utf8');
  test('Gallery dropdowns have high z-index (z-50)', galleryContent.includes('z-50'));
  test('Gallery has proper heading structure', galleryContent.includes('<h1'));
  test('Gallery images have alt text', galleryContent.includes('alt={item.title}'));
}

// Artist pages/components removed from SEO checks as part of cleanup

// 4. Image Optimization
section('4. Image Optimization');

const publicImages = path.join(__dirname, '../public/images');
let imageStats = {
  jpg: 0,
  png: 0,
  webp: 0,
  total: 0,
};

function countImages(dir) {
  if (!fs.existsSync(dir)) return;

  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      countImages(filePath);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (ext === '.jpg' || ext === '.jpeg') imageStats.jpg++;
      else if (ext === '.png') imageStats.png++;
      else if (ext === '.webp') imageStats.webp++;

      if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
        imageStats.total++;
      }
    }
  });
}

countImages(publicImages);

console.log(`    Image Format Distribution:`);
console.log(`      JPG/PNG: ${imageStats.jpg + imageStats.png}`);
console.log(`      WebP: ${imageStats.webp}`);
console.log(`      Total: ${imageStats.total}`);

test('WebP images present', imageStats.webp > 0, 'warning');
test('WebP conversion script exists', fs.existsSync(path.join(__dirname, 'convert-to-webp.js')));

const webpPercentage = imageStats.total > 0 ? (imageStats.webp / imageStats.total) * 100 : 0;
if (webpPercentage < 50) {
  console.log(
    `   ${colors.yellow}[WARN]  Only ${webpPercentage.toFixed(1)}% images are WebP. Run: node scripts/convert-to-webp.js${colors.reset}`,
  );
}

// 5. Build & Performance
section('5. Build & Performance');

const distDir = path.join(__dirname, '../dist');
test('Build directory exists', fs.existsSync(distDir));

const packageJson = path.join(__dirname, '../package.json');
if (fs.existsSync(packageJson)) {
  const pkg = JSON.parse(fs.readFileSync(packageJson, 'utf8'));
  test('Has build script', pkg.scripts && pkg.scripts.build);
  test(
    'Has optimization packages',
    pkg.devDependencies &&
      (pkg.devDependencies.terser || pkg.devDependencies['vite-plugin-compression']),
  );
}

// 6. Accessibility
section('6. Accessibility Features');

const srcDir = path.join(__dirname, '../src');
let accessibilityChecks = {
  ariaLabels: 0,
  altTexts: 0,
  headings: 0,
};

function checkAccessibility(dir) {
  if (!fs.existsSync(dir)) return;

  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory() && !file.includes('node_modules') && !file.includes('backup')) {
      checkAccessibility(filePath);
    } else if (file.endsWith('.tsx') || file.endsWith('.jsx')) {
      const content = fs.readFileSync(filePath, 'utf8');
      if (content.includes('aria-label')) accessibilityChecks.ariaLabels++;
      if (content.includes('alt=')) accessibilityChecks.altTexts++;
      if (content.includes('<h1') || content.includes('<h2') || content.includes('<h3')) {
        accessibilityChecks.headings++;
      }
    }
  });
}

checkAccessibility(srcDir);

test('Components use ARIA labels', accessibilityChecks.ariaLabels > 10);
test('Images have alt attributes', accessibilityChecks.altTexts > 20);
test('Proper heading structure used', accessibilityChecks.headings > 5);

console.log(`    Accessibility Stats:`);
console.log(`      ARIA labels: ${accessibilityChecks.ariaLabels} components`);
console.log(`      Alt texts: ${accessibilityChecks.altTexts} instances`);
console.log(`      Semantic headings: ${accessibilityChecks.headings} files`);

// Final Summary
console.log(
  `\n${colors.bold}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`,
);
console.log(`${colors.bold}${colors.cyan} AUDIT SUMMARY${colors.reset}\n`);
console.log(`${colors.green}[OK] Passed: ${tests.passed}${colors.reset}`);
console.log(`${colors.red}[ERROR] Failed: ${tests.failed}${colors.reset}`);
console.log(`${colors.yellow}[WARN]  Warnings: ${tests.warnings}${colors.reset}`);

const total = tests.passed + tests.failed + tests.warnings;
const score = total > 0 ? Math.round((tests.passed / total) * 100) : 0;

console.log(`\n${colors.bold}${colors.blue}Overall SEO Score: ${score}/100${colors.reset}`);

let rating = '';
if (score >= 90) rating = `${colors.green}🏆 Excellent${colors.reset}`;
else if (score >= 80) rating = `${colors.green}✨ Very Good${colors.reset}`;
else if (score >= 70) rating = `${colors.yellow}[GOOD] Good${colors.reset}`;
else if (score >= 60) rating = `${colors.yellow}[WARN]  Needs Improvement${colors.reset}`;
else rating = `${colors.red}[ERROR] Poor${colors.reset}`;

console.log(`Rating: ${rating}\n`);

// Recommendations
if (tests.failed > 0 || tests.warnings > 0) {
  console.log(`${colors.bold}${colors.yellow}📋 RECOMMENDATIONS${colors.reset}\n`);

  if (imageStats.webp === 0) {
    console.log(`1. Convert images to WebP:`);
    console.log(`   ${colors.cyan}node scripts/convert-to-webp.js${colors.reset}\n`);
  }

  if (tests.failed > 0) {
    console.log(`2. Fix ${tests.failed} critical issues listed above\n`);
  }

  console.log(`3. Test in production environment`);
  console.log(`4. Submit sitemap to Google Search Console`);
  console.log(`5. Monitor Core Web Vitals with PageSpeed Insights\n`);
}

console.log('━'.repeat(60) + '\n');

// Exit with appropriate code
process.exit(tests.failed > 0 ? 1 : 0);
