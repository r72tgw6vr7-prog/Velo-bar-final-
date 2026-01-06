import { LucideIcon } from 'lucide-react';

export type BookingStep = 1 | 2 | 3 | 4;

export interface Step1Data {
  eventType: string;
  guestCount: string;
  eventDate: string;
}

export interface Step2Data {
  company: string;
  vatId?: string;
  costCenter?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface Step3Data {
  drinkPreference: string;
  serviceDuration: string;
  budgetRange: string;
  message: string;
  privacyAccepted: boolean;
}

export interface BookingFormData extends Step1Data, Step2Data, Step3Data {
  website?: string; // honeypot field
}

export interface EventType {
  id: string;
  label: string;
  icon: LucideIcon;
  description: string;
}

export interface GuestRange {
  id: string;
  label: string;
}

export interface DrinkPreference {
  id: string;
  label: string;
  description: string;
}

export interface ServiceDuration {
  id: string;
  label: string;
  description: string;
}

export interface BudgetRange {
  id: string;
  label: string;
}

export interface StepTitle {
  step: BookingStep;
  title: string;
  subtitle: string;
}

export interface BookingWizardProps {
  onComplete?: () => void;
  className?: string;
  defaultEventType?: string;
  defaultGuestCount?: string;
  source?: string;
}
