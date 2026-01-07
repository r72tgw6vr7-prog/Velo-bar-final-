/**
 * VELOBAR - CORE TYPE DEFINITIONS
 * Central export for all type definitions
 */

// Route types
import {
  ROUTES,
  type PageType,
  type RouteConfig,
  type NavItem,
  type BreadcrumbData,
} from './routes.ts';
export type { PageType, RouteConfig, NavItem, BreadcrumbData };
export { ROUTES };

// State types
export type { AppState, AppAction } from '../state/appReducer.ts';

// Common UI types
export interface BaseComponent {
  className?: string;
  children?: React.ReactNode;
}

export interface NavigationHandler {
  onNavigate: (page: PageType) => void;
}

export interface BookingHandler {
  onBookNow?: () => void;
  onBookService?: (serviceId: string) => void;
}

export interface BreadcrumbHandler {
  setBreadcrumbContext?: (data: BreadcrumbData) => void;
}

// Language types
export type Language = 'DE' | 'EN';

export interface LanguageContent {
  de: string;
  en: string;
}

// Error types
export interface AppError {
  message: string;
  code?: string;
  timestamp: Date;
}

// Loading states
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';
