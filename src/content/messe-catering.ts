/**
 * MesseCatering (Trade Fair Catering) Page Content
 * =================================================
 * Bilingual content (DE/EN) for trade fair/expo events
 */

import type { ServicePageContent } from './types.ts';

// German content (default)
export const messeCateringContentDE: ServicePageContent = {
  slug: 'messe-catering',
  // SEO: Title ~55 chars with B2B keyword + location
  seoTitle: 'Cocktailbar für Messestand München',
  // SEO: Description ~150 chars with B2B intent, USPs, CTA
  seoDescription:
    'Premium mobile Cocktailbar für deinen Messestand in München. Mehr Leads durch Networking-Booster. Autark ohne Strom. Jetzt Messe-Angebot anfordern!',

  hero: {
    eyebrow: 'Messe & Expo Service',
    title: 'Mobile Cocktailbar für deinen Messestand',
    subtitle: 'Der Networking-Booster für mehr qualifizierte Leads',
    primaryCtaLabel: 'Messe-Angebot anfordern',
    secondaryCtaLabel: 'Referenzen ansehen',
  },

  sections: [
    {
      id: 'intro',
      title: 'Warum eine Cocktailbar am Messestand?',
      body: [
        'Messegäste laufen an 90% der Stände vorbei. Mit unserer mobilen Fahrrad-Bar stoppen sie bei dir – und bleiben für ein Gespräch.',
        'Durchschnittlich 47% längere Standbesuche und 3x mehr Visitenkarten-Austausch bei unseren Kunden.',
      ],
    },
    {
      id: 'benefits',
      title: 'Dein Messe-Vorteil',
      body: [
        'Einzigartiger Eye-Catcher: Die Fahrrad-Bar zieht Besucher magisch an',
        'Gesprächsstarter: Cocktails brechen das Eis für deine Vertriebsgespräche',
        'Lead-Qualifizierung: Mehr Zeit mit potenziellen Kunden',
        'Brand Activation: Signature-Drinks in deinen Unternehmensfarben',
      ],
    },
  ],

  pricingTiers: [
    {
      id: 'messe-basic',
      name: 'Messe Basic',
      pricePerGuest: '€890',
      basePrice: '€890/Tag',
      duration: '8 Stunden',
      guests: 'Bis 100 Drinks',
      benefits: [
        'Professioneller Barkeeper für 8h',
        '100 Premium-Cocktails inklusive',
        'Kompakte Bar (2m²) – passt in jeden Stand',
        'Keine Infrastruktur nötig',
        'Branding-Option: Logo auf der Bar',
      ],
      cta: 'Angebot anfordern',
    },
    {
      id: 'messe-pro',
      name: 'Messe Pro',
      pricePerGuest: '€1.490',
      basePrice: '€1.490/Tag',
      duration: '10 Stunden',
      guests: 'Bis 200 Drinks',
      highlighted: true,
      benefits: [
        '2 Barkeeper für Stoßzeiten',
        '200 Premium-Cocktails inklusive',
        '3 Signature-Drinks in deinen Farben',
        'Gebrandete Bar & Menükarten',
        'Lead-Capture Integration möglich',
        'Aufbau vor Messebeginn',
      ],
      cta: 'Beliebteste Wahl',
    },
    {
      id: 'messe-enterprise',
      name: 'Messe Enterprise',
      pricePerGuest: 'Ab €2.500',
      basePrice: 'Ab €2.500/Tag',
      duration: 'Flexibel',
      guests: 'Unbegrenzt',
      benefits: [
        'Mehrere Bars möglich',
        'Unbegrenzte Cocktails (Flat Rate)',
        'Komplettes Brand Activation Konzept',
        'Persönlicher Event-Manager',
        'Vor-Ort Koordination mit Messebau',
        'Mehrtagespakete mit Rabatt',
      ],
      cta: 'Individuelles Konzept',
    },
  ],

  faqs: [
    {
      id: 'logistics',
      question: 'Wie funktioniert die Logistik auf der Messe?',
      answer:
        'Wir koordinieren direkt mit deinem Messebauer und dem Hallenmanagement. Aufbau erfolgt vor Messebeginn, Abbau nach Messeschluss. Unsere kompakte Bar benötigt nur 2m² und keinen Strom- oder Wasseranschluss.',
    },
    {
      id: 'branding',
      question: 'Kannst du unsere Corporate Identity integrieren?',
      answer:
        'Absolut! Wir erstellen Signature-Drinks in deinen Unternehmensfarben, branden die Bar mit deinem Logo und gestalten passende Menükarten. Perfekt für Brand Activation.',
    },
    {
      id: 'lead-capture',
      question: 'Wie hilft die Bar bei der Lead-Generierung?',
      answer:
        'Besucher bleiben durchschnittlich 47% länger an deinem Stand. Wir können QR-Code Aktionen integrieren: "Cocktail gegen Visitenkarte" oder Lead-Forms direkt an der Bar.',
    },
    {
      id: 'multi-day',
      question: 'Bietet ihr Mehrtages-Pakete an?',
      answer:
        'Ja! Bei Buchung von 3+ Messetagen erhältst du 15% Rabatt. Wir lagern Equipment über Nacht sicher ein und sind pünktlich zum Messestart wieder einsatzbereit.',
    },
  ],

  testimonials: [
    {
      id: 'automobilzulieferer',
      quote:
        'Die Cocktailbar war der beste ROI unseres Messestands. Doppelt so viele qualifizierte Leads wie im Vorjahr.',
      author: 'Marketing Director',
      company: 'Automobilzulieferer',
      rating: 5,
    },
  ],

  usps: [
    {
      id: 'eyecatcher',
      icon: 'Sparkles',
      title: 'Eye-Catcher',
      description: 'Besucher stoppen und schauen',
    },
    { id: 'kompakt', icon: 'Box', title: 'Kompakt', description: 'Nur 2m² Stellfläche' },
    { id: 'autark', icon: 'Zap', title: 'Autark', description: 'Kein Strom, kein Wasser' },
    { id: 'branding', icon: 'Palette', title: 'Branding', description: 'Voll individualisierbar' },
  ],

  cta: {
    primary: {
      label: 'Messe-Angebot anfordern',
      href: '/anfrage',
    },
    secondary: {
      label: 'Referenzen ansehen',
      href: '/galerie',
    },
  },
};

