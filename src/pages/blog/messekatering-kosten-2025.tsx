import React from 'react';
import { PageTemplate } from '@/templates/PageTemplate.tsx';
import { Button } from '@/components/atoms/Button/Button.tsx';
import { Link } from 'react-router-dom';
import { SITE_URL } from '@/lib/site.ts';
import { SuccessStories } from '@/components/organisms/SuccessStories/SuccessStories.tsx';
import { Section } from '@/components/atoms/index.ts';

const MessekateringKostenPage: React.FC = () => {
  // JSON-LD Schema for BlogPosting
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Messekatering München: Kosten vs. ROI – Der komplette Budget-Guide 2025',
    description:
      'Was kostet professionelles Messekatering in München? Transparenter Preisvergleich, versteckte Kosten vermeiden und ROI berechnen.',
    image: `${SITE_URL}/assets/backgrounds/cosmic-unified.jpg`,
    author: {
      '@type': 'Organization',
      name: 'Velo.Bar',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Velo.Bar',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/assets/logo.png`,
      },
    },
    datePublished: '2025-02-01',
    dateModified: '2025-12-08',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/messekatering-kosten-2025`,
    },
    keywords: [
      'Messekatering Kosten',
      'Messekatering München Preise',
      'Standparty Budget',
      'Messe Catering Kosten',
      'BAUMA Catering',
    ],
  };

  return (
    <PageTemplate
      title='Messekatering München: Kosten vs. ROI – Budget-Guide 2025 | Velo.Bar'
      description='Was kostet professionelles Messekatering in München? Transparenter Preisvergleich, versteckte Kosten vermeiden und ROI-Kalkulation für BAUMA, ISPO & Co.'
      canonicalPath='/blog/messekatering-kosten-2025'
      structuredData={schemaData}
      withContainer={false}
      className='bg-navy'
    >
      {/* Hero Section */}
      <Section
        container='narrow'
        spacing='xl'
        className='relative overflow-hidden bg-linear-to-br from-gray-900 via-gray-800 to-emerald-900 text-white'
      >
        <div className='absolute inset-0 z-0 opacity-20'>
          <div className='absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(16,185,129,0.3),transparent_50%)]' />
        </div>
        <div className='relative z-10 text-center'>
          <span className='mb-8 inline-block rounded-full border border-emerald-400/30 bg-emerald-500/20 px-0 py-0 text-sm font-semibold text-emerald-300'>
            Blog · Budget & Planung
          </span>
          <h1 className='mb-8 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl'>
            Messekatering München: <br className='hidden sm:block' />
            <span className='text-emerald-400'>Kosten vs. ROI</span>
          </h1>
          <p className='mx-auto max-w-2xl text-xl text-gray-300'>
            Der komplette Budget-Guide 2025 für BAUMA, ISPO, EXPO REAL und alle Münchner Messen.
          </p>
        </div>
      </Section>

      <Section container='constrained' spacing='xl'>
        {/* Key Takeaways Box */}
        <div className='mb-16 rounded-2xl border border-emerald-100 bg-emerald-50 p-8 shadow-sm'>
          <div className='mb-8 flex items-center gap-0'>
            <span className='text-2xl'>💰</span>
            <h2 className='text-xl font-bold text-emerald-900'>Das Wichtigste in Kürze</h2>
          </div>
          <ul className='space-y-0 text-emerald-800'>
            <li className='flex items-start gap-0'>
              <span className='mt-0.5 font-bold text-emerald-600'>1.</span>
              <span>
                Mobile Bar-Services kosten <strong>€890–€2.500</strong> pro Tag – ohne versteckte
                Zusatzkosten.
              </span>
            </li>
            <li className='flex items-start gap-0'>
              <span className='mt-0.5 font-bold text-emerald-600'>2.</span>
              <span>
                Klassisches Messe-Catering hat oft <strong>30–50% versteckte Kosten</strong>{' '}
                (Equipment, Personal, Strom).
              </span>
            </li>
            <li className='flex items-start gap-0'>
              <span className='mt-0.5 font-bold text-emerald-600'>3.</span>
              <span>
                Der <strong>ROI einer mobilen Bar</strong> liegt bei 300–500% – wenn richtig
                eingesetzt.
              </span>
            </li>
          </ul>
        </div>

        {/* Section 1 */}
        <section className='mb-16'>
          <h2 className='mb-8 text-3xl font-bold text-gray-900'>
            Was kostet Messekatering in München wirklich?
          </h2>
          <div className='prose prose-lg mb-8 text-gray-600'>
            <p>
              Sie planen Ihren Messeauftritt auf der <strong>BAUMA</strong>, <strong>ISPO</strong>{' '}
              oder <strong>EXPO REAL</strong>? Das Budget ist durchgeplant – aber bei den
              Catering-Kosten kommen oft böse Überraschungen.
            </p>
            <p>
              Wir zeigen Ihnen transparent, was professionelles Messekatering in München 2025 kostet
              – und wie Sie versteckte Kosten vermeiden.
            </p>
          </div>
        </section>

        {/* Pricing Comparison Table */}
        <section className='mb-16'>
          <h2 className='mb-8 text-3xl font-bold text-gray-900'>
            Kostenvergleich: Klassisches Catering vs. Mobile Bar
          </h2>

          <div className='mb-8 overflow-hidden rounded-xl border border-gray-200 shadow-sm'>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-gray-50'>
                <tr>
                  <th
                    scope='col'
                    className='px-8 py-8 text-left text-xs font-medium tracking-wider text-gray-500 uppercase'
                  >
                    Kostenfaktor
                  </th>
                  <th
                    scope='col'
                    className='px-8 py-8 text-left text-xs font-medium tracking-wider text-gray-500 uppercase'
                  >
                    Klassisches Catering
                  </th>
                  <th
                    scope='col'
                    className='px-8 py-8 text-left text-xs font-bold font-medium tracking-wider text-emerald-600 uppercase'
                  >
                    Mobile Bar
                  </th>
                </tr>
              </thead>
              <tbody className='bg-navy-light divide-y divide-white/10'>
                <tr>
                  <td className='px-8 py-8 text-sm font-medium text-gray-900'>
                    Basispreis (8 Std.)
                  </td>
                  <td className='px-8 py-8 text-sm text-gray-600'>€1.200–€3.500</td>
                  <td className='px-8 py-8 text-sm font-medium text-emerald-700'>€890–€2.500 ✓</td>
                </tr>
                <tr className='bg-gray-50'>
                  <td className='px-8 py-8 text-sm font-medium text-gray-900'>
                    Personal-Aufschlag
                  </td>
                  <td className='px-8 py-8 text-sm text-gray-600'>+€400–€800</td>
                  <td className='px-8 py-8 text-sm font-medium text-emerald-700'>Inklusiv ✓</td>
                </tr>
                <tr>
                  <td className='px-8 py-8 text-sm font-medium text-gray-900'>Equipment-Miete</td>
                  <td className='px-8 py-8 text-sm text-gray-600'>+€300–€600</td>
                  <td className='px-8 py-8 text-sm font-medium text-emerald-700'>Inklusiv ✓</td>
                </tr>
                <tr className='bg-gray-50'>
                  <td className='px-8 py-8 text-sm font-medium text-gray-900'>
                    Strom-/Wasseranschluss
                  </td>
                  <td className='px-8 py-8 text-sm text-gray-600'>+€200–€500</td>
                  <td className='px-8 py-8 text-sm font-medium text-emerald-700'>Nicht nötig ✓</td>
                </tr>
                <tr>
                  <td className='px-8 py-8 text-sm font-medium text-gray-900'>Auf-/Abbau-Kosten</td>
                  <td className='px-8 py-8 text-sm text-gray-600'>+€150–€300</td>
                  <td className='px-8 py-8 text-sm font-medium text-emerald-700'>Inklusiv ✓</td>
                </tr>
                <tr className='bg-emerald-50 font-bold'>
                  <td className='px-8 py-8 text-sm text-gray-900'>Gesamtkosten</td>
                  <td className='px-8 py-8 text-sm text-red-600'>€2.250–€5.700</td>
                  <td className='px-8 py-8 text-sm text-emerald-700'>€890–€2.500</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className='rounded-r-lg border-l-4 border-amber-400 bg-amber-50 p-8'>
            <div className='flex items-start gap-0'>
              <span className='text-xl text-amber-500'>⚠️</span>
              <div>
                <h4 className='mb-0 font-bold text-amber-900'>Achtung: Versteckte Kosten!</h4>
                <p className='text-sm text-amber-800'>
                  Messe-Caterer berechnen oft Aufschläge für: Mindestabnahme, Anfahrt, Überstunden,
                  Spezialdiäten, Reinigung und Müllenentsorgeung. Fragen Sie immer nach dem{' '}
                  <strong>All-Inclusive-Preis</strong>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Budget by Event Size */}
        <section className='mb-16'>
          <h2 className='mb-8 text-3xl font-bold text-gray-900'>
            Budget-Richtwerte nach Gästezahl
          </h2>

          <div className='mb-8 grid gap-8 md:grid-cols-3'>
            <div className='bg-navy-light flex h-full flex-col rounded-xl border border-white/10 p-8 text-center shadow-sm'>
              <div className='mb-0 text-4xl'>👥</div>
              <h3 className='mb-0 text-lg font-bold text-gray-900'>Kleine Standparty</h3>
              <p className='mb-0 text-3xl font-bold text-emerald-600'>ab €890</p>
              <p className='text-sm text-gray-600'>20–50 Gäste • 4 Stunden</p>
            </div>

            <div className='flex h-full flex-col rounded-xl border-2 border-emerald-200 bg-emerald-50 p-8 text-center shadow-sm'>
              <div className='mb-0 text-4xl'>🎯</div>
              <h3 className='mb-0 text-lg font-bold text-gray-900'>Standard-Messeevent</h3>
              <p className='mb-0 text-3xl font-bold text-emerald-600'>ab €1.490</p>
              <p className='text-sm text-gray-600'>50–100 Gäste • 8 Stunden</p>
              <span className='mt-0 inline-block rounded-full bg-emerald-600 px-0 py-0 text-xs text-white'>
                Beliebteste Wahl
              </span>
            </div>

            <div className='bg-navy-light flex h-full flex-col rounded-xl border border-white/10 p-8 text-center shadow-sm'>
              <div className='mb-0 text-4xl'>🚀</div>
              <h3 className='mb-0 text-lg font-bold text-gray-900'>Großes Messe-Event</h3>
              <p className='mb-0 text-3xl font-bold text-emerald-600'>ab €2.490</p>
              <p className='text-sm text-gray-600'>100–200+ Gäste • 8+ Stunden</p>
            </div>
          </div>
        </section>

        {/* ROI Section */}
        <section className='mb-16'>
          <h2 className='mb-8 text-3xl font-bold text-gray-900'>
            Die ROI-Rechnung: Lohnt sich die Investition?
          </h2>

          <div className='prose prose-lg mb-8 text-gray-600'>
            <p>
              Vergessen Sie die Frage „Was kostet das?". Die richtige Frage lautet:
              <strong>„Was bringt mir das?"</strong>
            </p>
          </div>

          <div className='mb-8 rounded-2xl bg-linear-to-br from-gray-900 to-gray-800 p-8 text-white'>
            <h3 className='mb-8 text-xl font-bold'>Beispielrechnung: BAUMA-Messestand</h3>

            <div className='mb-8 space-y-8'>
              <div className='flex items-center justify-between border-b border-gray-700 pb-0'>
                <span className='text-gray-300'>Investition Mobile Bar (3 Tage)</span>
                <span className='font-bold'>€4.500</span>
              </div>
              <div className='flex items-center justify-between border-b border-gray-700 pb-0'>
                <span className='text-gray-300'>Zusätzliche qualifizierte Gespräche</span>
                <span className='font-bold'>+60 Leads</span>
              </div>
              <div className='flex items-center justify-between border-b border-gray-700 pb-0'>
                <span className='text-gray-300'>Conversion Rate (Branchenschnitt)</span>
                <span className='font-bold'>5%</span>
              </div>
              <div className='flex items-center justify-between border-b border-gray-700 pb-0'>
                <span className='text-gray-300'>Neue Kunden</span>
                <span className='font-bold text-emerald-400'>3 Kunden</span>
              </div>
              <div className='flex items-center justify-between pt-0'>
                <span className='text-lg'>Ø Kundenwert (Lifetime Value)</span>
                <span className='text-2xl font-bold text-emerald-400'>€15.000+</span>
              </div>
            </div>

            <div className='rounded-lg border border-emerald-400/30 bg-emerald-500/20 p-8 text-center'>
              <span className='text-sm text-emerald-300'>Return on Investment</span>
              <div className='text-4xl font-bold text-emerald-400'>1.000%</div>
            </div>
          </div>
        </section>

        {/* Messe-Specific Tips */}
        <section className='mb-16'>
          <h2 className='mb-8 text-3xl font-bold text-gray-900'>Spar-Tipps für Münchner Messen</h2>

          <div className='space-y-8'>
            <div className='flex items-start gap-8 rounded-lg bg-gray-50 p-8'>
              <span className='text-2xl'>📅</span>
              <div>
                <h4 className='font-bold text-gray-900'>Früh buchen = sparen</h4>
                <p className='text-sm text-gray-600'>
                  Bei Buchung 8+ Wochen vor der Messe sparen Sie bis zu 15%.
                </p>
              </div>
            </div>

            <div className='flex items-start gap-8 rounded-lg bg-gray-50 p-8'>
              <span className='text-2xl'>🔌</span>
              <div>
                <h4 className='font-bold text-gray-900'>Autarke Systeme wählen</h4>
                <p className='text-sm text-gray-600'>
                  Mobile Bars ohne Strom-/Wasseranschluss sparen €200–€500 an
                  Messe-Infrastrukturkosten.
                </p>
              </div>
            </div>

            <div className='flex items-start gap-8 rounded-lg bg-gray-50 p-8'>
              <span className='text-2xl'>🍹</span>
              <div>
                <h4 className='font-bold text-gray-900'>Fokus auf 3–5 Signature Drinks</h4>
                <p className='text-sm text-gray-600'>
                  Weniger Auswahl = schnellerer Service = mehr Gäste bedient.
                </p>
              </div>
            </div>

            <div className='flex items-start gap-8 rounded-lg bg-gray-50 p-8'>
              <span className='text-2xl'>📊</span>
              <div>
                <h4 className='font-bold text-gray-900'>Leads tracken</h4>
                <p className='text-sm text-gray-600'>
                  Nutzen Sie die Bar als Lead-Qualifier: Visitenkarten-Fishbowl oder
                  QR-Code-Gewinnspiel.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Internal Links */}
        <section className='mb-16'>
          <h2 className='mb-8 text-2xl font-bold text-gray-900'>Weiterführende Ressourcen</h2>
          <div className='grid gap-8 md:grid-cols-2'>
            <Link
              to='/resources/corporate-event-catering-guide'
              className='block flex h-full flex-col rounded-xl border border-gray-200 bg-gray-50 p-8 transition duration-200 ease-out hover:border-emerald-300 hover:shadow-md'
            >
              <h3 className='mb-0 font-bold text-gray-900'>📚 Corporate Event Catering Guide</h3>
              <p className='text-sm text-gray-600'>
                Der ultimative Guide für B2B-Event-Catering in München.
              </p>
            </Link>
            <Link
              to='/blog/roi-hospitality-events'
              className='block flex h-full flex-col rounded-xl border border-gray-200 bg-gray-50 p-8 transition duration-200 ease-out hover:border-emerald-300 hover:shadow-md'
            >
              <h3 className='mb-0 font-bold text-gray-900'>📈 ROI Ihrer Event-Bar berechnen</h3>
              <p className='text-sm text-gray-600'>
                Cost Per Lead, Verweildauer und mehr: So messen Sie Erfolg.
              </p>
            </Link>
          </div>
        </section>

        {/* Success Stories */}
        <SuccessStories variant='compact' className='mb-16' />

        {/* CTA Section */}
        <section className='rounded-2xl bg-linear-to-br from-emerald-600 to-emerald-700 p-8 text-center text-white md:p-16'>
          <h2 className='mb-8 text-3xl font-bold'>
            Transparente Preise. Keine versteckten Kosten.
          </h2>
          <p className='mx-auto mb-8 max-w-2xl text-lg opacity-90'>
            Erhalten Sie ein unverbindliches Angebot für Ihren Messeauftritt in München – mit
            garantiertem All-Inclusive-Preis.
          </p>
          <div className='flex flex-col justify-center gap-8 sm:flex-row'>
            <Link to='/anfrage?eventType=messe&source=messekatering-kosten'>
              <Button
                size='lg'
                className='border-none bg-white text-emerald-700 transition duration-200 ease-out hover:bg-gray-100'
              >
                Jetzt Angebot anfordern
              </Button>
            </Link>
            <Link to='/messe-catering'>
              <Button
                size='lg'
                variant='outline'
                className='border-white text-white transition duration-200 ease-out hover:bg-white/10'
              >
                Messe-Catering Details
              </Button>
            </Link>
          </div>
        </section>
      </Section>
    </PageTemplate>
  );
};

export default MessekateringKostenPage;
