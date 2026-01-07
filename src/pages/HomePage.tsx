/**
 * Home Page - Velo.Bar
 * ====================
 * Unified landing page for mobile cocktail bar services in München & Coburg
 * SEO-optimized with LocalBusiness + WebSite structured data
 */

import React, { Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { PageTemplate } from '@/templates/PageTemplate';
import { Section, Container } from '@/components/atoms';
import { GridClean } from '@/components/atoms/Grid.clean';
import { HeroLocked } from '@/sections/HeroLocked';
import { getLocalBusinessSchema, getWebSiteSchema, combineSchemas } from '@/seo/schema';
import { ClientLogos } from '@/sections/ClientLogos';
const WhyVeloBarSection = lazy(() =>
  import('@/sections/WhyVeloBarSection').then((m) => ({ default: m.WhyVeloBarSection })),
);
import { ResponsiveImageWithMetadata as ResponsiveImage } from '@/components/atoms/ResponsiveImage/ResponsiveImageWithMetadata';
import { FinalCTA } from '@/components/FinalCTA';
import { Helmet } from 'react-helmet-async';
import '@/styles/pages/home-new.css';
import '@/styles/pages/home-new-unified.css';

const serviceCards = [
  {
    id: 'firmenfeiern',
    label: 'Firmenfeiern',
    description: 'Mobile Cocktailbar für Corporate Events, Afterworks und Sommerfeste.',
    href: '/leistungen#firmenfeiern',
    image: '/Velo Gallery/firemnfeier/firmenfeier-1920w.webp',
  },
  {
    id: 'messe',
    label: 'Messe-Catering',
    description: 'Autarke Bar-Konzepte für Messestände – ohne Strom- oder Wasseranschluss.',
    href: '/leistungen#messe-catering',
    image: '/Velo Gallery/messen/messen-1920w.webp',
  },
  {
    id: 'hochzeiten',
    label: 'Hochzeiten',
    description: 'Signature Drinks & Premium-Service für Trauungen und Abendempfänge.',
    href: '/leistungen#hochzeiten',
    image: '/Velo Gallery/hochzeit/hochzeiten-1920w.webp',
  },
  {
    id: 'weihnachten',
    label: 'Weihnachtsfeiern',
    description: 'Winterliche Cocktail-Kreationen und Glühwein-Varianten für Teams.',
    href: '/leistungen#weihnachtsfeiern',
    image: '/Velo Gallery/gallery-carousel/weihnachstfeier-640w.webp',
  },
  {
    id: 'team-events',
    label: 'Team-Events & Workshops',
    description: 'Cocktailkurse & Gin Tastings als interaktives Teamerlebnis.',
    href: '/leistungen#team-events-workshops',
    image: '/Velo Gallery/teamevent-und-workshops/teamevent-und-workshops-1920w.webp',
  },
  {
    id: 'private',
    label: 'Private Feiern',
    description: 'Geburtstage, Jubiläen oder Rooftop-Partys – wir bringen die Bar.',
    href: '/leistungen#private-feiern',
    image: '/Velo Gallery/private-feiern/private-feiern-1920w.webp',
  },
] as const;

const locationCards = [
  {
    id: 'munich',
    title: 'München & Umgebung',
    description:
      'Perfekte mobile Cocktailbar für Firmenfeiern, Messen und Privat-Events im Großraum München.',
    image: '/Velo Gallery/DSC09743-640w.jpg',
    cta: 'Events in München anfragen',
    link: '/anfrage?region=muenchen',
  },
  {
    id: 'coburg',
    title: 'Coburg & Umgebung',
    description: 'Velobar für Hochzeiten, Sommerfeste und Unternehmens-Events im Raum Coburg.',
    image: '/Velo Gallery/A7401220-1920w.jpg',
    cta: 'Events in Coburg anfragen',
    link: '/anfrage?region=coburg',
  },
] as const;

// SEO: Combine LocalBusiness + WebSite schemas for homepage
const homePageSchema = combineSchemas(getLocalBusinessSchema(), getWebSiteSchema());

export const HomePage = () => {
  return (
    <div className='home-new'>
      <PageTemplate
        // SEO: Title ~58 chars with location + primary keyword
        title='Mobile Cocktailbar München & Coburg | Velo.Bar'
        // SEO: Description ~150 chars with intent, location, USPs
        description='Premium mobile Cocktailbar für Firmenfeiern, Hochzeiten & Events in München. Professioneller Barkeeper-Service für 50-500+ Gäste. Jetzt anfragen!'
        canonicalPath='/'
        structuredData={homePageSchema}
        withContainer={false}
        headChildren={
          <Helmet>
            <link
              rel='preload'
              as='image'
              href='/Velo%20Gallery/mobile-bar-hero.jpg'
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
                München & Coburg – wir kommen überall hin
              </h2>
              <p className='mt-4 text-base font-semibold text-white md:text-lg'>
                Zwei feste Standorte in Bayern plus deutschlandweite Einsätze auf Anfrage.
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
                Von Cocktail-Catering bis Gin-Tasting
              </h2>
              <p className='mt-4 text-base font-semibold text-white md:text-lg'>
                Wählen Sie aus unseren beliebtesten Service-Kategorien – alle mobil, autark und auf
                Ihr Event zugeschnitten.
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
                        Mehr erfahren
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
                Zahlen, die Vertrauen schaffen
              </h2>
              <p className='mt-4 text-base font-semibold text-white md:text-lg'>
                Premium-Service, messbar in jeder Kennzahl.
              </p>
            </div>
            <div className='home-new-card border-accent/20 rounded-2xl border-2 p-6 shadow-lg'>
              <GridClean cols={4} gap='lg'>
                <div className='text-center'>
                  <div className='text-accent mb-0 text-4xl font-bold'>500+</div>
                  <div className='text-on-light text-sm'>Events durchgeführt</div>
                </div>
                <div className='text-center'>
                  <div className='text-accent mb-0 text-4xl font-bold'>50-500</div>
                  <div className='text-on-light text-sm'>Gäste pro Event</div>
                </div>
                <div className='text-center'>
                  <div className='text-accent mb-0 text-4xl font-bold'>4.9★</div>
                  <div className='text-on-light text-sm'>Google Bewertung</div>
                </div>
                <div className='text-center'>
                  <div className='text-accent mb-0 text-4xl font-bold'>2</div>
                  <div className='text-on-light text-sm'>Standorte in Bayern</div>
                </div>
              </GridClean>
            </div>
          </Container>
        </Section>

        {/* Final CTA */}
        <Section container='default' spacing='xl' background='transparent'>
          <FinalCTA />
        </Section>
      </PageTemplate>
    </div>
  );
};

export default HomePage;
