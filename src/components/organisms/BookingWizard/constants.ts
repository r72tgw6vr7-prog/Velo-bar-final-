import { Briefcase, Gift, Building2, Heart, PartyPopper, Sparkles } from 'lucide-react';
import type {
  EventType,
  GuestRange,
  DrinkPreference,
  ServiceDuration,
  BudgetRange,
  StepTitle,
} from './types';

export const eventTypes: EventType[] = [
  {
    id: 'firmenfeier',
    label: 'Firmenfeier',
    icon: Briefcase,
    description: 'Teamevents, Sommerfeste, Jubiläen',
  },
  {
    id: 'weihnachtsfeier',
    label: 'Weihnachtsfeier',
    icon: Gift,
    description: 'Festliche Cocktails & Glühwein',
  },
  {
    id: 'messe',
    label: 'Messe / Promotion',
    icon: Building2,
    description: 'Messestand, Product Launch',
  },
  { id: 'hochzeit', label: 'Hochzeit', icon: Heart, description: 'Empfang, Party oder beides' },
  {
    id: 'privat',
    label: 'Private Feier',
    icon: PartyPopper,
    description: 'Geburtstage, JGA, Jubiläen',
  },
  {
    id: 'gin-tasting',
    label: 'Gin-Tasting',
    icon: Sparkles,
    description: 'Workshop mit Premium-Gins',
  },
];

export const guestRanges: GuestRange[] = [
  { id: '20-50', label: '20–50 Gäste' },
  { id: '50-100', label: '50–100 Gäste' },
  { id: '100-200', label: '100–200 Gäste' },
  { id: '200+', label: '200+ Gäste' },
];

export const drinkPreferences: DrinkPreference[] = [
  {
    id: 'both',
    label: 'Alkoholisch & Alkoholfrei',
    description: 'Cocktails + alkoholfreie Optionen',
  },
  { id: 'alcoholic', label: 'Nur alkoholisch', description: 'Klassische Cocktails & Spirituosen' },
  { id: 'non-alcoholic', label: 'Nur alkoholfrei', description: 'Mocktails & Premium-Limonaden' },
];

export const serviceDurations: ServiceDuration[] = [
  { id: '2-3h', label: '2–3 Stunden', description: 'Empfang / Aperitif' },
  { id: '4-5h', label: '4–5 Stunden', description: 'Halbtags-Event' },
  { id: '6h+', label: '6+ Stunden', description: 'Ganztags / Abendveranstaltung' },
];

export const budgetRanges: BudgetRange[] = [
  { id: 'bis-2000', label: 'Bis €2.000' },
  { id: '2000-5000', label: '€2.000 – €5.000' },
  { id: '5000-10000', label: '€5.000 – €10.000' },
  { id: '10000+', label: 'Über €10.000' },
  { id: 'unsicher', label: 'Noch unsicher' },
];

export const stepTitles: StepTitle[] = [
  { step: 1, title: 'Event-Basics', subtitle: 'Was planen Sie?' },
  { step: 2, title: 'Unternehmen & Kontakt', subtitle: 'Wer sind Sie?' },
  { step: 3, title: 'Service-Optionen', subtitle: 'Was wünschen Sie sich?' },
  { step: 4, title: 'Zusammenfassung', subtitle: 'Prüfen & Absenden' },
];

export const validEventTypes = eventTypes.map((e) => e.id);
export const validGuestRanges = guestRanges.map((g) => g.id);
