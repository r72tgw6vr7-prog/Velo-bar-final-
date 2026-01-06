/**
 * WeihnachtsFeiern (Christmas Party) Page Content
 * ================================================
 * Bilingual content (DE/EN) for Christmas corporate events
 */

import type { ServicePageContent } from './types';

export interface WeihnachtsfeiernPageContent extends ServicePageContent {
  seasonalCocktails: readonly {
    name: string;
    description: string;
    category: 'warm' | 'klassisch' | 'prickelnd' | 'alkoholfrei';
  }[];
  officeSetups: readonly {
    id: number;
    title: string;
    guests: string;
    location: string;
  }[];
}

// German content (default)
export const weihnachtsfeiernContentDE: WeihnachtsfeiernPageContent = {
  slug: 'weihnachtsfeiern',
  // SEO: Title ~55 chars with seasonal keyword + location + brand
  seoTitle: 'Mobile Bar Weihnachtsfeier München',
  // SEO: Description ~150 chars with seasonal intent, USPs, pricing
  seoDescription:
    'Festliche mobile Cocktailbar für deine Firmenweihnachtsfeier in München. Glühwein, Winter-Cocktails & mehr. Flat Rate ab €45/Gast. Jetzt buchen!',

  hero: {
    eyebrow: 'Weihnachtsfeier 2024',
    title: 'Mobile Bar für deine Firmenweihnachtsfeier',
    subtitle: 'Festliche Cocktails, null Stress – wir kümmern uns um alles',
    primaryCtaLabel: 'Weihnachtsfeier anfragen',
    secondaryCtaLabel: 'Termine prüfen',
  },

  sections: [
    {
      id: 'intro',
      title: 'Warum Velo.Bar für deine Weihnachtsfeier?',
      body: [
        'Die Weihnachtsfeier ist DER Moment, um deinem Team Danke zu sagen. Mit unserer mobilen Fahrrad-Bar verwandeln wir jede Location in eine festliche Cocktail-Lounge.',
        'Von Glühwein-Empfang bis Mitternachts-Cocktail – wir sorgen für Stimmung, du genießt.',
      ],
    },
  ],

  pricingTiers: [
    {
      id: 'winter-classic',
      name: 'Winter Classic',
      pricePerGuest: '€32',
      basePrice: '€1.600',
      duration: '4 Stunden',
      guests: '30-80 Gäste',
      benefits: [
        'Deine Mitarbeiter entspannen – wir kümmern uns um alles',
        '6 exklusive Winter-Cocktails für festliche Stimmung',
        'Glühwein-Station als weihnachtlicher Empfang',
        'Festliche Dekoration – du haken Weihnachtsdeko von der Liste',
        'MwSt. inklusive – keine versteckten Kosten',
      ],
      cta: 'Angebot anfordern',
    },
    {
      id: 'unlimited',
      name: 'Unlimited Flat Rate',
      pricePerGuest: '€45',
      basePrice: '€2.250',
      duration: '5 Stunden',
      guests: '50-150 Gäste',
      highlighted: true,
      benefits: [
        'Unbegrenzte Cocktails – deine Mitarbeiter trinken, du zahlst nicht pro Glas',
        'Kein Nachzählen, keine bösen Überraschungen auf der Rechnung',
        '10+ Winter-Specials für jeden Geschmack',
        'Alkoholfreie Premium-Mocktails – niemand wird ausgeschlossen',
        'Feuerzangenbowle als Highlight – der perfekte Gesprächsstarter',
        'MwSt. inklusive – planbares Budget',
      ],
      cta: 'Beliebteste Wahl',
    },
    {
      id: 'holiday-vip',
      name: 'Holiday VIP',
      pricePerGuest: 'Ab €65',
      basePrice: 'Ab €6.500',
      duration: '6+ Stunden',
      guests: '100-300 Gäste',
      benefits: [
        'Dein Event-Koordinator für stressfreie Planung',
        'Champagner-Bar für VIP-Gefühl bei deinen Gästen',
        'Luxus-Weihnachtsmenü mit Signature-Drinks',
        'Schichtbetrieb – Service auch bei langer Nacht',
        'Nikolaus-Service optional – Überraschung für dein Team',
        'Individuelles Angebot nach deinen Wünschen',
      ],
      cta: 'Individuelles Angebot',
    },
  ],

  seasonalCocktails: [
    {
      name: 'Glühwein Martini',
      description: 'Wodka, Glühweinsirup, Zimt, Orangenzeste',
      category: 'warm',
    },
    {
      name: 'White Christmas',
      description: 'Rum, Kokosmilch, Vanille, Sahne, Zimtsterne',
      category: 'klassisch',
    },
    {
      name: 'Winter Moscow Mule',
      description: 'Wodka, Ingwerbier, Lebkuchensirup, Limette',
      category: 'klassisch',
    },
    {
      name: 'Hot Buttered Rum',
      description: 'Dunkler Rum, Butter, Honig, Gewürze',
      category: 'warm',
    },
    {
      name: 'Cranberry Fizz',
      description: 'Gin, Cranberrysaft, Prosecco, Rosmarin',
      category: 'prickelnd',
    },
    { name: 'Winterpunsch', description: 'Rum, Orangensaft, Gewürze, Tee', category: 'warm' },
    {
      name: 'Spiced Old Fashioned',
      description: 'Bourbon, Zimt, Nelken, Orangenbitter',
      category: 'klassisch',
    },
    {
      name: 'Schneeflocke (alkoholfrei)',
      description: 'Kokosmilch, Vanille, Sahne, Zimt',
      category: 'alkoholfrei',
    },
  ],

  officeSetups: [
    { id: 1, title: 'Tech-Startup Loft', guests: '80 Mitarbeiter', location: 'München Schwabing' },
    {
      id: 2,
      title: 'Agentur Open Space',
      guests: '120 Mitarbeiter',
      location: 'München Glockenbach',
    },
    { id: 3, title: 'Konferenzraum Setup', guests: '50 Mitarbeiter', location: 'Coburg Zentrum' },
    {
      id: 4,
      title: 'Rooftop Winterzauber',
      guests: '150 Mitarbeiter',
      location: 'München Maxvorstadt',
    },
  ],

  faqs: [
    {
      id: 'booking-time',
      question: 'Wie früh sollten wir unsere Weihnachtsfeier buchen?',
      answer:
        'November und Dezember sind unsere Hochsaison – die besten Termine sind oft 8-12 Wochen im Voraus ausgebucht. Wir empfehlen dir, bis spätestens September anzufragen.',
    },
    {
      id: 'unlimited',
      question: 'Was genau bedeutet "Unlimited Flat Rate"?',
      answer:
        'Bei der Unlimited Flat Rate zahlst du einen Festpreis für unbegrenzte Cocktails während der Servicezeit. Deine Mitarbeiter können so viel genießen wie sie möchten – keine Nachzahlungen.',
    },
    {
      id: 'office',
      question: 'Kannst du auch in unserem Büro aufbauen?',
      answer:
        'Selbstverständlich! Unsere mobile Fahrrad-Bar passt in jeden Aufzug (2m x 1m Stellfläche). Wir benötigen weder Strom noch Wasser.',
    },
    {
      id: 'included',
      question: 'Was ist im Preis enthalten?',
      answer:
        'Alle Pakete sind All-inclusive: Barkeeper, Spirituosen, Zutaten, Eis, Gläser, festliche Dekoration und Service.',
    },
    {
      id: 'warm-drinks',
      question: 'Bietet ihr auch warme Getränke an?',
      answer:
        'Selbstverständlich! Unsere Winter-Pakete beinhalten Glühwein-Station, heißen Punsch und optionale Feuerzangenbowle.',
    },
  ],

  testimonials: [],
  usps: [],

  cta: {
    primary: {
      label: 'Weihnachtsfeier anfragen',
      href: '/anfrage',
    },
    secondary: {
      label: 'Verfügbarkeit prüfen',
      href: 'tel:+4916094623196',
    },
  },
};

