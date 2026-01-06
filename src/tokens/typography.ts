/**
 * TYPOGRAPHY TOKENS
 *
 * Defines typography-related design tokens including:
 * - Font families
 * - Font sizes (responsive)
 * - Font weights
 * - Line heights
 * - Letter spacing
 */

// Font families
export const fontFamilies = {
  sans: [
    'Inter',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'Helvetica Neue',
    'Arial',
    'sans-serif',
  ].join(', '),

  serif: ['Playfair Display', 'Georgia', 'Times New Roman', 'serif'].join(', '),

  mono: ['Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'].join(', '),
} as const;

// Font weights
export const fontWeights = {
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
} as const;

// Line heights
export const lineHeights = {
  none: 1,
  tight: 1.1,
  snug: 1.25,
  normal: 1.5,
  relaxed: 1.625,
  loose: 2,
} as const;

// Letter spacing
export const letterSpacing = {
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0em',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em',
} as const;

// Font size definition type
type FontSizeDefinition = {
  fontSize: string;
  lineHeight: keyof typeof lineHeights;
  letterSpacing?: keyof typeof letterSpacing;
  fontWeight?: keyof typeof fontWeights;
};

// Font size configurations
const fontSizesMap = {
  // Display (for large headlines)
  'display-2xl': {
    fontSize: '4.5rem', // 72px
    lineHeight: 'tight',
    letterSpacing: 'tighter',
    fontWeight: 'bold',
  },
  'display-xl': {
    fontSize: '3.75rem', // 60px
    lineHeight: 'tight',
    letterSpacing: 'tighter',
    fontWeight: 'bold',
  },
  'display-lg': {
    fontSize: '3rem', // 48px
    lineHeight: 'tight',
    letterSpacing: 'tighter',
    fontWeight: 'bold',
  },
  'display-md': {
    fontSize: '2.25rem', // 36px
    lineHeight: 'tight',
    letterSpacing: 'tighter',
    fontWeight: 'bold',
  },
  'display-sm': {
    fontSize: '1.875rem', // 30px
    lineHeight: 'tight',
    fontWeight: 'bold',
  },

  // Text sizes
  'text-xl': {
    fontSize: '1.25rem', // 20px
    lineHeight: 'relaxed',
  },
  'text-lg': {
    fontSize: '1.125rem', // 18px
    lineHeight: 'relaxed',
  },
  'text-md': {
    fontSize: '1rem', // 16px
    lineHeight: 'normal',
  },
  'text-sm': {
    fontSize: '0.875rem', // 14px
    lineHeight: 'normal',
  },
  'text-xs': {
    fontSize: '0.75rem', // 12px
    lineHeight: 'normal',
  },
} as const;

// Export font sizes with proper typing
type FontSizes = {
  [K in keyof typeof fontSizesMap]: {
    fontSize: string;
    lineHeight: keyof typeof lineHeights;
    letterSpacing?: keyof typeof letterSpacing;
    fontWeight?: keyof typeof fontWeights;
  };
};

const fontSizes = Object.entries(fontSizesMap).reduce<FontSizes>((acc, [key, value]) => {
  const sizeDef = {
    fontSize: value.fontSize,
    lineHeight: value.lineHeight,
  };

  // Add optional properties if they exist
  if ('letterSpacing' in value) {
    (sizeDef as any).letterSpacing = value.letterSpacing;
  }
  if ('fontWeight' in value) {
    (sizeDef as any).fontWeight = value.fontWeight;
  }

  return {
    ...acc,
    [key]: sizeDef,
  };
}, {} as FontSizes);

export { fontSizes };

// Generate CSS variables for typography
export const typographyVariables = {
  // Font families
  '--font-sans': fontFamilies.sans,
  '--font-serif': fontFamilies.serif,
  '--font-mono': fontFamilies.mono,

  // Font weights
  ...Object.entries(fontWeights).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [`--font-weight-${key}`]: value,
    }),
    {},
  ),

  // Line heights
  ...Object.entries(lineHeights).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [`--line-height-${key}`]: value,
    }),
    {},
  ),

  // Letter spacing
  ...Object.entries(letterSpacing).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [`--letter-spacing-${key}`]: value,
    }),
    {},
  ),

  // Font sizes
  ...Object.entries(fontSizes).reduce((acc, [key, value]) => {
    const prefix = `--font-${key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()}`;

    return {
      ...acc,
      [`${prefix}-size`]: value.fontSize,
      [`${prefix}-weight`]: value.fontWeight
        ? `var(--font-weight-${value.fontWeight})`
        : 'var(--font-weight-normal)',
      [`${prefix}-line-height`]: `var(--line-height-${value.lineHeight})`,
      ...('letterSpacing' in value && value.letterSpacing
        ? {
            [`${prefix}-letter-spacing`]: `var(--letter-spacing-${value.letterSpacing})`,
          }
        : {}),
    };
  }, {}),
};

// Export types
export type FontFamily = keyof typeof fontFamilies;
export type FontWeight = keyof typeof fontWeights;
export type LineHeight = keyof typeof lineHeights;
export type LetterSpacing = keyof typeof letterSpacing;
export type FontSize = keyof typeof fontSizes;
