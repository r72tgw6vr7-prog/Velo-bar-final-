/**
 * DistrictPage - Programmatic SEO Template for Munich Districts
 * ==============================================================
 * Dynamic location-specific landing pages for local SEO targeting
 * Generates personalized content based on district data
 */

import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageTemplate } from '@/templates/PageTemplate.tsx';
import { SiteBackground } from '@/components/layout/SiteBackground';
import { Button } from '@/components/atoms/Button/Button.tsx';
import { Breadcrumbs } from '@/components/atoms/Breadcrumbs.tsx';
import MapPin from 'lucide-react/dist/esm/icons/map-pin';
import Users from 'lucide-react/dist/esm/icons/users';
import Building2 from 'lucide-react/dist/esm/icons/building-2';
import Train from 'lucide-react/dist/esm/icons/train';
import Car from 'lucide-react/dist/esm/icons/car';
import Phone from 'lucide-react/dist/esm/icons/phone';
import Mail from 'lucide-react/dist/esm/icons/mail';
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right';
import Check from 'lucide-react/dist/esm/icons/check';
import Bike from 'lucide-react/dist/esm/icons/bike';
import Leaf from 'lucide-react/dist/esm/icons/leaf';
import Zap from 'lucide-react/dist/esm/icons/zap';
import Shield from 'lucide-react/dist/esm/icons/shield';;
import { getDistrictBySlug, generateDistrictSchema } from '@/data/munich-districts.ts';
import { Section } from '@/components/atoms/index.ts';
import { useLanguage } from '@/contexts/LanguageContext.tsx';
import { EyebrowBadge } from '@/components/atoms/EyebrowBadge.tsx';

