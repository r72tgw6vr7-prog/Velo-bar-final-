/**
 * PrivateFeiern (Private Parties) Page Content
 * =============================================
 * Bilingual content (DE/EN) for private celebrations
 */

import type { ServicePageContent } from './types';

// German content (default)
export const privateFeiernContentDE: ServicePageContent = {
  slug: 'private-feiern',
  seoTitle: 'Mobile Cocktailbar für Private Feiern München | Velo.Bar',
  seoDescription:
    'Premium Cocktail-Service für deine private Feier. Geburtstage, Jubiläen, Gartenpartys. Ab €690. Professionelle Barkeeper kommen zu dir.',

  hero: {
    eyebrow: 'Private Events',
    title: 'Mobile Cocktailbar für deine private Feier',
    subtitle: 'Professionelle Barkeeper kommen zu dir – überall',
    primaryCtaLabel: 'Unverbindlich anfragen',
    secondaryCtaLabel: 'Preise ansehen',
  },

  sections: [
    {
      id: 'intro',
      title: 'Feier mit Stil',
      body: [
        'Ob Geburtstag, Jubiläum oder Gartenparty – mit unserer mobilen Fahrrad-Bar wird deine Feier zum unvergesslichen Erlebnis.',
        'Professionelle Barkeeper, Premium-Spirituosen und eine einzigartige Atmosphäre – direkt bei dir zu Hause oder an deiner Wunsch-Location.',
      ],
    },
    {
      id: 'occasions',
      title: 'Perfekt für jeden Anlass',
      body: [
        'Runder Geburtstag (30er, 40er, 50er...)',
        'Hochzeiten & Polterabende',
        'Jubiläen & Jahrestage',
        'Gartenpartys & Sommerfeste',
        'Silvester & besondere Anlässe',
      ],
    },
  ],

  pricingTiers: [
    {
      id: 'starter',
      name: 'Party Starter',
      pricePerGuest: '€690',
      basePrice: '€690',
      duration: '3 Stunden',
      guests: '20-40 Gäste',
      benefits: [
        'Professioneller Barkeeper',
        '5 klassische Cocktails zur Auswahl',
        'Alle Spirituosen & Zutaten inklusive',
        'Mobiles Bar-Setup',
        'Stilvolle Gläser (Leihe)',
      ],
      cta: 'Angebot anfordern',
    },
    {
      id: 'premium',
      name: 'Premium Party',
      pricePerGuest: '€990',
      basePrice: '€990',
      duration: '4 Stunden',
      guests: '30-60 Gäste',
      highlighted: true,
      benefits: [
        'Erfahrener Barkeeper',
        '8 Premium-Cocktails + Mocktails',
        'Signature-Drink nach deinem Wunsch',
        'Komplett ausgestattete Fahrrad-Bar',
        'Hochwertige Gläser',
        'Cocktail-Menükarten',
      ],
      cta: 'Beliebteste Wahl',
    },
    {
      id: 'deluxe',
      name: 'Deluxe Experience',
      pricePerGuest: 'Ab €1.490',
      basePrice: 'Ab €1.490',
      duration: '5+ Stunden',
      guests: '50-100 Gäste',
      benefits: [
        '2 Barkeeper für schnellen Service',
        'Unbegrenzte Cocktails (Flat Rate möglich)',
        'Premium-Spirituosen Upgrade',
        '10+ Cocktails zur Auswahl',
        'Individuelle Signature-Drinks',
        'Koordination mit Caterer möglich',
      ],
      cta: 'Individuelles Angebot',
    },
  ],

  faqs: [
    {
      id: 'location',
      question: 'Wo kannst du aufbauen?',
      answer:
        'Überall! Garten, Terrasse, Wohnzimmer, Garage, Scheune – unsere Bar ist komplett autark und benötigt weder Strom noch Wasseranschluss. Die Fahrrad-Bar passt auch in jeden Aufzug.',
    },
    {
      id: 'guests',
      question: 'Wie viele Gäste kannst du bedienen?',
      answer:
        'Ein Barkeeper bedient komfortabel bis zu 50 Gäste. Bei größeren Feiern setzen wir zusätzliche Barkeeper ein, um Wartezeiten zu minimieren.',
    },
    {
      id: 'drinks',
      question: 'Welche Getränke bieten wir an?',
      answer:
        'Unser Repertoire umfasst klassische Cocktails (Mojito, Moscow Mule, etc.), Gin-Spezialitäten (40+ Sorten), Signature-Drinks nach Wunsch und alkoholfreie Mocktails.',
    },
    {
      id: 'timing',
      question: 'Wie früh sollte ich buchen?',
      answer:
        'Für Wochenendtermine empfehlen wir 3-4 Wochen Vorlauf. Kurzfristige Anfragen versuchen wir nach Verfügbarkeit zu ermöglichen.',
    },
    {
      id: 'included',
      question: 'Was ist im Preis enthalten?',
      answer:
        'Alle Pakete sind All-inclusive: Barkeeper, Spirituosen, Zutaten, Eis, Gläser (Leihe), Auf- und Abbau. Du musst nichts zusätzlich besorgen.',
    },
  ],

  testimonials: [
    {
      id: 'birthday',
      quote:
        'Die beste Entscheidung für meinen 40. Geburtstag! Meine Gäste reden heute noch davon.',
      author: 'Julia M.',
      company: 'Gartenparty München',
      rating: 5,
    },
    {
      id: 'wedding',
      quote:
        'Perfekt für unseren Polterabend. Professionell, charmant und die Cocktails waren fantastisch.',
      author: 'Stefan & Lisa',
      company: 'Polterabend Starnberg',
      rating: 5,
    },
  ],

  usps: [
    { id: 'mobil', icon: 'Bike', title: 'Komplett mobil', description: 'Wir kommen zu dir' },
    { id: 'autark', icon: 'Zap', title: 'Autark', description: 'Kein Strom, kein Wasser nötig' },
    { id: 'service', icon: 'Star', title: 'Full Service', description: 'All-inclusive Pakete' },
    { id: 'quality', icon: 'Award', title: 'Premium', description: '40+ Gin-Sorten' },
  ],

  cta: {
    primary: {
      label: 'Jetzt anfragen',
      href: '/anfrage',
    },
    secondary: {
      label: 'Anrufen',
      href: 'tel:+4916094623196',
    },
  },
};

