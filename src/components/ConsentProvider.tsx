import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext.tsx';

/* eslint-disable no-console -- consent provider logs GA4 initialization/disable and consent parse issues for diagnostics */

interface ConsentState {
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
  hasConsented: boolean;
}

interface ConsentContextValue {
  consent: ConsentState;
  updateConsent: (newConsent: Partial<ConsentState>) => void;
  showBanner: boolean;
  acceptAll: () => void;
  acceptNecessary: () => void;
  openSettings: () => void;
  closeSettings: () => void;
  settingsOpen: boolean;
}

const ConsentContext = createContext<ConsentContextValue | null>(null);

const CONSENT_STORAGE_KEY = 'velobar-cookie-consent';

const defaultConsent: ConsentState = {
  analytics: false,
  marketing: false,
  functional: true, // Always true for necessary cookies
  hasConsented: false,
};

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = useState<ConsentState>(defaultConsent);
  const [showBanner, setShowBanner] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Load consent from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (stored) {
      try {
        const parsedConsent = JSON.parse(stored);
        setConsent(parsedConsent);

        // Initialize GA4 if analytics consent given
        if (parsedConsent.analytics) {
          initializeAnalytics();
        }
      } catch (error) {
        console.warn('Failed to parse stored consent:', error);
        setShowBanner(true);
      }
    } else {
      setShowBanner(true);
    }
  }, []);

  const updateConsent = (newConsent: Partial<ConsentState>) => {
    const updatedConsent = { ...consent, ...newConsent, hasConsented: true };
    setConsent(updatedConsent);
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(updatedConsent));
    setShowBanner(false);

    // Initialize/cleanup analytics based on consent
    if (updatedConsent.analytics && !consent.analytics) {
      initializeAnalytics();
    } else if (!updatedConsent.analytics && consent.analytics) {
      disableAnalytics();
    }
  };

  const acceptAll = () => {
    updateConsent({
      analytics: true,
      marketing: true,
      functional: true,
    });
  };

  const acceptNecessary = () => {
    updateConsent({
      analytics: false,
      marketing: false,
      functional: true,
    });
  };

  const openSettings = () => setSettingsOpen(true);
  const closeSettings = () => setSettingsOpen(false);

  return (
    <ConsentContext.Provider
      value={{
        consent,
        updateConsent,
        showBanner,
        acceptAll,
        acceptNecessary,
        openSettings,
        closeSettings,
        settingsOpen,
      }}
    >
      {children}
      {showBanner && <CookieBanner />}
      {settingsOpen && <CookieSettings />}
    </ConsentContext.Provider>
  );
}

export function useConsent() {
  const context = useContext(ConsentContext);
  if (!context) {
    throw new Error('useConsent must be used within ConsentProvider');
  }
  return context;
}

// Initialize GA4 only after consent
function initializeAnalytics() {
  const measurementId = import.meta.env.VITE_GA4_MEASUREMENT_ID;
  if (!measurementId) return;

  // Load gtag script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) {
    window.dataLayer.push(args);
  }
  window.gtag = gtag;

  gtag('consent', 'default', {
    analytics_storage: 'granted',
    ad_storage: 'denied',
  });

  gtag('config', measurementId, {
    anonymize_ip: true,
    cookie_flags: 'SameSite=None;Secure',
  });

  console.log('[Analytics] GA4 initialized with consent');
}

