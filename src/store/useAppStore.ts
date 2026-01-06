import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { StateCreator } from 'zustand';

type ThemeMode = 'dark' | 'light' | 'high-contrast';

type AppState = {
  theme: ThemeMode;
  locale: 'en' | 'de';
  isNavOpen: boolean;
};

type AppActions = {
  setTheme: (theme: ThemeMode) => void;
  setLocale: (locale: AppState['locale']) => void;
  toggleNav: (value?: boolean) => void;
};

const storeCreator: StateCreator<AppState & AppActions> = (set) => ({
  theme: 'dark',
  locale: 'en',
  isNavOpen: false,
  setTheme: (theme) => set({ theme }),
  setLocale: (locale) => set({ locale }),
  toggleNav: (value) => set((state) => ({ isNavOpen: value ?? !state.isNavOpen })),
});

export const useAppStore = create<AppState & AppActions>()(devtools(storeCreator));

export const selectors = {
  theme: (state: AppState) => state.theme,
  locale: (state: AppState) => state.locale,
  isNavOpen: (state: AppState) => state.isNavOpen,
};
