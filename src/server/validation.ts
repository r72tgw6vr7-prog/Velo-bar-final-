import { z } from 'zod';

/**
 * Shared Zod validation for contact payloads.
 * This module is intended to be imported by both server handlers
 * and service wrappers so validation rules stay consistent.
 */

export const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  email: z.string().email('Invalid email format'),
  phone: z
    .string()
    .regex(/^[\d\s\-\+\(\)]+$/, 'Invalid phone format')
    .optional()
    .or(z.literal('')),
  subject: z.string().min(1, 'Subject is required').max(200, 'Subject too long'),
  message: z.string().min(10, 'Message too short').max(2000, 'Message too long'),
  company: z.string().max(200, 'Company name too long').optional().or(z.literal('')),
  vatId: z.string().max(50, 'VAT ID too long').optional().or(z.literal('')),
  costCenter: z.string().max(50, 'Cost center too long').optional().or(z.literal('')),
  eventType: z.string().max(200, 'Event type too long').optional().or(z.literal('')),
  eventDate: z.string().max(50, 'Event date too long').optional().or(z.literal('')),
  eventLocation: z.string().max(200, 'Event location too long').optional().or(z.literal('')),
  preferredRegion: z.string().max(50, 'Preferred region too long').optional().or(z.literal('')),
  guestCount: z.string().max(50, 'Guest count too long').optional().or(z.literal('')),
  budget: z.string().max(100, 'Budget too long').optional().or(z.literal('')),
  website: z.string().optional().or(z.literal('')),
  language: z.enum(['DE', 'EN']).default('DE'),
  privacyPolicy: z
    .boolean()
    .refine((v) => v === true, { message: 'Privacy policy must be accepted' })
    .optional(),
});

export type ContactData = z.infer<typeof contactSchema>;

export function validateContact(data: unknown): ContactData {
  return contactSchema.parse(data);
}

export default contactSchema;
