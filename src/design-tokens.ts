/**
 * DESIGN SYSTEM TOKENS - SINGLE SOURCE OF TRUTH
 * ============================================
 *
 * This file defines all design tokens for this portfolio project.
 * It serves as the single source of truth for the design system.
 *
 * CSS variables in Tailwind classes should reference these tokens using
 * the shorthand syntax: text-(--brand-primary) NOT text-[var(--brand-primary)]
 *
 * WCAG 2.1 AA Compliance:
 * - Text contrast: 5.8:1 (exceeds 4.5:1 requirement)
 * - Touch targets: 44×44px minimum
 * - Focus indicators: 2px primary color outline
 */

/**
 * Z-INDEX HIERARCHY - Stacking Order
 *
 * Defines the layer system for the entire application
 * Ensure components follow this stacking order
 */
export const zIndex = {
  modal: 10000, // Modals/overlays (highest)
  navigation: 9999, // Fixed navigation bar
  mobileMenu: 9998, // Mobile menu drawer
  dropdown: 1000, // Dropdowns from nav
  overlay: 500, // Semi-transparent overlays
  stickyElement: 200, // Sticky elements
  trustBadges: 100, // Trust badges/scrolling elements
  card: 50, // Card components
  content: 1, // Page content
  background: 0, // Background images
};

/**
 * GLASSMORPHISM SYSTEM
 *
 * Standardized glass effect styling for various UI components
 * Used to create depth and visual hierarchy with transparency
 */
export const glassmorphism = {
  navigation: {
    default: {
      background: '#003141', // Solid navy - matte system
      blur: 'none', // No blur - matte system
      webkitBlur: 'none', // No blur - matte system
      border: '1px solid #0a4f60',
      zIndex: zIndex.navigation,
    },
    scrolled: {
      background: '#003141', // Solid navy - matte system
      blur: 'none', // No blur - matte system
      webkitBlur: 'none', // No blur - matte system
      border: '1px solid #0a4f60',
      zIndex: zIndex.navigation,
    },
  },
  trustBadges: {
    background: '#1a2332', // Solid footer surface - matte system
    blur: 'none', // No blur - matte system
    webkitBlur: 'none', // No blur - matte system
    border: '1px solid #0a4f60',
    zIndex: zIndex.trustBadges,
  },
  serviceCards: {
    background: '#fff8ec', // Off-white brand card - matte system
    blur: 'none', // No blur - matte system
    webkitBlur: 'none', // No blur - matte system
    border: '1px solid #e5e7eb',
    zIndex: zIndex.card,
  },
  statsBar: {
    background: '#1a2332', // Solid footer surface - matte system
    blur: 'none', // No blur - matte system
    webkitBlur: 'none', // No blur - matte system
    border: '1px solid #0a4f60',
    zIndex: zIndex.content,
  },
  footer: {
    background: '#1a2332', // Solid footer surface - matte system
    blur: 'none', // No blur - matte system
    webkitBlur: 'none', // No blur - matte system
    border: '1px solid #0a4f60',
  },
  modal: {
    background: '#000000', // Solid black overlay - matte system
    blur: 'none', // No blur - matte system
    webkitBlur: 'none', // No blur - matte system
    border: '1px solid #0a4f60',
  },
  // Added for compatibility
  card: {
    background: '#fff8ec', // Off-white brand card - matte system
    blur: 'none', // No blur - matte system
    webkitBlur: 'none', // No blur - matte system
    border: '1px solid #e5e7eb',
  },
};

/**
 * BREAKPOINTS - Responsive Design System
 *
 * Standard breakpoints for responsive design
 * Use these values in media queries and responsive utilities
 */
export const breakpoints = {
  mobile: '320px', // Small phones
  mobileMax: '767px', // Phones (landscape)
  tablet: '768px', // Tablets and large phones
  tabletMax: '1199px', // Tablets (landscape)
  desktop: '1200px', // Desktop screens
  wide: '1440px', // Large desktop screens
  ultra: '1920px', // Ultra-wide screens
};

