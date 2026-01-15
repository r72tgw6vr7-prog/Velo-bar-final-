import React, { useState, useEffect } from 'react';
import { PageTemplate } from '@/templates/PageTemplate';
import { Section } from '@/components/atoms/Section/Section.tsx';
import { StickyScroll } from '@/components/ui/sticky-scroll-reveal.tsx';
import { HeroHeading } from '@/components/ui/HeroHeading.tsx';
import { ScrollReveal } from '@/components/atoms/ScrollReveal.tsx';
import { Helmet } from 'react-helmet-async';
import { getServiceSchema, getBreadcrumbSchema, combineSchemas } from '@/seo/schema.ts';
import { useLanguage } from '@/contexts/LanguageContext.tsx';

type ServicesContentItem = {
  id: string;
  title: string;
  description: string;
  content: React.ReactNode;
 };

const ServicesPage: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { t } = useLanguage();

  const servicesContent: ServicesContentItem[] = [
    {
      id: 'firmenfeiern',
      title: t('pages.services.cards.corporate.title'),
      description: t('pages.services.cards.corporate.description'),
      content: (
        <div className='flex h-full w-full flex-col justify-center gap-4 rounded-3xl border border-(--color-bg-surface) bg-(--color-bg-surface) px-10 py-12 text-(--color-text-on-light)'>
          <h3 className='text-2xl font-semibold tracking-tight text-(--color-coral)'>
            {t('pages.services.cards.corporate.heading')}
          </h3>
          <ul className='space-y-2 text-base text-(--color-text-on-light-secondary)'>
            <li>✓ {t('pages.services.cards.corporate.bullets.0')}</li>
            <li>✓ {t('pages.services.cards.corporate.bullets.1')}</li>
            <li>✓ {t('pages.services.cards.corporate.bullets.2')}</li>
            <li>✓ {t('pages.services.cards.corporate.bullets.3')}</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'weihnachtsfeiern',
      title: t('pages.services.cards.christmas.title'),
      description: t('pages.services.cards.christmas.description'),
      content: (
        <div className='flex h-full w-full flex-col justify-center gap-4 rounded-3xl border border-(--color-bg-surface) bg-(--color-bg-surface) px-10 py-12 text-(--color-text-on-light)'>
          <h3 className='text-2xl font-semibold tracking-tight text-(--color-coral)'>
            {t('pages.services.cards.christmas.heading')}
          </h3>
          <ul className='space-y-2 text-base text-(--color-text-on-light-secondary)'>
            <li>✓ {t('pages.services.cards.christmas.bullets.0')}</li>
            <li>✓ {t('pages.services.cards.christmas.bullets.1')}</li>
            <li>✓ {t('pages.services.cards.christmas.bullets.2')}</li>
            <li>✓ {t('pages.services.cards.christmas.bullets.3')}</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'messe',
      title: t('pages.services.cards.trade.title'),
      description: t('pages.services.cards.trade.description'),
      content: (
        <div className='flex h-full w-full flex-col justify-center gap-4 rounded-3xl border border-(--color-bg-surface) bg-(--color-bg-surface) px-10 py-12 text-(--color-text-on-light)'>
          <h3 className='text-2xl font-semibold tracking-tight text-(--color-coral)'>
            {t('pages.services.cards.trade.heading')}
          </h3>
          <ul className='space-y-2 text-base text-(--color-text-on-light-secondary)'>
            <li>✓ {t('pages.services.cards.trade.bullets.0')}</li>
            <li>✓ {t('pages.services.cards.trade.bullets.1')}</li>
            <li>✓ {t('pages.services.cards.trade.bullets.2')}</li>
            <li>✓ {t('pages.services.cards.trade.bullets.3')}</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'team-events',
      title: t('pages.services.cards.team.title'),
      description: t('pages.services.cards.team.description'),
      content: (
        <div className='flex h-full w-full flex-col justify-center gap-4 rounded-3xl border border-(--color-bg-surface) bg-(--color-bg-surface) px-10 py-12 text-(--color-text-on-light)'>
          <h3 className='text-2xl font-semibold tracking-tight text-(--color-coral)'>
            {t('pages.services.cards.team.heading')}
          </h3>
          <ul className='space-y-2 text-base text-(--color-text-on-light-secondary)'>
            <li>✓ {t('pages.services.cards.team.bullets.0')}</li>
            <li>✓ {t('pages.services.cards.team.bullets.1')}</li>
            <li>✓ {t('pages.services.cards.team.bullets.2')}</li>
            <li>✓ {t('pages.services.cards.team.bullets.3')}</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'private-feiern',
      title: t('pages.services.cards.private.title'),
      description: t('pages.services.cards.private.description'),
      content: (
        <div className='flex h-full w-full flex-col justify-center gap-4 rounded-3xl border border-(--color-bg-surface) bg-(--color-bg-surface) px-10 py-12 text-(--color-text-on-light)'>
          <h3 className='text-2xl font-semibold tracking-tight text-(--color-coral)'>
            {t('pages.services.cards.private.heading')}
          </h3>
          <ul className='space-y-2 text-base text-(--color-text-on-light-secondary)'>
            <li>✓ {t('pages.services.cards.private.bullets.0')}</li>
            <li>✓ {t('pages.services.cards.private.bullets.1')}</li>
            <li>✓ {t('pages.services.cards.private.bullets.2')}</li>
            <li>✓ {t('pages.services.cards.private.bullets.3')}</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'hochzeiten',
      title: t('pages.services.cards.weddings.title'),
      description: t('pages.services.cards.weddings.description'),
      content: (
        <div className='flex h-full w-full flex-col justify-center gap-4 rounded-3xl border border-(--color-bg-surface) bg-(--color-bg-surface) px-10 py-12 text-(--color-text-on-light)'>
          <h3 className='text-2xl font-semibold tracking-tight text-(--color-coral)'>
            {t('pages.services.cards.weddings.heading')}
          </h3>
          <ul className='space-y-2 text-base text-(--color-text-on-light-secondary)'>
            <li>✓ {t('pages.services.cards.weddings.bullets.0')}</li>
            <li>✓ {t('pages.services.cards.weddings.bullets.1')}</li>
            <li>✓ {t('pages.services.cards.weddings.bullets.2')}</li>
            <li>✓ {t('pages.services.cards.weddings.bullets.3')}</li>
          </ul>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // SEO: Service schema for all offerings on one page
  const servicesOverviewSchema = combineSchemas(
    getServiceSchema({
      name: t('pages.services.schema.serviceName'),
      description: t('pages.services.schema.serviceDescription'),
      serviceType: 'Event Catering',
      areaServed: ['München', 'Coburg', 'Bayern'],
      url: 'https://www.velo-bar.com/leistungen',
    }),
    getBreadcrumbSchema([
      { name: t('nav.home'), url: 'https://www.velo-bar.com' },
      { name: t('nav.services'), url: 'https://www.velo-bar.com/leistungen' },
    ]),
  );

  return (
    <PageTemplate
      title={t('pages.services.seo.title')}
      description={t('pages.services.seo.description')}
      canonicalPath='/leistungen'
      withContainer={false}
      background='transparent'
    >
      <Helmet>
        <script type='application/ld+json'>{JSON.stringify(servicesOverviewSchema)}</script>
      </Helmet>
      <main id='main-content' role='main' className='services-page'>
        <Section
          as='header'
          container='default'
          spacing='sm'
          background='dark'
          className='flex min-h-[25vh] items-center'
        >
          <HeroHeading
            eyebrow={t('pages.services.hero.eyebrow')}
            title={t('pages.services.hero.title')}
            subtitle={t('pages.services.hero.subtitle')}
          />
        </Section>

        <Section
          container='full'
          spacing='none'
          background='transparent'
          className='services-section services-beige parallax-container'
        >
          {isMobile ? (
            <div className='mobile-services-stack space-y-6 px-6 py-8'>
              {servicesContent.map((service, index) => (
                <div key={service.id} className='service-block-mobile space-y-4'>
                  {/* Main Service Card */}
                  <ScrollReveal
                    variant='fadeUp'
                    delay={index * 0.15}
                    className='service-card-mobile'
                  >
                    <div className='flex h-full w-full flex-col justify-center gap-4 rounded-3xl bg-(--color-bg-surface) px-10 py-12'>
                      <h3 className='text-2xl font-semibold tracking-tight text-accent-primary'>
                        {service.title}
                      </h3>
                      <p className='text-base leading-relaxed text-(--color-text-on-light-secondary)'>
                        {service.description}
                      </p>
                    </div>
                  </ScrollReveal>

                  {/* Associated Info Card */}
                  <ScrollReveal
                    variant='fadeUp'
                    delay={index * 0.15 + 0.1}
                    className='info-card-mobile'
                  >
                    {service.content}
                  </ScrollReveal>
                </div>
              ))}
            </div>
          ) : (
            <StickyScroll content={servicesContent} />
          )}
        </Section>
      </main>
    </PageTemplate>
  );
};

export default ServicesPage;
