import type { ContactPageContent } from './types';

export const contactContent: ContactPageContent = {
  slug: 'contact',
  seoTitle: 'Event-Anfrage | Velo.Bar – Mobile Cocktailbar & Event Catering',
  seoDescription:
    'Sende uns deine Event-Anfrage für mobile Cocktailbar-Services in München & Coburg. Wir melden uns innerhalb von 24 Stunden mit einem individuellen Angebot.',
  hero: {
    eyebrow: 'Event-Anfrage',
    title: 'Mobile Cocktailbar für dein Event',
    subtitle:
      'Firmenfeiern, Hochzeiten, Messen, Gin-Tastings & private Feiern in München & Coburg.',
    primaryCtaLabel: 'Jetzt Anfrage senden',
  },
  sections: [
    {
      id: 'details',
      title: 'So erreichst du uns',
      body: [
        'Am schnellsten erreichst du uns über das Anfrageformular. Alternativ kannst du uns auch per E-Mail oder telefonisch kontaktieren.',
      ],
    },
  ],
  studio: {
    sectionEyebrow: 'Service-Region',
    sectionTitle: 'Velo.Bar – Mobile Cocktailbar',
    sectionDescription:
      'Wir kommen mit der mobilen Bar zu deinem Event – in München, Coburg und Umgebung.',
    name: 'Velo.Bar – Mobile Cocktailbar & Event Catering',
    address: {
      street: 'München & Coburg',
      city: 'Bayern, Deutschland',
    },
    contact: {
      email: 'hallo@velo-bar.com',
      phone: '+49 160 94623196',
    },
    hours: {
      weekdays: 'Event-Service nach Vereinbarung',
      saturday: 'Event-Service nach Vereinbarung',
      sunday: 'Event-Service nach Vereinbarung',
    },
    social: {
      instagramHandle: '@velobar',
      instagramUrl: 'https://instagram.com/velobar',
      facebook: 'Velobar Event Catering',
      googleRating: 4.9,
    },
    labels: {
      address: 'Service Region',
      phone: 'Telefon',
      email: 'E-Mail',
      hours: 'Bürozeiten',
      instagram: 'Instagram',
      facebook: 'Facebook',
      reviews: 'Google Bewertungen',
      reviewsSuffix: '★ Kundenbewertungen',
    },
  },
  form: {
    eyebrow: 'Event-Anfrage',
    title: 'Sende uns deine Anfrage',
    description:
      'Beschreibe uns deine Veranstaltung – wir melden uns innerhalb von 24 Stunden mit einem individuellen Angebot.',
    successTitle: 'Anfrage gesendet!',
    successBody:
      'Vielen Dank für deine Anfrage. Wir melden uns schnellstmöglich bei dir mit einem unverbindlichen Angebot.',
    submitLabel: 'Anfrage absenden',
    submittingLabel: 'Wird gesendet...',
    messageMinLengthHint: 'Mindestens 10 Zeichen',
    validation: {
      nameRequired: 'Name ist erforderlich',
      nameMinLength: 'Name muss mindestens 2 Zeichen lang sein',
      emailRequired: 'E-Mail ist erforderlich',
      emailInvalid: 'Ungültige E-Mail-Adresse',
      subjectRequired: 'Betreff ist erforderlich',
      subjectMinLength: 'Betreff muss mindestens 3 Zeichen lang sein',
      messageRequired: 'Nachricht ist erforderlich',
      messageMinLength: 'Nachricht muss mindestens 10 Zeichen lang sein',
      genericError: 'Ein Fehler ist aufgetreten. Bitte versuche es erneut.',
    },
  },
};