/**
 * COLOR TOKENS
 *
 * Official Velo.Bar brand colors (from brand.json)
 * Primary color palette for brand identity
 * All colors should reference these tokens for consistency
 */
export const colors = {
  // Brand colors - Official Velo.Bar identity
  // CRITICAL: Navy #003141, Coral #ee7868, Cream #fff8ec, Yellow #fab81d
  brand: {
    primary: '#003141', // Navy - main brand background
    secondary: '#fff8ec', // Cream - secondary brand color
    accent: '#ee7868', // Coral - accent color
    accentSecondary: '#fab81d', // Yellow - secondary accent
    muted: '#bbbbbb', // Gray - muted/subtle text
    background: '#003141', // Navy background (NOT black #000000)
    white: '#fff8ec', // Cream for text/icons
  },

  // Accent color variations - Coral
  accent: {
    primary: '#ee7868', // Coral - main accent
    hover: '#f08b7d', // Coral hover state
    subtle: 'rgba(238, 120, 104, 0.1)', // Subtle coral background
    rgb: '238, 120, 104', // RGB values for alpha usage
  },

  // Secondary accent variations - Yellow
  accentSecondary: {
    primary: '#fab81d',
    hover: '#f8c84d',
    subtle: 'rgba(250, 184, 29, 0.12)',
    rgb: '250, 184, 29',
  },

  // Muted gray variations
  muted: {
    primary: '#bbbbbb', // Primary muted color
    dark: '#888888', // Darker muted
    light: '#dddddd', // Lighter muted
    rgb: '187, 187, 187', // RGB values for alpha usage
  },

  // Surface colors (navy-based for UI)
  surface: {
    darkest: '#003141', // Main background - navy
    dark: '#002635', // Slightly elevated - navy dark
    medium: '#0a4f60', // Elevated cards and components - navy light
    light: '#0d5a6a', // Active/selected states
  },

  // Text colors (white on dark)
  text: {
    primary: '#fff8ec', // Body text - cream
    secondary: 'rgba(255, 248, 236, 0.8)', // Secondary text
    tertiary: 'rgba(255, 248, 236, 0.6)', // Less important text
    muted: '#bbbbbb', // Muted text
    accent: '#ee7868', // Accent text (coral)
    accentSecondary: '#fab81d',
  },

  // Legacy colors - maintaining backward compatibility
  white: '#FFFFFF',
  black: '#003141', // Mapped to navy (NOT pure black)
  background: '#003141', // Mapped to navy (NOT pure black)

  // Status colors
  status: {
    error: '#EF4444', // Error messages
    success: '#10B981', // Success indicators
    warning: '#F59E0B', // Warning messages
  },

  // Alpha variants (mapped to solid matte equivalents)
  backgroundAlpha: {
    45: '#003141', // Solid navy - matte system
    60: '#003141', // Solid navy - matte system
    65: '#003141', // Solid navy - matte system
    70: '#002635', // Solid navy dark - matte system
    75: '#002635', // Solid navy dark - matte system
    85: '#1a2332', // Solid footer surface - matte system
    90: '#000000', // Solid black - matte system
  },
  accentAlpha: {
    10: '#ee7868', // Solid coral - matte system
    15: '#ee7868', // Solid coral - matte system
    20: '#ee7868', // Solid coral - matte system
    25: '#ee7868', // Solid coral - matte system
    30: '#ee7868', // Solid coral - matte system
    40: '#ee7868', // Solid coral - matte system
  },

  // RGB variants for CSS custom properties
  rgb: {
    black: '0, 49, 65', // Navy RGB (NOT pure black)
    white: '255, 255, 255',
    accent: '238, 120, 104', // Coral RGB
    accentSecondary: '250, 184, 29',
    muted: '187, 187, 187',
    // Legacy aliases for backward compatibility
    grey: '187, 187, 187', // Maps to muted
    silver: '187, 187, 187', // Maps to muted
    surface: {
      darkest: '0, 49, 65', // Navy
      dark: '0, 38, 53', // Navy dark
      medium: '10, 79, 96', // Navy light
      light: '13, 90, 106', // Navy lighter
    },
    text: {
      primary: '255, 248, 236',
      secondary: '255, 248, 236',
      tertiary: '255, 248, 236',
    },
  },

  // Semantic colors for different UI elements
  semantic: {
    borders: {
      default: 'rgba(255, 255, 255, 0.1)',
      hover: 'rgba(255, 255, 255, 0.2)',
      active: 'rgba(238, 120, 104, 0.5)',
      accent: 'rgba(238, 120, 104, 0.3)',
      navigation: 'rgba(255, 255, 255, 0.1)', // For glassmorphism nav border
    },
    accent: {
      default: '#ee7868',
      hover: 'rgba(238, 120, 104, 0.8)',
      active: 'rgba(238, 120, 104, 0.9)',
    },
    background: {
      primary: '#003141', // Navy primary
      secondary: '#002635', // Navy dark
      tertiary: '#0a4f60', // Navy light
    },
  },
};