function formatTemplate(template: string, vars: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => vars[key] ?? '');
}

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
  const { language, t } = useLanguage();

  // Generate structured data for SEO
  const schemaData = useMemo(() => {
    const districtData = getDistrictBySlug(district || '', language);
    return districtData ? generateDistrictSchema(districtData, language) : null;
  }, [district, language]);

  const districtData = useMemo(() => getDistrictBySlug(district || '', language), [district, language]);

  const customContent = useMemo(() => {
    if (!districtData) return null;

    const districtName = districtData.name;

    return {
      hero: {
        title: formatTemplate(t('pages.district.hero.title'), { district: districtName }),
        eyebrow: formatTemplate(t('pages.district.hero.eyebrow'), { district: districtName }),
        description: formatTemplate(t('pages.district.hero.description'), {
          district: districtName,
          districtDescription: districtData.description,
        }),
      },
      stats: [
        { value: districtData.population, label: t('pages.district.stats.population') },
        { value: String(districtData.venues.hotels.length), label: t('pages.district.stats.partnerHotels') },
        { value: t('pages.district.stats.travelTimeValue'), label: t('pages.district.stats.travelTime') },
        { value: t('pages.district.stats.eventsDoneValue'), label: t('pages.district.stats.eventsDone') },
      ],
      localVenues: {
        title: formatTemplate(t('pages.district.sections.localVenues.title'), { district: districtName }),
        subtitle: t('pages.district.sections.localVenues.subtitle'),
        venues: [
          ...districtData.venues.hotels.map((hotel) => ({
            name: hotel,
            type: t('pages.district.localVenues.types.hotel'),
            description: formatTemplate(t('pages.district.localVenues.descriptions.hotel'), {
              district: districtName,
            }),
          })),
          ...districtData.venues.eventSpaces.map((space) => ({
            name: space,
            type: t('pages.district.localVenues.types.eventSpace'),
            description: formatTemplate(t('pages.district.localVenues.descriptions.eventSpace'), {
              district: districtName,
            }),
          })),
        ],
      },
      transportInfo: {
        title: formatTemplate(t('pages.district.sections.transport.title'), { district: districtName }),
        subtitle: t('pages.district.sections.transport.subtitle'),
        subway: districtData.transport.subway,
        bus: districtData.transport.bus,
        parking: districtData.transport.parking,
      },
    };
  }, [districtData, t]);

  // 404 if district not found
  if (!districtData) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-on-light mb-8 text-4xl font-bold'>{t('pages.district.notFound.title')}</h1>
          <p className='mb-16 text-(--color-text-on-light-secondary)'>
            {t('pages.district.notFound.description')}
          </p>
          <Link to='/firmenfeiern'>
            <Button>{t('pages.district.notFound.cta')}</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!customContent) return null;

  // Breadcrumbs
  const breadcrumbs = [
    { label: t('nav.home'), path: '/' },
    { label: t('pages.district.breadcrumbs.corporateEvents'), path: '/firmenfeiern' },
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
          <EyebrowBadge className='mb-8'>{customContent.hero.eyebrow}</EyebrowBadge>
          <h1 className='mb-8 text-4xl font-bold lg:text-5xl'>
            {customContent.hero.title}
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
                {formatTemplate(t('pages.district.hero.primaryCta'), { district: districtData.name })}
              </Button>
            </Link>
            <Link to='/preise'>
              <Button
                variant='outline'
                size='lg'
                className='border-white text-(--color-text-on-dark-secondary) transition-colors duration-200 hover:bg-white hover:text-(--brand-primary)'
              >
                {t('pages.district.hero.secondaryCta')}
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
              {formatTemplate(t('pages.district.sections.characteristics.title'), {
                district: districtData.name,
              })}
            </h2>
            <p className='mx-auto max-w-3xl text-xl text-(--color-text-on-light-secondary)'>
              {t('pages.district.sections.characteristics.subtitle')}
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
                    {formatTemplate(t('pages.district.sections.characteristics.cardDescription'), {
                      district: districtData.name,
                    })}
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
                <h3 className='text-on-light text-lg font-semibold'>{t('pages.district.transport.subwayTitle')}</h3>
              </div>
              <div className='space-y-0'>
                {customContent.transportInfo.subway.map((line, index) => (
                  <div key={index} className='text-(--color-text-on-dark-secondary)'>
                    {formatTemplate(t('pages.district.transport.linePrefix'), { line })}
                  </div>
                ))}
              </div>
            </div>
            <div className='bg-navy-light flex h-full flex-col rounded-lg p-8'>
              <div className='mb-8 flex items-center'>
                <Users className='mr-0 h-6 w-6 text-(--brand-primary)' />
                <h3 className='text-on-light text-lg font-semibold'>{t('pages.district.transport.busTitle')}</h3>
              </div>
              <div className='space-y-0'>
                {customContent.transportInfo.bus.slice(0, 5).map((line, index) => (
                  <div key={index} className='text-(--color-text-on-dark-secondary)'>
                    {formatTemplate(t('pages.district.transport.linePrefix'), { line })}
                  </div>
                ))}
              </div>
            </div>
            <div className='bg-navy-light flex h-full flex-col rounded-lg p-8'>
              <div className='mb-8 flex items-center'>
                <Car className='mr-0 h-6 w-6 text-(--brand-primary)' />
                <h3 className='text-on-light text-lg font-semibold'>{t('pages.district.transport.parkingTitle')}</h3>
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
              {formatTemplate(t('pages.district.sections.businessFocus.title'), { district: districtData.name })}
            </h2>
            <p className='mx-auto max-w-3xl text-xl text-(--color-text-on-dark-secondary)'>
              {t('pages.district.sections.businessFocus.subtitle')}
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
            {formatTemplate(t('pages.district.sections.cta.title'), { district: districtData.name })}
          </h2>
          <p className='mx-auto mb-16 max-w-3xl text-xl opacity-90'>
            {t('pages.district.sections.cta.description')}
          </p>
          <div className='flex flex-col justify-center gap-8 sm:flex-row'>
            <Link to='/anfrage'>
              <Button
                variant='secondary'
                size='lg'
                className='bg-white text-(--brand-primary) transition-colors duration-200 hover:bg-white/90'
              >
                <Phone className='mr-0 h-5 w-5' />
                {t('pages.district.sections.cta.primary')}
              </Button>
            </Link>
            <Link to='/kontakt'>
              <Button
                variant='outline'
                size='lg'
                className='border-white text-(--color-text-on-dark-secondary) transition-colors duration-200 hover:bg-white hover:text-(--brand-primary)'
              >
                <Mail className='mr-0 h-5 w-5' />
                {t('pages.district.sections.cta.secondary')}
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
              {t('pages.district.sections.nearby.title')}
            </h2>
            <p className='mx-auto max-w-3xl text-xl text-(--color-text-on-light-secondary)'>
              {t('pages.district.sections.nearby.subtitle')}
            </p>
          </div>
          <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-4'>
            {districtData.nearbyDistricts.map((nearby, index) => {
              const nearbyDistrict = getDistrictBySlug(nearby, language);
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
                        {formatTemplate(t('pages.district.sections.nearby.population'), {
                          population: nearbyDistrict.population,
                        })}
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
