/**
 * HochzeitenPage - Wedding Service Page
 * =====================================
 * Premium service page for wedding cocktail bar services
 */

import React, { useMemo } from 'react';
import { ServicePageLayout } from '@/components/templates/ServicePageLayout.tsx';
import type { FAQ, Testimonial } from '@/components/templates/ServicePageLayout.tsx';
import { PageTemplate } from '@/templates/PageTemplate';
import { SiteBackground } from '@/components/layout/SiteBackground';
import { servicePackages, serviceFAQs, serviceTestimonials } from '@/data/services.ts';
import { getServiceSchema, getBreadcrumbSchema, getFAQSchema, combineSchemas } from '@/seo/schema.ts';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://www.velo-bar.com';

const HochzeitenPage: React.FC = () => {
  const packages = servicePackages.hochzeiten;
  const faqs: FAQ[] = serviceFAQs.hochzeiten;
  const testimonials: Testimonial[] = serviceTestimonials.hochzeiten;

  // SEO: Structured data for Hochzeiten service page
  const structuredData = useMemo(() => {
    return combineSchemas(
      getServiceSchema({
        name: 'Mobile Cocktailbar für Hochzeiten',
        description:
          'Traumhafte mobile Cocktailbar für deine Hochzeit in München und Coburg. Vom Sektempfang bis zur Mitternachtsbar – professioneller Service für den schönsten Tag im Leben.',
        url: `${SITE_URL}/hochzeiten`,
        image: `${SITE_URL}/images/services/hochzeit-cocktailbar.webp`,
        areaServed: ['München', 'Coburg', 'Bayern'],
        serviceType: 'WeddingCatering',
      }),
      getBreadcrumbSchema([
        { name: 'Home', url: SITE_URL },
        { name: 'Hochzeiten', url: `${SITE_URL}/hochzeiten` },
      ]),
      getFAQSchema(
        faqs.map((faq) => ({
          question: faq.question,
          answer: faq.answer,
        }))
      )
    );
  }, [faqs]);

  const suitableFor = {
    items: [
      'Elegante Empfänge nach Trauung (30-120 Gäste)',
      'Ganztags-Service: Sektempfang bis Mitternachtsbar',
      'Romantische Gartenhochzeiten & Outdoor-Feiern',
      'Exklusive Schloss- & Gutshochzeiten',
      'Moderne urbane Hochzeiten in Eventlocations',
      'Late-Night-Bar für tanzwütige Hochzeitsgesellschaften',
    ],
  };

  const processSteps = {
    steps: [
      {
        step: '1. Persönliche Hochzeitsberatung',
        description:
          'Kostenloses Beratungsgespräch, in dem wir deinen großen Tag verstehen: Hochzeitsstil, Farbkonzept, Gästezahl und besondere Wünsche fürs Brautpaar.',
      },
      {
        step: '2. Maßgeschneidertes Hochzeitspaket',
        description:
          'Detailliertes Angebot mit personalisierten Cocktails, romantischer Dekoration und optionalem Signature-Drink mit deinem Namen.',
      },
      {
        step: '3. Vorab-Verkostung (Premium/VIP)',
        description:
          'Bei Premium-Paketen laden wir dich zu einer Cocktail-Verkostung ein. Du probierst deine Favoriten und entscheidest gemeinsam.',
      },
      {
        step: '4. Eleganter Aufbau am Hochzeitstag',
        description:
          '2-3 Stunden vor Gästeankunft bauen wir die Bar in deinen Hochzeitsfarben auf – perfekt abgestimmt auf deine Location-Dekoration.',
      },
      {
        step: '5. Diskreter Premium-Service',
        description:
          'Während du und deine Gäste feiern, servieren unsere Barkeeper unauffällig erstklassige Cocktails – vom Sektempfang bis zur letzten Mitternachtsrunde.',
      },
      {
        step: '6. Stressfreier Abbau',
        description:
          'Nach der Feier kümmern wir uns um den vollständigen Abbau und die Reinigung. Du kannst einfach weiterfeiern oder den Abend entspannt ausklingen lassen!',
      },
    ],
  };

  return (
    <SiteBackground>
      <PageTemplate
      title='Hochzeit Bar München: Mobile Cocktailbar | 500+ Events ✨'
      description='Traumhafte Cocktailbar für deine Hochzeit in München und Coburg. Vom Sektempfang bis zur Mitternachtsbar – professioneller Service für den schönsten Tag im Leben.'
      canonicalPath='/hochzeiten'
      structuredData={structuredData}
      withContainer={false}
    >
      <ServicePageLayout
        heroTitle='Hochzeiten'
        heroSubtitle='Unvergessliche Cocktails für den schönsten Tag in deinem Leben – von Sektempfang bis Mitternachtsbar'
        suitableFor={suitableFor}
        processSteps={processSteps}
        packages={packages}
        packagesTitle='Unsere Hochzeits-Pakete'
        faqs={faqs}
        faqTitle='Häufig gestellte Fragen zu Hochzeiten'
        testimonials={testimonials}
        testimonialsTitle='Was unsere Brautpaare sagen'
        ctaTitle='Bereit für eine traumhafte Hochzeit?'
        ctaSubtitle='Lass uns Teil deines besonderen Tages werden – mit Cocktails, die in Erinnerung bleiben'
        ctaButtonText='Jetzt Beratungsgespräch vereinbaren'
        ctaButtonLink='/anfrage'
      >
        <div className='grid items-center gap-16 md:grid-cols-2'>
          <div>
            <h3 className='text-accent-primary mb-8 text-3xl font-bold'>
              Warum Velobar für deine Hochzeit?
            </h3>
            <ul className='space-y-8 text-white/80'>
              <li>
                <strong>Hochzeitserfahrung:</strong> Über 50 Hochzeiten erfolgreich betreut
              </li>
              <li>
                <strong>Personalisierung:</strong> Signature-Drinks mit deinem Namen oder deinem
                Branding
              </li>
              <li>
                <strong>Eleganz:</strong> Stilvolle Präsentation passend zu deinem Hochzeitskonzept
              </li>
              <li>
                <strong>Zuverlässigkeit:</strong> Pünktlich, diskret, professionell
              </li>
              <li>
                <strong>All-Inclusive:</strong> Von Planung bis Abbau – du musst dich um nichts
                kümmern
              </li>
            </ul>
          </div>

          <div className='space-y-8'>
            <div className='bg-navy-primary border-accent-primary/15 flex h-full flex-col rounded-2xl border p-6'>
              <h4 className='text-accent-primary mb-8 text-2xl font-bold'>
                Beliebte Hochzeits-Cocktails
              </h4>
              <ul className='list-inside list-disc space-y-0 text-white/80'>
                <li>Champagne Cocktails (Bellini, French 75)</li>
                <li>Romantic Rosé Spritz</li>
                <li>Strawberry Daiquiri</li>
                <li>Elderflower Gin Fizz</li>
                <li>Personalisierter Signature-Drink</li>
                <li>Alkoholfreie Bridal Mocktails</li>
              </ul>
            </div>

            <div className='from-accent-primary/10 border-accent-primary/20 flex h-full flex-col rounded-2xl border bg-linear-to-br to-black p-8'>
              <h4 className='text-accent-primary mb-0 text-xl font-bold'>Hochzeits-Tipp</h4>
              <p className='text-sm text-white/80'>
                Buchen Sie früh! Hochzeiten im Mai-September sind sehr gefragt. Für Ihre
                Traumhochzeit empfehlen wir eine Buchung 6-12 Monate im Voraus.
              </p>
            </div>
          </div>
        </div>
      </ServicePageLayout>
      </PageTemplate>
    </SiteBackground>
  );
};

export default HochzeitenPage;