/**
 * SPACING TOKENS
 *
 * Based on 8px grid system for consistent spacing
 * Use these values for margins, padding, and layout spacing
 */
export const spacing = {
  // T-shirt sizing
  xs: 8, // 8px - Extra small
  sm: 16, // 16px - Small
  md: 24, // 24px - Medium
  lg: 32, // 32px - Large
  xl: 48, // 48px - Extra large
  xxl: 64, // 64px - 2x Extra large
  xxxl: 96, // 96px - 3x Extra large

  // Exact pixel values (string format for CSS)
  base: '8px', // Base grid unit
  0: '0', // Zero spacing
  2: '2px', // Micro spacing for borders
  4: '4px', // Tiny spacing
  8: '8px', // 1x base unit
  12: '16px', // mapped from 12px -> 16px (8pt grid)
  16: '16px', // 2x base unit
  20: '24px', // 2.5x base unit
  24: '24px', // 3x base unit
  32: '32px', // 4x base unit
  40: '40px', // 5x base unit
  48: '48px', // 6x base unit
  56: '56px', // 7x base unit
  64: '64px', // 8x base unit
  80: '80px', // 10x base unit
  96: '96px', // 12x base unit
  128: '128px', // 16x base unit
  160: '160px', // 20x base unit
  192: '192px', // 24x base unit

  // Responsive spacing definitions
  responsive: {
    desktop: {
      sectionPadding: '80px', // Section vertical padding
      componentGap: '32px', // Gap between major components
      cardGap: '24px', // Gap between cards
      gridGutter: '16px', // Grid gutter width
    },
    tablet: {
      sectionPadding: '40px', // Smaller section padding on tablets
      componentGap: '24px', // Smaller component gap on tablets
      cardGap: '16px', // Smaller card gap on tablets
      gridGutter: '16px', // Same grid gutter on tablets
    },
    mobile: {
      sectionPadding: '24px', // Smallest section padding on mobile
      componentGap: '16px', // Smallest component gap on mobile
      cardGap: '16px', // mapped from 12px -> 16px (8pt grid)
      gridGutter: '16px', // Same grid gutter on mobile
    },
  },
};

/**
 * TYPOGRAPHY TOKENS
 *
 * Typography system based on Source Sans Pro (similar to Velo.Bar's proxima-nova)
 * Includes font scales, weights, and line heights
 */
