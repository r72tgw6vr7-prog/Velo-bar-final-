import { z } from 'zod';

/**
 * Contact form validation schema (shared)
 */
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name ist erforderlich und muss mindestens 2 Zeichen haben' })
    .max(100),
  email: z.string().email({ message: 'Gültige E-Mail erforderlich' }),
  service: z.string().min(1, { message: 'Bitte wählen Sie einen Service' }),
  message: z
    .string()
    .min(10, { message: 'Bitte geben Sie eine ausführlichere Nachricht ein' })
    .max(2000),
  privacyPolicy: z
    .boolean()
    .refine((v) => v === true, { message: 'Bitte akzeptieren Sie die Datenschutzerklärung' }),
});

export type ContactFormSchema = typeof contactFormSchema;
export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const contactFormDefaultValues: ContactFormValues = {
  name: '',
  email: '',
  service: '',
  message: '',
  privacyPolicy: false,
};