function disableAnalytics() {
  // Update consent
  if (window.gtag) {
    window.gtag('consent', 'update', {
      analytics_storage: 'denied',
    });
  }

  // Remove GA cookies
  document.cookie.split(';').forEach((cookie) => {
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    if (name.trim().startsWith('_ga')) {
      // Add Secure attribute for HTTPS security
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;Secure;SameSite=Lax`;
    }
  });

  console.log('🚫 GA4 Analytics disabled');
}

// Cookie Banner Component
function CookieBanner() {
  const { acceptAll, acceptNecessary, openSettings } = useConsent();
  const { t } = useLanguage();

  return (
    <div className='fixed right-0 bottom-0 left-0 z-50 border-t border-neutral-700 bg-neutral-900 p-8'>
      <div className='mx-auto max-w-6xl'>
        <div className='flex flex-col items-start gap-8 md:flex-row md:items-center'>
          <div className='flex-1'>
            <p className='text-sm text-white'>
              {t('cookieConsent.description')}{' '}
              <button
                onClick={openSettings}
                className='text-accent-primary hover:text-accent-primary-light ml-0 underline transition duration-200 ease-out'
              >
                {t('cookieConsent.customize')}
              </button>
            </p>
          </div>
          <div className='flex gap-0'>
            <button
              onClick={acceptNecessary}
              className='rounded border border-neutral-600 px-8 py-0 text-sm text-white transition duration-200 ease-out hover:bg-neutral-800'
            >
              {t('cookieConsent.rejectAll')}
            </button>
            <button
              onClick={acceptAll}
              className='bg-accent-primary text-navy-dark hover:bg-accent-primary-hover rounded px-3 py-2 text-sm font-medium transition duration-200 ease-out'
            >
              {t('cookieConsent.acceptAll')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Cookie Settings Modal
function CookieSettings() {
  const { consent, updateConsent, closeSettings } = useConsent();
  const { t } = useLanguage();
  const [tempConsent, setTempConsent] = useState(consent);

  const handleSave = () => {
    updateConsent(tempConsent);
    closeSettings();
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-8'>
      <div className='w-full max-w-md rounded-lg bg-neutral-900 p-8'>
        <h2 className='mb-8 text-xl font-semibold text-white'>{t('cookieConsent.title')}</h2>

        <div className='space-y-8'>
          <div className='flex items-center justify-between'>
            <div>
              <h3 className='font-medium text-white'>{t('cookieConsent.essential.title')}</h3>
              <p className='text-sm text-neutral-400'>
                {t('cookieConsent.essential.description')}
              </p>
            </div>
            <input
              type='checkbox'
              checked={true}
              disabled
              aria-label={t('cookieConsent.essential.title')}
              className='h-5 w-5'
            />
          </div>

          <div className='flex items-center justify-between'>
            <div>
              <h3 className='font-medium text-white'>{t('cookieConsent.analytics.title')}</h3>
              <p className='text-sm text-neutral-400'>
                {t('cookieConsent.analytics.description')}
              </p>
            </div>
            <input
              type='checkbox'
              checked={tempConsent.analytics}
              onChange={(e) => setTempConsent((prev) => ({ ...prev, analytics: e.target.checked }))}
              aria-label={t('cookieConsent.analytics.title')}
              className='h-5 w-5'
            />
          </div>

          <div className='flex items-center justify-between'>
            <div>
              <h3 className='font-medium text-white'>{t('cookieConsent.marketing.title')}</h3>
              <p className='text-sm text-neutral-400'>
                {t('cookieConsent.marketing.description')}
              </p>
            </div>
            <input
              type='checkbox'
              checked={tempConsent.marketing}
              onChange={(e) => setTempConsent((prev) => ({ ...prev, marketing: e.target.checked }))}
              aria-label={t('cookieConsent.marketing.title')}
              className='h-5 w-5'
            />
          </div>
        </div>

        <div className='mt-8 flex gap-0'>
          <button
            onClick={closeSettings}
            className='flex-1 rounded border border-neutral-600 px-8 py-0 text-white transition duration-200 ease-out hover:bg-neutral-800'
          >
            {t('cookieConsent.cancel')}
          </button>
          <button
            onClick={handleSave}
            className='bg-accent-primary text-navy-dark hover:bg-accent-primary-hover flex-1 rounded px-3 py-2 font-medium transition duration-200 ease-out'
          >
            {t('cookieConsent.save')}
          </button>
        </div>
      </div>
    </div>
  );
}

// Extend window type for gtag
declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}
