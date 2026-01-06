// Glassmorphism effects for this portfolio site
// Based on design-tokens-complete.json specifications

import { designTokens } from '../design-tokens';

// Helper function to create CSS-in-JS glassmorphism effects
export const createGlassmorphism = (
  backgroundColor: string = 'rgba(34, 34, 34, 0.7)',
  blurAmount: string = '14px',
  borderColor: string = 'rgba(107, 114, 128, 0.1)',
  borderWidth: string = '1px',
) => {
  const matteBackground = backgroundColor.includes('rgba')
    ? 'var(--surface-page)'
    : backgroundColor;
  const matteBorderColor = borderColor.includes('rgba')
    ? 'var(--color-border-on-dark)'
    : borderColor;
  void blurAmount;
  return {
    background: matteBackground,
    backdropFilter: 'none',
    WebkitBackdropFilter: 'none',
    border: `${borderWidth} solid ${matteBorderColor}`,
  };
};

// Predefined glassmorphism styles
export const glassmorphism = {
  // Navigation bar glassmorphism
  navigation: {
    ...createGlassmorphism(
      designTokens.glassmorphism.navigation.default.background,
      '14px',
      designTokens.colors.semantic.borders.navigation,
    ),
    boxShadow: designTokens.shadows['brand-sm'],
  },

  // Card glassmorphism
  card: {
    ...createGlassmorphism(
      designTokens.glassmorphism.card.background,
      '10px',
      designTokens.colors.semantic.borders.default,
    ),
  },

  // Hero section overlay glassmorphism
  heroOverlay: {
    ...createGlassmorphism('var(--surface-page)', '0px', 'transparent', '0px'),
  },

  // Trust badge glassmorphism
  trustBadge: {
    ...createGlassmorphism(
      'var(--surface-footer)',
      '0px',
      designTokens.colors.semantic.borders.default,
    ),
    transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    '&:hover': {
      background: 'var(--surface-footer)',
      boxShadow: designTokens.shadows['brand-sm'],
      borderColor: designTokens.colors.semantic.borders.hover,
    },
  },

  // Modal glassmorphism
  modal: {
    ...createGlassmorphism(
      designTokens.glassmorphism.modal.background,
      '20px',
      designTokens.colors.semantic.borders.hover,
    ),
    boxShadow: designTokens.shadows['brand-md'],
  },
};

// Accent glow effects
export const accentGlow = {
  subtle: {
    boxShadow: designTokens.shadows['ambient-sm'],
    transition: 'box-shadow 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  },
  standard: {
    boxShadow: designTokens.shadows['ambient-md'],
    transition: 'box-shadow 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  },
  strong: {
    boxShadow: designTokens.shadows['ambient-lg'],
    transition: 'box-shadow 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  },
  hover: {
    '&:hover': {
      boxShadow: designTokens.shadows['ambient-md'],
    },
  },
  active: {
    '&:active': {
      boxShadow: designTokens.shadows['ambient-lg'],
    },
  },
};

// Button styles
export const buttonStyles = {
  primary: {
    backgroundColor: designTokens.colors.brand.primary,
    color: designTokens.colors.brand.background,
    padding: `${designTokens.spacing[16]} ${designTokens.spacing[32]}`,
    borderRadius: designTokens.borderRadius.sm,
    fontWeight: designTokens.typography.fontWeight.semibold,
    transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    border: 'none',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: designTokens.colors.semantic.accent.hover,
      boxShadow: designTokens.shadows['brand-md'],
    },
    '&:active': {
      backgroundColor: designTokens.colors.semantic.accent.active,
      transform: 'translateY(1px)',
    },
  },

  secondary: {
    backgroundColor: 'transparent',
    color: designTokens.colors.brand.white,
    padding: `${designTokens.spacing[8]} ${designTokens.spacing[24]}`,
    borderRadius: designTokens.borderRadius.sm,
    fontWeight: designTokens.typography.fontWeight.medium,
    transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    border: `2px solid ${designTokens.colors.brand.primary}`,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'rgba(107, 114, 128, 0.1)',
      boxShadow: designTokens.shadows['brand-sm'],
    },
    '&:active': {
      backgroundColor: 'rgba(107, 114, 128, 0.2)',
      transform: 'translateY(1px)',
    },
  },
};

export default {
  glassmorphism,
  accentGlow,
  buttonStyles,
  createGlassmorphism,
};
