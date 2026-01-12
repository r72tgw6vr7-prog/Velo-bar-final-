/**
 * PricingPage - Pricing & Packages Overview
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { PageTemplate } from '@/templates/PageTemplate';
import { Section } from '@/components/atoms/Section/Section.tsx';
import { HeroHeading } from '@/components/ui/HeroHeading.tsx';
import { FinalCTA } from '@/components/FinalCTA.tsx';

export const PricingPage: React.FC = () => {
  return (
    <PageTemplate
      title='Preise & Pakete'
      description='Transparente Preise für mobile Cocktailbar-Services in München und Coburg.'
      canonicalPath='/preise'
      withContainer={false}
      background='transparent'
    >
      <HeroHeading
        eyebrow='Transparente Preise'
        title='Preise & Pakete'
        subtitle='Transparente Festpreise. Keine versteckten Kosten. Alles inklusive.'
      />

      {/* Pricing Tiers */}
      <Section container='default' spacing='md' background='light'>
        <div className='grid gap-8 md:grid-cols-3'>
          {/* Starter Package */}
          <div className='pricing-card'>
            <h3>Starter</h3>
            <div className='pricing-price'>ab 500€</div>
            <ul>
              <li>Bis zu 50 Gäste</li>
              <li>3 Stunden Service</li>
              <li>4 Cocktail-Klassiker</li>
              <li>Professionelle Barkeeper</li>
              <li>Komplette Ausstattung</li>
              <li>Auf- und Abbau</li>
            </ul>
            <Link to='/anfrage' className='btn-primary'>
              Anfragen
            </Link>
          </div>

          {/* Professional Package */}
          <div className='pricing-card featured'>
            <span className='pricing-badge'>Beliebtestes</span>
            <h3>Professional</h3>
            <div className='pricing-price'>ab 1.200€</div>
            <ul>
              <li>Bis zu 150 Gäste</li>
              <li>5 Stunden Service</li>
              <li>8 Cocktails zur Auswahl</li>
              <li>Premium-Spirituosen</li>
              <li>Individuelle Cocktails</li>
              <li>Elegante Dekoration</li>
            </ul>
            <Link to='/anfrage' className='btn-primary'>
              Anfragen
            </Link>
          </div>

          {/* Enterprise Package */}
          <div className='pricing-card'>
            <h3>Enterprise</h3>
            <div className='pricing-price'>auf Anfrage</div>
            <ul>
              <li>150+ Gäste</li>
              <li>Flexible Servicezeiten</li>
              <li>Unbegrenzte Auswahl</li>
              <li>Mehrere Barstationen</li>
              <li>Corporate Branding</li>
              <li>Dedizierter Eventmanager</li>
            </ul>
            <Link to='/anfrage' className='btn-primary'>
              Anfragen
            </Link>
          </div>
        </div>
      </Section>

      {/* What's Included */}
      <Section container='default' spacing='md' background='light' className='pt-0'>
        <h2 className='mb-16 flex justify-center'>
          <span className='inline-flex items-center rounded-full bg-[rgba(255,248,236,0.95)] px-6 py-2 shadow-sm'>
            <span className='text-sm font-semibold tracking-wide text-[rgb(238,120,104)]'>
              Was ist immer inklusive?
            </span>
          </span>
        </h2>
        <div className='grid gap-8 md:grid-cols-4'>
          <div className='flex h-full flex-col text-center'>
            <span className='mx-auto mb-8 flex h-12 w-12 items-center justify-center rounded-full bg-(--color-bg-surface-tinted)'>
              <svg
                className='text-accent-primary h-6 w-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={1.5}
                  d='M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                />
              </svg>
            </span>
            <h3 className='text-on-light mb-0 font-semibold'>Premium Spirituosen</h3>
            <p className='vb-body'>Hochwertige Zutaten für perfekte Cocktails</p>
          </div>
          <div className='flex h-full flex-col text-center'>
            <span className='mx-auto mb-8 flex h-12 w-12 items-center justify-center rounded-full bg-(--color-bg-surface-tinted)'>
              <svg
                className='text-accent-primary h-6 w-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={1.5}
                  d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                />
              </svg>
            </span>
            <h3 className='text-on-light mb-0 font-semibold'>Prof. Barkeeper</h3>
            <p className='vb-body'>Erfahrene Barkeeper mit Event-Expertise</p>
          </div>
          <div className='flex h-full flex-col text-center'>
            <span className='mx-auto mb-8 flex h-12 w-12 items-center justify-center rounded-full bg-(--color-bg-surface-tinted)'>
              <svg
                className='text-accent-primary h-6 w-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={1.5}
                  d='M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4'
                />
              </svg>
            </span>
            <h3 className='text-on-light mb-0 font-semibold'>Komplette Ausstattung</h3>
            <p className='vb-body'>Gläser, Eis, Equipment - alles dabei</p>
          </div>
          <div className='flex h-full flex-col text-center'>
            <span className='mx-auto mb-8 flex h-12 w-12 items-center justify-center rounded-full bg-(--color-bg-surface-tinted)'>
              <svg
                className='text-accent-primary h-6 w-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={1.5}
                  d='M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4'
                />
              </svg>
            </span>
            <h3 className='text-on-light mb-0 font-semibold'>Auf- und Abbau</h3>
            <p className='vb-body'>Wir kümmern uns um alles</p>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section container='default' spacing='xl' background='transparent'>
        <FinalCTA />
      </Section>
    </PageTemplate>
  );
};

export default PricingPage;
