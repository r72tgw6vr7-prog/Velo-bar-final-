/**
 * HochzeitenPage - Wedding Service Page
 * =====================================
 * Premium service page for wedding cocktail bar services
 */

import React from 'react';
import { ServicePageLayout } from '@/components/templates/ServicePageLayout';
import type { FAQ, Testimonial } from '@/components/templates/ServicePageLayout';
import { PageTemplate } from '@/templates/PageTemplate';
import { getServicePagePackages } from '@/content/servicePagePackages';
import { serviceFAQs, serviceTestimonials } from '@/data/services';

const HochzeitenPage: React.FC = () => {
  const packages = getServicePagePackages('hochzeiten');
  const faqs: FAQ[] = serviceFAQs.hochzeiten;
  const testimonials: Testimonial[] = serviceTestimonials.hochzeiten;

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
          'Kostenloses Beratungsgespräch, in dem wir Ihren großen Tag verstehen: Hochzeitsstil, Farbkonzept, Gästezahl und besondere Wünsche fürs Brautpaar.',
      },
      {
        step: '2. Maßgeschneidertes Hochzeitspaket',
        description:
          'Detailliertes Angebot mit personalisierten Cocktails, romantischer Dekoration und optionalem Signature-Drink mit Ihrem Namen.',
      },
      {
        step: '3. Vorab-Verkostung (Premium/VIP)',
        description:
          'Bei Premium-Paketen laden wir Sie zu einer Cocktail-Verkostung ein. Sie probieren Ihre Favoriten und entscheiden gemeinsam.',
      },
      {
        step: '4. Eleganter Aufbau am Hochzeitstag',
        description:
          '2-3 Stunden vor Gästeankunft bauen wir die Bar in Ihren Hochzeitsfarben auf – perfekt abgestimmt auf Ihre Location-Dekoration.',
      },
      {
        step: '5. Diskreter Premium-Service',
        description:
          'Während Sie und Ihre Gäste feiern, servieren unsere Barkeeper unauffällig erstklassige Cocktails – vom Sektempfang bis zur letzten Mitternachtsrunde.',
      },
      {
        step: '6. Stressfreier Abbau',
        description:
          'Nach der Feier kümmern wir uns um den vollständigen Abbau und die Reinigung. Sie können einfach weiterfeiern oder den Abend entspannt ausklingen lassen!',
      },
    ],
  };

  return (
    <PageTemplate
      title='Hochzeiten | Mobile Cocktailbar | Velobar München & Coburg'
      description='Traumhafte Cocktailbar für Ihre Hochzeit in München und Coburg. Vom Sektempfang bis zur Mitternachtsbar – professioneller Service für den schönsten Tag im Leben.'
      withContainer={false}
    >
      <ServicePageLayout
        heroTitle='Hochzeiten'
        heroSubtitle='Unvergessliche Cocktails für den schönsten Tag in Ihrem Leben – von Sektempfang bis Mitternachtsbar'
        suitableFor={suitableFor}
        processSteps={processSteps}
        packages={packages}
        packagesTitle='Unsere Hochzeits-Pakete'
        faqs={faqs}
        faqTitle='Häufig gestellte Fragen zu Hochzeiten'
        testimonials={testimonials}
        testimonialsTitle='Was unsere Brautpaare sagen'
        ctaTitle='Bereit für eine traumhafte Hochzeit?'
        ctaSubtitle='Lassen Sie uns Teil Ihres besonderen Tages werden – mit Cocktails, die in Erinnerung bleiben'
        ctaButtonText='Jetzt Beratungsgespräch vereinbaren'
        ctaButtonLink='/anfrage'
      >
        <div className='grid items-center gap-16 md:grid-cols-2'>
          <div>
            <h3 className='text-accent-primary mb-8 text-3xl font-bold'>
              Warum Velobar für Ihre Hochzeit?
            </h3>
            <ul className='space-y-8 text-white/80'>
              <li>
                <strong>Hochzeitserfahrung:</strong> Über 50 Hochzeiten erfolgreich betreut
              </li>
              <li>
                <strong>Personalisierung:</strong> Signature-Drinks mit Ihren Namen oder Ihrem
                Branding
              </li>
              <li>
                <strong>Eleganz:</strong> Stilvolle Präsentation passend zu Ihrem Hochzeitskonzept
              </li>
              <li>
                <strong>Zuverlässigkeit:</strong> Pünktlich, diskret, professionell
              </li>
              <li>
                <strong>All-Inclusive:</strong> Von Planung bis Abbau – Sie müssen sich um nichts
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
  );
};

export default HochzeitenPage;
