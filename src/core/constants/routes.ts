/**
 * VELOBAR CORPORATE SITE - ROUTE CONFIGURATION
 * Complete route definitions with metadata for B2B event catering
 */

import { ROUTES, RouteConfig } from '../types/routes.ts';

export const ROUTE_CONFIG: Record<string, RouteConfig> = {
  [ROUTES.HOME]: {
    path: '/',
    label: { de: 'Home', en: 'Home' },
    showInNav: false, // Logo serves as home link
  },

  [ROUTES.SERVICES]: {
    path: '/leistungen',
    label: { de: 'Leistungen', en: 'Services' },
    showInNav: false,
    isServiceCategory: true,
  },

  // Service Categories (Leistungen dropdown): core B2B event formats offered by Velobar
  [ROUTES.FIRMENFEIERN]: {
    path: '/firmenfeiern',
    label: { de: 'Firmenfeiern', en: 'Corporate Events' },
    showInNav: false,
    isServiceCategory: false,
  },
  [ROUTES.WEIHNACHTSFEIERN]: {
    path: '/weihnachtsfeiern',
    label: { de: 'Weihnachtsfeiern', en: 'Christmas Parties' },
    showInNav: false,
    isServiceCategory: false,
  },
  [ROUTES.MESSE_CATERING]: {
    path: '/messe-catering',
    label: { de: 'Messe & Promotions', en: 'Trade Shows & Promotions' },
    showInNav: false,
    isServiceCategory: false,
  },
  [ROUTES.TEAM_EVENTS]: {
    path: '/team-events-workshops',
    label: { de: 'Team-Events & Workshops', en: 'Team Events & Workshops' },
    showInNav: false,
    isServiceCategory: false,
  },
  [ROUTES.PRIVATE_FEIERN]: {
    path: '/private-feiern',
    label: { de: 'Private Feiern', en: 'Private Celebrations' },
    showInNav: false,
    isServiceCategory: false,
  },
  [ROUTES.HOCHZEITEN]: {
    path: '/hochzeiten',
    label: { de: 'Hochzeiten', en: 'Weddings' },
    showInNav: false,
    isServiceCategory: false,
  },

  // Top-level navigation: cross-service marketing pages (pricing, gallery, about, blog, drinks menu)
  [ROUTES.PREISE]: {
    path: '/preise',
    label: { de: 'Preise', en: 'Pricing' },
    showInNav: true,
  },
  [ROUTES.GALERIE]: {
    path: '/galerie',
    label: { de: 'Galerie', en: 'Gallery' },
    showInNav: true,
  },
  [ROUTES.ABOUT]: {
    path: '/about',
    label: { de: 'Über uns', en: 'About Us' },
    showInNav: true,
  },
  [ROUTES.MENU]: {
    path: '/menu',
    label: { de: 'Drinks', en: 'Drinks' },
    showInNav: true,
  },
  [ROUTES.FAQ]: {
    path: '/faq',
    label: { de: 'FAQ', en: 'FAQ' },
    showInNav: true,
  },

  // Location-specific booking pages: deep links for regional booking flows
  [ROUTES.BUCHUNG_MUC]: {
    path: '/velobar/buchungmuc',
    label: { de: 'München & Umgebung', en: 'Munich & Surroundings' },
    showInNav: false,
  },
  [ROUTES.VELOBARCO]: {
    path: '/velobarco',
    label: { de: 'Coburg & Umgebung', en: 'Coburg & Surroundings' },
    showInNav: false,
  },

  // Contact & Booking: primary inquiry funnel for all B2B event requests
  [ROUTES.ANFRAGE]: {
    path: '/anfrage',
    label: { de: 'Anfrage', en: 'Request Quote' },
    showInNav: true,
  },
  [ROUTES.CONTACT]: {
    path: '/contact',
    label: { de: 'Kontakt', en: 'Contact' },
    showInNav: false, // Hidden - use /anfrage instead
  },

  // Legal pages: German Impressum, Datenschutz & AGB for Velobar
  [ROUTES.IMPRESSUM]: {
    path: '/impressum',
    label: { de: 'Impressum', en: 'Imprint' },
    showInNav: false,
    isLegal: true,
  },
  [ROUTES.DATENSCHUTZ]: {
    path: '/datenschutz',
    label: { de: 'Datenschutz', en: 'Privacy' },
    showInNav: false,
    isLegal: true,
  },
};

// Route mapping for German URLs (legacy support)
export const ROUTE_MAPPING: Record<string, string> = {
  services: ROUTES.SERVICES,
  portfolio: ROUTES.GALERIE,
  artists: ROUTES.GALERIE,
  booking: ROUTES.ANFRAGE,
  kontakt: ROUTES.CONTACT,
};

// Get visible navigation routes
export const getNavigationRoutes = (language: 'DE' | 'EN' = 'DE') => {
  const langKey = language.toLowerCase() as 'de' | 'en';
  return Object.entries(ROUTE_CONFIG)
    .filter(([_, config]) => config.showInNav && !config.isServiceCategory)
    .map(([route, config]) => ({
      id: route,
      label: config.label[langKey],
      path: config.path,
    }));
};

// Get service category routes (for Leistungen dropdown)
export const getServiceRoutes = (language: 'DE' | 'EN' = 'DE') => {
  const langKey = language.toLowerCase() as 'de' | 'en';
  return Object.entries(ROUTE_CONFIG)
    .filter(([_, config]) => config.isServiceCategory)
    .map(([route, config]) => ({
      id: route,
      label: config.label[langKey],
      path: config.path,
    }));
};

// Get legal routes
export const getLegalRoutes = (language: 'DE' | 'EN' = 'DE') => {
  const langKey = language.toLowerCase() as 'de' | 'en';
  return Object.entries(ROUTE_CONFIG)
    .filter(([_, config]) => config.isLegal)
    .map(([route, config]) => ({
      id: route,
      label: config.label[langKey],
      path: config.path,
    }));
};

export default ROUTE_CONFIG;