// English content
export const messeCateringContentEN: ServicePageContent = {
  slug: 'trade-fair-catering',
  seoTitle: 'Cocktail Catering Trade Fair Munich | Mobile Bar for Your Booth',
  seoDescription:
    'Premium cocktail service for your trade fair booth. Networking booster for your leads. Mobile bar without electricity. Book now for your next expo.',

  hero: {
    eyebrow: 'Trade Fair & Expo Service',
    title: 'Mobile Cocktail Bar for Your Trade Fair Booth',
    subtitle: 'The networking booster for more qualified leads',
    primaryCtaLabel: 'Request Trade Fair Quote',
    secondaryCtaLabel: 'View References',
  },

  sections: [
    {
      id: 'intro',
      title: 'Why a Cocktail Bar at Your Booth?',
      body: [
        'Trade fair visitors walk past 90% of booths. With our mobile bicycle bar, they stop at yours – and stay for a conversation.',
        'On average, 47% longer booth visits and 3x more business card exchanges for our clients.',
      ],
    },
  ],

  pricingTiers: [
    {
      id: 'trade-basic',
      name: 'Trade Fair Basic',
      pricePerGuest: '€890',
      basePrice: '€890/day',
      duration: '8 hours',
      guests: 'Up to 100 drinks',
      benefits: [
        'Professional bartender for 8h',
        '100 premium cocktails included',
        'Compact bar (2m²) – fits any booth',
        'No infrastructure needed',
        'Branding option: Logo on bar',
      ],
      cta: 'Request Quote',
    },
    {
      id: 'trade-pro',
      name: 'Trade Fair Pro',
      pricePerGuest: '€1,490',
      basePrice: '€1,490/day',
      duration: '10 hours',
      guests: 'Up to 200 drinks',
      highlighted: true,
      benefits: [
        '2 bartenders for peak times',
        '200 premium cocktails included',
        '3 signature drinks in your colors',
        'Branded bar & menu cards',
        'Lead capture integration possible',
        'Setup before fair opens',
      ],
      cta: 'Most Popular',
    },
    {
      id: 'trade-enterprise',
      name: 'Trade Fair Enterprise',
      pricePerGuest: 'From €2,500',
      basePrice: 'From €2,500/day',
      duration: 'Flexible',
      guests: 'Unlimited',
      benefits: [
        'Multiple bars possible',
        'Unlimited cocktails (flat rate)',
        'Complete brand activation concept',
        'Personal event manager',
        'On-site coordination with booth builder',
        'Multi-day packages with discount',
      ],
      cta: 'Custom Concept',
    },
  ],

  faqs: [
    {
      id: 'logistics',
      question: 'How does logistics work at the fair?',
      answer:
        'We coordinate directly with your booth builder and hall management. Setup before fair opens, teardown after closing. Our compact bar needs only 2m² and no electricity or water.',
    },
    {
      id: 'branding',
      question: 'Can you integrate our corporate identity?',
      answer:
        'Absolutely! We create signature drinks in your company colors, brand the bar with your logo, and design matching menu cards. Perfect for brand activation.',
    },
    {
      id: 'lead-capture',
      question: 'How does the bar help with lead generation?',
      answer:
        'Visitors stay on average 47% longer at your booth. We can integrate QR code campaigns: "Cocktail for business card" or lead forms directly at the bar.',
    },
    {
      id: 'multi-day',
      question: 'Do you offer multi-day packages?',
      answer:
        'Yes! When booking 3+ fair days, you get 15% discount. We store equipment safely overnight and are ready right on time for fair opening.',
    },
  ],

  testimonials: [
    {
      id: 'automotive',
      quote:
        'The cocktail bar was the best ROI of our trade fair booth. Twice as many qualified leads as last year.',
      author: 'Marketing Director',
      company: 'Automotive Supplier',
      rating: 5,
    },
  ],

  usps: [
    {
      id: 'eyecatcher',
      icon: 'Sparkles',
      title: 'Eye-Catcher',
      description: 'Visitors stop and look',
    },
    { id: 'compact', icon: 'Box', title: 'Compact', description: 'Only 2m² footprint' },
    { id: 'autark', icon: 'Zap', title: 'Self-Sufficient', description: 'No power, no water' },
    { id: 'branding', icon: 'Palette', title: 'Branding', description: 'Fully customizable' },
  ],

  cta: {
    primary: {
      label: 'Request Trade Fair Quote',
      href: '/anfrage',
    },
    secondary: {
      label: 'View References',
      href: '/galerie',
    },
  },
};

export default messeCateringContentDE;
