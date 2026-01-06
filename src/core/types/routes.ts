/**
 * VELOBAR CORPORATE SITE - CORE ROUTE TYPE SYSTEM
 * Centralized route definitions and types for B2B event catering
 */

export const ROUTES = {
  HOME: 'home',
  SERVICES: 'leistungen',
  // Service Categories (Leistungen)
  FIRMENFEIERN: 'firmenfeiern',
  WEIHNACHTSFEIERN: 'weihnachtsfeiern',
  MESSE_CATERING: 'messe-catering',
  TEAM_EVENTS: 'team-events-workshops',
  PRIVATE_FEIERN: 'private-feiern',
  HOCHZEITEN: 'hochzeiten',
  // Top-level pages
  PREISE: 'preise',
  GALERIE: 'galerie',
  ABOUT: 'about',
  MENU: 'menu',
  FAQ: 'faq',
  // Location-specific booking pages
  BUCHUNG_MUC: 'velobar-buchungmuc',
  VELOBARCO: 'velobarco',
  // Contact & Booking
  ANFRAGE: 'anfrage',
  CONTACT: 'contact',
  // Legal pages
  IMPRESSUM: 'impressum',
  DATENSCHUTZ: 'datenschutz',
  AGB: 'agb',
} as const;

export type PageType = (typeof ROUTES)[keyof typeof ROUTES];

export interface RouteConfig {
  path: string;
  label: {
    de: string;
    en: string;
  };
  showInNav: boolean;
  isServiceCategory?: boolean; // For Leistungen dropdown items
  requiresAuth?: boolean;
  isLegal?: boolean;
}

// Navigation item structure with dropdown support
export interface NavItem {
  id: PageType;
  label: string;
  href?: string;
  children?: NavItem[];
}

// Breadcrumb data structure
export interface BreadcrumbData {
  category?: string;
  subcategory?: string;
  item?: string;
  subPage?: string;
  subPageParent?: string;
  serviceType?: string;
  eventType?: string;
}

export default ROUTES;
