import { createContext, useContext, useState, ReactNode } from 'react';
import { designTokens } from '../design-tokens';

// Use the design tokens directly
export const designSystemTokens = designTokens;

// Define the context type
interface BusinessDesignSystemContextType {
  language: 'DE' | 'EN';
  setLanguage: (lang: 'DE' | 'EN') => void;
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
  tokens: typeof designSystemTokens;
}

// Export types for module augmentation
export type { BusinessDesignSystemContextType };

// Create the context with default values
const BusinessDesignSystemContext = createContext<BusinessDesignSystemContextType>({
  language: 'DE',
  setLanguage: () => {},
  theme: 'dark',
  setTheme: () => {},
  tokens: designSystemTokens,
});

// Provider props
interface BusinessProviderProps {
  children: ReactNode;
  initialLanguage?: 'DE' | 'EN';
  initialTheme?: 'dark' | 'light';
}

// Provider component
export const BusinessProvider = ({
  children,
  initialLanguage = 'DE',
  initialTheme = 'dark',
}: BusinessProviderProps) => {
  const [language, setLanguage] = useState<'DE' | 'EN'>(initialLanguage);
  const [theme, setTheme] = useState<'dark' | 'light'>(initialTheme);

  return (
    <BusinessDesignSystemContext.Provider
      value={{
        language,
        setLanguage,
        theme,
        setTheme,
        tokens: designSystemTokens,
      }}
    >
      {children}
    </BusinessDesignSystemContext.Provider>
  );
};

// Hook for using the context
export const useBusinessDesignSystem = () => {
  const context = useContext(BusinessDesignSystemContext);
  if (!context) {
    throw new Error('useBusinessDesignSystem must be used within a BusinessProvider');
  }
  return context;
};

export default BusinessProvider;
