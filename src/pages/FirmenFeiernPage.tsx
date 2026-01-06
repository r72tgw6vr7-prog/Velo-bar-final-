/**
 * FirmenFeiernPage - Premium B2B Corporate Events Service Page
 * =============================================================
 * Refactored to use content layer for all copy.
 * All text content is now in: src/content/firmenfeiern.ts
 * SEO: Service schema + optimized meta tags
 */

import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { PageTemplate } from '@/templates/PageTemplate';
import { Section } from '@/components/atoms/Section/Section';
import { Button } from '@/components/atoms/Button/Button';
import { Breadcrumbs } from '@/components/atoms/Breadcrumbs';
import {
  ArrowRight,
  Check,
  ChevronDown,
  Users,
  Clock,
  Building2,
  Star,
  Mail,
  Bike,
  Leaf,
  Zap,
  Shield,
} from 'lucide-react';
import Footer from '@/components/pages/Footer';
import { useContent } from '@/hooks/useContent';
import { getServiceSchema, getBreadcrumbSchema, combineSchemas, getFAQSchema } from '@/seo/schema';

// Icon mapping for dynamic icon rendering
const iconMap = {
  Bike,
  Leaf,
  Zap,
  Shield,
  Star,
  Building2,
  Users,
} as const;

// FAQ snippets for featured snippets optimization
const faqSnippets = {
  pricing: [
    {
      question: 'Was kostet eine mobile Bar für eine Firmenfeier?',
      answer:
        'Eine mobile Bar für Firmenfeiern kostet ab 1.190€ für 4 Stunden (50 Gäste). Premium-Pakete mit Signature-Drinks und Branding ab 2.190€. Alle Preise inklusive Barkeeper, Glas, Zutaten und Equipment – vollständig autark ohne Strom.',
    },
    {
      question: 'Wie viel Platz wird für eine mobile Cocktailbar benötigt?',
      answer:
        'Nur 2m² Stellfläche wird für unsere Fahrrad-Bar benötigt. Die kompakte mobile Bar passt in jeden Raum oder auf jede Terrasse. Ideal für限制te Locations oder als zusätzlicher Eye-Catcher.',
    },
  ],
  planning: [
    {
      question: 'Wie lange vorher sollte man eine mobile Bar für Firmenfeiern buchen?',
      answer:
        'Buchen Sie 4-6 Wochen im Voraus für beste Verfügbarkeit. Kurzfristige Buchungen bis 1 Woche vorher möglich, abhängig von Kapazität. Saisonhochpunkte (November/Dezember) früher reservieren.',
    },
    {
      question: 'Welche Cocktails eignen sich am besten für Firmenfeiern?',
      answer:
        'Beliebte Firmenfeier-Cocktails: Aperol Spritz, Gin Tonic, Prosecco mit Beeren, Mojito. Diese benötigen 30-60 Sekunden pro Drink, ermöglichen hohen Durchsatz und gefallen den meisten Gästen.',
    },
  ],
  logistics: [
    {
      question: 'Benötigt die mobile Bar Strom oder Wasseranschluss?',
      answer:
        'Nein. Unsere Fahrrad-Bar ist 100% autark – kein Strom, kein Wasser nötig. Funktioniert überall, egal ob im Büro, auf dem Parkdeck oder im Freien. Perfekt für schwierige Locations.',
    },
    {
      question: 'Wie viele Gäste kann eine mobile Bar bedienen?',
      answer:
        'Eine Bar bedient bis zu 150 Gäste bei 4 Stunden. Bei mehr Gästen empfehlen wir eine zweite Bar. Unser Barkeeper mixt bis zu 120 Cocktails pro Stunde – keine Wartezeiten.',
    },
  ],
};

