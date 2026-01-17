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
import { useLanguage } from '@/contexts/LanguageContext.tsx';

// Navigation links - organized by category
const navLinks = {
  services: [
    { key: 'nav.corporateEvents', href: '/firmenfeiern' },
    { key: 'nav.christmasParties', href: '/weihnachtsfeiern' },
    { key: 'nav.tradeShows', href: '/messe-catering' },
    { key: 'nav.privateEvents', href: '/private-feiern' },
  ],
  info: [
    { key: 'nav.about', href: '/about' },
    { key: 'nav.pricing', href: '/preise' },
    { key: 'nav.gallery', href: '/galerie' },
    { key: 'nav.faq', href: '/faq' },
  ],
  legal: [
    { key: 'footer.imprint', href: '/impressum' },
    { key: 'footer.privacy', href: '/datenschutz' },
  ],
};

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  const { t } = useLanguage();

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
      aria-label={t('footer.ariaLabel')}
      itemScope
      itemType='https://schema.org/LocalBusiness'
    >
      <div className='site-footer__content mx-auto max-w-6xl px-4 py-12 md:px-8 md:py-16 lg:py-20'>
        {/* Completely restructured footer layout */}
        <div className='flex flex-col items-center text-center md:flex-row md:items-start md:justify-between md:text-left'>
          {/* LEFT: large logo only - standalone */}
          <div className='mb-12 flex flex-col justify-center md:mb-0 md:w-1/4 md:justify-start'>
            <Link to='/' className='inline-flex mb-6'>
              <img
                src='/velo.svg'
                alt={t('common.logoAlt')}
                className='h-28 w-auto md:h-32 lg:h-36'
                itemProp='logo'
              />
            </Link>
            {/* SEO: LocalBusiness microdata in footer */}
            <div className='text-xs md:text-sm space-y-2'>
              <div itemProp='name' className='font-semibold hidden'>
                {t('footer.businessName')}
              </div>
              <div itemProp='address' itemScope itemType='https://schema.org/PostalAddress'>
                <div>
                  <span itemProp='streetAddress'>{t('footer.streetAddress')}</span>
                </div>
                <div>
                  <span itemProp='postalCode'>{t('footer.postalCode')}</span>{' '}
                  <span itemProp='addressLocality'>{t('footer.addressLocality')}</span>
                </div>
              </div>
              <div>
                {t('footer.telPrefix')}{' '}
                <a
                  href='tel:+4916094623196'
                  itemProp='telephone'
                  className='hover:text-(--orange-primary) transition-colors'
                >
                  {t('footer.phone')}
                </a>
              </div>
              <div>
                <a
                  href='mailto:hallo@velo-bar.com'
                  itemProp='email'
                  className='hover:text-(--orange-primary) transition-colors'
                >
                  {t('footer.email')}
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT: Three properly spaced columns */}
          <div className='flex flex-col items-center gap-(--space-lg) md:w-2/3 md:flex-row md:items-start md:justify-between md:gap-0 md:space-x-12 lg:space-x-20 xl:space-x-24'>
            {/* Leistungen */}
            <div className='mb-0'>
              <h3 className='text-xs font-semibold tracking-[0.16em] text-(--orange-primary) uppercase md:text-sm'>
                {t('footer.servicesTitle')}
              </h3>
              <ul className='mt-4 space-y-2 text-sm md:text-base'>
                {navLinks.services.map((link) => (
                  <li key={link.key}>
                    <Link
                      to={link.href}
                      className={cn(
                        'hover:text-(--orange-primary)',
                        'transition-colors duration-200',
                      )}
                    >
                      {t(link.key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Informationen */}
            <div className='mb-0'>
              <h3 className='text-xs font-semibold tracking-[0.16em] text-(--orange-primary) uppercase md:text-sm'>
                {t('footer.infoTitle')}
              </h3>
              <ul className='mt-4 space-y-2 text-sm md:text-base'>
                {navLinks.info.map((link) => (
                  <li key={link.key}>
                    <Link
                      to={link.href}
                      className={cn(
                        'hover:text-(--orange-primary)',
                        'transition-colors duration-200',
                      )}
                    >
                      {t(link.key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Rechtliches */}
            <div>
              <h3 className='text-xs font-semibold tracking-[0.16em] text-(--orange-primary) uppercase md:text-sm'>
                {t('footer.legalTitle')}
              </h3>
              <ul className='mt-4 space-y-2 text-sm md:text-base'>
                {navLinks.legal.map((link) => (
                  <li key={link.key}>
                    <Link
                      to={link.href}
                      className={cn(
                        'hover:text-(--orange-primary)',
                        'transition-colors duration-200',
                      )}
                    >
                      {t(link.key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className='md:border-opacity-20 mx-auto max-w-6xl flex flex-col items-center justify-between gap-8 border-t border-(--navy-light) px-4 pb-8 pt-8 text-center md:flex-row md:border-(--orange-primary) md:px-8 md:text-left'>
        <p className='text-sm text-(--color-text-on-dark) md:text-(--navy-primary)'>
          © {new Date().getFullYear()} Velo.Bar. {t('footer.rightsReserved')}
        </p>

        <div className='flex items-center gap-8 text-sm text-(--color-text-on-dark) md:text-(--navy-primary)'>
          <span>{t('footer.madeWith')}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
