/**
 * Centralized Service Data
 * =========================
 * Single source of truth for all service page content
 * - Packages (pricing, features)
 * - FAQs
 * - Testimonials
 * - Suitable for lists
 * - Process steps
 *
 * All data is validated at runtime using Zod schemas
 * @see {@link ../schemas/service.ts} for validation schemas
 */

import type { ServicePackage, FAQ, Testimonial } from '@/components/templates/ServicePageLayout.tsx';
import {
  validateServicePackages,
  validateFAQs,
  validateTestimonials,
  formatValidationError,
} from '@/schemas/service.ts';

// Enable/disable validation (set to false in production for performance)
const ENABLE_VALIDATION = import.meta.env.DEV;

/**
 * Validates data array and logs errors in development
 * @param data - Data to validate
 * @param validator - Validation function
 * @param context - Context for error messages
 * @returns Validated data or original data if validation disabled
 */
function validate<T>(data: unknown[], validator: (data: unknown[]) => T[], context: string): T[] {
  if (!ENABLE_VALIDATION) {
    return data as T[];
  }

  try {
    return validator(data);
  } catch (error) {
    if (error && typeof error === 'object' && 'issues' in error) {
      if (process.env.NODE_ENV === 'development') {
        console.error(`[Validation Error] ${context}:`, formatValidationError(error as any));
      }
    } else {
      if (process.env.NODE_ENV === 'development') {
        console.error(`[Validation Error] ${context}:`, error);
      }
    }
    // Return original data to avoid breaking the app
    return data as T[];
  }
}

// ============================================
// Service Packages
// ============================================

