/**
 * BookingWizard - Multi-Step B2B Event Inquiry Form
 * ==================================================
 * 4-step wizard for B2B event booking:
 * Step 1: Location Selection (Munich or Coburg)
 * Step 2: Event Basics (type, guests, date)
 * Step 3: Company & Contact (company, name, email, phone, message)
 * Step 4: Review & Confirmation
 *
 * Features:
 * - Progress bar with "Schritt X/4 – Fast fertig!"
 * - Inline validation with focus on first invalid field
 * - Formal "Sie" tone throughout
 * - Brand colors: accent-primary (orange)
 */

import React, { useEffect, useMemo, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Users,
  Calendar,
  Euro,
  Mail,
  Phone,
  Building2,
  User,
  Clock,
  Wine,
  Briefcase,
  Gift,
  MapPin,
} from 'lucide-react';
import { Button } from '@/components/atoms/Button/index.ts';
import {
  trackBookingStepView,
  trackBookingSubmitError,
  trackBookingSubmitSuccess,
  getUTMParams,
} from '@/analytics/trackEvent.ts';
import { useBookingFlow } from './hooks/useBookingFlow.ts';
import type { BookingWizardProps } from './types.ts';
import {
  eventTypes,
  guestRanges,
  locations,
  stepTitles,
  validEventTypes,
  validGuestRanges,
} from './constants.ts';
import {
  bookingWizardSchema,
  bookingWizardDefaultValues,
  type BookingWizardValues,
} from '@/lib/forms/schemas/booking.ts';
import { useFormAutosave } from '@/hooks/useFormAutosave.ts';
import { useBookingStore, bookingSelectors } from '@/store/useBookingStore.ts';
import { calculatePrice } from '@/services/booking/pricing.ts';
import { ep } from '@/lib/api/endpoints.ts';

