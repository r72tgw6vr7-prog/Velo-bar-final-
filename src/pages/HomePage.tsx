/**
 * Home Page - Velo.Bar
 * ====================
 * Unified landing page for mobile cocktail bar services in München & Coburg
 * SEO-optimized with LocalBusiness + WebSite structured data
 */

import React, { Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { PageTemplate } from '@/templates/PageTemplate';
import { SiteBackground } from '@/components/layout/SiteBackground';
import { Section, Container } from '@/components/atoms/index.ts';
import { GridClean } from '@/components/atoms/Grid.clean.tsx';
import { HeroLocked } from '@/sections/HeroLocked.tsx';
import { getLocalBusinessSchema, getWebSiteSchema, getReviewSchema, combineSchemas } from '@/seo/schema.ts';
import { ClientLogos } from '@/sections/ClientLogos.tsx';
import { TestimonialsSection } from '@/sections/TestimonialsSection.tsx';
const WhyVeloBarSection = lazy(() =>
  import('@/sections/WhyVeloBarSection/WhyVeloBarSection.tsx').then((m) => ({ default: m.WhyVeloBarSection })),
);
import { ResponsiveImageWithMetadata as ResponsiveImage } from '@/components/atoms/ResponsiveImage/ResponsiveImageWithMetadata.tsx';
import { FinalCTA } from '@/components/FinalCTA.tsx';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/contexts/LanguageContext';
import '@/styles/pages/home-new.css';
import '@/styles/pages/home-new-unified.css';

// Service and location card data moved inside component to use translations

// Google Reviews data for schema
const reviewsData = [
  {
    name: 'Xenia Davidoff',
    text: 'The mobile bar Velo.Bar was the absolute highlight of our wedding! The drinks they prepared were incredibly well-received by our guests. The seamless communication with Lars and his team made our lives easier during the wedding preparations.',
    rating: 5,
    date: '2023-01-15',
  },
  {
    name: 'Angela Samberger',
    text: 'Sebastian and his Velo.Bar catered for 50 guests at my garden party with cocktails. I highly recommend him. Great bar, delicious cocktails, professional service, and a fantastic guy! Everything was straightforward, reliable, and a truly memorable experience.',
    rating: 5,
    date: '2024-07-20',
  },
  {
    name: 'Arlind Maurer',
    text: 'Sebastian and the Velo.Bar were an absolute hit after our civil wedding. Not even the pouring rain could dampen that. A great concept, outstanding service, and a hassle-free experience.',
    rating: 5,
    date: '2024-01-10',
  },
  {
    name: 'Ruth Gaspar',
    text: 'We booked the VeloBar for the champagne reception in the English Garden after our civil ceremony. Everything worked out perfectly, and despite the rain, it was a very successful event. Many thanks to Lars Eggers for the uncomplicated planning and execution.',
    rating: 5,
    date: '2024-01-05',
  },
  {
    name: 'Viktoria O.',
    text: 'Absolutely recommendable! We booked a champagne reception after our civil wedding in Munich, and it was simply perfect! Nice guys, fair price, and easy to contact. Definitely book them, and you can celebrate and relax without worry.',
    rating: 5,
    date: '2024-01-08',
  },
  {
    name: 'Radu Lupoaie',
    text: 'Pure awesomeness! Velo Bar team helped us organize a champagne reception at Standesamt Munich. Everything was great, from the initial communication and planning until the main day. They are very friendly and professional and all the guests loved it!',
    rating: 5,
    date: '2021-06-15',
  },
];

// SEO: Combine LocalBusiness + WebSite + Review schemas for homepage
const homePageSchema = combineSchemas(
  getLocalBusinessSchema(),
  getWebSiteSchema(),
  getReviewSchema(reviewsData)
);

export const HomePage = () => {
  const { t } = useLanguage();

  // Service cards using translations
  const serviceCards = [
    {
      id: 'firmenfeiern',
      label: t('services.firmenfeiern.title'),
      description: t('services.firmenfeiern.description'),
      href: '/leistungen#firmenfeiern',
      image: '/Velo Gallery/firemnfeier/firmenfeier',
    },
    {
      id: 'messe',
      label: t('services.messe.title'),
      description: t('services.messe.description'),
      href: '/leistungen#messe-catering',
      image: '/Velo Gallery/messen/messen',
    },
    {
      id: 'hochzeiten',
      label: t('services.hochzeiten.title'),
      description: t('services.hochzeiten.description'),
      href: '/leistungen#hochzeiten',
      image: '/Velo Gallery/hochzeit/hochzeiten',
    },
    {
      id: 'weihnachten',
      label: t('services.weihnachtsfeiern.title'),
      description: t('services.weihnachtsfeiern.description'),
      href: '/leistungen#weihnachtsfeiern',
      image: '/Velo Gallery/gallery-carousel/weihnachstfeier',
    },
    {
      id: 'team-events',
      label: t('services.teamEvents.title'),
      description: t('services.teamEvents.description'),
      href: '/leistungen#team-events-workshops',
      image: '/Velo Gallery/teamevent-und-workshops/teamevent-und-workshops',
    },
    {
      id: 'private',
      label: t('services.privateFeiern.title'),
      description: t('services.privateFeiern.description'),
      href: '/leistungen#private-feiern',
      image: '/Velo Gallery/private-feiern/private-feiern',
    },
  ];

  // Location cards using translations
  const locationCards = [
    {
      id: 'munich',
      title: t('locations.munich'),
      description: t('locations.munichDesc'),
      image: '/Velo Gallery/DSC09743',
      cta: t('locations.munichCta'),
      link: '/anfrage?region=muenchen',
    },
    {
      id: 'coburg',
      title: t('locations.coburg'),
      description: t('locations.coburgDesc'),
      image: '/Velo Gallery/A7401220',
      cta: t('locations.coburgCta'),
      link: '/anfrage?region=coburg',
    },
  ];

  return (
    <SiteBackground>
      <PageTemplate
        // SEO: Title optimized for CTR with emoji and pricing USP
        title={t('pages.home.seo.title')}
        // SEO: Description ~150 chars with intent, location, USPs
        description={t('pages.home.seo.description')}
        canonicalPath='/'
        structuredData={homePageSchema}
        withContainer={false}
        headChildren={
          <Helmet>
            <link
              rel='preload'
              as='image'
              href='/Velo%20Gallery/mobile-bar-hero-640w.webp'
              fetchPriority='high'
            />
          </Helmet>
        }
      >
        {/* Hero Section - Using locked/approved hero implementation */}
        <HeroLocked />

        {/* Client Logos - Trusted By */}
        <ClientLogos variant='marquee' />

        {/* Locations */}
        <Section
          container='default'
          spacing='xl'
          background='transparent'
          className='home-locations'
        >
          <Container size='default'>
            <div className='mx-auto mb-12 max-w-3xl text-center'>
              <h2 className='text-accent mt-4 text-3xl font-bold md:text-4xl'>
                {t('pages.home.locations.title')}
              </h2>
              <p className='mt-4 text-base font-semibold text-white/90 md:text-lg'>
                {t('pages.home.locations.subtitle')}
              </p>
            </div>
            <GridClean cols={2} gap='lg' className='location-cards gap-y-8'>
              {locationCards.map((location) => (
                <div
                  key={location.id}
                  className='location-card relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 text-white shadow-2xl backdrop-blur md:min-h-[620px]'
                >
                  <div className='absolute inset-0'>
                    <ResponsiveImage
                      src={location.image}
                      alt={location.title}
                      sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
                      className='h-full w-full object-cover'
                      loading='lazy'
                    />
                    <div
                      className='pointer-events-none absolute inset-0'
                      style={{
                        background:
                          'linear-gradient(180deg, rgba(var(--navy-primary-rgb), 0.55) 0%, rgba(var(--navy-primary-rgb), 0.35) 100%)',
                      }}
                    />
                    {/* overlay removed to show full photo */}
                  </div>
                  <div className='location-card__content relative z-10 flex h-full flex-col p-6 sm:p-8'>
                    <div className='md:flex md:flex-col md:items-center md:gap-3 md:text-center'>
                      <div className='md:inline-flex md:rounded-xl md:bg-white/5 md:px-4 md:py-2 md:backdrop-blur-sm'>
                        <h3 className='location-card__title text-2xl font-bold md:text-4xl'>
                          {location.title}
                        </h3>
                      </div>
                    </div>
                    <div className='mt-auto flex flex-col items-center gap-3 pt-6 text-center'>
                      <div className='md:inline-flex md:rounded-xl md:bg-white/5 md:px-4 md:py-2 md:backdrop-blur-none'>
                        <p className='location-card__description text-sm font-bold text-white/80 md:text-lg md:leading-relaxed md:text-white/90'>
                          {location.description}
                        </p>
                      </div>
                      <Link
                        to={location.link}
                        className='inline-flex items-center justify-center rounded-full bg-[#ee7868] px-5 py-2 text-sm font-semibold text-white transition duration-200 hover:bg-[#ee7868]/90 md:px-6 md:py-3 md:text-base'
                      >
                        {location.cta}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </GridClean>
          </Container>
        </Section>

        {/* Services */}
        <Section container='default' spacing='xl' background='transparent'>
          <Container size='default'>
            <div className='mx-auto mb-12 max-w-3xl text-center'>
              <h2 className='text-accent mt-4 text-3xl font-bold md:text-4xl'>
                {t('pages.home.services.title')}
              </h2>
              <p className='mt-4 text-base font-semibold text-white/90 md:text-lg'>
                {t('pages.home.services.subtitle')}
              </p>
            </div>
            <GridClean
              cols={3}
              gap='lg'
              className='service-cards gap-y-8 md:grid-cols-3 md:gap-x-6 md:gap-y-6'
            >
              {serviceCards.map((service) => (
                <div
                  key={service.id}
                  className={`service-card relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 text-white shadow-2xl backdrop-blur transition duration-200 ease-out md:min-h-[304px] md:hover:-translate-y-1 md:hover:border-white/20 md:hover:shadow-2xl ${
                    service.id === 'private' ? 'service-card--private' : ''
                  }`}
                >
                  <div className='absolute inset-0'>
                    <ResponsiveImage
                      src={service.image}
                      alt={service.label}
                      sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
                      className='h-full w-full object-cover object-center'
                      objectPosition={service.id === 'private' ? 'top' : 'center'}
                      style={
                        service.id === 'private'
                          ? {
                              transform: 'rotate(90deg) scale(var(--private-card-scale))',
                              transformOrigin: 'center',
                            }
                          : undefined
                      }
                      priority={false}
                      loading='lazy'
                    />
                    <div
                      className='pointer-events-none absolute inset-0'
                      style={{
                        background:
                          'linear-gradient(180deg, rgba(var(--navy-primary-rgb), 0.55) 0%, rgba(var(--navy-primary-rgb), 0.35) 100%)',
                      }}
                    />
                    {/* overlay removed to show full photo */}
                  </div>
                  <div className='service-card__content relative z-10 flex h-full flex-col p-6 sm:p-8 md:p-5'>
                    <div className='md:flex md:flex-col md:items-center md:gap-3 md:self-center md:text-center'>
                      <div className='md:inline-flex md:rounded-xl md:bg-white/5 md:px-4 md:py-2 md:backdrop-blur-sm'>
                        <h3 className='service-card__title text-2xl font-bold md:text-3xl'>
                          {service.label}
                        </h3>
                      </div>
                    </div>
                    <div className='mt-auto flex flex-col items-center gap-3 pt-6 text-center'>
                      <div className='md:inline-flex md:rounded-xl md:bg-white/5 md:px-4 md:py-2 md:backdrop-blur-none'>
                        <p className='service-card__description text-sm font-bold text-white/90 md:text-lg md:leading-relaxed'>
                          {service.description}
                        </p>
                      </div>
                      <Link
                        to={service.href}
                        className='mx-auto inline-flex items-center justify-center rounded-full bg-[#ee7868] px-5 py-2 text-sm font-semibold text-white transition duration-200 hover:bg-[#ee7868]/90 md:px-6 md:py-3 md:text-base'
                      >
                        {t('pages.home.services.cta')}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </GridClean>
          </Container>
        </Section>

        {/* Why Velo.Bar? - Trust Signal Cards with Animation */}
        <Suspense fallback={<div aria-hidden />}>
          <WhyVeloBarSection />
        </Suspense>

        {/* Social Proof / Stats */}
        <Section container='default' spacing='lg' background='transparent'>
          <Container size='default'>
            <div className='mx-auto mb-10 max-w-3xl text-center'>
              <h2 className='text-accent mt-4 text-3xl font-bold md:text-4xl'>
                {t('pages.home.stats.title')}
              </h2>
              <p className='mt-4 text-base font-semibold text-white/90 md:text-lg'>
                {t('pages.home.stats.subtitle')}
              </p>
            </div>
            <div className='home-new-card p-6'>
              <GridClean cols={4} gap='lg'>
                <div className='text-center'>
                  <div className='text-accent mb-0 text-4xl font-bold'>{t('pages.home.stats.values.0')}</div>
                  <div className='text-on-light text-sm'>{t('pages.home.stats.items.0')}</div>
                </div>
                <div className='text-center'>
                  <div className='text-accent mb-0 text-4xl font-bold'>{t('pages.home.stats.values.1')}</div>
                  <div className='text-on-light text-sm'>{t('pages.home.stats.items.1')}</div>
                </div>
                <div className='text-center'>
                  <div className='text-accent mb-0 text-4xl font-bold'>{t('pages.home.stats.values.2')}</div>
                  <div className='text-on-light text-sm'>{t('pages.home.stats.items.2')}</div>
                </div>
                <div className='text-center'>
                  <div className='text-accent mb-0 text-4xl font-bold'>{t('pages.home.stats.values.3')}</div>
                  <div className='text-on-light text-sm'>{t('pages.home.stats.items.3')}</div>
                </div>
              </GridClean>
            </div>
          </Container>
        </Section>

        {/* Testimonials - Google Reviews */}
        <TestimonialsSection />

        {/* Final CTA */}
        <Section container='default' spacing='xl' background='transparent'>
          <FinalCTA />
        </Section>
      </PageTemplate>
    </SiteBackground>
  );
};

export default HomePage;
