import type { ServicesPageContent } from './types';

export const servicesContent: ServicesPageContent = {
  slug: 'services',
  seoTitle: 'Services - Mobile Cocktailbar & Event Catering',
  seoDescription:
    'Professionelle Cocktailbar und Event-Catering-Services für Firmenfeiern, Hochzeiten, Messen und private Feiern in München und Coburg.',
  hero: {
    eyebrow: 'Unsere Services',
    title: 'Premium Event-Catering',
    subtitle:
      'Von der Firmenfeier bis zur Traumhochzeit – individuelle Cocktail-Services für jede Veranstaltung.',
  },
  sections: [
    {
      id: 'overview',
      title: 'Maßgeschneiderter Service',
      body: [
        'Velobar bietet professionellen Barkeeper-Service mit mobiler Cocktailbar für Events jeder Größe.',
        'Individuell angepasste Menüs, Premium-Spirituosen und einwandfreier Service sind unser Standard.',
      ],
    },
  ],
  groups: [
    {
      id: 'service-types',
      title: 'Event-Typen',
      items: [
        {
          id: 'corporate',
          title: 'Firmenfeiern',
          description:
            'Sommerfeste, Weihnachtsfeiern, Jubiläen und Team-Events mit professionellem Cocktail-Service.',
        },
        {
          id: 'weddings',
          title: 'Hochzeiten',
          description: 'Cocktail-Empfang, Aperitif oder Mitternachtsbar für deine Traumhochzeit.',
        },
        {
          id: 'trade-shows',
          title: 'Messen & Promotions',
          description: 'Besuchermagnet für deinen Messestand oder deine Brand-Activation.',
        },
      ],
    },
  ],
  categories: [
    {
      id: 'corporate-events',
      title: 'Firmenfeiern & Corporate Events',
      subtitle: 'Professioneller Service für Unternehmensveranstaltungen',
      priceFromLabel: 'Auf Anfrage',
    },
    {
      id: 'private-events',
      title: 'Private Feiern & Hochzeiten',
      subtitle: 'Cocktailbar für besondere Anlässe',
      priceFromLabel: 'Auf Anfrage',
    },
    {
      id: 'trade-shows',
      title: 'Messen & Promotions',
      subtitle: 'Mobile Bar für Messe-Auftritte',
      priceFromLabel: 'Auf Anfrage',
    },
    {
      id: 'consulting',
      title: 'Cocktail-Workshops',
      subtitle: 'Teambuilding und Cocktail-Kurse',
      priceFromLabel: 'Ab 50€ / Person',
    },
  ],
  services: [
    {
      id: 'firmenfeier-basic',
      categoryId: 'corporate-events',
      title: 'Firmenfeier Basis-Paket',
      description:
        'Mobile Cocktailbar mit 2 Barkeepern für bis zu 100 Gäste. Standard-Cocktailmenü mit 6 Cocktails zur Auswahl.',
      priceFrom: 1200,
      priceUnit: '€ / Event',
      duration: '4 Stunden',
      features: [
        '2 professionelle Barkeeper',
        'Mobile Bar-Ausstattung',
        '6 Standard-Cocktails',
        'Basis-Dekoration',
        'Alle Zutaten & Equipment',
      ],
      cta: 'Jetzt anfragen',
    },
    {
      id: 'firmenfeier-premium',
      categoryId: 'corporate-events',
      title: 'Firmenfeier Premium-Paket',
      description:
        'Erweitertes Service-Paket mit 3 Barkeepern, Premium-Spirituosen und individueller Menü-Gestaltung für bis zu 150 Gäste.',
      priceFrom: 2500,
      priceUnit: '€ / Event',
      duration: '5 Stunden',
      features: [
        '3 professionelle Barkeeper',
        'Premium-Spirituosen',
        'Individuelles Cocktail-Menü (10+ Optionen)',
        'Gehobene Dekoration',
        'Alkoholfreie Alternativen',
      ],
      cta: 'Jetzt anfragen',
    },
    {
      id: 'firmenfeier-vip',
      categoryId: 'corporate-events',
      title: 'Firmenfeier VIP-Paket',
      description:
        'Exklusiver Full-Service mit 4+ Barkeepern, Luxus-Spirituosen, Champagner-Service und maßgeschneidertem Konzept.',
      priceFrom: 5000,
      priceUnit: '€ / Event',
      duration: 'Individuell',
      features: [
        '4+ erfahrene Barkeeper',
        'Luxus- & Premium-Spirituosen',
        'Maßgeschneidertes Konzept',
        'Champagner & Signature-Drinks',
        'Event-Koordination',
      ],
      cta: 'Beratung vereinbaren',
    },
    {
      id: 'hochzeit-basic',
      categoryId: 'private-events',
      title: 'Hochzeit Cocktail-Empfang',
      description:
        'Cocktailbar für den Sektempfang oder Aperitif. Perfekt für 50-80 Hochzeitsgäste.',
      priceFrom: 1500,
      priceUnit: '€ / Event',
      duration: '3 Stunden',
      features: [
        '2 Barkeeper',
        'Elegante Bar-Präsentation',
        'Hochzeits-Cocktailmenü',
        'Romantische Dekoration',
        'Champagner-Service optional',
      ],
      cta: 'Jetzt anfragen',
    },
    {
      id: 'hochzeit-premium',
      categoryId: 'private-events',
      title: 'Hochzeit Ganztags-Service',
      description:
        'Vollständiger Cocktail-Service vom Empfang bis zur Mitternachtsbar. Individuell auf dein Hochzeitsthema abgestimmt.',
      priceFrom: 3500,
      priceUnit: '€ / Event',
      duration: '8+ Stunden',
      features: [
        '3 Barkeeper im Schichtbetrieb',
        'Empfang + Abend-Service',
        'Themen-Cocktails nach Wunsch',
        'Premium-Dekoration',
        'Mitternachtsbar möglich',
      ],
      cta: 'Jetzt anfragen',
    },
    {
      id: 'hochzeit-custom',
      categoryId: 'private-events',
      title: 'Hochzeit Maßgeschneidert',
      description:
        'Vollständig individualisiertes Cocktail-Erlebnis mit Signature-Drinks, personalisierten Details und Luxus-Service.',
      priceFrom: 6000,
      priceUnit: '€ / Event',
      duration: 'Individuell',
      features: [
        'Komplette Event-Planung',
        'Persönliche Cocktail-Kreationen',
        'Luxus-Spirituosen & Champagner',
        'Personalisierte Dekoration',
        'Unlimited Service',
      ],
      cta: 'Beratung vereinbaren',
    },
    {
      id: 'messe-basic',
      categoryId: 'trade-shows',
      title: 'Messe-Stand Cocktailbar',
      description:
        'Kompakte mobile Bar als Besuchermagnet für deinen Messestand. Schneller Service im Messetrubel.',
      priceFrom: 800,
      priceUnit: '€ / Tag',
      duration: 'Pro Messetag',
      features: [
        '2 Barkeeper pro Schicht',
        'Kompakte Bar-Lösung',
        'Schneller Service',
        '4-6 Cocktails',
        'Branding-Integration möglich',
      ],
      cta: 'Jetzt anfragen',
    },
    {
      id: 'messe-premium',
      categoryId: 'trade-shows',
      title: 'Messe Multi-Day Premium',
      description:
        'Professionelle Bar-Station über mehrere Messetage mit erweiterten Services und Marketing-Integration.',
      priceFrom: 2000,
      priceUnit: '€ / Tag',
      duration: '3+ Tage buchbar',
      features: [
        '3 Barkeeper-Teams',
        'Extended Hours Coverage',
        'Premium-Cocktails',
        'Full Corporate Branding',
        'Social Media Content',
      ],
      cta: 'Jetzt anfragen',
    },
    {
      id: 'messe-enterprise',
      categoryId: 'trade-shows',
      title: 'Messe Brand Experience',
      description:
        'Komplette Brand-Activation mit maßgeschneiderter Bar, Signature-Drinks und vollständiger Event-Koordination.',
      priceFrom: 5000,
      priceUnit: '€ / Event',
      duration: 'Multi-Day',
      features: [
        'Custom Bar-Design',
        'Signature Brand-Cocktails',
        'Event-Koordination',
        'Foto/Video-Content',
        'Lead-Generation Support',
      ],
      cta: 'Beratung vereinbaren',
    },
    {
      id: 'workshop-basic',
      categoryId: 'consulting',
      title: 'Cocktail-Workshop',
      description:
        'Teambuilding-Event mit professionellem Barkeeper. Lerne klassische Cocktails zu mixen.',
      priceFrom: 50,
      priceUnit: '€ / Person',
      duration: '2 Stunden',
      features: [
        'Professionelle Anleitung',
        '3-4 Cocktails lernen',
        'Alle Zutaten inklusive',
        'Rezept-Booklet',
        'Min. 10 Personen',
      ],
      cta: 'Jetzt anfragen',
    },
    {
      id: 'workshop-premium',
      categoryId: 'consulting',
      title: 'Premium Cocktail-Kurs',
      description:
        'Exklusiver Mixology-Kurs mit erweiterten Techniken, Premium-Spirituosen und Zertifikat.',
      priceFrom: 120,
      priceUnit: '€ / Person',
      duration: '4 Stunden',
      features: [
        'Erweiterte Techniken',
        'Premium-Spirituosen',
        '6-8 Cocktails',
        'Professionelle Ausrüstung',
        'Teilnahme-Zertifikat',
      ],
      cta: 'Jetzt anfragen',
    },
    {
      id: 'workshop-custom',
      categoryId: 'consulting',
      title: 'Firmen-Workshop Maßgeschneidert',
      description:
        'Individuell gestalteter Teambuilding-Workshop mit spezifischen Themen und Corporate-Branding.',
      priceFrom: 1500,
      priceUnit: '€ / Gruppe',
      duration: 'Halbtags/Ganztags',
      features: [
        'Maßgeschneiderte Inhalte',
        'Corporate Branding',
        'Team-Wettbewerbe',
        'Catering optional',
        'Location-Support',
      ],
      cta: 'Beratung vereinbaren',
    },
  ],
};

// Export for use in pages
export default servicesContent;
