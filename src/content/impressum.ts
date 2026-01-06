import type { LegalPageContent } from './types';

export const impressumContent: LegalPageContent = {
  slug: 'impressum',
  seoTitle: 'Impressum',
  seoDescription: 'Generic legal notice (Impressum) placeholder. Replace with your own details.',
  hero: {
    eyebrow: 'Legal',
    title: 'Impressum',
    subtitle: 'Provide your full legal entity information here according to your jurisdiction.',
  },
  sections: [
    {
      id: 'contact',
      title: 'Kontakt',
      body: [
        'Your Business Name',
        'Your Address',
        'Your City, Country',
        'E-Mail: contact@yourdomain.com',
      ],
    },
    {
      id: 'company',
      title: 'Unternehmensangaben',
      body: [
        'Vollständiger Firmenname / Legal entity name.',
        'Handelsregisternummer und Registergericht (falls zutreffend).',
        'Umsatzsteuer-ID / VAT ID (falls zutreffend).',
      ],
    },
  ],
};
