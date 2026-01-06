import { test, expect } from '@playwright/test';

async function getCsrf(request: import('@playwright/test').APIRequestContext, baseURL: string) {
  const res = await request.get(`${baseURL}/api/csrf-token`);
  expect(res.ok()).toBeTruthy();
  const token =
    res.headers()['x-csrf-token'] || res.headers()['X-CSRF-Token'] || (await res.json()).csrfToken;
  expect(token).toBeTruthy();
  return token as string;
}

test.describe('API security happy paths with CSRF', () => {
  test('Contact happy path with CSRF', async ({ request, baseURL }) => {
    const token = await getCsrf(request, baseURL!);

    const res = await request.post(`${baseURL}/api/contact`, {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': token,
      },
      data: {
        name: 'Test User',
        email: 'test@example.com',
        subject: 'Hello',
        message: 'This is a test message for contact.',
        language: 'DE',
      },
    });

    expect(res.ok()).toBeTruthy();
    const body = await res.json();
    expect(body.success).toBe(true);
  });

  test('Booking happy path with CSRF', async ({ request, baseURL }) => {
    const token = await getCsrf(request, baseURL!);

    const today = new Date();
    today.setDate(today.getDate() + 1);
    const dateStr = today.toISOString().slice(0, 10);

    const res = await request.post(`${baseURL}/api/booking`, {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': token,
      },
      data: {
        name: 'Test User',
        email: 'test@example.com',
        phone: '+49 160 0000000',
        date: dateStr,
        time: '14:30',
        guests: 1,
        specialRequests: 'none',
      },
    });

    expect(res.ok()).toBeTruthy();
    const body = await res.json();
    expect(body.success).toBe(true);
    expect(body.bookingId).toBeTruthy();
  });
});
