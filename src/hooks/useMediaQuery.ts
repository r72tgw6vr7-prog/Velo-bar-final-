import { useEffect, useState, useLayoutEffect } from 'react';

// Add type declaration for Vite's import.meta.env
interface ImportMetaEnv {
  DEV: boolean;
  PROD: boolean;
  MODE: string;
}

// Use useLayoutEffect on client, useEffect on server
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/**
 * Debounce function to limit the rate at which a function is called
 */
const debounce = <T extends (...args: unknown[]) => void>(
  fn: T,
  ms = 300,
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), ms);
  };
};

/**
 * Hook to check if a media query matches
 * @param query Media query string (e.g. "(min-width: 768px)")
 * @returns boolean indicating if the media query matches
 */
export const useMediaQuery = (query: string): boolean => {
  // Track hydration/mounting status
  const [isHydrated, setIsHydrated] = useState(false);
  const [matches, setMatches] = useState(false);

  // Effect to handle hydration
  useIsomorphicLayoutEffect(() => {
    setIsHydrated(true);
    return () => setIsHydrated(false);
  }, []);

  useIsomorphicLayoutEffect(() => {
    // Skip if not hydrated or no window
    if (!isHydrated || typeof window === 'undefined') return;

    // Create media query list
    const mediaQuery = window.matchMedia(query);

    // Create handler function
    const handler = () => {
      if (isHydrated) {
        setMatches(mediaQuery.matches);
      }
    };

    // Set initial value and add listeners
    handler();

    // Create debounced resize handler
    const debouncedResizeHandler = debounce(() => {
      handler();
    }, 100);

    // Add listeners
    mediaQuery.addListener(handler);
    window.addEventListener('resize', debouncedResizeHandler);

    // Cleanup
    return () => {
      mediaQuery.removeListener(handler);
      window.removeEventListener('resize', debouncedResizeHandler);
    };
  }, [query]);

  return matches;
};

/**
 * Available breakpoints based on design tokens
 */
export type Breakpoint = 'mobile' | 'tablet' | 'desktop';

/**
 * Hook to get current breakpoint
 * @returns Current breakpoint ('mobile' | 'tablet' | 'desktop')
 */
export const useBreakpoint = (): Breakpoint => {
  const isTablet = useMediaQuery('(min-width: 768px)');
  const isDesktop = useMediaQuery('(min-width: 1200px)');

  if (isDesktop) return 'desktop';
  if (isTablet) return 'tablet';
  return 'mobile';
};

/**
 * Hook to get responsive value based on current breakpoint
 * @param mobile Value for mobile breakpoint
 * @param tablet Value for tablet breakpoint
 * @param desktop Value for desktop breakpoint
 * @returns Value for current breakpoint
 */
export const useResponsive = <T>(mobile: T, tablet: T, desktop: T): T => {
  const [isHydrated, setIsHydrated] = useState(false);
  const breakpoint = useBreakpoint();

  useIsomorphicLayoutEffect(() => {
    setIsHydrated(true);
    return () => setIsHydrated(false);
  }, []);

  // Return mobile value until hydrated
  if (!isHydrated) return mobile;

  // Log for debugging
  if (import.meta.env.DEV) {
    /* eslint-disable no-console -- dev-only responsive breakpoint diagnostics while tuning layout behavior */
    console.groupCollapsed('[useResponsive] Debug Info');
    console.log('Current breakpoint:', breakpoint);
    console.log('Values:', { mobile, tablet, desktop });
    console.groupEnd();
    /* eslint-enable no-console */
  }

  switch (breakpoint) {
    case 'desktop':
      return desktop;
    case 'tablet':
      return tablet;
    default:
      return mobile;
  }
};
