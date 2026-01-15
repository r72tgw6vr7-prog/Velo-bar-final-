import React from 'react';
import { PageTemplate } from '@/templates/PageTemplate.tsx';
import { SiteBackground } from '@/components/layout/SiteBackground';
import { Button } from '@/components/atoms/Button/Button.tsx';
import { Link } from 'react-router-dom';
import { SITE_URL } from '@/lib/site.ts';
import { SuccessStories } from '@/components/organisms/SuccessStories/SuccessStories.tsx';
import { Section } from '@/components/atoms/index.ts';

const CateringOhneStromanschlussPage: React.FC = () => {
  // JSON-LD Schema for BlogPosting
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Catering ohne Stromanschluss: Die perfekte Lösung für Messen & Outdoor-Events',
    description:
      'Kein Strom? Kein Problem! Wie autarke Bar-Systeme auf Messen, Terrassen und Outdoor-Events funktionieren – ohne teure Infrastruktur.',
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
    datePublished: '2025-01-30',
    dateModified: '2025-12-08',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/catering-ohne-stromanschluss`,
    },
    keywords: [
      'Catering ohne Stromanschluss',
      'wasserlose Bar',
      'autarkes Catering',
      'mobile Bar Messe',
      'Outdoor Event Catering',
      'Catering ohne Wasser München',
    ],
  };

  return (
    <SiteBackground>
      <PageTemplate
        title='Catering ohne Stromanschluss: Autarke Bar-Lösungen | Velo.Bar'
        description='Kein Strom, kein Wasser – kein Problem! Wie autarke mobile Bars auf Messen, Terrassen und Events funktionieren. Sparen Sie €200-500 Infrastrukturkosten.'
        canonicalPath='/blog/catering-ohne-stromanschluss'
        structuredData={schemaData}
        withContainer={false}
        background='transparent'
      >
        {/* Hero Section */}
        <Section
          container='narrow'
          spacing='xl'
          className='bg-navy-primary relative overflow-hidden text-white'
        >
        <div className='absolute inset-0 z-0 opacity-20'>
          <div className='absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(99,102,241,0.4),transparent_50%)]' />
        </div>
        <div className='relative z-10 text-center'>
          <span className='bg-accent-primary/20 border-accent-primary/30 text-accent-primary mb-8 inline-block rounded-full border px-0 py-0 text-sm font-semibold'>
            Blog · Technik & Logistik
          </span>
          <h1 className='mb-8 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl'>
            Catering ohne <br className='hidden sm:block' />
            <span className='text-accent-primary'>Stromanschluss</span>
          </h1>
          <p className='mx-auto max-w-2xl text-xl text-white/70'>
            Die perfekte Lösung für Messen, Terrassen und Outdoor-Events.
          </p>
        </div>
      </Section>

      <Section container='constrained' spacing='xl'>
        {/* Problem Statement Box */}
        <div className='bg-accent-primary/10 border-accent-primary/20 mb-16 rounded-2xl border p-8 shadow-sm'>
          <div className='mb-8 flex items-center gap-0'>
            <span className='text-2xl'>😰</span>
            <h2 className='text-on-light text-xl font-bold'>Das kennen Sie sicher...</h2>
          </div>
          <div className='text-on-light/80 space-y-0'>
            <p>„Der Messestand hat nur 2 Steckdosen – und die braucht die IT."</p>
            <p>„Wasseranschluss kostet €350 extra bei der Messe München."</p>
            <p>„Die Terrasse hat keinen Strom – können Sie trotzdem Cocktails machen?"</p>
          </div>
        </div>

        {/* Section 1: The Solution */}
        <section className='mb-16'>
          <h2 className='mb-8 text-3xl font-bold text-gray-900'>
            Die Lösung: Vollständig autarke Bar-Systeme
          </h2>

          <div className='prose prose-lg mb-8 text-gray-600'>
            <p>
              Die Velo.Bar ist <strong>100% autark</strong>. Das bedeutet: Wir brauchen weder Strom
              noch Wasseranschluss von Ihnen. Die gesamte Infrastruktur ist mobil und
              selbstversorgend.
            </p>
          </div>

          <div className='mb-8 grid gap-8 md:grid-cols-2'>
            <div className='bg-navy-light flex h-full flex-col rounded-xl border border-black/10 p-8'>
              <div className='mb-8 text-4xl'>🔋</div>
              <h3 className='mb-0 text-xl font-bold text-gray-900'>Akku-Betrieb</h3>
              <ul className='space-y-0 text-sm text-gray-600'>
                <li>• Hochleistungs-Lithium-Akkus</li>
                <li>• 8+ Stunden Dauerbetrieb</li>
                <li>• Kühlung bis -5°C ohne Netzstrom</li>
                <li>• Lautlos (keine Generatoren)</li>
              </ul>
            </div>

            <div className='bg-navy-light flex h-full flex-col rounded-xl border border-black/10 p-8'>
              <div className='mb-8 text-4xl'>💧</div>
              <h3 className='mb-0 text-xl font-bold text-gray-900'>Wasserloses System</h3>
              <ul className='space-y-0 text-sm text-gray-600'>
                <li>• Integrierter 20L-Frischwassertank</li>
                <li>• Geschlossenes Abwassersystem</li>
                <li>• Hochdruck-Spültechnik</li>
                <li>• 95% weniger Wasserverbrauch</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Cost Savings Section */}
        <section className='mb-16'>
          <h2 className='mb-8 text-3xl font-bold text-gray-900'>
            So viel sparen Sie an Infrastrukturkosten
          </h2>

          <div className='mb-8 overflow-hidden rounded-xl border border-gray-200 shadow-sm'>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-gray-50'>
                <tr>
                  <th
                    scope='col'
                    className='px-8 py-8 text-left text-xs font-medium tracking-wider text-gray-500 uppercase'
                  >
                    Infrastruktur
                  </th>
                  <th
                    scope='col'
                    className='px-8 py-8 text-left text-xs font-medium tracking-wider text-gray-500 uppercase'
                  >
                    Messe München
                  </th>
                  <th
                    scope='col'
                    className='px-8 py-8 text-left text-xs font-medium tracking-wider text-gray-500 uppercase'
                  >
                    Outdoor-Location
                  </th>
                  <th
                    scope='col'
                    className='text-accent-primary px-8 py-8 text-left text-xs font-bold font-medium tracking-wider uppercase'
                  >
                    Mit Velo.Bar
                  </th>
                </tr>
              </thead>
              <tbody className='bg-navy-light divide-y divide-white/10'>
                <tr>
                  <td className='px-8 py-8 text-sm font-medium text-gray-900'>Stromanschluss</td>
                  <td className='px-8 py-8 text-sm text-gray-600'>€150–€300</td>
                  <td className='px-8 py-8 text-sm text-gray-600'>€200–€500 (Generator)</td>
                  <td className='text-accent-primary px-8 py-8 text-sm font-medium'>€0 ✓</td>
                </tr>
                <tr className='bg-gray-50'>
                  <td className='px-8 py-8 text-sm font-medium text-gray-900'>Wasseranschluss</td>
                  <td className='px-8 py-8 text-sm text-gray-600'>€200–€350</td>
                  <td className='px-8 py-8 text-sm text-gray-600'>€100–€200 (Tanks)</td>
                  <td className='text-accent-primary px-8 py-8 text-sm font-medium'>€0 ✓</td>
                </tr>
                <tr>
                  <td className='px-8 py-8 text-sm font-medium text-gray-900'>
                    Verlängerungskabel
                  </td>
                  <td className='px-8 py-8 text-sm text-gray-600'>€50–€100</td>
                  <td className='px-8 py-8 text-sm text-gray-600'>€50–€100</td>
                  <td className='text-accent-primary px-8 py-8 text-sm font-medium'>€0 ✓</td>
                </tr>
                <tr className='bg-accent-primary/10 font-bold'>
                  <td className='px-8 py-8 text-sm text-gray-900'>Gesamt gespart</td>
                  <td className='text-accent-primary px-8 py-8 text-sm'>€400–€750</td>
                  <td className='text-accent-primary px-8 py-8 text-sm'>€350–€800</td>
                  <td className='text-accent-primary px-8 py-8 text-sm'>Bereits inklusive</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className='rounded-r-lg border-l-4 border-emerald-500 bg-emerald-50 p-8'>
            <div className='flex items-start gap-0'>
              <span className='text-xl text-emerald-500'>💡</span>
              <div>
                <h4 className='mb-0 font-bold text-emerald-900'>Rechenbeispiel BAUMA</h4>
                <p className='text-sm text-emerald-800'>
                  Bei einem 5-Tage-Messeauftritt auf der BAUMA sparen Sie mit einer autarken Bar bis
                  zu <strong>€2.000–€3.000</strong> an Infrastrukturkosten – das ist oft mehr als
                  die Hälfte unseres Service-Preises.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className='mb-16'>
          <h2 className='mb-8 text-3xl font-bold text-gray-900'>Perfekt für diese Situationen</h2>

          <div className='space-y-8'>
            <div className='flex items-start gap-8 rounded-xl border border-gray-200 bg-gray-50 p-8'>
              <span className='text-3xl'>🏛️</span>
              <div>
                <h3 className='mb-0 text-xl font-bold text-gray-900'>Messe-Standpartys</h3>
                <p className='text-gray-600'>
                  Steckdosen sind auf Messen Mangelware und teuer. Die Velo.Bar funktioniert
                  komplett unabhängig – ideal für <strong>BAUMA</strong>, <strong>ISPO</strong>,
                  <strong>EXPO REAL</strong> und alle Münchner Messen.
                </p>
              </div>
            </div>

            <div className='flex items-start gap-8 rounded-xl border border-gray-200 bg-gray-50 p-8'>
              <span className='text-3xl'>🌳</span>
              <div>
                <h3 className='mb-0 text-xl font-bold text-gray-900'>Outdoor-Firmenevents</h3>
                <p className='text-gray-600'>
                  Sommerfeste im Park, Betriebsausflüge am See, Teamevents in der Natur – überall
                  dort, wo es keine Steckdosen gibt.
                </p>
              </div>
            </div>

            <div className='flex items-start gap-8 rounded-xl border border-gray-200 bg-gray-50 p-8'>
              <span className='text-3xl'>🏰</span>
              <div>
                <h3 className='mb-0 text-xl font-bold text-gray-900'>Historische Locations</h3>
                <p className='text-gray-600'>
                  Schlösser, Burgen und denkmalgeschützte Gebäude haben oft eingeschränkte
                  Stromanschlüsse. Autarke Systeme sind hier die einzige Lösung.
                </p>
              </div>
            </div>

            <div className='flex items-start gap-8 rounded-xl border border-gray-200 bg-gray-50 p-8'>
              <span className='text-3xl'>🏢</span>
              <div>
                <h3 className='mb-0 text-xl font-bold text-gray-900'>Büro-Lobbys & Rooftops</h3>
                <p className='text-gray-600'>
                  Pop-up-Events in Firmengebäuden, wo Catering-Infrastruktur fehlt. Perfekt für
                  After-Work-Events und Kundenempfänge.
                </p>
              </div>
            </div>

            <div className='flex items-start gap-8 rounded-xl border border-gray-200 bg-gray-50 p-8'>
              <span className='text-3xl'>🚗</span>
              <div>
                <h3 className='mb-0 text-xl font-bold text-gray-900'>Roadshows & Promotions</h3>
                <p className='text-gray-600'>
                  Produkteinführungen, Brand-Aktivierungen, Sampling-Aktionen – überall dort, wo
                  schneller Auf- und Abbau gefragt ist.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Details */}
        <section className='mb-16'>
          <h2 className='mb-8 text-3xl font-bold text-gray-900'>
            Technische Details: So funktioniert's
          </h2>

          <div className='rounded-2xl bg-linear-to-br from-gray-900 to-gray-800 p-8 text-white'>
            <div className='grid gap-8 md:grid-cols-2'>
              <div>
                <h3 className='text-accent-primary mb-8 text-lg font-bold'>🔋 Stromversorgung</h3>
                <ul className='space-y-0 text-sm text-gray-300'>
                  <li className='flex items-start gap-0'>
                    <span className='text-accent-primary'>→</span>
                    2x 48V Lithium-Eisenphosphat-Akkus
                  </li>
                  <li className='flex items-start gap-0'>
                    <span className='text-accent-primary'>→</span>
                    2.400 Wh Gesamtkapazität
                  </li>
                  <li className='flex items-start gap-0'>
                    <span className='text-accent-primary'>→</span>
                    Versorgt: LED-Beleuchtung, Kühlung, USB-Ladegeräte
                  </li>
                  <li className='flex items-start gap-0'>
                    <span className='text-accent-primary'>→</span>
                    Ladezeit: 4 Stunden (über Nacht)
                  </li>
                </ul>
              </div>

              <div>
                <h3 className='mb-8 text-lg font-bold text-cyan-400'>💧 Wassersystem</h3>
                <ul className='space-y-0 text-sm text-gray-300'>
                  <li className='flex items-start gap-0'>
                    <span className='text-cyan-400'>→</span>
                    20L integrierter Frischwassertank
                  </li>
                  <li className='flex items-start gap-0'>
                    <span className='text-cyan-400'>→</span>
                    25L geschlossener Abwassertank
                  </li>
                  <li className='flex items-start gap-0'>
                    <span className='text-cyan-400'>→</span>
                    Hochdruck-Handspüler (wie in Restaurants)
                  </li>
                  <li className='flex items-start gap-0'>
                    <span className='text-cyan-400'>→</span>
                    Reicht für 150–200 Drinks/Tag
                  </li>
                </ul>
              </div>
            </div>

            <div className='mt-8 border-t border-gray-700 pt-8'>
              <h3 className='mb-8 text-lg font-bold text-emerald-400'>❄️ Kühlung</h3>
              <div className='grid gap-8 text-sm text-gray-300 md:grid-cols-3'>
                <div>
                  <span className='font-bold text-emerald-400'>Kompressor-Kühlbox:</span>
                  <p>Hält Spirits & Mixer bei 4°C</p>
                </div>
                <div>
                  <span className='font-bold text-emerald-400'>Eis-Isolation:</span>
                  <p>40L Eiswürfel-Kapazität</p>
                </div>
                <div>
                  <span className='font-bold text-emerald-400'>Thermocontainer:</span>
                  <p>Für Backup-Vorräte</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className='mb-16'>
          <h2 className='mb-8 text-3xl font-bold text-gray-900'>Häufige Fragen</h2>

          <div className='space-y-8'>
            <div className='rounded-lg border border-gray-200 p-8'>
              <h3 className='mb-0 font-bold text-gray-900'>
                Was passiert, wenn der Akku leer wird?
              </h3>
              <p className='text-sm text-gray-600'>
                Bei Events über 8 Stunden bringen wir Ersatz-Akkus mit. Der Wechsel dauert unter 2
                Minuten – Ihre Gäste merken nichts.
              </p>
            </div>

            <div className='rounded-lg border border-gray-200 p-8'>
              <h3 className='mb-0 font-bold text-gray-900'>Kann man auch warme Getränke machen?</h3>
              <p className='text-sm text-gray-600'>
                Ja! Für Glühwein und Hot Cocktails nutzen wir einen separaten Gas-Wärmer (auch
                autark) oder bringen vorgewärmte Thermoscontainer mit.
              </p>
            </div>

            <div className='rounded-lg border border-gray-200 p-8'>
              <h3 className='mb-0 font-bold text-gray-900'>
                Braucht man trotzdem eine Genehmigung?
              </h3>
              <p className='text-sm text-gray-600'>
                Das hängt von der Location ab. Auf öffentlichem Grund ist oft eine
                Sondernutzungserlaubnis nötig. Wir beraten Sie gerne und helfen bei der
                Antragstellung.
              </p>
            </div>

            <div className='rounded-lg border border-gray-200 p-8'>
              <h3 className='mb-0 font-bold text-gray-900'>Wie leise ist das System?</h3>
              <p className='text-sm text-gray-600'>
                Komplett lautlos. Keine Generatoren, keine lauten Kompressoren. Perfekt für
                Networking-Events, wo Gespräche im Vordergrund stehen.
              </p>
            </div>
          </div>
        </section>

        {/* Internal Links */}
        <section className='mb-16'>
          <h2 className='mb-8 text-2xl font-bold text-gray-900'>Weiterführende Artikel</h2>
          <div className='grid gap-8 md:grid-cols-2'>
            <Link
              to='/blog/messecatering-kosten-2025'
              className='hover:border-accent-primary block flex h-full flex-col rounded-xl border border-gray-200 bg-gray-50 p-8 transition duration-200 ease-out hover:shadow-md'
            >
              <h3 className='mb-0 font-bold text-gray-900'>💰 Messecatering-Kosten 2025</h3>
              <p className='text-sm text-gray-600'>Transparente Preise für Münchner Messen.</p>
            </Link>
            <Link
              to='/blog/nachhaltige-firmenfeier'
              className='hover:border-accent-primary block flex h-full flex-col rounded-xl border border-gray-200 bg-gray-50 p-8 transition duration-200 ease-out hover:shadow-md'
            >
              <h3 className='mb-0 font-bold text-gray-900'>🌱 Nachhaltige Events</h3>
              <p className='text-sm text-gray-600'>
                Zero-Waste Catering für ESG-bewusste Unternehmen.
              </p>
            </Link>
          </div>
        </section>

        {/* Success Stories */}
        <SuccessStories variant='compact' className='mb-16' />

        {/* CTA Section */}
        <section className='bg-accent-primary rounded-2xl p-8 text-center text-white md:p-16'>
          <h2 className='mb-8 text-3xl font-bold'>Keine Steckdose? Kein Problem.</h2>
          <p className='mx-auto mb-8 max-w-2xl text-lg opacity-90'>
            Erzählen Sie uns von Ihrer Location – wir finden eine Lösung, die funktioniert.
          </p>
          <div className='flex flex-col justify-center gap-8 sm:flex-row'>
            <Link to='/anfrage?source=autark-blog'>
              <Button
                size='lg'
                className='text-accent-primary border-none bg-white transition duration-200 ease-out hover:bg-gray-100'
              >
                Standort-Check anfragen
              </Button>
            </Link>
            <Link to='/messe-catering'>
              <Button
                size='lg'
                variant='outline'
                className='border-white text-white transition duration-200 ease-out hover:bg-white/10'
              >
                Messe-Catering entdecken
              </Button>
            </Link>
          </div>
        </section>
      </Section>
      </PageTemplate>
    </SiteBackground>
  );
};

export default CateringOhneStromanschlussPage;
