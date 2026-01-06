import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

type ThemeMode = 'dark' | 'light' | 'high-contrast';
type BrandVariant = 'default' | 'emerald' | 'royal';

type ThemeContextValue = {
  theme: ThemeMode;
  brand: BrandVariant;
  setTheme: (theme: ThemeMode) => void;
  setBrand: (brand: BrandVariant) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const THEME_STORAGE_KEY = 'velobar:theme';
const BRAND_STORAGE_KEY = 'velobar:brand';

const order: ThemeMode[] = ['dark', 'light', 'high-contrast'];

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>('dark');
  const [brand, setBrandState] = useState<BrandVariant>('default');

  useEffect(() => {
    const storedTheme = (localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null) || 'dark';
    const storedBrand =
      (localStorage.getItem(BRAND_STORAGE_KEY) as BrandVariant | null) || 'default';
    setThemeState(storedTheme);
    setBrandState(storedBrand);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    root.setAttribute('data-brand', brand);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
    localStorage.setItem(BRAND_STORAGE_KEY, brand);
  }, [theme, brand]);

  const toggleTheme = useCallback(() => {
    const idx = order.indexOf(theme);
    const next = order[(idx + 1) % order.length];
    setThemeState(next);
  }, [theme]);

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, brand, setTheme: setThemeState, setBrand: setBrandState, toggleTheme }),
    [theme, brand, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
};
