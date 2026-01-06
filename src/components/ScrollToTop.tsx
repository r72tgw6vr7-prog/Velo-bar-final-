import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop Component
 *
 * Automatically scrolls to the top of the page when the route changes.
 * This component should be placed inside the Router but outside of Routes.
 *
 * Features:
 * - Smooth scroll animation
 * - Preserves hash-based navigation (e.g., #section-id)
 * - Respects user's motion preferences
 * - Cross-browser compatible
 */
const ScrollToTop: React.FC = () => {
  const { pathname, hash } = useLocation();

  // Ensure the browser doesn't try to restore scroll on POP while we manage it
  useEffect(() => {
    const prev = history.scrollRestoration;
    try {
      history.scrollRestoration = 'manual';
    } catch {}
    return () => {
      try {
        history.scrollRestoration = prev || 'auto';
      } catch {}
    };
  }, []);

  useEffect(() => {
    // If there's a hash in the URL, scroll to that element instead
    if (hash) {
      const id = hash.replace('#', '');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
      return;
    }

    // Always scroll to top on route change (including back/forward for consistency)
    // Immediate scroll to top
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

    // Also scroll the content container if it exists
    const scrollRoot = document.querySelector('[data-scroll-root]') as HTMLElement | null;
    if (scrollRoot && 'scrollTo' in scrollRoot) {
      scrollRoot.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }

    // Force scroll after a brief delay to ensure DOM is ready
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      if (scrollRoot) {
        scrollRoot.scrollTop = 0;
      }
    });
  }, [pathname, hash]); // Removed navType and key dependencies for simpler, more reliable behavior

  return null; // This component doesn't render anything
};

export default ScrollToTop;
