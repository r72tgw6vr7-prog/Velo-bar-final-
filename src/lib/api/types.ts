import { z } from 'zod';

export const bookingPayloadSchema = z.object({
  location: z.enum(['munich', 'coburg']),
  customerName: z.string().min(1, 'Name is required'),
  customerEmail: z.string().email('Valid email is required'),
  company: z.string().min(1, 'Company is required'),
  phone: z.string().optional(),
  eventType: z.string().min(1, 'Event type is required'),
  guestCount: z.string().min(1, 'Guest count is required'),
  eventDate: z.string().min(1, 'Event date is required'),
  message: z.string().optional(),
  vatId: z.string().optional(),
  costCenter: z.string().optional(),
  source: z.string().optional(),
});

export type BookingPayload = z.infer<typeof bookingPayloadSchema>;
