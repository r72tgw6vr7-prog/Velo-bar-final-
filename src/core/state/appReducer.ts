/**
 * VELOBAR - CENTRALIZED STATE MANAGEMENT
 * Consolidated app state with useReducer pattern
 */

import { PageType, BreadcrumbData } from '../types/routes';

export interface AppState {
  // Navigation state
  currentPage: PageType;
  showBookingFlow: boolean;

  // Booking state
  preselectedArtist?: string;
  preselectedService?: string;

  // Localization
  language: 'DE' | 'EN';

  // Navigation context
  breadcrumbData: BreadcrumbData;

  // UI state
  isLoading: boolean;
  error: string | null;

  // Mobile state
  isMobileMenuOpen: boolean;
}

export type AppAction =
  | { type: 'SET_PAGE'; payload: PageType }
  | { type: 'OPEN_BOOKING'; payload?: { artist?: string; service?: string } }
  | { type: 'CLOSE_BOOKING' }
  | { type: 'SET_LANGUAGE'; payload: 'DE' | 'EN' }
  | { type: 'SET_BREADCRUMB'; payload: BreadcrumbData }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'TOGGLE_MOBILE_MENU' }
  | { type: 'CLOSE_MOBILE_MENU' }
  | { type: 'RESET_STATE' };

export const initialAppState: AppState = {
  currentPage: 'home',
  showBookingFlow: false,
  language: 'DE',
  breadcrumbData: {},
  isLoading: false,
  error: null,
  isMobileMenuOpen: false,
};

export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_PAGE':
      return {
        ...state,
        currentPage: action.payload,
        showBookingFlow: false,
        breadcrumbData: {}, // Clear breadcrumbs on page change
        isMobileMenuOpen: false,
        error: null,
      };

    case 'OPEN_BOOKING':
      return {
        ...state,
        showBookingFlow: true,
        preselectedArtist: action.payload?.artist,
        preselectedService: action.payload?.service,
        isMobileMenuOpen: false,
      };

    case 'CLOSE_BOOKING':
      return {
        ...state,
        showBookingFlow: false,
        preselectedArtist: undefined,
        preselectedService: undefined,
      };

    case 'SET_LANGUAGE':
      return {
        ...state,
        language: action.payload,
      };

    case 'SET_BREADCRUMB':
      return {
        ...state,
        breadcrumbData: action.payload,
      };

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    case 'TOGGLE_MOBILE_MENU':
      return {
        ...state,
        isMobileMenuOpen: !state.isMobileMenuOpen,
      };

    case 'CLOSE_MOBILE_MENU':
      return {
        ...state,
        isMobileMenuOpen: false,
      };

    case 'RESET_STATE':
      return {
        ...initialAppState,
        language: state.language, // Preserve language
      };

    default:
      return state;
  }
}
