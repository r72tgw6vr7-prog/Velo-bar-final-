/**
 * StickyCTABar
 * ============
 * Persistent bottom CTA bar with phone/WhatsApp click-to-call
 * "Kostenloses Angebot in 2 Stunden"
 */

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Phone from 'lucide-react/dist/esm/icons/phone';
import MessageCircle from 'lucide-react/dist/esm/icons/message-circle';
import X from 'lucide-react/dist/esm/icons/x';
import { cn } from '@/utils/classname.ts';
import { useLanguage } from '@/contexts/LanguageContext.tsx';

interface StickyCTABarProps {
  phoneNumber?: string;
  whatsappNumber?: string;
  className?: string;
}

export const StickyCTABar: React.FC<StickyCTABarProps> = ({
  phoneNumber = '+49 123 456 7890',
  whatsappNumber = '49123456789',
  className,
}) => {
  const location = useLocation();
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);

  // Hide on contact/anfrage page (it has its own CTA section)
  const hiddenRoutes = ['/anfrage', '/kontakt', '/contact'];
  const isHiddenRoute = hiddenRoutes.some((route) => location.pathname.startsWith(route));

  // Show bar after scrolling past hero section
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setHasScrolled(scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible || isHiddenRoute) return null;

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(t('stickyCta.whatsappMessage'))}`;
  const phoneLink = `tel:${phoneNumber.replace(/\s/g, '')}`;

  return (
    <div
      className={cn(
        'fixed right-0 bottom-0 left-0 z-50',
        'transform transition-transform duration-300 ease-out',
        hasScrolled ? 'translate-y-0' : 'translate-y-full',
        className,
      )}
    >
      {/* Main bar */}
      <div className='bg-navy border-t border-white/10 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]'>
        <div className='mx-auto max-w-7xl px-8 py-0'>
          <div className='flex items-center justify-between gap-8'>
            {/* Left: Message */}
            <div className='min-w-0 flex-1'>
              <p className='truncate text-sm font-semibold text-white sm:text-base'>
                {t('stickyCta.headline')}
              </p>
              <p className='hidden text-xs text-white/90 sm:block sm:text-sm'>
                {t('stickyCta.subline')}
              </p>
            </div>

            {/* Right: Action buttons */}
            <div className='flex shrink-0 items-center gap-0 sm:gap-0'>
              {/* Phone button */}
              <a
                href={phoneLink}
                className={cn(
                  'inline-flex items-center justify-center gap-2 badge-cta',
                  'rounded-full px-4 py-2',
                  'bg-accent-primary hover:bg-accent-primary-hover text-navy-dark shadow-brand hover:shadow-brand-hover',
                  'text-sm font-medium',
                  'transition-all duration-200',
                  'focus:ring-accent-primary focus:ring-2 focus:ring-offset-2 focus:outline-none',
                )}
                aria-label={t('stickyCta.call')}
              >
                <Phone size={18} aria-hidden='true' focusable='false' />
                <span className='hidden sm:inline'>{t('stickyCta.call')}</span>
              </a>

              {/* WhatsApp button */}
              <a
                href={whatsappLink}
                target='_blank'
                rel='noopener noreferrer'
                className={cn(
                  'inline-flex items-center justify-center gap-2 badge-cta',
                  'rounded-full px-4 py-2',
                  'bg-[#25D366] text-white hover:bg-[#20BD5A]',
                  'text-sm font-medium',
                  'transition-all duration-200',
                  'focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 focus:outline-none',
                )}
                aria-label={t('stickyCta.whatsapp')}
              >
                <MessageCircle size={18} aria-hidden='true' focusable='false' />
                <span className='hidden sm:inline'>{t('stickyCta.whatsapp')}</span>
              </a>

              {/* Close button */}
              <button
                onClick={() => setIsVisible(false)}
                className={cn(
                  'rounded-full p-2',
                  'text-white/60 hover:bg-white/10 hover:text-white',
                  'transition-colors duration-200',
                  'focus:ring-2 focus:ring-white/30 focus:outline-none',
                )}
                aria-label={t('stickyCta.close')}
              >
                <X size={18} aria-hidden='true' focusable='false' />
                <span className='sr-only'>{t('stickyCta.close')}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyCTABar;
