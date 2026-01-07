/**
 * FAQPage - Frequently Asked Questions Page
 * ==========================================
 * Standalone FAQ page with clean header and grid layout
 * Optimized for voice search and SEO rich snippets
 */

import React from 'react';
import { FAQSection } from '@/sections/FAQSection';
import { PageTemplate } from '@/templates/PageTemplate';
import { getFAQSchema } from '@/seo/schema';
import { Section } from '@/components/atoms/Section/Section';
import { HeroHeading } from '@/components/ui/HeroHeading';

// FAQ items for Velobar
const faqItems = [
  {
    id: 'faq-1',
    question: 'Wie weit im Voraus sollte ich buchen?',
    answer:
      'Wir empfehlen, mindestens 4-6 Wochen vor deinem Event zu buchen. Für Hochzeiten und große Firmenevents solltest du 3-6 Monate einplanen. Bei kurzfristigen Anfragen tun wir unser Bestes, dich zu unterstützen.',
  },
  {
    id: 'faq-2',
    question: 'Was ist im Preis enthalten?',
    answer:
      'Unsere Pakete beinhalten die mobile Bar, professionelle Barkeeper, alle Spirituosen, Mixer, Eis, Garnituren und Equipment. Gläser und Servietten sind ebenfalls inklusive.',
  },
  {
    id: 'faq-3',
    question: 'Können Sie auch alkoholfreie Cocktails anbieten?',
    answer:
      'Absolut! Wir bieten eine breite Auswahl an Mocktails und alkoholfreien Alternativen. Diese können auch als Hauptangebot oder ergänzend zu alkoholischen Cocktails serviert werden.',
  },
  {
    id: 'faq-4',
    question: 'Welche Regionen bedienen Sie?',
    answer:
      'Wir sind in München, Coburg und ganz Bayern aktiv. Für Events außerhalb Bayerns kontaktiere uns gerne für ein individuelles Angebot.',
  },
  {
    id: 'faq-5',
    question: 'Wie viele Gäste können Sie bedienen?',
    answer:
      'Von intimen Feiern mit 20 Gästen bis zu großen Firmenevents mit 500+ Personen – wir passen unser Setup flexibel an deine Gästezahl an.',
  },
  {
    id: 'faq-6',
    question: 'Kann ich die Cocktailkarte individuell gestalten?',
    answer:
      'Ja! Wir erstellen gerne eine maßgeschneiderte Cocktailkarte, die zu deinem Event-Thema, deiner Marke oder deinen Geschmacksvorlieben passt.',
  },
  {
    id: 'faq-7',
    question: 'Braucht die mobile Bar Strom oder Wasser?',
    answer:
      'Nein! Unsere Velo.Bar ist vollständig autark. Keine Steckdose, kein Wasseranschluss nötig. Perfekt für Messen, Outdoor-Events und Locations mit eingeschränkter Infrastruktur.',
  },
  {
    id: 'faq-8',
    question: 'Was kostet eine mobile Bar für 50 Gäste?',
    answer:
      'Eine mobile Bar für 50 Gäste kostet ab 890€ für 4 Stunden. Dieses Paket beinhaltet professionelle Barkeeper, alle Spirituosen, Mixer, Eis, Garnituren, Equipment und Gläser. Alle Preise sind transparent ohne versteckte Kosten.',
  },
  {
    id: 'faq-9',
    question: 'Können Sie auch Last-Minute-Anfragen bedienen?',
    answer:
      'Ja! Bei Verfügbarkeit können wir Events mit nur 48-72 Stunden Vorlauf realisieren. Rufen Sie uns einfach an – wir finden eine Lösung.',
  },
  {
    id: 'faq-10',
    question: 'Bieten Sie nachhaltige Event-Optionen?',
    answer:
      'Ja! Wir arbeiten mit regionalen bayerischen Brennereien, nutzen Zero-Waste Garnituren und liefern CO₂-neutral mit dem Lastenrad. Nach jedem Event erhältst du ein Nachhaltigkeits-Zertifikat für dein ESG-Reporting.',
  },
];

