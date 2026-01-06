/**
 * BookingForm (Event Inquiry)
 * ===========================
 * Secondary Velobar event inquiry form used in BookingSection and tests.
 * Submits to /api/contact, the canonical inquiry pipeline, with
 * event-focused fields (Datum, Uhrzeit, Service, Nachricht).
 * Keeps existing validation, CSRF handling, and accessibility.
 */

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, Button, Textarea, Select } from '@/components/atoms';
import { useState } from 'react';
// Use the stable toast wrapper so tests can mock it deterministically.
// cn import removed as it's no longer needed
import { toast } from '@/lib/toast';
import { ArrowRight, User, Phone, Calendar, Clock, MessageCircle, ChevronDown } from 'lucide-react';
import './BookingForm.css';
import { Link } from 'react-router-dom';
import { csrfFetch } from '@/lib/csrfHelper';
import { bookingFormSchema, type BookingFormValues } from '@/lib/forms/schemas/booking';
import { useAnalytics } from '@/hooks/useAnalytics';
import { toContactPayloadFromSimple } from '@/lib/forms/transformers/booking';

// Service and artist options (now event-focused, values kept simple)
const serviceOptions = [
  { value: 'firmenfeier', label: 'Firmenfeier' },
  { value: 'weihnachtsfeier', label: 'Weihnachtsfeier' },
  { value: 'messe', label: 'Messe / Promotion' },
  { value: 'hochzeit', label: 'Hochzeit' },
  { value: 'gin-tasting', label: 'Gin-Tasting / Workshop' },
];

const artistOptions = [
  { value: 'artist-1', label: 'Alex Johnson' },
  { value: 'artist-2', label: 'Sam Carter' },
  { value: 'artist-3', label: 'Jordan Lee' },
  { value: 'artist-4', label: 'Taylor Kim' },
  { value: 'no-preference', label: 'No Preference' },
];

interface BookingFormProps {
  className?: string;
}

