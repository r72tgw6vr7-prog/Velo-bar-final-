import { z } from 'zod';

const bookingPayloadSchema = z.object({
  location: z.enum(['munich', 'coburg']),
  eventType: z.enum(['corporate', 'wedding', 'birthday', 'christmas', 'other']),
  guestCount: z.string().min(1), // Guest range string like "50-100"
  eventDate: z.string().min(1),
  company: z.string().min(1),
  customerName: z.string().min(1),
  customerEmail: z.string().email(),
  phone: z.string().optional(),
  vatId: z.string().optional(),
  costCenter: z.string().optional(),
  message: z.string().optional(),
  source: z.string().optional(),
});

const samples = [
  {
    name: 'Valid corporate Munich',
    payload: {
      location: 'munich',
      eventType: 'corporate',
      guestCount: '50-100',
      eventDate: '2026-02-01',
      company: 'Acme GmbH',
      customerName: 'Max Mustermann',
      customerEmail: 'test+acme@example.com',
      phone: '+49123456789',
      message: 'Test booking',
    },
  },
  {
    name: 'Invalid eventType',
    payload: {
      location: 'munich',
      eventType: 'firmenfeier',
      guestCount: '50-100',
      eventDate: '2026-02-01',
      company: 'Acme GmbH',
      customerName: 'Max Mustermann',
      customerEmail: 'test+acme@example.com',
    },
  },
];

let allOk = true;
for (const s of samples) {
  const r = bookingPayloadSchema.safeParse(s.payload);
  console.log(`Sample: ${s.name}`);
  if (r.success) {
    console.log('  -> VALID');
  } else {
    console.log('  -> INVALID');
    console.log('  Issues:', r.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; '));
    allOk = false;
  }
}

process.exit(allOk ? 0 : 2);
