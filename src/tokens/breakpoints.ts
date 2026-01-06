/**
 * BREAKPOINT TOKENS
 *
 * Defines responsive breakpoints for the design system.
 * Uses a mobile-first approach with min-width media queries.
 */

// Breakpoint values in pixels
const breakpointValues = {
  // Small devices (Tailwind sm)
  sm: 640,
  // Medium devices / tablets (Tailwind md)
  md: 768,
  // Large devices / small desktops (Tailwind lg)
  lg: 1024,
  // Extra large devices (Tailwind xl)
  xl: 1280,
  // Extra extra large devices (Tailwind 2xl default)
  '2xl': 1536,
} as const;

// Convert pixel values to ems (1em = 16px)
const breakpoints = Object.entries(breakpointValues).reduce(
  (acc, [key, value]) => ({
    ...acc,
    [key]: `${value / 16}em`,
  }),
  {} as Record<keyof typeof breakpointValues, string>,
);

// Media query utilities
const mediaQueries = {
  up: (breakpoint: keyof typeof breakpoints) => `@media (min-width: ${breakpoints[breakpoint]})`,
  down: (breakpoint: keyof typeof breakpoints) => {
    // For the down breakpoint, we subtract 0.02px to avoid overlap
    const breakpointValue = breakpointValues[breakpoint];
    return `@media (max-width: ${(breakpointValue - 0.02) / 16}em)`;
  },
  between: (min: keyof typeof breakpoints, max: keyof typeof breakpoints) =>
    `@media (min-width: ${breakpoints[min]}) and (max-width: ${(breakpointValues[max] - 0.02) / 16}em)`,
};

// Generate CSS variables
const breakpointVariables = {
  '--breakpoint-sm': breakpoints.sm,
  '--breakpoint-md': breakpoints.md,
  '--breakpoint-lg': breakpoints.lg,
  '--breakpoint-xl': breakpoints.xl,
  '--breakpoint-2xl': breakpoints['2xl'],
} as const;

// Export types
export type Breakpoint = keyof typeof breakpoints;

// Export everything
export { breakpointVariables, mediaQueries };

export default breakpoints;
