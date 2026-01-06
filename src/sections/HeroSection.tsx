/**
 * @deprecated This component is no longer used. Use HeroLocked from @/sections/HeroLocked instead.
 * See docs/HERO_AND_APP_WIRING.md for the canonical hero system.
 *
 * HeroSection - Legacy Hero Component
 * ====================================
 * Generic hero with parallax background, stats, trust badges.
 * Status: DEPRECATED - Not used by any active routes.
 */

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Section } from '@/components/atoms';
import { ResponsiveImage } from '@/components/atoms/ResponsiveImage/ResponsiveImage';
import { willChangeStyles } from '@/utils/performance';
import { TRUST_BADGES, TrustBadgeItem } from './TrustBadges';

interface StatItem {
  value: string;
  label: string;
}

interface HeroSectionProps {
  backgroundImage?: string;
  _overlayImage?: string;
  _title?: string;
  _subtitle?: string;
  _ctaButtons?: Array<{
    text: string;
    href: string;
    variant: 'primary' | 'secondary';
  }>;
  _trustBadges?: TrustBadgeItem[];
  _stats?: StatItem[];
  children?: React.ReactNode;
}

export const HeroSection: React.FC<React.PropsWithChildren<HeroSectionProps>> = ({
  backgroundImage = '/assets/images/hero/business-hero.webp',
  _title = 'Professional Service Providers',
  _subtitle = '27 Jahre Erfahrung • 10.000+ Google Bewertungen • EU-Zertifiziert',
  _ctaButtons = [
    {
      text: 'Termin',
      href: '/booking',
      variant: 'primary',
    },
  ],
  // We're now using hardcoded badges directly in the JSX
  _trustBadges = TRUST_BADGES,
  _stats = [
    { value: '25+', label: 'Jahre Erfahrung' },
    { value: '100%', label: 'Hygiene zertifiziert' },
    { value: 'EU-REACH', label: 'Farben konform' },
    { value: '10,000+', label: 'Zufriedene Kunden' },
  ],
  children, // children is now properly destructured
}) => {
  // CRITICAL FIX #3: Parallax effect for hero background
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Background moves slower (0.3 = 30% scroll speed)
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  return (
    <div ref={heroRef} className='relative flex min-h-screen flex-col overflow-hidden'>
      <div className='absolute inset-0'>
        {/* Background layer with parallax */}
        <motion.div
          className='absolute inset-0 z-20'
          style={{
            y: backgroundY,
            ...willChangeStyles.transform,
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden' as const,
          }}
        >
          <ResponsiveImage
            src={backgroundImage.replace(/\.(webp|jpg|jpeg|png)$/i, '')}
            alt='VeloBar hero background'
            sizes='100vw'
            priority={true}
            objectFit='cover'
            objectPosition='center'
            className='absolute inset-0 h-full w-full'
            showPlaceholder={false}
          />
        </motion.div>

        {/* Content area */}
        <div className='relative z-20 flex flex-1 flex-col'>
          <Section
            background='transparent'
            container='full'
            className='flex flex-1 flex-col justify-center py-16 lg:py-24'
          >
            {children}
          </Section>
        </div>

        {/* Trust Badges Carousel - Positioned in bottom area as shown in white box */}
        <section className='trust-badges-wrapper' aria-label='Qualitätsmerkmale und Auszeichnungen'>
          <div className='trust-badges-container'>
            <div className='trust-badges-track animate-[scrollBadges_30s_linear_infinite]'>
              {/* First set of badges - Map through TRUST_BADGES */}
              {TRUST_BADGES.map((badge) => (
                <div key={badge.id} className='trust-badge-item'>
                  <div className='badge-icon' aria-hidden='true'>
                    {badge.svg}
                  </div>
                  <span className='badge-text'>{badge.text}</span>
                </div>
              ))}

              {/* Duplicate set for infinite scrolling */}
              {TRUST_BADGES.map((badge) => (
                <div key={`${badge.id}-duplicate`} className='trust-badge-item'>
                  <div className='badge-icon' aria-hidden='true'>
                    {badge.svg}
                  </div>
                  <span className='badge-text'>{badge.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HeroSection;
