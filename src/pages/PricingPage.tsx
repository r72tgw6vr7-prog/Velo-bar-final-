/**
 * PricingPage - Pricing & Packages Overview
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { PageTemplate } from '@/templates/PageTemplate';
import { Section } from '@/components/atoms/Section/Section.tsx';
import { HeroHeading } from '@/components/ui/HeroHeading.tsx';
import { FinalCTA } from '@/components/FinalCTA.tsx';
import { Helmet } from 'react-helmet-async';
import { getBreadcrumbSchema } from '@/seo/schema.ts';
import { useLanguage } from '@/contexts/LanguageContext.tsx';

export const PricingPage: React.FC = () => {
  const { t } = useLanguage();

  // SEO: Offer schema for mobile cocktailbar pricing packages
  const pricingSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Product',
        name: t('pricing.schema.product.name'),
        description: t('pricing.schema.product.description'),
        brand: {
          '@type': 'Brand',
          name: 'Velo.Bar',
        },
        offers: [
          {
            '@type': 'Offer',
            name: t('pricing.schema.offers.starter.name'),
            description: t('pricing.schema.offers.starter.description'),
            price: '500',
            priceCurrency: 'EUR',
            availability: 'https://schema.org/InStock',
          },
          {
            '@type': 'Offer',
            name: t('pricing.schema.offers.professional.name'),
            description: t('pricing.schema.offers.professional.description'),
            price: '1200',
            priceCurrency: 'EUR',
            availability: 'https://schema.org/InStock',
          },
        ],
      },
      getBreadcrumbSchema([
        { name: t('nav.home'), url: 'https://www.velo-bar.com' },
        { name: t('nav.pricing'), url: 'https://www.velo-bar.com/preise' },
      ]),
    ],
  };

  return (
    <PageTemplate
      title={t('pricing.seoTitle')}
      description={t('pricing.seoDescription')}
      canonicalPath='/preise'
      withContainer={false}
      background='transparent'
    >
      <Helmet>
        <script type='application/ld+json'>{JSON.stringify(pricingSchema)}</script>
      </Helmet>
      <HeroHeading
        eyebrow={t('pricing.hero.eyebrow')}
        title={t('pricing.hero.title')}
        subtitle={t('pricing.hero.subtitle')}
      />

      {/* Pricing Tiers */}
      <Section container='default' spacing='md' background='light'>
        <div className='grid gap-8 md:grid-cols-3'>
          {/* Starter Package */}
          <div className='pricing-card'>
            <h3>{t('pricing.packages.starter.name')}</h3>
            <div className='pricing-price'>{t('pricing.packages.starter.price')}</div>
            <ul>
              <li>{t('pricing.packages.starter.features.0')}</li>
              <li>{t('pricing.packages.starter.features.1')}</li>
              <li>{t('pricing.packages.starter.features.2')}</li>
              <li>{t('pricing.packages.starter.features.3')}</li>
              <li>{t('pricing.packages.starter.features.4')}</li>
              <li>{t('pricing.packages.starter.features.5')}</li>
            </ul>
            <Link to='/anfrage' className='btn-primary'>
              {t('pricing.packages.starter.cta')}
            </Link>
          </div>

          {/* Professional Package */}
          <div className='pricing-card featured'>
            <span className='pricing-badge'>{t('pricing.packages.professional.badge')}</span>
            <h3>{t('pricing.packages.professional.name')}</h3>
            <div className='pricing-price'>{t('pricing.packages.professional.price')}</div>
            <ul>
              <li>{t('pricing.packages.professional.features.0')}</li>
              <li>{t('pricing.packages.professional.features.1')}</li>
              <li>{t('pricing.packages.professional.features.2')}</li>
              <li>{t('pricing.packages.professional.features.3')}</li>
              <li>{t('pricing.packages.professional.features.4')}</li>
              <li>{t('pricing.packages.professional.features.5')}</li>
            </ul>
            <Link to='/anfrage' className='btn-primary'>
              {t('pricing.packages.professional.cta')}
            </Link>
          </div>

          {/* Enterprise Package */}
          <div className='pricing-card'>
            <h3>{t('pricing.packages.enterprise.name')}</h3>
            <div className='pricing-price'>{t('pricing.packages.enterprise.price')}</div>
            <ul>
              <li>{t('pricing.packages.enterprise.features.0')}</li>
              <li>{t('pricing.packages.enterprise.features.1')}</li>
              <li>{t('pricing.packages.enterprise.features.2')}</li>
              <li>{t('pricing.packages.enterprise.features.3')}</li>
              <li>{t('pricing.packages.enterprise.features.4')}</li>
              <li>{t('pricing.packages.enterprise.features.5')}</li>
            </ul>
            <Link to='/anfrage' className='btn-primary'>
              {t('pricing.packages.enterprise.cta')}
            </Link>
          </div>
        </div>
      </Section>

      {/* What's Included */}
      <Section container='default' spacing='md' background='light' className='pt-0'>
        <h2 className='mb-16 flex justify-center'>
          <span className='inline-flex items-center rounded-full bg-[rgba(255,248,236,0.95)] px-6 py-2 shadow-sm'>
            <span className='text-sm font-semibold tracking-wide text-[rgb(238,120,104)]'>
              {t('pricing.included.title')}
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
            <h3 className='text-on-light mb-0 font-semibold'>
              {t('pricing.included.items.spirits.title')}
            </h3>
            <p className='vb-body'>{t('pricing.included.items.spirits.description')}</p>
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
            <h3 className='text-on-light mb-0 font-semibold'>
              {t('pricing.included.items.bartender.title')}
            </h3>
            <p className='vb-body'>{t('pricing.included.items.bartender.description')}</p>
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
            <h3 className='text-on-light mb-0 font-semibold'>
              {t('pricing.included.items.equipment.title')}
            </h3>
            <p className='vb-body'>{t('pricing.included.items.equipment.description')}</p>
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
            <h3 className='text-on-light mb-0 font-semibold'>
              {t('pricing.included.items.setup.title')}
            </h3>
            <p className='vb-body'>{t('pricing.included.items.setup.description')}</p>
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
