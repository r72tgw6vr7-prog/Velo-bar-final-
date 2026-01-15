import React from 'react';
import { PageTemplate } from '@/templates/PageTemplate.tsx';
import { SiteBackground } from '@/components/layout/SiteBackground';
import { Button } from '@/components/atoms/Button/Button.tsx';
import { Link } from 'react-router-dom';
import { SITE_URL } from '@/lib/site.ts';
import { SuccessStories } from '@/components/organisms/SuccessStories/SuccessStories.tsx';
import { Section } from '@/components/atoms/index.ts';

const NachhaltigeFirmenfeierPage: React.FC = () => {
  // JSON-LD Schema for BlogPosting
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Nachhaltige Firmenfeier München: Zero-Waste Events mit Velo.Bar',
    description:
      '68% der Unternehmen priorisieren Nachhaltigkeit bei Events. So organisieren Sie eine grüne Firmenfeier mit regionalen Zutaten und CO₂-neutralem Catering.',
    image: `${SITE_URL}/assets/backgrounds/cosmic-unified.webp`,
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
      '@id': `${SITE_URL}/blog/nachhaltige-firmenfeier`,
    },
    keywords: [
      'nachhaltige Firmenfeier München',
      'grünes Catering',
      'Zero-Waste Event',
      'ESG Events',
      'nachhaltiges Event Catering',
      'regionale Catering München',
    ],
  };

  return (
    <SiteBackground>
      <PageTemplate
        title='Nachhaltige Firmenfeier München: Zero-Waste & Regional | Velo.Bar'
        description='68% der Unternehmen priorisieren Nachhaltigkeit. Zero-Waste Catering, regionale Spirits und CO₂-neutrale Events in München.'
        canonicalPath='/blog/nachhaltige-firmenfeier'
        structuredData={schemaData}
        withContainer={false}
        background='transparent'
      >
        {/* Hero Section */}
        <Section
          container='narrow'
          spacing='xl'
          className='relative overflow-hidden bg-linear-to-br from-green-900 via-emerald-800 to-teal-900 text-white'
        >
        <div className='absolute inset-0 z-0 opacity-20'>
          <div className='absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(16,185,129,0.4),transparent_50%)]' />
        </div>
        <div className='relative z-10 text-center'>
          <span className='mb-8 inline-block rounded-full border border-emerald-400/30 bg-emerald-500/20 px-0 py-0 text-sm font-semibold text-emerald-300'>
            Blog · Nachhaltigkeit & ESG
          </span>
          <h1 className='mb-8 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl'>
            Nachhaltige Firmenfeier <br className='hidden sm:block' />
            <span className='text-emerald-400'>in München</span>
          </h1>
          <p className='mx-auto max-w-2xl text-xl text-emerald-200'>
            Zero-Waste, regionale Zutaten, CO₂-neutral: So wird Ihr Event grün.
          </p>
        </div>
      </Section>

      <Section container='constrained' spacing='xl'>
        {/* ESG Statistics Box */}
        <div className='mb-16 rounded-2xl border border-emerald-100 bg-emerald-50 p-8 shadow-sm'>
          <div className='mb-8 flex items-center gap-0'>
            <span className='text-2xl'>🌱</span>
            <h2 className='text-xl font-bold text-emerald-900'>Warum nachhaltige Events?</h2>
          </div>
          <div className='grid grid-cols-2 gap-8 md:grid-cols-3'>
            <div className='text-center'>
              <div className='text-3xl font-bold text-emerald-600'>68%</div>
              <div className='text-sm text-emerald-700'>der Unternehmen priorisieren ESG</div>
            </div>
            <div className='text-center'>
              <div className='text-3xl font-bold text-emerald-600'>73%</div>
              <div className='text-sm text-emerald-700'>der Mitarbeiter wünschen grüne Events</div>
            </div>
            <div className='text-center'>
              <div className='text-3xl font-bold text-emerald-600'>2.5kg</div>
              <div className='text-sm text-emerald-700'>CO₂ pro Person bei Standard-Events</div>
            </div>
          </div>
        </div>

        {/* Section 1: Why Sustainability */}
        <section className='mb-16'>
          <h2 className='mb-8 text-3xl font-bold text-gray-900'>
            ESG & Events: Nicht optional, sondern Pflicht
          </h2>
          <div className='prose prose-lg mb-8 text-gray-600'>
            <p>
              Für börsennotierte Unternehmen und viele Mittelständler sind{' '}
              <strong>ESG-Kriterien</strong>
              (Environmental, Social, Governance) längst kein Marketing mehr – sie sind
              Berichtspflicht.
            </p>
            <p>Ihre Firmenfeier gehört dazu. Jedes Event erzeugt:</p>
            <ul>
              <li>CO₂-Emissionen (Anfahrt, Energie, Logistik)</li>
              <li>Abfall (Einweggeschirr, Verpackungen)</li>
              <li>Wasserverbrauch (klassisches Catering: 50-100L pro Event)</li>
            </ul>
            <p>
              Die gute Nachricht: <strong>Mit den richtigen Partnern</strong> lassen sich diese
              Faktoren auf nahezu null reduzieren – ohne Kompromisse beim Erlebnis.
            </p>
          </div>
        </section>

        {/* Section 2: Velo.Bar's Sustainability */}
        <section className='mb-16'>
          <h2 className='mb-8 text-3xl font-bold text-gray-900'>
            So funktioniert grünes Bar-Catering
          </h2>

          <div className='space-y-8'>
            <div className='border-l-4 border-emerald-500 py-0 pl-8'>
              <h3 className='mb-0 text-xl font-bold text-gray-900'>
                🚿 Wasserlose Bar-Technologie
              </h3>
              <p className='text-gray-600'>
                Die Velo.Bar funktioniert <strong>ohne Wasseranschluss</strong>. Geschlossene
                Systeme und Hochdruck-Spültechnik reduzieren den Wasserverbrauch um 95% gegenüber
                klassischen Bars.
              </p>
            </div>

            <div className='border-l-4 border-emerald-500 py-0 pl-8'>
              <h3 className='mb-0 text-xl font-bold text-gray-900'>🔌 Stromautarker Betrieb</h3>
              <p className='text-gray-600'>
                Keine lauten Generatoren, keine Kabel. Unsere Akku-Technik ermöglicht{' '}
                <strong>8+ Stunden Betrieb</strong> ohne externe Stromversorgung – perfekt für
                Outdoor-Events.
              </p>
            </div>

            <div className='border-l-4 border-emerald-500 py-0 pl-8'>
              <h3 className='mb-0 text-xl font-bold text-gray-900'>
                🥃 Regionale Bayerische Spirits
              </h3>
              <p className='text-gray-600'>
                Wir arbeiten mit <strong>Brennereien aus Bayern</strong>: Gin aus dem Chiemgau,
                Whisky aus Franken, Kräuterliköre aus den Alpen. Kurze Lieferwege, lokale
                Wertschöpfung.
              </p>
            </div>

            <div className='border-l-4 border-emerald-500 py-0 pl-8'>
              <h3 className='mb-0 text-xl font-bold text-gray-900'>♻️ Zero-Waste Garnituren</h3>
              <p className='text-gray-600'>
                Dehydrierte Zitronen statt frischer Schnittabfälle. Essbare Blüten statt
                Plastik-Deko.
                <strong>Kompostierbare Strohhalme</strong> aus Weizen oder Bambus.
              </p>
            </div>

            <div className='border-l-4 border-emerald-500 py-0 pl-8'>
              <h3 className='mb-0 text-xl font-bold text-gray-900'>🚴 Fahrrad-Anlieferung</h3>
              <p className='text-gray-600'>
                Die Velo.Bar wird <strong>mit dem Lastenrad</strong> geliefert – nicht mit dem
                Transporter. CO₂-Emissionen bei der Anfahrt: 0g.
              </p>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className='mb-16'>
          <h2 className='mb-8 text-3xl font-bold text-gray-900'>Nachhaltigkeits-Vergleich</h2>

          <div className='overflow-hidden rounded-xl border border-gray-200 shadow-sm'>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-gray-50'>
                <tr>
                  <th
                    scope='col'
                    className='px-8 py-8 text-left text-xs font-medium tracking-wider text-gray-500 uppercase'
                  >
                    Faktor
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
                    Velo.Bar
                  </th>
                </tr>
              </thead>
              <tbody className='bg-navy-light divide-y divide-white/10'>
                <tr>
                  <td className='px-8 py-8 text-sm font-medium text-gray-900'>Wasserverbrauch</td>
                  <td className='px-8 py-8 text-sm text-gray-600'>50–100 Liter</td>
                  <td className='px-8 py-8 text-sm font-medium text-emerald-700'>&lt;5 Liter ✓</td>
                </tr>
                <tr className='bg-gray-50'>
                  <td className='px-8 py-8 text-sm font-medium text-gray-900'>Stromverbrauch</td>
                  <td className='px-8 py-8 text-sm text-gray-600'>2–5 kWh</td>
                  <td className='px-8 py-8 text-sm font-medium text-emerald-700'>0 kWh (Akku) ✓</td>
                </tr>
                <tr>
                  <td className='px-8 py-8 text-sm font-medium text-gray-900'>CO₂ Anlieferung</td>
                  <td className='px-8 py-8 text-sm text-gray-600'>3–8 kg</td>
                  <td className='px-8 py-8 text-sm font-medium text-emerald-700'>
                    0 kg (Fahrrad) ✓
                  </td>
                </tr>
                <tr className='bg-gray-50'>
                  <td className='px-8 py-8 text-sm font-medium text-gray-900'>Einwegmüll</td>
                  <td className='px-8 py-8 text-sm text-gray-600'>2–5 kg</td>
                  <td className='px-8 py-8 text-sm font-medium text-emerald-700'>&lt;0.5 kg ✓</td>
                </tr>
                <tr>
                  <td className='px-8 py-8 text-sm font-medium text-gray-900'>
                    Regionale Produkte
                  </td>
                  <td className='px-8 py-8 text-sm text-gray-600'>Selten</td>
                  <td className='px-8 py-8 text-sm font-medium text-emerald-700'>Standard ✓</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Regional Partners Section */}
        <section className='mb-16'>
          <h2 className='mb-8 text-3xl font-bold text-gray-900'>Unsere regionalen Partner</h2>

          <div className='grid gap-8 md:grid-cols-2'>
            <div className='flex h-full flex-col rounded-xl bg-gray-50 p-8'>
              <h3 className='mb-0 font-bold text-gray-900'>🥃 Bayerische Brennereien</h3>
              <ul className='space-y-0 text-sm text-gray-600'>
                <li>
                  • <strong>Gin:</strong> Destillerie Gansloser (Allgäu)
                </li>
                <li>
                  • <strong>Whisky:</strong> SLYRS (Schliersee)
                </li>
                <li>
                  • <strong>Obstbrand:</strong> Lantenhammer (Hausham)
                </li>
                <li>
                  • <strong>Kräuterlikör:</strong> Siegfried Rheinland
                </li>
              </ul>
            </div>

            <div className='flex h-full flex-col rounded-xl bg-gray-50 p-8'>
              <h3 className='mb-0 font-bold text-gray-900'>🍋 Frische Zutaten</h3>
              <ul className='space-y-0 text-sm text-gray-600'>
                <li>
                  • <strong>Kräuter:</strong> Urban Farming München
                </li>
                <li>
                  • <strong>Säfte:</strong> Van Nahmen (Bio)
                </li>
                <li>
                  • <strong>Sirupe:</strong> Hauseigene Produktion
                </li>
                <li>
                  • <strong>Eis:</strong> Lokale Eismanufaktur
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ESG Reporting Section */}
        <section className='mb-16'>
          <h2 className='mb-8 text-3xl font-bold text-gray-900'>
            Nachhaltigkeits-Zertifikat für Ihr ESG-Reporting
          </h2>

          <div className='rounded-xl border border-emerald-200 bg-linear-to-br from-emerald-50 to-teal-50 p-8'>
            <div className='flex items-start gap-8'>
              <div className='text-4xl'>📋</div>
              <div>
                <h3 className='mb-0 text-xl font-bold text-gray-900'>
                  Nach jedem Event erhalten Sie:
                </h3>
                <ul className='space-y-0 text-gray-700'>
                  <li className='flex items-center gap-0'>
                    <span className='text-emerald-500'>✓</span>
                    CO₂-Bilanz des Events (berechnet nach GHG Protocol)
                  </li>
                  <li className='flex items-center gap-0'>
                    <span className='text-emerald-500'>✓</span>
                    Wasserverbrauchs-Dokumentation
                  </li>
                  <li className='flex items-center gap-0'>
                    <span className='text-emerald-500'>✓</span>
                    Abfallbilanz mit Recycling-Quote
                  </li>
                  <li className='flex items-center gap-0'>
                    <span className='text-emerald-500'>✓</span>
                    Herkunftsnachweis regionaler Produkte
                  </li>
                  <li className='flex items-center gap-0'>
                    <span className='text-emerald-500'>✓</span>
                    Zertifikat für CSR-/Nachhaltigkeitsbericht
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Tips Section */}
        <section className='mb-16'>
          <h2 className='mb-8 text-3xl font-bold text-gray-900'>
            7 Tipps für Ihre nachhaltige Firmenfeier
          </h2>

          <div className='space-y-8'>
            <div className='flex items-start gap-8 rounded-lg bg-emerald-50 p-8'>
              <span className='text-xl font-bold text-emerald-600'>1</span>
              <div>
                <h4 className='font-bold text-gray-900'>Location mit ÖPNV-Anbindung wählen</h4>
                <p className='text-sm text-gray-600'>Reduziert Anreise-Emissionen um bis zu 60%.</p>
              </div>
            </div>

            <div className='flex items-start gap-8 rounded-lg bg-emerald-50 p-8'>
              <span className='text-xl font-bold text-emerald-600'>2</span>
              <div>
                <h4 className='font-bold text-gray-900'>Digitale Einladungen statt Print</h4>
                <p className='text-sm text-gray-600'>
                  Spart Papier und ermöglicht einfache Updates.
                </p>
              </div>
            </div>

            <div className='flex items-start gap-8 rounded-lg bg-emerald-50 p-8'>
              <span className='text-xl font-bold text-emerald-600'>3</span>
              <div>
                <h4 className='font-bold text-gray-900'>Vegetarisches/Veganes Hauptmenü</h4>
                <p className='text-sm text-gray-600'>
                  Der größte Hebel: Pflanzliches Essen spart 2.5kg CO₂ pro Person.
                </p>
              </div>
            </div>

            <div className='flex items-start gap-8 rounded-lg bg-emerald-50 p-8'>
              <span className='text-xl font-bold text-emerald-600'>4</span>
              <div>
                <h4 className='font-bold text-gray-900'>Wasserflaschen statt Einweg</h4>
                <p className='text-sm text-gray-600'>
                  Gebrandete Glasflaschen als Giveaway – nachhaltig & Marketing.
                </p>
              </div>
            </div>

            <div className='flex items-start gap-8 rounded-lg bg-emerald-50 p-8'>
              <span className='text-xl font-bold text-emerald-600'>5</span>
              <div>
                <h4 className='font-bold text-gray-900'>LED-Beleuchtung & Solar-Deko</h4>
                <p className='text-sm text-gray-600'>
                  Moderne Lichtkonzepte verbrauchen 90% weniger Strom.
                </p>
              </div>
            </div>

            <div className='flex items-start gap-8 rounded-lg bg-emerald-50 p-8'>
              <span className='text-xl font-bold text-emerald-600'>6</span>
              <div>
                <h4 className='font-bold text-gray-900'>Spenden statt Reste wegwerfen</h4>
                <p className='text-sm text-gray-600'>
                  Partner wie „Too Good To Go" holen Reste ab.
                </p>
              </div>
            </div>

            <div className='flex items-start gap-8 rounded-lg bg-emerald-50 p-8'>
              <span className='text-xl font-bold text-emerald-600'>7</span>
              <div>
                <h4 className='font-bold text-gray-900'>CO₂-Kompensation als Backup</h4>
                <p className='text-sm text-gray-600'>
                  Für unvermeidbare Emissionen: Zertifizierte Klimaprojekte.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Internal Links */}
        <section className='mb-16'>
          <h2 className='mb-8 text-2xl font-bold text-gray-900'>Weiterführende Artikel</h2>
          <div className='grid gap-8 md:grid-cols-2'>
            <Link
              to='/blog/alkoholfreie-cocktails-firmenevents'
              className='block flex h-full flex-col rounded-xl border border-gray-200 bg-gray-50 p-8 transition duration-200 ease-out hover:border-emerald-300 hover:shadow-md'
            >
              <h3 className='mb-0 font-bold text-gray-900'>🍹 Alkoholfreie Cocktails</h3>
              <p className='text-sm text-gray-600'>Mocktails für inklusive, bewusste Events.</p>
            </Link>
            <Link
              to='/firmenfeiern'
              className='block flex h-full flex-col rounded-xl border border-gray-200 bg-gray-50 p-8 transition duration-200 ease-out hover:border-emerald-300 hover:shadow-md'
            >
              <h3 className='mb-0 font-bold text-gray-900'>🎉 Firmenfeiern planen</h3>
              <p className='text-sm text-gray-600'>Alle Services für Ihr Corporate Event.</p>
            </Link>
          </div>
        </section>

        {/* Success Stories */}
        <SuccessStories variant='compact' className='mb-16' />

        {/* CTA Section */}
        <section className='rounded-2xl bg-linear-to-br from-emerald-600 to-teal-600 p-8 text-center text-white md:p-16'>
          <h2 className='mb-8 text-3xl font-bold'>Grün feiern mit Velo.Bar</h2>
          <p className='mx-auto mb-8 max-w-2xl text-lg opacity-90'>
            Lassen Sie uns gemeinsam ein Event planen, das Ihre ESG-Ziele erfüllt – ohne Kompromisse
            beim Erlebnis.
          </p>
          <div className='flex flex-col justify-center gap-8 sm:flex-row'>
            <Link to='/anfrage?source=nachhaltig-blog'>
              <Button
                size='lg'
                className='border-none bg-white text-emerald-700 transition duration-200 ease-out hover:bg-gray-100'
              >
                Nachhaltige Event-Anfrage
              </Button>
            </Link>
            <Link to='/resources/corporate-event-catering-guide'>
              <Button
                size='lg'
                variant='outline'
                className='border-white text-white transition duration-200 ease-out hover:bg-white/10'
              >
                Event-Catering Guide
              </Button>
            </Link>
          </div>
        </section>
      </Section>
      </PageTemplate>
    </SiteBackground>
  );
};

export default NachhaltigeFirmenfeierPage;
