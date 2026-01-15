import React from 'react';
import { PageTemplate } from '@/templates/PageTemplate.tsx';
import { SiteBackground } from '@/components/layout/SiteBackground';
import { Button } from '@/components/atoms/Button/Button.tsx';
import { Link } from 'react-router-dom';
import { SITE_URL } from '@/lib/site.ts';
import { SuccessStories } from '@/components/organisms/SuccessStories/SuccessStories.tsx';
import { Section } from '@/components/atoms/index.ts';

const LastMinuteCateringPage: React.FC = () => {
  // JSON-LD Schema for BlogPosting
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Last-Minute Catering München: Schnelle Hilfe für Event-Notfälle',
    description:
      'Event in 1-2 Wochen und noch kein Catering? So finden Sie kurzfristig professionellen Bar-Service in München – auch bei Absagen.',
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
    datePublished: '2025-03-10',
    dateModified: '2025-12-08',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/last-minute-catering-muenchen`,
    },
    keywords: [
      'Last-Minute Catering München',
      'kurzfristiges Catering',
      'Event Notfall Catering',
      'schnelles Messecatering',
      'Catering Absage',
    ],
  };

  return (
    <SiteBackground>
      <PageTemplate
        title='Last-Minute Catering München: Schnelle Hilfe für Event-Notfälle | Velo.Bar'
        description='Event in 1-2 Wochen und noch kein Catering? Schnelle, professionelle Bar-Services in München – auch bei kurzfristigen Anfragen.'
        canonicalPath='/blog/last-minute-catering-muenchen'
        structuredData={schemaData}
        withContainer={false}
        background='transparent'
      >
        <Section
          container='narrow'
          spacing='xl'
          className='bg-navy-primary relative overflow-hidden text-white'
        >
        <div className='absolute inset-0 z-0 opacity-20'>
          <div className='absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(251,146,60,0.4),transparent_50%)]' />
        </div>
        <div className='relative z-10 text-center'>
          <span className='bg-accent-primary/20 border-accent-primary/30 text-accent-primary mb-8 inline-block rounded-full border px-0 py-0 text-sm font-semibold'>
            Blog · Notfall-Planung
          </span>
          <h1 className='mb-8 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl'>
            Last-Minute Catering <br className='hidden sm:block' />
            <span className='text-accent-primary'>München</span>
          </h1>
          <p className='mx-auto max-w-2xl text-xl text-white/70'>
            Event in 1-2 Wochen? Caterer abgesagt? Keine Panik – so lösen Sie es.
          </p>
        </div>
      </Section>

      <Section container='constrained' spacing='xl'>
        {/* Urgency Box */}
        <div className='bg-accent-primary/10 border-accent-primary/20 mb-16 rounded-2xl border-2 p-8 shadow-sm'>
          <div className='mb-8 flex items-center gap-0'>
            <span className='text-3xl'>🚨</span>
            <h2 className='text-on-light text-xl font-bold'>
              Ihr Event ist bald und Sie brauchen schnell Hilfe?
            </h2>
          </div>
          <p className='text-on-light/80 mb-8'>
            Wir verstehen den Stress. Rufen Sie uns an oder schreiben Sie uns – wir antworten auch
            am Wochenende innerhalb von 2 Stunden.
          </p>
          <div className='flex flex-col gap-8 sm:flex-row'>
            <Link to='/anfrage?source=lastminute-urgent'>
              <Button
                size='lg'
                className='bg-accent-primary hover:bg-accent-primary-hover text-navy-dark w-full border-none transition duration-200 ease-out'
              >
                ⚡ Schnellanfrage starten
              </Button>
            </Link>
            <a href='tel:+4916094623196'>
              <Button
                size='lg'
                variant='outline'
                className='border-accent-primary text-accent-primary w-full'
              >
                📞 Jetzt anrufen
              </Button>
            </a>
          </div>
        </div>

        {/* Section 1: Common Scenarios */}
        <section className='mb-16'>
          <h2 className='mb-8 text-3xl font-bold text-gray-900'>
            Typische Last-Minute-Situationen
          </h2>

          <div className='space-y-8'>
            <div className='flex items-start gap-8 rounded-lg border border-gray-200 bg-gray-50 p-8'>
              <span className='text-2xl'>❌</span>
              <div>
                <h4 className='font-bold text-gray-900'>Caterer hat kurzfristig abgesagt</h4>
                <p className='text-sm text-gray-600'>
                  Personalmangel, Insolvenz, Überbuchung – passiert leider häufiger als gedacht.
                  <strong>Lösung:</strong> Mobile Bars sind flexibler und haben kürzere
                  Vorlaufzeiten.
                </p>
              </div>
            </div>

            <div className='flex items-start gap-8 rounded-lg border border-gray-200 bg-gray-50 p-8'>
              <span className='text-2xl'>📈</span>
              <div>
                <h4 className='font-bold text-gray-900'>Gästezahl hat sich verdoppelt</h4>
                <p className='text-sm text-gray-600'>
                  Der Messestand performt besser als erwartet, mehr VIPs haben zugesagt.
                  <strong>Lösung:</strong> Modulare Systeme skalieren schnell.
                </p>
              </div>
            </div>

            <div className='flex items-start gap-8 rounded-lg border border-gray-200 bg-gray-50 p-8'>
              <span className='text-2xl'>🤦</span>
              <div>
                <h4 className='font-bold text-gray-900'>Catering vergessen zu buchen</h4>
                <p className='text-sm text-gray-600'>
                  Kommt vor – besonders bei spontanen Teammeetings oder kurzfristig angesetzten
                  Events.
                  <strong>Lösung:</strong> Wir brauchen oft nur 48-72 Stunden Vorlauf.
                </p>
              </div>
            </div>

            <div className='flex items-start gap-8 rounded-lg border border-gray-200 bg-gray-50 p-8'>
              <span className='text-2xl'>🏗️</span>
              <div>
                <h4 className='font-bold text-gray-900'>
                  Location-Einschränkungen erst spät bekannt
                </h4>
                <p className='text-sm text-gray-600'>
                  Kein Stromanschluss, kein Wasser, wenig Platz.
                  <strong>Lösung:</strong> Unsere autarke Fahrrad-Bar funktioniert überall.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className='mb-16'>
          <h2 className='mb-8 text-3xl font-bold text-gray-900'>Unsere Reaktionszeiten</h2>

          <div className='rounded-2xl bg-linear-to-br from-gray-900 to-gray-800 p-8 text-white'>
            <div className='space-y-8'>
              <div className='flex items-center gap-8 border-b border-gray-700 pb-8'>
                <div className='min-w-[80px] text-center'>
                  <div className='text-3xl font-bold text-green-400'>2h</div>
                  <div className='text-xs text-gray-400'>Antwort</div>
                </div>
                <div>
                  <h4 className='font-bold text-white'>Erste Rückmeldung</h4>
                  <p className='text-sm text-gray-300'>Auch am Wochenende und Feiertagen.</p>
                </div>
              </div>

              <div className='flex items-center gap-8 border-b border-gray-700 pb-8'>
                <div className='min-w-[80px] text-center'>
                  <div className='text-accent-primary text-3xl font-bold'>24h</div>
                  <div className='text-xs text-gray-400'>Angebot</div>
                </div>
                <div>
                  <h4 className='font-bold text-white'>Individuelles Angebot</h4>
                  <p className='text-sm text-gray-300'>Mit Menüvorschlägen und Logistik-Check.</p>
                </div>
              </div>

              <div className='flex items-center gap-8 border-b border-gray-700 pb-8'>
                <div className='min-w-[80px] text-center'>
                  <div className='text-3xl font-bold text-orange-400'>48h</div>
                  <div className='text-xs text-gray-400'>Minimum</div>
                </div>
                <div>
                  <h4 className='font-bold text-white'>Schnellste Buchung</h4>
                  <p className='text-sm text-gray-300'>
                    Bei Verfügbarkeit und Standardmenü möglich.
                  </p>
                </div>
              </div>

              <div className='flex items-center gap-8'>
                <div className='min-w-[80px] text-center'>
                  <div className='text-3xl font-bold text-emerald-400'>1-2 Wo</div>
                  <div className='text-xs text-gray-400'>Empfohlen</div>
                </div>
                <div>
                  <h4 className='font-bold text-white'>Ideale Vorlaufzeit</h4>
                  <p className='text-sm text-gray-300'>
                    Für Custom-Menüs und Branding-Integration.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why We Can Help */}
        <section className='mb-16'>
          <h2 className='mb-8 text-3xl font-bold text-gray-900'>
            Warum wir schneller sind als klassische Caterer
          </h2>

          <div className='grid gap-8 md:grid-cols-2'>
            <div className='flex h-full flex-col rounded-xl bg-orange-50 p-8'>
              <h3 className='mb-0 font-bold text-gray-900'>🚴 Kompaktes System</h3>
              <p className='text-sm text-gray-600'>
                Keine LKW-Logistik, keine schweren Geräte. Die Velo.Bar passt durch jede Tür und ist
                in 30 Minuten aufgebaut.
              </p>
            </div>

            <div className='flex h-full flex-col rounded-xl bg-orange-50 p-8'>
              <h3 className='mb-0 font-bold text-gray-900'>📦 Lager vor Ort</h3>
              <p className='text-sm text-gray-600'>
                Alle Spirituosen, Mixer und Equipment lagern in München. Keine langen Lieferketten,
                keine Beschaffungszeiten.
              </p>
            </div>

            <div className='flex h-full flex-col rounded-xl bg-orange-50 p-8'>
              <h3 className='mb-0 font-bold text-gray-900'>👨‍🍳 Feste Barkeeper-Teams</h3>
              <p className='text-sm text-gray-600'>
                Kein Freelancer-Hunting. Unsere festangestellten Barkeeper sind gebrieft und
                einsatzbereit.
              </p>
            </div>

            <div className='flex h-full flex-col rounded-xl bg-orange-50 p-8'>
              <h3 className='mb-0 font-bold text-gray-900'>🔌 Keine Infrastruktur nötig</h3>
              <p className='text-sm text-gray-600'>
                Kein Stromanschluss, kein Wasser, keine Messe-Anmeldungen. Das spart Tage an
                Vorlaufzeit.
              </p>
            </div>
          </div>
        </section>

        {/* Last-Minute Checklist */}
        <section className='mb-16'>
          <h2 className='mb-8 text-3xl font-bold text-gray-900'>Ihre Last-Minute-Checkliste</h2>

          <div className='rounded-xl border border-gray-200 bg-gray-50 p-8'>
            <p className='mb-8 text-gray-600'>
              Damit wir Ihnen schnellstmöglich helfen können, bereiten Sie diese Infos vor:
            </p>

            <div className='space-y-0'>
              <label className='flex cursor-pointer items-center gap-0'>
                <input type='checkbox' className='h-5 w-5 rounded text-orange-600' />
                <span className='text-gray-700'>📅 Datum und Uhrzeit des Events</span>
              </label>
              <label className='flex cursor-pointer items-center gap-0'>
                <input type='checkbox' className='h-5 w-5 rounded text-orange-600' />
                <span className='text-gray-700'>📍 Genaue Adresse / Location</span>
              </label>
              <label className='flex cursor-pointer items-center gap-0'>
                <input type='checkbox' className='h-5 w-5 rounded text-orange-600' />
                <span className='text-gray-700'>👥 Erwartete Gästezahl</span>
              </label>
              <label className='flex cursor-pointer items-center gap-0'>
                <input type='checkbox' className='h-5 w-5 rounded text-orange-600' />
                <span className='text-gray-700'>
                  🍹 Art der Getränke (Cocktails, Longdrinks, Mocktails?)
                </span>
              </label>
              <label className='flex cursor-pointer items-center gap-0'>
                <input type='checkbox' className='h-5 w-5 rounded text-orange-600' />
                <span className='text-gray-700'>🔌 Strom-/Wasseranschluss vorhanden?</span>
              </label>
              <label className='flex cursor-pointer items-center gap-0'>
                <input type='checkbox' className='h-5 w-5 rounded text-orange-600' />
                <span className='text-gray-700'>💰 Budget-Rahmen (grob)</span>
              </label>
            </div>
          </div>
        </section>

        {/* Pricing Note */}
        <section className='mb-16'>
          <h2 className='mb-8 text-3xl font-bold text-gray-900'>
            Last-Minute-Preise: Fair & transparent
          </h2>

          <div className='prose prose-lg mb-8 text-gray-600'>
            <p>
              Keine Panik-Aufschläge. Unsere Preise bleiben auch bei kurzfristigen Buchungen stabil.
              Einzige Ausnahme: Express-Aufschlag von 15% bei unter 48 Stunden Vorlauf – für den
              zusätzlichen Organisationsaufwand.
            </p>
          </div>

          <div className='rounded-r-lg border-l-4 border-amber-400 bg-amber-50 p-8'>
            <div className='flex items-start gap-0'>
              <span className='text-xl text-amber-500'>💡</span>
              <div>
                <h4 className='mb-0 font-bold text-amber-900'>Tipp: Budget absichern</h4>
                <p className='text-sm text-amber-800'>
                  Fragen Sie nach unserem „Backup-Tarif": Gegen eine kleine Reservierungsgebühr
                  halten wir uns für Ihr Datum bereit – auch ohne finale Buchung.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Internal Links */}
        <section className='mb-16'>
          <h2 className='mb-8 text-2xl font-bold text-gray-900'>Weitere Ressourcen</h2>
          <div className='grid gap-8 md:grid-cols-2'>
            <Link
              to='/blog/messecatering-kosten-2025'
              className='block flex h-full flex-col rounded-xl border border-gray-200 bg-gray-50 p-8 transition duration-200 ease-out hover:border-orange-300 hover:shadow-md'
            >
              <h3 className='mb-0 font-bold text-gray-900'>💰 Messecatering-Kosten</h3>
              <p className='text-sm text-gray-600'>Transparente Preise für BAUMA, ISPO & Co.</p>
            </Link>
            <Link
              to='/messe-catering'
              className='block flex h-full flex-col rounded-xl border border-gray-200 bg-gray-50 p-8 transition duration-200 ease-out hover:border-orange-300 hover:shadow-md'
            >
              <h3 className='mb-0 font-bold text-gray-900'>🎯 Messe-Catering</h3>
              <p className='text-sm text-gray-600'>Alle Details zu unserem Messe-Service.</p>
            </Link>
          </div>
        </section>

        {/* Success Stories */}
        <SuccessStories variant='compact' className='mb-16' />

        {/* CTA Section */}
        <section className='rounded-2xl bg-linear-to-br from-orange-600 to-red-600 p-8 text-center text-white md:p-16'>
          <h2 className='mb-8 text-3xl font-bold'>Keine Zeit zu verlieren?</h2>
          <p className='mx-auto mb-8 max-w-2xl text-lg opacity-90'>
            Senden Sie uns jetzt Ihre Anfrage – wir melden uns innerhalb von 2 Stunden mit einer
            Lösung.
          </p>
          <div className='flex flex-col justify-center gap-8 sm:flex-row'>
            <Link to='/anfrage?source=lastminute-blog'>
              <Button
                size='lg'
                className='border-none bg-white text-orange-700 transition duration-200 ease-out hover:bg-gray-100'
              >
                ⚡ Schnellanfrage starten
              </Button>
            </Link>
            <a href='tel:+4916094623196'>
              <Button
                size='lg'
                variant='outline'
                className='border-white text-white transition duration-200 ease-out hover:bg-white/10'
              >
                📞 +49 160 94623196
              </Button>
            </a>
          </div>
        </section>
      </Section>
      </PageTemplate>
    </SiteBackground>
  );
};
export default LastMinuteCateringPage;
