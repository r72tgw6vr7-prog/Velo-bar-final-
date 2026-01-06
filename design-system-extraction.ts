/**
 * VELOBAR DESIGN SYSTEM EXTRACTION
 * Source: Services Page (ServicesPageInteractive.tsx)
 * Date: November 8, 2025
 *
 * This document captures all design decisions from the perfect Services page.
 */

export const VeloBarDesignSystem = {
  // ============================================================================
  // 1. SPACING GRID - Base unit: 8px
  // ============================================================================
  spacing: {
    gap: { xs: '8px', sm: '16px', md: '32px', lg: '64px', xl: '128px' },
    padding: {
      card: { all: '32px', x: '32px', yCategory: '40px', yService: '32px' },
      button: { x: '32px', y: '16px' },
    },
    margin: {
      elementGap: { tight: '8px', default: '32px', relaxed: '64px' },
      section: { top: '64px', bottom: '64px' },
    },
  },

  // ============================================================================
  // 2. TYPOGRAPHY
  // ============================================================================
  typography: {
    fontFamily: {
      heading: "'Playfair Display', serif",
      body: "'Inter', sans-serif",
    },
    fontSize: {
      h1: { mobile: '48px', tablet: '60px', desktop: '72px' },
      h2: { mobile: '30px', tablet: '36px', desktop: '36px' },
      h3: { category: '24px', service: { mobile: '24px', tablet: '30px' } },
      body: { large: '18px', base: '16px', small: '14px' },
      label: { large: '14px', small: '12px' },
      price: '20px',
      button: '18px',
    },
    fontWeight: { normal: 400, medium: 500, semibold: 600, bold: 700 },
    lineHeight: { tight: 1.1, normal: 1.2, relaxed: 1.625, loose: 1.75 },
    letterSpacing: { wide: '0.2em', wider: '0.25em', widest: '0.3em' },
  },

  // ============================================================================
  // 3. COLORS & OPACITY
  // ============================================================================
  colors: {
    brand: {
      gold: 'var(--gold-600)',
      goldHover: 'var(--gold-500)',
      white: '#FFFFFF',
      black: 'var(--gray-900)',
    },
    surface: { dark: 'var(--gray-800)', darker: 'var(--gray-900)' },
    text: {
      primary: '#FFFFFF',
      secondary: 'rgba(255, 255, 255, 0.8)',
      tertiary: 'rgba(255, 255, 255, 0.75)',
      muted: 'rgba(255, 255, 255, 0.7)',
      subtle: 'rgba(255, 255, 255, 0.6)',
      faint: 'rgba(255, 255, 255, 0.5)',
      gold: 'var(--gold-600)',
    },
    border: {
      default: 'rgba(255, 255, 255, 0.1)',
      gold: 'var(--gold-600)',
      goldHover: 'rgba(212, 175, 55, 0.8)',
    },
  },

  // ============================================================================
  // 4. BORDERS & SHADOWS
  // ============================================================================
  borders: {
    width: { default: '2px' },
    radius: { lg: '24px', xl: '16px', button: '12px', full: '9999px' },
  },
  shadows: {
    card: {
      default: 'none',
      premium: '0 20px 60px rgba(212, 175, 55, 0.35)',
      active: '0 0 32px rgba(212, 175, 55, 0.45)',
    },
  },

  // ============================================================================
  // 5. RESPONSIVE BREAKPOINTS
  // ============================================================================
  breakpoints: {
    sm: { min: '640px', categoryColumns: 2, serviceColumns: 1 },
    md: { min: '768px', serviceColumns: 3 },
    lg: { min: '1024px', categoryColumns: 4 },
  },

  // ============================================================================
  // 6. LAYOUT & POSITIONING
  // ============================================================================
  layout: {
    container: { maxWidth: '1104px', systemDefault: '1280px' },
    grid: {
      categoryCards: { mobile: 1, sm: 2, lg: 4, gap: '32px' },
      serviceCards: { mobile: 1, md: 3, gap: '32px' },
    },
  },

  // ============================================================================
  // 7. COMPONENT STRUCTURE
  // ============================================================================
  components: {
    categoryCard: {
      padding: 'px-8 py-10',
      borderRadius: 'rounded-2xl',
      border: '2px',
      iconSize: '56px',
      iconBg: 'var(--gold-600)',
    },
    serviceCard: {
      padding: 'p-8',
      borderRadius: 'rounded-3xl',
      border: '2px',
      bg: 'var(--gray-800)',
      gap: 'gap-8',
    },
  },

  // ============================================================================
  // 8. ANIMATIONS
  // ============================================================================
  animations: {
    fadeInUp: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
    },
    transitions: {
      card: 'duration-300',
      button: 'duration-200',
    },
  },
} as const;
