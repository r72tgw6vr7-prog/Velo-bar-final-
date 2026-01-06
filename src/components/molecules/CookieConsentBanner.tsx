/**
 * CookieConsentBanner Component
 * ======================
 * GDPR compliant cookie consent banner with preference settings
 */

import { useState, useEffect } from 'react';
import { cn } from '../../utils/classname';
import type { PageType } from '../../types/page-types';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { Button } from '../atoms';

interface CookieConsentBannerProps {
  onNavigate: (page: PageType) => void;
}

export interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

export const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({ onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true, // Always true, cannot be disabled
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already consented
    const storedConsent = localStorage.getItem('cookieConsent');
    if (!storedConsent) {
      setIsVisible(true);
    } else {
      try {
        const parsed = JSON.parse(storedConsent);
        setPreferences(parsed);
      } catch {
        setIsVisible(true);
      }
    }
  }, []);

  const handleAcceptAll = () => {
    const consent = {
      essential: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('cookieConsent', JSON.stringify(consent));
    setIsVisible(false);
    window.dispatchEvent(new CustomEvent('cookieConsentUpdated', { detail: consent }));
  };

  const handleRejectAll = () => {
    const consent = {
      essential: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('cookieConsent', JSON.stringify(consent));
    setIsVisible(false);
    window.dispatchEvent(new CustomEvent('cookieConsentUpdated', { detail: consent }));
  };

  const handleSavePreferences = () => {
    const consent = {
      ...preferences,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('cookieConsent', JSON.stringify(consent));
    setIsVisible(false);
    setShowPreferences(false);
    window.dispatchEvent(new CustomEvent('cookieConsentUpdated', { detail: consent }));
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Main Banner */}
      <div
        className={cn(
          'fixed right-0 bottom-0 left-0',
          'bg-navy',
          'border-accent-primary/20 border-t',
          'p-4 md:p-6 lg:p-8',
          'z-(--z-toast)',
        )}
      >
        <div className={cn('mx-auto max-w-6xl')}>
          <div
            className={cn(
              'flex flex-col md:flex-row',
              'items-start md:items-center',
              'justify-between gap-4 md:gap-8',
            )}
          >
            <div className={cn('flex-1')}>
              <h2 className={cn('font-headline text-xl', 'text-accent-primary mb-2')}>
                Cookie-Einstellungen
              </h2>
              <p className={cn('text-sm text-white', 'mb-6 md:mb-0', 'font-body')}>
                Wir verwenden Cookies, um Ihnen die bestmögliche Erfahrung auf unserer Website zu
                bieten. Essentielle Cookies sind für die Grundfunktionen erforderlich. Optional
                können Sie Analyse- und Marketing-Cookies zulassen.{' '}
                <button
                  onClick={() => onNavigate('datenschutz')}
                  className={cn(
                    'text-accent-primary',
                    'hover:text-accent-primary-hover',
                    'underline',
                    'transition-colors duration-200',
                  )}
                >
                  Mehr erfahren
                </button>
              </p>
            </div>
            <div
              className={cn(
                'flex flex-col sm:flex-row',
                'gap-2 sm:gap-4', // 8pt grid: was sm:gap-3 (12px)
                'w-full md:w-auto',
              )}
            >
              <Button
                variant='outline'
                onClick={() => setShowPreferences(true)}
                className={cn('justify-center whitespace-nowrap')}
              >
                Anpassen
              </Button>
              <Button
                variant='secondary'
                onClick={handleRejectAll}
                className={cn('justify-center whitespace-nowrap')}
              >
                Ablehnen
              </Button>
              <Button
                variant='primary'
                onClick={handleAcceptAll}
                className={cn('justify-center whitespace-nowrap')}
              >
                Alle akzeptieren
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Preferences Dialog */}
      <Dialog.Root open={showPreferences} onOpenChange={setShowPreferences}>
        <Dialog.Portal>
          <Dialog.Overlay className={cn('fixed inset-0', 'bg-deep-black-50', 'z-z-overlay')} />
          <Dialog.Content
            className={cn(
              'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
              'w-[calc(100%-2rem)] max-w-lg',
              'bg-deep-black',
              'border-color-text-primary-20 border',
              'rounded-xl p-4 md:p-8',
              'z-z-modal',
              'max-h-[90vh] overflow-y-auto',
              'shadow-shadow-primary-soft',
            )}
          >
            <div className={cn('mb-6 flex items-center justify-between md:mb-8')}>
              <Dialog.Title
                className={cn('text-xl md:text-2xl', 'font-headline', 'text-accent-primary')}
              >
                Cookie-Einstellungen
              </Dialog.Title>
              <Dialog.Close asChild>
                <button
                  className={cn(
                    'text-text-secondary',
                    'hover:text-text-primary',
                    'transition-colors duration-200',
                    'rounded-full p-1',
                    'hover:bg-deep-black-20',
                  )}
                  aria-label='Schließen'
                >
                  <X size={24} aria-hidden='true' focusable='false' />
                  <span className='sr-only'>Schließen</span>
                </button>
              </Dialog.Close>
            </div>

            <div className={cn('space-y-6 md:space-y-8')}>
              {/* Essential Cookies */}
              <div className={cn('p-4 md:p-6', 'bg-surface-dark', 'rounded-lg')}>
                <div className={cn('mb-2 flex items-center justify-between')}>
                  <h3 className={cn('font-headline text-lg', 'text-accent-primary')}>
                    Essentielle Cookies
                  </h3>
                  <input
                    type='checkbox'
                    checked={preferences.essential}
                    disabled
                    aria-label='Essentielle Cookies'
                    className={cn(
                      'h-5 w-5 rounded',
                      'border-text-tertiary',
                      'accent-accent-primary',
                    )}
                  />
                </div>
                <p className={cn('text-text-secondary text-sm', 'font-body')}>
                  Diese Cookies sind für die Grundfunktionen der Website erforderlich und können
                  nicht deaktiviert werden.
                </p>
              </div>

              {/* Analytics Cookies */}
              <div className={cn('p-4 md:p-6', 'bg-surface-dark', 'rounded-lg')}>
                <div className={cn('mb-2 flex items-center justify-between')}>
                  <h3 className={cn('font-headline text-lg', 'text-accent-primary')}>
                    Analyse-Cookies
                  </h3>
                  <input
                    type='checkbox'
                    checked={preferences.analytics}
                    onChange={(e) =>
                      setPreferences({ ...preferences, analytics: e.target.checked })
                    }
                    aria-label='Analyse-Cookies'
                    className={cn(
                      'h-5 w-5 rounded',
                      'border-text-tertiary',
                      'accent-accent-primary',
                    )}
                  />
                </div>
                <p className={cn('text-text-secondary text-sm', 'font-body')}>
                  Diese Cookies ermöglichen es uns, die Nutzung der Website zu analysieren und zu
                  verbessern.
                </p>
              </div>

              {/* Marketing Cookies */}
              <div className={cn('p-4 md:p-6', 'bg-surface-dark', 'rounded-lg')}>
                <div className={cn('mb-2 flex items-center justify-between')}>
                  <h3 className={cn('font-headline text-lg', 'text-accent-primary')}>
                    Marketing-Cookies
                  </h3>
                  <input
                    type='checkbox'
                    checked={preferences.marketing}
                    onChange={(e) =>
                      setPreferences({ ...preferences, marketing: e.target.checked })
                    }
                    aria-label='Marketing-Cookies'
                    className={cn(
                      'h-5 w-5 rounded',
                      'border-text-tertiary',
                      'accent-accent-primary',
                    )}
                  />
                </div>
                <p className={cn('text-text-secondary text-sm', 'font-body')}>
                  Diese Cookies werden verwendet, um Ihnen personalisierte Werbung anzuzeigen.
                </p>
              </div>
            </div>

            <div
              className={cn(
                'flex justify-end',
                'mt-6 gap-4 md:mt-8', // 8pt grid: was gap-3 (12px)
              )}
            >
              <Dialog.Close asChild>
                <Button variant='secondary'>Abbrechen</Button>
              </Dialog.Close>
              <Button variant='primary' onClick={handleSavePreferences}>
                Einstellungen speichern
              </Button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
};
