/**
 * DistrictPage - Programmatic SEO Template for Munich Districts
 * ==============================================================
 * Dynamic location-specific landing pages for local SEO targeting
 * Generates personalized content based on district data
 */

import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageTemplate } from '@/templates/PageTemplate.tsx';
import { Button } from '@/components/atoms/Button';
import { Breadcrumbs } from '@/components/atoms/Breadcrumbs';
import {
  MapPin,
  Users,
  Building2,
  Train,
  Car,
  Phone,
  Mail,
  ArrowRight,
  Check,
  Bike,
  Leaf,
  Zap,
  Shield,
} from 'lucide-react';
import { getDistrictBySlug, generateDistrictSchema } from '@/data/munich-districts';
import { firmenfeiernContent } from '@/content/firmenfeiern';
import { Section } from '@/components/atoms';

// Icon mapping
const iconMap = {
  Bike,
  Leaf,
  Zap,
  Shield,
  Building2,
  Users,
  MapPin,
} as const;

const DistrictPage: React.FC = () => {
  const { district } = useParams<{ district: string }>();

  // Generate structured data for SEO
  const schemaData = useMemo(() => {
    const districtData = getDistrictBySlug(district || '');
    return districtData ? generateDistrictSchema(districtData) : null;
  }, [district]);

  const districtData = useMemo(() => getDistrictBySlug(district || ''), [district]);

  // Custom content based on district (call hook unconditionally)
  const customContent = useMemo(() => {
    const baseContent = firmenfeiernContent;

    // If district data is not available yet, return base content
    if (!districtData) return baseContent;

    // Personalize hero section
    const personalizedHero = {
      ...baseContent.hero,
      title: `Mobile Cocktailbar für Firmenfeiern in ${districtData.name} | Velo.Bar`,
      eyebrow: `Ihre Partner für Business Events in ${districtData.name}`,
      description: `Professionelle mobile Cocktailbar für exklusive Firmenfeiern und Business Events in ${districtData.name}, München. ${districtData.description}`,
    };

    // Local venues section
    const localVenues = {
      title: `Premium Event Locations in ${districtData.name}`,
      subtitle: `Exklusive Partner für Ihre Firmenfeier im Stadtteil`,
      venues: [
        ...districtData.venues.hotels.map((hotel) => ({
          name: hotel,
          type: 'Hotel' as const,
          description: `Luxuriöse Event-Räume für Ihre Firmenfeier in ${districtData.name}`,
        })),
        ...districtData.venues.eventSpaces.map((space) => ({
          name: space,
          type: 'Event Space' as const,
          description: `Unique Location für besondere Business Events in ${districtData.name}`,
        })),
      ],
    };

    // Transportation info
    const transportInfo = {
      title: `Erreichbarkeit & Anbindung ${districtData.name}`,
      subtitle: `Optimale Verkehrsanbindung für Ihre Gäste`,
      subway: districtData.transport.subway,
      bus: districtData.transport.bus,
      parking: districtData.transport.parking,
    };

    return {
      ...baseContent,
      hero: personalizedHero,
      localVenues,
      transportInfo,
      stats: [
        { value: districtData.population, label: 'Einwohner' },
        { value: districtData.venues.hotels.length, label: 'Partner-Hotels' },
        { value: '15min', label: 'Anfahrtszeit' },
        { value: '500+', label: 'Events durchgeführt' },
      ],
    };
  }, [districtData]) as unknown as import('@/content/firmenfeiern').FirmenfeiernPageContent & {
    hero: { description?: string };
    localVenues: {
      title: string;
      subtitle: string;
      venues: { name: string; type: string; description: string }[];
    };
    transportInfo: {
      title: string;
      subtitle: string;
      subway: string[];
      bus: string[];
      parking: string;
    };
  };

  // 404 if district not found
  if (!districtData) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-on-light mb-8 text-4xl font-bold'>Bezirk nicht gefunden</h1>
          <p className='mb-16 text-(--color-text-on-light-secondary)'>
            Der gesuchte Stadtteil wurde nicht gefunden.
          </p>
          <Link to='/firmenfeiern'>
            <Button>Zu den Firmenfeiern</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Breadcrumbs
  const breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'Firmenfeiern', path: '/firmenfeiern' },
    { label: districtData.name, path: `/firmenfeieren/${districtData.slug}` },
  ];

  return (
    <PageTemplate
      title={customContent.hero.title}
      description={customContent.hero.description}
      canonicalPath={`/firmenfeieren/${districtData.slug}`}
      structuredData={schemaData || undefined}
    >
      {/* Breadcrumbs */}
      <Section container='default' spacing='sm' className='bg-surface-tinted'>
        <Breadcrumbs items={breadcrumbs} />
      </Section>

      {/* District Hero */}
      <Section
        container='default'
        spacing='xl'
        className='from-navy-primary to-navy-dark bg-linear-to-br text-white'
      >
        <div className='text-center'>
          <span className='mb-8 inline-block rounded-full border border-(--brand-accent)/30 bg-(--brand-accent)/10 px-8 py-0 text-sm font-semibold text-(--brand-accent) transition-colors duration-200 hover:bg-(--brand-accent)/20'>
            {customContent.hero.eyebrow}
          </span>
          <h1 className='mb-8 text-4xl font-bold lg:text-5xl'>
            Mobile Cocktailbar für Firmenfeiern in {districtData.name}
          </h1>
          <p className='mx-auto mb-16 max-w-3xl text-xl text-(--color-text-on-dark-secondary)'>
            {customContent.hero.description}
          </p>
          <div className='flex flex-col justify-center gap-8 sm:flex-row'>
            <Link to='/anfrage'>
              <Button
                variant='secondary'
                size='lg'
                className='bg-white text-(--brand-primary) transition-colors duration-200 hover:bg-white/90'
              >
                Firmenfeier in {districtData.name} anfragen
              </Button>
            </Link>
            <Link to='/preise'>
              <Button
                variant='outline'
                size='lg'
                className='border-white text-(--color-text-on-dark-secondary) transition-colors duration-200 hover:bg-white hover:text-(--brand-primary)'
              >
                Preise & Pakete
              </Button>
            </Link>
          </div>
        </div>
      </Section>

      {/* District Stats */}
      <Section container='default' spacing='xl' className='bg-navy'>
        <div className='grid grid-cols-2 gap-8 lg:grid-cols-4'>
          {customContent.stats.map((stat, index) => (
            <div key={index} className='text-center'>
              <div className='mb-0 text-3xl font-bold text-(--brand-primary)'>{stat.value}</div>
              <div className='text-(--color-text-on-dark-secondary)'>{stat.label}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* District Characteristics */}
      <section className='bg-surface-tinted py-16'>
        <div className='mx-auto max-w-7xl px-8 sm:px-8 lg:px-8'>
          <div className='mb-16 text-center'>
            <h2 className='text-on-light mb-8 text-3xl font-bold'>
              Warum {districtData.name} perfekt für Ihre Firmenfeier ist
            </h2>
            <p className='mx-auto max-w-3xl text-xl text-(--color-text-on-light-secondary)'>
              Entdecken Sie die einzigartigen Vorteile des Stadtteils für Ihr Business Event
            </p>
          </div>
          <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
            {districtData.characteristics.slice(0, 6).map((characteristic, index) => {
              const IconComponent = iconMap.MapPin;
              return (
                <div
                  key={index}
                  className='bg-navy-light flex h-full flex-col rounded-lg p-8 shadow-sm'
                >
                  <div className='mb-8 flex h-12 w-12 items-center justify-center rounded-lg bg-(--brand-accent)/10'>
                    <IconComponent className='h-6 w-6 text-(--brand-accent)' />
                  </div>
                  <h3 className='text-on-light mb-8 text-xl font-semibold'>{characteristic}</h3>
                  <p className='text-(--color-text-on-dark-secondary)'>
                    Perfekte Bedingungen für unvergessliche Firmenfeiern im Herzen von{' '}
                    {districtData.name}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Local Venues */}
      <section className='bg-navy-light py-16'>
        <div className='mx-auto max-w-7xl px-8 sm:px-8 lg:px-8'>
          <div className='mb-16 text-center'>
            <h2 className='text-on-light mb-8 text-3xl font-bold'>
              {customContent.localVenues.title}
            </h2>
            <p className='mx-auto max-w-3xl text-xl text-(--color-text-on-light-secondary)'>
              {customContent.localVenues.subtitle}
            </p>
          </div>
          <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
            {customContent.localVenues.venues.map((venue, index) => (
              <div key={index} className='bg-surface-tinted flex h-full flex-col rounded-lg p-8'>
                <div className='mb-8 flex items-center'>
                  <Building2 className='mr-0 h-5 w-5 text-(--brand-accent)' />
                  <span className='text-sm font-medium text-(--brand-accent)'>{venue.type}</span>
                </div>
                <h3 className='text-on-light mb-8 text-xl font-semibold'>{venue.name}</h3>
                <p className='text-(--color-text-on-light-secondary)'>{venue.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transportation */}
      <section className='bg-surface-tinted py-16'>
        <div className='mx-auto max-w-7xl px-8 sm:px-8 lg:px-8'>
          <div className='mb-16 text-center'>
            <h2 className='text-on-light mb-8 text-3xl font-bold'>
              {customContent.transportInfo.title}
            </h2>
            <p className='mx-auto max-w-3xl text-xl text-(--color-text-on-light-secondary)'>
              {customContent.transportInfo.subtitle}
            </p>
          </div>
          <div className='grid gap-8 md:grid-cols-3'>
            <div className='bg-navy-light flex h-full flex-col rounded-lg p-8'>
              <div className='mb-8 flex items-center'>
                <Train className='mr-0 h-6 w-6 text-(--brand-primary)' />
                <h3 className='text-on-light text-lg font-semibold'>U-Bahn</h3>
              </div>
              <div className='space-y-0'>
                {customContent.transportInfo.subway.map((line, index) => (
                  <div key={index} className='text-(--color-text-on-dark-secondary)'>
                    Linie {line}
                  </div>
                ))}
              </div>
            </div>
            <div className='bg-navy-light flex h-full flex-col rounded-lg p-8'>
              <div className='mb-8 flex items-center'>
                <Users className='mr-0 h-6 w-6 text-(--brand-primary)' />
                <h3 className='text-on-light text-lg font-semibold'>Bus</h3>
              </div>
              <div className='space-y-0'>
                {customContent.transportInfo.bus.slice(0, 5).map((line, index) => (
                  <div key={index} className='text-(--color-text-on-dark-secondary)'>
                    Linie {line}
                  </div>
                ))}
              </div>
            </div>
            <div className='bg-navy-light flex h-full flex-col rounded-lg p-8'>
              <div className='mb-8 flex items-center'>
                <Car className='mr-0 h-6 w-6 text-(--brand-primary)' />
                <h3 className='text-on-light text-lg font-semibold'>Parken</h3>
              </div>
              <p className='text-(--color-text-on-dark-secondary)'>
                {customContent.transportInfo.parking}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Business Focus */}
      <section className='bg-navy-light py-16'>
        <div className='mx-auto max-w-7xl px-8 sm:px-8 lg:px-8'>
          <div className='mb-16 text-center'>
            <h2 className='text-on-light mb-8 text-3xl font-bold'>
              Business Focus {districtData.name}
            </h2>
            <p className='mx-auto max-w-3xl text-xl text-(--color-text-on-dark-secondary)'>
              Perfekt für Unternehmen aus diesen Branchen
            </p>
          </div>
          <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
            {districtData.businessFocus.map((focus, index) => (
              <div key={index} className='flex items-center rounded-lg bg-(--brand-primary)/5 p-8'>
                <Check className='mr-0 h-5 w-5 shrink-0 text-(--brand-accent)' />
                <span className='text-black/80'>{focus}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='bg-(--brand-primary) py-16 text-(--color-text-on-dark-secondary)'>
        <div className='mx-auto max-w-7xl px-8 text-center sm:px-8 lg:px-8'>
          <h2 className='mb-8 text-3xl font-bold'>
            Bereit für Ihre Firmenfeier in {districtData.name}?
          </h2>
          <p className='mx-auto mb-16 max-w-3xl text-xl opacity-90'>
            Lassen Sie uns gemeinsam ein unvergessliches Business Event in Ihrem Stadtteil
            gestalten.
          </p>
          <div className='flex flex-col justify-center gap-8 sm:flex-row'>
            <Link to='/anfrage'>
              <Button
                variant='secondary'
                size='lg'
                className='bg-white text-(--brand-primary) transition-colors duration-200 hover:bg-white/90'
              >
                <Phone className='mr-0 h-5 w-5' />
                Jetzt anfragen
              </Button>
            </Link>
            <Link to='/kontakt'>
              <Button
                variant='outline'
                size='lg'
                className='border-white text-(--color-text-on-dark-secondary) transition-colors duration-200 hover:bg-white hover:text-(--brand-primary)'
              >
                <Mail className='mr-0 h-5 w-5' />
                Kontakt aufnehmen
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Nearby Districts */}
      <section className='bg-surface-tinted py-16'>
        <div className='mx-auto max-w-7xl px-8 sm:px-8 lg:px-8'>
          <div className='mb-16 text-center'>
            <h2 className='text-on-light mb-8 text-3xl font-bold'>
              Auch in benachbarten Stadtteilen verfügbar
            </h2>
            <p className='mx-auto max-w-3xl text-xl text-(--color-text-on-light-secondary)'>
              Wir sind auch in diesen nahegelegenen Bezirken für Sie aktiv
            </p>
          </div>
          <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-4'>
            {districtData.nearbyDistricts.map((nearby, index) => {
              const nearbyDistrict = getDistrictBySlug(nearby);
              if (!nearbyDistrict) return null;

              return (
                <Link
                  key={index}
                  to={`/firmenfeieren/${nearbyDistrict.slug}`}
                  className='card bg-navy-light flex h-full flex-col rounded-lg p-8 duration-200'
                >
                  <div className='flex items-center justify-between'>
                    <div>
                      <h3 className='text-on-light mb-0 font-semibold'>{nearbyDistrict.name}</h3>
                      <p className='text-sm text-(--color-text-on-dark-secondary)'>
                        {nearbyDistrict.population} Einwohner
                      </p>
                    </div>
                    <ArrowRight className='h-5 w-5 text-(--brand-accent)' />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </PageTemplate>
  );
};

export default DistrictPage;
