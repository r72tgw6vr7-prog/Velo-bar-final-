/**
 * DESIGN TOKENS - MAIN EXPORT
 *
 * Central export for all design tokens.
 * This file also provides a function to generate CSS variables.
 */

// Import variables for use in this file
import { colorVariables } from './colors';
import { spacingVariables } from './spacing';
import { typographyVariables } from './typography';
import breakpoints, { breakpointVariables } from './breakpoints';

// Export all tokens from their respective files
export { default as colors, type ColorPalette, type ColorToken } from './colors';
export { default as spacing, type SpacingScale, type SpacingValue } from './spacing';
export {
  fontFamilies,
  fontWeights,
  lineHeights,
  letterSpacing,
  fontSizes,
  type FontFamily,
  type FontWeight,
  type LineHeight,
  type LetterSpacing,
  type FontSize,
} from './typography';

export { default as breakpoints, mediaQueries } from './breakpoints';
export type { Breakpoint } from './breakpoints';

/**
 * Generates CSS variables for all design tokens.
 * This should be included in your global CSS.
 */
export function generateCSSVariables(): string {
  // Combine all variables
  const allVariables = {
    ...colorVariables,
    ...spacingVariables,
    ...typographyVariables,
    ...breakpointVariables,
  };

  // Convert to CSS string
  return Object.entries(allVariables)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join('\n');
}

/**
 * Generates a CSS reset with design tokens.
 * This should be included in your global CSS.
 */
export function generateCSSReset(): string {
  return `
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  /* Set base font size for rem units (1rem = 16px) */
  font-size: 16px;
}

body {
  font-family: var(--font-sans);
  line-height: var(--line-height-normal);
  color: var(--color-text-primary);
  background-color: var(--color-background);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Typography */
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-serif);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
  margin-bottom: var(--spacing-4);
}

/* Links */
a {
  color: var(--brand-primary);
  text-decoration: none;
  transition: color 0.2s ease-in-out;
}

a:hover {
  color: var(--brand-hover);
  text-decoration: underline;
}

/* Buttons */
button {
  font-family: inherit;
  font-size: 1rem;
  line-height: 1.5;
  cursor: pointer;
}

/* Images */
img {
  max-width: 100%;
  height: auto;
  display: block;
}

/* Utility classes */
.container {
  width: 100%;
  max-width: var(--breakpoint-xl);
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--spacing-4);
  padding-right: var(--spacing-4);
}

/* Responsive images */
.img-responsive {
  width: 100%;
  height: auto;
}

/* Accessibility */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
  `;
}

// Generate and export CSS variables as a string
export const cssVariables = generateCSSVariables();

// Generate and export CSS reset as a string
export const cssReset = generateCSSReset();
