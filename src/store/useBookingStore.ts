import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { StateCreator } from 'zustand';
import type { BookingWizardValues } from '@/lib/forms/schemas/booking.ts';
import { bookingWizardDefaultValues } from '@/lib/forms/schemas/booking.ts';
import { getItemSafe, setItemSafe, removeItemSafe } from '@/lib/storage/localStorageSafe.ts';

const STORAGE_KEY = 'booking-store-draft';

type BookingState = {
  draft: BookingWizardValues;
  pricingEstimate?: number;
};

type BookingActions = {
  setField: <K extends keyof BookingWizardValues>(field: K, value: BookingWizardValues[K]) => void;
  setDraft: (draft: BookingWizardValues) => void;
  setPricingEstimate: (value: number | undefined) => void;
  reset: () => void;
  hydrate: () => void;
  persist: () => void;
};

const initialDraft = getItemSafe<BookingWizardValues>(STORAGE_KEY);

const storeCreator: StateCreator<
  BookingState & BookingActions,
  [],
  [],
  BookingState & BookingActions
> = (set, get) => ({
  draft: initialDraft
    ? { ...bookingWizardDefaultValues, ...initialDraft }
    : bookingWizardDefaultValues,
  pricingEstimate: undefined,
  setField: <K extends keyof BookingWizardValues>(field: K, value: BookingWizardValues[K]) =>
    set((state: BookingState) => ({
      draft: { ...state.draft, [field]: value },
    })),
  setDraft: (draft: BookingWizardValues) => set({ draft }),
  setPricingEstimate: (value: number | undefined) => set({ pricingEstimate: value }),
  reset: () => {
    set({ draft: bookingWizardDefaultValues, pricingEstimate: undefined });
    removeItemSafe(STORAGE_KEY);
  },
  hydrate: () => {
    const stored = getItemSafe<BookingWizardValues>(STORAGE_KEY);
    if (stored) {
      set({ draft: { ...bookingWizardDefaultValues, ...stored } });
    }
  },
  persist: () => {
    const { draft } = get();
    setItemSafe(STORAGE_KEY, draft);
  },
});

export const useBookingStore = create<BookingState & BookingActions>()(devtools(storeCreator));

export const bookingSelectors = {
  draft: (state: BookingState) => state.draft,
  pricingEstimate: (state: BookingState) => state.pricingEstimate,
};
