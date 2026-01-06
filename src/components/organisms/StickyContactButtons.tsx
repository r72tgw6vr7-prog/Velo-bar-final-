/**
 * StickyContactButtons - Floating CTA Buttons
 * ============================================
 * Sticky buttons for instant contact:
 * - WhatsApp chat button
 * - Phone call button
 * - Scroll to top (optional)
 *
 * Positioned bottom-right, always visible
 */

import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, X, ArrowUp } from 'lucide-react';

interface StickyContactButtonsProps {
  phoneNumber?: string;
  whatsappNumber?: string;
  showScrollTop?: boolean;
}

export const StickyContactButtons: React.FC<StickyContactButtonsProps> = ({
  phoneNumber = '+4916094623196',
  whatsappNumber = '4916094623196',
  showScrollTop = true,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hallo! Ich interessiere mich für Ihre mobile Cocktailbar. Können Sie mir ein Angebot machen?')}`;

  return (
    <div className='fixed right-6 bottom-6 z-50 flex flex-col items-end gap-0'>
      {/* Scroll to top button */}
      {showScrollTop && showScrollButton && (
        <button
          onClick={scrollToTop}
          className='flex h-12 w-12 items-center justify-center rounded-full bg-gray-800 text-white shadow-lg transition transition-all duration-200 ease-out hover:bg-gray-700'
          aria-label='Nach oben scrollen'
        >
          <ArrowUp size={20} aria-hidden='true' focusable='false' />
          <span className='sr-only'>Nach oben scrollen</span>
        </button>
      )}

      {/* Expanded contact options */}
      {isExpanded && (
        <div className='animate-in fade-in slide-in-from-bottom-2 flex flex-col gap-0 duration-200'>
          {/* Phone button */}
          <a
            href={`tel:${phoneNumber}`}
            className='bg-navy-light u-elevation-3 group flex items-center gap-0 rounded-full border border-white/10 py-0 pr-8 pl-8 transition transition-all duration-200 ease-out'
          >
            <div className='bg-accent-primary flex h-10 w-10 items-center justify-center rounded-full'>
              <Phone className='text-white' size={18} aria-hidden='true' focusable='false' />
            </div>
            <div className='text-left'>
              <div className='text-xs text-gray-500'>Jetzt anrufen</div>
              <div className='group-hover:text-accent-primary font-semibold text-gray-900 transition transition-colors duration-200 ease-out'>
                +49 160 94623196
              </div>
            </div>
          </a>

          {/* WhatsApp button */}
          <a
            href={whatsappUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='bg-navy-light u-elevation-3 group flex items-center gap-0 rounded-full border border-white/10 py-0 pr-8 pl-8 transition transition-all duration-200 ease-out'
          >
            <div className='flex h-10 w-10 items-center justify-center rounded-full bg-green-500'>
              <svg
                viewBox='0 0 24 24'
                className='h-5 w-5 fill-white'
                aria-hidden='true'
                focusable='false'
              >
                <path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z' />
              </svg>
            </div>
            <div className='text-left'>
              <div className='text-xs text-gray-500'>Sofortangebot per Chat</div>
              <div className='font-semibold text-gray-900 transition transition-colors duration-200 ease-out group-hover:text-green-600'>
                WhatsApp
              </div>
            </div>
          </a>
        </div>
      )}

      {/* Main toggle button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all ${
          isExpanded
            ? 'bg-gray-800 hover:bg-gray-700'
            : 'animate-pulse bg-green-500 hover:animate-none hover:bg-green-600'
        }`}
        aria-label={isExpanded ? 'Kontakt schließen' : 'Kontakt öffnen'}
      >
        {isExpanded ? (
          <X className='text-white' size={24} aria-hidden='true' focusable='false' />
        ) : (
          <MessageCircle className='text-white' size={24} aria-hidden='true' focusable='false' />
        )}
        <span className='sr-only'>{isExpanded ? 'Kontakt schließen' : 'Kontakt öffnen'}</span>
      </button>

      {/* Tooltip for collapsed state */}
      {!isExpanded && (
        <div className='pointer-events-none absolute right-0 bottom-16 rounded-lg bg-gray-900 px-0 py-2 text-xs whitespace-nowrap text-white opacity-0 transition transition-opacity duration-200 ease-out hover:opacity-100'>
          Sofortangebot per Chat
        </div>
      )}
    </div>
  );
};

export default StickyContactButtons;