export const typography = {
  // Font families - Unified Velo.Bar fonts
  fonts: {
    heading: {
      family: '"Source Sans Pro", "proxima-nova", sans-serif',
      cssVariable: '--font-headline',
    },
    body: {
      family: '"Source Sans Pro", "proxima-nova", sans-serif',
      cssVariable: '--font-body',
    },
  },

  // Font size scales by device size
  scale: {
    // Desktop font sizes (>1200px)
    desktop: {
      displayXL: '72px', // Very large display text
      headlineLG: '48px', // Large headline (h1)
      headlineMD: '36px', // Medium headline (h2)
      bodyLarge: '24px', // Large body text
      bodyStandard: '20px', // Standard body text
      bodySmall: '18px', // Small body text
      label: '16px', // Form labels and UI text
      caption: '14px', // Captions and notes
    },

    // Tablet font sizes (768px-1199px)
    tablet: {
      displayXL: '56px', // Smaller display text for tablets
      headlineLG: '40px', // Smaller h1 for tablets
      headlineMD: '32px', // Smaller h2 for tablets
      bodyLarge: '24px', // Same large body text
      bodyStandard: '20px', // Same standard body text
      bodySmall: '18px', // Same small body text
    },

    // Mobile font sizes (<767px)
    mobile: {
      displayXL: '40px', // Smallest display text for mobile
      headlineLG: '32px', // Smallest h1 for mobile
      headlineMD: '24px', // Smallest h2 for mobile
      bodyLarge: '24px', // Same large body text
      bodyStandard: '16px', // Smaller standard body text for mobile
      bodySmall: '16px', // Smaller small body text for mobile
    },

    // Fluid typography (responsive to viewport)
    fluid: {
      displayXL: 'clamp(40px, 5vw, 72px)', // Responsive display text
      headlineLG: 'clamp(32px, 4vw, 48px)', // Responsive h1
      headlineMD: 'clamp(24px, 3vw, 36px)', // Responsive h2
      bodyLarge: 'clamp(20px, 2vw, 24px)', // Responsive large body
      bodyStandard: 'clamp(16px, 1.5vw, 20px)', // Responsive standard body
      bodySmall: 'clamp(14px, 1.2vw, 18px)', // Responsive small body
    },
  },

  // Line heights for different text types
  lineHeight: {
    headlines: '1.1', // Tight line height for headlines
    body: '1.4', // Standard line height for body text
    relaxed: '1.6', // More relaxed for comfortable reading
  },

  // Font weights
  fontWeight: {
    light: '300', // Light text
    normal: '400', // Regular text
    medium: '500', // Medium emphasis
    semibold: '600', // Semi-bold emphasis
    bold: '700', // Bold text
    extrabold: '800', // Extra bold for strong emphasis
    black: '900', // Black for maximum emphasis
  },

  // Letter spacing for different styles
  letterSpacing: {
    tighter: '-0.05em', // Tighter spacing (headlines)
    tight: '-0.025em', // Slightly tight
    normal: '0', // Normal spacing
    wide: '0.025em', // Slightly wide (buttons)
    wider: '0.05em', // Wider (small caps)
    widest: '0.1em', // Widest (all caps text)
  },
};

/**
 * BORDER RADIUS
 *
 * Standard border radius values for consistent UI elements
 */
export const borderRadius = {
  none: '0', // No rounded corners
  xs: '4px', // Extra small radius
  sm: '8px', // Small radius (buttons)
  md: '12px', // Medium radius (cards)
  lg: '16px', // Large radius (modals)
  xl: '24px', // Extra large radius (featured elements)
  full: '9999px', // Fully rounded (pills, badges)
};

/**
 * SHADOWS & EFFECTS
 *
 * Shadows for depth and elevation
 * Glows for emphasis and branding (orange accent)
 */
