import { z } from 'zod';
import {
  validEventTypes,
  validGuestRanges,
  drinkPreferences,
  serviceDurations,
  budgetRanges,
} from '@/components/organisms/BookingWizard/constants';

/**
 * Single-step booking form (BookingForm.tsx) schema
 */
export const bookingFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }).max(100),
  phone: z.string().min(7, { message: 'Valid phone number is required' }),
  email: z.string().email({ message: 'Valid email is required' }),
  date: z.string().min(1, { message: 'Date is required' }),
  time: z.string().min(1, { message: 'Time is required' }),
  service: z.string().min(1, { message: 'Please select a service' }),
  artist: z.string().min(1, { message: 'Please select an artist' }),
  message: z.string().optional(),
  consent: z.boolean().refine((val) => val === true, { message: 'You must agree to the terms' }),
  company: z.string().optional(),
  vatId: z.string().optional(),
  costCenter: z.string().optional(),
  website: z.string().optional(), // honeypot
});

export type BookingFormSchema = typeof bookingFormSchema;
export type BookingFormValues = z.infer<typeof bookingFormSchema>;

/**
 * Booking wizard (multi-step) schema
 */
export const bookingWizardSchema = z.object({
  eventType: z.string().refine((val) => validEventTypes.includes(val), {
    message: 'Bitte Event-Typ auswählen',
  }),
  guestCount: z.string().refine((val) => validGuestRanges.includes(val), {
    message: 'Bitte Gästeanzahl auswählen',
  }),
  eventDate: z.string().min(1, { message: 'Datum erforderlich' }),

  company: z.string().min(1, { message: 'Firma erforderlich' }),
  vatId: z.string().optional(),
  costCenter: z.string().optional(),
  firstName: z.string().min(1, { message: 'Vorname erforderlich' }),
  lastName: z.string().min(1, { message: 'Nachname erforderlich' }),
  email: z.string().email({ message: 'Gültige E-Mail erforderlich' }),
  phone: z.union([z.string().min(7, { message: 'Telefonnummer erforderlich' }), z.literal('')]),

  drinkPreference: z.string().refine((val) => drinkPreferences.some((d) => d.id === val), {
    message: 'Bitte Getränkepräferenz wählen',
  }),
  serviceDuration: z.string().refine((val) => serviceDurations.some((d) => d.id === val), {
    message: 'Bitte Servicedauer wählen',
  }),
  budgetRange: z.string().refine((val) => budgetRanges.some((b) => b.id === val), {
    message: 'Bitte Budget wählen',
  }),
  message: z.string().optional(),
  privacyAccepted: z
    .boolean()
    .refine((val) => val === true, { message: 'Bitte Datenschutz akzeptieren' }),
  website: z.string().optional(), // honeypot
});

export type BookingWizardSchema = typeof bookingWizardSchema;
export type BookingWizardValues = z.infer<typeof bookingWizardSchema>;

/**
 * Shared defaults for forms
 */
export const bookingWizardDefaultValues: BookingWizardValues = {
  eventType: '',
  guestCount: '',
  eventDate: '',
  company: '',
  vatId: '',
  costCenter: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  drinkPreference: '',
  serviceDuration: '',
  budgetRange: '',
  message: '',
  privacyAccepted: false,
  website: '',
};
