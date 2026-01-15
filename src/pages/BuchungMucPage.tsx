/**
 * BuchungMucPage - München Booking Page
 * Content source: /content/munich-booking.md
 * Brand compliance: Uses brand.json colors/fonts only
 */

import React from 'react';
import { ServicePageLayout } from '@/components/templates/ServicePageLayout';
import { PageTemplate } from '@/templates/PageTemplate';
import { SiteBackground } from '@/components/layout/SiteBackground';
import { servicePackages, serviceFAQs, serviceTestimonials } from '@/data/services';
import { useLanguage } from '@/contexts/LanguageContext.tsx';

const BuchungMucPage: React.FC = () => {
  const { t } = useLanguage();

  const packages = servicePackages.buchungMuc;
  const faqs = serviceFAQs.buchungMuc;
  const testimonials = serviceTestimonials.buchungMuc;

  return (
    <SiteBackground>
      <PageTemplate
        title={t('pages.bookingMuc.seo.title')}
        description={t('pages.bookingMuc.seo.description')}
        canonicalPath='/velobar/buchungmuc'
        withContainer={false}
      >
        <ServicePageLayout
          heroTitle={t('pages.bookingMuc.layout.heroTitle')}
          heroSubtitle={t('pages.bookingMuc.layout.heroSubtitle')}
          heroImage='/Velo Gallery/Hero '
          heroImageAlt={t('pages.bookingMuc.layout.heroImageAlt')}
          packages={packages}
          packagesTitle={t('pages.bookingMuc.layout.packagesTitle')}
          faqs={faqs}
          faqTitle={t('pages.bookingMuc.layout.faqTitle')}
          testimonials={testimonials}
          testimonialsTitle={t('pages.bookingMuc.layout.testimonialsTitle')}
          ctaTitle={t('pages.bookingMuc.layout.ctaTitle')}
          ctaSubtitle={t('pages.bookingMuc.layout.ctaSubtitle')}
          ctaButtonText={t('pages.bookingMuc.layout.ctaButtonText')}
          ctaButtonLink='/anfrage'
        >
          {/* München-specific content - eco-system info moved to dedicated section */}
        </ServicePageLayout>
      </PageTemplate>
    </SiteBackground>
  );
};

export default BuchungMucPage;