export const servicePackages = {
  hochzeiten: [
    {
      name: 'Cocktail-Empfang',
      price: '€1.500',
      priceDetail: 'für 50-80 Gäste',
      features: [
        '2 professionelle Barkeeper',
        'Elegante Bar-Präsentation',
        'Hochzeits-Cocktailmenü (8 Cocktails)',
        'Romantische Dekoration',
        'Champagner-Service optional',
        '3 Stunden Service (Sektempfang/Aperitif)',
      ],
    },
    {
      name: 'Ganztags-Service',
      price: '€3.500',
      priceDetail: 'für 80-120 Gäste',
      highlighted: true,
      features: [
        '3 Barkeeper im Schichtbetrieb',
        'Empfang + Abend-Service',
        'Themen-Cocktails nach Wunsch',
        'Premium-Dekoration in deinen Hochzeitsfarben',
        'Mitternachtsbar möglich',
        'Signature Wedding Cocktail',
        '8+ Stunden durchgehender Service',
      ],
    },
    {
      name: 'Luxury Wedding',
      price: 'Ab €6.000',
      priceDetail: 'vollständig maßgeschneidert',
      features: [
        'Komplette Event-Planung',
        '4+ Barkeeper (Schichtbetrieb)',
        'Persönliche Cocktail-Kreationen mit deinen Namen',
        'Luxus-Spirituosen & Champagner',
        'Personalisierte Dekoration & Menükarten',
        'VIP-Bar für Brautpaar & Familie',
        'Unlimited Service den ganzen Tag/Nacht',
      ],
    },
  ] as ServicePackage[],

  firmenfeiern: [
    {
      name: 'Basis-Paket',
      price: '€1.200',
      priceDetail: 'für bis zu 100 Gäste',
      features: [
        '2 professionelle Barkeeper',
        'Mobile Bar-Ausstattung',
        '6 Standard-Cocktails',
        'Basis-Dekoration',
        'Alle Zutaten & Equipment',
        '4 Stunden Service',
      ],
    },
    {
      name: 'Premium-Paket',
      price: '€2.500',
      priceDetail: 'für bis zu 150 Gäste',
      highlighted: true,
      features: [
        '3 professionelle Barkeeper',
        'Premium-Spirituosen',
        'Individuelles Cocktail-Menü (10+ Optionen)',
        'Gehobene Dekoration',
        'Alkoholfreie Alternativen',
        '5 Stunden Service',
      ],
    },
    {
      name: 'VIP-Paket',
      price: 'Ab €5.000',
      priceDetail: 'vollständig maßgeschneidert',
      features: [
        '4+ erfahrene Barkeeper',
        'Luxus- & Premium-Spirituosen',
        'Maßgeschneidertes Konzept',
        'Champagner & Signature-Drinks',
        'Event-Koordination',
        'Individuelle Dauer',
      ],
    },
  ] as ServicePackage[],

  weihnachtsfeiern: [
    {
      name: 'Winter Classic',
      price: '€1.400',
      priceDetail: 'für bis zu 80 Gäste',
      features: [
        '2 professionelle Barkeeper',
        'Weihnachtliche Dekoration',
        'Wintercocktails & Glühwein-Variationen',
        'Klassische Weihnachtscocktails',
        'Alle Zutaten & Equipment',
        '4 Stunden Service',
      ],
    },
    {
      name: 'Festive Premium',
      price: '€2.800',
      priceDetail: 'für bis zu 120 Gäste',
      highlighted: true,
      features: [
        '3 professionelle Barkeeper',
        'Premium-Spirituosen',
        'Exklusive Weihnachtscocktails',
        'Luxuriöse Weihnachtsdekoration',
        'Punsch & Glühwein-Station',
        'Alkoholfreie Winter-Specials',
        '5 Stunden Service',
      ],
    },
    {
      name: 'Holiday VIP',
      price: 'Ab €5.500',
      priceDetail: 'vollständig maßgeschneidert',
      features: [
        '4+ erfahrene Barkeeper',
        'Luxus-Spirituosen',
        'Maßgeschneidertes Weihnachtsmenü',
        'Champagner & Signature-Winter-Drinks',
        'Event-Koordination',
        'Individuelle Dauer & Setup',
      ],
    },
  ] as ServicePackage[],

  messeCatering: [
    {
      name: 'Messe Basic',
      price: '€800',
      priceDetail: 'pro Messetag',
      features: [
        '2 Barkeeper pro Schicht',
        'Kompakte Bar-Lösung',
        'Schneller Service (ideal für hohen Durchlauf)',
        '4-6 Cocktails zur Auswahl',
        'Branding-Integration möglich',
        'Pro Messetag (8 Stunden)',
      ],
    },
    {
      name: 'Messe Premium',
      price: '€2.000',
      priceDetail: 'pro Messetag',
      highlighted: true,
      features: [
        '3 Barkeeper pro Schicht',
        'Größere Bar mit Eye-Catcher-Effekt',
        '8-10 Premium-Cocktails',
        'Vollständiges Branding Ihres Stands',
        'Foto-würdige Präsentation',
        'Kontinuierlicher Service',
        'Pro Messetag (10 Stunden)',
      ],
    },
    {
      name: 'Enterprise Messe',
      price: 'Ab €5.000',
      priceDetail: 'Mehrtages-Events',
      features: [
        '4+ Barkeeper in Schichten',
        'Exklusive Bar-Gestaltung',
        'Signature-Drinks mit Brand-Namen',
        'Premium-Spirituosen',
        'Event-Management & Koordination',
        'Mehrere Messetage',
        'VIP-Bereich möglich',
      ],
    },
  ] as ServicePackage[],

  teamEvents: [
    {
      name: 'Cocktail-Schnupperkurs',
      price: '€50',
      priceDetail: 'pro Person (min. 10 Personen)',
      features: [
        '2 Stunden Workshop',
        'Einführung in Cocktail-Basics',
        '3 Cocktails selbst mixen',
        'Alle Zutaten & Equipment inklusive',
        'Professioneller Barkeeper als Trainer',
        'Rezeptkarten zum Mitnehmen',
      ],
    },
    {
      name: 'Team-Building Cocktail-Kurs',
      price: '€80',
      priceDetail: 'pro Person (min. 12 Personen)',
      highlighted: true,
      features: [
        '3 Stunden intensiver Workshop',
        'Team-Challenges & Cocktail-Wettbewerb',
        '5 Cocktails selbst mixen',
        'Profi-Techniken lernen',
        'Teamwork & Kommunikation fördern',
        'Siegprämie für bestes Team',
        'Snacks & Fingerfood inklusive',
      ],
    },
    {
      name: 'VIP Barkeeper-Masterclass',
      price: '€120',
      priceDetail: 'pro Person (min. 8 Personen)',
      features: [
        '4 Stunden Profi-Training',
        'Fortgeschrittene Techniken',
        '8+ Premium-Cocktails',
        'Eigene Signature-Drinks kreieren',
        'Molekulare Cocktails & Flair-Bartending',
        'Zertifikat',
        'Gourmet-Snacks & Dinner',
      ],
    },
  ] as ServicePackage[],

  privateFeiern: [
    {
      name: 'Privat Basis',
      price: '€900',
      priceDetail: 'für bis zu 30 Gäste',
      features: [
        '1 professioneller Barkeeper',
        'Mobile Cocktailbar',
        '6 Cocktails zur Auswahl',
        'Alle Zutaten & Equipment',
        'Basis-Dekoration',
        '3 Stunden Service',
      ],
    },
    {
      name: 'Privat Premium',
      price: '€1.800',
      priceDetail: 'für bis zu 60 Gäste',
      highlighted: true,
      features: [
        '2 professionelle Barkeeper',
        'Erweiterte mobile Bar',
        '10+ Cocktails zur Auswahl',
        'Premium-Spirituosen',
        'Elegante Dekoration',
        'Alkoholfreie Alternativen',
        '5 Stunden Service',
      ],
    },
    {
      name: 'Luxus-Paket',
      price: 'Ab €3.500',
      priceDetail: 'vollständig maßgeschneidert',
      features: [
        '3+ Barkeeper',
        'Luxus-Spirituosen & Champagner',
        'Individuelles Cocktail-Konzept',
        'Themen-Dekoration nach Wunsch',
        'Signature-Drinks für deine Feier',
        'Unlimited Service',
        'Persönlicher Event-Koordinator',
      ],
    },
  ] as ServicePackage[],

  buchungMuc: [
    {
      name: 'Gin-Tasting München',
      price: 'ab €49',
      priceDetail: 'pro Person',
      features: [
        'Bis zu 50 verschiedene Gins',
        'Professionelle Verkostungsleitung',
        'Mobile Bar inklusive',
        'An einem Ort deiner Wahl',
        'Komplettes Equipment',
        'Keine Infrastruktur nötig',
      ],
    },
    {
      name: 'Event Bar Service',
      price: 'Auf Anfrage',
      priceDetail: '',
      features: [
        'Mobile Bar auf Cargo Bike',
        'Professionelle Barkeeper',
        'Individuelle Getränkekarte',
        'Selbstversorgendes Öko-System',
        'Kein Strom-/Wasseranschluss nötig',
        'Kompletter Service',
      ],
      highlighted: true,
    },
    {
      name: 'Hochzeits-Paket',
      price: 'Auf Anfrage',
      priceDetail: '',
      features: [
        'Sektempfang',
        'Mobile Bar für den Abend',
        'Professionelles Team',
        'Getränkeberatung',
        'Auf- und Abbau inklusive',
        'Individuelle Abstimmung',
      ],
    },
  ] as ServicePackage[],

  velobarco: [
    {
      name: 'Gin-Tasting Coburg',
      price: 'ab €49',
      priceDetail: 'pro Person',
      features: [
        'Bis zu 50 verschiedene Gins',
        'Professionelle Verkostungsleitung',
        'Mobile Bar inklusive',
        'An einem Ort deiner Wahl',
        'Komplettes Equipment',
        'Keine Infrastruktur nötig',
      ],
      highlighted: true,
    },
    {
      name: 'Event Bar Service',
      price: 'Auf Anfrage',
      priceDetail: '',
      features: [
        'Mobile Bar auf Cargo Bike',
        'Professionelle Barkeeper',
        'Individuelle Getränkekarte',
        'Selbstversorgendes Öko-System',
        'Kein Strom-/Wasseranschluss nötig',
        'Kompletter Service',
      ],
    },
    {
      name: 'Private Feiern',
      price: 'Auf Anfrage',
      priceDetail: '',
      features: [
        'Geburtstage & Jubiläen',
        'JGA & Bachelor Parties',
        'Gartenpartys',
        'Professionelles Team',
        'Getränkeberatung',
        'Individuelle Abstimmung',
      ],
    },
  ] as ServicePackage[],
};

