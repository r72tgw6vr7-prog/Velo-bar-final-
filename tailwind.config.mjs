/**
 * MEDUSA DESIGN SYSTEM - TAILWIND CONFIGURATION
 * Version: v2.0 (23 October 2025)
 *
 * This configuration file defines all design tokens for the Medusa Design System.
 * It's the single source of truth for design tokens in the application.
 *
 * KEY FEATURES:
 * - Comprehensive color system with opacity variants
 * - 8px spacing grid system
 * - Standardized shadow tokens with brand colors
 * - Typography with responsive sizing
 * - Border radius aligned to design system
 * - Z-index management
 * - Animation tokens
 *
 * USAGE DOCUMENTATION:
 * See DESIGN_SYSTEM_USAGE_GUIDE.md for detailed usage instructions
 */

const cssVar = (tokenName) => `var(${tokenName})`;

export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
    './01-components-library/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  safelist: [
    // Text colors
    'text-brand-gold',
    'text-brand-white',
    'text-brand-chrome',
    'text-brand-background',
    'text-accent',
    'text-accent-coral',
    'text-accent/80',
    'text-accent/90',
    // Background colors
    'bg-brand-gold',
    'bg-brand-white',
    'bg-brand-chrome',
    'bg-brand-background',
    'bg-accent',
    'bg-accent-coral',
    'bg-accent/90',
    'bg-accent/10',
    'bg-accent/20',
    'bg-overlay-subtle',
    'bg-overlay-medium',
    'bg-overlay-heavy',
    // Hover states
    'hover:bg-brand-gold-hover',
    'hover:bg-brand-gold',
    'hover:bg-accent/90',
    'hover:text-accent/80',
    'hover:shadow-gold-glow',
    'hover:shadow-gold-glow-medium',
    'hover:shadow-gold-glow-strong',
    // Border colors
    'border-brand-gold',
    'border-brand-chrome',
    'border-accent',
    'border-accent-coral',
    'border-white/10',
    'border-white/15',
    'border-white/25',
    // Focus states
    'focus:border-accent',
    'focus:ring-accent/20',
    'focus:ring-accent/50',
    // Text with opacity
    'text-white/70',
    'text-white/80',
    'text-white/85',
    // Width and height classes
    'w-dropdown',
    'w-dropdown-sm',
    'min-w-dropdown',
    'min-w-dropdown-lg',
    'max-h-dropdown',
    'max-h-dropdown-lg',
    'h-button',
    'h-button-lg',
  ],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    extend: {
      colors: {
        navy: {
          DEFAULT: cssVar('--navy-primary'),
          primary: cssVar('--navy-primary'),
          dark: cssVar('--navy-dark'),
          light: cssVar('--navy-light'),
        },
        orange: {
          DEFAULT: cssVar('--orange-primary'),
          primary: cssVar('--orange-primary'),
          hover: cssVar('--orange-hover'),
          light: cssVar('--orange-light'),
        },
        yellow: {
          DEFAULT: cssVar('--yellow-primary'),
          primary: cssVar('--yellow-primary'),
          hover: cssVar('--yellow-hover'),
          light: cssVar('--yellow-light'),
        },
        offwhite: {
          DEFAULT: cssVar('--offwhite-primary'),
          primary: cssVar('--offwhite-primary'),
          secondary: cssVar('--offwhite-secondary'),
        },

        'accent-primary': cssVar('--color-accent-primary'),
        'accent-primary-hover': cssVar('--color-accent-primary-hover'),
        'accent-secondary': cssVar('--color-accent-secondary'),
        'accent-secondary-hover': cssVar('--color-accent-secondary-hover'),

        brand: {
          DEFAULT: cssVar('--navy-primary'),
          primary: cssVar('--navy-primary'),
          black: cssVar('--navy-primary'),
          hover: cssVar('--navy-dark'),
          dark: cssVar('--navy-dark'),
        },
        accent: {
          DEFAULT: cssVar('--orange-primary'),
          coral: cssVar('--orange-primary'),
          hover: cssVar('--orange-hover'),
        },
        muted: {
          DEFAULT: cssVar('--brand-grey-rgb'),
          gray: cssVar('--brand-grey-rgb'),
        },

        background: cssVar('--color-bg-page'),
        transparent: 'transparent',
        current: 'currentColor',
        white: cssVar('--offwhite-primary'),

        page: cssVar('--color-bg-page'),
        'bg-dark': cssVar('--color-bg-dark'),
        'bg-light': cssVar('--color-bg-light'),
        'bg-surface-tinted': cssVar('--color-bg-surface-tinted'),
        'section-dark': cssVar('--color-bg-section-dark'),
        'section-light': cssVar('--color-bg-section-light'),
        surface: cssVar('--color-bg-surface'),
        'surface-muted': cssVar('--color-bg-surface-muted'),

        'on-dark': cssVar('--color-text-on-dark'),
        'on-dark-secondary': cssVar('--color-text-on-dark-secondary'),
        'on-dark-tertiary': cssVar('--color-text-on-dark-tertiary'),
        'on-light': cssVar('--color-text-on-light'),
        'on-light-secondary': cssVar('--color-text-on-light-secondary'),
        'on-light-tertiary': cssVar('--color-text-on-light-tertiary'),

        'border-on-dark': cssVar('--color-border-on-dark'),
        'border-on-light': cssVar('--color-border-on-light'),
      },
      backgroundColor: {
        'overlay-subtle': cssVar('--glass-grey-background'),
        'overlay-medium': cssVar('--glass-grey-background-hover'),
        'overlay-heavy': cssVar('--color-bg-deep'),
      },
      spacing: {
        0: '0px',
        0.5: '2px',
        1: cssVar('--space-xs'), // 4px
        1.5: '6px',
        2: cssVar('--space-sm'), // 8px
        2.5: '10px',
        3: cssVar('--space-md'), // 16px
        4: cssVar('--space-lg'), // 24px
        5: cssVar('--space-xl'), // 32px
        6: cssVar('--space-2xl'), // 48px
        7: '56px',
        8: cssVar('--space-3xl'), // 64px
        9: '72px',
        10: cssVar('--space-4xl'), // 96px
        12: '128px',
      },
      width: {
        dropdown: '200px',
        'dropdown-sm': '150px',
        'dropdown-lg': '250px',
        container: cssVar('--container-default'),
        'container-sm': '768px',
        'container-lg': cssVar('--container-default'),
        'container-narrow': cssVar('--container-narrow'),
        modal: '640px',
        'modal-lg': '768px',
        card: '280px',
        'form-field': '100%',
      },
      height: {
        dropdown: '48px',
        'dropdown-item': '40px',
        nav: '80px',
        button: cssVar('--button-height-md'),
        'button-lg': cssVar('--button-height-lg'),
        input: cssVar('--button-height-md'),
        card: '320px',
        modal: '90vh',
        hero: '70vh',
      },
      maxHeight: {
        dropdown: '300px',
        'dropdown-lg': '400px',
        modal: '90vh',
        card: '420px',
      },
      minWidth: {
        dropdown: '150px',
        'dropdown-lg': '200px',
        button: cssVar('--button-height-sm'),
        input: cssVar('--button-height-sm'),
        modal: '320px',
      },

      // Font families - Unified Velo.Bar fonts (Source Sans Pro ~ proxima-nova)
      fontFamily: {
        'source-sans': ['Source Sans Pro', 'proxima-nova', 'sans-serif'],
        proxima: ['Source Sans Pro', 'proxima-nova', 'sans-serif'], // Alias for original brand font
        headline: ['Source Sans Pro', 'proxima-nova', 'sans-serif'],
        heading: ['Source Sans Pro', 'proxima-nova', 'sans-serif'],
        body: ['Source Sans Pro', 'proxima-nova', 'sans-serif'],
        // Legacy aliases for backward compatibility
        noto: ['Source Sans Pro', 'proxima-nova', 'sans-serif'],
        playfair: ['Source Sans Pro', 'proxima-nova', 'sans-serif'],
        inter: ['Source Sans Pro', 'proxima-nova', 'sans-serif'],
        roboto: ['Source Sans Pro', 'proxima-nova', 'sans-serif'],
      },

      // Custom box shadows
      boxShadow: {
        'accent-glow-subtle': cssVar('--shadow-neon-sm'),
        'accent-glow': cssVar('--shadow-neon-md'),
        'accent-glow-strong': cssVar('--shadow-neon-lg'),
        'accent-glow-medium': cssVar('--shadow-brand'),
        'gold-glow-subtle': cssVar('--shadow-brand-sm'),
        'gold-glow': cssVar('--shadow-brand-md'),
        'gold-glow-strong': cssVar('--shadow-brand-lg'),
        'gold-glow-medium': cssVar('--shadow-brand'),
        'chrome-glow': cssVar('--shadow-silver-sm'),
        sm: cssVar('--shadow-sm'),
        md: cssVar('--shadow-md'),
        lg: cssVar('--shadow-lg'),
        xl: cssVar('--shadow-xl'),
        accent: cssVar('--shadow-brand'),
        'accent-hover': cssVar('--shadow-brand-hover'),
        'accent-active': cssVar('--shadow-brand-active'),
        'focus-ring': cssVar('--shadow-focus-ring'),
      },
      borderRadius: {
        xs: cssVar('--radius-sm'),
        sm: cssVar('--radius-sm'),
        md: cssVar('--radius-md'),
        lg: cssVar('--radius-lg'),
        xl: cssVar('--radius-xl'),
        full: cssVar('--radius-full'),
      },
      zIndex: {
        background: cssVar('--z-background'),
        base: cssVar('--z-base'),
        dropdown: cssVar('--z-dropdown'),
        sticky: cssVar('--z-sticky'),
        content: cssVar('--z-content'),
        overlay: cssVar('--z-overlay'),
        modal: cssVar('--z-modal'),
        navigation: cssVar('--z-navigation'),
        tooltip: cssVar('--z-tooltip'),
      },

      // Font sizes with line heights from Figma
      animation: {
        'scroll-badges': 'scroll 20s linear infinite',
        'modal-enter': 'fadeIn 0.3s',
        'scroll-infinite': 'scroll 30s linear infinite',
        'scroll-trust-badges': 'scrollBadges 30s linear infinite',
        scrollBadges: 'scrollBadges 30s linear infinite',
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(calc(-50%))' },
        },
        scrollBadges: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(calc(-50%))' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.pause-animation': {
          'animation-play-state': 'paused',
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