// English content
export const privateFeiernContentEN: ServicePageContent = {
  slug: 'private-parties',
  seoTitle: 'Mobile Cocktail Bar for Private Parties Munich | Velo.Bar',
  seoDescription:
    'Premium cocktail service for your private celebration. Birthdays, anniversaries, garden parties. From €690. Professional bartenders come to you.',

  hero: {
    eyebrow: 'Private Events',
    title: 'Mobile Cocktail Bar for Your Private Party',
    subtitle: 'Professional bartenders come to you – anywhere',
    primaryCtaLabel: 'Request Quote',
    secondaryCtaLabel: 'View Prices',
  },

  sections: [
    {
      id: 'intro',
      title: 'Celebrate in Style',
      body: [
        'Whether birthday, anniversary, or garden party – with our mobile bicycle bar, your celebration becomes an unforgettable experience.',
        'Professional bartenders, premium spirits, and a unique atmosphere – directly at your home or desired location.',
      ],
    },
    {
      id: 'occasions',
      title: 'Perfect for Every Occasion',
      body: [
        'Milestone birthdays (30th, 40th, 50th...)',
        'Weddings & bachelor/bachelorette parties',
        'Anniversaries',
        'Garden parties & summer celebrations',
        "New Year's Eve & special occasions",
      ],
    },
  ],

  pricingTiers: [
    {
      id: 'starter',
      name: 'Party Starter',
      pricePerGuest: '€690',
      basePrice: '€690',
      duration: '3 hours',
      guests: '20-40 guests',
      benefits: [
        'Professional bartender',
        '5 classic cocktails to choose from',
        'All spirits & ingredients included',
        'Mobile bar setup',
        'Stylish glasses (rental)',
      ],
      cta: 'Request Quote',
    },
    {
      id: 'premium',
      name: 'Premium Party',
      pricePerGuest: '€990',
      basePrice: '€990',
      duration: '4 hours',
      guests: '30-60 guests',
      highlighted: true,
      benefits: [
        'Experienced bartender',
        '8 premium cocktails + mocktails',
        'Signature drink of your choice',
        'Fully equipped bicycle bar',
        'High-quality glasses',
        'Cocktail menu cards',
      ],
      cta: 'Most Popular',
    },
    {
      id: 'deluxe',
      name: 'Deluxe Experience',
      pricePerGuest: 'From €1,490',
      basePrice: 'From €1,490',
      duration: '5+ hours',
      guests: '50-100 guests',
      benefits: [
        '2 bartenders for fast service',
        'Unlimited cocktails (flat rate possible)',
        'Premium spirits upgrade',
        '10+ cocktails to choose from',
        'Individual signature drinks',
        'Coordination with caterer possible',
      ],
      cta: 'Custom Quote',
    },
  ],

  faqs: [
    {
      id: 'location',
      question: 'Where can you set up?',
      answer:
        'Anywhere! Garden, terrace, living room, garage, barn – our bar is completely self-sufficient and needs neither electricity nor water. The bicycle bar also fits in any elevator.',
    },
    {
      id: 'guests',
      question: 'How many guests can you serve?',
      answer:
        'One bartender comfortably serves up to 50 guests. For larger celebrations, we deploy additional bartenders to minimize wait times.',
    },
    {
      id: 'drinks',
      question: 'What drinks do you offer?',
      answer:
        'Our repertoire includes classic cocktails (Mojito, Moscow Mule, etc.), gin specialties (40+ varieties), custom signature drinks, and non-alcoholic mocktails.',
    },
    {
      id: 'timing',
      question: 'How early should I book?',
      answer:
        'For weekend dates, we recommend 3-4 weeks advance notice. Short-notice requests we try to accommodate based on availability.',
    },
    {
      id: 'included',
      question: "What's included in the price?",
      answer:
        "All packages are all-inclusive: bartender, spirits, ingredients, ice, glasses (rental), setup and teardown. You don't need to get anything else.",
    },
  ],

  testimonials: [
    {
      id: 'birthday',
      quote: 'The best decision for my 40th birthday! My guests still talk about it today.',
      author: 'Julia M.',
      company: 'Garden Party Munich',
      rating: 5,
    },
    {
      id: 'wedding',
      quote:
        'Perfect for our bachelor party. Professional, charming, and the cocktails were fantastic.',
      author: 'Stefan & Lisa',
      company: 'Bachelor Party Starnberg',
      rating: 5,
    },
  ],

  usps: [
    { id: 'mobile', icon: 'Bike', title: 'Fully Mobile', description: 'We come to you' },
    {
      id: 'autark',
      icon: 'Zap',
      title: 'Self-Sufficient',
      description: 'No power, no water needed',
    },
    { id: 'service', icon: 'Star', title: 'Full Service', description: 'All-inclusive packages' },
    { id: 'quality', icon: 'Award', title: 'Premium', description: '40+ gin varieties' },
  ],

  cta: {
    primary: {
      label: 'Request Now',
      href: '/anfrage',
    },
    secondary: {
      label: 'Call Us',
      href: 'tel:+4916094623196',
    },
  },
};

export default privateFeiernContentDE;
