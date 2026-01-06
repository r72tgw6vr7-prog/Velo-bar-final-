import { useEffect } from 'react';

/**
 * PWAConfiguration Component
 * Handles Progressive Web App configuration and service worker registration
 */
const PWAConfiguration = () => {
  useEffect(() => {
    // Register service worker if available
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((registration) => {
            if (import.meta.env.DEV) {
              // eslint-disable-next-line no-console -- dev-only log confirming service worker registration
              console.log('SW registered: ', registration);
            }
          })
          .catch((registrationError) => {
            if (import.meta.env.DEV) {
              // eslint-disable-next-line no-console -- dev-only log for troubleshooting failed service worker registration
              console.log('SW registration failed: ', registrationError);
            }
          });
      });
    }

    // Handle PWA install prompt
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      // Store the event for later use if needed
      // window.deferredPrompt = e;
    });
  }, []);

  return null; // This component doesn't render anything
};

export default PWAConfiguration;
