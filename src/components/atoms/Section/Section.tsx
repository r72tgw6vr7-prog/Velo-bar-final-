/**
 * Section Component
 * ================
 * A design-system-compliant section/container component for page layout.
 *
 * Features:
 * - Automatic vertical spacing (py) on 8px grid
 * - Responsive spacing breakpoints
 * - Container width variants with consistent responsive padding
 * - Multiple background variants (transparent, brand, dark, light)
 * - Custom component rendering (as='div'/'section'/'article'/etc)
 * - ARIA support for accessibility
 * - 100% spacing compliance (8px grid)
 *
 * Container variants usage examples:
 * - none: For nested content that already manages its own width/padding or truly unconstrained blocks
 *   <Section container="none">{children}</Section>
 *
 * - full: Full-bleed visual sections (heroes, showcases, galleries) with responsive gutters
 *   <Section container="full">{children}</Section>
 *
 * - default: Readable content width (max-w-7xl) with responsive gutters
 *   <Section container="default">{children}</Section>
 *
 * - wide: Slightly wider than default for dense grids/lists
 *   <Section container="wide">{children}</Section>
 *
 * - narrow: Narrow readable column for long-form text
 *   <Section container="narrow">{children}</Section>
 */

import React from 'react';
import { cn } from '@/utils/classname';

// ============================================
// Types
// ============================================

type SectionSpacing = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
type SectionContainer = 'none' | 'default' | 'constrained' | 'wide' | 'narrow' | 'full';
type SectionBackground =
  | 'default'
  | 'transparent'
  | 'brand'
  | 'dark'
  | 'darker'
  | 'accent'
  | 'accent-subtle'
  | 'light'
  | 'glass'
  | 'glass-glow'
  | 'glass-intense';

// Support for responsive spacing
type ResponsiveValue<T> =
  | T
  | {
      mobile?: T;
      tablet?: T;
      desktop?: T;
    };

export interface SectionProps {
  /** Content of the section */
  children: React.ReactNode;

  /** Vertical spacing size (follows 8px grid) */
  spacing?: ResponsiveValue<SectionSpacing>;

  /** Container width and horizontal padding */
  container?: SectionContainer;

  /** Background style */
  background?: SectionBackground;

  /** Additional CSS classes */
  className?: string;

  /** HTML ID attribute */
  id?: string;

  /** ARIA label for accessibility */
  ariaLabel?: string;

  /** ID of element that labels this section */
  ariaLabelledBy?: string;

  /** Render as a different HTML element */
  as?: keyof JSX.IntrinsicElements;

  /** Custom inline styles (use sparingly) */
  style?: React.CSSProperties;
}

// ============================================
// Design System Tokens from our centralized design tokens
// ============================================

/**
 * Spacing values map in Tailwind units (all multiples of 8px)
 * We use our centralized design token spacing values
 */
const SPACING_VALUE_MAP: Record<SectionSpacing, string> = {
  none: '0',
  xs: '4', // 16px = 2×8
  sm: '8', // 32px = 4×8
  md: '16', // 64px = 8×8
  lg: '24', // 96px = 12×8
  xl: '32', // 128px = 16×8
  '2xl': '48', // 192px = 24×8
  '3xl': '64', // 256px = 32×8
};

/**
 * Container width variants with responsive horizontal padding
 * Using design token values for consistent spacing
 *
 * Note:
 * - 'constrained' is kept as a backwards-compatible alias of 'default' for existing usages.
 *
 * Canonical mappings:
 * - default: max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
 * - narrow: max-w-4xl mx-auto px-4 sm:px-6 lg:px-8
 * - wide: max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8
 * - full: w-full px-4 sm:px-6 lg:px-8
 */
const CONTAINER_STYLES: Record<SectionContainer, string> = {
  // none: no wrapper/constraints; see JSX below where container === 'none' returns children directly
  none: '',
  // full: full-bleed with responsive gutters
  full: 'w-full px-4 sm:px-6 lg:px-8',
  // default: readable width with gutters (max-w-7xl)
  default: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  // alias for backwards compatibility; maps to default
  constrained: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  // wide: slightly wider than default, with gutters
  wide: 'max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8',
  // narrow: tighter readable column, with gutters
  narrow: 'max-w-4xl mx-auto px-4 sm:px-6 lg:px-8',
};

/**
 * Background color variants
 * Using our centralized design token colors + glassmorphism utilities
 */
const BACKGROUND_STYLES: Record<SectionBackground, string> = {
  default: 'bg-transparent' /* allow gradient to show through */,
  transparent: 'bg-transparent',
  brand: 'bg-brand-primary',
  dark: 'bg-transparent' /* changed from bg-section-dark to allow gradient */,
  darker: 'bg-transparent' /* changed from bg-section-light to allow gradient */,
  accent: 'bg-accent-primary',
  'accent-subtle': 'bg-gradient-to-b from-accent-primary/5 to-transparent',
  light: 'bg-surface',
  // Glassmorphism variants with frosted glass effect
  glass: 'glass-surface rounded-2xl',
  'glass-glow': 'glass-surface rounded-2xl brand-glow-background',
  'glass-intense': 'glass-surface-intense rounded-2xl',
};

// ============================================
// Helper Functions
// ============================================

/**
 * Generates responsive spacing classes from spacing value
 */
const getSpacingClasses = (spacing: ResponsiveValue<SectionSpacing>): string => {
  // If spacing is a simple string value
  if (typeof spacing === 'string') {
    return `py-${SPACING_VALUE_MAP[spacing]}`;
  }

  // If spacing is responsive object
  return [
    spacing.mobile && `py-${SPACING_VALUE_MAP[spacing.mobile]}`,
    spacing.tablet && `md:py-${SPACING_VALUE_MAP[spacing.tablet]}`,
    spacing.desktop && `lg:py-${SPACING_VALUE_MAP[spacing.desktop]}`,
  ]
    .filter(Boolean)
    .join(' ');
};

// ============================================
// Main Section Component
// ============================================

export const Section: React.FC<SectionProps> = ({
  children,
  spacing = 'md',
  container = 'default',
  background = 'transparent',
  className,
  id,
  ariaLabel,
  ariaLabelledBy,
  as: Component = 'section',
  style,
}) => {
  // Compose CSS classes
  const spacingClasses = getSpacingClasses(spacing);
  const containerClass = CONTAINER_STYLES[container];
  const backgroundClass = BACKGROUND_STYLES[background];

  return (
    <Component
      id={id}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      className={cn('relative', 'w-full', backgroundClass, spacingClasses, className)}
      style={style}
    >
      {container !== 'none' ? <div className={containerClass}>{children}</div> : children}
    </Component>
  );
};

// ============================================
// Export
// ============================================

export default Section;
