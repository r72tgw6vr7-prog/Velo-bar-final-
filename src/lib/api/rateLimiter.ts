interface RateLimitEntry {
  count: number;
  first: number;
  consecutiveFailures: number;
}

const store = new Map<string, RateLimitEntry>();

const RATE_LIMIT_MAX = Number(process.env.RATE_LIMIT_MAX || 30);
const RATE_LIMIT_WINDOW_MS = Number(process.env.RATE_LIMIT_WINDOW || 600) * 1000;
const RATE_LIMIT_BACKOFF_MAX_MS = 60 * 60 * 1000; // 1 hour cap

function cleanup(now: number): void {
  for (const [key, entry] of store.entries()) {
    if (now - entry.first > RATE_LIMIT_WINDOW_MS * 4) {
      store.delete(key);
    }
  }
}

export function checkRateLimit(key: string, max?: number, windowMs?: number): boolean {
  const now = Date.now();
  const limit = max ?? RATE_LIMIT_MAX;
  const window = windowMs ?? RATE_LIMIT_WINDOW_MS;

  // Periodic cleanup to prevent unbounded growth in long-lived serverless warm instances
  if (Math.random() < 0.01) {
    cleanup(now);
  }

  const entry = store.get(key) || { count: 0, first: now, consecutiveFailures: 0 };

  if (now - entry.first > window) {
    entry.count = 0;
    entry.first = now;
  }

  // Exponential backoff after previous blocks
  const backoffMs = Math.min(
    RATE_LIMIT_BACKOFF_MAX_MS,
    Math.pow(2, entry.consecutiveFailures) * 1000,
  );
  if (now - entry.first < backoffMs && entry.count >= limit) {
    return false;
  }

  entry.count += 1;

  if (entry.count > limit) {
    entry.consecutiveFailures += 1;
    store.set(key, entry);
    return false;
  }

  entry.consecutiveFailures = Math.max(0, entry.consecutiveFailures - 1);
  store.set(key, entry);
  return true;
}

export function recordRateLimitFailure(key: string): void {
  const entry = store.get(key);
  if (entry) {
    entry.consecutiveFailures += 1;
    store.set(key, entry);
  }
}

export function checkBookingRateLimits(
  ip: string,
  email: string,
): { allowed: true } | { allowed: false; key: string } {
  const ipKey = `ip:${ip}`;
  const emailKey = `email:${email.toLowerCase()}`;

  if (!checkRateLimit(ipKey)) {
    return { allowed: false, key: ipKey };
  }

  if (!checkRateLimit(emailKey, 10, RATE_LIMIT_WINDOW_MS)) {
    return { allowed: false, key: emailKey };
  }

  return { allowed: true };
}