export function BookingForm({ className = '' }: BookingFormProps) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmittingLocal, setIsSubmittingLocal] = useState(false);
  const [lastError, setLastError] = useState<string | null>(null);

  // (debug logs removed)

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      service: '',
      artist: '',
      message: '',
      company: '',
      vatId: '',
      costCenter: '',
      website: '',
      consent: false,
    },
    mode: 'onBlur',
  });

  // Define onSubmit with the correct type
  const { trackForm } = useAnalytics();

  const onSubmit = async (data: BookingFormValues) => {
    setIsSubmittingLocal(true);
    try {
      const payload = toContactPayloadFromSimple(data);

      const response = await csrfFetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => ({ success: false }));

      // (debug logs removed)

      if (!response.ok || !result?.success) {
        if (response.status === 429) {
          toast.error('Zu viele Anfragen', {
            description: 'Bitte warten Sie einen Moment, bevor Sie es erneut versuchen.',
          });
          setLastError('Zu viele Anfragen — bitte versuchen Sie es später erneut.');
        } else if (response.status === 400) {
          toast.error('Anfrage unvollständig', {
            description: 'Bitte prüfen Sie Ihre Angaben und versuchen Sie es erneut.',
          });
          setLastError('Anfrage unvollständig — bitte prüfen Sie Ihre Angaben.');
        } else {
          toast.error('Anfrage konnte nicht gesendet werden', {
            description: 'Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt.',
          });
          setLastError('Anfrage konnte nicht gesendet werden — bitte versuchen Sie es erneut.');
          // Track generic server error
          trackForm?.error && trackForm.error('booking', 'server');
          trackForm?.submitted && trackForm.submitted('booking', false);
        }
        return;
      }
      // Track success
      trackForm?.submitted && trackForm.submitted('booking', true);
      setIsSuccess(true);
      // (debug logs removed)
      toast.success('Anfrage erfolgreich gesendet!', {
        description: 'Wir melden uns schnellstmöglich mit einem unverbindlichen Angebot.',
      });
      reset();
      setLastError(null);

      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      toast.error('Anfrage konnte nicht gesendet werden', {
        description: 'Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt.',
      });
      setLastError('Anfrage konnte nicht gesendet werden — Netzwerkfehler.');
      trackForm?.error && trackForm.error('booking', 'network');
      trackForm?.submitted && trackForm.submitted('booking', false);
    } finally {
      setIsSubmittingLocal(false);
    }
  };

  // Track validation errors via react-hook-form's onInvalid
  const onInvalid = (formErrors: any) => {
    trackForm?.error && trackForm.error('booking', 'validation');
    trackForm?.submitted && trackForm.submitted('booking', false);
    setLastError('Bitte prüfen Sie die Eingaben.');
  };

  return (
    <div className={`booking-form-container ${className}`}>
      <div className='container mx-auto max-w-7xl px-8 lg:px-16'>
        <div className='grid grid-cols-1 items-start gap-16 lg:grid-cols-2'>
          {/* Left Column - Booking Info */}
          <div className='booking-info'>
            <h2 className='mb-8 text-3xl font-bold md:text-4xl'>Jetzt Event anfragen</h2>

            <p className='mb-16 text-(--color-text-on-dark-secondary)'>
              Planst du eine Firmenfeier, Hochzeit, Messe oder ein Gin-Tasting? Nutze das Formular,
              um uns kurz dein Event zu beschreiben – wir melden uns innerhalb von 24 Stunden mit
              einem unverbindlichen Angebot.
            </p>
            <div className='booking-contact-info space-y-8'>
              <h3 className='mb-8 text-2xl font-bold'>Alternative Kontaktwege:</h3>

              <div className='contact-item'>
                <p className='mb-0 font-medium'>E-Mail:</p>
                <a
                  href='mailto:hallo@velo-bar.com'
                  className='hover:text-brand-primary text-(--color-text-on-dark-secondary) transition-colors duration-300'
                >
                  hallo@velo-bar.com
                </a>
              </div>

              <div className='contact-item'>
                <p className='mb-0 font-medium'>Telefon:</p>
                <a
                  href='tel:+4916094623196'
                  className='hover:text-brand-primary text-(--color-text-on-dark-secondary) transition-colors duration-300'
                >
                  +49 160 94623196
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Form */}
          <div className='booking-form-wrapper'>
            {isSuccess ? (
              <div className='success-message flex flex-col py-16 text-center'>
                <div className='success-icon bg-brand-primary/20 mb-8 inline-flex h-16 w-16 flex-col items-center justify-center rounded-full'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='text-brand-primary h-8 w-8'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M5 13l4 4L19 7'
                    />
                  </svg>
                </div>
                <h3 className='mb-8 text-2xl font-bold'>Booking Submitted!</h3>
                <p className='mb-8 text-(--color-text-on-dark-secondary)'>
                  Vielen Dank für deine Anfrage. Wir melden uns schnellstmöglich mit einem
                  unverbindlichen Angebot.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className='hover:text-brand-primary hover:border-brand-primary flex flex-col border-b border-white text-white transition-colors duration-300'
                >
                  Neue Anfrage stellen
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit, onInvalid)} className='space-y-8' noValidate>
                {/* Accessible error alert for screen readers/tests */}
                {lastError && (
                  <div role='alert' aria-live='assertive' className='text-red-500'>
                    {lastError}
                  </div>
                )}
                {/* Honeypot field for bots */}
                <input
                  type='text'
                  aria-hidden='true'
                  tabIndex={-1}
                  autoComplete='off'
                  style={{ display: 'none' }}
                  {...register('website')}
                />
                <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
                  {/* Name */}
                  <div className='form-field relative'>
                    <User
                      size={18}
                      className='absolute top-1/2 left-0 -translate-y-1/2 text-white/50'
                    />
                    <label htmlFor='name' className='sr-only'>
                      Name
                    </label>
                    <Input
                      id='name'
                      placeholder='Full Name*'
                      error={errors.name?.message}
                      {...register('name')}
                      className='focus:border-brand-primary rounded-none border-b border-white/30 bg-transparent pb-0 pl-8'
                    />
                  </div>

                  {/* Phone */}
                  <div className='form-field relative'>
                    <Phone
                      size={18}
                      className='absolute top-1/2 left-0 -translate-y-1/2 text-white/50'
                    />
                    <label htmlFor='phone' className='sr-only'>
                      Phone
                    </label>
                    <Input
                      id='phone'
                      type='tel'
                      placeholder='Phone Number*'
                      error={errors.phone?.message}
                      {...register('phone')}
                      className='focus:border-brand-primary flex h-full flex-col rounded-none border-b border-white/30 bg-transparent pb-0 pl-8'
                    />
                  </div>

                  {/* Email */}
                  <div className='form-field relative'>
                    {/* Intentionally no icon to keep visual noise low */}
                    <label htmlFor='email' className='sr-only'>
                      Email
                    </label>
                    <Input
                      id='email'
                      type='email'
                      placeholder='Email Address*'
                      error={errors.email?.message}
                      {...register('email')}
                      className='focus:border-brand-primary rounded-none border-b border-white/30 bg-transparent pb-0 pl-8'
                    />
                  </div>

                  {/* Date */}
                  <div className='form-field relative'>
                    <Calendar
                      size={18}
                      className='absolute top-1/2 left-0 -translate-y-1/2 text-white/50'
                    />
                    <label htmlFor='date' className='sr-only'>
                      Date
                    </label>
                    <Input
                      id='date'
                      type='date'
                      placeholder='Preferred Date*'
                      error={errors.date?.message}
                      {...register('date')}
                      className='focus:border-brand-primary flex h-full flex-col rounded-none border-b border-white/30 bg-transparent pb-0 pl-8'
                    />
                  </div>

                  {/* Time */}
                  <div className='form-field relative'>
                    <Clock
                      size={18}
                      className='absolute top-1/2 left-0 -translate-y-1/2 text-white/50'
                    />
                    <label htmlFor='time' className='sr-only'>
                      Time
                    </label>
                    <Controller
                      name='time'
                      control={control}
                      render={({ field }) => (
                        <Select
                          id='time'
                          value={field.value}
                          onChange={field.onChange}
                          placeholder='Preferred Time*'
                          className='focus:border-brand-primary flex h-full appearance-none flex-col rounded-none border-b border-white/30 bg-transparent pb-0 pl-8'
                        >
                          <option value='' disabled>
                            Preferred Time*
                          </option>
                          <option value='morning'>Morning (9AM - 12PM)</option>
                          <option value='afternoon'>Afternoon (12PM - 5PM)</option>
                          <option value='evening'>Evening (5PM - 8PM)</option>
                        </Select>
                      )}
                    />
                    <ChevronDown
                      size={16}
                      className='pointer-events-none absolute top-1/2 right-0 -translate-y-1/2 text-white/50'
                    />
                  </div>

                  {/* Service Selection */}
                  <div className='form-field relative'>
                    <label htmlFor='service' className='sr-only'>
                      Service
                    </label>
                    <Controller
                      name='service'
                      control={control}
                      render={({ field }) => (
                        <Select
                          id='service'
                          value={field.value}
                          onChange={field.onChange}
                          placeholder='Choose Service*'
                          className='focus:border-brand-primary flex h-full appearance-none flex-col rounded-none border-b border-white/30 bg-transparent pb-0'
                        >
                          <option value='' disabled>
                            Choose Service*
                          </option>
                          {serviceOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </Select>
                      )}
                    />
                    <ChevronDown
                      size={16}
                      className='pointer-events-none absolute top-1/2 right-0 -translate-y-1/2 text-white/50'
                    />
                  </div>

                  {/* Artist Selection */}
                  <div className='form-field relative'>
                    <label htmlFor='artist' className='sr-only'>
                      Artist
                    </label>
                    <Controller
                      name='artist'
                      control={control}
                      render={({ field }) => (
                        <Select
                          id='artist'
                          value={field.value}
                          onChange={field.onChange}
                          placeholder='Choose Artist*'
                          className='focus:border-brand-primary flex h-full appearance-none flex-col rounded-none border-b border-white/30 bg-transparent pb-0'
                        >
                          <option value='' disabled>
                            Choose Artist*
                          </option>
                          {artistOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </Select>
                      )}
                    />
                    <ChevronDown
                      size={16}
                      className='pointer-events-none absolute top-1/2 right-0 -translate-y-1/2 text-white/50'
                    />
                  </div>
                </div>

                {/* Message */}
                <div className='form-field relative'>
                  <MessageCircle
                    size={18}
                    className='absolute top-6 left-0 -translate-y-1/2 text-white/50'
                  />
                  <label htmlFor='message' className='sr-only'>
                    Message
                  </label>
                  <Textarea
                    id='message'
                    placeholder='Type Message Here*'
                    rows={4}
                    {...register('message')}
                    className='focus:border-brand-primary rounded-none border-b border-white/30 bg-transparent pl-8'
                  />
                </div>

                {/* Terms Consent */}
                <div className='flex items-center space-x-8'>
                  <input
                    type='checkbox'
                    id='consent'
                    {...register('consent')}
                    className='focus:ring-brand-primary h-4 w-4 border-white/30 bg-transparent'
                  />
                  <label
                    htmlFor='consent'
                    className='text-sm text-(--color-text-on-dark-secondary)'
                  >
                    I agree to the{' '}
                    <Link
                      to='/terms'
                      className='hover:text-brand-primary text-white transition-colors duration-300'
                    >
                      Terms
                    </Link>{' '}
                    &{' '}
                    <Link
                      to='/privacy-policy'
                      className='hover:text-brand-primary text-white transition-colors duration-300'
                    >
                      Privacy Policy
                    </Link>
                    .
                  </label>
                </div>
                {errors.consent && (
                  <p className='mt-0 text-sm text-red-500'>{errors.consent.message}</p>
                )}

                {/* Submit Button */}
                <div className='mt-8 flex justify-end'>
                  <Button
                    type='submit'
                    variant='primary'
                    size='lg'
                    isLoading={isSubmittingLocal || isSubmitting}
                    icon={<ArrowRight size={16} />}
                    iconPosition='end'
                    disabled={isSubmittingLocal || isSubmitting}
                  >
                    {isSubmittingLocal || isSubmitting ? 'Submitting...' : 'Submit Now'}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
