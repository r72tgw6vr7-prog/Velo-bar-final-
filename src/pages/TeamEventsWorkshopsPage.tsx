/**
 * TeamEventsWorkshopsPage - Team Building & Workshop Service Page
 * ===============================================================
 * Service page for corporate team events and cocktail workshops
 * SEO: Service schema + optimized meta tags
 */

import React, { useMemo } from 'react';
import { ServicePageLayout } from '@/components/templates/ServicePageLayout.tsx';
import { PageTemplate } from '@/templates/PageTemplate';
import { servicePackages, serviceFAQs, serviceTestimonials } from '@/data/services.ts';
import { getServiceSchema, getBreadcrumbSchema, combineSchemas } from '@/seo/schema.ts';
import { SITE_URL } from '@/lib/site.ts';

const TeamEventsWorkshopsPage: React.FC = () => {
  const packages = servicePackages.teamEvents;
  const faqs = serviceFAQs.teamEvents;
  const testimonials = serviceTestimonials.teamEvents;

  // SEO: Generate structured data for this service page
  const structuredData = useMemo(
    () =>
      combineSchemas(
        getServiceSchema({
          name: 'Cocktail-Workshops & Team-Events',
          description:
            'Interaktive Cocktail-Workshops für Teambuilding in München. Professionelle Barkeeper-Trainer für Gruppen von 10-40 Teilnehmern.',
          url: `${SITE_URL}/team-events`,
          image: `${SITE_URL}/images/services/team-events-workshop.webp`,

          areaServed: ['München', 'Coburg', 'Bayern'],
          serviceType: 'TeamBuildingWorkshop',
        }),
        getBreadcrumbSchema([
          { name: 'Home', url: SITE_URL },
          { name: 'Team-Events & Workshops', url: `${SITE_URL}/team-events` },
        ]),
      ),
    [],
  );

  const suitableFor = {
    items: [
      'Interaktive Team-Building-Workshops (10-40 Teilnehmer)',
      'Abteilungs-Events mit Lerneffekt & Spaß-Faktor',
      'Onboarding-Programme für neue Mitarbeiter',
      'Kreativitäts-Workshops für Marketing-Teams',
      'Führungskräfte-Trainings: Teamwork praktisch erleben',
      'Incentive-Events mit aktiver Teilnahme statt passivem Konsum',
    ],
  };

  const processSteps = {
    steps: [
      {
        step: '1. Team-Ziele definieren',
        description:
          'Was soll der Workshop erreichen? Bessere Kommunikation, kreative Problemlösung, Vertrauensaufbau? Wir entwickeln den passenden Workshop-Ablauf.',
      },
      {
        step: '2. Didaktisches Workshop-Konzept',
        description:
          'Strukturierter Ablaufplan mit Lernzielen, praktischen Übungen, Team-Challenges und individuellen Skill-Building-Elementen – didaktisch fundiert.',
      },
      {
        step: '3. Location & Setup-Planung',
        description:
          'Wir kommen in Ihre Räume oder empfehlen inspirierende Workshop-Locations. Flexibles Setup für Gruppen von 6-40 Teilnehmern.',
      },
      {
        step: '4. Professionelle Workshop-Ausstattung',
        description:
          'Jeder Teilnehmer erhält einen eigenen Arbeitsplatz mit Profi-Equipment: Shaker, Jigger, Zutaten, Rezeptkarten – wie echte Barkeeper.',
      },
      {
        step: '5. Hands-On Workshop-Durchführung',
        description:
          'Unser erfahrener Barkeeper-Trainer vermittelt Techniken, moderiert Team-Challenges und sorgt für Aha-Momente plus echten Teamgeist.',
      },
      {
        step: '6. Takeaways & Transfer',
        description:
          'Teilnehmer erhalten Rezeptkarten (bzw. Zertifikate bei Masterclass) und reflektieren gemeinsam: Was nehmen wir mit ins Team?',
      },
    ],
  };

  return (
    <PageTemplate
      // SEO: Title ~55 chars with B2B keyword + location
      title='Cocktail-Workshops für Team-Events München'
      // SEO: Description ~150 chars with intent, USPs, CTA
      description='Interaktive Cocktail-Workshops für Teambuilding in München & Coburg. Professionelle Barkeeper für 10-40 Teilnehmer. Jetzt Workshop buchen!'
      canonicalPath='/team-events'
      structuredData={structuredData}
      withContainer={false}
    >
      <ServicePageLayout
        heroTitle='Team-Events & Cocktail-Workshops'
        heroSubtitle='Gemeinsam Cocktails mixen, lernen und Spaß haben – perfekt für Team-Building und Firmenevents'
        suitableFor={suitableFor}
        processSteps={processSteps}
        packages={packages}
        packagesTitle='Unsere Workshop-Pakete'
        faqs={faqs}
        faqTitle='Häufig gestellte Fragen zu Workshops'
        testimonials={testimonials}
        testimonialsTitle='Was Teilnehmer sagen'
        ctaTitle='Bereit für ein unvergessliches Team-Erlebnis?'
        ctaSubtitle='Buchen Sie Ihren Cocktail-Workshop für Ihr nächstes Team-Event'
        ctaButtonText='Jetzt Workshop buchen'
        ctaButtonLink='/anfrage'
      >
        <div className='grid items-center gap-16 md:grid-cols-2'>
          <div>
            <h3 className='text-accent-primary mb-8 text-3xl font-bold'>
              Was Sie in unseren Workshops lernen
            </h3>
            <ul className='space-y-8 text-white/80'>
              <li>
                <strong>Cocktail-Basics:</strong> Shaken, Rühren, Muddeln – die Grundtechniken
              </li>
              <li>
                <strong>Spirituosen-Kunde:</strong> Gin, Rum, Vodka, Tequila richtig einsetzen
              </li>
              <li>
                <strong>Klassische Cocktails:</strong> Mojito, Margarita, Negroni perfekt mixen
              </li>
              <li>
                <strong>Kreative Garnierungen:</strong> Die perfekte Präsentation
              </li>
              <li>
                <strong>Team-Challenges:</strong> Gemeinsam eigene Signature-Drinks entwickeln
              </li>
            </ul>
          </div>

          <div className='bg-navy-primary border-accent-primary/15 flex h-full flex-col rounded-2xl border p-8'>
            <h4 className='text-accent-primary mb-8 text-2xl font-bold'>
              Beliebte Workshop-Anlässe
            </h4>
            <ul className='list-inside list-disc space-y-0 text-white/80'>
              <li>Team-Building Events</li>
              <li>Firmen-Jubiläen</li>
              <li>Mitarbeiter-Incentives</li>
              <li>Abteilungs-Ausflüge</li>
              <li>Onboarding-Events</li>
              <li>Weihnachtsfeiern (interaktiv)</li>
              <li>Kundenevents</li>
            </ul>
            <p className='border-accent-primary/15 mt-8 border-t pt-8 text-sm text-white/80'>
              Auch für private Gruppen: JGA, Geburtstage, Freundeskreise!
            </p>
          </div>
        </div>
      </ServicePageLayout>
    </PageTemplate>
  );
};

export default TeamEventsWorkshopsPage;
