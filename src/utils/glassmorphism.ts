/**
 * Glassmorphism Utilities for this portfolio
 *
 * Provides standardized glassmorphism effects throughout the site
 * for consistent look and feel. Uses design tokens from design-tokens.ts
 *
 * Based on the visual specification requiring:
 * - Navigation: 45% → 65% opacity with 24px blur
 * - Trust Badges: 60% opacity with 10px blur
 * - Service Cards: 70% opacity with 16px blur
 * - Modal overlays: 85-90% opacity with blur
 */

/**
 * Creates a set of glassmorphism CSS properties with consistent patterns
 *
 * @param backgroundColor - RGBA background color (default: rgba(34, 34, 34, 0.7))
 * @param blurAmount - CSS blur value (default: 14px)
 * @param borderColor - RGBA border color (default: rgba(var(--orange-rgb), 0.1))
 * @param borderWidth - Border width (default: 1px)
 * @returns Object with CSS-in-JS compatible glassmorphism properties
 */
export const createGlassmorphismEffect = (
  backgroundColor: string = 'rgba(34, 34, 34, 0.7)',
  blurAmount: string = '14px',
  borderColor: string = 'rgba(var(--orange-rgb), 0.1)',
  borderWidth: string = '1px',
) => {
  const matteBackground = backgroundColor.includes('rgba')
    ? 'var(--navy-primary)'
    : backgroundColor;
  const matteBorderColor = borderColor.includes('rgba') ? 'var(--navy-light)' : borderColor;
  void blurAmount;

  return {
    background: matteBackground,
    backdropFilter: 'none',
    WebkitBackdropFilter: 'none',
    border: `${borderWidth} solid ${matteBorderColor}`,
  };
};

/**
 * Utility function to generate Tailwind CSS class strings for glassmorphism effects
 *
 * @param variant - Which glassmorphism variant to use
 * @param customBorder - Optional custom border class (default: undefined)
 * @param includeTransition - Whether to include transition effects (default: true)
 * @returns String of Tailwind CSS classes
 */
export const getGlassmorphismClasses = (
  variant: 'navigation' | 'trustBadge' | 'card' | 'modal' | 'service' | 'stats',
  customBorder?: string,
  includeTransition: boolean = true,
): string => {
  // Base classes all variants share
  const baseClasses = '';

  // Border class - either custom or default based on variant
  const borderClass = customBorder || getBorderClassForVariant(variant);

  // Transition class if enabled
  const transitionClass = includeTransition ? 'transition duration-300 ease-in-out' : '';

  // Background opacity class based on variant
  const bgClass = getBackgroundClassForVariant(variant);

  return `${bgClass} ${baseClasses} ${borderClass} ${transitionClass}`.trim();
};

/**
 * Returns the appropriate background opacity Tailwind class for each variant
 */
function getBackgroundClassForVariant(variant: string): string {
  switch (variant) {
    case 'navigation':
      return 'bg-navy';
    case 'navigation-scrolled':
      return 'bg-navy';
    case 'trustBadge':
      return 'bg-navy-dark';
    case 'card':
    case 'service':
      return 'bg-navy-light';
    case 'stats':
      return 'bg-navy-dark';
    case 'modal':
      return 'bg-navy-dark';
    default:
      return 'bg-navy-light';
  }
}

/**
 * Returns the appropriate border Tailwind class for each variant
 */
function getBorderClassForVariant(variant: string): string {
  switch (variant) {
    case 'navigation':
    case 'navigation-scrolled':
    case 'trustBadge':
      return 'border border-navy-light';
    case 'card':
    case 'service':
      return 'border border-navy-light';
    case 'stats':
      return 'border border-navy-light';
    case 'modal':
      return 'border border-navy-light';
    default:
      return 'border border-navy-light';
  }
}

/**
 * Returns the appropriate backdrop-blur Tailwind class for each variant
 */
export function getBlurClassForVariant(variant: string): string {
  void variant;
  return '';
}

/**
 * Generates React inline style object for glassmorphism effects
 * Useful when Tailwind classes aren't sufficient
 *
 * @param variant - Which glassmorphism variant to use
 * @returns React inline style object with glassmorphism effects
 */
export const getGlassmorphismStyles = (
  variant:
    | 'navigation'
    | 'navigation-scrolled'
    | 'trustBadge'
    | 'card'
    | 'service'
    | 'stats'
    | 'modal',
): React.CSSProperties => {
  switch (variant) {
    case 'navigation':
      return {
        background: 'var(--navy-primary)',
        borderBottom: '1px solid var(--navy-light)',
      };
    case 'navigation-scrolled':
      return {
        background: 'var(--navy-primary)',
        borderBottom: '1px solid var(--navy-light)',
      };
    case 'trustBadge':
      return {
        background: 'var(--navy-dark)',
        border: '1px solid var(--navy-light)',
      };
    case 'card':
    case 'service':
      return {
        background: 'var(--navy-light)',
        border: '1px solid var(--navy-light)',
      };
    case 'stats':
      return {
        background: 'var(--navy-dark)',
        border: '1px solid var(--navy-light)',
      };
    case 'modal':
      return {
        background: 'var(--navy-dark)',
        border: '1px solid var(--navy-light)',
      };
    default:
      return {
        background: 'var(--navy-light)',
        border: '1px solid var(--navy-light)',
      };
  }
};

// Predefined glow effects to combine with glassmorphism
export const brandGlowEffect = {
  subtle: {
    boxShadow: '0 0 10px rgba(107, 114, 128, 0.2)',
    transition: 'box-shadow 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  },
  standard: {
    boxShadow: '0 0 20px rgba(107, 114, 128, 0.3)',
    transition: 'box-shadow 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  },
  strong: {
    boxShadow: '0 0 30px rgba(107, 114, 128, 0.4)',
    transition: 'box-shadow 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  },
};

export const accentGlow = {
  boxShadow: '0 0 20px rgba(var(--orange-rgb), 0.3)',
};

export const glassVariants = {
  default: 'glassDefault',
  brand: 'brandGlow',
  accent: 'accentGlow',
};

export const accentGlowEffect = brandGlowEffect;

export const glassEffects = {
  default: 'glassDefault',
  brandGlow: brandGlowEffect,
  accentGlow: accentGlowEffect,
};

// Export all utilities
export default {
  createGlassmorphismEffect,
  getGlassmorphismClasses,
  getBlurClassForVariant,
  getGlassmorphismStyles,
  brandGlowEffect,
  accentGlowEffect,
};
