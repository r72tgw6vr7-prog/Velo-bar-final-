import type { HomePageContent } from './types';

export const homeContent: HomePageContent = {
  slug: 'home',
  seoTitle: 'Velobar - Mobile Cocktailbar & Event Catering München Coburg',
  seoDescription:
    'Premium mobile Cocktailbar für Firmenfeiern, Hochzeiten und Events in München und Coburg. Professioneller Barkeeper-Service mit individuellen Cocktail-Menüs.',
  hero: {
    eyebrow: 'Event Catering',
    title: 'Velobar – deine mobile Cocktailbar',
    subtitle:
      'Professioneller Cocktail-Service für unvergessliche Events in München, Coburg und ganz Bayern.',
    primaryCtaLabel: 'Jetzt anfragen',
    secondaryCtaLabel: 'Unsere Services',
  },
  sections: [
    {
      id: 'highlights',
      title: 'Warum Velobar?',
      subtitle: 'Professioneller Event-Service mit Leidenschaft',
      body: [
        'Mobile Cocktailbar mit professionellen Barkeepern für jede Art von Veranstaltung.',
        'Individuelle Menüs, Premium-Zutaten und maßgeschneiderter Service für dein Event.',
      ],
    },
    {
      id: 'social-proof',
      title: 'Vertraue auf Qualität',
      subtitle: 'Erfolgreich durchgeführte Events sprechen für sich',
      body: [
        'Velobar steht für professionellen Service, exzellente Cocktails und zufriedene Kunden.',
      ],
    },
  ],
};
