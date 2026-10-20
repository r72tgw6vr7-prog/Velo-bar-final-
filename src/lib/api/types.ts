import { z } from 'zod';

const STRING_MAX = 5000;

export const bookingPayloadSchema = z.object({
  location: z.enum(['munich', 'coburg']),
  customerName: z.string().min(1, 'Name is required').max(200),
  customerEmail: z.string().email('Valid email is required').max(200),
  company: z.string().min(1, 'Company is required').max(200),
  phone: z.string().max(50).optional(),
  eventType: z.string().min(1, 'Event type is required').max(50),
  guestCount: z.string().min(1, 'Guest count is required').max(50),
  eventDate: z.string().min(1, 'Event date is required').max(100),
  message: z.string().max(STRING_MAX).optional(),
  vatId: z.string().max(50).optional(),
  costCenter: z.string().max(100).optional(),
  source: z.string().max(500).optional(),
  website: z.string().max(100).optional(), // honeypot - must be empty
});

export type BookingPayload = z.infer<typeof bookingPayloadSchema>;
