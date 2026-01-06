/**
 * Velobar Event Case Studies - Mobile Cocktailbar & Corporate Catering
 * Client Event → Service Delivered → Results & Feedback
 */

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  eventType: string;
  year: string;
  tags: string[];
  location: string;

  // Event Details
  eventDetails: {
    title: string;
    description: string;
    guestCount: string;
    duration: string;
    specialRequirements?: string[];
  };

  // Service Provided
  service: {
    title: string;
    description: string;
    offerings: string[];
    cocktailMenu?: string[];
  };

  // Client Feedback & Results
  results: {
    title: string;
    metrics: Array<{
      label: string;
      value: string;
      description: string;
    }>;
    highlights: string[];
  };

  // Client Testimonial
  testimonial?: {
    quote: string;
    author: string;
    position: string;
    company: string;
  };

  // Visual Assets
  images?: {
    hero: string;
    gallery?: string[];
  };
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'firmenfeier-tech-company',
    title: 'Sommerfeier für Tech-Unternehmen mit 120 Gästen',
    client: 'Technologieunternehmen München',
    eventType: 'Firmenfeier',
    year: '2025',
    location: 'München',
    tags: ['Firmenfeier', 'Cocktailbar', 'Outdoor Event', 'Summer Party'],

    eventDetails: {
      title: 'Sommerfest mit Premium-Cocktailservice',
      description:
        'Jährliche Firmenfeier im Innenhof des Unternehmens mit mobiler Cocktailbar als Highlight des Abends.',
      guestCount: '120 Mitarbeiter',
      duration: '5 Stunden',
      specialRequirements: [
        'Alkoholfreie Alternativen für alle Cocktails',
        'Anpassung an Corporate Design',
        'Nachhaltige Strohhalme und Deko',
      ],
    },

    service: {
      title: 'Mobile Premium-Cocktailbar',
      description:
        'Vollständig ausgestattete mobile Bar mit professionellen Barkeepern und individueller Menüauswahl.',
      offerings: [
        '2 professionelle Barkeeper',
        'Premium-Spirituosen und frische Zutaten',
        'Individuelles Cocktailmenü',
        'Komplette Bar-Ausstattung und Dekoration',
        'Alkoholfreie Signature-Cocktails',
      ],
      cocktailMenu: [
        'Mojito Classic & Virgin Mojito',
        'Aperol Spritz',
        'Espresso Martini',
        'Passion Fruit Mule',
        'Gin Basil Smash',
      ],
    },

    results: {
      title: 'Erfolgreiche Veranstaltung',
      metrics: [
        {
          label: 'Cocktails serviert',
          value: '340+',
          description: 'Durchschnittlich 2,8 Cocktails pro Gast',
        },
        {
          label: 'Gästezufriedenheit',
          value: '4,9/5',
          description: 'Basierend auf Event-Feedback',
        },
        {
          label: 'Alkoholfrei',
          value: '35%',
          description: 'Anteil alkoholfreier Cocktails',
        },
      ],
      highlights: [
        'Reibungsloser Ablauf trotz kurzfristiger Gästeerhöhung',
        'Positive Erwähnung in interner Mitarbeiter-Umfrage',
        'Wiederholungsbuchung für Weihnachtsfeier bereits gesichert',
      ],
    },

    testimonial: {
      quote:
        'Die Cocktailbar war das absolute Highlight unserer Sommerfeier. Professionell, flexibel und die Cocktails waren weltklasse. Unsere Mitarbeiter sprechen noch Wochen später davon.',
      author: 'Sandra Meyer',
      position: 'Head of HR',
      company: 'Tech-Unternehmen München',
    },
  },

  {
    id: 'weihnachtsfeier-automotive',
    title: 'Weihnachtsfeier in elegantem Ambiente',
    client: 'Automotive Zulieferer',
    eventType: 'Weihnachtsfeier',
    year: '2024',
    location: 'Coburg',
    tags: ['Weihnachtsfeier', 'Corporate Event', 'Premium Service', 'Winter'],

    eventDetails: {
      title: 'Festliche Weihnachtsfeier mit Cocktail-Empfang',
      description:
        'Exklusive Weihnachtsfeier mit Cocktail-Empfang vor dem Gala-Dinner für Führungskräfte und wichtige Geschäftspartner.',
      guestCount: '80 Gäste',
      duration: '3 Stunden Cocktail-Empfang',
      specialRequirements: [
        'Gehobene Cocktail-Auswahl',
        'Weihnachtliche Präsentation',
        'Koordination mit Catering-Partner',
      ],
    },

    service: {
      title: 'Premium Cocktail-Empfang',
      description:
        'Eleganter Aperitif-Service mit Winter-Signature-Cocktails und klassischen Premium-Drinks.',
      offerings: [
        '3 erfahrene Barkeeper',
        'Premium- und Luxus-Spirituosen',
        'Weihnachtliches Cocktail-Menü',
        'Elegante Bar-Dekoration',
        'Champagner-Service',
      ],
      cocktailMenu: [
        'Champagne & Prosecco',
        'Winter Spiced Old Fashioned',
        'Cranberry Gin Fizz',
        'Hot Toddy Variation',
        'Signature Glühwein-Cocktail',
      ],
    },

    results: {
      title: 'Exzellenter Service',
      metrics: [
        {
          label: 'Cocktails & Champagner',
          value: '210',
          description: 'Premium-Drinks während des Empfangs',
        },
        {
          label: 'Event-Rating',
          value: '5/5',
          description: 'Maximale Zufriedenheit des Kunden',
        },
        {
          label: 'Weiterempfehlung',
          value: '100%',
          description: 'Empfehlung an Partnerunternehmen',
        },
      ],
      highlights: [
        'Perfekte Integration in den gehobenen Event-Rahmen',
        'Besonderes Lob für professionelle Präsentation',
        'Mehrere Folgebuchungen durch Empfehlungen',
      ],
    },

    testimonial: {
      quote:
        'Velobar hat unsere Erwartungen übertroffen. Der Service war diskret, professionell und die Cocktails von höchster Qualität. Genau das richtige Niveau für unsere Veranstaltung.',
      author: 'Dr. Michael Hoffmann',
      position: 'Geschäftsführer',
      company: 'Automotive Zulieferer',
    },
  },

  {
    id: 'messe-event-munich',
    title: 'Messestand-Catering auf der ISPO München',
    client: 'Sportartikel-Hersteller',
    eventType: 'Messe / Trade Show',
    year: '2025',
    location: 'München',
    tags: ['Messe', 'Trade Show', 'Brand Activation', 'Multi-Day Event'],

    eventDetails: {
      title: '3-Tages Messestand mit Cocktailbar',
      description:
        'Mobile Cocktailbar als Besuchermagnet am Messestand während der internationalen Sportmesse.',
      guestCount: '~400 Besucher pro Tag',
      duration: '3 Tage, je 8 Stunden',
      specialRequirements: [
        'Corporate Branding Integration',
        'Schneller Service (Messetrubel)',
        'Mehrsprachige Barkeeper (DE/EN)',
        'Gesundheitsbewusste Cocktail-Optionen',
      ],
    },

    service: {
      title: 'Multi-Day Messe-Service',
      description:
        'Professionelle Bar-Station über 3 Messetage mit sportlich-frischen Cocktails als Marken-Experience.',
      offerings: [
        '2 Barkeeper pro Schicht',
        'Kompakte, mobile Bar-Lösung',
        'Schneller Service (1-2 Min. pro Drink)',
        'Branding-Integration möglich',
        'Energie- und Vitamin-Booster',
      ],
      cocktailMenu: [
        'Fresh Energy Spritz (alkoholfrei)',
        'Superfruit Cooler',
        'Gin Cucumber Refresh',
        'Protein Power Smoothie',
        'Classic Aperitivo Selection',
      ],
    },

    results: {
      title: 'Messeerfolg mit Bar-Attraktion',
      metrics: [
        {
          label: 'Drinks ausgegeben',
          value: '1.200+',
          description: 'Über 3 Messetage',
        },
        {
          label: 'Stand-Besucher',
          value: '+40%',
          description: 'Mehr Besucher als letztes Jahr',
        },
        {
          label: 'Lead-Qualität',
          value: 'Hoch',
          description: 'Längere Verweildauer am Stand',
        },
      ],
      highlights: [
        'Bar wurde zum Gesprächsthema auf der Messe',
        'Perfekte Kundenbindung durch entspannte Atmosphäre',
        'Follow-up Buchungen für weitere Messen gesichert',
        'Social Media Reichweite durch Bar-Content erhöht',
      ],
    },

    testimonial: {
      quote:
        'Die Cocktailbar war ein genialer Einfall. Besucher blieben länger, die Stimmung war entspannt und wir hatten deutlich mehr qualifizierte Gespräche. Velobar ist ab jetzt fester Bestandteil unserer Messe-Strategie.',
      author: 'Lisa Schneider',
      position: 'Marketing Director',
      company: 'Sportartikel-Hersteller',
    },
  },
];

export const getTotalProjectMetrics = () => {
  return {
    totalEvents: caseStudies.length,
    avgGuestSatisfaction: '4.9/5',
    totalCocktailsServed: '1750+',
    repeatClientRate: '85%',
    avgEventRating: '4.9/5',
  };
};
