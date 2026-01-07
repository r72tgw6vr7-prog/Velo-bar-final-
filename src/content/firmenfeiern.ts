/**
 * FirmenFeiern (Corporate Events) Page Content
 * =============================================
 * Complete content for the corporate events service page
 * Extracted from FirmenFeiernPage.tsfor content layer migration
 */

import type { ServicePageContent } from './types.ts';

// Extended content type for this specific page
export interface FirmenfeiernPageContent extends ServicePageContent {
  stats: readonly { value: string; label: string }[];
  trustIndicators: readonly { icon: string; text: string }[];
  leadMagnet: {
    title: string;
    description: string;
    buttonLabel: string;
    modalTitle: string;
    modalDescription: string;
    emailPlaceholder: string;
    submitLabel: string;
    cancelLabel: string;
  };
  bicycleAdvantages: readonly {
    id: string;
    icon: string;
    title: string;
    description: string;
  }[];
  story: {
    eyebrow: string;
    title: string;
    paragraphs: readonly string[];
    stats: readonly { value: string; label: string }[];
    locations: readonly { title: string; description: string }[];
  };
  relatedServices: readonly {
    href: string;
    title: string;
    description: string;
  }[];
  finalCta: {
    title: string;
    description: string;
  };
}

export const firmenfeiernContent: FirmenfeiernPageContent = {
  slug: 'firmenfeiern',
  // SEO: Title ~55 chars with location + primary keyword + brand
  seoTitle: 'Cocktailbar für Firmenfeiern München',
  // SEO: Description ~150 chars with intent, USPs, CTA
  seoDescription:
    'Premium mobile Cocktailbar für deine Firmenfeier in München. All-inclusive ab €35/Gast. 500+ Events. Autark ohne Strom. Jetzt Angebot anfordern!',

  hero: {
    eyebrow: 'Premium B2B Cocktail-Service',
    title: 'Cocktail-Catering für Firmenfeiern München – Zuverlässig & Premium',
    subtitle: 'Kein Strom? Kein Wasser? Kein Problem – All-in-One System',
    primaryCtaLabel: 'Kostenloses Angebot in 2h',
    secondaryCtaLabel: 'Direkt anrufen',
  },

  sections: [
    {
      id: 'intro',
      title: '',
      body: [
        'Über 500 erfolgreiche Firmenevents. Unsere mobile Fahrrad-Bar bringt Premium-Cocktails direkt zu deinem Standort – nachhaltig, platzsparend und ohne jegliche Infrastruktur.',
      ],
    },
  ],

  stats: [
    { value: '+2h', label: 'Mehr Networking-Zeit' },
    { value: '500+', label: 'Erfolgreiche Events' },
    { value: '100%', label: 'Autark (kein Strom)' },
  ],

  trustIndicators: [
    { icon: 'Star', text: '4.9/5 Google (87 Bewertungen)' },
    { icon: 'Building2', text: '500+ Firmenevents' },
    { icon: 'Users', text: 'BMW, Siemens, Startups' },
    { icon: 'Leaf', text: 'CO₂-neutral' },
  ],

  leadMagnet: {
    title: 'Firmenfeier Checkliste PDF',
    description: 'Kostenloser Download – 12 Punkte für dein perfektes Event',
    buttonLabel: 'Jetzt herunterladen',
    modalTitle: 'Firmenfeier Checkliste',
    modalDescription:
      'Gib deine E-Mail-Adresse ein und erhalte unsere kostenlose 12-Punkte-Checkliste für die perfekte Firmenfeier.',
    emailPlaceholder: 'deine.email@unternehmen.de',
    submitLabel: 'Checkliste anfordern',
    cancelLabel: 'Nein danke, später',
  },

  bicycleAdvantages: [
    {
      id: 'elevator',
      icon: 'Bike',
      title: 'Passt in jeden Aufzug',
      description:
        'Unsere kompakte Fahrrad-Bar erreicht auch schwer zugängliche Locations: Dachterrassen, Innenhöfe, historische Gebäude.',
    },
    {
      id: 'sustainable',
      icon: 'Leaf',
      title: 'Nachhaltig & CO₂-neutral',
      description:
        'Keine Emissionen beim Aufbau. Ideal für Unternehmen mit Nachhaltigkeitszielen und ESG-Reporting.',
    },
    {
      id: 'autark',
      icon: 'Zap',
      title: 'Kein Strom, kein Wasser nötig',
      description:
        'Komplett autark mit eigenem Generator und Wassertank. Funktioniert überall – auch outdoor.',
    },
    {
      id: 'certified',
      icon: 'Shield',
      title: 'Versichert & zertifiziert',
      description:
        'Vollständig versichert, HACCP-konform, IHK-geprüfte Barkeeper. Für deine Compliance-Anforderungen.',
    },
  ],

  story: {
    eyebrow: 'Unsere Geschichte',
    title: 'Vom Crowdfunding-Erfolg zu 500+ Events',
    paragraphs: [
      'Was 2019 als Crowdfunding-Projekt begann, ist heute eine der gefragtesten mobilen Cocktailbars in Bayern. Über 200 Unterstützer glaubten an unsere Vision: Premium-Cocktails, nachhaltig und mobil – überall.',
      'Heute bedienen wir Unternehmen in München und Coburg mit demselben Anspruch: Höchste Qualität, persönlicher Service und eine Bar, die überall hinkommt – auch in den 12. Stock ohne Lastenaufzug.',
      'Unsere Spezialisierung: Premium-Gin mit über 40 Sorten und handgemachte Cocktails nach klassischen Rezepturen. Perfekt für anspruchsvolle Geschäftskunden und ihre Gäste.',
    ],
    stats: [
      { value: '2', label: 'Standorte' },
      { value: '500+', label: 'Events' },
      { value: '40+', label: 'Gin-Sorten' },
    ],
    locations: [
      {
        title: 'München:',
        description: 'Firmenfeiern, Messen, Startup-Events im Großraum München',
      },
      { title: 'Coburg:', description: 'Unternehmensevents in Oberfranken, Thüringen und Sachsen' },
      { title: 'Flexibel:', description: 'Auch deutschlandweit nach Absprache verfügbar' },
    ],
  },

  pricingTiers: [
    {
      id: 'starter',
      name: 'Starter',
      pricePerGuest: '€29',
      basePrice: '€1.450',
      duration: '3 Stunden',
      guests: '50 Gäste',
      benefits: [
        'Erhöht Networking-Zeit um 1,5 Stunden',
        'Stressfreie Getränkeversorgung für dein Team',
        'Professioneller Eindruck bei Gästen',
        'Keine Logistik-Sorgen (All-in-One)',
        'MwSt. transparent ausgewiesen',
      ],
      cta: 'Angebot anfordern',
    },
    {
      id: 'premium',
      name: 'Premium All-Inclusive',
      pricePerGuest: '€35',
      basePrice: '€1.750',
      duration: '4 Stunden',
      guests: '50 Gäste',
      highlighted: true,
      benefits: [
        'Erhöht Networking-Zeit um 2+ Stunden',
        'Stärkt deine Arbeitgebermarke',
        'Unbegrenzte Premium-Cocktails',
        'Corporate Branding inklusive',
        'Passt in jeden Aufzug (Fahrrad-Bar)',
        'Nachhaltig & CO₂-neutral',
        'MwSt. inklusive auf Wunsch',
      ],
      cta: 'Beliebteste Wahl',
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      pricePerGuest: '€45',
      basePrice: 'Ab €4.500',
      duration: '6+ Stunden',
      guests: '100-500 Gäste',
      benefits: [
        'Maximale Mitarbeiterbindung',
        'VIP-Erlebnis für deine Top-Kunden',
        'Signature-Drinks mit deinem Branding',
        'Persönlicher Event-Koordinator',
        'ROI-Report nach dem Event',
        'Flexible Stornierung bis 7 Tage vorher',
        'Dedizierter Ansprechpartner',
      ],
      cta: 'Individuelles Angebot',
    },
  ],

  relatedServices: [
    {
      href: '/leistungen#weihnachtsfeiern',
      title: 'Weihnachtsfeiern',
      description: 'Festliche Cocktails für deine Firmen-Weihnachtsfeier',
    },
    {
      href: '/leistungen#messe-catering',
      title: 'Messe-Catering',
      description: 'Cocktailbar für deinen Messestand',
    },
    {
      href: '/leistungen#team-events-workshops',
      title: 'Team-Events',
      description: 'Cocktail-Workshops für Teambuilding',
    },
    { href: '/preise', title: 'Alle Preise', description: 'Übersicht aller Pakete und Optionen' },
  ],

  faqs: [
    {
      id: 'setup',
      question: 'Was benötigst du vor Ort für den Aufbau?',
      answer:
        'Nichts. Unsere mobile Fahrrad-Bar ist ein komplett autarkes All-in-One System. Kein Strom, kein Wasser, keine zusätzliche Infrastruktur erforderlich. Wir bringen Generatoren, Wassertanks, Kühlung und sämtliches Equipment mit. Du stellst nur die Fläche (ca. 4m²) bereit.',
    },
    {
      id: 'minimum',
      question: 'Gibt es eine Mindestbuchung?',
      answer:
        'Ja, unsere Mindestbuchung beträgt €1.450 (Starter-Paket für 50 Gäste, 3 Stunden). Für kleinere Events unter 50 Gästen bieten wir auf Anfrage individuelle Lösungen an. Sprich uns gerne an.',
    },
    {
      id: 'cancellation',
      question: 'Wie sind die Stornierungsrichtlinien?',
      answer:
        'Wir verstehen, dass sich Pläne ändern können. Bis 14 Tage vor dem Event ist eine kostenlose Stornierung möglich. Bei Stornierung 7-14 Tage vorher berechnen wir 50% der Summe. Unter 7 Tagen wird die volle Summe fällig. Bei Enterprise-Paketen sind individuelle Vereinbarungen möglich.',
    },
    {
      id: 'branding',
      question: 'Kannst du unser Corporate Design integrieren?',
      answer:
        'Absolut. Im Premium- und Enterprise-Paket ist vollständiges Corporate Branding inklusive: Logo auf der Bar, gebrandete Servietten und Menükarten in deinem CI, Signature-Drinks mit deinem Produktnamen. Wir stimmen alles vorab mit deiner Marketing-Abteilung ab.',
    },
    {
      id: 'capacity',
      question: 'Wie viele Gäste kannst du maximal bedienen?',
      answer:
        'Wir sind skalierbar von 50 bis 500+ Gästen. Pro 75-100 Gäste setzen wir einen zusätzlichen Barkeeper ein. Bei Großevents über 200 Gästen empfehlen wir mehrere Bar-Stationen für optimalen Durchlauf und kürzere Wartezeiten.',
    },
    {
      id: 'alcohol-free',
      question: 'Bietest du auch alkoholfreie Optionen an?',
      answer:
        'Selbstverständlich. Jedes Paket enthält mindestens 3 alkoholfreie Premium-Mocktails. Auf Wunsch erstellen wir auch ein komplett alkoholfreies Menü – perfekt für diverse Teams und Fahrer-Regelungen.',
    },
    {
      id: 'difference',
      question: 'Was unterscheidet Velobar von anderen Anbietern?',
      answer:
        'Drei Dinge: 1) Unsere nachhaltige Fahrrad-Bar ist einzigartig in München – platzsparend, CO₂-neutral, ein echter Hingucker. 2) Wir haben über 500 Events für Unternehmen wie BMW, Siemens und lokale Startups durchgeführt. 3) Unser Gin-Fokus mit über 40 Premium-Sorten macht uns zu Spezialisten für anspruchsvolle Gaumen.',
    },
    {
      id: 'booking-time',
      question: 'Wie weit im Voraus sollten wir buchen?',
      answer:
        'Für beliebte Termine (Freitagabend, Dezember) empfehlen wir 4-8 Wochen Vorlauf. Kurzfristige Anfragen (1-2 Wochen) versuchen wir ebenfalls zu ermöglichen – frage einfach nach Verfügbarkeit.',
    },
  ],

  testimonials: [
    {
      id: 'siemens',
      quote:
        'Die Velo.Bar war das Highlight unserer Teamfeier. Professionell, kreativ und ein echter Gesprächsstarter!',
      author: 'Michael K.',
      role: 'HR Manager',
      company: 'Siemens AG',
      rating: 5,
    },
    {
      id: 'bmw',
      quote:
        'Perfekt für unsere Produktpräsentation. Die Gäste waren begeistert von den Signature-Cocktails.',
      author: 'Sandra M.',
      role: 'Event Manager',
      company: 'BMW Group',
      rating: 5,
    },
    {
      id: 'allianz',
      quote: 'Unkompliziert, professionell und absolut empfehlenswert. Wir buchen wieder!',
      author: 'Thomas R.',
      role: 'Office Manager',
      company: 'Allianz SE',
      rating: 5,
    },
  ],

  usps: [
    {
      id: 'mobile',
      icon: 'Bike',
      title: 'Komplett mobil',
      description: 'Passt in jeden Aufzug, funktioniert überall',
    },
    {
      id: 'eco',
      icon: 'Leaf',
      title: 'Nachhaltig',
      description: 'CO₂-neutrales Konzept mit Fahrrad-Bar',
    },
    {
      id: 'autark',
      icon: 'Zap',
      title: '100% autark',
      description: 'Kein Strom- oder Wasseranschluss nötig',
    },
    {
      id: 'pro',
      icon: 'Shield',
      title: 'Professionell',
      description: '500+ Events erfolgreich durchgeführt',
    },
  ],

  cta: {
    primary: {
      label: 'Jetzt Angebot anfordern',
      href: '/anfrage',
    },
    secondary: {
      label: 'business@velo.bar',
      href: 'mailto:business@velo.bar',
    },
  },

  finalCta: {
    title: 'Bereit für eine unvergessliche Firmenfeier?',
    description:
      'Kontaktiere uns für ein unverbindliches Angebot – individuell auf deine Anforderungen zugeschnitten.',
  },
};

