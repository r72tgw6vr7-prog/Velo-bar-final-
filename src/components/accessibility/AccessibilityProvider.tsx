/**
 * AccessibilityProvider Component
 * ===========================
 * Context provider for accessibility features and preferences
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AccessibilityContextType {
  // User preferences
  prefersReducedMotion: boolean;
  prefersHighContrast: boolean;
  prefersFocusIndicators: boolean;
  prefersLargeText: boolean;
  screenReaderActive: boolean;

  // Methods to toggle preferences
  toggleReducedMotion: () => void;
  toggleHighContrast: () => void;
  toggleFocusIndicators: () => void;
  toggleLargeText: () => void;

  // Focus management
  trapFocus: (containerId: string) => void;
  releaseFocus: () => void;
  currentFocusTrap: string | null;

  // Announcement system for screen readers
  announce: (message: string, politeness?: 'polite' | 'assertive') => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | null>(null);

/**
 * Hook to use accessibility context
 */
export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};

interface AccessibilityProviderProps {
  children: ReactNode;
}

/**
 * Provider component for accessibility features
 */
export const AccessibilityProvider: React.FC<AccessibilityProviderProps> = ({ children }) => {
  // User preference states
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [prefersHighContrast, setPrefersHighContrast] = useState(false);
  const [prefersFocusIndicators, setPrefersFocusIndicators] = useState(true);
  const [prefersLargeText, setPrefersLargeText] = useState(false);
  const [screenReaderActive, setScreenReaderActive] = useState(false);

  // Focus management
  const [currentFocusTrap, setCurrentFocusTrap] = useState<string | null>(null);

  // Load user preferences from localStorage or system preferences
  useEffect(() => {
    // Check system preferences
    const systemPrefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    setPrefersReducedMotion(
      localStorage.getItem('prefersReducedMotion') === 'true' || systemPrefersReducedMotion,
    );

    // Check localStorage for saved preferences
    setPrefersHighContrast(localStorage.getItem('prefersHighContrast') === 'true');
    setPrefersFocusIndicators(localStorage.getItem('prefersFocusIndicators') !== 'false'); // Default to true
    setPrefersLargeText(localStorage.getItem('prefersLargeText') === 'true');

    // Listen for system preference changes
    const motionMediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleMotionChange = (e: MediaQueryListEvent) => {
      if (localStorage.getItem('prefersReducedMotion') === null) {
        // Only apply system preference if user hasn't explicitly set a preference
        setPrefersReducedMotion(e.matches);
      }
    };

    motionMediaQuery.addEventListener('change', handleMotionChange);

    // Try to detect screen reader
    // Note: this is not reliable and only works for some screen readers
    const detectScreenReader = () => {
      // NVDA might expose navigator.userAgent with NVDA string
      // VoiceOver might modify the tree in specific ways
      // This is a best effort attempt
      setTimeout(() => {
        const axs = window.document.querySelectorAll('*[aria-roledescription]').length > 0;
        setScreenReaderActive(axs);
      }, 1000);
    };

    detectScreenReader();

    return () => {
      motionMediaQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  // Apply accessibility preferences to document
  useEffect(() => {
    // Apply reduced motion
    document.documentElement.classList.toggle('reduce-motion', prefersReducedMotion);
    localStorage.setItem('prefersReducedMotion', prefersReducedMotion.toString());

    // Apply high contrast
    document.documentElement.classList.toggle('high-contrast', prefersHighContrast);
    localStorage.setItem('prefersHighContrast', prefersHighContrast.toString());

    // Apply focus indicators
    document.documentElement.classList.toggle('focus-indicators', prefersFocusIndicators);
    localStorage.setItem('prefersFocusIndicators', prefersFocusIndicators.toString());

    // Apply large text
    document.documentElement.classList.toggle('large-text', prefersLargeText);
    localStorage.setItem('prefersLargeText', prefersLargeText.toString());
  }, [prefersReducedMotion, prefersHighContrast, prefersFocusIndicators, prefersLargeText]);

  // Focus trap implementation
  const trapFocus = (containerId: string) => {
    setCurrentFocusTrap(containerId);
  };

  const releaseFocus = () => {
    setCurrentFocusTrap(null);
  };

  // Live region announcement system for screen readers
  const announce = (message: string, politeness: 'polite' | 'assertive' = 'polite') => {
    // Find or create live region
    let liveRegion = document.getElementById(`accessibility-announce-${politeness}`);

    if (!liveRegion) {
      liveRegion = document.createElement('div');
      liveRegion.id = `accessibility-announce-${politeness}`;
      liveRegion.setAttribute('aria-live', politeness);
      liveRegion.setAttribute('role', politeness === 'assertive' ? 'alert' : 'status');
      liveRegion.className = 'sr-only';
      document.body.appendChild(liveRegion);
    }

    // Clear previous content and set new content
    liveRegion.textContent = '';
    setTimeout(() => {
      liveRegion!.textContent = message;
    }, 50);

    // Clear after a delay
    setTimeout(() => {
      liveRegion!.textContent = '';
    }, 5000);
  };

  // Context value
  const value: AccessibilityContextType = {
    // User preferences
    prefersReducedMotion,
    prefersHighContrast,
    prefersFocusIndicators,
    prefersLargeText,
    screenReaderActive,

    // Methods to toggle preferences
    toggleReducedMotion: () => setPrefersReducedMotion((prev) => !prev),
    toggleHighContrast: () => setPrefersHighContrast((prev) => !prev),
    toggleFocusIndicators: () => setPrefersFocusIndicators((prev) => !prev),
    toggleLargeText: () => setPrefersLargeText((prev) => !prev),

    // Focus management
    trapFocus,
    releaseFocus,
    currentFocusTrap,

    // Announcement system
    announce,
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {/* Skip Link */}
      <a
        href='#main-content'
        className='bg-brand-primary sr-only z-50 rounded-md p-0 font-medium text-black focus:not-sr-only focus:fixed focus:top-4 focus:left-4'
      >
        Skip to main content
      </a>

      {/* Visually hidden announcements for screen readers */}
      <div
        id='accessibility-announce-polite'
        aria-live='polite'
        role='status'
        className='sr-only'
      ></div>
      <div
        id='accessibility-announce-assertive'
        aria-live='assertive'
        role='alert'
        className='sr-only'
      ></div>

      {/* Apply focus trap if active */}
      {currentFocusTrap && <FocusTrap containerId={currentFocusTrap} />}

      {children}
    </AccessibilityContext.Provider>
  );
};

// Internal FocusTrap component
const FocusTrap: React.FC<{ containerId: string }> = ({ containerId }) => {
  useEffect(() => {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Find all focusable elements
    const focusableElements = container.querySelectorAll(
      'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])',
    );

    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    // Focus first element
    firstElement.focus();

    // Handle tab navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        // Shift+Tab pressed on first element
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
        // Tab pressed on last element
        else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }

      // Allow escape to exit
      if (e.key === 'Escape') {
        document.removeEventListener('keydown', handleKeyDown);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [containerId]);

  return null;
};

export default AccessibilityProvider;
