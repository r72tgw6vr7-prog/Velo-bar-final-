import React from 'react';
import { PageTemplate } from '@/templates/PageTemplate.tsx';
import { Button } from '@/components/atoms/Button';
import { Link } from 'react-router-dom';
import { SuccessStories } from '@/components/organisms/SuccessStories';
import { Section } from '@/components/atoms';

// Venue data structure for programmatic SEO
export interface VenueData {
  slug: string;
  name: string;
  shortName: string;
  type: 'messe' | 'location' | 'historic' | 'corporate';
  address: string;
  district: string;
  description: string;
  highlights: string[];
  capacity: string;
  eventTypes: string[];
  challenges: string[];
  solutions: string[];
  keywords: string[];
  relatedVenues: string[];
}

// Top Munich venues for B2B events
export const venueDatabase: Record<string, VenueData> = {
  'messe-muenchen': {
    slug: 'messe-muenchen',
    name: 'Messe München',
    shortName: 'Messe München',
    type: 'messe',
    address: 'Am Messesee 2, 81829 München',
    district: 'Riem',
    description:
      'Europas größtes Messegelände mit über 200.000 m² Ausstellungsfläche. Heimat von BAUMA, ISPO, EXPO REAL und über 40 internationalen Fachmessen pro Jahr.',
    highlights: [
      'Über 40 internationale Messen pro Jahr',
      'BAUMA: 500.000+ Besucher',
      'ISPO: 80.000+ Fachbesucher',
      'EXPO REAL: 46.000+ Immobilienprofis',
      'Direkte U-Bahn-Anbindung (Messestadt West/Ost)',
    ],
    capacity: '50.000+ Besucher pro Tag',
    eventTypes: [
      'Messe-Standparty',
      'Kundenempfang',
      'Networking-Event',
      'Product Launch',
      'VIP-Lounge',
    ],
    challenges: [
      'Stromanschlüsse kosten €150-300 extra',
      'Wasseranschlüsse kosten €200-350 extra',
      'Lange Wege von Parkplätzen',
      'Kurze Auf-/Abbauzeiten',
      'Strenge Messe-Regularien',
    ],
    solutions: [
      'Autarke Bar ohne Strom-/Wasseranschluss',
      'Kompaktes Setup in 30 Minuten',
      'Lastenrad-Anlieferung direkt zum Stand',
      'Erfahrung mit Messe-Logistik seit 2018',
      'All-Inclusive-Pakete ohne versteckte Kosten',
    ],
    keywords: [
      'messe catering münchen',
      'messecatering bauma',
      'cocktailbar messestand',
      'standparty catering münchen',
    ],
    relatedVenues: ['moc-muenchen', 'icm-muenchen'],
  },
  'moc-muenchen': {
    slug: 'moc-muenchen',
    name: 'MOC Veranstaltungscenter München',
    shortName: 'MOC München',
    type: 'location',
    address: 'Lilienthalallee 40, 80939 München',
    district: 'Freimann',
    description:
      'Das MOC ist eines der größten Veranstaltungszentren Bayerns mit 85.000 m² Fläche. Heimat der München Fashion Week und zahlreicher B2B-Messen.',
    highlights: [
      '85.000 m² Veranstaltungsfläche',
      'München Fashion Week',
      'Direkter U-Bahn-Anschluss',
      'Flexible Raumkonzepte',
      'Modernste Technik-Infrastruktur',
    ],
    capacity: '20.000+ Besucher',
    eventTypes: ['Mode-Events', 'B2B-Messen', 'Produktpräsentationen', 'Galas', 'Konferenzen'],
    challenges: [
      'Große Flächen erfordern mobile Lösungen',
      'Parallele Events = hohe Auslastung',
      'Zeitdruck bei Umbauten',
    ],
    solutions: [
      'Flexible, mobile Bar-Konzepte',
      'Schneller Auf-/Abbau',
      'Unabhängig von Infrastruktur',
    ],
    keywords: ['moc catering münchen', 'eventlocation moc getränke', 'fashion week catering'],
    relatedVenues: ['messe-muenchen', 'zenith-muenchen'],
  },
  'ballhausforum-infinity': {
    slug: 'ballhausforum-infinity',
    name: 'Ballhausforum / INFINITY Munich',
    shortName: 'INFINITY Munich',
    type: 'location',
    address: 'Oberföhringer Str. 156, 81925 München',
    district: 'Bogenhausen',
    description:
      'Premium-Eventlocation mit 360°-Panoramablick über München. Ideal für exklusive Corporate Events, Produktlaunches und Gala-Dinner.',
    highlights: [
      '360° Panoramablick über München',
      'Modernes Architektur-Design',
      'Premium-Atmosphäre',
      'Flexible Raumaufteilung',
      'Technik auf höchstem Niveau',
    ],
    capacity: '500–1.500 Gäste',
    eventTypes: [
      'Gala-Dinner',
      'Product Launch',
      'Award-Verleihung',
      'Executive Meeting',
      'VIP-Event',
    ],
    challenges: [
      'Premium-Ambiente erfordert Premium-Service',
      'Hohe Erwartungen der Gäste',
      'Ästhetische Integration wichtig',
    ],
    solutions: [
      'Design-Bar passend zum Ambiente',
      'Top-geschulte Barkeeper im Anzug',
      'Signature Drinks in Corporate Design',
    ],
    keywords: ['catering ballhausforum', 'infinity munich event', 'firmenevent catering infinity'],
    relatedVenues: ['werk1-muenchen', 'zenith-muenchen'],
  },
  'werk1-muenchen': {
    slug: 'werk1-muenchen',
    name: 'Werk1 (Werksviertel-Mitte)',
    shortName: 'Werk1',
    type: 'corporate',
    address: 'Atelierstraße 29, 81671 München',
    district: 'Berg am Laim',
    description:
      'Münchens größter Startup-Hub im trendigen Werksviertel. Perfekt für Tech-Events, Startup-Pitches und innovative Corporate Gatherings.',
    highlights: [
      'Münchens größter Startup-Hub',
      'Industrieller Loft-Charakter',
      'Direkt am Ostbahnhof',
      'Rooftop-Terrasse verfügbar',
      'Kreative Atmosphäre',
    ],
    capacity: '200–800 Gäste',
    eventTypes: ['Startup-Event', 'Tech-Konferenz', 'Pitch Night', 'Team-Event', 'After-Work'],
    challenges: [
      'Industrieller Charakter = variable Infrastruktur',
      'Junges Publikum = hohe Drink-Frequenz',
      'Kreatives Ambiente = kreative Drinks erwartet',
    ],
    solutions: [
      'Trendy Craft-Cocktails',
      'Schneller Service für hohen Durchsatz',
      'Industrial-Look passt zur Fahrrad-Bar',
    ],
    keywords: ['catering werksviertel', 'mobile bar werk1', 'startup event catering münchen'],
    relatedVenues: ['ballhausforum-infinity', 'zenith-muenchen'],
  },
  'schloss-schleissheim': {
    slug: 'schloss-schleissheim',
    name: 'Schloss Schleißheim',
    shortName: 'Schloss Schleißheim',
    type: 'historic',
    address: 'Max-Emanuel-Platz 1, 85764 Oberschleißheim',
    district: 'Oberschleißheim',
    description:
      'Bayerns prächtigste Barockanlage mit drei Schlössern und weitläufigem Barockgarten. Die exklusivste Location für unvergessliche Corporate Events.',
    highlights: [
      'UNESCO-Weltkulturerbe-Kandidat',
      'Prachtvoller Barockgarten',
      'Historische Säle & Galerie',
      'Exklusives Ambiente',
      'Fotogene Kulisse',
    ],
    capacity: '100–500 Gäste',
    eventTypes: ['Gala-Dinner', 'Sommerfest', 'Award-Verleihung', 'Hochzeit', 'Jubiläumsfeier'],
    challenges: [
      'Denkmalschutz = strenge Auflagen',
      'Keine moderne Infrastruktur',
      'Lange Anfahrtswege für Equipment',
    ],
    solutions: [
      '100% autarke Bar ohne Eingriffe',
      'Elegante Präsentation passend zum Setting',
      'Erfahrung mit historischen Locations',
    ],
    keywords: [
      'firmenevent catering schloss schleissheim',
      'schloss event münchen',
      'hochzeit schloss schleissheim catering',
    ],
    relatedVenues: ['nymphenburg', 'residenz-muenchen'],
  },
  'zenith-muenchen': {
    slug: 'zenith-muenchen',
    name: 'Zenith – Die Kulturhalle',
    shortName: 'Zenith',
    type: 'location',
    address: 'Lilienthalallee 29, 80939 München',
    district: 'Freimann',
    description:
      'Legendäre Kulturhalle in einer ehemaligen Lokhalle. Raw Industrial-Charme trifft auf epische Dimensionen – perfekt für große Corporate Events.',
    highlights: [
      'Legendäre Event-Location seit 1996',
      '7.000 m² Haupthalle',
      'Einzigartige Industrieatmosphäre',
      'Bekannt für Top-Konzerte & Events',
      'Flexible Bespielung möglich',
    ],
    capacity: '1.000–5.000+ Gäste',
    eventTypes: ['Großes Firmenfest', 'Produktlaunch', 'Messe-Party', 'Festival', 'Konzert'],
    challenges: [
      'Riesige Fläche = viele Servicepunkte nötig',
      'Laute Umgebung bei Events',
      'Hohe Gästezahlen = hoher Durchsatz',
    ],
    solutions: [
      'Multiple mobile Bar-Stationen',
      'Schneller, effizienter Service',
      'Erfahrung mit Großveranstaltungen',
    ],
    keywords: [
      'zenith münchen catering',
      'kulturhalle event catering',
      'großevent catering münchen',
    ],
    relatedVenues: ['moc-muenchen', 'werk1-muenchen'],
  },
  'alte-utting': {
    slug: 'alte-utting',
    name: 'Alte Utting',
    shortName: 'Alte Utting',
    type: 'location',
    address: 'Lagerhausstraße 15, 81371 München',
    district: 'Sendling',
    description:
      'Ein echtes Dampfschiff auf einer Eisenbahnbrücke! Münchens ungewöhnlichste Location für kreative Corporate Events mit Wow-Faktor.',
    highlights: [
      'Echtes Dampfschiff auf Brücke',
      'Münchens kreativste Location',
      'Panoramablick über die Stadt',
      'Einzigartiger Wow-Faktor',
      'Restaurant + Event-Deck',
    ],
    capacity: '50–200 Gäste',
    eventTypes: [
      'Kreatives Firmenevent',
      'Team-Event',
      'Product Launch',
      'After-Work',
      'VIP-Dinner',
    ],
    challenges: [
      'Begrenzter Platz auf dem Schiff',
      'Keine schweren Geräte möglich',
      'Besondere Logistik nötig',
    ],
    solutions: [
      'Ultra-kompakte Fahrrad-Bar perfekt',
      'Leichtgewichtiges Setup',
      'Passt zur unkonventionellen Atmosphäre',
    ],
    keywords: ['alte utting event', 'schiff location münchen', 'kreatives firmenevent münchen'],
    relatedVenues: ['werk1-muenchen', 'zenith-muenchen'],
  },
};

