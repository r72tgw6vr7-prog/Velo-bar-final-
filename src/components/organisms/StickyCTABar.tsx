/**
 * StickyCTABar
 * ============
 * Persistent bottom CTA bar with phone/WhatsApp click-to-call
 * "Kostenloses Angebot in 2 Stunden"
 */

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Phone, MessageCircle, X } from 'lucide-react';
import { cn } from '@/utils/classname';

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

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hallo! Ich interessiere mich für ein Event mit der Velo.Bar.')}`;
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
              <p className='truncate text-sm font-semibold text-gray-900 sm:text-base'>
                Kostenloses Angebot in 2 Stunden
              </p>
              <p className='hidden text-xs text-gray-500 sm:block sm:text-sm'>
                Jetzt anrufen oder per WhatsApp kontaktieren
              </p>
            </div>

            {/* Right: Action buttons */}
            <div className='flex shrink-0 items-center gap-0 sm:gap-0'>
              {/* Phone button */}
              <a
                href={phoneLink}
                className={cn(
                  'inline-flex items-center justify-center gap-2',
                  'rounded-full px-4 py-2',
                  'bg-accent-primary hover:bg-accent-primary-hover text-navy-dark shadow-brand hover:shadow-brand-hover',
                  'text-sm font-medium',
                  'transition-all duration-200',
                  'focus:ring-accent-primary focus:ring-2 focus:ring-offset-2 focus:outline-none',
                )}
                aria-label='Anrufen'
              >
                <Phone size={18} aria-hidden='true' focusable='false' />
                <span className='hidden sm:inline'>Anrufen</span>
              </a>

              {/* WhatsApp button */}
              <a
                href={whatsappLink}
                target='_blank'
                rel='noopener noreferrer'
                className={cn(
                  'inline-flex items-center justify-center gap-2',
                  'rounded-full px-4 py-2',
                  'bg-[#25D366] text-white hover:bg-[#20BD5A]',
                  'text-sm font-medium',
                  'transition-all duration-200',
                  'focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 focus:outline-none',
                )}
                aria-label='WhatsApp'
              >
                <MessageCircle size={18} aria-hidden='true' focusable='false' />
                <span className='hidden sm:inline'>WhatsApp</span>
              </a>

              {/* Close button */}
              <button
                onClick={() => setIsVisible(false)}
                className={cn(
                  'rounded-full p-2',
                  'text-gray-400 hover:bg-gray-100 hover:text-gray-600',
                  'transition-colors duration-200',
                  'focus:ring-2 focus:ring-gray-300 focus:outline-none',
                )}
                aria-label='Schließen'
              >
                <X size={18} aria-hidden='true' focusable='false' />
                <span className='sr-only'>Schließen</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyCTABar;
