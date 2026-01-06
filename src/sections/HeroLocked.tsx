/**
 * HERO LOCKED COMPONENT
 * =====================
 * DO NOT MODIFY LAYOUT/STYLES WITHOUT DESIGN SIGN-OFF.
 * This component encapsulates the current homepage hero exactly as approved.
 * No props are exposed that could alter layout or styling.
 *
 * UPDATED: 2025-01-02 - Added eyebrow badge
 */

import React from 'react';
import { Section, Container } from '@/components/atoms';
import { HeroBike } from '@/components/HeroBike';
import { HeroParallax } from '@/components/HeroParallax';
import { MapPin } from 'lucide-react';
import '@/styles/hero.css';

export const HeroLocked: React.FC = () => {
  return (
    <Section
      container='none'V
      spacing='none'
      background='transparent'
      className='home-hero relative'
    >
      {/* Hero text and CTAs */}
      <Container
        size='default'
        className='relative z-10 flex items-center justify-center py-0 sm:py-1 md:py-5'
      >
        <div className='w-full max-w-2xl text-center'>
          {/* Eyebrow Badge */}
          <div className='mb-6 flex justify-center'>
            <div className='inline-flex items-center gap-2 rounded-full border border-[#003141]/20 bg-[#003141] px-4 py-2'>
              <MapPin size={16} className='text-[#fff8ec]' />
              <span className='text-sm font-medium text-[#fff8ec]'>München & Coburg</span>
            </div>
          </div>

          <h1 className='home-hero-title text-accent text-3xl leading-tight font-extrabold tracking-tight md:text-5xl lg:text-6xl'>
            Mobile Cocktailbar für dein Event
          </h1>
          <p className='home-hero-subtitle mt-4 inline-block text-center text-base leading-tight font-bold text-white drop-shadow-sm md:text-lg'>
            Professioneller Barkeeper-Service für Events in München und Coburg.
          </p>
        </div>
      </Container>

      <div className='hero-surface w-full pt-8 pb-8 md:pt-10 md:pb-12 lg:pt-12'>
        {/* Bicycle only hero */}
        <div className='hero-section hero-section--new'>
          <div className='hero-frame'>
            <HeroParallax />
            <div className='hero-content'>
              <div className='bike-container'>
                <HeroBike />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default HeroLocked;
