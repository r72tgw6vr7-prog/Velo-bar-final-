import React from 'react';
import { env } from '../lib/env';

interface StructuredDataProps {
  type: 'organization' | 'local-business' | 'article' | 'service' | 'person';
  data?: Record<string, any>;
}

// --- Multi-location JSON-LD graph ---
const organizationId = `${env.VITE_SITE_URL}/#organization`;
const munichId = `${env.VITE_SITE_URL}/#munich`;
const coburgId = `${env.VITE_SITE_URL}/#coburg`;

const baseOrganization = {
  '@type': ['Organization', 'ProfessionalService'],
  '@id': organizationId,
  name: env.VITE_BUSINESS_NAME,
  alternateName: env.VITE_BUSINESS_NAME || 'Velo.Bar – Mobile Cocktailbar & Event Catering',
  description:
    'Velo.Bar – Mobile Cocktailbar & Event Catering für Firmenfeiern, Hochzeiten, Messen und private Events in München und Coburg.',
  url: env.VITE_SITE_URL,
  logo: `${env.VITE_SITE_URL}/velo.svg`,
  image: `${env.VITE_SITE_URL}/images/og-default.jpg`,
  email: env.VITE_BUSINESS_EMAIL,
  sameAs: [
    env.VITE_INSTAGRAM_URL,
    env.VITE_FACEBOOK_URL,
    `https://wa.me/${env.VITE_WHATSAPP?.replace(/[^+\d]/g, '')}`,
  ].filter(Boolean),
};

const munichLocalBusiness = {
  '@type': ['LocalBusiness', 'FoodEstablishment', 'Caterer'],
  '@id': munichId,
  name: 'Velo Bar München',
  parentOrganization: { '@id': organizationId },
  address: {
    '@type': 'PostalAddress',
    streetAddress: env.VITE_BUSINESS_STREET,
    addressLocality: env.VITE_BUSINESS_CITY,
    postalCode: env.VITE_BUSINESS_POSTAL,
    addressCountry: env.VITE_BUSINESS_COUNTRY,
  },
  telephone: env.VITE_BUSINESS_PHONE,
  areaServed: 'München',
  url: `${env.VITE_SITE_URL}/velobar/buchungmuc`,
  geo: {
    '@type': 'GeoCoordinates',
    latitude: env.VITE_GEO_LAT,
    longitude: env.VITE_GEO_LNG,
  },
  openingHours: env.VITE_OPENING_HOURS,
};

const coburgLocalBusiness = {
  '@type': ['LocalBusiness', 'FoodEstablishment', 'Caterer'],
  '@id': coburgId,
  name: 'Velo Bar Coburg',
  parentOrganization: { '@id': organizationId },
  address: {
    '@type': 'PostalAddress',
    streetAddress: env.VITE_COBURG_STREET,
    addressLocality: env.VITE_COBURG_CITY,
    postalCode: env.VITE_COBURG_POSTAL,
    addressCountry: env.VITE_COBURG_COUNTRY,
  },
  telephone: env.VITE_COBURG_PHONE,
  areaServed: 'Coburg',
  url: `${env.VITE_SITE_URL}/velobarco`,
  geo: {
    '@type': 'GeoCoordinates',
    latitude: env.VITE_COBURG_GEO_LAT,
    longitude: env.VITE_COBURG_GEO_LNG,
  },
  openingHours: env.VITE_COBURG_OPENING_HOURS,
};

const structuredDataTemplates = {
  organization: baseOrganization,
  'local-business': munichLocalBusiness,

  article: (data: any) => ({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: data.title,
    description: data.description,
    image: data.image,
    author: {
      '@type': 'Organization',
      name: env.VITE_BUSINESS_NAME || 'Velo.Bar – Mobile Cocktailbar & Event Catering',
    },
    publisher: {
      '@type': 'Organization',
      name: env.VITE_BUSINESS_NAME || 'Velo.Bar – Mobile Cocktailbar & Event Catering',
      logo: {
        '@type': 'ImageObject',
        url: `${env.VITE_SITE_URL}/velo.svg`,
      },
    },
    datePublished: data.datePublished,
    dateModified: data.dateModified || data.datePublished,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': data.url,
    },
  }),

  service: (data: any) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: data.name,
    description: data.description,
    provider: baseOrganization,
    areaServed: {
      '@type': 'City',
      name: env.VITE_BUSINESS_CITY,
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: data.name,
      itemListElement: data.offers || [],
    },
  }),

  person: (data: any) => ({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: data.name,
    jobTitle: data.jobTitle || 'Software Engineer',
    description: data.description,
    image: data.image,
    worksFor: {
      '@type': 'Organization',
      name: env.VITE_BUSINESS_NAME,
    },
    knowsAbout: data.specialties || ['Mobile Cocktailbar', 'Event Catering', 'Mixology'],
    url: data.portfolioUrl,
  }),
};

// Outputs a JSON-LD graph with Organization, München, and Coburg
export default function StructuredData({ type, data = {} }: StructuredDataProps) {
  let structuredData;
  if (type === 'organization' || type === 'local-business') {
    structuredData = {
      '@context': 'https://schema.org',
      '@graph': [baseOrganization, munichLocalBusiness, coburgLocalBusiness],
    };
  } else {
    const template = structuredDataTemplates[type];
    structuredData =
      typeof template === 'function' ? template(data) : { ...(template as object), ...data };
  }
  return (
    <script
      type='application/ld+json'
      suppressHydrationWarning
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 0),
      }}
    />
  );
}

// Convenience components for common use cases
export function OrganizationSchema() {
  return <StructuredData type='organization' />;
}

export function LocalBusinessSchema() {
  return <StructuredData type='local-business' />;
}

export function ArticleSchema(props: {
  title: string;
  description: string;
  image: string;
  url: string;
  datePublished: string;
  dateModified?: string;
}) {
  return <StructuredData type='article' data={props} />;
}

export function ServiceSchema(props: { name: string; description: string; offers?: any[] }) {
  return <StructuredData type='service' data={props} />;
}

export function PersonSchema(props: {
  name: string;
  jobTitle?: string;
  description: string;
  image?: string;
  specialties?: string[];
  portfolioUrl?: string;
}) {
  return <StructuredData type='person' data={props} />;
}
