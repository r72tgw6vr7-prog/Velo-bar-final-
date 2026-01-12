/**
 * SEO Schema.org Structured Data Helpers
 * =======================================
 * JSON-LD structured data generators for Velo.Bar
 * Following Google's structured data guidelines for rich results
 */

// Business constants
const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://www.velo-bar.com';

const BUSINESS_INFO = {
  name: 'Velo.Bar – Mobile Cocktailbar',
  legalName: 'Sebastian Reichstaller & Lars Eggers GbR, SelectONEdrink GbR',
  url: SITE_URL,
  logo: `${SITE_URL}/velo.svg`,
  image: `${SITE_URL}/images/hero/mobile-cocktailbar-muenchen.webp`,
  telephone: '+49 160 94623196',
  email: 'hallo@velo-bar.com',
  foundingDate: '2020',
  priceRange: '€€-€€€',
  // Munich address (primary) — kept consistent with Impressum
  address: {
    streetAddress: 'Matthias-Mayer-Straße 5',
    addressLocality: 'München',
    addressRegion: 'Bayern',
    postalCode: '81379',
    addressCountry: 'DE',
  },
  // Service areas
  areaServed: [
    {
      '@type': 'City',
      name: 'München',
      containedInPlace: { '@type': 'State', name: 'Bayern' },
    },
    {
      '@type': 'City',
      name: 'Coburg',
      containedInPlace: { '@type': 'State', name: 'Bayern' },
    },
    {
      '@type': 'State',
      name: 'Bayern',
      containedInPlace: { '@type': 'Country', name: 'Deutschland' },
    },
  ],
  // Social profiles
  sameAs: [
    'https://www.instagram.com/velo.bar',
    'https://www.facebook.com/velobar.muenchen',
    'https://www.linkedin.com/company/velobar',
  ],
  // Opening hours (by appointment)
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
  ],
} as const;

/**
 * LocalBusiness Schema for Homepage
 * Helps appear in local search and Google Maps
 */
export function getLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${BUSINESS_INFO.url}/#organization`,
    name: BUSINESS_INFO.name,
    legalName: BUSINESS_INFO.legalName,
    url: BUSINESS_INFO.url,
    logo: BUSINESS_INFO.logo,
    image: BUSINESS_INFO.image,
    telephone: BUSINESS_INFO.telephone,
    email: BUSINESS_INFO.email,
    foundingDate: BUSINESS_INFO.foundingDate,
    priceRange: BUSINESS_INFO.priceRange,
    address: {
      '@type': 'PostalAddress',
      ...BUSINESS_INFO.address,
    },
    areaServed: BUSINESS_INFO.areaServed,
    sameAs: BUSINESS_INFO.sameAs,
    openingHoursSpecification: BUSINESS_INFO.openingHoursSpecification,

    // Services offered
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Mobile Cocktailbar Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Cocktail-Catering für Firmenfeiern',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Mobile Bar für Weihnachtsfeiern',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Messe-Catering',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Team-Events & Cocktail-Workshops',
          },
        },
      ],
    },
  };
}

/**
 * WebSite Schema for Homepage
 * Enables sitelinks search box and site name in search results
 */
export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BUSINESS_INFO.url}/#website`,
    url: BUSINESS_INFO.url,
    name: 'Velo.Bar',
    description:
      'Mobile Cocktailbar für Firmenfeiern, Hochzeiten, Messen und private Events in München und Coburg',
    publisher: {
      '@id': `${BUSINESS_INFO.url}/#organization`,
    },
    inLanguage: 'de-DE',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BUSINESS_INFO.url}/suche?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Service Schema for B2B service pages
 * Helps pages appear as service offerings in search
 */
export interface ServiceSchemaParams {
  name: string;
  description: string;
  url: string;
  image?: string;
  priceRange?: string;
  areaServed?: string[];
  serviceType?: string;
}

export function getServiceSchema({
  name,
  description,
  url,
  image,
  priceRange = '€€-€€€',
  areaServed = ['München', 'Coburg', 'Bayern'],
  serviceType = 'EventCatering',
}: ServiceSchemaParams) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}/#service`,
    name,
    description,
    url,
    image: image || BUSINESS_INFO.image,
    provider: {
      '@id': `${BUSINESS_INFO.url}/#organization`,
    },
    serviceType,
    areaServed: areaServed.map((area) => ({
      '@type': 'City',
      name: area,
    })),
    priceRange,
    // Offers
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceSpecification: {
        '@type': 'PriceSpecification',
        priceCurrency: 'EUR',
      },
    },
  };
}

/**
 * BreadcrumbList Schema
 * Shows breadcrumb navigation in search results
 */
export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function getBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * FAQ Schema for pages with FAQ sections
 * Enables FAQ rich results in search
 */
export interface FAQItem {
  question: string;
  answer: string;
}

export function getFAQSchema(faqs: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Event Schema for specific events/workshops
 */
export interface EventSchemaParams {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  location: string;
  url: string;
  image?: string;
  offers?: {
    price: string;
    currency?: string;
    availability?: string;
  };
}

export function getEventSchema({
  name,
  description,
  startDate,
  endDate,
  location,
  url,
  image,
  offers,
}: EventSchemaParams) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name,
    description,
    startDate,
    endDate: endDate || startDate,
    location: {
      '@type': 'Place',
      name: location,
      address: {
        '@type': 'PostalAddress',
        addressLocality: location,
        addressCountry: 'DE',
      },
    },
    url,
    image: image || BUSINESS_INFO.image,
    organizer: {
      '@id': `${BUSINESS_INFO.url}/#organization`,
    },
    ...(offers && {
      offers: {
        '@type': 'Offer',
        price: offers.price,
        priceCurrency: offers.currency || 'EUR',
        availability: offers.availability || 'https://schema.org/InStock',
        url,
      },
    }),
  };
}