// ============================================
// FAQs
// ============================================

export const serviceFAQs = {
  hochzeiten: [
    {
      question: 'Wann ist der beste Zeitpunkt für die Cocktailbar bei einer Hochzeit?',
      answer:
        'Die beliebtesten Zeitpunkte sind der Sektempfang (nach der Trauung), während der Fotosession der Brautpaares, oder als Mitternachtsbar/Late-Night-Bar. Viele Paare buchen uns auch für den ganzen Tag – von Empfang bis Mitternacht.',
    },
    {
      question: 'Könnt ihr Cocktails in unseren Hochzeitsfarben kreieren?',
      answer:
        'Ja, absolut! Wir können Farben, Garnierungen und sogar die Drinks selbst an eure Hochzeitsfarben anpassen. Blush Pink, Gold, Smaragdgrün – alles ist möglich. Auch personalisierte Cocktail-Namen mit euren Vornamen sind sehr beliebt.',
    },
    {
      question: 'Wie viele Cocktails sollten wir pro Gast einplanen?',
      answer:
        'Für einen 3-stündigen Empfang rechnen wir ca. 2-3 Drinks pro Gast. Bei Ganztags-Service ca. 4-6 Drinks pro Gast (verteilt über den Tag/Abend). Wir passen die Mengen an eure Gästeanzahl und Dauer an.',
    },
    {
      question: 'Könnt ihr auch mit unserer Hochzeitslocation zusammenarbeiten?',
      answer:
        'Ja, wir haben Erfahrung mit vielen Hochzeitslocations in München, Coburg und Umgebung. Wir klären im Vorfeld mit der Location alle Details (Stromanschluss, Aufbaufläche, Zeitplan). Falls eure Location spezielle Anforderungen hat, finden wir gemeinsam eine Lösung.',
    },
    {
      question: 'Was ist mit Gästen, die keinen Alkohol trinken?',
      answer:
        'Zu jedem Cocktail bieten wir eine gleichwertige alkoholfreie Mocktail-Variante. Diese sind genauso aufwendig präsentiert und schmecken hervorragend – auch für Schwangere, Kinder und Autofahrer.',
    },
    {
      question: 'Können wir vor der Hochzeit eine Verkostung machen?',
      answer:
        'Ja! Für Premium- und Luxury-Pakete bieten wir eine Vorab-Verkostung an (ca. 4-6 Wochen vor der Hochzeit). So könnt ihr eure Lieblings-Cocktails auswählen und wir können euren persönlichen Signature-Drink entwickeln. Dies ist im Paket enthalten.',
    },
  ] as FAQ[],

  firmenfeiern: [
    {
      question: 'Wie viel Vorlauf benötigt ihr für eine Firmenfeier?',
      answer:
        'Idealerweise solltet ihr 4-6 Wochen im Voraus buchen, besonders während der Hauptsaison (Sommer und Weihnachtszeit). Für kurzfristige Anfragen kontaktiert uns bitte direkt – oft können wir auch bei kürzerer Vorlaufzeit helfen.',
    },
    {
      question: 'Könnt ihr Cocktails an unser Corporate Design anpassen?',
      answer:
        'Ja, absolut! Wir können Farben, Garnierungen und sogar die Namengebung der Cocktails an euer Firmen-Branding anpassen. Auch personalisierte Cocktail-Menükarten in eurem Corporate Design sind möglich.',
    },
    {
      question: 'Bietet ihr auch alkoholfreie Optionen an?',
      answer:
        'Selbstverständlich! Zu jedem Cocktail bieten wir eine alkoholfreie Alternative. Wir können auch komplett alkoholfreie Events betreuen, falls gewünscht.',
    },
    {
      question: 'Was ist im Preis inbegriffen?',
      answer:
        'Der Paketpreis umfasst alle Barkeeper, die komplette Bar-Ausstattung (Shaker, Gläser, Dekoration), alle Zutaten, Eiswürfel, Servietten und die Auf- und Abbauzeit. Lediglich die Location müsst ihr separat organisieren.',
    },
    {
      question: 'Welche Locations in München und Coburg bedient ihr?',
      answer:
        'Wir kommen zu euch – egal ob Firmengelände, gemietete Eventlocation, Biergarten oder Outdoor-Veranstaltung. Die einzige Voraussetzung ist ein Stromanschluss und ausreichend Platz für unsere mobile Bar.',
    },
    {
      question: 'Können wir vor dem Event eine Cocktail-Verkostung machen?',
      answer:
        'Ja, für Premium- und VIP-Pakete bieten wir eine Vorab-Verkostung an, bei der ihr eure Lieblingscocktails auswählen könnt. Dies ist besonders bei individuellen Signature-Drinks empfehlenswert.',
    },
  ] as FAQ[],

  weihnachtsfeiern: [
    {
      question: 'Wann sollte ich für die Weihnachtsfeier buchen?',
      answer:
        'Die Weihnachtssaison (November bis Ende Dezember) ist unsere Hochsaison. Wir empfehlen eine Buchung bereits im September oder Oktober, um euren Wunschtermin zu sichern. Kurzfristige Anfragen sind manchmal möglich – kontaktiert uns!',
    },
    {
      question: 'Welche typischen Weihnachtscocktails bietet ihr an?',
      answer:
        'Unsere Winter-Klassiker umfassen Glühwein Martini, Winter Spice Mojito, Christmas Mule, White Russian, Cranberry Gin Fizz und alkoholfreie Varianten wie Winterpunsch und Apfel-Zimt-Mocktail.',
    },
    {
      question: 'Könnt ihr auch eine Punsch- oder Glühwein-Station aufbauen?',
      answer:
        'Absolut! Zusätzlich zur Cocktailbar bieten wir eine separate Heißgetränke-Station mit verschiedenen Glühwein-Variationen, Punsch und Feuerzangenbowle an. Dies ist besonders bei Outdoor-Weihnachtsfeiern beliebt.',
    },
    {
      question: 'Ist die Weihnachtsdekoration im Preis inbegriffen?',
      answer:
        'Ja, jedes Paket enthält weihnachtliche Dekoration für die Bar. Für Premium- und VIP-Pakete verwenden wir hochwertige Dekoration mit Lichterketten, Tannenzweigen und eleganten Weihnachtselementen in euren Firmenfarben.',
    },
    {
      question: 'Könnt ihr auch bei Outdoor-Weihnachtsmärkten auftreten?',
      answer:
        'Ja, wir haben Erfahrung mit Outdoor-Weihnachtsveranstaltungen. Wir benötigen lediglich Stromanschluss und bei starkem Regen/Schnee einen Unterstand oder Pavillon.',
    },
  ] as FAQ[],

  messeCatering: [
    {
      question: 'Wie funktioniert die Branding-Integration am Messestand?',
      answer:
        'Wir können eure Firmenlogos auf die Bar anbringen, personalisierte Cocktail-Namen mit euren Produkten verknüpfen und die Dekoration in euren Corporate Colors gestalten. Auch gebrandete Gläser, Servietten und Menükarten sind möglich.',
    },
    {
      question: 'Wie viele Drinks könnt ihr pro Stunde servieren?',
      answer:
        'Bei Messen mit hohem Durchlauf (z.B. ISPO, Ambiente) servieren wir ca. 30-50 Drinks pro Barkeeper und Stunde. Für Premium-Service mit komplexeren Cocktails ca. 20-30 Drinks pro Stunde. Wir passen die Anzahl der Barkeeper entsprechend an.',
    },
    {
      question: 'Könnt ihr bei allen Messen in München auftreten?',
      answer:
        'Ja, wir haben Erfahrung mit allen großen Messen in München (Messe München Riem) sowie kleineren Messen und Ausstellungen. Wir kümmern uns um alle Anmeldungen und Genehmigungen in Abstimmung mit der Messeleitung.',
    },
    {
      question: 'Was kostet der Service bei mehrtägigen Messen?',
      answer:
        'Bei mehrtägigen Events (z.B. 3-5 Tage) bieten wir attraktive Paketpreise. Ein durchschnittliches 3-Tage-Paket liegt bei €4.500-€6.000, abhängig von Besucherzahl und Service-Level. Kontaktiert uns für ein individuelles Angebot.',
    },
    {
      question: 'Benötigen wir eine spezielle Ausstattung am Stand?',
      answer:
        'Wir bringen alles mit – ihr benötigt nur einen Stromanschluss und ausreichend Platz (ca. 2,5x2 Meter für die Basic-Bar, mehr für Premium-Setups). Wasseranschluss ist optional, wir bringen eigene Wasserkanister mit.',
    },
  ] as FAQ[],

  teamEvents: [
    {
      question: 'Sind Vorkenntnisse erforderlich?',
      answer:
        'Nein, unsere Workshops sind für Anfänger konzipiert. Wir starten bei den Basics und steigern uns je nach Workshop-Paket. Jeder kann mitmachen – vom absoluten Neuling bis zum Hobby-Barkeeper.',
    },
    {
      question: 'Wo finden die Workshops statt?',
      answer:
        'Wir kommen zu euch! Ob in euren Firmenräumen, einer gemieteten Location oder bei euch zuhause – wir bringen alle Equipment mit. Alternativ bieten wir auch Workshops in Partner-Locations in München und Coburg an.',
    },
    {
      question: 'Wie viele Personen können teilnehmen?',
      answer:
        'Die optimale Gruppengröße liegt bei 10-20 Personen. Bei größeren Teams (bis 40 Personen) arbeiten wir mit zwei Trainern parallel in zwei Gruppen. Kleinere Gruppen (ab 6 Personen) sind auf Anfrage möglich.',
    },
    {
      question: 'Eignet sich das als Team-Building-Maßnahme?',
      answer:
        'Absolut! Unsere Team-Building-Kurse fördern Kommunikation, Kreativität und Zusammenarbeit. Mit Team-Challenges, Cocktail-Wettbewerben und gemeinsamen Erfolgserlebnissen stärken wir den Teamgeist auf unterhaltsame Art.',
    },
    {
      question: 'Können Teilnehmer auch alkoholfreie Varianten mixen?',
      answer:
        'Ja, wir bieten zu jedem Cocktail auch eine alkoholfreie Mocktail-Variante an. Teilnehmer können selbst entscheiden, ob sie Alkohol oder alkoholfrei mixen möchten.',
    },
    {
      question: 'Gibt es eine Teilnahme-Bescheinigung?',
      answer:
        'Bei der VIP Barkeeper-Masterclass erhalten alle Teilnehmer ein Velobar-Zertifikat. Für die anderen Workshops gibt es Rezeptkarten zum Mitnehmen mit allen gelernten Cocktails.',
    },
  ] as FAQ[],

  privateFeiern: [
    {
      question: 'Für welche privaten Anlässe eignet sich Velobar?',
      answer:
        'Perfekt für Geburtstage (18., 30., 40., 50., etc.), Hochzeitstage, Verlobungsfeiern, Gartenpartys, JGA (Junggesellenabschiede), Taufen, Konfirmationen und alle anderen Anlässe, bei denen ihr eure Gäste mit erstklassigen Cocktails begeistern möchtet.',
    },
    {
      question: 'Wie viel Platz benötigt die mobile Bar?',
      answer:
        'Die Basis-Bar benötigt ca. 2x2 Meter, die Premium-Bar ca. 3x2,5 Meter. Wir können die Bar sowohl indoor als auch outdoor aufbauen. Bei Outdoor-Events sollte ein Stromanschluss in der Nähe sein (wir bringen 20m Verlängerungskabel mit).',
    },
    {
      question: 'Können wir die Cocktailkarte selbst zusammenstellen?',
      answer:
        'Ja! Ihr könnt aus unserer Cocktailkarte eure Favoriten wählen oder uns Wünsche mitteilen. Wir beraten euch gerne, welche Cocktails zu eurem Anlass und euren Gästen passen. Für Premium- und Luxus-Pakete kreieren wir auch personalisierte Signature-Drinks.',
    },
    {
      question: 'Was passiert bei schlechtem Wetter bei Gartenpartys?',
      answer:
        'Bei Outdoor-Events solltet ihr einen Plan B haben (Pavillon, Überdachung oder Indoor-Alternative). Wir selbst sind wetterfest ausgestattet, aber für eure Gäste empfehlen wir einen Regenschutz. Kontaktiert uns bei Wettersorgen vorab – wir finden eine Lösung!',
    },
    {
      question: 'Könnt ihr auch spezielle Diät-Wünsche berücksichtigen?',
      answer:
        'Ja, teilt uns vorab mit, wenn Gäste Allergien haben oder vegan/vegetarisch leben. Wir verwenden dann beispielsweise Aquafaba statt Eiweiß, vegane Sirupe und achten auf entsprechende Garnierungen.',
    },
    {
      question: 'Wie läuft die Bezahlung ab?',
      answer:
        'Nach Buchung erhaltet ihr eine Rechnung mit 30% Anzahlung. Den Restbetrag begleicht ihr nach dem Event per Überweisung. Bei sehr kurzfristigen Buchungen kann Vorauszahlung erforderlich sein.',
    },
  ] as FAQ[],

  buchungMuc: [
    {
      question: 'Wie funktioniert die Velo.Bar ohne Strom- und Wasseranschluss?',
      answer:
        'Die Velo.Bar ist ein durchdachtes Öko-System mit zwei Wassertanks (Frisch- und Abwasser), integrierter Wasserpumpe und akkubetriebener Kühlung. Es muss also kein Strom oder Wasser gelegt werden.',
    },
    {
      question: 'Für welche Events eignet sich die mobile Bar?',
      answer:
        'Unsere mobile Bar ist perfekt für Events, Hochzeiten, Firmenfeiern, Messen, private Feiern, Gin-Tastings und alle Locations ohne integrierte Bar oder im Freien.',
    },
    {
      question: 'Was ist im Service alles enthalten?',
      answer:
        'Wir bringen die mobile Bar, professionelle Barkeeper, Service-Mitarbeiter und kümmern uns um alle Abläufe. Ihr müsst euch um nichts kümmern - nach der Buchung und Getränkeabsprache könnt ihr euch entspannt zurücklehnen.',
    },
    {
      question: 'Wie läuft die Buchung eines Gin-Tastings ab?',
      answer:
        'Schreibt uns einfach wo, wann und wie viele Personen ihr erwartet. Ihr erhaltet dann ein schnelles und unverbindliches Angebot für euer mobiles Gin-Tasting in München. Preis: ab 49€ pro Person.',
    },
    {
      question: 'Können wir unsere Lieblingsdrinks bestellen?',
      answer:
        'Selbstverständlich! Wir besprechen eure Lieblingsdrinks und erstellen eine individuelle Getränkekarte für euer Event.',
    },
    {
      question: 'Wie mobil ist die Velo.Bar wirklich?',
      answer:
        'Die Velo.Bar ist auf einem Cargo Bike montiert und vollständig selbstversorgend. Sie kann überall aufgestellt werden - im Garten, auf einer Wiese, in Locations ohne Bar-Infrastruktur oder sogar auf Messen.',
    },
  ] as FAQ[],

  velobarco: [
    {
      question: 'Wo in Coburg bieten Sie Ihre Services an?',
      answer:
        'Wir bedienen Coburg und die gesamte Umgebung. Die mobile Velo.Bar kann überall aufgestellt werden - dank des selbstversorgenden Öko-Systems mit Wassertanks und Akkukühlung.',
    },
    {
      question: 'Was macht die Gin-Tastings in Coburg besonders?',
      answer:
        'Wir bieten mobile Gin-Tastings mit bis zu 50 verschiedenen Gins an einem Ort eurer Wahl. Perfekt für private Runden, Firmenevents oder besondere Anlässe. Ab 49€ pro Person.',
    },
    {
      question: 'Wie kann ich die Velo.Bar für Coburg buchen?',
      answer:
        'Schreibt uns einfach wo, wann und wie viele Personen ihr erwartet. Wir erstellen euch dann ein schnelles und unverbindliches Angebot für euer Event in Coburg.',
    },
    {
      question: 'Brauche ich eine spezielle Location?',
      answer:
        'Nein! Die Velo.Bar benötigt keinen Strom- oder Wasseranschluss. Sie funktioniert komplett autark und kann überall aufgestellt werden - im Garten, auf Wiesen, in Locations ohne Bar oder bei Events im Freien.',
    },
  ] as FAQ[],
};

