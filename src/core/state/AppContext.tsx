/**
 * VELOBAR - GLOBAL APP CONTEXT
 * React Context for centralized state management
 */

import { createContext, useContext, useReducer, ReactNode } from 'react';
import { appReducer, initialAppState, AppState, AppAction } from './appReducer.ts';
import { PageType, BreadcrumbData } from '../types/routes.ts';
import { ROUTE_MAPPING } from '../constants/routes.ts';

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;

  // Convenience methods
  navigateTo: (page: PageType) => void;
  openBooking: (options?: { artist?: string; service?: string }) => void;
  closeBooking: () => void;
  setBreadcrumb: (data: BreadcrumbData) => void;
  setLanguage: (language: 'DE' | 'EN') => void;
  setError: (error: string | null) => void;
  setLoading: (loading: boolean) => void;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
  initialLanguage?: 'DE' | 'EN';
}

export function AppProvider({ children, initialLanguage = 'DE' }: AppProviderProps) {
  const [state, dispatch] = useReducer(appReducer, {
    ...initialAppState,
    language: initialLanguage,
  });

  // Navigation with route mapping support
  const navigateTo = (page: PageType) => {
    // Handle route mapping for German URLs
    const mappedPage = ROUTE_MAPPING[page] || page;
    dispatch({ type: 'SET_PAGE', payload: mappedPage as PageType });
  };

  // Booking flow management
  const openBooking = (options?: { artist?: string; service?: string }) => {
    dispatch({ type: 'OPEN_BOOKING', payload: options });
  };

  const closeBooking = () => {
    dispatch({ type: 'CLOSE_BOOKING' });
  };

  // Breadcrumb management
  const setBreadcrumb = (data: BreadcrumbData) => {
    dispatch({ type: 'SET_BREADCRUMB', payload: data });
  };

  // Language management
  const setLanguage = (language: 'DE' | 'EN') => {
    dispatch({ type: 'SET_LANGUAGE', payload: language });
  };

  // Error management
  const setError = (error: string | null) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  };

  // Loading management
  const setLoading = (loading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  };

  // Mobile menu management
  const toggleMobileMenu = () => {
    dispatch({ type: 'TOGGLE_MOBILE_MENU' });
  };

  const closeMobileMenu = () => {
    dispatch({ type: 'CLOSE_MOBILE_MENU' });
  };

  const contextValue: AppContextType = {
    state,
    dispatch,
    navigateTo,
    openBooking,
    closeBooking,
    setBreadcrumb,
    setLanguage,
    setError,
    setLoading,
    toggleMobileMenu,
    closeMobileMenu,
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
}

// Custom hook for using app context
export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

export default AppContext;
