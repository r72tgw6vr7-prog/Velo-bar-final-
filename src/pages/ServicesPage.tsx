import React, { useState, useEffect } from 'react';
import { PageTemplate } from '@/templates/PageTemplate';
import { Section } from '@/components/atoms/Section/Section';
import { StickyScroll } from '@/components/ui/sticky-scroll-reveal';
import { HeroHeading } from '@/components/ui/HeroHeading';
import { ScrollReveal } from '@/components/atoms/ScrollReveal';

type ServicesContentItem = {
  title: string;
  description: string;
  content: React.ReactNode;
};

const servicesContent: ServicesContentItem[] = [
  {
    title: 'Firmenfeiern',
    description:
      'Mobile Cocktailbar für Firmenfeiern von 50–500 Gästen. Premium-Drinks, professionelles Team und reibungslose Abläufe – perfekt für Weihnachtsfeiern, Sommerfeste und Kick-offs.',
    content: (
      <div className='flex h-full w-full flex-col justify-center gap-4 rounded-3xl border border-(--color-bg-surface) bg-(--color-bg-surface) px-10 py-12 text-(--color-text-on-light)'>
        <h3 className='text-2xl font-semibold tracking-tight text-(--color-coral)'>
          Corporate Events
        </h3>
        <ul className='space-y-2 text-base text-(--color-text-on-light-secondary)'>
          <li>✓ Komplettes Bar-Setup inkl. Equipment</li>
          <li>✓ Individuelle Cocktailkarte im CI des Unternehmens</li>
          <li>✓ 2–4 Barkeeper je nach Gästezahl</li>
          <li>✓ Reporting & Abrechnung nach Event</li>
        </ul>
      </div>
    ),
  },
  {
    title: 'Weihnachtsfeiern',
    description:
      'Winterliche Signature-Drinks, Glühwein-Varianten und stimmungsvolle Dekoration – garantiert festliche Atmosphäre für Teams und Kund:innen.',
    content: (
      <div className='flex h-full w-full flex-col justify-center gap-4 rounded-3xl border border-(--color-bg-surface) bg-(--color-bg-surface) px-10 py-12 text-(--color-text-on-light)'>
        <h3 className='text-2xl font-semibold tracking-tight text-(--color-coral)'>
          Seasonal Specials
        </h3>
        <ul className='space-y-2 text-base text-(--color-text-on-light-secondary)'>
          <li>✓ Glühwein, Punsch & alkoholfreie Alternativen</li>
          <li>✓ Zimt, Orange & Gewürz-Essenzen für Winter-Cocktails</li>
          <li>✓ Stimmungsvolles Bar-Setup mit warmen Lichtern</li>
          <li>✓ Optionale Team-Challenges wie Cocktail-Workshops</li>
        </ul>
      </div>
    ),
  },
  {
    title: 'Messen & Trade Shows',
    description:
      'Kompakte Bar für Messestände, Showrooms und Produktlaunches. Maximiert Verweildauer und Gesprächsqualität an Ihrem Stand.',
    content: (
      <div className='flex h-full w-full flex-col justify-center gap-4 rounded-3xl border border-(--color-bg-surface) bg-(--color-bg-surface) px-10 py-12 text-(--color-text-on-light)'>
        <h3 className='text-2xl font-semibold tracking-tight text-(--color-coral)'>Messepakete</h3>
        <ul className='space-y-2 text-base text-(--color-text-on-light-secondary)'>
          <li>✓ Kompakte Fläche (ab 2×2 m)</li>
          <li>✓ Branding-Optionen an Bar & Gläsern</li>
          <li>✓ Schneller Auf- und Abbau auch bei straffen Timings</li>
          <li>✓ Flexible Zeitslots (z.B. Messe-Happy-Hour)</li>
        </ul>
      </div>
    ),
  },
  {
    title: 'Team-Events',
    description:
      'Mixology-Workshops und interaktive Tastings, die Teams zusammenbringen und neue Geschmackserlebnisse eröffnen.',
    content: (
      <div className='flex h-full w-full flex-col justify-center gap-4 rounded-3xl border border-(--color-bg-surface) bg-(--color-bg-surface) px-10 py-12 text-(--color-text-on-light)'>
        <h3 className='text-2xl font-semibold tracking-tight text-(--color-coral)'>
          Mixology Sessions
        </h3>
        <ul className='space-y-2 text-base text-(--color-text-on-light-secondary)'>
          <li>✓ Geführte Cocktail-Workshops mit Profi-Barkeeper:innen</li>
          <li>✓ Team-Challenges & Blind-Tastings</li>
          <li>✓ Wahlweise alkoholfreie oder klassische Rezepte</li>
          <li>✓ Dokumentation der Rezepte zum Mitnehmen</li>
        </ul>
      </div>
    ),
  },
  {
    title: 'Private Feiern',
    description:
      'Geburtstage, Gartenfeste, Jubiläen – wir bringen die Bar zu Ihnen nach Hause oder in Ihre Wunschlocation.',
    content: (
      <div className='flex h-full w-full flex-col justify-center gap-4 rounded-3xl border border-(--color-bg-surface) bg-(--color-bg-surface) px-10 py-12 text-(--color-text-on-light)'>
        <h3 className='text-2xl font-semibold tracking-tight text-(--color-coral)'>
          Private Events
        </h3>
        <ul className='space-y-2 text-base text-(--color-text-on-light-secondary)'>
          <li>✓ 1–2 Barkeeper abgestimmt auf Gästezahl</li>
          <li>✓ Auswahl klassischer & moderner Cocktails</li>
          <li>✓ Optional: Gin- oder Cocktail-Tasting</li>
          <li>✓ Auf Wunsch mit mobiler Backbar & Dekor</li>
        </ul>
      </div>
    ),
  },
  {
    title: 'Hochzeiten',
    description:
      'Begleitung Ihres Hochzeitstages von Empfang bis Mitternachtsbar. Signature Cocktails, stilvolle Präsentation und zuverlässiger Service.',
    content: (
      <div className='flex h-full w-full flex-col justify-center gap-4 rounded-3xl border border-(--color-bg-surface) bg-(--color-bg-surface) px-10 py-12 text-(--color-text-on-light)'>
        <h3 className='text-2xl font-semibold tracking-tight text-(--color-coral)'>Wedding Bar</h3>
        <ul className='space-y-2 text-base text-(--color-text-on-light-secondary)'>
          <li>✓ Welcome Drinks & Aperitifs für den Empfang</li>
          <li>✓ Individuelle Hochzeits-Signatures</li>
          <li>✓ Nahtlose Abstimmung mit Trauzeug:innen & Location</li>
          <li>✓ Optional: alkoholfreie Menübegleitung</li>
        </ul>
      </div>
    ),
  },
];

