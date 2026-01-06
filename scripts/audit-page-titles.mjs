#!/usr/bin/env node

/**
 * PAGE TITLE TYPOGRAPHY AUDIT
 * ============================
 * Analyzes all page titles (H1 headings) across the website
 * and compares them against the home page baseline.
 *
 * Generates:
 * - Typography specification document
 * - Cross-page inconsistency report
 * - Unified CSS recommendations
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// Pages to audit
const PAGES_TO_AUDIT = [
  { name: 'Home', path: 'src/pages/HomePage.tsx', route: '/' },
  { name: 'Services', path: 'src/pages/ServicesPage.tsx', route: '/leistungen' },
  { name: 'Menu', path: 'src/pages/MenuPage.tsx', route: '/cocktailkarte' },
  { name: 'Gallery', path: 'src/pages/GalleryPage.tsx', route: '/galerie' },
  { name: 'About', path: 'src/pages/AboutPage.tsx', route: '/uber-uns' },
  { name: 'Contact', path: 'src/pages/ContactPage.tsx', route: '/kontakt' },
  { name: 'FAQ', path: 'src/pages/FAQPage.tsx', route: '/faq' },
  { name: 'Pricing', path: 'src/pages/PricingPage.tsx', route: '/preise' },
  { name: 'Booking Munich', path: 'src/pages/BuchungMucPage.tsx', route: '/anfrage' },
];

// Breakpoints to test
const BREAKPOINTS = [
  { name: 'iPhone SE', width: 375, category: 'mobile' },
  { name: 'iPhone 12/13', width: 390, category: 'mobile' },
  { name: 'iPhone 14 Pro Max', width: 430, category: 'mobile' },
  { name: 'iPad Mini', width: 768, category: 'tablet' },
  { name: 'iPad Pro', width: 1024, category: 'tablet' },
  { name: 'Desktop Small', width: 1280, category: 'desktop' },
  { name: 'Desktop Large', width: 1920, category: 'desktop' },
];

// Extract H1 title information from a page file
function extractTitleInfo(filePath) {
  try {
    const content = fs.readFileSync(path.join(projectRoot, filePath), 'utf-8');

    // Find H1 elements
    const h1Regex = /<h1[^>]*>([\s\S]*?)<\/h1>/gi;
    const h1Matches = [...content.matchAll(h1Regex)];

    if (h1Matches.length === 0) {
      return { found: false, count: 0 };
    }

    const titles = h1Matches.map((match) => {
      const fullTag = match[0];
      const innerText = match[1];

      // Extract className
      const classMatch = fullTag.match(/className=['"]([^'"]+)['"]/);
      const className = classMatch ? classMatch[1] : '';

      // Extract inline styles
      const styleMatch = fullTag.match(/style=\{?\{([^}]+)\}\}?/);
      const inlineStyles = styleMatch ? styleMatch[1] : '';

      // Check for CSS variables
      const cssVars = [];
      const varMatches = [...inlineStyles.matchAll(/var\(--([^)]+)\)/g)];
      varMatches.forEach((m) => cssVars.push(m[1]));

      return {
        text: innerText
          .trim()
          .replace(/<[^>]+>/g, '')
          .substring(0, 100),
        className,
        inlineStyles: inlineStyles.trim(),
        cssVariables: cssVars,
        fullTag: fullTag.substring(0, 200),
      };
    });

    return {
      found: true,
      count: h1Matches.length,
      titles,
    };
  } catch (error) {
    return { found: false, error: error.message };
  }
}

// Analyze CSS files for title-related styles
function analyzeCSSFiles() {
  const cssFiles = [
    'src/styles/design-tokens.css',
    'src/styles/typography.css',
    'src/styles/hero.css',
  ];

  const cssAnalysis = {};

  cssFiles.forEach((file) => {
    try {
      const content = fs.readFileSync(path.join(projectRoot, file), 'utf-8');

      // Extract relevant CSS variables
      const variables = {};
      const varRegex = /--([a-z-]+):\s*([^;]+);/gi;
      const matches = [...content.matchAll(varRegex)];

      matches.forEach((match) => {
        const varName = match[1];
        const varValue = match[2].trim();

        // Filter for typography-related variables
        if (
          varName.includes('font') ||
          varName.includes('heading') ||
          varName.includes('line-height') ||
          varName.includes('letter-spacing') ||
          varName.includes('tracking') ||
          varName.includes('hero')
        ) {
          variables[varName] = varValue;
        }
      });

      cssAnalysis[file] = {
        variableCount: Object.keys(variables).length,
        variables,
      };
    } catch (error) {
      cssAnalysis[file] = { error: error.message };
    }
  });

  return cssAnalysis;
}

// Calculate expected font sizes at different breakpoints
function calculateResponsiveSizes(cssVars) {
  const sizes = {};

  // Extract clamp values for heading-xl-size
  const headingXL = cssVars['heading-xl-size'] || 'clamp(2rem, 1.5rem + 2vw, 4rem)';

  // Parse clamp(min, preferred, max)
  const clampMatch = headingXL.match(/clamp\(([^,]+),\s*([^,]+),\s*([^)]+)\)/);

  if (clampMatch) {
    const min = clampMatch[1].trim();
    const preferred = clampMatch[2].trim();
    const max = clampMatch[3].trim();

    sizes.mobile = min;
    sizes.tablet = preferred;
    sizes.desktop = max;
    sizes.formula = headingXL;
  } else {
    sizes.static = headingXL;
  }

  return sizes;
}

// Generate the audit report
function generateReport() {
  console.log('🔍 PAGE TITLE TYPOGRAPHY AUDIT');
  console.log('='.repeat(60));
  console.log('');

  // Phase 1: Analyze CSS system
  console.log('📐 Phase 1: Analyzing CSS Typography System...');
  const cssAnalysis = analyzeCSSFiles();

  const allVars = {};
  Object.values(cssAnalysis).forEach((file) => {
    if (file.variables) {
      Object.assign(allVars, file.variables);
    }
  });

  console.log(`   Found ${Object.keys(allVars).length} typography-related CSS variables`);
  console.log('');

  // Phase 2: Audit all pages
  console.log('📄 Phase 2: Auditing Page Titles...');
  const pageAudits = [];

  PAGES_TO_AUDIT.forEach((page) => {
    const titleInfo = extractTitleInfo(page.path);
    pageAudits.push({
      ...page,
      ...titleInfo,
    });

    if (titleInfo.found) {
      console.log(`   ✅ ${page.name.padEnd(20)} - ${titleInfo.count} H1(s) found`);
    } else {
      console.log(`   ❌ ${page.name.padEnd(20)} - No H1 found`);
    }
  });
  console.log('');

  // Phase 3: Identify inconsistencies
  console.log('🔍 Phase 3: Identifying Inconsistencies...');

  const homePageTitle = pageAudits.find((p) => p.name === 'Home');
  const homeClasses = homePageTitle?.titles?.[0]?.className || '';
  const homeVars = homePageTitle?.titles?.[0]?.cssVariables || [];

  const inconsistencies = [];

  pageAudits.forEach((page) => {
    if (!page.found || page.name === 'Home') return;

    page.titles?.forEach((title, idx) => {
      const issues = [];

      // Check class consistency
      if (title.className !== homeClasses) {
        issues.push({
          type: 'className',
          expected: homeClasses,
          actual: title.className,
        });
      }

      // Check CSS variable usage
      const missingVars = homeVars.filter((v) => !title.cssVariables.includes(v));
      if (missingVars.length > 0) {
        issues.push({
          type: 'cssVariables',
          missing: missingVars,
        });
      }

      if (issues.length > 0) {
        inconsistencies.push({
          page: page.name,
          route: page.route,
          titleIndex: idx,
          titleText: title.text,
          issues,
        });
      }
    });
  });

  console.log(`   Found ${inconsistencies.length} inconsistencies`);
  console.log('');

  // Generate reports
  const report = {
    generatedAt: new Date().toISOString(),
    summary: {
      totalPages: PAGES_TO_AUDIT.length,
      pagesWithH1: pageAudits.filter((p) => p.found).length,
      pagesWithoutH1: pageAudits.filter((p) => !p.found).length,
      totalInconsistencies: inconsistencies.length,
    },
    baseline: {
      page: 'Home',
      route: '/',
      className: homeClasses,
      cssVariables: homeVars,
      inlineStyles: homePageTitle?.titles?.[0]?.inlineStyles || '',
    },
    cssSystem: {
      files: Object.keys(cssAnalysis),
      totalVariables: Object.keys(allVars).length,
      keyVariables: {
        'heading-xl-size': allVars['heading-xl-size'],
        'heading-l-size': allVars['heading-l-size'],
        'heading-m-size': allVars['heading-m-size'],
        'heading-s-size': allVars['heading-s-size'],
        'line-height-tight': allVars['line-height-tight'],
        'tracking-tight': allVars['tracking-tight'],
        'font-weight-bold': allVars['font-weight-bold'],
      },
    },
    responsiveSizes: calculateResponsiveSizes(allVars),
    breakpoints: BREAKPOINTS,
    pages: pageAudits,
    inconsistencies,
    recommendations: generateRecommendations(inconsistencies, allVars),
  };

  // Write JSON report
  const jsonPath = path.join(projectRoot, 'page-titles-audit.json');
  fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2));
  console.log(`✅ JSON Report: page-titles-audit.json`);

  // Write Markdown report
  const mdPath = path.join(projectRoot, 'PAGE_TITLES_AUDIT.md');
  fs.writeFileSync(mdPath, generateMarkdownReport(report));
  console.log(`✅ Markdown Report: PAGE_TITLES_AUDIT.md`);

  console.log('');
  console.log('='.repeat(60));
  console.log('📊 AUDIT SUMMARY');
  console.log('='.repeat(60));
  console.log(`Total Pages Audited:     ${report.summary.totalPages}`);
  console.log(`Pages with H1:           ${report.summary.pagesWithH1}`);
  console.log(`Pages without H1:        ${report.summary.pagesWithoutH1}`);
  console.log(`Inconsistencies Found:   ${report.summary.totalInconsistencies}`);
  console.log('');

  if (inconsistencies.length > 0) {
    console.log('⚠️  ACTION REQUIRED: Review PAGE_TITLES_AUDIT.md for details');
  } else {
    console.log('✅ All page titles are consistent with home page baseline!');
  }

  return report;
}

// Generate recommendations
function generateRecommendations(inconsistencies, cssVars) {
  const recommendations = [];

  if (inconsistencies.length === 0) {
    recommendations.push({
      priority: 'LOW',
      action: 'No immediate action required - titles are consistent',
    });
    return recommendations;
  }

  // Check for missing CSS variables
  const pagesWithMissingVars = inconsistencies.filter((i) =>
    i.issues.some((issue) => issue.type === 'cssVariables'),
  );

  if (pagesWithMissingVars.length > 0) {
    recommendations.push({
      priority: 'HIGH',
      action: 'Add missing CSS variables to page titles',
      pages: pagesWithMissingVars.map((p) => p.page),
      details:
        'Use inline styles with var(--font-size-hero-title), var(--letter-spacing-tight), var(--line-height-tight)',
    });
  }

  // Check for className inconsistencies
  const pagesWithWrongClass = inconsistencies.filter((i) =>
    i.issues.some((issue) => issue.type === 'className'),
  );

  if (pagesWithWrongClass.length > 0) {
    recommendations.push({
      priority: 'HIGH',
      action: 'Standardize className across all page titles',
      pages: pagesWithWrongClass.map((p) => p.page),
      details:
        'Use className="home-hero-title text-accent font-bold" or create unified .page-title class',
    });
  }

  // Recommend creating unified CSS
  recommendations.push({
    priority: 'MEDIUM',
    action: 'Create unified .page-title CSS class',
    details: 'Define --font-size-hero-title and other missing variables in design-tokens.css',
  });

  return recommendations;
}

// Generate Markdown report
function generateMarkdownReport(report) {
  let md = `# Page Title Typography Audit Report\n\n`;
  md += `**Generated:** ${new Date(report.generatedAt).toLocaleString()}\n\n`;
  md += `---\n\n`;

  // Executive Summary
  md += `## Executive Summary\n\n`;
  md += `| Metric | Count |\n`;
  md += `|--------|-------|\n`;
  md += `| Total Pages Audited | ${report.summary.totalPages} |\n`;
  md += `| Pages with H1 | ${report.summary.pagesWithH1} |\n`;
  md += `| Pages without H1 | ${report.summary.pagesWithoutH1} |\n`;
  md += `| Inconsistencies Found | ${report.summary.totalInconsistencies} |\n\n`;

  // Baseline (Home Page)
  md += `## 📐 Baseline: Home Page Typography\n\n`;
  md += `The home page serves as the golden standard for all page titles.\n\n`;
  md += `**Route:** \`${report.baseline.route}\`\n\n`;
  md += `**HTML Structure:**\n\`\`\`tsx\n`;
  md += `<h1 className="${report.baseline.className}"\n`;
  md += `    style={{\n`;
  md += `      ${report.baseline.inlineStyles.replace(/,/g, ',\n      ')}\n`;
  md += `    }}>\n`;
  md += `  Mobile Cocktailbar für Events\n`;
  md += `</h1>\n\`\`\`\n\n`;

  md += `**CSS Variables Used:**\n`;
  report.baseline.cssVariables.forEach((v) => {
    md += `- \`--${v}\`: ${report.cssSystem.keyVariables[v] || 'undefined'}\n`;
  });
  md += `\n`;

  // Responsive Sizing
  md += `## 📱 Responsive Typography Scale\n\n`;
  md += `**Formula:** \`${report.responsiveSizes.formula || report.responsiveSizes.static}\`\n\n`;
  md += `| Breakpoint | Width | Expected Font Size |\n`;
  md += `|------------|-------|--------------------|\n`;

  report.breakpoints.forEach((bp) => {
    let size = 'Calculated';
    if (bp.category === 'mobile') size = report.responsiveSizes.mobile || '2rem';
    if (bp.category === 'tablet') size = 'Fluid (viewport-based)';
    if (bp.category === 'desktop') size = report.responsiveSizes.desktop || '4rem';

    md += `| ${bp.name} | ${bp.width}px | ${size} |\n`;
  });
  md += `\n`;

  // Page-by-Page Analysis
  md += `## 📄 Page-by-Page Analysis\n\n`;

  report.pages.forEach((page) => {
    md += `### ${page.name} (\`${page.route}\`)\n\n`;

    if (!page.found) {
      md += `❌ **No H1 found** - This page needs a title heading.\n\n`;
      return;
    }

    if (page.count > 1) {
      md += `⚠️  **Multiple H1s found (${page.count})** - Should have only ONE H1 per page.\n\n`;
    }

    page.titles?.forEach((title, idx) => {
      md += `**Title ${idx + 1}:** "${title.text}"\n\n`;
      md += `- **className:** \`${title.className || 'none'}\`\n`;
      md += `- **CSS Variables:** ${title.cssVariables.length > 0 ? title.cssVariables.map((v) => `\`--${v}\``).join(', ') : 'none'}\n`;

      // Check consistency
      const pageInconsistencies = report.inconsistencies.filter(
        (i) => i.page === page.name && i.titleIndex === idx,
      );

      if (pageInconsistencies.length > 0) {
        md += `\n**⚠️  Issues Found:**\n`;
        pageInconsistencies.forEach((inc) => {
          inc.issues.forEach((issue) => {
            if (issue.type === 'className') {
              md += `- ❌ className mismatch: Expected \`${issue.expected}\`, got \`${issue.actual}\`\n`;
            }
            if (issue.type === 'cssVariables') {
              md += `- ❌ Missing CSS variables: ${issue.missing.map((v) => `\`--${v}\``).join(', ')}\n`;
            }
          });
        });
      } else {
        md += `\n✅ **Consistent with baseline**\n`;
      }

      md += `\n`;
    });
  });

  // Inconsistencies Summary
  if (report.inconsistencies.length > 0) {
    md += `## 🚨 Inconsistencies Summary\n\n`;
    md += `Found ${report.inconsistencies.length} inconsistencies across ${new Set(report.inconsistencies.map((i) => i.page)).size} pages.\n\n`;

    md += `| Page | Route | Issue |\n`;
    md += `|------|-------|-------|\n`;

    report.inconsistencies.forEach((inc) => {
      const issueDesc = inc.issues.map((i) => i.type).join(', ');
      md += `| ${inc.page} | \`${inc.route}\` | ${issueDesc} |\n`;
    });
    md += `\n`;
  }

  // Recommendations
  md += `## 🎯 Recommendations\n\n`;

  report.recommendations.forEach((rec, idx) => {
    const icon = rec.priority === 'HIGH' ? '🔴' : rec.priority === 'MEDIUM' ? '🟡' : '🟢';
    md += `### ${icon} ${rec.priority}: ${rec.action}\n\n`;

    if (rec.pages) {
      md += `**Affected Pages:** ${rec.pages.join(', ')}\n\n`;
    }

    if (rec.details) {
      md += `**Details:** ${rec.details}\n\n`;
    }
  });

  // Implementation Guide
  md += `## 🛠️ Implementation Guide\n\n`;
  md += `### Step 1: Define Missing CSS Variables\n\n`;
  md += `Add to \`src/styles/design-tokens.css\`:\n\n`;
  md += `\`\`\`css\n`;
  md += `:root {\n`;
  md += `  /* Hero Title Typography */\n`;
  md += `  --font-size-hero-title: var(--heading-xl-size);\n`;
  md += `  --letter-spacing-tight: var(--tracking-tight);\n`;
  md += `  /* Already defined: --line-height-tight, --font-weight-bold */\n`;
  md += `}\n`;
  md += `\`\`\`\n\n`;

  md += `### Step 2: Create Unified Page Title Class\n\n`;
  md += `Add to \`src/styles/typography.css\`:\n\n`;
  md += `\`\`\`css\n`;
  md += `.page-title {\n`;
  md += `  font-size: var(--heading-xl-size);\n`;
  md += `  font-weight: var(--font-weight-bold);\n`;
  md += `  line-height: var(--line-height-tight);\n`;
  md += `  letter-spacing: var(--tracking-tight);\n`;
  md += `  color: var(--color-accent-primary);\n`;
  md += `  margin-bottom: var(--hero-heading-margin, 1.5rem);\n`;
  md += `  text-wrap: balance;\n`;
  md += `}\n\n`;
  md += `@media (max-width: 767px) {\n`;
  md += `  .page-title {\n`;
  md += `    white-space: normal;\n`;
  md += `    hyphens: auto;\n`;
  md += `    word-break: break-word;\n`;
  md += `  }\n`;
  md += `}\n`;
  md += `\`\`\`\n\n`;

  md += `### Step 3: Update All Page Titles\n\n`;
  md += `Replace inconsistent H1 elements with:\n\n`;
  md += `\`\`\`tsx\n`;
  md += `<h1 className="page-title">\n`;
  md += `  Your Page Title Here\n`;
  md += `</h1>\n`;
  md += `\`\`\`\n\n`;

  md += `### Step 4: Test Across Breakpoints\n\n`;
  md += `\`\`\`bash\n`;
  md += `# Start dev server\n`;
  md += `npm run dev\n\n`;
  md += `# Test in browser DevTools at:\n`;
  report.breakpoints.slice(0, 4).forEach((bp) => {
    md += `# - ${bp.width}px (${bp.name})\n`;
  });
  md += `\`\`\`\n\n`;

  return md;
}

// Run the audit
try {
  generateReport();
} catch (error) {
  console.error('❌ Audit failed:', error.message);
  process.exit(1);
}
