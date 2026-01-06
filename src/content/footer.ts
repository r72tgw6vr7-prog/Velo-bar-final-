import type { FooterContent } from './types';

export const footerContent: FooterContent = {
  brandName: 'Velo.Bar',
  tagline: 'Mobile Cocktailbar & Event Catering.',
  locationLines: ['München & Coburg, Bayern'],
  quickLinks: [
    { id: 'home', href: '/', label: 'Startseite' },
    { id: 'firmenfeiern', href: '/firmenfeiern', label: 'Firmenfeiern' },
    { id: 'weihnachtsfeiern', href: '/weihnachtsfeiern', label: 'Weihnachtsfeiern' },
    { id: 'messe', href: '/messe-catering', label: 'Messe-Catering' },
    { id: 'team-events', href: '/team-events-workshops', label: 'Team-Events & Workshops' },
    { id: 'about', href: '/about', label: 'Über uns' },
    { id: 'contact', href: '/anfrage', label: 'Anfrage' },
  ],
  legalLinks: [
    { id: 'privacy', href: '/datenschutz', label: 'Datenschutz' },
    { id: 'impressum', href: '/impressum', label: 'Impressum' },
  ],
  bottomLinks: [
    { id: 'home-bottom', href: '/', label: 'Startseite' },
    { id: 'gallery-bottom', href: '/galerie', label: 'Galerie' },
    { id: 'services-bottom', href: '/firmenfeiern', label: 'Leistungen' },
    { id: 'contact-bottom', href: '/anfrage', label: 'Anfrage' },
    { id: 'legal-bottom', href: '/legal', label: 'Legal' },
  ],
  socialLinks: [
    {
      id: 'instagram',
      href: 'https://instagram.com/yourhandle',
      label: '@yourhandle',
      icon: 'instagram',
    },
    {
      id: 'github',
      href: 'https://github.com/your-handle',
      label: 'GitHub',
      icon: 'github',
    },
  ],
};