const ServicesPage: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <PageTemplate
      title='Leistungen | Mobile Cocktailbar | Velo.Bar'
      description='Alle Leistungen auf einen Blick: Firmenfeiern, Weihnachtsfeiern, Messe-Catering, Team-Events, Private Feiern und Hochzeiten in München & Coburg.'
      canonicalPath='/leistungen'
      withContainer={false}
      background='transparent'
    >
      <main id='main-content' role='main' className='services-page'>
        <Section
          as='header'
          container='default'
          spacing='sm'
          background='dark'
          className='flex min-h-[25vh] items-center'
        >
          <HeroHeading
            eyebrow='Unsere Leistungen'
            title='DEINE SERVICES AUF EINEN BLICK'
            subtitle='Von Firmenfeier bis Hochzeit: Wähle den passenden Service. Wir machen dir in wenigen Minuten ein Angebot an.'
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
                <div key={service.title} className='service-block-mobile space-y-4'>
                  {/* Main Service Card */}
                  <ScrollReveal
                    variant='fadeUp'
                    delay={index * 0.15}
                    className='service-card-mobile'
                  >
                    <div className='flex h-full w-full flex-col justify-center gap-4 rounded-3xl bg-(--color-teal) px-10 py-12 text-(--offwhite-primary)'>
                      <h3 className='text-2xl font-semibold tracking-tight text-(--color-coral)'>
                        {service.title}
                      </h3>
                      <p className='text-base leading-relaxed text-(--text-dark-tea)'>
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
