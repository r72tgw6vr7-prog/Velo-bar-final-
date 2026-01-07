/**
 * ContactPage (/anfrage)
 * ======================
 * Canonical Velobar event inquiry page with multi-step booking wizard.
 *
 * Features:
 * - 4-step wizard: Event-Typ & Gäste > Datum & Budget > Kontakt > Bestätigung
 * - Progress bar with "Schritt X/4 – Fast fertig!"
 * - Multiple CTAs (Phone, WhatsApp)
 * - Trust indicators
 */

import React, { Suspense } from 'react';
import { PageTemplate } from '@/templates/PageTemplate.tsx';
import { Section } from '@/components/atoms/Section/Section.tsx';
import { ExpressQuote } from '@/components/molecules/ExpressQuote/ExpressQuote.tsx';
import { Phone, Star, MessageCircle, Calendar, Users } from 'lucide-react';

const BookingWizard = React.lazy(() => 
  import('@/components/organisms/BookingWizard/BookingWizard.tsx')
);

export const ContactPage: React.FC = () => {
  return (
    <PageTemplate
      title='Anfrage | Mobile Cocktailbar München | Velo.Bar'
      description='Senden Sie uns Ihre Event-Anfrage für mobile Cocktailbar-Services in München und Coburg. Antwort in 24 Stunden. ✓ Jetzt anfragen!'
      withContainer={false}
      background='transparent'
    >
      <main id='main-content' role='main' className='w-full overflow-x-clip'>
        {/* Hero Section */}
        <Section as='header' container='default' spacing='lg' background='dark'>
          <div className='mx-auto max-w-5xl text-center'>
            <span className='text-accent-primary mb-6 inline-block rounded-full bg-(--color-bg-surface-tinted) px-8 py-2 text-sm font-semibold'>
              Unverbindliche Anfrage
            </span>
            <h1 className='text-dark-tea mb-6 text-3xl font-bold tracking-tight md:text-5xl lg:text-6xl'>
              Jetzt Ihr Event anfragen
            </h1>
            <p className='text-dark-tea mb-6 text-base leading-relaxed md:text-lg'>
              In nur 3 Schritten zur perfekten Cocktailbar für Ihr Event. Wir melden uns innerhalb
              von 24 Stunden mit einem maßgeschneiderten Angebot.
            </p>

            {/* KPI Cards - with cream background plate */}
            <div className='mx-auto rounded-3xl bg-(--offwhite-primary) p-4 md:p-6'>
              <div className='grid grid-cols-1 gap-4 text-center md:grid-cols-3 md:text-left'>
                {/* Badge 1 */}
                <div className='bg-offwhite-primary text-navy-dark shadow-card flex h-full flex-col items-center gap-3 rounded-2xl p-4 text-center sm:flex-row sm:text-left'>
                  <div className='bg-accent-primary/20 shrink-0 rounded-lg p-2'>
                    <Calendar className='text-navy-dark h-6 w-6' />
                  </div>
                  <div>
                    <div className='text-accent-primary text-xl font-bold md:text-2xl'>500+</div>
                    <div className='text-navy-dark/80 text-sm'>Events durchgeführt</div>
                  </div>
                </div>

                {/* Badge 2 */}
                <div className='bg-offwhite-primary text-navy-dark shadow-card flex h-full flex-col items-center gap-3 rounded-2xl p-4 text-center sm:flex-row sm:text-left'>
                  <div className='bg-accent-primary/20 shrink-0 rounded-lg p-2'>
                    <Users className='text-navy-dark h-6 w-6' />
                  </div>
                  <div>
                    <div className='text-accent-primary text-xl font-bold md:text-2xl'>50.000+</div>
                    <div className='text-navy-dark/80 text-sm'>Gäste bewirtet</div>
                  </div>
                </div>

                {/* Badge 3 */}
                <div className='bg-offwhite-primary text-navy-dark shadow-card flex h-full flex-col items-center gap-3 rounded-2xl p-4 text-center sm:flex-row sm:text-left'>
                  <div className='bg-accent-primary/20 shrink-0 rounded-lg p-2'>
                    <Star className='text-navy-dark h-6 w-6' />
                  </div>
                  <div>
                    <div className='text-accent-primary text-xl font-bold md:text-2xl'>4.9/5</div>
                    <div className='text-navy-dark/80 text-sm'>Kundenbewertung</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Main Content: Wizard + Sidebar */}
        <Section container='default' spacing='md' background='light'>
          <div className='mx-auto w-full max-w-5xl'>
            <div className='w-full'>
              <ExpressQuote className='mb-4 w-full' />
              <Suspense fallback={
                <div className="w-full h-64 bg-gray-100 animate-pulse rounded-lg flex items-center justify-center">
                  <div className="text-gray-500">Laden...</div>
                </div>
              }>
                <BookingWizard className='w-full' />
              </Suspense>
            </div>
          </div>
        </Section>

        {/* Bottom CTA Bar */}
        <Section container='default' spacing='lg' background='light' className='bg-white-pure'>
          <div className='flex flex-col items-center justify-between gap-8 md:flex-row'>
            <div className='text-center md:text-left'>
              <h2 className='vb-heading-1 text-accent-primary mb-2'>Lieber direkt anrufen?</h2>
              <p className='vb-body text-navy-dark'>
                Wir beraten Sie gerne persönlich zu Ihrem Event.
              </p>
            </div>
            <div className='flex flex-col flex-wrap justify-center gap-8 sm:flex-row'>
              <a
                href='tel:+4916094623196'
                className='u-cta-padding bg-accent-primary hover:bg-accent-primary-hover text-navy-dark inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors duration-200 ease-out'
              >
                <Phone size={20} />
                +49 160 94623196
              </a>
              <a
                href='https://wa.me/4916094623196'
                target='_blank'
                rel='noopener noreferrer'
                className='u-cta-padding inline-flex items-center justify-center gap-2 rounded-xl bg-green-500 font-semibold text-white transition-colors duration-200 ease-out hover:bg-green-600'
              >
                <MessageCircle size={20} />
                WhatsApp Chat
              </a>
            </div>
          </div>
        </Section>
      </main>
    </PageTemplate>
  );
};

export default ContactPage;
