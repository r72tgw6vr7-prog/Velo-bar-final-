/**
 * VelobarcoPage - Coburg Booking Page
 * Content source: brand.json (similar to München but Coburg-specific)
 * Brand compliance: Uses brand.json colors/fonts only
 */

import React from 'react';
import { ServicePageLayout } from '@/components/templates/ServicePageLayout.tsx';
import { PageTemplate } from '@/templates/PageTemplate';
import { SiteBackground } from '@/components/layout/SiteBackground';
import { servicePackages, serviceFAQs, serviceTestimonials } from '@/data/services.ts';
import { useLanguage } from '@/contexts/LanguageContext.tsx';

const VelobarcoPage: React.FC = () => {
  const { t } = useLanguage();

  const packages = servicePackages.velobarco;
  const faqs = serviceFAQs.velobarco;
  const testimonials = serviceTestimonials.velobarco;

  return (
    <SiteBackground>
      <PageTemplate
        title={t('pages.bookingCoburg.seo.title')}
        description={t('pages.bookingCoburg.seo.description')}
        canonicalPath='/velobarco'
        withContainer={false}
      >
        <ServicePageLayout
          heroTitle={t('pages.bookingCoburg.layout.heroTitle')}
          heroSubtitle={t('pages.bookingCoburg.layout.heroSubtitle')}
          packages={packages}
          packagesTitle={t('pages.bookingCoburg.layout.packagesTitle')}
          faqs={faqs}
          faqTitle={t('pages.bookingCoburg.layout.faqTitle')}
          testimonials={testimonials}
          testimonialsTitle={t('pages.bookingCoburg.layout.testimonialsTitle')}
          ctaTitle={t('pages.bookingCoburg.layout.ctaTitle')}
          ctaSubtitle={t('pages.bookingCoburg.layout.ctaSubtitle')}
          ctaButtonText={t('pages.bookingCoburg.layout.ctaButtonText')}
          ctaButtonLink='/anfrage'
        >
          {/* Coburg-specific content */}
          <section className='bg-primary text-secondary py-xl'>
            <div className='container mx-auto px-8'>
              <div className='mx-auto max-w-4xl text-center'>
                <h2 className='mb-md font-proxima text-3xl font-bold'>
                  {t('pages.bookingCoburg.coburgSection.title')}
                </h2>
                <p className='text-brand-large text-secondary/90 mb-lg'>
                  {t('pages.bookingCoburg.coburgSection.description')}
                </p>
                <div className='gap-md mt-lg grid md:grid-cols-2'>
                  <div className='border-accent/30 p-md flex h-full flex-col rounded-lg border'>
                    <p className='text-accent font-proxima mb-0 text-2xl font-bold'>
                      {t('pages.bookingCoburg.coburgSection.cards.servus.title')}
                    </p>
                    <p className='text-brand-base'>
                      {t('pages.bookingCoburg.coburgSection.cards.servus.text')}
                    </p>
                  </div>
                  <div className='border-accent/30 p-md flex h-full flex-col rounded-lg border'>
                    <p className='text-accent font-proxima mb-0 text-2xl font-bold'>
                      {t('pages.bookingCoburg.coburgSection.cards.moin.title')}
                    </p>
                    <p className='text-brand-base'>
                      {t('pages.bookingCoburg.coburgSection.cards.moin.text')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </ServicePageLayout>
      </PageTemplate>
    </SiteBackground>
  );
};

export default VelobarcoPage;
