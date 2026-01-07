import 'scheduler';
import * as React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css'; // Imports system.css now
import './styles/glassmorphism.css'; // Brand glassmorphism design system
import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation.tsx';
import { AuthProvider } from '@/context/AuthContext.tsx';
import ErrorBoundary from '@/components/layout/ErrorBoundary.tsx';
import { ThemeProvider } from '@/contexts/ThemeContext.tsx';
import { HelmetProvider } from 'react-helmet-async';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        <ErrorBoundary>
          <>
            {/* Aceternity-style animated gradient - SINGLE instance at root */}
            <BackgroundGradientAnimation />
            {/* App rendered ON TOP of the fixed gradient */}
            <AuthProvider>
              <App />
            </AuthProvider>
          </>
        </ErrorBoundary>
      </ThemeProvider>
    </HelmetProvider>
  </React.StrictMode>,
);
