import React from 'react';
import { PageTemplate } from '@/templates/PageTemplate.tsx';
import { SiteBackground } from '@/components/layout/SiteBackground';
import { Link } from 'react-router-dom';
import { getAllVenues } from './VenueLandingPage.tsx';
import { Button } from '@/components/atoms/Button/Button.tsx';
import { SITE_URL } from '@/lib/site.ts';
import { useLanguage } from '@/contexts/LanguageContext.tsx';

const LocationsIndexPage: React.FC = () => {
  const { t, language } = useLanguage();
  const venues = getAllVenues(language);

  const messeVenues = venues.filter((v) => v.type === 'messe');
  const locationVenues = venues.filter((v) => v.type === 'location');
  const historicVenues = venues.filter((v) => v.type === 'historic');
  const corporateVenues = venues.filter((v) => v.type === 'corporate');

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: t('pages.locationsIndex.schema.name'),
    description: t('pages.locationsIndex.schema.description'),
    numberOfItems: venues.length,
    itemListElement: venues.map((venue, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: venue.name,
      url: `${SITE_URL}/locations/${venue.slug}`,
    })),

  };

  const VenueCard: React.FC<{ venue: (typeof venues)[0] }> = ({ venue }) => (
    <Link
      to={`/locations/${venue.slug}`}
      className='card bg-navy-light hover:border-accent-primary group block rounded-xl border border-white/10 p-8 transition-all duration-200 ease-out'
    >
      <h3 className='group-hover:text-accent-primary mb-0 text-lg font-bold text-gray-900 transition-colors duration-200 ease-out'>
        {venue.shortName}
      </h3>
      <p className='mb-0 line-clamp-2 text-sm text-gray-600'>{venue.description}</p>
      <div className='flex items-center justify-between text-xs text-gray-500'>
        <span>📍 {venue.district}</span>
        <span>👥 {venue.capacity}</span>
      </div>
    </Link>
  );

  return (
    <SiteBackground>
      <PageTemplate
        title={t('pages.locationsIndex.seo.title')}
        description={t('pages.locationsIndex.seo.description')}
        canonicalPath='/locations'
        structuredData={schemaData}
      >
        <main className='w-full'>
          {/* Hero Section */}
        <div className='to-accent-primary/80 relative overflow-hidden bg-linear-to-br from-gray-900 via-gray-800 py-24 text-white lg:py-32'>
          <div className='absolute inset-0 z-0 opacity-20'>
            <div className='absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(var(--orange-rgb),0.4),transparent_50%)]' />
          </div>
          <div className='relative z-10 mx-auto max-w-4xl px-8 text-center sm:px-8 lg:px-8'>
            <span className='mb-8 inline-block rounded-full border border-white/20 bg-white/10 px-0 py-0 text-sm font-semibold text-white/80'>
              {t('pages.locationsIndex.hero.badge')}
            </span>
            <h1 className='mb-8 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl'>
              {t('pages.locationsIndex.hero.titlePrefix')} <br className='hidden sm:block' />
              <span className='text-accent-primary'>{t('pages.locationsIndex.hero.titleAccent')}</span>
            </h1>
            <p className='mx-auto max-w-2xl text-xl text-white/80'>
              {t('pages.locationsIndex.hero.subtitle')}
            </p>
          </div>
        </div>

        <div className='mx-auto max-w-6xl px-8 py-16 sm:px-8 lg:px-8'>
          {/* Messe Venues */}
          {messeVenues.length > 0 && (
            <section className='mb-16'>
              <div className='mb-8 flex items-center gap-0'>
                <span className='text-3xl'>🏛️</span>
                <h2 className='text-2xl font-bold text-gray-900'>{t('pages.locationsIndex.sections.messe')}</h2>
              </div>
              <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
                {messeVenues.map((venue) => (
                  <VenueCard key={venue.slug} venue={venue} />
                ))}
              </div>
            </section>
          )}

          {/* Event Locations */}
          {locationVenues.length > 0 && (
            <section className='mb-16'>
              <div className='mb-8 flex items-center gap-0'>
                <span className='text-3xl'>🎪</span>
                <h2 className='text-2xl font-bold text-gray-900'>{t('pages.locationsIndex.sections.locations')}</h2>
              </div>
              <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
                {locationVenues.map((venue) => (
                  <VenueCard key={venue.slug} venue={venue} />
                ))}
              </div>
            </section>
          )}

          {/* Historic Venues */}
          {historicVenues.length > 0 && (
            <section className='mb-16'>
              <div className='mb-8 flex items-center gap-0'>
                <span className='text-3xl'>🏰</span>
                <h2 className='text-2xl font-bold text-gray-900'>{t('pages.locationsIndex.sections.historic')}</h2>
              </div>
              <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
                {historicVenues.map((venue) => (
                  <VenueCard key={venue.slug} venue={venue} />
                ))}
              </div>
            </section>
          )}

          {/* Corporate/Startup Venues */}
          {corporateVenues.length > 0 && (
            <section className='mb-16'>
              <div className='mb-8 flex items-center gap-0'>
                <span className='text-3xl'>🚀</span>
                <h2 className='text-2xl font-bold text-gray-900'>{t('pages.locationsIndex.sections.corporate')}</h2>
              </div>
              <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
                {corporateVenues.map((venue) => (
                  <VenueCard key={venue.slug} venue={venue} />
                ))}
              </div>
            </section>
          )}

          {/* CTA Section */}
          <section className='rounded-2xl bg-gray-50 p-8 text-center md:p-16'>
            <h2 className='mb-8 text-2xl font-bold text-[#ee7868]'>{t('pages.locationsIndex.cta.title')}</h2>
            <p className='mx-auto mb-8 max-w-2xl text-[#003141]'>
              {t('pages.locationsIndex.cta.description')}
            </p>
            <Link to='/anfrage'>
              <Button
                variant='primary'
                size='lg'
                className='bg-[#ee7868] text-white transition-colors duration-200 hover:bg-[#ee7868]/90'
              >
                {t('pages.locationsIndex.cta.button')}
              </Button>
            </Link>
          </section>
        </div>
        </main>
      </PageTemplate>
    </SiteBackground>
  );
};

export default LocationsIndexPage;
