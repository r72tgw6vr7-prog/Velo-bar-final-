import React from 'react';
import { PageTemplate } from '@/templates/PageTemplate.tsx';
import { Button } from '@/components/atoms/Button/Button.tsx';
import { Link } from 'react-router-dom';
import { SuccessStories } from '@/components/organisms/SuccessStories/SuccessStories.tsx';
import { Section } from '@/components/atoms/index.ts';

const ROIHospitalityEventsPage: React.FC = () => {
  // JSON-LD Schema for BlogPosting
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Lohnt sich das? So messen Sie den ROI Ihrer Event-Bar',
    description:
      'Warum Hospitality keine Kostenstelle ist: Lernen Sie, wie Sie den ROI Ihrer mobilen Bar mit Cost Per Lead (CPL) und Verweildauer-Metriken berechnen.',
    image: 'https://velo-bar.com/assets/backgrounds/cosmic-unified.jpg',
    author: {
      '@type': 'Organization',
      name: 'Velo.Bar',
      url: 'https://velo-bar.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Velo.Bar',
      logo: {
        '@type': 'ImageObject',
        url: 'https://velo-bar.com/assets/logo.png',
      },
    },
    datePublished: '2025-01-20',
    dateModified: '2025-12-08',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://velo-bar.com/blog/roi-hospitality-events',
    },
    keywords: [
      'ROI Event Bar',
      'Cost Per Lead Messe',
      'Hospitality ROI',
      'Event Marketing München',
      'Mobile Bar Kosten',
    ],
  };

  return (
    <PageTemplate
      title='Lohnt sich das? So messen Sie den ROI Ihrer Event-Bar | Velo.Bar'
      description='Warum Hospitality keine Kostenstelle ist: Lernen Sie, wie Sie den ROI Ihrer mobilen Bar mit Cost Per Lead und Verweildauer-Metriken berechnen.'
      canonicalPath='/blog/roi-hospitality-events'
      structuredData={schemaData}
      withContainer={false}
      className='bg-navy'
    >
      <Section
        container='narrow'
        spacing='xl'
        className='bg-navy-primary relative overflow-hidden text-white'
      >
        <div className='absolute inset-0 z-0 opacity-20'>
          <div className='absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(99,102,241,0.3),transparent_50%)]' />
        </div>
        <div className='relative z-10 text-center'>
          <span className='bg-accent-primary/20 border-accent-primary/30 text-accent-primary mb-8 inline-block rounded-full border px-0 py-0 text-sm font-semibold'>
            Blog · ROI & Strategie
          </span>
          <h1 className='mb-8 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl'>
            Lohnt sich das? <br className='hidden sm:block' />
            <span className='text-accent-primary'>So messen Sie den ROI Ihrer Event-Bar</span>
          </h1>
          <p className='mx-auto max-w-2xl text-xl text-gray-300'>
            Warum Hospitality keine Kostenstelle ist – und wie Sie den tatsächlichen Wert Ihrer
            Bar-Investition berechnen.
          </p>
        </div>
      </Section>

      <Section container='constrained' spacing='xl'>
        {/* Key Takeaways Box */}
        <div className='bg-accent-primary/10 border-accent-primary/20 mb-16 rounded-2xl border p-8 shadow-sm'>
          <div className='mb-8 flex items-center gap-0'>
            <span className='text-2xl'>🎯</span>
            <h2 className='text-on-light text-xl font-bold'>Key Takeaways</h2>
          </div>
          <ul className='text-on-light/80 space-y-0'>
            <li className='flex items-start gap-0'>
              <span className='text-accent-primary mt-0.5 font-bold'>1.</span>
              <span>
                Eine mobile Bar ist kein Kostenfaktor – sondern ein{' '}
                <strong>Lead-Generation-Tool</strong> mit messbarem ROI.
              </span>
            </li>
            <li className='flex items-start gap-0'>
              <span className='text-accent-primary mt-0.5 font-bold'>2.</span>
              <span>
                <strong>Cost Per Lead (CPL)</strong> und <strong>Time on Booth</strong> sind die
                entscheidenden Metriken.
              </span>
            </li>
            <li className='flex items-start gap-0'>
              <span className='text-accent-primary mt-0.5 font-bold'>3.</span>
              <span>
                1.500€ für eine Bar generiert 20+ qualifizierte Leads – Broschüren für 1.500€ landen
                im Papierkorb.
              </span>
            </li>
            <li className='flex items-start gap-0'>
              <span className='text-accent-primary mt-0.5 font-bold'>4.</span>
              <span>
                Beispielrechnung: 20 Leads × 500€ Lead Value ={' '}
                <strong>10.000€ generierter Wert</strong>.
              </span>
            </li>
          </ul>
        </div>

        {/* Introduction */}
        <Section container='constrained' spacing='xl'>
          <h2 className='mb-8 text-3xl font-bold text-gray-900'>
            Das Problem: Hospitality als „Kostenstelle"
          </h2>
          <p className='leading-relaxed text-gray-600'>
            In vielen Unternehmen wird das Event-Budget für Catering und Hospitality als notwendiges
            Übel betrachtet.
            <em>„Wir müssen halt was anbieten"</em> – diese Haltung führt dazu, dass Budgets gekürzt
            werden, sobald es irgendwo eng wird.
          </p>
          <p className='leading-relaxed text-gray-600'>
            Das Problem? Diese Sichtweise ignoriert komplett,{' '}
            <strong>was eine gut geplante Bar tatsächlich leistet</strong>: Sie ist kein
            Kostenfaktor, sondern ein hocheffektives Werkzeug zur Lead-Generierung und
            Markenbildung.
          </p>
        </Section>

        {/* Section: Die richtigen Metriken */}
        <Section container='constrained' spacing='xl'>
          <h2 className='mb-8 text-3xl font-bold text-gray-900'>
            Die richtigen Metriken: CPL & Time on Booth
          </h2>
          <div className='prose prose-lg mb-8 text-gray-600'>
            <p>
              Um den ROI Ihrer Event-Bar zu messen, brauchen Sie die richtigen KPIs. Vergessen Sie
              „Kosten pro Drink" – das ist die falsche Perspektive.
            </p>
          </div>

          <div className='mb-8 grid gap-8 md:grid-cols-2'>
            {/* Metric 1: CPL */}
            <div className='bg-navy-light flex h-full flex-col rounded-xl border border-white/10 p-8 shadow-sm transition-shadow duration-200 ease-out hover:shadow-md'>
              <div className='mb-8 flex items-center gap-0'>
                <div className='flex h-full flex-col rounded-lg bg-green-100 p-0'>
                  <span className='text-2xl'>💰</span>
                </div>
                <h3 className='text-xl font-bold text-gray-900'>Cost Per Lead (CPL)</h3>
              </div>
              <p className='text-sm leading-relaxed text-gray-600'>
                Wie viel kostet Sie ein qualifizierter Kontakt? Teilen Sie Ihr Bar-Investment durch
                die Anzahl der Gespräche, die zu echten CRM-Einträgen führen.
              </p>
              <div className='mt-8 flex h-full flex-col rounded-lg bg-gray-50 p-0'>
                <p className='font-mono text-sm text-gray-700'>
                  CPL = Bar-Kosten ÷ qualifizierte Leads
                </p>
              </div>
            </div>

            {/* Metric 2: Time on Booth */}
            <div className='bg-navy-light flex h-full flex-col rounded-xl border border-white/10 p-8 shadow-sm transition-shadow duration-200 ease-out hover:shadow-md'>
              <div className='mb-8 flex items-center gap-0'>
                <div className='bg-accent-primary/10 flex h-full flex-col rounded-lg p-0'>
                  <span className='text-2xl'>⏱️</span>
                </div>
                <h3 className='text-xl font-bold text-gray-900'>Time on Booth (Verweildauer)</h3>
              </div>
              <p className='text-sm leading-relaxed text-gray-600'>
                Ohne Hospitality: &lt;60 Sekunden. Mit Bar: 5–10 Minuten. Diese Zeit entscheidet, ob
                aus einem Blickkontakt ein Geschäftsgespräch wird.
              </p>
              <div className='mt-8 flex h-full flex-col rounded-lg bg-gray-50 p-0'>
                <p className='font-mono text-sm text-gray-700'>
                  +500% Verweildauer = +500% Gesprächsqualität
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* Section: Der Vergleich */}
        <Section container='constrained' spacing='xl'>
          <h2 className='mb-8 text-3xl font-bold text-gray-900'>
            1.500€ Bar vs. 1.500€ Broschüren
          </h2>
          <div className='prose prose-lg mb-8 text-gray-600'>
            <p>Stellen Sie sich vor, Sie haben 1.500€ Budget. Zwei Optionen:</p>
          </div>

          <div className='mb-8 overflow-hidden rounded-xl border border-gray-200 shadow-sm'>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-gray-50'>
                <tr>
                  <th
                    scope='col'
                    className='px-8 py-8 text-left text-sm font-semibold tracking-wider text-gray-500 uppercase'
                  >
                    Investment
                  </th>
                  <th
                    scope='col'
                    className='px-8 py-8 text-left text-sm font-semibold tracking-wider text-gray-500 uppercase'
                  >
                    1.500€ Broschüren
                  </th>
                  <th
                    scope='col'
                    className='text-accent-primary px-8 py-8 text-left text-sm font-semibold tracking-wider uppercase'
                  >
                    1.500€ Mobile Bar
                  </th>
                </tr>
              </thead>
              <tbody className='bg-navy-light divide-y divide-white/10'>
                <tr>
                  <td className='px-8 py-8 text-sm font-medium text-gray-900'>Interaktion</td>
                  <td className='px-8 py-8 text-sm text-gray-500'>Passiv (nimmt man mit)</td>
                  <td className='px-8 py-8 text-sm font-medium text-gray-900'>
                    Aktiv (erzeugt Gespräche)
                  </td>
                </tr>
                <tr>
                  <td className='px-8 py-8 text-sm font-medium text-gray-900'>Verweildauer</td>
                  <td className='px-8 py-8 text-sm text-gray-500'>0 Sekunden</td>
                  <td className='px-8 py-8 text-sm font-medium text-gray-900'>5–10 Minuten</td>
                </tr>
                <tr>
                  <td className='px-8 py-8 text-sm font-medium text-gray-900'>
                    Qualifizierte Leads
                  </td>
                  <td className='px-8 py-8 text-sm text-gray-500'>~0 (untrackbar)</td>
                  <td className='px-8 py-8 text-sm font-medium text-gray-900'>20+ pro Event</td>
                </tr>
                <tr>
                  <td className='px-8 py-8 text-sm font-medium text-gray-900'>Wo landet es?</td>
                  <td className='px-8 py-8 text-sm text-red-500'>🗑️ Im Papierkorb</td>
                  <td className='px-8 py-8 text-sm font-medium text-green-600'>✓ Im CRM</td>
                </tr>
                <tr className='bg-accent-primary/10'>
                  <td className='px-8 py-8 text-sm font-bold text-gray-900'>ROI</td>
                  <td className='px-8 py-8 text-sm text-gray-500'>Nicht messbar</td>
                  <td className='text-accent-primary px-8 py-8 text-sm font-bold'>
                    ~667% (siehe Berechnung)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Pro Tip */}
          <div className='rounded-r-xl border-l-4 border-amber-400 bg-amber-50 p-8'>
            <div className='flex items-start gap-0'>
              <span className='text-xl'>💡</span>
              <div>
                <p className='font-medium text-amber-900'>
                  <strong>Realität auf Messen:</strong> 80% aller gedruckten Materialien werden noch
                  am selben Tag entsorgt. Ein Signature Drink bleibt im Kopf – und Ihr Sales-Team
                  hat Zeit für echte Gespräche.
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* Section: ROI Berechnung */}
        <Section container='constrained' spacing='xl'>
          <h2 className='mb-8 text-3xl font-bold text-gray-900'>
            Die ROI-Berechnung: Ein konkretes Beispiel
          </h2>

          <div className='bg-accent-primary text-navy-dark mb-8 rounded-2xl p-6 shadow-lg md:p-8'>
            <h3 className='mb-8 text-center text-2xl font-bold'>
              Beispiel: Messeauftritt mit mobiler Bar
            </h3>

            <div className='mb-8 space-y-8'>
              <div className='flex items-center justify-between border-b border-white/20 py-0'>
                <span className='text-navy-dark/80'>Investment (Bar, Personal, Getränke)</span>
                <span className='text-xl font-bold'>1.500€</span>
              </div>
              <div className='flex items-center justify-between border-b border-white/20 py-0'>
                <span className='text-navy-dark/80'>Zusätzliche qualifizierte Leads</span>
                <span className='text-xl font-bold'>20 Leads</span>
              </div>
              <div className='flex items-center justify-between border-b border-white/20 py-0'>
                <span className='text-navy-dark/80'>Durchschnittlicher Lead Value (B2B)</span>
                <span className='text-xl font-bold'>500€</span>
              </div>
            </div>

            <div className='rounded-xl bg-white/10 p-8 text-center'>
              <p className='text-navy-dark/80 mb-0'>Generierter Wert</p>
              <p className='text-4xl font-bold md:text-5xl'>10.000€</p>
              <p className='text-navy-dark/70 mt-0'>= 20 Leads × 500€ Lead Value</p>
            </div>

            <div className='mt-8 text-center'>
              <p className='text-xl'>
                <span className='text-navy-dark/70'>ROI: </span>
                <span className='font-bold text-green-300'>(10.000€ - 1.500€) ÷ 1.500€ = 567%</span>
              </p>
            </div>
          </div>

          <div className='prose prose-lg text-gray-600'>
            <p>
              Diese Rechnung ist konservativ. In der Praxis haben viele unserer Kunden einen
              deutlich höheren Lead Value – gerade im B2B-Bereich, wo ein einziger Neukunde oft
              fünfstellige Lifetime Values hat.
            </p>
          </div>
        </Section>

        {/* Client Logos - Social Proof */}
        <SuccessStories variant='logos-only' className='mb-16' />

        {/* Internal Links Section */}
        <Section container='constrained' spacing='xl'>
          <h2 className='mb-8 text-3xl font-bold text-gray-900'>Weiterführende Ressourcen</h2>

          <div className='grid gap-8 md:grid-cols-2'>
            {/* Link to Pillar Page */}
            <Link
              to='/resources/corporate-event-catering-guide'
              className='group bg-navy-light hover:border-accent-primary block flex h-full flex-col rounded-xl border border-white/10 p-8 transition-all duration-200 ease-out hover:shadow-lg'
            >
              <div className='mb-0 flex items-center gap-0'>
                <span className='text-2xl'>📘</span>
                <span className='text-accent-primary text-xs font-semibold tracking-wide uppercase'>
                  Pillar Guide
                </span>
              </div>
              <h3 className='group-hover:text-accent-primary mb-0 text-lg font-bold text-gray-900 transition transition-colors duration-200 ease-out'>
                Corporate Event Catering & Beverage Logistics Guide 2025
              </h3>
              <p className='text-sm text-gray-600'>
                Der umfassende Leitfaden für Event Manager in München: Logistik, Menü-Engineering
                und mehr.
              </p>
            </Link>

            {/* Link to Firmenfeiern */}
            <Link
              to='/firmenfeiern'
              className='group bg-navy-light hover:border-accent-primary block flex h-full flex-col rounded-xl border border-white/10 p-8 transition transition-all duration-200 ease-out hover:shadow-lg'
            >
              <div className='mb-0 flex items-center gap-0'>
                <span className='text-2xl'>🎉</span>
                <span className='text-accent-primary text-xs font-semibold tracking-wide uppercase'>
                  Service
                </span>
              </div>
              <h3 className='group-hover:text-accent-primary mb-0 text-lg font-bold text-gray-900 transition transition-colors duration-200 ease-out'>
                Mobile Cocktailbar für Firmenfeiern
              </h3>
              <p className='text-sm text-gray-600'>
                Entdecken Sie unsere Pakete für Firmenfeiern, Sommerfeste und Weihnachtsfeiern.
              </p>
            </Link>
          </div>
        </Section>

        {/* CTA Section */}
        <Section container='constrained' spacing='xl'>
          <h2 className='mb-8 text-3xl font-bold text-gray-900'>
            Bereit, Ihren Event-ROI zu maximieren?
          </h2>
          <p className='mx-auto mb-8 max-w-2xl text-lg text-gray-300'>
            Lassen Sie uns gemeinsam berechnen, welchen Wert eine mobile Bar für Ihr nächstes Event
            generieren kann.
          </p>
          <div className='flex flex-col justify-center gap-8 sm:flex-row'>
            <Link to='/anfrage?source=roi-blog'>
              <Button
                size='lg'
                variant='primary'
                className='bg-accent-primary hover:bg-accent-primary-hover border-none transition duration-200 ease-out'
              >
                ROI-Beratung anfragen
              </Button>
            </Link>
            <Link to='/preise'>
              <Button
                size='lg'
                variant='outline'
                className='border-white text-white transition duration-200 ease-out hover:bg-white/10'
              >
                Pakete & Preise ansehen
              </Button>
            </Link>
          </div>
        </Section>
      </Section>
    </PageTemplate>
  );
};

export default ROIHospitalityEventsPage;
