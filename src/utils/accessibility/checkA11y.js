/**
 * Command line utility to check accessibility of the design system
 *
 * This script analyzes color contrast in the design system and
 * produces a report showing which combinations pass or fail
 * WCAG 2.1 accessibility guidelines.
 */

import { generateAccessibilityReport } from './contrastAnalyzer.js';
import { designTokens } from '../../design-tokens.js';

/**
 * Format color with ANSI color codes for console output
 * @param {string} hexColor - Hex color code
 * @param {string} text - Text to display
 * @returns {string} Formatted text with ANSI colors
 */
function formatColoredText(hexColor, text) {
  // Convert hex to RGB
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Determine if color is dark or light
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  const textColor = brightness > 128 ? '\x1b[30m' : '\x1b[37m'; // Black or white text

  // Create a background color approximation
  const bgColor = `\x1b[48;2;${r};${g};${b}m`;

  return `${bgColor}${textColor}${text}\x1b[0m`; // Reset at the end
}

/**
 * Format the status with colored output
 * @param {boolean} passes - Whether the test passes
 * @returns {string} Formatted status text
 */
function formatStatus(passes) {
  return passes ? '\x1b[32mPASS\x1b[0m' : '\x1b[31mFAIL\x1b[0m';
}

/**
 * Display report in console
 */
function displayReport() {
  const report = generateAccessibilityReport();

  // Header
  console.log('\n[SCAN] \x1b[1mSTARGATE DESIGN SYSTEM ACCESSIBILITY REPORT\x1b[0m');
  console.log('====================================================');
  console.log(`Generated: ${new Date().toLocaleString()}`);
  console.log(
    `Overall Status: ${report.overallStatus === 'PASS' ? '\x1b[32mPASS\x1b[0m' : '\x1b[31mFAIL\x1b[0m'}`,
  );
  console.log('\n[STATS] \x1b[1mSTATISTICS\x1b[0m');
  console.log(`Total Combinations: ${report.statistics.totalCombinations}`);
  console.log(
    `Passing AA: ${report.statistics.passingAA} (${report.statistics.passingAAPercentage}%)`,
  );
  console.log(
    `Passing AAA: ${report.statistics.passingAAA} (${report.statistics.passingAAAPercentage}%)`,
  );

  // Problem areas
  if (report.problematicCombinations.length > 0) {
    console.log('\n[WARN]  \x1b[1;31mPROBLEMATIC COLOR COMBINATIONS\x1b[0m');
    report.problematicCombinations.forEach((item, index) => {
      console.log(`\n${index + 1}. ${item.name}`);
      console.log(`   Usage: ${item.usage}`);
      console.log(`   Foreground: ${item.foreground} ${formatColoredText(item.foreground, '  ')}`);
      console.log(`   Background: ${item.background} ${formatColoredText(item.background, '  ')}`);
      console.log(`   Contrast Ratio: ${item.result.ratio}`);
      console.log(
        `   AA ${item.isLargeText ? '(Large Text)' : '(Normal Text)'}: ${formatStatus(item.result.aa.passes)} (Required: ${item.result.aa.requirement})`,
      );
      console.log(
        `   AAA ${item.isLargeText ? '(Large Text)' : '(Normal Text)'}: ${formatStatus(item.result.aaa.passes)} (Required: ${item.result.aaa.requirement})`,
      );
    });
  }

  // All results
  console.log('\n📋 \x1b[1mALL COLOR COMBINATIONS\x1b[0m');
  report.allResults.forEach((item, index) => {
    console.log(`\n${index + 1}. ${item.name}`);
    console.log(`   Usage: ${item.usage}`);
    console.log(`   Contrast Ratio: ${item.result.ratio}`);
    console.log(
      `   AA ${item.isLargeText ? '(Large Text)' : '(Normal Text)'}: ${formatStatus(item.result.aa.passes)}`,
    );
    console.log(
      `   AAA ${item.isLargeText ? '(Large Text)' : '(Normal Text)'}: ${formatStatus(item.result.aaa.passes)}`,
    );
  });

  // Accessibility information in design tokens
  console.log('\n[NOTE] \x1b[1mDESIGN TOKEN ACCESSIBILITY INFORMATION\x1b[0m');
  console.log(
    `Documented Navigation Contrast: ${designTokens.accessibility.contrastRatios.navigation}:1`,
  );
  console.log(
    `Documented Large Text Contrast: ${designTokens.accessibility.contrastRatios.largeText}:1`,
  );
  console.log(
    `Documented Normal Text Contrast: ${designTokens.accessibility.contrastRatios.normalText}:1`,
  );
  console.log(
    `Documented Brand on Dark Contrast: ${designTokens.accessibility.contrastRatios.brandOnDark}:1`,
  );
  console.log(`Minimum Touch Target Size: ${designTokens.accessibility.minTouchTarget}px`);

  // Recommendations
  if (report.problematicCombinations.length > 0) {
    console.log('\n[TIP] \x1b[1mRECOMMENDATIONS\x1b[0m');
    console.log('1. Increase contrast for failing color combinations');
    console.log('2. Consider using only AA-passing combinations for normal text');
    console.log('3. Update design tokens with verified contrast ratios');
  } else {
    console.log('\n[OK] \x1b[32mAll color combinations meet WCAG AA standards\x1b[0m');
  }

  console.log('\n'); // Final spacing
}

// Run the report
displayReport();
