/**
 * COLOR TOKENS
 *
 * Defines all color values as CSS variables and provides
 * TypeScript types for type safety.
 */

// Base colors from design tokens
const colors = {
  // Brand colors
  brand: {
    primary: {
      DEFAULT: 'var(--color-brand-primary, #ee7868)',
      hover: 'var(--color-brand-primary-hover, #f08b7d)', // Hover state
      active: 'var(--color-brand-primary-active, #cc4800)', // Active state
      subtle: 'var(--color-brand-primary-subtle, rgba(238, 120, 104, 0.1))',
    },
    charcoal: {
      DEFAULT: 'var(--color-brand-charcoal, #003141)',
      light: 'var(--color-brand-charcoal-light, #0a4f60)',
      dark: 'var(--color-brand-charcoal-dark, #002635)',
    },
  },

  // Neutral colors
  neutral: {
    0: 'var(--color-neutral-0, #FFFFFF)',
    50: 'var(--color-neutral-50, #fff8ec)',
    100: 'var(--color-neutral-100, #fff2de)',
    200: 'var(--color-neutral-200, #EEEEEE)',
    300: 'var(--color-neutral-300, #E0E0E0)',
    400: 'var(--color-neutral-400, #BDBDBD)',
    500: 'var(--color-neutral-500, #9E9E9E)',
    600: 'var(--color-neutral-600, #757575)',
    700: 'var(--color-neutral-700, #616161)',
    800: 'var(--color-neutral-800, #424242)',
    900: 'var(--color-neutral-900, #212121)',
  },

  // Status colors
  status: {
    success: 'var(--color-status-success, #10B981)',
    warning: 'var(--color-status-warning, #F59E0B)',
    error: 'var(--color-status-error, #EF4444)',
    info: 'var(--color-status-info, #3B82F6)',
  },

  // Functional colors
  text: {
    primary: 'var(--color-text-primary, #222222)',
    secondary: 'var(--color-text-secondary, #4B5563)',
    disabled: 'var(--color-text-disabled, #9CA3AF)',
    inverse: 'var(--color-text-inverse, #fff8ec)',
  },

  background: {
    DEFAULT: 'var(--color-background, #FFFFFF)',
    paper: 'var(--color-background-paper, #FFFFFF)',
    dark: 'var(--color-background-dark, #111111)',
  },

  border: {
    light: 'var(--color-border-light, #E5E7EB)',
    DEFAULT: 'var(--color-border, #D1D5DB)',
    dark: 'var(--color-border-dark, #9CA3AF)',
  },
} as const;

// Generate CSS variables for colors
export const colorVariables = {
  '--color-brand-accent': colors.brand.primary.DEFAULT,
  '--color-brand-accent-hover': colors.brand.primary.hover,
  '--color-brand-accent-active': colors.brand.primary.active,
  '--color-brand-accent-subtle': colors.brand.primary.subtle,

  '--color-brand-charcoal': colors.brand.charcoal.DEFAULT,
  '--color-brand-charcoal-light': colors.brand.charcoal.light,
  '--color-brand-charcoal-dark': colors.brand.charcoal.dark,

  // Generate neutral color variables
  ...Object.entries(colors.neutral).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [`--color-neutral-${key}`]: value.replace(/var\(--color-neutral-\w+, (.*?)\)/, '$1'),
    }),
    {},
  ),

  // Status colors
  '--color-status-success': colors.status.success,
  '--color-status-warning': colors.status.warning,
  '--color-status-error': colors.status.error,
  '--color-status-info': colors.status.info,

  // Text colors
  '--color-text-primary': colors.text.primary,
  '--color-text-secondary': colors.text.secondary,
  '--color-text-disabled': colors.text.disabled,
  '--color-text-inverse': colors.text.inverse,

  // Background colors
  '--color-background': colors.background.DEFAULT,
  '--color-background-paper': colors.background.paper,
  '--color-background-dark': colors.background.dark,

  // Border colors
  '--color-border-light': colors.border.light,
  '--color-border': colors.border.DEFAULT,
  '--color-border-dark': colors.border.dark,
};

// Export the color object with TypeScript types
export type ColorPalette = typeof colors;
export type ColorToken = keyof typeof colors | (string & {}); // Allow string literals while maintaining type safety

export default colors;
