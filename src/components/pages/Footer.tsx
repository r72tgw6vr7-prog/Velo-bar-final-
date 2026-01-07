/**
 * Footer Component
 * ==============
 * Professional footer with:
 * - Navigation links
 * - Social icons
 * - Copyright
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/classname.ts';

// Navigation links - organized by category
const navLinks = {
  services: [
    { text: 'Firmenfeiern', href: '/firmenfeiern' },
    { text: 'Weihnachtsfeiern', href: '/weihnachtsfeiern' },
    { text: 'Messe-Catering', href: '/messe-catering' },
    { text: 'Private Feiern', href: '/private-feiern' },
  ],
  info: [
    { text: 'Über uns', href: '/about' },
    { text: 'Preise', href: '/preise' },
    { text: 'Galerie', href: '/galerie' },
    { text: 'FAQ', href: '/faq' },
  ],
  legal: [
    { text: 'Impressum', href: '/impressum' },
    { text: 'Datenschutz', href: '/datenschutz' },
  ],
};

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  return (
    <footer
      className={cn(
        'site-footer w-full',
        'text-(--color-text-on-dark) md:text-(--navy-primary)',
        'bg-(--color-teal) md:bg-[rgb(255,248,236)]',
        'border-t border-(--navy-light) md:border-[rgba(238,120,104,0.35)]',
        className,
      )}
      role='contentinfo'
      aria-label='Site footer'
    >
      <div className='site-footer__content mx-auto max-w-6xl px-4 py-12 md:px-8 md:py-16 lg:py-20'>
        {/* Completely restructured footer layout */}
        <div className='flex flex-col items-center text-center md:flex-row md:items-start md:justify-between md:text-left'>
          {/* LEFT: large logo only - standalone */}
          <div className='mb-12 flex justify-center md:mb-0 md:w-1/4 md:justify-start'>
            <Link to='/' className='inline-flex'>
              <img src='/velo.svg' alt='Velo.Bar Logo' className='h-28 w-auto md:h-32 lg:h-36' />
            </Link>
          </div>

          {/* RIGHT: Three properly spaced columns */}
          <div className='flex flex-col items-center gap-(--space-lg) md:w-2/3 md:flex-row md:items-start md:justify-between md:gap-0 md:space-x-12 lg:space-x-20 xl:space-x-24'>
            {/* Leistungen */}
            <div className='mb-0'>
              <h3 className='text-xs font-semibold tracking-[0.16em] text-(--orange-primary) uppercase md:text-sm'>
                Leistungen
              </h3>
              <ul className='mt-4 space-y-2 text-sm md:text-base'>
                {navLinks.services.map((link) => (
                  <li key={link.text}>
                    <Link
                      to={link.href}
                      className={cn(
                        'hover:text-(--orange-primary)',
                        'transition-colors duration-200',
                      )}
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Informationen */}
            <div className='mb-0'>
              <h3 className='text-xs font-semibold tracking-[0.16em] text-(--orange-primary) uppercase md:text-sm'>
                Informationen
              </h3>
              <ul className='mt-4 space-y-2 text-sm md:text-base'>
                {navLinks.info.map((link) => (
                  <li key={link.text}>
                    <Link
                      to={link.href}
                      className={cn(
                        'hover:text-(--orange-primary)',
                        'transition-colors duration-200',
                      )}
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Rechtliches */}
            <div>
              <h3 className='text-xs font-semibold tracking-[0.16em] text-(--orange-primary) uppercase md:text-sm'>
                Rechtliches
              </h3>
              <ul className='mt-4 space-y-2 text-sm md:text-base'>
                {navLinks.legal.map((link) => (
                  <li key={link.text}>
                    <Link
                      to={link.href}
                      className={cn(
                        'hover:text-(--orange-primary)',
                        'transition-colors duration-200',
                      )}
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className='md:border-opacity-20 flex flex-col items-center justify-between gap-8 border-t border-(--navy-light) pt-8 text-center md:flex-row md:border-(--orange-primary) md:text-left'>
        <p className='text-sm text-(--color-text-on-dark) md:text-(--navy-primary)'>
          © {new Date().getFullYear()} Velo.Bar. Alle Rechte vorbehalten.
        </p>

        <div className='flex items-center gap-8 text-sm text-(--color-text-on-dark) md:text-(--navy-primary)'>
          <span>🍸 Made with love in München & Coburg</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
