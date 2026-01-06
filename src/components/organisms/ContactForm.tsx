/**
 * ContactForm Component
 * =================
 * Standardized form for contact requests using design tokens
 */

import React, { useState } from 'react';
import { contactFormSchema, type ContactFormValues } from '@/lib/forms/schemas/contact';
import { cn } from '../../utils/classname';
import { Input, TextArea, Button, Checkbox, Select, SelectOption } from '../atoms';

interface FormData {
  name: string;
  email: string;
  service: string;
  message: string;
  privacyPolicy: boolean;
}

interface FormErrors {
  name?: string;
  email?: string;
  service?: string;
  message?: string;
  privacyPolicy?: string;
}

interface ContactFormProps {
  onSubmit: (data: FormData) => Promise<void>;
  className?: string;
}

// Service options for the select dropdown
const serviceOptions: SelectOption[] = [
  { value: '', label: 'Bitte wählen' },
  { value: 'webapp', label: 'Web-Applikation' },
  { value: 'website', label: 'Website' },
  { value: 'ecommerce', label: 'E-Commerce' },
  { value: 'consulting', label: 'Beratung' },
  { value: 'maintenance', label: 'Wartung & Support' },
  { value: 'other', label: 'Sonstiges' },
];

export const ContactForm: React.FC<ContactFormProps> = ({ onSubmit, className = '' }) => {
  const [formData, setFormData] = useState<ContactFormValues>({
    name: '',
    email: '',
    service: '',
    message: '',
    privacyPolicy: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = (): boolean => {
    const result = contactFormSchema.safeParse(formData);
    if (result.success) {
      setErrors({});
      return true;
    }

    const zodErrors = result.error.flatten().fieldErrors;
    const newErrors: FormErrors = {};
    for (const key of Object.keys(zodErrors)) {
      const k = key as keyof FormErrors;
      newErrors[k] = zodErrors[k]?.[0];
    }
    setErrors(newErrors);
    return false;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      // Show success message
      setSubmitSuccess(true);
      // Reset form on success
      setFormData({
        name: '',
        email: '',
        service: '',
        message: '',
        privacyPolicy: false,
      });
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  // Handle select changes
  const handleSelectChange = (name: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  return (
    <div
      className={cn(
        'card',
        'bg-navy',
        'border-accent-primary/10 border',
        'rounded-xl md:rounded-xl',
        'focus-within:shadow-accent-glow',
        'transition-shadow duration-300',
      )}
    >
      {submitSuccess ? (
        <div className={cn('text-center', 'px-4 py-8', 'animate-fadeIn')}>
          <div
            className={cn(
              'inline-flex items-center justify-center',
              'mb-4 h-16 w-16',
              'rounded-full',
              'bg-accent-primary/10',
              'text-accent-primary',
            )}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='32'
              height='32'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <polyline points='20 6 9 17 4 12'></polyline>
            </svg>
          </div>
          <h3 className={cn('mb-2 text-xl md:text-2xl', 'font-headline', 'text-accent-primary')}>
            Vielen Dank!
          </h3>
          <p className={cn('text-base', 'text-offwhite/70', 'mb-6')}>
            Deine Nachricht wurde erfolgreich gesendet. Wir werden uns so schnell wie möglich bei
            dir melden.
          </p>
          <Button
            variant='outline'
            onClick={() => setSubmitSuccess(false)}
            className={cn('mx-auto')}
          >
            Zurück zum Formular
          </Button>
        </div>
      ) : (
        <form
          role='form'
          onSubmit={handleSubmit}
          className={cn('space-y-6 md:space-y-8', className)}
        >
          <Input
            id='contact-name'
            name='name'
            label='Dein Name'
            placeholder='Wie sollen wir dich nennen?'
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            required
          />

          <Input
            id='contact-email'
            name='email'
            type='email'
            label='E-Mail Adresse'
            placeholder='deine.email@beispiel.de'
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            required
          />

          <Select
            name='service'
            label='Gewünschter Service'
            value={formData.service}
            onChange={(e) => handleSelectChange('service', e.target.value)}
            required
          >
            {serviceOptions.map((option) => (
              <option key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </option>
            ))}
          </Select>
          {errors.service && (
            <div className={cn('-mt-4 text-xs text-red-500')}>{errors.service}</div>
          )}

          <TextArea
            id='contact-message'
            name='message'
            label='Nachricht'
            placeholder='Wie können wir dir helfen?'
            value={formData.message}
            onChange={handleChange}
            error={errors.message}
            required
          />

          <Checkbox
            id='contact-privacy'
            name='privacyPolicy'
            label='Ich stimme der Verarbeitung meiner Daten gemäß der Datenschutzerklärung zu.'
            required
            className='mt-0'
            checked={formData.privacyPolicy}
            onChange={(e) => {
              const checked = (e.target as HTMLInputElement).checked;
              setFormData((prev) => ({ ...prev, privacyPolicy: checked }));
              if (errors.privacyPolicy && checked) {
                setErrors((prev) => ({ ...prev, privacyPolicy: undefined }));
              }
            }}
            error={errors.privacyPolicy}
          />

          <Button
            type='submit'
            variant='primary'
            fullWidth
            disabled={isSubmitting}
            className={cn('mt-6')}
          >
            {isSubmitting ? (
              <>
                <svg
                  className='mr-0 -ml-1 h-5 w-5 animate-spin text-white'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                >
                  <circle
                    className='opacity-25'
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    strokeWidth='4'
                  ></circle>
                  <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                  ></path>
                </svg>
                Wird gesendet...
              </>
            ) : (
              'Nachricht senden'
            )}
          </Button>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
