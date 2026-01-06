import React from 'react';
import { ViteReactSSG } from 'vite-react-ssg';
import App from './App';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from '@/contexts/ThemeContext';
import ErrorBoundary from '@/components/layout/ErrorBoundary';
import { AuthProvider } from '@/context/AuthContext';
import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation';
import { routes } from './ssg.routes';

// SSG entry for vite-ssg-react
export function AppShell() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <ErrorBoundary>
          <>
            <BackgroundGradientAnimation />
            <AuthProvider>
              <App />
            </AuthProvider>
          </>
        </ErrorBoundary>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export const createRoot = ViteReactSSG({ routes: routes as unknown as never }, () => {});
