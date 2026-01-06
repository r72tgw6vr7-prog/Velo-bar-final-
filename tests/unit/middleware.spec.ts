import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock KV module to force in-memory path
vi.mock('../../api/utils/kv.js', () => ({
  hasKV: false,
  kvSet: vi.fn(),
  kvGetDel: vi.fn(),
  kvIncr: vi.fn(),
  kvExpire: vi.fn(),
  kvTTL: vi.fn(),
  kvGet: vi.fn(),
  kvDel: vi.fn(),
}));

import * as csrf from '../../api/middleware/csrfProtection.js';
import { checkRateLimit, clearRateLimit } from '../../api/middleware/rateLimiter.js';

describe('CSRF middleware (in-memory fallback)', () => {
  function makeRes() {
    const headers: Record<string, string> = {};
    return {
      headers,
      setHeader: (k: string, v: string) => {
        headers[k] = v;
      },
      status(code: number) {
        (this as any)._status = code;
        return this;
      },
      json(payload: unknown) {
        (this as any)._json = payload;
        return this;
      },
    } as any;
  }

  it('issues and validates single-use CSRF token', async () => {
    const res = makeRes();
    const token = csrf.setCsrfToken(res);

    // Cookie + header should be set
    expect(res.headers['X-CSRF-Token']).toBe(token);
    const cookie = res.headers['Set-Cookie'];
    expect(cookie).toContain('csrf-token=');

    const req = {
      method: 'POST',
      headers: {
        'x-csrf-token': token,
        cookie: `csrf-token=${token}`,
      },
    } as any;

    // First validation: valid
    const v1 = csrf.validateCsrfToken(req) as any;
    const first = typeof v1?.then === 'function' ? await v1 : v1;
    expect(first.valid).toBe(true);

    // Second validation: already used
    const v2 = csrf.validateCsrfToken(req) as any;
    const second = typeof v2?.then === 'function' ? await v2 : v2;
    expect(second.valid).toBe(false);
  });

  it('csrfProtection allows GET and blocks invalid POST', () => {
    const res = makeRes();
    const getResult = csrf.csrfProtection({ method: 'GET', headers: {} } as any, res);
    expect(getResult.valid).toBe(true);

    const badRes = makeRes();
    const bad = csrf.csrfProtection({ method: 'POST', headers: {} } as any, badRes);
    expect(bad.valid).toBe(false);
    expect((badRes as any)._status).toBe(403);
  });
});

describe('Rate limiter (in-memory fallback)', () => {
  function makeRes() {
    const headers: Record<string, string> = {};
    return {
      headers,
      setHeader: (k: string, v: string) => {
        headers[k] = String(v);
      },
      status(code: number) {
        (this as any)._status = code;
        return this;
      },
      json(payload: unknown) {
        (this as any)._json = payload;
        return this;
      },
    } as any;
  }

  beforeEach(() => {
    // Reset module state by re-importing if necessary; for in-memory map, spawn new process per test run
  });

  it('limits after threshold', () => {
    // Ensure deterministic starting state for in-memory store and use a fixed test IP
    const testIp = '127.0.0.1';
    clearRateLimit(testIp);
    const res1 = makeRes();
    const ok1 = checkRateLimit({ headers: { 'x-forwarded-for': testIp } } as any, res1, {
      maxRequests: 2,
      windowMs: 10_000,
    });
    expect(ok1).toBe(true);

    const res2 = makeRes();
    const ok2 = checkRateLimit({ headers: { 'x-forwarded-for': testIp } } as any, res2, {
      maxRequests: 2,
      windowMs: 10_000,
    });
    expect(ok2).toBe(true);

    const res3 = makeRes();
    const ok3 = checkRateLimit({ headers: { 'x-forwarded-for': testIp } } as any, res3, {
      maxRequests: 2,
      windowMs: 10_000,
    });
    expect(ok3).toBe(false);
    expect((res3 as any)._status).toBe(429);
    expect(res3.headers['X-RateLimit-Limit']).toBe('2');
  });
});
