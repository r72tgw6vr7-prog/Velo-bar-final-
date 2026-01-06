/**
 * Velo.Bar – Mobile Cocktailbar & Event Catering
 * Global configuration constants for the new brand
 */

// Brand configuration
export const BRAND_CONFIG = {
  name: 'Velo.Bar',
  fullName: 'Velo.Bar – Mobile Cocktailbar & Event Catering',
  tagline: 'Mobile Cocktailbar & Event Catering',
  location: 'München & Coburg, Deutschland',

  // Contact information
  contact: {
    phone: '+49 160 94623196',
    email: 'hallo@velo-bar.com',
    address: {
      street: 'Matthias-Mayer-Straße 5',
      city: 'München',
      zip: '81379',
      country: 'Deutschland',
    },
  },

  // Business hours
  hours: {
    monday: { open: 'Termine nach Vereinbarung', close: '' },
    tuesday: { open: 'Termine nach Vereinbarung', close: '' },
    wednesday: { open: 'Termine nach Vereinbarung', close: '' },
    thursday: { open: 'Termine nach Vereinbarung', close: '' },
    friday: { open: '10:00', close: '21:00' },
    saturday: { open: '10:00', close: '21:00' },
    sunday: 'closed',
  },

  // Social media
  social: {
    instagram: 'https://instagram.com/your_business_handle',
    facebook: 'https://facebook.com/your_business_page',
    tiktok: 'https://tiktok.com/@your_business_handle',
  },
} as const;

// App configuration
export const APP_CONFIG = {
  defaultLanguage: 'DE' as const,
  supportedLanguages: ['DE', 'EN'] as const,

  // Performance settings
  lazyLoadOffset: 200,
  animationDuration: 300,
  debounceDelay: 300,

  // Accessibility
  skipLinkTarget: '#main-content',
  focusRingWidth: 2,
  touchTargetMinSize: 44,

  // Navigation
  stickyNavOffset: 80,
  mobileBreakpoint: 768,
  tabletBreakpoint: 1024,
  desktopBreakpoint: 1200,

  // Grid system
  gridColumns: 12,
  gridGutter: 16,
  maxContentWidth: 1440,

  // Design tokens
  borderRadius: {
    small: 8,
    medium: 12,
    large: 16,
  },

  spacing: {
    xs: 8,
    sm: 16,
    md: 24,
    lg: 32,
    xl: 48,
    xxl: 64,
  },
} as const;

// Feature flags
export const FEATURE_FLAGS = {
  enableBookingFlow: true,
  enableLanguageSwitch: true,
  enableBreadcrumbs: true,
  enableMobileMenu: true,
  enableErrorBoundaries: true,
  enableLazyLoading: true,
  enableAnimations: true,
  enableAnalytics: false, // Disabled for privacy
  enableChatbot: false, // Future feature
  enableCRM: false, // Future feature
} as const;

// API configuration (for future use)
export const API_CONFIG = {
  baseUrl: process.env.REACT_APP_API_URL || '',
  timeout: 10000,
  retryAttempts: 3,
  retryDelay: 1000,
} as const;

export default {
  BRAND_CONFIG,
  APP_CONFIG,
  FEATURE_FLAGS,
  API_CONFIG,
};