export const BookingWizard: React.FC<BookingWizardProps> = ({
  onComplete,
  className = '',
  defaultEventType,
  defaultGuestCount,
  source = 'booking-wizard',
}) => {
  const [searchParams] = useSearchParams();
  const {
    currentStep,
    isSubmitting,
    isComplete,
    submitError,
    setCurrentStep,
    goToNextStep,
    goToPrevStep,
    setIsSubmitting,
    setIsComplete,
    setSubmitError,
  } = useBookingFlow();
  const formRef = useRef<HTMLFormElement>(null);

  // Get pre-fill values from URL params or props (URL params take priority)
  const urlEventType = searchParams.get('eventType') || searchParams.get('type');
  const urlGuestCount = searchParams.get('guests');
  const urlSource = searchParams.get('utm_source') || searchParams.get('source') || source;
  const draft = useBookingStore(bookingSelectors.draft);
  const { setDraft, setPricingEstimate } = useBookingStore((state) => ({
    setDraft: state.setDraft,
    setPricingEstimate: state.setPricingEstimate,
  }));

  // Validate and apply pre-fill values
  const initialEventType = validEventTypes.includes(urlEventType || '')
    ? urlEventType
    : validEventTypes.includes(defaultEventType || '')
      ? defaultEventType
      : '';
  const initialGuestCount = validGuestRanges.includes(urlGuestCount || '')
    ? urlGuestCount
    : validGuestRanges.includes(defaultGuestCount || '')
      ? defaultGuestCount
      : '';

  const form = useForm<BookingWizardValues, unknown, BookingWizardValues>({
    resolver: zodResolver<BookingWizardValues, unknown, BookingWizardValues>(bookingWizardSchema),
    defaultValues: {
      ...bookingWizardDefaultValues,
      ...draft,
      eventType: initialEventType || draft.eventType || '',
      guestCount: initialGuestCount || draft.guestCount || '',
    },
    mode: 'onChange',
  });

  // Persist drafts so B2B users don't lose lengthy inquiries
  useFormAutosave<BookingWizardValues>(form, {
    storageKey: 'booking-wizard-draft',
    debounceMs: 800,
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    trigger,
    setFocus,
  } = form;
  const { isDirty } = form.formState;

  // Watch specific fields to avoid reference issues
  // Watch form fields for each step
  const location = watch('location');
  const eventType = watch('eventType');
  const guestCount = watch('guestCount');
  const eventDate = watch('eventDate');
  const company = watch('company');
  const firstName = watch('firstName');
  const lastName = watch('lastName');
  const email = watch('email');
  const phone = watch('phone');
  const message = watch('message');
  const privacyAccepted = watch('privacyAccepted');

  // Use watch subscription to avoid infinite loops
  useEffect(() => {
    const subscription = watch((value, { name: _name }) => {
      // Only persist draft if form is dirty (has changes)
      if (isDirty) {
        setDraft(value as BookingWizardValues);
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, setDraft, isDirty]);

  // Compute pricing estimate during render to avoid infinite loops
  const computedPricingEstimate = useMemo(() => {
    if (eventType && guestCount) {
      const estimate = calculatePrice({
        eventType,
        guestCount,
        duration: '4-5h', // Default duration since we removed the selection
        addons: [],
        rush: false,
      });
      return estimate.total;
    }
    return undefined;
  }, [eventType, guestCount]);

  // Update pricing estimate in store when it changes
  useEffect(() => {
    setPricingEstimate(computedPricingEstimate);
  }, [computedPricingEstimate, setPricingEstimate]);

  // Focus management: Only focus on first error when form is submitted or step changes, not on every error change
  const hasTriedSubmitRef = useRef(false);
  const previousStepRef = useRef(currentStep);

  useEffect(() => {
    const stepChanged = previousStepRef.current !== currentStep;
    previousStepRef.current = currentStep;

    const firstError = Object.keys(errors)[0] as keyof BookingWizardValues | undefined;
    if (firstError && (hasTriedSubmitRef.current || stepChanged)) {
      setFocus(firstError);
      hasTriedSubmitRef.current = false; // Reset after focusing
    }
  }, [errors, setFocus, currentStep]);

  // Track step views for the booking wizard
  useEffect(() => {
    const currentTitle = stepTitles[currentStep - 1]?.title;
    trackBookingStepView(currentStep, currentTitle);
  }, [currentStep]);

  const canProceed = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!location;
      case 2:
        return !!eventType && !!guestCount && !!eventDate;
      case 3:
        return !!company && !!firstName && !!lastName && !!email && privacyAccepted;
      default:
        return true;
    }
  };

  const stepForField = (field: keyof BookingWizardValues): 1 | 2 | 3 | 4 => {
    if (field === 'location') return 1;
    if (field === 'eventType' || field === 'guestCount' || field === 'eventDate') return 2;
    if (
      field === 'company' ||
      field === 'vatId' ||
      field === 'costCenter' ||
      field === 'firstName' ||
      field === 'lastName' ||
      field === 'email' ||
      field === 'phone' ||
      field === 'message' ||
      field === 'privacyAccepted'
    ) {
      return 3;
    }
    return 4;
  };

  const onInvalid = (formErrors: Record<string, unknown>) => {
    const first = Object.keys(formErrors)[0] as keyof BookingWizardValues | undefined;
    if (!first) return;
    hasTriedSubmitRef.current = true;
    setCurrentStep(stepForField(first));
  };

  const validateStep = async (step: number): Promise<boolean> => {
    switch (step) {
      case 1:
        return await trigger(['location']);
      case 2:
        return await trigger(['eventType', 'guestCount', 'eventDate']);
      case 3:
        return await trigger(['company', 'firstName', 'lastName', 'email', 'privacyAccepted']);
      default:
        return true;
    }
  };

  const nextStep = async () => {
    hasTriedSubmitRef.current = true;
    const isValid = await validateStep(currentStep);
    if (currentStep < 4 && isValid && canProceed(currentStep)) {
      goToNextStep();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      goToPrevStep();
    }
  };

  const onSubmit: SubmitHandler<BookingWizardValues> = async (data) => {
    hasTriedSubmitRef.current = true;
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const bookingPayload = {
        location: data.location,
        customerName: `${data.firstName} ${data.lastName}`.trim(),
        customerEmail: data.email,
        company: data.company,
        phone: data.phone || undefined,
        eventType: data.eventType,
        guestCount: data.guestCount,
        eventDate: data.eventDate,
        message: data.message || undefined,
        vatId: data.vatId || undefined,
        costCenter: data.costCenter || undefined,
        source: urlSource,
      };

      const response = await fetch(ep.booking(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingPayload),
      });

      const result = await response.json();

      if (!response.ok || !result.ok) {
        throw new Error(result.error || 'Booking submission failed');
      }

      // Track successful submission with source and UTM params
      const utmParams = getUTMParams();
      trackBookingSubmitSuccess(urlSource, utmParams);

      setIsComplete(true);
      setCurrentStep(4);
      onComplete?.();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'request_failed';
      // Track failed submission without sending PII
      trackBookingSubmitError(errorMessage, urlSource);

      console.error('Booking wizard error:', error);
      setSubmitError(
        'Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut oder rufen Sie uns an.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const ProgressBar = () => (
    <div className='mb-8'>
      <div className='mb-2 flex items-center justify-between'>
        <span className='font-(--typography-font-weight-medium) text-(--typography-body-small) text-[#fff8ec]/80'>
          Schritt {currentStep}/4 {currentStep === 3 ? '– Fast fertig!' : ''}
        </span>
        <span className='text-(--typography-body-small) text-[#fff8ec]/60'>
          {Math.round((currentStep / 4) * 100)}%
        </span>
      </div>
      <div className='h-2 overflow-hidden rounded-full bg-[#003141]/20'>
        <div
          className='h-full rounded-full bg-[#ee7868] transition-all duration-500 ease-out'
          style={{ width: `${(currentStep / 4) * 100}%` }}
        />
      </div>
      <div className='mt-2 flex justify-between'>
        {stepTitles.map((s) => (
          <div
            key={s.step}
            className={`flex items-center gap-2 text-(--typography-body-small) ${
              currentStep >= s.step ? 'text-[#ee7868]' : 'text-[#fff8ec]/50'
            }`}
          >
            {currentStep > s.step ? (
              <span className='flex h-4 w-4 items-center justify-center rounded-full bg-[#ee7868]'>
                <Check size={12} className='text-[#fff8ec]' />
              </span>
            ) : (
              <span
                className={`flex h-4 w-4 items-center justify-center rounded-full font-(--typography-font-weight-bold) text-(--typography-body-small) ${
                  currentStep === s.step
                    ? 'bg-[#ee7868] text-[#003141]'
                    : 'bg-[#003141]/10 text-[#003141]/60'
                }`}
              >
                {s.step}
              </span>
            )}
            <span className='hidden sm:inline'>{s.title}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const Step1 = () => (
    <div className='space-y-8'>
      <h3 className='mb-8 font-(--typography-font-weight-semibold) text-(--typography-headline-md) text-[#fff8ec]'>
        <MapPin className='mr-2 inline' size={20} />
        Bitte wählen Sie Ihren Standort
      </h3>
      <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
        {locations.map((loc) => (
          <button
            key={loc.id}
            type='button'
            onClick={() => setValue('location', loc.id as 'munich' | 'coburg')}
            className={`flex items-start gap-4 rounded-xl border p-6 text-left transition-colors duration-200 ease-out ${
              location === loc.id
                ? 'border-[#ee7868] bg-[#ee7868] hover:bg-[#f08b7d]'
                : 'border-[#003141] bg-[#fff8ec] hover:bg-[rgba(255,248,236,0.9)]'
            }`}
          >
            <div
              className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-lg ${
                location === loc.id
                  ? 'bg-[#fff8ec] text-[#003141]'
                  : 'bg-[#003141] text-[#fff8ec]'
              }`}
            >
              <loc.icon size={28} />
            </div>
            <div>
              <div
                className={`font-(--typography-font-weight-bold) text-xl ${
                  location === loc.id ? 'text-[#fff8ec]' : 'text-[#003141]'
                }`}
              >
                {loc.label}
              </div>
              <div
                className={`text-(--typography-body) ${
                  location === loc.id ? 'text-[#fff8ec]/90' : 'text-[#003141]/70'
                }`}
              >
                {loc.description}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const Step2 = () => (
    <div className='space-y-8'>
      <div>
        <h3 className='mb-8 font-(--typography-font-weight-semibold) text-(--typography-headline-md) text-[#fff8ec]'>
          Welche Art von Event planen Sie?
        </h3>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          {eventTypes.map((type) => (
            <button
              key={type.id}
              type='button'
              onClick={() => setValue('eventType', type.id)}
              className={`flex items-start gap-4 rounded-xl border p-4 text-left transition-colors duration-200 ease-out ${
                eventType === type.id
                  ? 'border-[#ee7868] bg-[#ee7868] hover:bg-[#f08b7d]'
                  : 'border-[#003141] bg-[#fff8ec] hover:bg-[rgba(255,248,236,0.9)]'
              }`}
            >
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                  eventType === type.id
                    ? 'bg-[#fff8ec] text-[#003141]'
                    : 'bg-[#003141] text-[#fff8ec]'
                }`}
              >
                <type.icon size={20} />
              </div>
              <div>
                <div
                  className={`font-(--typography-font-weight-medium) ${
                    eventType === type.id ? 'text-[#fff8ec]' : 'text-[#003141]'
                  }`}
                >
                  {type.label}
                </div>
                <div
                  className={`text-(--typography-body-small) ${
                    eventType === type.id ? 'text-[#fff8ec]/90' : 'text-[#003141]/70'
                  }`}
                >
                  {type.description}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className='mb-8 font-(--typography-font-weight-semibold) text-(--typography-headline-md) text-[#fff8ec]'>
          <Users className='mr-2 inline' size={20} />
          Wie viele Gäste erwarten Sie?
        </h3>
        <div className='grid grid-cols-2 gap-8 sm:grid-cols-4'>
          {guestRanges.map((range) => (
            <button
              key={range.id}
              type='button'
              onClick={() => setValue('guestCount', range.id)}
              className={`rounded-xl border p-4 text-center transition-colors duration-200 ease-out ${
                guestCount === range.id
                  ? 'border-[#ee7868] bg-[#ee7868] hover:bg-[#f08b7d]'
                  : 'border-[#003141] bg-[#fff8ec] hover:bg-[rgba(255,248,236,0.9)]'
              }`}
            >
              <Users
                className={`mx-auto mb-2 ${
                  guestCount === range.id ? 'text-[#fff8ec]' : 'text-[#003141]'
                }`}
                size={24}
              />
              <div
                className={`font-(--typography-font-weight-medium) ${
                  guestCount === range.id ? 'text-[#fff8ec]' : 'text-[#003141]'
                }`}
              >
                {range.label}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className='mb-0 block font-(--typography-font-weight-medium) text-(--typography-body-small) text-[#fff8ec]'>
          <Calendar className='mr-2 inline' size={16} />
          Wann findet Ihr Event statt? *
        </label>
        <input
          type='date'
          {...register('eventDate', { required: 'Bitte wählen Sie ein Datum' })}
          className={`w-full rounded-xl border-2 bg-[#fff8ec] px-4 py-4 text-[#003141] focus:ring-2 focus:ring-[#ee7868]/20 focus:outline-none ${
            errors.eventDate ? 'border-red-500' : 'border-[#003141] focus:border-[#ee7868]'
          }`}
          min={new Date().toISOString().split('T')[0]}
        />
        {errors.eventDate && (
          <span className='mt-0 text-(--typography-body-small) text-red-600'>
            {errors.eventDate.message}
          </span>
        )}
      </div>
    </div>
  );

  const Step3 = () => (
    <div className='space-y-8'>
      <div>
        <label className='mb-0 block font-(--typography-font-weight-medium) text-(--typography-body-small) text-[#fff8ec]'>
          <Building2 className='mr-2 inline' size={16} />
          Unternehmen *
        </label>
        <input
          type='text'
          {...register('company', { required: 'Unternehmen ist erforderlich' })}
          placeholder='Ihr Firmenname'
          className={`w-full rounded-xl border-2 bg-[#fff8ec] px-4 py-4 text-[#003141] focus:ring-2 focus:ring-[#ee7868]/20 focus:outline-none ${
            errors.company ? 'border-red-500' : 'border-[#003141] focus:border-[#ee7868]'
          }`}
        />
        {errors.company && (
          <span className='mt-0 text-(--typography-body-small) text-red-600'>
            {errors.company.message}
          </span>
        )}
      </div>

      <div className='grid grid-cols-1 gap-8 sm:grid-cols-2'>
        <div>
          <label className='mb-0 block font-(--typography-font-weight-medium) text-(--typography-body-small) text-[#fff8ec]'>
            <User className='mr-2 inline' size={16} />
            Vorname *
          </label>
          <input
            type='text'
            {...register('firstName', { required: 'Vorname ist erforderlich' })}
            className={`w-full rounded-xl border-2 bg-[#fff8ec] px-4 py-4 text-[#003141] focus:ring-2 focus:ring-[#ee7868]/20 focus:outline-none ${
              errors.firstName ? 'border-red-500' : 'border-[#003141] focus:border-[#ee7868]'
            }`}
          />
          {errors.firstName && (
            <span className='mt-0 text-(--typography-body-small) text-red-600'>
              {errors.firstName.message}
            </span>
          )}
        </div>

        <div>
          <label className='mb-0 block font-(--typography-font-weight-medium) text-(--typography-body-small) text-[#fff8ec]'>
            Nachname *
          </label>
          <input
            type='text'
            {...register('lastName', { required: 'Nachname ist erforderlich' })}
            className={`w-full rounded-xl border-2 bg-[#fff8ec] px-4 py-4 text-[#003141] focus:ring-2 focus:ring-[#ee7868]/20 focus:outline-none ${
              errors.lastName ? 'border-red-500' : 'border-[#003141] focus:border-[#ee7868]'
            }`}
          />
          {errors.lastName && (
            <span className='mt-0 text-(--typography-body-small) text-red-600'>
              {errors.lastName.message}
            </span>
          )}
        </div>
      </div>

      <div className='mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2'>
        <div>
          <label className='mb-0 block font-(--typography-font-weight-medium) text-(--typography-body-small) text-[#fff8ec]'>
            USt‑ID (optional)
          </label>
          <input
            type='text'
            {...register('vatId')}
            placeholder='DE123456789'
            className='flex h-full w-full flex-col rounded-xl border-2 border-[#003141] bg-[#fff8ec] px-8 py-4 text-[#003141] focus:border-[#ee7868] focus:ring-2 focus:ring-[#ee7868]/20 focus:outline-none'
          />
        </div>
        <div>
          <label className='mb-0 block font-(--typography-font-weight-medium) text-(--typography-body-small) text-[#fff8ec]'>
            Kostenstelle (optional)
          </label>
          <input
            type='text'
            {...register('costCenter')}
            placeholder='z. B. 12345'
            className='flex h-full w-full flex-col rounded-xl border-2 border-[#003141] bg-[#fff8ec] px-8 py-4 text-[#003141] focus:border-[#ee7868] focus:ring-2 focus:ring-[#ee7868]/20 focus:outline-none'
          />
        </div>
      </div>

      <div>
        <label className='mb-0 block font-(--typography-font-weight-medium) text-(--typography-body-small) text-[#fff8ec]'>
          <Mail className='mr-2 inline' size={16} />
          E-Mail *
        </label>
        <input
          type='email'
          {...register('email', {
            required: 'E-Mail ist erforderlich',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Ungültige E-Mail-Adresse',
            },
          })}
          className={`w-full rounded-xl border-2 bg-[#fff8ec] px-4 py-4 text-[#003141] focus:ring-2 focus:ring-[#ee7868]/20 focus:outline-none ${
            errors.email ? 'border-red-500' : 'border-[#003141] focus:border-[#ee7868]'
          }`}
        />
        {errors.email && (
          <span className='mt-0 text-(--typography-body-small) text-red-600'>
            {errors.email.message}
          </span>
        )}
      </div>

      <div>
        <label className='mb-0 block font-(--typography-font-weight-medium) text-(--typography-body-small) text-[#fff8ec]'>
          <Phone className='mr-2 inline' size={16} />
          Telefon (optional)
        </label>
        <input
          type='tel'
          {...register('phone')}
          placeholder='+49 123 456 7890'
          className='w-full rounded-xl border-2 border-[#003141] bg-[#fff8ec] px-8 py-4 text-[#003141] focus:border-[#ee7868] focus:ring-2 focus:ring-[#ee7868]/20 focus:outline-none'
        />
      </div>
      
      <div>
        <label className='mb-0 block font-(--typography-font-weight-medium) text-(--typography-body-small) text-[#fff8ec]'>
          Weitere Informationen (optional)
        </label>
        <textarea
          {...register('message')}
          rows={3}
          placeholder='Besondere Wünsche, Fragen, Details zu Ihrem Event...'
          className='w-full resize-none rounded-xl border-2 border-[#003141] bg-[#fff8ec] px-8 py-4 text-[#003141] focus:border-[#ee7868] focus:ring-2 focus:ring-[#ee7868]/20 focus:outline-none'
        />
      </div>
      
      <div className='flex items-start gap-3'>
        <input
          type='checkbox'
          id='privacy'
          {...register('privacyAccepted', {
            required: 'Bitte akzeptieren Sie die Datenschutzerklärung',
          })}
          className='mt-1 h-5 w-5 shrink-0 rounded border-[#003141]/20 text-[#ee7868] focus:ring-[#ee7868]'
        />
        <label
          htmlFor='privacy'
          className='leading-snug text-(--typography-body-small) text-[#fff8ec]/90'
        >
          Ich stimme der{' '}
          <a
            href='/datenschutz'
            className='text-[#ee7868] transition duration-200 ease-out hover:underline'
            target='_blank'
          >
            Datenschutzerklärung
          </a>{' '}
          zu. *
        </label>
      </div>
      {errors.privacyAccepted && (
        <span className='text-(--typography-body-small) text-[#fff8ec]/90'>
          {errors.privacyAccepted.message}
        </span>
      )}

      {submitError && (
        <div className='rounded-xl border border-red-200 bg-red-50 p-8 text-sm text-red-600'>
          {submitError}
        </div>
      )}
    </div>
  );

  /* Step3 for drinks/duration/budget has been removed and replaced with Company & Contact info */

  const Step4 = () => {
    if (isSubmitting || isComplete) {
      return (
        <div className='py-8 text-center'>
          <div className='mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-green-100'>
            <Check className='text-green-600' size={40} />
          </div>
          <h3 className='mb-8 font-(--typography-font-weight-bold) text-(--typography-headline-lg) text-[#fff8ec]'>
            {isSubmitting ? 'Anfrage wird gesendet...' : 'Vielen Dank für Ihre Anfrage!'}
          </h3>
          <p className='mx-auto mb-8 max-w-md text-(--typography-body-standard) text-[#fff8ec]/80'>
            {isSubmitting ? 'Bitte haben Sie einen Moment Geduld...' : 'Wir haben Ihre Anfrage erhalten und melden uns innerhalb von 24 Stunden bei Ihnen.'}
          </p>

          {isComplete && (
            <>
              <div className='mx-auto max-w-md rounded-xl bg-[#fff8ec] p-8 text-left'>
                <h4 className='mb-0 font-(--typography-font-weight-semibold) text-[#003141]'>
                  Zusammenfassung:
                </h4>
                <div className='space-y-0 text-(--typography-body-small) text-[#003141]/80'>
                  <div>
                    <strong>Standort:</strong> {locations.find((l) => l.id === watch('location'))?.label}
                  </div>
                  <div>
                    <strong>Event:</strong> {eventTypes.find((t) => t.id === watch('eventType'))?.label}
                  </div>
                  <div>
                    <strong>Gäste:</strong> {guestRanges.find((g) => g.id === watch('guestCount'))?.label}
                  </div>
                  <div>
                    <strong>Datum:</strong> {watch('eventDate')}
                  </div>
                  <div>
                    <strong>Unternehmen:</strong> {watch('company')}
                  </div>
                  <div>
                    <strong>Kontakt:</strong> {watch('firstName')} {watch('lastName')}
                  </div>
                  <div>
                    <strong>E-Mail:</strong> {watch('email')}
                  </div>
                </div>
              </div>

              <div className='mt-8 flex flex-col justify-center gap-8 sm:flex-row'>
                <a
                  href='tel:+4916094623196'
                  className='inline-flex items-center justify-center gap-0 rounded-xl border border-[#003141] bg-[#fff8ec] px-8 py-4 font-(--typography-font-weight-medium) text-[#003141] transition-colors duration-200 ease-out hover:bg-[#003141] hover:text-[#fff8ec]'
                >
                  <Phone size={18} />
                  Jetzt anrufen
                </a>
              </div>
            </>
          )}
        </div>
      );
    }

    return (
      <div className='space-y-8'>
        <div className='rounded-xl bg-[#fff8ec] p-8'>
          <h4 className='mb-8 font-(--typography-font-weight-semibold) text-(--typography-headline-md) text-[#003141]'>
            Bitte überprüfen Sie Ihre Angaben:
          </h4>

          <div className='space-y-8'>
            <div className='border-b border-[#003141]/20 pb-8'>
              <h5 className='mb-8 font-(--typography-font-weight-medium) text-[#003141]'>
                Standort
              </h5>
              <div className='grid grid-cols-1 gap-8 text-(--typography-body-small) text-[#003141]/80 sm:grid-cols-2'>
                <div>
                  <strong>Standort:</strong>{' '}
                  {locations.find((l) => l.id === watch('location'))?.label || '—'}
                </div>
              </div>
            </div>
            
            <div className='border-b border-[#003141]/20 pb-8'>
              <h5 className='mb-8 font-(--typography-font-weight-medium) text-[#003141]'>
                Event-Details
              </h5>
              <div className='grid grid-cols-1 gap-8 text-(--typography-body-small) text-[#003141]/80 sm:grid-cols-2'>
                <div>
                  <strong>Event-Typ:</strong>{' '}
                  {eventTypes.find((t) => t.id === watch('eventType'))?.label || '—'}
                </div>
                <div>
                  <strong>Gästezahl:</strong>{' '}
                  {guestRanges.find((g) => g.id === watch('guestCount'))?.label || '—'}
                </div>
                <div>
                  <strong>Datum:</strong> {watch('eventDate') || '—'}
                </div>
              </div>
            </div>

            <div className='border-b border-[#003141]/20 pb-8'>
              <h5 className='mb-8 font-(--typography-font-weight-medium) text-[#003141]'>
                Kontaktdaten
              </h5>
              <div className='grid grid-cols-1 gap-8 text-(--typography-body-small) text-[#003141]/80 sm:grid-cols-2'>
                <div>
                  <strong>Unternehmen:</strong> {watch('company') || '—'}
                </div>
                <div>
                  <strong>Name:</strong> {watch('firstName')} {watch('lastName')}
                </div>
                <div>
                  <strong>E-Mail:</strong> {watch('email') || '—'}
                </div>
                <div>
                  <strong>Telefon:</strong> {watch('phone') || '—'}
                </div>
              </div>
            </div>

            {watch('message') && (
              <div>
                <h5 className='mb-8 font-(--typography-font-weight-medium) text-[#003141]'>
                  Nachricht
                </h5>
                <div className='text-(--typography-body-small) text-[#003141]/80'>
                  {watch('message')}
                </div>
              </div>
            )}
          </div>
        </div>

        {submitError && (
          <div className='rounded-xl border border-red-200 bg-red-50 p-8 text-(--typography-body-small) text-red-600'>
            {submitError}
          </div>
        )}
      </div>
    );
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return Step1();
      case 2:
        return Step2();
      case 3:
        return Step3();
      case 4:
        return Step4();
      default:
        return Step1();
    }
  };

  return (
    <div
      className={`min-w-0 rounded-2xl border border-[#003141]/10 p-6 shadow-lg md:p-8 ${className}`}
      style={{ backgroundColor: '#003141' }}
    >
      {ProgressBar()}

      <div className='mb-8'>
        <h2 className='font-(--typography-font-weight-bold) text-(--typography-headline-lg) text-[#fff8ec]'>
          {stepTitles[currentStep - 1].title}
        </h2>
        <p className='text-(--typography-body-standard) text-[#fff8ec]/80'>
          {stepTitles[currentStep - 1].subtitle}
        </p>
      </div>

      <form ref={formRef} onSubmit={handleSubmit(onSubmit, onInvalid)}>
        {/* Honeypot field: kept visually hidden but present for bots to fill */}
        <input
          type='text'
          aria-hidden='true'
          tabIndex={-1}
          autoComplete='off'
          style={{ display: 'none' }}
          {...register('website')}
        />

        {renderStep()}

        {!isComplete && (
          <div className='mt-8 flex items-center justify-center gap-4 border-t border-gray-200 pt-8'>
            {currentStep > 1 && (
              <Button
                type='button'
                variant='coral'
                size='md'
                onClick={prevStep}
                className='min-w-[120px]'
              >
                <ArrowLeft className='mr-2' size={16} />
                Zurück
              </Button>
            )}

            {currentStep < 4 ? (
              <Button
                type='button'
                variant='coral'
                size='md'
                onClick={nextStep}
                disabled={!canProceed(currentStep)}
                className='min-w-[120px]'
              >
                {currentStep === 3 ? 'Zur Zusammenfassung' : 'Weiter'}
                <ArrowRight className='ml-2' size={16} />
              </Button>
            ) : (
              <Button
                type='submit'
                variant='coral'
                size='md'
                disabled={isSubmitting}
                className='min-w-[140px]'
              >
                {isSubmitting ? 'Wird gesendet...' : 'Anfrage absenden'}
                <ArrowRight className='ml-2' size={16} />
              </Button>
            )}
          </div>
        )}
      </form>
    </div>
  );
};

export default BookingWizard;