export const shadows = {
  // Elevation shadows for components
  xs: '0 1px 2px rgba(0, 0, 0, 0.05)', // Subtle depth
  sm: '0 2px 4px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)', // Light shadow
  md: '0 4px 8px rgba(0, 0, 0, 0.05), 0 2px 4px rgba(0, 0, 0, 0.1)', // Medium shadow
  lg: '0 8px 16px rgba(0, 0, 0, 0.05), 0 4px 8px rgba(0, 0, 0, 0.1)', // Large shadow
  xl: '0 16px 32px rgba(0, 0, 0, 0.05), 0 8px 16px rgba(0, 0, 0, 0.1)', // Extra large shadow
  '2xl': '0 24px 48px rgba(0, 0, 0, 0.05), 0 12px 24px rgba(0, 0, 0, 0.1)', // Double extra large

  // Branded coral accent shadows (#ee7868 = rgb(238, 120, 104))
  'accent-sm': '0 2px 4px rgba(238, 120, 104, 0.12)', // Subtle accent shadow
  'accent-md': '0 4px 8px rgba(238, 120, 104, 0.18)', // Medium accent shadow
  'accent-lg': '0 8px 16px rgba(238, 120, 104, 0.24)', // Large accent shadow
  'accent-xl': '0 16px 32px rgba(238, 120, 104, 0.28)', // Extra large accent shadow

  // Glow effects for emphasis (orange)
  'accent-glow': '0 0 24px rgba(238, 120, 104, 0.4)', // Standard accent glow
  'accent-glow-strong': '0 0 32px rgba(238, 120, 104, 0.6)', // Strong glow (call to action)
  'accent-glow-subtle': '0 0 16px rgba(238, 120, 104, 0.25)', // Subtle glow (hover states)

  // Legacy brand-* aliases for backward compatibility
  'brand-sm': '0 2px 4px rgba(238, 120, 104, 0.12)',
  'brand-md': '0 4px 8px rgba(238, 120, 104, 0.18)',
  'brand-lg': '0 8px 16px rgba(238, 120, 104, 0.24)',
  'brand-xl': '0 16px 32px rgba(238, 120, 104, 0.28)',
  'brand-glow': '0 0 24px rgba(238, 120, 104, 0.4)',
  'brand-glow-strong': '0 0 32px rgba(238, 120, 104, 0.6)',
  'brand-glow-subtle': '0 0 16px rgba(238, 120, 104, 0.25)',

  // Ambient light effects for backgrounds
  'ambient-sm': '0 0 16px rgba(238, 120, 104, 0.1)', // Small ambient glow
  'ambient-md': '0 0 32px rgba(238, 120, 104, 0.15)', // Medium ambient glow
  'ambient-lg': '0 0 48px rgba(238, 120, 104, 0.2)', // Large ambient glow
  'ambient-xl': '0 0 64px rgba(238, 120, 104, 0.25)', // Extra large ambient glow

  // Focus rings for accessibility (orange)
  'focus-ring': '0 0 0 3px rgba(238, 120, 104, 0.4)', // Focus ring for interactive elements
  'focus-ring-white': '0 0 0 2px #FFFFFF', // Focus ring for dark backgrounds
};

/**
 * ANIMATION SYSTEM
 *
 * Animation durations, easing functions, and keyframes
 * Used for transitions, micro-interactions, and page animations
 */