interface VenueLandingPageProps {
  venueSlug: string;
}

const VenueLandingPage: React.FC<VenueLandingPageProps> = ({ venueSlug }) => {
  const venue = venueDatabase[venueSlug];

  if (!venue) {
    return (
      <PageTemplate title='Location nicht gefunden'>
        <div className='mx-auto max-w-3xl py-16 text-center'>
          <h1 className='text-3xl font-bold'>Location nicht gefunden</h1>
          <p className='mt-8 text-(--color-text-on-light-secondary)'>
            Diese Location ist noch nicht in unserer Datenbank.
          </p>
          <Link to='/anfrage' className='mt-8 inline-block'>
            <Button>Anfrage stellen</Button>
          </Link>
        </div>
      </PageTemplate>
    );
  }

  // Generate JSON-LD Schema
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Mobile Cocktailbar für ${venue.name}`,
    description: `Professioneller Bar-Service für Events in ${venue.name}, München. Autarke mobile Bar ohne Strom- oder Wasseranschluss.`,
    provider: {
      '@type': 'Organization',
      name: 'Velo.Bar',
      url: 'https://velo-bar.com',
    },
    areaServed: {
      '@type': 'Place',
      name: venue.name,
      address: venue.address,
    },
    serviceType: 'Mobile Bar Catering',
  };

  const typeColors = {
    messe: { bg: 'from-blue-900 to-indigo-900', accent: 'blue' },
    location: { bg: 'from-navy to-navy-light', accent: 'orange' },
    historic: { bg: 'from-navy to-accent-primary', accent: 'orange' },
    corporate: { bg: 'from-emerald-900 to-teal-900', accent: 'emerald' },
  };

  const colors = typeColors[venue.type];

  return (
    <PageTemplate
      title={`Mobile Bar für ${venue.name} | Catering & Cocktailservice | Velo.Bar`}
      description={`Professioneller Bar-Service für Ihr Event in ${venue.name}, München. Autarke mobile Bar, keine Infrastruktur nötig. Jetzt anfragen!`}
      canonicalPath={`/locations/${venue.slug}`}
      structuredData={schemaData}
    >
      <main className='bg-navy'>
        {/* Hero Section */}
        <Section
          container='narrow'
          spacing='xl'
          className={`relative bg-linear-to-br ${colors.bg} overflow-hidden text-white`}
        >
          <div className='absolute inset-0 z-0 opacity-30'>
            <div className='absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]' />
          </div>
          <div className='relative z-10 text-center'>
            <span className='mb-8 inline-block rounded-full border border-white/20 bg-white/10 px-0 py-0 text-sm font-semibold text-(--color-text-on-dark-secondary)'>
              Location · {venue.district}
            </span>
            <h1 className='mb-8 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl'>
              Mobile Bar für <br className='hidden sm:block' />
              <span className='text-white/90'>{venue.shortName}</span>
            </h1>
            <p className='mx-auto mb-8 max-w-2xl text-xl text-(--color-text-on-dark-secondary)'>
              {venue.description}
            </p>
            <Link to={`/anfrage?source=${venue.slug}`}>
              <Button
                size='lg'
                className='text-on-light border-none bg-white transition duration-200 ease-out hover:bg-white/90'
              >
                Jetzt Angebot anfordern
              </Button>
            </Link>
          </div>
        </Section>

        <Section container='narrow' spacing='xl'>
          {/* Venue Highlights */}
          <section className='mb-16'>
            <h2 className='text-on-light mb-8 text-3xl font-bold'>Über {venue.name}</h2>
            <div className='grid gap-8 md:grid-cols-2'>
              <div className='bg-surface-tinted flex h-full flex-col rounded-xl p-8'>
                <h3 className='text-on-light mb-8 font-bold'>📍 Location Details</h3>
                <ul className='space-y-0 text-sm text-(--color-text-on-light-secondary)'>
                  <li>
                    <strong>Adresse:</strong> {venue.address}
                  </li>
                  <li>
                    <strong>Kapazität:</strong> {venue.capacity}
                  </li>
                  <li>
                    <strong>Bezirk:</strong> {venue.district}
                  </li>
                </ul>
              </div>
              <div className='bg-surface-tinted flex h-full flex-col rounded-xl p-8'>
                <h3 className='text-on-light mb-8 font-bold'>✨ Highlights</h3>
                <ul className='space-y-0 text-sm text-(--color-text-on-light-secondary)'>
                  {venue.highlights.slice(0, 4).map((highlight, i) => (
                    <li
                      key={i}
                      className='font-body text-text-body before:text-color-coral flex items-center justify-center gap-2 text-sm before:text-lg before:content-["•"]'
                    >
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Event Types */}
          <section className='mb-16'>
            <h2 className='text-on-light mb-8 text-3xl font-bold'>
              Beliebte Event-Typen in {venue.shortName}
            </h2>
            <div className='flex flex-wrap gap-0'>
              {venue.eventTypes.map((type, i) => (
                <span
                  key={i}
                  className='bg-surface-tinted rounded-full px-8 py-0 text-sm font-medium text-black/80'
                >
                  {type}
                </span>
              ))}
            </div>
          </section>

          {/* Challenges & Solutions */}
          <section className='mb-16'>
            <h2 className='text-on-light mb-8 text-3xl font-bold'>
              Herausforderungen & Unsere Lösungen
            </h2>

            <div className='grid gap-8 md:grid-cols-2'>
              <div className='flex h-full flex-col rounded-xl border border-red-100 bg-red-50 p-8'>
                <h3 className='mb-8 font-bold text-red-900'>❌ Typische Herausforderungen</h3>
                <ul className='space-y-0 text-sm text-red-800'>
                  {venue.challenges.map((challenge, i) => (
                    <li
                      key={i}
                      className='font-body text-text-body before:text-color-coral flex items-center justify-center gap-2 text-sm before:text-lg before:content-["•"]'
                    >
                      <span>{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className='flex h-full flex-col rounded-xl border border-emerald-100 bg-emerald-50 p-8'>
                <h3 className='mb-8 font-bold text-emerald-900'>✅ Velo.Bar Lösungen</h3>
                <ul className='space-y-0 text-sm text-emerald-800'>
                  {venue.solutions.map((solution, i) => (
                    <li
                      key={i}
                      className='font-body text-text-body before:text-color-coral flex items-center justify-center gap-2 text-sm before:text-lg before:content-["•"]'
                    >
                      <span>{solution}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Why Us for This Venue */}
          <section className='mb-16'>
            <div className='from-navy to-navy-dark rounded-2xl bg-linear-to-br p-8 text-white'>
              <h2 className='mb-8 text-2xl font-bold'>Warum Velo.Bar für {venue.shortName}?</h2>

              <div className='grid gap-8 md:grid-cols-3'>
                <div className='text-center'>
                  <div className='mb-0 text-4xl'>🔌</div>
                  <h3 className='mb-0 font-bold'>100% Autark</h3>
                  <p className='text-sm text-(--color-text-on-dark-secondary)'>
                    Kein Strom, kein Wasser von der Location nötig
                  </p>
                </div>
                <div className='text-center'>
                  <div className='mb-0 text-4xl'>⚡</div>
                  <h3 className='mb-0 font-bold'>30 Min Aufbau</h3>
                  <p className='text-sm text-(--color-text-on-dark-secondary)'>
                    Schnell einsatzbereit, schnell wieder weg
                  </p>
                </div>
                <div className='text-center'>
                  <div className='mb-0 text-4xl'>💰</div>
                  <h3 className='mb-0 font-bold'>All-Inclusive</h3>
                  <p className='text-sm text-(--color-text-on-dark-secondary)'>
                    Keine versteckten Kosten, transparente Pakete
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Success Stories */}
          <SuccessStories variant='compact' className='mb-16' />

          {/* CTA Section */}
          <section className='from-accent-primary to-accent-primary-hover rounded-2xl bg-linear-to-br p-8 text-center text-white md:p-16'>
            <h2 className='mb-8 text-3xl font-bold'>Event in {venue.shortName} geplant?</h2>
            <p className='mx-auto mb-8 max-w-2xl text-lg opacity-90'>
              Wir kennen die Location und ihre Anforderungen. Lassen Sie uns gemeinsam Ihr Event
              perfekt planen.
            </p>
            <div className='flex flex-col justify-center gap-8 sm:flex-row'>
              <Link to={`/anfrage?source=${venue.slug}&eventType=firmenfeier`}>
                <Button
                  size='lg'
                  variant='secondary'
                  className='text-accent-primary border-none transition duration-200 ease-out'
                >
                  Jetzt Angebot anfordern
                </Button>
              </Link>
              <Link to='/preise'>
                <Button
                  size='lg'
                  variant='outline'
                  className='border-white text-white transition duration-200 ease-out hover:bg-white/10'
                >
                  Preise ansehen
                </Button>
              </Link>
            </div>
          </section>

          {/* Related Venues */}
          {venue.relatedVenues.length > 0 && (
            <section className='mt-16'>
              <h2 className='text-on-light mb-8 text-2xl font-bold'>Ähnliche Locations</h2>
              <div className='grid gap-8 md:grid-cols-3'>
                {venue.relatedVenues.map((relatedSlug) => {
                  const related = venueDatabase[relatedSlug];
                  if (!related) return null;
                  return (
                    <Link
                      key={relatedSlug}
                      to={`/locations/${relatedSlug}`}
                      className='bg-surface-tinted hover:border-accent-primary flex h-full flex-col rounded-lg border border-black/10 p-8 transition-shadow duration-200 ease-out hover:shadow-md'
                    >
                      <h3 className='text-on-light text-sm font-bold'>{related.shortName}</h3>
                      <p className='mt-0 text-xs text-(--color-text-on-light-secondary)'>
                        {related.district}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}
        </Section>
      </main>
    </PageTemplate>
  );
};

export default VenueLandingPage;
export { VenueLandingPage };
