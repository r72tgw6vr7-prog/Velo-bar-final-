import Briefcase from 'lucide-react/dist/esm/icons/briefcase';
import Gift from 'lucide-react/dist/esm/icons/gift';
import Building2 from 'lucide-react/dist/esm/icons/building-2';
import Heart from 'lucide-react/dist/esm/icons/heart';
import PartyPopper from 'lucide-react/dist/esm/icons/party-popper';
import Sparkles from 'lucide-react/dist/esm/icons/sparkles';
import MapPin from 'lucide-react/dist/esm/icons/map-pin';;
import type {
  EventType,
  GuestRange,
  StepTitle,
  Location,
} from './types.ts';

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

export const locations: Location[] = [
  {
    id: 'munich',
    label: 'MÜNCHEN',
    icon: MapPin,
    description: 'Events in und um München',
  },
  {
    id: 'coburg',
    label: 'COBURG',
    icon: MapPin,
    description: 'Events in und um Coburg',
  },
];

export const stepTitles: StepTitle[] = [
  { step: 1, title: 'Standortwahl', subtitle: 'Wo findet dein Event statt?' },
  { step: 2, title: 'Event-Basics', subtitle: 'Was planst du?' },
  { step: 3, title: 'Unternehmen & Kontakt', subtitle: 'Wer bist du?' },
  { step: 4, title: 'Zusammenfassung', subtitle: 'Prüfen & Absenden' },
];

export const validEventTypes = eventTypes.map((e) => e.id);
export const validGuestRanges = guestRanges.map((g) => g.id);