export const animations = {
  // Animation durations (in ms and s formats)
  duration: {
    fastest: '50ms', // Ultra-quick feedback (button press)
    faster: '100ms', // Very quick interactions
    fast: '150ms', // Fast interactions
    normal: '200ms', // Standard transitions
    slow: '300ms', // Deliberate transitions
    slower: '400ms', // More noticeable transitions
    slowest: '500ms', // Very noticeable transitions
    verySlow: '800ms', // Extended animations
  },

  // Easing functions for natural movement
  easing: {
    // Standard easings
    linear: 'linear', // Constant speed (use sparingly)
    ease: 'ease', // Default ease
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)', // Start slow, end fast
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)', // Start fast, end slow
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)', // Start and end slow

    // Premium branded easings
    premium: 'cubic-bezier(0.4, 0.2, 0.2, 1)', // Luxury feel
    smooth: 'cubic-bezier(0.4, 0.1, 0.1, 1)', // Very smooth
    gentle: 'cubic-bezier(0.4, 0.3, 0.3, 1)', // Soft transitions
    luxury: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)', // Elegant movement
    breathing: 'cubic-bezier(0.37, 0, 0.63, 1)', // Natural rhythm

    // Physical movement
    spring: 'cubic-bezier(0.155, 1.105, 0.295, 1.12)', // Springy effect
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)', // Bounce effect
  },

  // Common animation presets
  presets: {
    fade: 'opacity 200ms cubic-bezier(0.4, 0.2, 0.2, 1)',
    lift: 'transform 200ms cubic-bezier(0.4, 0.2, 0.2, 1)',
    glow: 'box-shadow 200ms cubic-bezier(0.4, 0.2, 0.2, 1)',
    color: 'color 200ms cubic-bezier(0.4, 0.2, 0.2, 1)',
    all: 'all 200ms cubic-bezier(0.4, 0.2, 0.2, 1)',
  },

  // Keyframe definitions for animations
  keyframes: {
    fadeIn: {
      from: { opacity: 0 },
      to: { opacity: 1 },
    },
    fadeOut: {
      from: { opacity: 1 },
      to: { opacity: 0 },
    },
    scaleIn: {
      from: { transform: 'scale(0.95)', opacity: 0 },
      to: { transform: 'scale(1)', opacity: 1 },
    },
    slideIn: {
      from: { transform: 'translateY(10px)', opacity: 0 },
      to: { transform: 'translateY(0)', opacity: 1 },
    },
    slideInRight: {
      from: { transform: 'translateX(20px)', opacity: 0 },
      to: { transform: 'translateX(0)', opacity: 1 },
    },
    pulse: {
      '0%': { opacity: 1 },
      '50%': { opacity: 0.5 },
      '100%': { opacity: 1 },
    },
  },
};

/**
 * FONTS
 *
 * Font families used throughout the application
 * Unified: Source Sans Pro (similar to Velo.Bar's proxima-nova)
 */
export const fonts = {
  heading: '"Source Sans Pro", "proxima-nova", sans-serif',
  body: '"Source Sans Pro", "proxima-nova", sans-serif',
};

/**
 * ACCESSIBILITY STANDARDS
 *
 * WCAG 2.1 AA compliance requirements
 * Ensures the application is usable by people with disabilities
 */
export const accessibility = {
  contrastRatios: {
    navigation: 5.8, // White on semi-transparent dark - PASS AA (4.5:1 required)
    largeText: 5.8, // Headings (18pt+) - PASS AAA (3:1 required)
    normalText: 5.8, // Body text (16px) - PASS AA (4.5:1 required)
    brandOnDark: 3.7, // Standard grey on dark background - FAIL AA for normal text (4.5:1 required)
    accessibleBrandOnDark: 5.3, // Accessible grey on dark background - PASS AA (4.5:1 required)
    tertiaryTextOnDark: 4.7, // Updated tertiary text on dark background - PASS AA (4.5:1 required)
  },
  minTouchTarget: 44, // iOS/Android minimum touch target size (44×44px)
  focusOutline: '2px solid #ee7868', // Brand focus ring for keyboard navigation
  reducedMotion: 'prefers-reduced-motion: reduce', // Respect user motion preferences
  textSpacing: {
    lineHeight: 1.5, // Minimum line height for readability
    paragraphSpacing: '1.5em', // Space between paragraphs
    letterSpacing: '0.12em', // For uppercase text
  },
};

/**
 * UNIFIED DESIGN TOKEN EXPORT
 *
 * Single source of truth for the design system
 * All components should reference these tokens
 */
export const designTokens = {
  // Core token collections
  breakpoints,
  zIndex,
  glassmorphism,
  colors,
  spacing,
  typography,
  borderRadius,
  shadows,
  animations,
  fonts,
  accessibility,

  // Border utilities
  borders: {
    radius: {
      sm: borderRadius.sm,
      md: borderRadius.md,
      lg: borderRadius.lg,
      full: borderRadius.full,
    },
    width: {
      none: '0',
      thin: '1px',
      medium: '2px',
      thick: '4px',
    },
  },

  // Common transitions
  transitions: {
    fast: animations.duration.fast,
    normal: animations.duration.normal,
    slow: animations.duration.slow,
  },
};

// Default export for easy importing
export default designTokens;