// ============================================
// Testimonials
// ============================================

// Shared testimonials (can be used across multiple services)
export const sharedTestimonials = {
  general: [
    {
      quote:
        'Professioneller Service, erstklassige Cocktails und ein wunderschönes Setup. Absolut empfehlenswert!',
      author: 'Event-Kunde',
      company: 'München',
      rating: 5,
    },
  ] as Testimonial[],
};

// Service-specific testimonials
export const serviceTestimonials = {
  hochzeiten: [
    {
      quote:
        'Unsere Hochzeit wäre ohne Velobar nicht komplett gewesen! Die Cocktails waren ein Traum und die Barkeeper so professionell und herzlich. Alle Gäste schwärmen noch davon!',
      author: 'Lisa & Markus',
      company: 'Hochzeit in München',
      rating: 5,
    },
    {
      quote:
        'Von der Planung bis zur Umsetzung war alles perfekt. Die personalisierten Cocktails mit unseren Namen und in unseren Hochzeitsfarben waren das Highlight des Abends!',
      author: 'Anna & Thomas',
      company: 'Hochzeit Schloss Ehrenburg, Coburg',
      rating: 5,
    },
    {
      quote:
        'Wir hatten den Ganztags-Service und es war jeden Cent wert. Die Mitternachtsbar war der absolute Knaller! Danke für diesen unvergesslichen Tag!',
      author: 'Sophie & Michael',
      company: 'Sommerhochzeit im Biergarten',
      rating: 5,
    },
  ] as Testimonial[],

  firmenfeiern: [
    {
      quote:
        'Die mobile Cocktailbar war das absolute Highlight unserer Sommerfeier. Professionell, freundlich und die Cocktails waren erstklassig!',
      author: 'Thomas Müller',
      company: 'Tech-Unternehmen München',
      rating: 5,
    },
    {
      quote:
        'Velobar hat unser Firmenjubiläum zu etwas Besonderem gemacht. Die individuelle Beratung und die maßgeschneiderten Cocktails haben unsere Gäste begeistert.',
      author: 'Sarah Schmidt',
      company: 'Marketing-Agentur',
      rating: 5,
    },
    {
      quote:
        'Unkomplizierte Planung, pünktlicher Service und hervorragende Qualität. Genau das, was man für ein Corporate Event braucht.',
      author: 'Michael Weber',
      company: 'Automotive-Unternehmen Coburg',
      rating: 5,
    },
  ] as Testimonial[],

  weihnachtsfeiern: [
    {
      quote:
        'Die Weihnachtsfeier war dank Velobar ein voller Erfolg. Die winterlichen Cocktails und die festliche Atmosphäre haben unsere Mitarbeiter begeistert!',
      author: 'Klaus Schneider',
      company: 'Automotive-Unternehmen Coburg',
      rating: 5,
    },
    {
      quote:
        'Perfekte Organisation und wunderschöne weihnachtliche Dekoration. Unsere Gäste schwärmen noch immer von den Glühwein-Cocktails!',
      author: 'Anna Meier',
      company: 'Versicherung München',
      rating: 5,
    },
  ] as Testimonial[],

  messeCatering: [
    {
      quote:
        'Unsere Cocktailbar war der absolute Besuchermagnet auf der ISPO. Drei Tage lang Top-Service und über 1.200 servierte Drinks!',
      author: 'Marketing Director',
      company: 'Sportartikel-Hersteller',
      rating: 5,
    },
    {
      quote:
        'Professionelle Abwicklung von Anfang bis Ende. Die Barkeeper waren freundlich, schnell und haben perfekt unser Brand-Image repräsentiert.',
      author: 'Stephanie Keller',
      company: 'Tech-Startup auf der BITS',
      rating: 5,
    },
  ] as Testimonial[],

  teamEvents: [
    {
      quote:
        'Der beste Team-Event, den wir je hatten! Alle waren begeistert und wir haben viel gelacht. Die Cocktails waren natürlich auch top!',
      author: 'Julia Hoffmann',
      company: 'IT-Startup München',
      rating: 5,
    },
    {
      quote:
        'Perfektes Team-Building. Unsere Mitarbeiter reden noch Wochen später über den Cocktail-Wettbewerb. Absolute Empfehlung!',
      author: 'Markus Bauer',
      company: 'Marketing-Agentur Coburg',
      rating: 5,
    },
  ] as Testimonial[],

  privateFeiern: [
    {
      quote:
        'Mein 40. Geburtstag war dank Velobar unvergesslich! Alle Gäste waren begeistert von den Cocktails und der professionellen Atmosphäre.',
      author: 'Sandra M.',
      company: 'Private Geburtstagsfeier',
      rating: 5,
    },
    {
      quote:
        'Perfekt für unsere Gartenparty! Die Barkeeper waren super sympathisch und die Bar war ein echter Hingucker. Absolute Empfehlung!',
      author: 'Familie Richter',
      company: 'Hochzeitstag-Feier',
      rating: 5,
    },
  ] as Testimonial[],

  buchungMuc: [
    {
      quote:
        'Einfacher war es noch nie, unsere Gäste mit einer professionellen mobilen Bar zu bewirten!',
      author: 'Event-Kunde',
      company: 'München',
      rating: 5,
    },
    {
      quote:
        'Das Gin-Tasting war ein absolutes Highlight! Professionell, unterhaltsam und mit unglaublicher Gin-Auswahl.',
      author: 'Tasting-Teilnehmer',
      company: 'München',
      rating: 5,
    },
    {
      quote:
        'Die perfekte Lösung für unsere Hochzeit. Kein Stress mit Getränken, alles lief perfekt!',
      author: 'Hochzeitspaar',
      company: 'München & Umgebung',
      rating: 5,
    },
  ] as Testimonial[],

  velobarco: [
    {
      quote:
        'Das Gin-Tasting in Coburg war einzigartig! Tolle Atmosphäre und exzellente Gin-Auswahl.',
      author: 'Tasting-Kunde',
      company: 'Coburg',
      rating: 5,
    },
    {
      quote:
        'Perfekt für unsere Gartenparty! Professioneller Service und die Bar sieht einfach klasse aus.',
      author: 'Event-Kunde',
      company: 'Coburg & Umgebung',
      rating: 5,
    },
  ] as Testimonial[],
};

