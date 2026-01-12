/**
 * VelobarcoPage - Coburg Booking Page
 * Content source: brand.json (similar to München but Coburg-specific)
 * Brand compliance: Uses brand.json colors/fonts only
 */

import React from 'react';
import { ServicePageLayout } from '@/components/templates/ServicePageLayout.tsx';
import { PageTemplate } from '@/templates/PageTemplate';
import { servicePackages, serviceFAQs, serviceTestimonials } from '@/data/services.ts';

const VelobarcoPage: React.FC = () => {
  const packages = servicePackages.velobarco;
  const faqs = serviceFAQs.velobarco;
  const testimonials = serviceTestimonials.velobarco;

  return (
    <PageTemplate
      title='Coburg Booking | Mobile Bar Coburg & Umgebung | Velobar'
      description='Buchen Sie die mobile Velo.Bar für Ihr Event in Coburg. Cocktailbar und Gin-Tastings für private und Firmenfeiern.'
      canonicalPath='/velobarco'
      withContainer={false}
    >
      <ServicePageLayout
        heroTitle='VELO.BAR Coburg'
        heroSubtitle='Mobile Cocktailbar & Gin-Tastings für Coburg & Umgebung'
        packages={packages}
        packagesTitle='Unsere Angebote für Coburg & Umgebung'
        faqs={faqs}
        faqTitle='Häufig gestellte Fragen'
        testimonials={testimonials}
        testimonialsTitle='Was unsere Coburger Kunden sagen'
        ctaTitle='Bereit für Ihre mobile Bar in Coburg?'
        ctaSubtitle='Kontaktieren Sie uns für ein unverbindliches Angebot'
        ctaButtonText='Jetzt anfragen!'
        ctaButtonLink='/anfrage'
      >
        {/* Coburg-specific content */}
        <section className='bg-primary text-secondary py-xl'>
          <div className='container mx-auto px-8'>
            <div className='mx-auto max-w-4xl text-center'>
              <h2 className='mb-md font-proxima text-3xl font-bold'>Warum Velo.Bar in Coburg?</h2>
              <p className='text-brand-large text-secondary/90 mb-lg'>
                Egal ob Gin-Tasting, Geburtstag, Firmenfeier oder private Feier - wir bringen
                professionelle Bar-Kultur nach Coburg. Unsere mobile Bar ist vollständig autark und
                kann überall eingesetzt werden.
              </p>
              <div className='gap-md mt-lg grid md:grid-cols-2'>
                <div className='border-accent/30 p-md flex h-full flex-col rounded-lg border'>
                  <p className='text-accent font-proxima mb-0 text-2xl font-bold'>Servus!</p>
                  <p className='text-brand-base'>
                    Sebastian bringt echte Bar-Expertise aus München nach Coburg
                  </p>
                </div>
                <div className='border-accent/30 p-md flex h-full flex-col rounded-lg border'>
                  <p className='text-accent font-proxima mb-0 text-2xl font-bold'>Moin!</p>
                  <p className='text-brand-base'>
                    Lars ergänzt mit norddeutscher Herzlichkeit und Professionalität
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ServicePageLayout>
    </PageTemplate>
  );
};

export default VelobarcoPage;