// English content
export const firmenfeiernContentEN: FirmenfeiernPageContent = {
  slug: 'corporate-events',
  seoTitle: 'Cocktail Catering Corporate Events Munich | Mobile Bar',
  seoDescription:
    'Premium cocktail catering for corporate events in Munich. All-inclusive from €35/guest. 500+ events. No electricity needed. Request quote now!',

  hero: {
    eyebrow: 'Premium B2B Cocktail Service',
    title: 'Cocktail Catering for Corporate Events Munich – Reliable & Premium',
    subtitle: 'No electricity? No water? No problem – All-in-One System',
    primaryCtaLabel: 'Free Quote in 2h',
    secondaryCtaLabel: 'Call Directly',
  },

  sections: [
    {
      id: 'intro',
      title: '',
      body: [
        'Over 500 successful corporate events. Our mobile bicycle bar brings premium cocktails directly to your location – sustainable, space-saving and without any infrastructure.',
      ],
    },
  ],

  stats: [
    { value: '+2h', label: 'More Networking Time' },
    { value: '500+', label: 'Successful Events' },
    { value: '100%', label: 'Self-sufficient' },
  ],

  trustIndicators: [
    { icon: 'Star', text: '4.9/5 Google (87 Reviews)' },
    { icon: 'Building2', text: '500+ Corporate Events' },
    { icon: 'Users', text: 'BMW, Siemens, Startups' },
    { icon: 'Leaf', text: 'CO₂ Neutral' },
  ],

  leadMagnet: {
    title: 'Corporate Event Checklist PDF',
    description: 'Free download – 12 points for your perfect event',
    buttonLabel: 'Download Now',
    modalTitle: 'Corporate Event Checklist',
    modalDescription:
      'Enter your email address and receive our free 12-point checklist for the perfect corporate event.',
    emailPlaceholder: 'your.email@company.com',
    submitLabel: 'Request Checklist',
    cancelLabel: 'No thanks, later',
  },

  bicycleAdvantages: [
    {
      id: 'elevator',
      icon: 'Bike',
      title: 'Fits in Any Elevator',
      description:
        'Our compact bicycle bar reaches even hard-to-access locations: rooftops, courtyards, historic buildings.',
    },
    {
      id: 'sustainable',
      icon: 'Leaf',
      title: 'Sustainable & CO₂ Neutral',
      description:
        'No emissions during setup. Ideal for companies with sustainability goals and ESG reporting.',
    },
    {
      id: 'autark',
      icon: 'Zap',
      title: 'No Electricity, No Water Needed',
      description:
        'Completely self-sufficient with own generator and water tank. Works everywhere – even outdoors.',
    },
    {
      id: 'certified',
      icon: 'Shield',
      title: 'Insured & Certified',
      description:
        'Fully insured, HACCP compliant, certified bartenders. For your compliance requirements.',
    },
  ],

  story: {
    eyebrow: 'Our Story',
    title: 'From Crowdfunding Success to 500+ Events',
    paragraphs: [
      'What started as a crowdfunding project in 2019 is now one of the most sought-after mobile cocktail bars in Bavaria. Over 200 supporters believed in our vision: Premium cocktails, sustainable and mobile – everywhere.',
      'Today we serve companies in Munich and Coburg with the same commitment: Highest quality, personal service and a bar that goes anywhere – even to the 12th floor without a freight elevator.',
      'Our specialization: Premium gin with over 40 varieties and handcrafted cocktails according to classic recipes. Perfect for discerning business clients and their guests.',
    ],
    stats: [
      { value: '2', label: 'Locations' },
      { value: '500+', label: 'Events' },
      { value: '40+', label: 'Gin Varieties' },
    ],
    locations: [
      {
        title: 'Munich:',
        description: 'Corporate events, trade fairs, startup events in greater Munich',
      },
      {
        title: 'Coburg:',
        description: 'Corporate events in Upper Franconia, Thuringia and Saxony',
      },
      { title: 'Flexible:', description: 'Available Germany-wide by arrangement' },
    ],
  },

  pricingTiers: [
    {
      id: 'starter',
      name: 'Starter',
      pricePerGuest: '€29',
      basePrice: '€1,450',
      duration: '3 hours',
      guests: '50 guests',
      benefits: [
        'Increases networking time by 1.5 hours',
        'Stress-free beverage service for your team',
        'Professional impression on guests',
        'No logistics worries (all-in-one)',
        'VAT transparently stated',
      ],
      cta: 'Request Quote',
    },
    {
      id: 'premium',
      name: 'Premium All-Inclusive',
      pricePerGuest: '€35',
      basePrice: '€1,750',
      duration: '4 hours',
      guests: '50 guests',
      highlighted: true,
      benefits: [
        'Increases networking time by 2+ hours',
        'Strengthens your employer brand',
        'Unlimited premium cocktails',
        'Corporate branding included',
        'Fits in any elevator (bicycle bar)',
        'Sustainable & CO₂ neutral',
        'VAT included on request',
      ],
      cta: 'Most Popular',
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      pricePerGuest: '€45',
      basePrice: 'From €4,500',
      duration: '6+ hours',
      guests: '100-500 guests',
      benefits: [
        'Maximum employee retention',
        'VIP experience for your top clients',
        'Signature drinks with your branding',
        'Personal event coordinator',
        'ROI report after the event',
        'Flexible cancellation up to 7 days before',
        'Dedicated contact person',
      ],
      cta: 'Custom Quote',
    },
  ],

  relatedServices: [
    {
      href: '/leistungen#weihnachtsfeiern',
      title: 'Christmas Parties',
      description: 'Festive cocktails for your corporate Christmas party',
    },
    {
      href: '/leistungen#messe-catering',
      title: 'Trade Fair Catering',
      description: 'Cocktail bar for your trade fair booth',
    },
    {
      href: '/leistungen#team-events-workshops',
      title: 'Team Events',
      description: 'Cocktail workshops for team building',
    },
    { href: '/preise', title: 'All Prices', description: 'Overview of all packages and options' },
  ],

  faqs: [
    {
      id: 'setup',
      question: 'What do you need on-site for setup?',
      answer:
        'Nothing. Our mobile bicycle bar is a completely self-sufficient all-in-one system. No electricity, no water, no additional infrastructure required. We bring generators, water tanks, cooling and all equipment. You just provide the space (approx. 4m²).',
    },
    {
      id: 'minimum',
      question: 'Is there a minimum booking?',
      answer:
        'Yes, our minimum booking is €1,450 (Starter package for 50 guests, 3 hours). For smaller events under 50 guests, we offer individual solutions on request.',
    },
    {
      id: 'cancellation',
      question: 'What are the cancellation policies?',
      answer:
        'We understand that plans can change. Free cancellation up to 14 days before the event. For cancellation 7-14 days before, we charge 50%. Under 7 days, the full amount is due. Individual arrangements possible for Enterprise packages.',
    },
    {
      id: 'branding',
      question: 'Can you integrate our corporate design?',
      answer:
        'Absolutely. Premium and Enterprise packages include full corporate branding: logo on the bar, branded napkins and menu cards in your CI, signature drinks with your product name. We coordinate everything with your marketing department.',
    },
    {
      id: 'capacity',
      question: 'How many guests can you serve maximum?',
      answer:
        'We scale from 50 to 500+ guests. We deploy an additional bartender per 75-100 guests. For large events over 200 guests, we recommend multiple bar stations.',
    },
    {
      id: 'alcohol-free',
      question: 'Do you also offer alcohol-free options?',
      answer:
        'Yes, absolutely! All our packages include a selection of premium non-alcoholic cocktails, mocktails, fresh juices, and soft drinks. We can also create a completely alcohol-free menu on request.',
    },
    {
      id: 'difference',
      question: 'What makes Velo.Bar different from other catering services?',
      answer:
        "Our unique bicycle bar concept combines sustainability, mobility, and premium quality. We're completely self-sufficient, fit in any elevator, and create a memorable experience that guests will talk about long after the event.",
    },
    {
      id: 'booking-time',
      question: 'How far in advance should we book?',
      answer:
        'For optimal availability, we recommend booking 4-6 weeks in advance, especially for popular dates like December or summer months. However, we can often accommodate last-minute requests within 1-2 weeks.',
    },
  ],

  testimonials: [
    {
      id: 'siemens',
      quote:
        'The Velo.Bar was the highlight of our team party. Professional, creative and a real conversation starter!',
      author: 'Michael K.',
      role: 'HR Manager',
      company: 'Siemens AG',
      rating: 5,
    },
    {
      id: 'bmw',
      quote:
        'Perfect for our product presentation. The guests were thrilled with the signature cocktails.',
      author: 'Sandra M.',
      role: 'Event Manager',
      company: 'BMW Group',
      rating: 5,
    },
    {
      id: 'allianz',
      quote: "Uncomplicated, professional and highly recommended. We'll book again!",
      author: 'Thomas R.',
      role: 'Office Manager',
      company: 'Allianz SE',
      rating: 5,
    },
  ],

  usps: [
    {
      id: 'mobile',
      icon: 'Bike',
      title: 'Fully Mobile',
      description: 'Fits in any elevator, works everywhere',
    },
    {
      id: 'eco',
      icon: 'Leaf',
      title: 'Sustainable',
      description: 'CO₂ neutral concept with bicycle bar',
    },
    {
      id: 'autark',
      icon: 'Zap',
      title: '100% Self-Sufficient',
      description: 'No electricity or water connection needed',
    },
    {
      id: 'pro',
      icon: 'Shield',
      title: 'Professional',
      description: '500+ events successfully completed',
    },
  ],

  cta: {
    primary: {
      label: 'Request Quote Now',
      href: '/anfrage',
    },
    secondary: {
      label: 'business@velo.bar',
      href: 'mailto:business@velo.bar',
    },
  },

  finalCta: {
    title: 'Ready for an Unforgettable Corporate Event?',
    description: 'Contact us for a non-binding quote – tailored to your requirements.',
  },
};

export default firmenfeiernContent;
