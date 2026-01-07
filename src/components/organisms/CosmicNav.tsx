/**
 * CosmicNav - Main Navigation for Velo.Bar
 * Includes Leistungen dropdown, top-level nav items, language switcher and persistent CTA
 */

import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Button } from '@/components/atoms';
import { getNavigationRoutes } from '../../core/constants/routes';
import { LanguageSwitcher } from '@/components/atoms/LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/utils/classname';

const isLightColor = (value: string | null | undefined): boolean => {
  if (!value) return false;
  const match = value.match(/rgba?\(([^)]+)\)/);
  if (!match) return false;
  const parts = match[1].split(',').map((part) => part.trim());
  const [r = '0', g = '0', b = '0', a] = parts;
  const red = Number(r);
  const green = Number(g);
  const blue = Number(b);
  const alpha = a === undefined ? 1 : Number(a);
  if ([red, green, blue].some((channel) => Number.isNaN(channel))) return false;
  if (!Number.isNaN(alpha) && alpha <= 0.01) return false;
  const luminance = (0.2126 * red + 0.7152 * green + 0.0722 * blue) / 255;
  return luminance >= 0.6;
};

export const CosmicNav: React.FC = () => {
  // Check if we're on the warm preview page
  const isBrowser = typeof window !== 'undefined';
  const isWarmTheme =
    isBrowser &&
    (window.location.pathname.includes('/preview/warm') ||
      window.location.pathname.includes('warm'));
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hasLightBackground, setHasLightBackground] = useState(isWarmTheme);
  const headerRef = useRef<HTMLElement | null>(null);
  const { language, t } = useLanguage();

  useEffect(() => {
    if (!isBrowser) return;

    // Debounce utility
    let debounceTimeout: ReturnType<typeof setTimeout> | null = null;
    const updateNavState = () => {
      setIsScrolled(window.scrollY > 16);
      if (headerRef.current) {
        const computedColor = window.getComputedStyle(headerRef.current).backgroundColor;
        setHasLightBackground(isLightColor(computedColor));
      } else {
        setHasLightBackground(isWarmTheme);
      }
    };
    const debouncedUpdateNavState = () => {
      if (debounceTimeout) clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(updateNavState, 50);
    };

    // Force teal background on navigation
    const forceNavBackground = () => {
      if (headerRef.current) {
        headerRef.current.style.setProperty('background', '#003141', 'important');
        headerRef.current.style.setProperty('background-color', '#003141', 'important');
        headerRef.current.style.setProperty('-webkit-backdrop-filter', 'none', 'important');
        headerRef.current.style.setProperty('backdrop-filter', 'none', 'important');
      }
    };

    updateNavState();
    forceNavBackground(); // Apply immediately

    window.addEventListener('scroll', debouncedUpdateNavState, { passive: true });
    window.addEventListener('resize', updateNavState);

    // Apply again after a slight delay to override any other scripts
    const timeoutId = setTimeout(forceNavBackground, 100);

    return () => {
      window.removeEventListener('scroll', debouncedUpdateNavState);
      window.removeEventListener('resize', updateNavState);
      if (debounceTimeout) clearTimeout(debounceTimeout);
      clearTimeout(timeoutId);
    };
  }, [isBrowser, isWarmTheme]);

  // Use language-appropriate routes
  const langCode = language === 'de' ? 'DE' : 'EN';
  const navRoutes = getNavigationRoutes(langCode);

  // Filter out Anfrage, get main pages only
  const mainNavRoutes = navRoutes.filter((route) => route.id !== 'anfrage');

  // Split nav items for symmetric layout (left and right of logo)
  // Left: Preise, Galerie (+ Packages dropdown) / Right: Services link, Drinks, Über uns
  const preiseRoute = mainNavRoutes.find((route) => route.id === 'preise')!;
  const galerieRoute = mainNavRoutes.find((route) => route.id === 'galerie')!;
  const drinksRoute = mainNavRoutes.find((route) => route.id === 'menu')!;
  const aboutRoute = mainNavRoutes.find((route) => route.id === 'about')!;

  const leftNavItems = [preiseRoute, galerieRoute];
  const rightNavItems = [drinksRoute, aboutRoute];
  const showDarkLogo = !isBrowser ? true : hasLightBackground || isScrolled;
  const logoClassName = cn(
    'logo h-14 w-auto transition-colors duration-300 ease-out',
    showDarkLogo ? 'text-brand' : 'text-white',
  );

  return (
    <header
      ref={headerRef}
      className='cosmic-nav-solid border-navy-light sticky top-0 z-1100 w-full border-b bg-[#003141]'
      style={{
        backgroundColor: '#003141 !important',
        background: '#003141 !important',
        backgroundImage: 'none !important',
      }}
    >
      <Container size='default' padding='none'>
        <div className='grid h-16 grid-cols-[1fr_auto_1fr] items-center gap-x-16 px-8'>
          {/* Left Side: Language Switcher + Navigation Items */}
          <div className='hidden min-w-0 items-center justify-end gap-10 md:col-start-1 md:flex'>
            {/* Language Switcher */}
            <div className='language-switcher-wrapper bg-accent rounded-md p-0'>
              <LanguageSwitcher
                variant='compact'
                className='language-switcher bg-accent-primary text-navy-dark hover:bg-accent-primary-hover focus-visible:ring-accent-primary border border-transparent transition-colors duration-200 ease-out focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:outline-none'
              />
            </div>

            {leftNavItems.map((route) => (
              <Link
                key={route.id}
                to={route.path}
                className='text-offwhite-primary hover:text-accent-primary text-base font-semibold no-underline transition-colors duration-200 ease-out'
              >
                {route.label}
              </Link>
            ))}
          </div>

          {/* Center: Logo */}
          <Link
            to='/'
            className='col-start-2 flex shrink-0 items-center justify-center justify-self-center'
            aria-label='Velo.Bar Home'
          >
            <img src='/velo.svg' alt='Velo.Bar Logo' className={logoClassName} loading='lazy' />
          </Link>

          {/* Right Side: Navigation Items + Calendar (symmetric) */}
          <div className='hidden min-w-0 items-center justify-start gap-10 md:col-start-3 md:flex'>
            {/* Services Link */}
            <Link
              to='/leistungen'
              className='text-offwhite-primary hover:text-accent-primary text-base font-semibold no-underline transition-colors duration-200 ease-out'
            >
              {t('nav.services')}
            </Link>

            {rightNavItems.map((route) => (
              <Link
                key={route.id}
                to={route.path}
                className='text-offwhite-primary hover:text-accent-primary text-base font-semibold no-underline transition-colors duration-200 ease-out'
              >
                {route.label}
              </Link>
            ))}

            {/* CTA Button - Jetzt anfragen */}
            <Link
              to='/anfrage'
              className='bg-accent-primary hover:bg-accent-primary-hover inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold whitespace-nowrap text-white transition-colors duration-200 ease-out'
            >
              {t('nav.requestQuote')}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type='button'
            onClick={() => setMenuOpen(!menuOpen)}
            className='text-offwhite-primary hover:text-accent-primary col-start-3 inline-flex items-center justify-center justify-self-end p-0 transition-colors duration-200 ease-out md:hidden'
            aria-label={menuOpen ? 'Menü schließen' : 'Menü öffnen'}
          >
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              aria-hidden='true'
              focusable='false'
            >
              {menuOpen ? <path d='M6 18L18 6M6 6l12 12' /> : <path d='M3 12h18M3 6h18M3 18h18' />}
            </svg>
            <span className='sr-only'>{menuOpen ? 'Menü schließen' : 'Menü öffnen'}</span>
          </button>
        </div>
      </Container>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className='cosmic-nav-solid border-navy-light border-t bg-[#003141] md:hidden'
          style={{ backgroundColor: 'var(--color-teal)', background: '#003141' }}
        >
          <Container size='default' padding='default'>
            <div className='py-8'>
              {/* Mobile Language Switcher */}
              <div className='border-navy-light mb-8 border-b pb-8'>
                <LanguageSwitcher
                  variant='compact'
                  className='bg-accent-primary text-navy-dark hover:bg-accent-primary-hover focus-visible:ring-accent-primary border border-transparent transition-colors duration-200 ease-out focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:outline-none'
                />
              </div>

              {/* Mobile Nav */}
              <div className='mb-8 space-y-0'>
                <Link
                  to='/leistungen'
                  onClick={() => setMenuOpen(false)}
                  className='text-offwhite-primary hover:text-accent-primary block py-0 text-base font-semibold no-underline transition-colors duration-200 ease-out'
                >
                  {t('nav.services')}
                </Link>
                {mainNavRoutes.map((route) => (
                  <Link
                    key={route.id}
                    to={route.path}
                    onClick={() => setMenuOpen(false)}
                    className='text-offwhite-primary hover:text-accent-primary block py-0 text-base font-semibold no-underline transition-colors duration-200 ease-out'
                  >
                    {route.label}
                  </Link>
                ))}
              </div>

              {/* Mobile CTA */}
              <div className='border-navy-light border-t pt-8'>
                <Button variant='primary' size='md' className='w-full' asChild>
                  <Link to='/anfrage' onClick={() => setMenuOpen(false)}>
                    {t('nav.requestQuote')}
                  </Link>
                </Button>
              </div>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
};

export default CosmicNav;
