import type { BookingFormValues, BookingWizardValues } from '@/lib/forms/schemas/booking.ts';

type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
  eventType?: string;
  eventDate?: string;
  guestCount?: string;
  budget?: string;
  eventLocation?: string;
  drinkPreference?: string;
  serviceDuration?: string;
  phone?: string;
  company?: string;
  vatId?: string;
  costCenter?: string;
  website?: string;
  source?: string;
  language?: string;
  privacyPolicy?: boolean;
};

export function toContactPayloadFromSimple(values: BookingFormValues): ContactPayload {
  return {
    name: values.name,
    email: values.email,
    subject: `Event-Anfrage: ${values.service || 'Velobar Event'}`,
    message:
      `Event-Typ: ${values.service || 'Nicht angegeben'}\n` +
      `Wunschtermin: ${values.date || 'Nicht angegeben'} um ${values.time || 'Nach Vereinbarung'}\n` +
      `Telefon: ${values.phone}\n` +
      `Nachricht: ${values.message || 'Keine zusätzlichen Angaben'}`,
    eventType: values.service,
    eventDate: values.date,
    eventLocation: '',
    guestCount: '',
    budget: '',
    language: 'DE',
    company: values.company || undefined,
    vatId: values.vatId || undefined,
    costCenter: values.costCenter || undefined,
    website: values.website || undefined,
  };
}

export function toContactPayloadFromWizard(
  values: BookingWizardValues,
  options?: { source?: string },
): ContactPayload {
  const name = `${values.firstName} ${values.lastName}`.trim();
  return {
    name,
    email: values.email,
    phone: values.phone,
    subject: `Event-Anfrage: ${values.eventType || 'Velobar Event'}`,
    message:
      `Event-Typ: ${values.eventType}\n` +
      `Gäste: ${values.guestCount}\n` +
      `Datum: ${values.eventDate}\n` +
      `Dauer: ${values.serviceDuration}\n` +
      `Getränke: ${values.drinkPreference}\n` +
      `Budget: ${values.budgetRange}\n` +
      `Nachricht: ${values.message || 'Keine zusätzlichen Angaben'}`,
    eventType: values.eventType,
    eventDate: values.eventDate,
    guestCount: values.guestCount,
    budget: values.budgetRange,
    drinkPreference: values.drinkPreference,
    serviceDuration: values.serviceDuration,
    company: values.company,
    vatId: values.vatId || undefined,
    costCenter: values.costCenter || undefined,
    website: values.website || undefined,
    source: options?.source,
    language: 'DE',
    privacyPolicy: values.privacyAccepted,
  };
}