/**
 * Combine multiple schemas into a graph
 * Use this for pages that need multiple schema types
 */
export function combineSchemas(...schemas: Record<string, unknown>[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': schemas.map((schema) => {
      // Remove @context from individual schemas when combining
      const { '@context': _, ...rest } = schema;
      return rest;
    }),
  };
}

/**
 * Comprehensive Messe-Catering Pillar Page Schema
 * Includes Service, FAQPage, AggregateRating, Offers, and Breadcrumbs
 */
export function getMesseCateringPillarSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      // Service Schema
      {
        '@type': 'Service',
        '@id': `${SITE_URL}/messe-catering/#service`,
        name: 'Mobile Cocktailbar für Messestände',
        alternateName: 'Trade Fair Cocktail Catering',
        description:
          'Premium mobile Cocktailbar für Ihren Messestand in München. Der Networking-Booster für mehr qualifizierte Leads. Durchschnittlich 47% längere Standbesuche. Autark ohne Strom- oder Wasseranschluss.',
        url: `${SITE_URL}/messe-catering`,
        image: `${SITE_URL}/images/services/messe-cocktailbar.webp`,
        serviceType: 'Trade Fair Catering',
        provider: {
          '@type': 'LocalBusiness',
          '@id': `${SITE_URL}/#organization`,
          name: 'Velo.Bar',
          url: SITE_URL,
          telephone: '+49 160 94623196',
          email: 'hallo@velo-bar.com',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Leopoldstraße 1',
            addressLocality: 'München',
            addressRegion: 'Bayern',
            postalCode: '80802',
            addressCountry: 'DE',
          },
        },
        areaServed: [
          {
            '@type': 'City',
            name: 'München',
            sameAs: 'https://en.wikipedia.org/wiki/Munich',
          },
          {
            '@type': 'City',
            name: 'Nürnberg',
            sameAs: 'https://en.wikipedia.org/wiki/Nuremberg',
          },
          {
            '@type': 'State',
            name: 'Bayern',
          },
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Messe-Catering Pakete',
          itemListElement: [
            {
              '@type': 'Offer',
              name: 'Messe Basic',
              description:
                'Professioneller Barkeeper für 8h, 100 Premium-Cocktails, kompakte Bar (2m²)',
              price: '890',
              priceCurrency: 'EUR',
              availability: 'https://schema.org/InStock',
            },
            {
              '@type': 'Offer',
              name: 'Messe Pro',
              description:
                '2 Barkeeper, 200 Cocktails, 3 Signature-Drinks, Lead-Capture Integration',
              price: '1490',
              priceCurrency: 'EUR',
              availability: 'https://schema.org/InStock',
            },
            {
              '@type': 'Offer',
              name: 'Messe Enterprise',
              description:
                'Mehrere Bars, unbegrenzte Cocktails, komplettes Brand Activation Konzept',
              priceRange: 'Ab €2.500',
              priceCurrency: 'EUR',
              availability: 'https://schema.org/InStock',
            },
          ],
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: '87',
          bestRating: '5',
          worstRating: '1',
        },
      },
      // FAQ Schema
      {
        '@type': 'FAQPage',
        '@id': `${SITE_URL}/messe-catering/#faq`,
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Wie funktioniert die Logistik auf der Messe?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Wir koordinieren direkt mit Ihrem Messebauer und dem Hallenmanagement. Aufbau erfolgt vor Messebeginn, Abbau nach Messeschluss. Unsere kompakte Bar benötigt nur 2m² und keinen Strom- oder Wasseranschluss.',
            },
          },
          {
            '@type': 'Question',
            name: 'Können Sie unsere Corporate Identity integrieren?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Absolut! Wir erstellen Signature-Drinks in Ihren Unternehmensfarben, branden die Bar mit Ihrem Logo und gestalten passende Menükarten. Perfekt für Brand Activation auf Messen.',
            },
          },
          {
            '@type': 'Question',
            name: 'Wie hilft die Bar bei der Lead-Generierung?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Besucher bleiben durchschnittlich 47% länger an Ihrem Stand. Wir können QR-Code Aktionen integrieren: "Cocktail gegen Visitenkarte" oder Lead-Forms direkt an der Bar.',
            },
          },
          {
            '@type': 'Question',
            name: 'Was kostet Messe-Catering pro Tag?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Unsere Messe-Pakete starten bei €890 pro Tag (Messe Basic mit 100 Drinks), €1.490 für Messe Pro (200 Drinks, 2 Barkeeper) und ab €2.500 für Enterprise mit unbegrenzten Cocktails. Bei 3+ Messetagen erhalten Sie 15% Rabatt.',
            },
          },
          {
            '@type': 'Question',
            name: 'Bieten Sie Mehrtages-Pakete an?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Ja! Bei Buchung von 3+ Messetagen erhalten Sie 15% Rabatt. Wir lagern Equipment über Nacht sicher ein und sind pünktlich zum Messestart wieder einsatzbereit.',
            },
          },
        ],
      },
      // Breadcrumb Schema
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: SITE_URL,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Messe-Catering',
            item: `${SITE_URL}/messe-catering`,
          },

        ],
      },
    ],
  };
}

export default {
  getLocalBusinessSchema,
  getWebSiteSchema,
  getServiceSchema,
  getBreadcrumbSchema,
  getFAQSchema,
  getEventSchema,
  combineSchemas,
  getMesseCateringPillarSchema,
};
