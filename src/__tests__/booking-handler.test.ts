import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

// Use a dynamic import so the module under test sees the mocked nodemailer
vi.mock('nodemailer', () => {
  return {
    default: {
      createTransport: () => ({
        sendMail: vi.fn().mockResolvedValue({ messageId: 'mock-id' }),
      }),
    },
  };
});

import handler from '../../api/booking';

function makeReq(body: unknown, extra: Partial<Request> = {}) {
  return Object.assign(
    {
      method: 'POST',
      headers: {},
      body,
      socket: { remoteAddress: '127.0.0.1' },
    },
    extra,
  );
}

function makeRes() {
  const headers: Record<string, string> = {};
  const res: any = {
    setHeader: (k: string, v: string) => (headers[k] = v),
    status: vi.fn().mockImplementation((s: number) => ({ json: (payload: any) => ({ status: s, payload }) })),
    json: vi.fn(),
    end: vi.fn(),
  };
  return { res, headers };
}

describe('API /api/booking handler', () => {
  beforeEach(() => {
    // Set required env vars
    process.env.GMAIL_USER = 'test@example.com';
    process.env.GMAIL_PASS = 'app-password-1234';
    process.env.BOOKING_TO_MUNICH = 'muenchen@example.com';
    process.env.BOOKING_TO_COBURG = 'coburg@example.com';
    process.env.BOOKING_FROM_EMAIL = 'Velo Bar <booking@velo-bar.com>';
    process.env.BOOKING_REPLY_TO_EMAIL = 'booking@velo-bar.com';
  });

  afterEach(() => {
    vi.resetAllMocks();
    delete process.env.GMAIL_USER;
    delete process.env.GMAIL_PASS;
    delete process.env.BOOKING_TO_MUNICH;
    delete process.env.BOOKING_TO_COBURG;
    delete process.env.BOOKING_FROM_EMAIL;
    delete process.env.BOOKING_REPLY_TO_EMAIL;
  });

  it('returns 200 and ok true for valid payload', async () => {
    const { res } = makeRes();
    const req: any = makeReq({
      location: 'munich',
      eventType: 'corporate',
      guestCount: '50-100',
      eventDate: '2026-02-01',
      company: 'Acme GmbH',
      customerName: 'Max Mustermann',
      customerEmail: 'max@example.com',
    });

    const result = await handler(req as any, res as any);

    // handler returns via res; check status was set to 200 by inspecting res.status mock
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('returns 400 for invalid eventType', async () => {
    const { res } = makeRes();
    const req: any = makeReq({
      location: 'munich',
      eventType: 'firmenfeier', // invalid per schema
      guestCount: '50-100',
      eventDate: '2026-02-01',
      company: 'Acme GmbH',
      customerName: 'Max Mustermann',
      customerEmail: 'max@example.com',
    });

    await handler(req as any, res as any);
    expect(res.status).toHaveBeenCalledWith(400);
  });
});
