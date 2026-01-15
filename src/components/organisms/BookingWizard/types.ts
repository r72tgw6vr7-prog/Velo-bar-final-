import type { ComponentType, SVGProps } from 'react';

type IconComponent = ComponentType<
  SVGProps<SVGSVGElement> & {
    size?: string | number;
  }
>;

export type BookingStep = 1 | 2 | 3 | 4;

export interface Step1Data {
  location: string;
}

export interface Step2Data {
  eventType: string;
  guestCount: string;
  eventDate: string;
}

export interface Step3Data {
  company: string;
  vatId?: string;
  costCenter?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  privacyAccepted: boolean;
}

export interface BookingFormData extends Step1Data, Step2Data, Step3Data {
  website?: string; // honeypot field
}

export interface EventType {
  id: string;
  label: string;
  icon: IconComponent;
  description: string;
}

export interface GuestRange {
  id: string;
  label: string;
}

export interface Location {
  id: string;
  label: string;
  icon: IconComponent;
  description: string;
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