// FAQ snippets for voice search optimization and featured snippets
const faqSnippets = [
  {
    category: 'booking',
    title: 'Buchung & Planung',
    items: [
      {
        question: 'Wie weit im Voraus sollte ich eine mobile Cocktailbar buchen?',
        answer:
          'Wir empfehlen mindestens 4-6 Wochen vor deinem Event zu buchen. Für Hochzeiten und große Firmenevents plane 3-6 Monate ein. Kurzfristige Buchungen bis 1 Woche vorher sind möglich, abhängig von Verfügbarkeit.',
      },
      {
        question: 'Was kostet eine mobile Bar für 50 Gäste?',
        answer:
          'Eine mobile Bar für 50 Gäste kostet ab 890€ für 4 Stunden. Dieses Paket beinhaltet professionelle Barkeeper, alle Spirituosen, Mixer, Eis, Garnituren, Equipment und Gläser. Alle Preise sind transparent ohne versteckte Kosten.',
      },
      {
        question: 'Kann ich Last-Minute Catering in München buchen?',
        answer:
          'Ja! Bei Verfügbarkeit realisieren wir Events mit nur 48-72 Stunden Vorlauf. Wir antworten innerhalb von 2 Stunden, auch am Wochenende. Ruf uns an unter +49 160 94623196.',
      },
    ],
  },
  {
    category: 'logistics',
    title: 'Technik & Logistik',
    items: [
      {
        question: 'Benötigt die mobile Cocktailbar Strom oder Wasser?',
        answer:
          'Nein, unsere Fahrrad-Bar ist 100% autark. Kein Strom, kein Wasseranschluss nötig. Funktioniert überall - im Büro, auf Terrassen oder im Freien. Perfekt für Locations mit beschränkten Anschlüssen.',
      },
      {
        question: 'Wie viel Platz benötigt eine mobile Cocktailbar?',
        answer:
          'Nur 2 Quadratmeter Stellfläche werden für unsere kompakte Fahrrad-Bar benötigt. Die mobile Bar passt in jeden Raum oder auf jede Terrasse. Ideal für enge Locations oder als zusätzlicher Eye-Catcher.',
      },
      {
        question: 'Wie lange dauert der Aufbau der mobilen Bar?',
        answer:
          'Der Aufbau dauert nur 30-45 Minuten. Wir kommen 1-2 Stunden vor Event-Beginn. Abbau erfolgt nach Ende des Events und dauert ca. 30 Minuten.',
      },
    ],
  },
  {
    category: 'services',
    title: 'Services & Angebote',
    items: [
      {
        question: 'Welche Cocktails eignen sich für Firmenfeiern?',
        answer:
          'Beliebte Firmenfeier-Cocktails: Aperol Spritz, Gin Tonic, Prosecco mit Beeren, Mojito. Diese benötigen 30-60 Sekunden pro Drink, ermöglichen hohen Durchsatz und gefallen den meisten Gästen. Wir erstellen auch maßgeschneiderte Signature-Drinks.',
      },
      {
        question: 'Können Sie alkoholfreie Cocktails anbieten?',
        answer:
          'Absolut! Wir bieten eine breite Auswahl an Mocktails und alkoholfreien Alternativen mit Premium Non-Alcoholic Spirits wie Seedlip. Diese können als Hauptangebot oder ergänzend zu alkoholischen Cocktails serviert werden.',
      },
      {
        question: 'Bieten Sie Messekatering in München an?',
        answer:
          'Ja! Wir sind Spezialisten für Messe-Catering in München. Ob BAUMA, ISPO oder EXPO REAL – unsere autarke Bar funktioniert ohne Messe-Infrastruktur. Du sparst €400-750 an Strom-/Wasseranschlusskosten.',
      },
    ],
  },
  {
    category: 'sustainability',
    title: 'Nachhaltigkeit & ESG',
    items: [
      {
        question: 'Ist Velo.Bar nachhaltig?',
        answer:
          'Ja! Wir sind CO₂-neutral: Anlieferung per Lastenrad, regionaler bayerische Spirits, Zero-Waste Garnituren, kein Wasserverbrauch. Nach jedem Event erhältst du ein Nachhaltigkeits-Zertifikat für dein ESG-Reporting.',
      },
      {
        question: 'Arbeiten Sie mit regionalen Produkten?',
        answer:
          'Absolut! Wir nutzen Gin aus dem Chiemgau, Whisky aus Franken und Kräuterliköre aus den Alpen. Kurze Lieferwege, lokale Wertschöpfung und authentischer bayerischer Geschmack.',
      },
    ],
  },
  {
    category: 'events',
    title: 'Event-Typen',
    items: [
      {
        question: 'Bieten Sie Catering für Weihnachtsfeiern an?',
        answer:
          'Ja! Wir haben spezielle Wintercocktails: Virgin Glühwein, Hot Apple Cider, Cranberry Fizz. Buche 8+ Wochen vorher für Weihnachtsfeiern in München – die Saison ist schnell ausgebucht.',
      },
      {
        question: 'Können Sie Outdoor-Events ohne Strom bedienen?',
        answer:
          'Perfekt für uns! Unsere Akku-Technik ermöglicht 8+ Stunden Betrieb ohne Steckdose. Sommerfeste im Park, Betriebsausflüge am See, Teamevents in der Natur – überall wo es keine Infrastruktur gibt.',
      },
    ],
  },
];

const FAQPage: React.FC = () => {
  // Generate FAQ schema for rich snippets
  const faqSchema = getFAQSchema(faqItems);

  return (
    <PageTemplate
      title='FAQ | Häufig gestellte Fragen'
      description='Antworten auf häufig gestellte Fragen zu unseren mobilen Cocktailbar-Services, Buchungen, Preisen und mehr.'
      withContainer={false}
      background='transparent'
      structuredData={faqSchema}
    >
      <HeroHeading
        eyebrow='Wir helfen Ihnen gerne'
        title='Häufig gestellte Fragen'
        subtitle='Finden Sie Antworten auf die häufigsten Fragen zu unseren mobilen Cocktailbar-Services, Buchungen und Preisen.'
      />

      {/* Voice Search Optimized FAQ Snippets */}
      <Section container='narrow' spacing='md' background='light'>
        <div className='mb-16 text-center'>
          <h2 className='vb-heading-1 mb-8 text-center text-[rgb(238,120,104)]'>
            Direkte Antworten für Ihre Planung
          </h2>
          <p className='vb-lead text-center'>Optimiert für Google Assistant, Siri & Co.</p>
        </div>

        <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {faqSnippets.map((category) => (
            <div key={category.category} className='space-y-8'>
              <h3 className='text-on-light border-b border-black/10 pb-8 text-lg font-semibold'>
                {category.title}
              </h3>
              <div className='space-y-8'>
                {category.items.map((faq, index) => (
                  <article
                    key={index}
                    className='snippet-block bg-navy-light border-accent-primary flex h-full flex-col rounded-r-lg border-l-4 p-8 shadow-sm'
                  >
                    <h4 className='text-on-light mb-8 text-base font-semibold'>{faq.question}</h4>
                    <p className='text-sm leading-relaxed text-white/70'>{faq.answer}</p>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Traditional FAQ Grid */}
      <FAQSection items={faqItems} className='pt-0' />
    </PageTemplate>
  );
};

export default FAQPage;
