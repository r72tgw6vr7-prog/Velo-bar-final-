/**
 * Color Contrast Analyzer for the Design System
 *
 * This utility analyzes the contrast ratios of color combinations
 * used in the Stargate design system to ensure they meet WCAG 2.1
 * accessibility requirements.
 */

import { designTokens } from '../../design-tokens.ts';
import { checkContrast } from './contrastChecker.ts';

// Main color combinations to analyze
const colorCombinations = [
  // Text on backgrounds
  {
    name: 'Primary text on darkest surface',
    foreground: designTokens.colors.text.primary,
    background: designTokens.colors.surface.darkest,
    usage: 'Body text on main background',
    isLargeText: false,
  },
  {
    name: 'Secondary text on darkest surface',
    foreground: designTokens.colors.text.secondary,
    background: designTokens.colors.surface.darkest,
    usage: 'Secondary body text on main background',
    isLargeText: false,
  },
  {
    name: 'Tertiary text on darkest surface',
    foreground: designTokens.colors.text.tertiary,
    background: designTokens.colors.surface.darkest,
    usage: 'Disabled text/labels on main background',
    isLargeText: false,
  },
  {
    name: 'Primary text on dark surface',
    foreground: designTokens.colors.text.primary,
    background: designTokens.colors.surface.dark,
    usage: 'Body text on cards/elevated components',
    isLargeText: false,
  },
  {
    name: 'Secondary text on dark surface',
    foreground: designTokens.colors.text.secondary,
    background: designTokens.colors.surface.dark,
    usage: 'Secondary text on cards/elevated components',
    isLargeText: false,
  },

  // Headlines
  {
    name: 'Primary text on darkest surface (headlines)',
    foreground: designTokens.colors.text.primary,
    background: designTokens.colors.surface.darkest,
    usage: 'Headlines on main background',
    isLargeText: true,
  },

  // Brand colors
  {
    name: 'Brand primary on darkest surface',
    foreground: designTokens.colors.brand.primary,
    background: designTokens.colors.surface.darkest,
    usage: 'Brand accents on main background',
    isLargeText: false,
  },
  {
    name: 'Brand primary on dark surface',
    foreground: designTokens.colors.brand.primary,
    background: designTokens.colors.surface.dark,
    usage: 'Brand accents on cards/elevated components',
    isLargeText: false,
  },
  {
    name: 'White on brand primary',
    foreground: designTokens.colors.white,
    background: designTokens.colors.brand.primary,
    usage: 'Button text on primary buttons',
    isLargeText: false,
  },

  // Links and interactive elements
  {
    name: 'Brand primary on darkest surface (links)',
    foreground: designTokens.colors.brand.primary,
    background: designTokens.colors.surface.darkest,
    usage: 'Links on main background',
    isLargeText: false,
  },
  {
    name: 'Brand hover on darkest surface',
    foreground: designTokens.colors.brand.hover,
    background: designTokens.colors.surface.darkest,
    usage: 'Link hover state on main background',
    isLargeText: false,
  },

  // Status colors
  {
    name: 'Error text on darkest surface',
    foreground: designTokens.colors.status.error,
    background: designTokens.colors.surface.darkest,
    usage: 'Error messages on main background',
    isLargeText: false,
  },
  {
    name: 'Success text on darkest surface',
    foreground: designTokens.colors.status.success,
    background: designTokens.colors.surface.darkest,
    usage: 'Success messages on main background',
    isLargeText: false,
  },
];

/**
 * Run contrast analysis on all color combinations
 * @returns {Array} Analysis results for all color combinations
 */
function analyzeContrast() {
  return colorCombinations.map((combo) => {
    const result = checkContrast(combo.foreground, combo.background, combo.isLargeText);
    return {
      ...combo,
      result,
    };
  });
}

/**
 * Find problematic color combinations that fail accessibility standards
 * @returns {Array} Color combinations that fail WCAG AA standards
 */
function findProblematicCombinations() {
  const results = analyzeContrast();
  return results.filter((item) => !item.result.aa.passes);
}

/**
 * Generate a comprehensive accessibility report
 * @returns {Object} Report with overall status and detailed results
 */
function generateAccessibilityReport() {
  const results = analyzeContrast();
  const problematic = results.filter((item) => !item.result.aa.passes);

  // Calculate statistics
  const totalCombinations = results.length;
  const passingAA = results.filter((item) => item.result.aa.passes).length;
  const passingAAA = results.filter((item) => item.result.aaa.passes).length;

  return {
    timestamp: new Date().toISOString(),
    overallStatus: problematic.length === 0 ? 'PASS' : 'FAIL',
    statistics: {
      totalCombinations,
      passingAA,
      passingAAA,
      passingAAPercentage: Math.round((passingAA / totalCombinations) * 100),
      passingAAAPercentage: Math.round((passingAAA / totalCombinations) * 100),
    },
    problematicCombinations: problematic,
    allResults: results,
  };
}

// Export functions for use in other modules
export { analyzeContrast, findProblematicCombinations, generateAccessibilityReport };
