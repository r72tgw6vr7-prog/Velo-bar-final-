import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Import translation files
import deTranslations from '@/locales/de.json';
import enTranslations from '@/locales/en.json';

// Define supported languages (DE is primary, EN for international)
export type Language = 'de' | 'en';

// Interface for context
export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isGerman: boolean;
  isEnglish: boolean;
}

// Create the context
export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Props for the provider
interface LanguageProviderProps {
  children: ReactNode;
}

/**
 * Language Provider Component
 * Manages language state and provides translation functionality
 * Default language is German (DE) for B2B German market
 */
export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // State for current language (default to German for B2B market)
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      // Try to get from localStorage first
      const savedLanguage = localStorage.getItem('velo-language') as Language;
      if (savedLanguage === 'de' || savedLanguage === 'en') {
        return savedLanguage;
      }

      // If not in localStorage, try browser language
      const browserLang = navigator.language.split('-')[0].toLowerCase();
      if (browserLang === 'en') {
        return 'en';
      }
    } catch (e) {
      // Handle errors that might occur during testing
      console.warn('Error accessing localStorage or navigator:', e);
    }

    // Default to German (primary market)
    return 'de';
  });

  // Get translations based on language
  const translations = language === 'de' ? deTranslations : enTranslations;

  // Function to set language and save to localStorage
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('velo-language', lang);
  };

  // Effect to save language to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('velo-language', language);
    // Update document lang attribute
    document.documentElement.lang = language;
  }, [language]);

  /**
   * Translation function to get string by key
   * Supports nested keys like 'nav.home'
   */
  const t = (key: string): string => {
    const keys = key.split('.');
    let value: Record<string, unknown> | string | undefined = translations;

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k] as Record<string, unknown> | string;
      } else {
        // Fallback to German if key not found
        let fallback: Record<string, unknown> | string | undefined = deTranslations;
        for (const fk of keys) {
          if (fallback && typeof fallback === 'object' && fk in fallback) {
            fallback = fallback[fk] as Record<string, unknown> | string;
          } else {
            console.warn(`Translation key not found: ${key}`);
            return key;
          }
        }
        return typeof fallback === 'string' ? fallback : key;
      }
    }

    return typeof value === 'string' ? value : key;
  };

  // Context value
  const contextValue: LanguageContextType = {
    language,
    setLanguage,
    t,
    isGerman: language === 'de',
    isEnglish: language === 'en',
  };

  return <LanguageContext.Provider value={contextValue}>{children}</LanguageContext.Provider>;
};

/**
 * Custom hook to use language context
 * Throws error if used outside of LanguageProvider
 */
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);

  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }

  return context;
};
