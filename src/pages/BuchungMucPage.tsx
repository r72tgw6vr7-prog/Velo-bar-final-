/**
 * BuchungMucPage - München Booking Page
 * Content source: /content/munich-booking.md
 * Brand compliance: Uses brand.json colors/fonts only
 */

import React from 'react';
import { ServicePageLayout } from '@/components/templates/ServicePageLayout';
import { PageTemplate } from '@/templates/PageTemplate';
import { servicePackages, serviceFAQs, serviceTestimonials } from '@/data/services';

const BuchungMucPage: React.FC = () => {
  const packages = servicePackages.buchungMuc;
  const faqs = serviceFAQs.buchungMuc;
  const testimonials = serviceTestimonials.buchungMuc;

  return (
    <PageTemplate
      title='München Booking | Mobile Bar München & Umgebung | Velobar'
      description='Buchen Sie die mobile Velo.Bar für Ihr Event in München. Selbstversorgendes Öko-System, professionelle Barkeeper, Gin-Tastings ab 49€.'
      withContainer={false}
    >
      <ServicePageLayout
        heroTitle='VELO.BAR München'
        heroSubtitle='Münchens Premium Mobile Bar für Firmenfeiern & Events. Buchen Sie jetzt für Ihr nächstes Event.'
        heroImage='/Velo Gallery/Hero '
        heroImageAlt='Velo.Bar München - Bartender am mobilen Bar-Fahrrad'
        packages={packages}
        packagesTitle='Unsere Angebote für München & Umgebung'
        faqs={faqs}
        faqTitle='Häufig gestellte Fragen'
        testimonials={testimonials}
        testimonialsTitle='Was unsere Münchner Kunden sagen'
        ctaTitle='Bereit für Ihre mobile Bar in München?'
        ctaSubtitle='Kontaktieren Sie uns für ein unverbindliches Angebot'
        ctaButtonText='Jetzt anfragen!'
        ctaButtonLink='/anfrage'
      >
        {/* München-specific content - eco-system info moved to dedicated section */}
      </ServicePageLayout>
    </PageTemplate>
  );
};

export default BuchungMucPage;
