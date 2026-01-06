/**
 * Booking pricing/estimation service (pure functions).
 * Config-driven, no side effects.
 */

type EventTypeId =
  | 'firmenfeier'
  | 'weihnachtsfeier'
  | 'messe'
  | 'hochzeit'
  | 'privat'
  | 'gin-tasting'
  | string;
type GuestTierId = '20-50' | '50-100' | '100-200' | '200+' | string;
type DurationId = '2-3h' | '4-5h' | '6h+' | string;

export interface PricingInputs {
  eventType: EventTypeId;
  guestCount: GuestTierId;
  duration: DurationId;
  addons?: { name: string; price: number }[];
  rush?: boolean;
}

export interface PricingBreakdown {
  base: number;
  guestMultiplier: number;
  durationMultiplier: number;
  addonsTotal: number;
  rushFee: number;
}

export interface PricingResult {
  total: number;
  breakdown: PricingBreakdown;
}

const baseByEvent: Record<EventTypeId, number> = {
  firmenfeier: 2200,
  weihnachtsfeier: 2600,
  messe: 3200,
  hochzeit: 2800,
  privat: 1800,
  'gin-tasting': 1500,
};

const guestMultiplier: Record<GuestTierId, number> = {
  '20-50': 1,
  '50-100': 1.15,
  '100-200': 1.35,
  '200+': 1.55,
};

const durationMultiplier: Record<DurationId, number> = {
  '2-3h': 0.9,
  '4-5h': 1,
  '6h+': 1.2,
};

const RUSH_FEE = 0.08; // 8%

function resolveBase(eventType: EventTypeId): number {
  return baseByEvent[eventType] ?? baseByEvent.firmenfeier;
}

function resolveGuestMultiplier(guest: GuestTierId): number {
  return guestMultiplier[guest] ?? 1;
}

function resolveDurationMultiplier(duration: DurationId): number {
  return durationMultiplier[duration] ?? 1;
}

export function calculatePrice(inputs: PricingInputs): PricingResult {
  const base = resolveBase(inputs.eventType);
  const guestMult = resolveGuestMultiplier(inputs.guestCount);
  const durationMult = resolveDurationMultiplier(inputs.duration);
  const addonsTotal = (inputs.addons ?? []).reduce((sum, addon) => sum + (addon.price || 0), 0);

  const subtotal = base * guestMult * durationMult + addonsTotal;
  const rushFee = inputs.rush ? subtotal * RUSH_FEE : 0;
  const total = Math.round(subtotal + rushFee);

  return {
    total,
    breakdown: {
      base,
      guestMultiplier: guestMult,
      durationMultiplier: durationMult,
      addonsTotal,
      rushFee,
    },
  };
}

export function estimateGuestTier(guestCount: number): GuestTierId {
  if (guestCount >= 200) return '200+';
  if (guestCount >= 100) return '100-200';
  if (guestCount >= 50) return '50-100';
  if (guestCount > 0) return '20-50';
  return '20-50';
}