const FirmenFeiernPage: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [_showLeadMagnet, _setShowLeadMagnet] = useState(false);

  // Get content in current language
  const { firmenfeiern: content } = useContent();

  // Content shortcuts
  const {
    hero,
    stats: _stats,
    trustIndicators,
    leadMagnet: _leadMagnet,
    bicycleAdvantages,
    story,
    pricingTiers,
    relatedServices,
    faqs,
    cta,
    finalCta,
  } = content;

  // SEO: Generate structured data for this service page
  const structuredData = useMemo(() => {
    // Generate FAQPage schema for each snippet category
    const faqSchemas = Object.entries(faqSnippets).map(([_category, faqs]) => getFAQSchema(faqs));

    return combineSchemas(
      getServiceSchema({
        name: 'Cocktail-Catering für Firmenfeiern',
        description:
          'Premium mobile Cocktailbar für Firmenfeiern in München. All-inclusive Barkeeper-Service für 50-500+ Gäste. Autark ohne Strom oder Wasseranschluss.',
        url: 'https://www.velo-bar.com/firmenfeiern',
        image: 'https://www.velo-bar.com/images/services/firmenfeiern-cocktailbar.webp',
        areaServed: ['München', 'Coburg', 'Bayern'],
        serviceType: 'CorporateEventCatering',
      }),
      getBreadcrumbSchema([
        { name: 'Home', url: 'https://www.velo-bar.com' },
        { name: 'Firmenfeiern', url: 'https://www.velo-bar.com/firmenfeiern' },
      ]),
      ...faqSchemas,
    );
  }, []);

  return (
    <PageTemplate
      title={content.seoTitle}
      description={content.seoDescription}
      canonicalPath='/firmenfeiern'
      structuredData={structuredData}
      withContainer={false}
      background='transparent'
    >
      <main id='main-content' role='main'>
        {/* Breadcrumbs */}
        <Section container='default' spacing='none' className='py-8'>
          <Breadcrumbs />
        </Section>

        {/* Hero Section */}
        <Section container='default' spacing='xl' background='dark' className='py-16 md:py-24'>
          <div className='mx-auto max-w-4xl text-center'>
            <span className='text-accent-primary mb-8 inline-block rounded-full bg-(--color-bg-surface-tinted) px-8 py-2 text-sm font-semibold'>
              {hero.eyebrow}
            </span>

            <h1 className='text-accent-primary mb-8 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl'>
              {hero.title}
            </h1>

            <p className='text-accent-primary mb-8 text-xl font-semibold md:text-2xl'>
              {hero.subtitle}
            </p>

            <p className='mx-auto mb-8 max-w-3xl text-lg leading-relaxed text-(--color-text-on-dark-secondary) md:text-xl'>
              {content.sections[0]?.body?.[0]}
            </p>

            {/* CTA Section */}
            <Section container='narrow' spacing='xl' background='darker'>
              <div className='text-center'>
                <h2 className='mb-8 text-3xl font-bold text-white md:text-4xl'>
                  Kostenloses Angebot in 2 Stunden
                </h2>
                <p className='mx-auto mb-8 max-w-xl text-lg text-(--color-text-on-dark-secondary)'>
                  Teilen Sie uns Ihre Anforderungen mit und Sie erhalten ein maßgeschneidertes
                  Angebot – innerhalb von 2 Stunden.
                </p>

                <div className='flex flex-col justify-center gap-8 sm:flex-row'>
                  <Button variant='primary' size='lg' asChild>
                    <Link to={cta.primary.href}>
                      {cta.primary.label}
                      <ArrowRight className='ml-0' size={20} />
                    </Link>
                  </Button>
                  {cta.secondary && (
                    <Button variant='outline' size='lg' asChild>
                      <a href={cta.secondary.href}>
                        <Mail className='mr-0' size={20} />
                        {cta.secondary.label}
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </Section>
          </div>
        </Section>
        {/* Trust Indicators */}
        <Section
          container='default'
          spacing='md'
          background='dark'
          className='border-y border-white/10'
        >
          <div className='flex flex-wrap items-center justify-center gap-8 text-(--color-text-on-dark-secondary) md:gap-16'>
            {trustIndicators.map((indicator, index) => {
              const IconComponent = iconMap[indicator.icon as keyof typeof iconMap];
              return (
                <div key={index} className='flex items-center gap-0'>
                  {IconComponent && (
                    <IconComponent
                      className={
                        indicator.icon === 'Star'
                          ? 'text-accent-primary fill-accent-primary'
                          : indicator.icon === 'Leaf'
                            ? 'text-green-500'
                            : ''
                      }
                      size={20}
                    />
                  )}
                  <span className={index === 0 ? 'font-medium' : ''}>{indicator.text}</span>
                </div>
              );
            })}
          </div>
        </Section>

        {/* FAQ Snippets: Pricing */}
        <Section container='narrow' spacing='md' background='light'>
          <div className='mb-8 text-center'>
            <h2 className='text-on-light mb-0 text-2xl font-bold'>Kosten & Platzbedarf</h2>
            <p className='text-sm text-(--color-text-on-light-secondary)'>
              Direkte Antworten zur Budgetplanung
            </p>
          </div>
          <div className='space-y-8'>
            {faqSnippets.pricing.map((faq, index) => (
              <div
                key={index}
                className='snippet-block bg-navy-light border-accent-primary rounded-r-lg border-l-4 p-8 shadow-sm'
              >
                <h3 className='text-on-light mb-0 text-lg font-semibold'>{faq.question}</h3>
                <p className='leading-relaxed text-(--color-text-on-light-secondary)'>
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* Lead Magnet Section */}
        <Section
          container='narrow'
          spacing='lg'
          background='transparent'
          className='bg-accent-primary'
        >
          <div className='text-center'>
            <h2 className='mb-8 text-3xl font-bold text-white md:text-4xl'>
              Kostenloses Angebot in 2 Stunden
            </h2>
            <p className='mx-auto mb-8 max-w-xl text-lg text-(--color-text-on-dark-secondary)'>
              Teilen Sie uns Ihre Anforderungen mit und Sie erhalten ein maßgeschneidertes Angebot –
              garantiert innerhalb von 2 Stunden während der Geschäftszeiten.
            </p>

            <div className='flex flex-col justify-center gap-8 sm:flex-row'>
              <Button variant='inverse' size='lg' asChild>
                <Link to='/anfrage'>
                  {hero.primaryCtaLabel}
                  <ArrowRight className='ml-0' size={20} />
                </Link>
              </Button>
              <Button variant='outline' size='lg' asChild>
                <a href='tel:+4916094623196'>
                  <Mail className='mr-0' size={20} />
                  {hero.secondaryCtaLabel}
                </a>
              </Button>
            </div>
          </div>
        </Section>

        {/* Bicycle USP Section */}
        <Section container='default' spacing='xl' background='light'>
          <div className='mb-16 text-center'>
            <h2 className='text-on-light mb-8 text-3xl font-bold md:text-4xl'>
              Warum unsere Fahrrad-Bar der Unterschied ist
            </h2>
            <p className='mx-auto max-w-2xl text-lg text-(--color-text-on-light-secondary)'>
              Einzigartig in München: Nachhaltig, platzsparend und ein echter Hingucker für Ihre
              Gäste
            </p>
          </div>

          <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-4'>
            {bicycleAdvantages.map((advantage) => {
              const IconComponent = iconMap[advantage.icon as keyof typeof iconMap];
              return (
                <div
                  key={advantage.id}
                  className='card bg-navy-light flex h-full flex-col rounded-2xl border border-white/10 p-8 duration-200 ease-out'
                >
                  <div className='mb-8 flex h-12 h-full w-12 flex-col items-center justify-center rounded-xl bg-(--color-bg-surface-tinted)'>
                    {IconComponent && <IconComponent className='text-accent-primary' size={24} />}
                  </div>
                  <h3 className='text-on-light mb-0 text-lg font-bold'>{advantage.title}</h3>
                  <p className='text-sm text-(--color-text-on-light-secondary)'>
                    {advantage.description}
                  </p>
                </div>
              );
            })}
          </div>
        </Section>

        {/* FAQ Snippets: Planning */}
        <Section container='narrow' spacing='md' background='light'>
          <div className='mb-8 text-center'>
            <h2 className='text-on-light mb-0 text-2xl font-bold'>Buchung & Cocktail-Auswahl</h2>
            <p className='text-sm text-(--color-text-on-light-secondary)'>
              Wichtige Tipps für Ihre Firmenfeier-Planung
            </p>
          </div>
          <div className='space-y-8'>
            {faqSnippets.planning.map((faq, index) => (
              <div
                key={index}
                className='snippet-block bg-navy-light border-accent-primary rounded-r-lg border-l-4 p-8 shadow-sm'
              >
                <h3 className='text-on-light mb-0 text-lg font-semibold'>{faq.question}</h3>
                <p className='leading-relaxed text-(--color-text-on-light-secondary)'>
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* Story Section */}
        <Section container='default' spacing='xl' background='light'>
          <div className='grid items-center gap-16 lg:grid-cols-2'>
            <div>
              <span className='text-accent-primary mb-0 block text-sm font-semibold'>
                {story.eyebrow}
              </span>
              <h2 className='text-on-light mb-8 text-3xl font-bold md:text-4xl'>{story.title}</h2>
              <div className='prose prose-lg prose-headings:text-on-light prose-strong:text-on-light text-(--color-text-on-light-secondary)'>
                {story.paragraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    dangerouslySetInnerHTML={{
                      __html: paragraph
                        .replace(
                          /Premium-Cocktails, nachhaltig und mobil – überall/,
                          '<strong>Premium-Cocktails, nachhaltig und mobil – überall.</strong>',
                        )
                        .replace(
                          /Unsere Spezialisierung:/,
                          '<strong>Unsere Spezialisierung:</strong>',
                        ),
                    }}
                  />
                ))}
              </div>
              <div className='mt-8 flex gap-8'>
                {story.stats.map((stat, index) => (
                  <div key={index}>
                    <div className='text-accent-primary text-3xl font-bold'>{stat.value}</div>
                    <div className='text-sm text-black/60'>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className='bg-navy-light flex h-full flex-col rounded-2xl border border-white/10 p-8'>
              <h3 className='text-on-light mb-8 text-xl font-bold'>
                München & Coburg – Dual-Location Vorteil
              </h3>
              <ul className='space-y-8'>
                {story.locations.map((location, index) => (
                  <li key={index} className='flex gap-0'>
                    <Check className='mt-0 shrink-0 text-green-500' size={20} />
                    <div>
                      <strong className='text-on-light'>{location.title}</strong>
                      <span className='text-(--color-text-on-light-secondary)'>
                        {' '}
                        {location.description}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* Pricing Table */}
        <Section container='default' spacing='xl' background='light'>
          <div className='mb-16 text-center'>
            <h2 className='text-on-light mb-8 text-3xl font-bold md:text-4xl'>
              Kosten Mobile Bar Firmenfeier – Transparente Pakete
            </h2>
            <p className='mx-auto max-w-2xl text-lg text-(--color-text-on-light-secondary)'>
              All-inclusive Preise ohne versteckte Kosten. MwSt. auf Wunsch inklusive ausgewiesen.
            </p>
          </div>

          <div className='grid gap-8 md:grid-cols-3 lg:gap-8'>
            {pricingTiers.map((tier) => (
              <div
                key={tier.id}
                className={`relative rounded-2xl p-8 ${
                  tier.highlighted
                    ? 'card card--featured ring-accent-primary scale-105 bg-(--color-bg-surface-tinted) ring-2'
                    : 'card bg-navy-light border border-white/10'
                } transition-all`}
              >
                {tier.highlighted && (
                  <div className='absolute -top-4 left-1/2 -translate-x-1/2'>
                    <span className='bg-accent-primary text-navy-dark rounded-full px-8 py-0 text-sm font-semibold'>
                      Beliebteste Wahl
                    </span>
                  </div>
                )}

                <h3 className='text-on-light mb-0 text-xl font-bold'>{tier.name}</h3>
                <div className='mb-8'>
                  <span className='text-accent-primary text-4xl font-bold'>
                    {tier.pricePerGuest}
                  </span>
                  <span className='ml-0 text-black/60'>/ Gast</span>
                </div>
                <div className='mb-8 text-sm text-black/60'>
                  <div>
                    ab {tier.basePrice} ({tier.guests})
                  </div>
                  <div className='mt-0 flex items-center gap-0'>
                    <Clock size={14} />
                    {tier.duration} Service
                  </div>
                </div>

                <ul className='mb-8 space-y-0'>
                  {tier.benefits.map((benefit, i) => (
                    <li
                      key={i}
                      className='flex items-start gap-0 text-(--color-text-on-light-secondary)'
                    >
                      <Check size={18} className='mt-0.5 shrink-0 text-green-500' />
                      {benefit}
                    </li>
                  ))}
                </ul>

                <Button
                  variant={tier.highlighted ? 'primary' : 'secondary'}
                  size='lg'
                  fullWidth
                  asChild
                >
                  <Link to='/anfrage'>
                    {tier.cta}
                    <ArrowRight className='ml-0' size={18} />
                  </Link>
                </Button>
              </div>
            ))}
          </div>

          <p className='mt-8 text-center text-sm text-black/60'>
            Alle Preise zzgl. MwSt. (auf Wunsch inkl. MwSt. ausweisbar). Individuelle Pakete auf
            Anfrage.
          </p>
        </Section>

        {/* FAQ Snippets: Logistics */}
        <Section container='narrow' spacing='md' background='light'>
          <div className='mb-8 text-center'>
            <h2 className='text-on-light mb-0 text-2xl font-bold'>
              Technische Anforderungen & Kapazität
            </h2>
            <p className='text-sm text-(--color-text-on-light-secondary)'>
              Alles Wichtige zu Standort und Gästen
            </p>
          </div>
          <div className='space-y-8'>
            {faqSnippets.logistics.map((faq, index) => (
              <div
                key={index}
                className='snippet-block bg-navy-light border-accent-primary rounded-r-lg border-l-4 p-8 shadow-sm'
              >
                <h3 className='text-on-light mb-0 text-lg font-semibold'>{faq.question}</h3>
                <p className='leading-relaxed text-(--color-text-on-light-secondary)'>
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* Related Services */}
        <Section container='default' spacing='lg' background='light'>
          <div className='mb-8 text-center'>
            <h2 className='text-on-light mb-0 text-2xl font-bold'>
              Weitere Services für Unternehmen
            </h2>
          </div>
          <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-4'>
            {relatedServices.map((service) => (
              <Link
                key={service.href}
                to={service.href}
                className='card bg-navy-light group flex h-full flex-col rounded-xl border border-white/10 p-8 duration-200 ease-out'
              >
                <h3 className='text-on-light group-hover:text-accent-primary mb-0 font-bold transition duration-200 ease-out'>
                  {service.title}
                </h3>
                <p className='text-sm text-(--color-text-on-light-secondary)'>
                  {service.description}
                </p>
              </Link>
            ))}
          </div>
        </Section>

        {/* CTA Section */}
        <Section container='narrow' spacing='xl' background='dark'>
          <div className='text-center'>
            <h2 className='mb-8 text-3xl font-bold text-white md:text-4xl'>
              Kostenloses Angebot in 2 Stunden
            </h2>
            <p className='mx-auto mb-8 max-w-xl text-lg text-(--color-text-on-dark-secondary)'>
              Teilen Sie uns Ihre Anforderungen mit und Sie erhalten ein maßgeschneidertes Angebot –
              innerhalb von 2 Stunden.
            </p>

            <div className='flex flex-col justify-center gap-8 sm:flex-row'>
              <Button variant='primary' size='lg' asChild>
                <Link to={cta.primary.href}>
                  {cta.primary.label}
                  <ArrowRight className='ml-0' size={20} />
                </Link>
              </Button>
              {cta.secondary && (
                <Button variant='outline' size='lg' asChild>
                  <a href={cta.secondary.href}>
                    <Mail className='mr-0' size={20} />
                    {cta.secondary.label}
                  </a>
                </Button>
              )}
            </div>
          </div>
        </Section>

        {/* FAQ Accordion */}
        <Section container='default' spacing='xl' background='light'>
          <div className='mb-16 text-center'>
            <h2 className='text-on-light mb-8 text-3xl font-bold md:text-4xl'>
              Häufige Fragen zu Firmenfeiern
            </h2>
            <p className='text-(--color-text-on-light-secondary)'>
              Alle wichtigen Informationen für Ihre Planung
            </p>
          </div>

          <div className='space-y-8'>
            {faqs.map((faq, index) => (
              <div
                key={faq.id}
                className='bg-navy-light overflow-hidden rounded-xl border border-white/10'
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  className='flex w-full items-center justify-between p-8 text-left transition-colors duration-200 ease-out hover:bg-black/5'
                >
                  <span className='text-on-light pr-8 font-semibold'>{faq.question}</span>
                  <ChevronDown
                    className={`shrink-0 text-black/40 transition-transform ${
                      openFaqIndex === index ? 'rotate-180' : ''
                    }`}
                    size={20}
                  />
                </button>
                {openFaqIndex === index && (
                  <div className='border-t border-black/5 px-8 pt-8 pb-8 text-(--color-text-on-light-secondary)'>
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Section>

        {/* Final CTA */}
        <Section
          container='default'
          spacing='lg'
          background='light'
          className='bg-(--color-bg-surface-tinted)'
        >
          <div className='text-center'>
            <h2 className='text-on-light mb-8 text-3xl font-bold md:text-4xl'>{finalCta.title}</h2>
            <p className='mb-8 text-lg text-white/70'>{finalCta.description}</p>
            <Button variant='primary' size='lg' asChild>
              <Link to='/anfrage'>
                {cta.primary.label}
                <ArrowRight className='ml-0' size={20} />
              </Link>
            </Button>
          </div>
        </Section>
      </main>

      <Footer />
    </PageTemplate>
  );
};

export default FirmenFeiernPage;
