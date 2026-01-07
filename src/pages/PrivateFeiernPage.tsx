/**
 * PrivateFeiernPage - Private Parties Service Page
 * =================================================
 * Refactored to use content layer
 * Content: src/content/private-feiern.ts
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageTemplate } from '@/templates/PageTemplate.tsx';
import { Section } from '@/components/atoms/Section/Section';
import { Button } from '@/components/atoms/Button/Button';
import { ArrowRight, Check, ChevronDown, Clock, Phone } from 'lucide-react';
import Footer from '@/components/pages/Footer';
import { useContent } from '@/hooks/useContent';

const PrivateFeiernPage: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Get content in current language
  const { privateFeiern: content } = useContent();
  const { hero, pricingTiers, faqs, cta } = content;

  return (
    <PageTemplate
      title={content.seoTitle}
      description={content.seoDescription}
      withContainer={false}
      background='transparent'
    >
      <main id='main-content' role='main'>
        {/* Hero Section */}
        <Section as='header' container='default' spacing='xl' background='dark'>
          <div className='mx-auto max-w-4xl text-center'>
            <span className='text-accent-primary mb-8 inline-block rounded-full bg-(--color-bg-surface-tinted) px-8 py-0 text-sm font-semibold'>
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
                    <Phone className='mr-0' size={20} />
                    {cta.secondary.label}
                  </a>
                </Button>
              )}
            </div>
          </div>
        </Section>

        {/* Pricing Section */}
        <Section container='default' spacing='xl' background='light'>
          <div className='mb-16 text-center'>
            <h2 className='text-on-light mb-8 text-3xl font-bold md:text-4xl'>
              Pakete für Private Feiern
            </h2>
            <p className='mx-auto max-w-2xl text-lg text-(--color-text-on-light-secondary)'>
              All-inclusive Preise für unvergessliche Momente
            </p>
          </div>

          <div className='grid gap-8 md:grid-cols-3'>
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
                      {tier.cta}
                    </span>
                  </div>
                )}

                <h3 className='text-on-light mb-8 text-xl font-bold'>{tier.name}</h3>
                <div className='mb-8'>
                  <span className='text-accent-primary text-4xl font-bold'>
                    {tier.pricePerGuest}
                  </span>
                </div>
                <div className='mb-8 text-sm text-black/60'>
                  <div>{tier.basePrice}</div>
                  <div className='mt-0 flex items-center gap-0'>
                    <Clock size={14} />
                    {tier.duration}
                  </div>
                  <div className='mt-0'>{tier.guests}</div>
                </div>

                <ul className='mb-8 space-y-8'>
                  {tier.benefits.map((benefit, i) => (
                    <li
                      key={i}
                      className='flex items-start gap-0 text-(--color-text-on-light-secondary)'
                    >
                      <Check size={18} className='mt-0 shrink-0 text-green-500' />
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
                    {tier.highlighted ? tier.cta : 'Angebot anfordern'}
                    <ArrowRight className='ml-0' size={18} />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </Section>

        {/* FAQ Section */}
        <Section container='default' spacing='xl' background='light'>
          <div className='mb-16 text-center'>
            <h2 className='text-on-light mb-8 text-3xl font-bold md:text-4xl'>
              Häufige Fragen zu Privaten Feiern
            </h2>
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
            <h2 className='text-on-light mb-8 text-3xl font-bold md:text-4xl'>
              Bereit für Ihre Feier?
            </h2>
            <p className='mb-8 text-lg text-(--color-text-on-light-secondary)'>
              Kontaktieren Sie uns für ein unverbindliches Angebot
            </p>
            <Button variant='primary' size='lg' asChild>
              <Link to='/anfrage'>
                Jetzt anfragen
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

export default PrivateFeiernPage;