// English content
export const weihnachtsfeiernContentEN: WeihnachtsfeiernPageContent = {
  slug: 'christmas-parties',
  seoTitle: 'Mobile Bar Christmas Party Munich | Velo.Bar',
  seoDescription:
    'Festive cocktail catering for your corporate Christmas party. Unlimited flat rate from €45/guest. Mulled wine, winter cocktails & more.',

  hero: {
    eyebrow: 'Christmas Party 2024',
    title: 'Mobile Bar for Your Christmas Party',
    subtitle: 'Festive cocktails, zero stress – we take care of everything',
    primaryCtaLabel: 'Request Christmas Party',
    secondaryCtaLabel: 'Check Availability',
  },

  sections: [
    {
      id: 'intro',
      title: 'Why Velo.Bar for Your Christmas Party?',
      body: [
        'The Christmas party is THE moment to thank your team. With our mobile bicycle bar, we transform any location into a festive cocktail lounge.',
        'From mulled wine welcome to midnight cocktails – we create the atmosphere, you enjoy.',
      ],
    },
  ],

  pricingTiers: [
    {
      id: 'winter-classic',
      name: 'Winter Classic',
      pricePerGuest: '€32',
      basePrice: '€1,600',
      duration: '4 hours',
      guests: '30-80 guests',
      benefits: [
        'Your employees relax – we take care of everything',
        '6 exclusive winter cocktails for festive vibes',
        'Mulled wine station as Christmas welcome',
        'Festive decoration – check Christmas decor off your list',
        'VAT included – no hidden costs',
      ],
      cta: 'Request Quote',
    },
    {
      id: 'unlimited',
      name: 'Unlimited Flat Rate',
      pricePerGuest: '€45',
      basePrice: '€2,250',
      duration: '5 hours',
      guests: '50-150 guests',
      highlighted: true,
      benefits: [
        "Unlimited cocktails – your team drinks, you don't pay per glass",
        'No counting, no nasty surprises on the bill',
        '10+ winter specials for every taste',
        'Alcohol-free premium mocktails – no one left out',
        'Feuerzangenbowle as highlight – the perfect conversation starter',
        'VAT included – predictable budget',
      ],
      cta: 'Most Popular',
    },
    {
      id: 'holiday-vip',
      name: 'Holiday VIP',
      pricePerGuest: 'From €65',
      basePrice: 'From €6,500',
      duration: '6+ hours',
      guests: '100-300 guests',
      benefits: [
        'Your event coordinator for stress-free planning',
        'Champagne bar for VIP feeling',
        'Luxury Christmas menu with signature drinks',
        'Shift operation – service even for long nights',
        'Santa service optional – surprise for your team',
        'Custom offer based on your wishes',
      ],
      cta: 'Custom Quote',
    },
  ],

  seasonalCocktails: [
    {
      name: 'Mulled Wine Martini',
      description: 'Vodka, mulled wine syrup, cinnamon, orange zest',
      category: 'warm',
    },
    {
      name: 'White Christmas',
      description: 'Rum, coconut milk, vanilla, cream, cinnamon stars',
      category: 'klassisch',
    },
    {
      name: 'Winter Moscow Mule',
      description: 'Vodka, ginger beer, gingerbread syrup, lime',
      category: 'klassisch',
    },
    { name: 'Hot Buttered Rum', description: 'Dark rum, butter, honey, spices', category: 'warm' },
    {
      name: 'Cranberry Fizz',
      description: 'Gin, cranberry juice, prosecco, rosemary',
      category: 'prickelnd',
    },
    { name: 'Winter Punch', description: 'Rum, orange juice, spices, tea', category: 'warm' },
    {
      name: 'Spiced Old Fashioned',
      description: 'Bourbon, cinnamon, cloves, orange bitters',
      category: 'klassisch',
    },
    {
      name: 'Snowflake (non-alcoholic)',
      description: 'Coconut milk, vanilla, cream, cinnamon',
      category: 'alkoholfrei',
    },
  ],

  officeSetups: [
    { id: 1, title: 'Tech Startup Loft', guests: '80 employees', location: 'Munich Schwabing' },
    { id: 2, title: 'Agency Open Space', guests: '120 employees', location: 'Munich Glockenbach' },
    { id: 3, title: 'Conference Room Setup', guests: '50 employees', location: 'Coburg Center' },
    {
      id: 4,
      title: 'Rooftop Winter Magic',
      guests: '150 employees',
      location: 'Munich Maxvorstadt',
    },
  ],

  faqs: [
    {
      id: 'booking-time',
      question: 'How early should we book our Christmas party?',
      answer:
        'November and December are our peak season – the best dates are often booked 8-12 weeks in advance. We recommend inquiring by September at the latest.',
    },
    {
      id: 'unlimited',
      question: 'What exactly does "Unlimited Flat Rate" mean?',
      answer:
        'With Unlimited Flat Rate, you pay a fixed price for unlimited cocktails during service time. Your employees can enjoy as much as they want – no additional charges.',
    },
    {
      id: 'office',
      question: 'Can you set up in our office?',
      answer:
        "Absolutely! Our mobile bicycle bar fits in any elevator (2m x 1m footprint). We don't need electricity or water.",
    },
    {
      id: 'included',
      question: "What's included in the price?",
      answer:
        'All packages are all-inclusive: bartender, spirits, ingredients, ice, glasses, festive decoration, and service.',
    },
    {
      id: 'warm-drinks',
      question: 'Do you offer warm drinks?',
      answer:
        'Of course! Our winter packages include mulled wine station, hot punch, and optional Feuerzangenbowle.',
    },
  ],

  testimonials: [],
  usps: [],

  cta: {
    primary: {
      label: 'Request Christmas Party',
      href: '/anfrage',
    },
    secondary: {
      label: 'Check Availability',
      href: 'tel:+4916094623196',
    },
  },
};

// Export default (German)
export default weihnachtsfeiernContentDE;
