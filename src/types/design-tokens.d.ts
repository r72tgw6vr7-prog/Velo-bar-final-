/**
 * Type definitions for design tokens
 * 
 * This file provides TypeScript type definitions for the design tokens used throughout the project.
 * It ensures that all token references are type-safe.
 */

// Colors
export interface ColorTokens {
  background: string;
  accent: {
    primary: string;
    border: string;
  };
  white: string;
  chrome: string;
  backgroundAlpha: {
    45: string;
    60: string;
    65: string;
    70: string;
    75: string;
    85: string;
    90: string;
    25: string;
  };
  accentAlpha: {
    10: string;
    15: string;
    20: string;
    25: string;
  };
}

// Spacing
export interface SpacingTokens {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
  xxxl: number;
}

// Fonts
export interface FontTokens {
  heading: string;
  body: string;
}

// Brand Tokens
export interface BrandColorTokens {
  accent: {
    primary: string;
    hover: string;
  };
  black: {
    deep: string;
    darker: string;
  };
  chrome: {
    silver: string;
    light: string;
  };
  white: {
    base: string;
    offWhite: string;
  };
}

export interface TypographyTokens {
  fonts: {
    headline: string;
    body: string;
  };
  sizes: {
    'headline-xl': string;
    'headline-lg': string;
    'headline-md': string;
    'headline-sm': string;
    'body-lg': string;
    body: string;
    'body-sm': string;
    'body-xs': string;
  };
  lineHeight: {
    tight: string;
    normal: string;
    relaxed: string;
  };
}

export interface SpacingScaleTokens {
  '0': string;
  '2': string;
  '4': string;
  '8': string;
  '16': string;
  '24': string;
  '32': string;
  '40': string;
  '48': string;
  '64': string;
  '80': string;
  '96': string;
  '128': string;
}

export interface EffectsTokens {
  shadows: {
    'accent-glow': string;
    'accent-glow-strong': string;
    'accent-glow-subtle': string;
  };
  glassmorphism: {
    blur: string;
    opacity: string;
  };
}

export interface ZIndexTokens {
  background: number;
  default: number;
  overlay: number;
  dropdown: number;
  navigation: number;
  modal: number;
  tooltip: number;
}

export interface AnimationTokens {
  durations: {
    fast: string;
    normal: string;
    slow: string;
    verySlow: string;
  };
  timingFunctions: {
    default: string;
    smooth: string;
    bounce: string;
  };
}

export interface BorderRadiusTokens {
  none: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  round: string;
}

// Unified Brand Tokens
export interface BrandTokens {
  colors: BrandColorTokens;
  typography: TypographyTokens;
  spacing: SpacingScaleTokens;
  effects: EffectsTokens;
  zIndex: ZIndexTokens;
  animation: AnimationTokens;
  borderRadius: BorderRadiusTokens;
}

// Complete Design System Tokens
export interface GlassmorphismToken {
  blur: string;
  opacity: string;
  background: string;
}

export interface AccessibilityTokens {
  text: {
    contrast: {
      min: number;
      enhanced: number;
    };
    sizes: {
      min: string;
      body: string;
      large: string;
    };
  };
  focus: {
    outline: string;
    outlineOffset: string;
  };
}

export interface DesignSystemTokens {
  brand: BrandTokens;
  colors: ColorTokens;
  spacing: SpacingTokens;
  fonts: FontTokens;
  glassmorphism: GlassmorphismToken;
  zIndex: ZIndexTokens;
  accessibility: AccessibilityTokens;
}

// Simplified Design Tokens for direct usage
export interface DesignTokens {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    white: string;
    accentBrand: string;
    chrome: string;
    black: string;
    neutral: {
      [key: string]: string;
    };
  };
  spacing: {
    [key: string]: string;
  };
  typography: {
    fontFamily: {
      sans: string;
      serif: string;
      mono: string;
    };
    fontSize: {
      [key: string]: string;
    };
    fontWeight: {
      [key: string]: string;
    };
    lineHeight: {
      [key: string]: string;
    };
    letterSpacing: {
      [key: string]: string;
    };
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    soft: string;
    medium: string;
    hard: string;
  };
  borders: {
    radius: {
      sm: string;
      md: string;
      lg: string;
      full: string;
    };
    width: {
      none: string;
      thin: string;
      medium: string;
      thick: string;
    };
  };
  fonts: {
    heading: string;
    body: string;
  };
  transitions: {
    fast: string;
    normal: string;
    slow: string;
  };
  zIndex: {
    [key: string]: string | number;
  };
}