// Helper function to get all testimonials for a service (shared + specific)
export const getTestimonialsFor = (service: keyof typeof serviceTestimonials): Testimonial[] => {
  return [
    ...serviceTestimonials[service],
    ...(Math.random() > 0.5 ? sharedTestimonials.general : []), // Optionally add shared testimonials
  ];
};

// ============================================
// Runtime Validation (Development Only)
// ============================================

if (ENABLE_VALIDATION) {
  /* eslint-disable no-console -- dev-only runtime validation reporting for centralized service content */
  if (process.env.NODE_ENV === 'development') {
    console.log('[Service Data] Running validation checks...');
  }

  // Validate all service packages
  Object.entries(servicePackages).forEach(([key, packages]) => {
    validate(packages, validateServicePackages, `servicePackages.${key}`);
  });

  // Validate all FAQs
  Object.entries(serviceFAQs).forEach(([key, faqs]) => {
    validate(faqs, validateFAQs, `serviceFAQs.${key}`);
  });

  // Validate all testimonials
  Object.entries(serviceTestimonials).forEach(([key, testimonials]) => {
    validate(testimonials, validateTestimonials, `serviceTestimonials.${key}`);
  });

  // Validate shared testimonials
  Object.entries(sharedTestimonials).forEach(([key, testimonials]) => {
    validate(testimonials, validateTestimonials, `sharedTestimonials.${key}`);
  });

  if (process.env.NODE_ENV === 'development') {
    console.log('[Service Data] Validation complete');
  }
  /* eslint-enable no-console */
}
