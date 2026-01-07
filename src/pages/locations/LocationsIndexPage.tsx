import React from 'react';
import { PageTemplate } from '@/templates/PageTemplate.tsx';
import { Link } from 'react-router-dom';
import { venueDatabase } from './VenueLandingPage.tsx';
import { Button } from '@/components/atoms/Button/Button.tsx';

const LocationsIndexPage: React.FC = () => {
  const venues = Object.values(venueDatabase);

  const messeVenues = venues.filter((v) => v.type === 'messe');
  const locationVenues = venues.filter((v) => v.type === 'location');
  const historicVenues = venues.filter((v) => v.type === 'historic');
  const corporateVenues = venues.filter((v) => v.type === 'corporate');

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Event-Locations in München für Mobile Bar Service',
    description:
      'Übersicht aller Münchner Event-Locations, für die Velo.Bar professionellen Cocktail-Service anbietet.',
    numberOfItems: venues.length,
    itemListElement: venues.map((venue, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: venue.name,
      url: `https://velo-bar.com/locations/${venue.slug}`,
    })),
  };

  const VenueCard: React.FC<{ venue: (typeof venues)[0] }> = ({ venue }) => (
    <Link
      to={`/locations/${venue.slug}`}
      className='card bg-navy-light hover:border-accent-primary group block rounded-xl border border-white/10 p-8 transition transition-all duration-200 ease-out'
    >
      <h3 className='group-hover:text-accent-primary mb-0 text-lg font-bold text-gray-900 transition transition-colors duration-200 ease-out'>
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
    <PageTemplate
      title='Event-Locations München | Mobile Bar für alle Venues | Velo.Bar'
      description='Mobile Cocktailbar für Münchner Event-Locations: Messe München, MOC, Zenith, Werk1 und mehr. Autarker Bar-Service ohne Infrastruktur.'
      canonicalPath='/locations'
      structuredData={schemaData}
    >
      <main className='bg-navy'>
        {/* Hero Section */}
        <div className='to-accent-primary/80 relative overflow-hidden bg-linear-to-br from-gray-900 via-gray-800 py-24 text-white lg:py-32'>
          <div className='absolute inset-0 z-0 opacity-20'>
            <div className='absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(var(--orange-rgb),0.4),transparent_50%)]' />
          </div>
          <div className='relative z-10 mx-auto max-w-4xl px-8 text-center sm:px-8 lg:px-8'>
            <span className='mb-8 inline-block rounded-full border border-white/20 bg-white/10 px-0 py-0 text-sm font-semibold text-white/80'>
              Münchner Event-Locations
            </span>
            <h1 className='mb-8 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl'>
              Mobile Bar für <br className='hidden sm:block' />
              <span className='text-accent-primary'>Ihre Location</span>
            </h1>
            <p className='mx-auto max-w-2xl text-xl text-white/80'>
              Von der Messe München bis zum Schloss Schleißheim – wir kennen die besten
              Event-Locations und ihre besonderen Anforderungen.
            </p>
          </div>
        </div>

        <div className='mx-auto max-w-6xl px-8 py-16 sm:px-8 lg:px-8'>
          {/* Messe Venues */}
          {messeVenues.length > 0 && (
            <section className='mb-16'>
              <div className='mb-8 flex items-center gap-0'>
                <span className='text-3xl'>🏛️</span>
                <h2 className='text-2xl font-bold text-gray-900'>Messe & Kongress</h2>
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
                <h2 className='text-2xl font-bold text-gray-900'>Event-Locations</h2>
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
                <h2 className='text-2xl font-bold text-gray-900'>Historische Locations</h2>
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
                <h2 className='text-2xl font-bold text-gray-900'>Startup & Corporate Hubs</h2>
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
            <h2 className='mb-8 text-2xl font-bold text-[#ee7868]'>Ihre Location nicht dabei?</h2>
            <p className='mx-auto mb-8 max-w-2xl text-[#003141]'>
              Kein Problem! Wir sind flexibel und kommen überall hin – von der Büro-Terrasse bis zum
              Alpengipfel. Erzählen Sie uns von Ihrer Location.
            </p>
            <Link to='/anfrage'>
              <Button
                variant='primary'
                size='lg'
                className='bg-[#ee7868] text-white transition-colors duration-200 hover:bg-[#ee7868]/90'
              >
                Individuelle Anfrage stellen
              </Button>
            </Link>
          </section>
        </div>
      </main>
    </PageTemplate>
  );
};

export default LocationsIndexPage;
