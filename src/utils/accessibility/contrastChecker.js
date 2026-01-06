/**
 * WCAG Color Contrast Checker Utility
 *
 * This utility provides functions to check if color combinations meet
 * WCAG 2.1 accessibility guidelines for contrast ratios:
 * - AA requires 4.5:1 for normal text, 3:1 for large text
 * - AAA requires 7:1 for normal text, 4.5:1 for large text
 */

/**
 * Convert hex color to RGB components
 * @param {string} hex - Hex color code (e.g., #FFFFFF)
 * @returns {Object} RGB components
 */
function hexToRgb(hex) {
  // Remove # if present
  hex = hex.replace('#', '');

  // Convert 3-digit hex to 6-digit
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((char) => char + char)
      .join('');
  }

  // Parse hex values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return { r, g, b };
}

/**
 * Convert RGB color to luminance value
 * @param {Object} rgb - RGB color object
 * @returns {number} Luminance value
 */
function getLuminance({ r, g, b }) {
  // Convert RGB to sRGB
  const sR = r / 255;
  const sG = g / 255;
  const sB = b / 255;

  // Convert sRGB to luminance
  const R = sR <= 0.03928 ? sR / 12.92 : Math.pow((sR + 0.055) / 1.055, 2.4);
  const G = sG <= 0.03928 ? sG / 12.92 : Math.pow((sG + 0.055) / 1.055, 2.4);
  const B = sB <= 0.03928 ? sB / 12.92 : Math.pow((sB + 0.055) / 1.055, 2.4);

  // Calculate luminance
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

/**
 * Calculate contrast ratio between two colors
 * @param {string} color1 - First color in hex
 * @param {string} color2 - Second color in hex
 * @returns {number} Contrast ratio
 */
function getContrastRatio(color1, color2) {
  const lum1 = getLuminance(hexToRgb(color1));
  const lum2 = getLuminance(hexToRgb(color2));

  // Calculate contrast ratio
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check if a color combination passes WCAG AA contrast requirements
 * @param {string} foreground - Foreground color in hex
 * @param {string} background - Background color in hex
 * @param {boolean} isLargeText - Whether the text is large (>=18pt or bold >=14pt)
 * @returns {Object} Results including ratio and pass/fail status
 */
function passesWCAGAA(foreground, background, isLargeText = false) {
  const ratio = getContrastRatio(foreground, background);
  const threshold = isLargeText ? 3.0 : 4.5;
  return {
    ratio: ratio.toFixed(2),
    passes: ratio >= threshold,
    level: 'AA',
    requirement: `${threshold}:1`,
  };
}

/**
 * Check if a color combination passes WCAG AAA contrast requirements
 * @param {string} foreground - Foreground color in hex
 * @param {string} background - Background color in hex
 * @param {boolean} isLargeText - Whether the text is large (>=18pt or bold >=14pt)
 * @returns {Object} Results including ratio and pass/fail status
 */
function passesWCAGAAA(foreground, background, isLargeText = false) {
  const ratio = getContrastRatio(foreground, background);
  const threshold = isLargeText ? 4.5 : 7.0;
  return {
    ratio: ratio.toFixed(2),
    passes: ratio >= threshold,
    level: 'AAA',
    requirement: `${threshold}:1`,
  };
}

/**
 * Comprehensive contrast check including both AA and AAA levels
 * @param {string} foreground - Foreground color in hex
 * @param {string} background - Background color in hex
 * @param {boolean} isLargeText - Whether the text is large (>=18pt or bold >=14pt)
 * @returns {Object} Results for both AA and AAA levels
 */
function checkContrast(foreground, background, isLargeText = false) {
  return {
    foreground,
    background,
    isLargeText,
    aa: passesWCAGAA(foreground, background, isLargeText),
    aaa: passesWCAGAAA(foreground, background, isLargeText),
    ratio: getContrastRatio(foreground, background).toFixed(2),
  };
}

// Export all utility functions
export { hexToRgb, getLuminance, getContrastRatio, passesWCAGAA, passesWCAGAAA, checkContrast };
