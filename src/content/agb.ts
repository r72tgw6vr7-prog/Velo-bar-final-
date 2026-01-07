import type { LegalPageContent } from './types.ts';

export const agbContent: LegalPageContent = {
  slug: 'agb',
  seoTitle: 'Terms and Conditions (AGB)',
  seoDescription: 'Generic placeholder terms and conditions. Replace with your own legal text.',
  hero: {
    eyebrow: 'Legal',
    title: 'Allgemeine Geschäftsbedingungen',
    subtitle:
      'Ersetze diesen Platzhalterinhalt mit deinen eigenen AGB in Absprache mit einem Rechtsanwalt.',
  },
  sections: [
    {
      id: 'scope',
      title: '§ 1 Geltungsbereich',
      body: [
        'Diese Allgemeinen Geschäftsbedingungen (AGB) gelten als neutrales Platzhalter-Beispiel. Ersetze diesen Text durch deine eigenen rechtlich geprüften Bedingungen.',
      ],
    },
    {
      id: 'services-and-payments',
      title: '§ 2 Leistungen & Zahlungen',
      body: [
        'Beschreibe hier Art und Umfang deiner Leistungen, Zahlungsbedingungen, Fälligkeiten und gegebenenfalls Stornoregelungen.',
      ],
    },
    {
      id: 'liability',
      title: '§ 3 Haftung',
      body: [
        'Platzhaltertext zur Haftung. Definiere Haftungsbeschränkungen, Ausschlüsse und Gewährleistungsregelungen gemäß deiner Rechtslage.',
      ],
    },
  ],
};
