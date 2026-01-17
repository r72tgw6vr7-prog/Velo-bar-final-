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
import { PageTemplate } from '@/templates/PageTemplate';
import { SiteBackground } from '@/components/layout/SiteBackground';
import { Section } from '@/components/atoms/Section/Section.tsx';
import { ExpressQuote } from '@/components/molecules/ExpressQuote/ExpressQuote.tsx';
import Phone from 'lucide-react/dist/esm/icons/phone';
import Star from 'lucide-react/dist/esm/icons/star';
import MessageCircle from 'lucide-react/dist/esm/icons/message-circle';
import Calendar from 'lucide-react/dist/esm/icons/calendar';
import Users from 'lucide-react/dist/esm/icons/users';
import { useLanguage } from '@/contexts/LanguageContext.tsx';
import { EyebrowBadge } from '@/components/atoms/EyebrowBadge.tsx';

const BookingWizard = React.lazy(() => 
  import('@/components/organisms/BookingWizard/BookingWizard.tsx')
);

export const ContactPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <SiteBackground>
      <PageTemplate
        title={t('pages.contact.seo.title')}
        description={t('pages.contact.seo.description')}
        withContainer={false}
        background='transparent'
      >
      <main id='main-content' role='main' className='w-full overflow-x-clip'>
        {/* Hero Section */}
        <Section as='header' container='default' spacing='lg' background='dark'>
          <div className='mx-auto max-w-5xl text-center'>
            <EyebrowBadge className='mb-6'>{t('pages.contact.hero.badge')}</EyebrowBadge>
            <h1 className='mb-6 text-3xl font-bold tracking-tight text-accent-primary md:text-5xl lg:text-6xl'>
              {t('pages.contact.hero.title')}
            </h1>
            <p className='mb-6 text-base font-bold leading-relaxed text-white/90 md:text-lg'>
              {t('pages.contact.hero.subtitle')}
            </p>

            {/* KPI Cards - with cream background plate */}
            <div className='mx-auto rounded-3xl bg-(--offwhite-primary) p-4 md:p-6'>
              <div className='grid grid-cols-1 gap-4 text-center md:grid-cols-3 md:text-left'>
                {/* Badge 1 */}
                <div className='bg-offwhite-primary text-navy-dark shadow-card badge-card flex h-full flex-col items-center gap-3 rounded-2xl p-4 text-center sm:flex-row sm:text-left'>
                  <div className='badge-icon'>
                    <Calendar className='text-navy-dark h-6 w-6' />
                  </div>
                  <div>
                    <div className='text-accent-primary text-xl font-bold md:text-2xl'>500+</div>
                    <div className='text-navy-dark/80 text-sm'>{t('pages.contact.kpis.events')}</div>
                  </div>
                </div>

                {/* Badge 2 */}
                <div className='bg-offwhite-primary text-navy-dark shadow-card badge-card flex h-full flex-col items-center gap-3 rounded-2xl p-4 text-center sm:flex-row sm:text-left'>
                  <div className='badge-icon'>
                    <Users className='text-navy-dark h-6 w-6' />
                  </div>
                  <div>
                    <div className='text-accent-primary text-xl font-bold md:text-2xl'>50.000+</div>
                    <div className='text-navy-dark/80 text-sm'>{t('pages.contact.kpis.guests')}</div>
                  </div>
                </div>

                {/* Badge 3 */}
                <div className='bg-offwhite-primary text-navy-dark shadow-card badge-card flex h-full flex-col items-center gap-3 rounded-2xl p-4 text-center sm:flex-row sm:text-left'>
                  <div className='badge-icon'>
                    <Star className='text-navy-dark h-6 w-6' />
                  </div>
                  <div>
                    <div className='text-accent-primary text-xl font-bold md:text-2xl'>5/5</div>
                    <div className='text-navy-dark/80 text-sm'>{t('pages.contact.kpis.rating')}</div>
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
                  <div className="text-gray-500">{t('pages.contact.loading')}</div>
                </div>
              }>
                <BookingWizard className='w-full' />
              </Suspense>
            </div>
          </div>
        </Section>

        {/* Bottom CTA Bar */}
        <Section container='default' spacing='lg' background='transparent'>
          <div className='rounded-3xl bg-(--color-bg-surface) p-8 md:p-10'>
            <div className='flex flex-col items-center justify-between gap-8 md:flex-row'>
              <div className='text-center md:text-left'>
                <h2 className='vb-heading-1 text-accent-primary mb-2'>{t('pages.contact.bottomCta.title')}</h2>
                <p className='vb-body text-(--color-text-on-light-secondary)'>
                  {t('pages.contact.bottomCta.subtitle')}
                </p>
              </div>
              <div className='flex flex-col flex-wrap justify-center gap-8 sm:flex-row'>
                <a
                  href='tel:+4916094623196'
                  className='u-cta-padding bg-accent-primary hover:bg-accent-primary-hover text-navy-dark inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors duration-200 ease-out badge-cta'
                >
                  <Phone size={20} />
                  +49 160 94623196
                </a>
                <a
                  href='https://wa.me/4916094623196'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='u-cta-padding inline-flex items-center justify-center gap-2 rounded-xl bg-green-500 font-semibold text-white transition-colors duration-200 ease-out hover:bg-green-600 badge-cta'
                >
                  <MessageCircle size={20} />
                  {t('pages.contact.bottomCta.whatsapp')}
                </a>
              </div>
            </div>
          </div>
        </Section>
      </main>
      </PageTemplate>
    </SiteBackground>
  );
};

export default ContactPage;
