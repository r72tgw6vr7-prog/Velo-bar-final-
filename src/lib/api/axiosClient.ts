import { createHttpClient, HttpClient, RequestConfig } from './httpClient.ts';
// NOTE: Use createHttpClient to get a typed wrapper around axios that returns { data:T }

const MAX_RETRIES = 3;
const BASE_BACKOFF_MS = 300;
const MAX_BACKOFF_MS = 8000;
const RATE_LIMIT_WINDOW_MS = 1000;
const RATE_LIMIT_MAX_REQUESTS = 8;

const retryCounts = new WeakMap<object, number>();

const RETRY_BACKOFF_MS: number[] = [0, BASE_BACKOFF_MS, BASE_BACKOFF_MS * 2, BASE_BACKOFF_MS * 4];

type PendingRequest = {
  resolve: () => void;
  reject: (err: Error) => void;
};

class TokenBucket {
  private tokens: number;
  private queue: PendingRequest[] = [];
  private lastRefill: number;

  constructor(
    private maxTokens: number,
    private refillIntervalMs: number,
  ) {
    this.tokens = maxTokens;
    this.lastRefill = Date.now();
    setInterval(() => this.refill(), this.refillIntervalMs);
  }

  private refill() {
    const now = Date.now();
    const elapsed = now - this.lastRefill;
    if (elapsed >= this.refillIntervalMs) {
      this.tokens = this.maxTokens;
      this.lastRefill = now;
      this.flushQueue();
    }
  }

  private flushQueue() {
    while (this.tokens > 0 && this.queue.length > 0) {
      this.tokens -= 1;
      const req = this.queue.shift();
      req?.resolve();
    }
  }

  async acquire(): Promise<void> {
    if (this.tokens > 0) {
      this.tokens -= 1;
      return;
    }
    return new Promise((resolve, reject) => {
      this.queue.push({ resolve, reject });
    });
  }
}

export interface ApiErrorPayload {
  status: number;
  message: string;
  details?: unknown;
}

export class ApiError extends Error {
  status: number;
  details?: unknown;
  constructor(payload: ApiErrorPayload) {
    super(payload.message);
    this.status = payload.status;
    this.details = payload.details;
  }
}

const rateLimiter = new TokenBucket(RATE_LIMIT_MAX_REQUESTS, RATE_LIMIT_WINDOW_MS);

// Create a typed http client instance with default options
const client: HttpClient = createHttpClient({
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

// request interceptor: rate limiter
client.interceptors.request.use(async (config: RequestConfig) => {
  await rateLimiter.acquire();
  return config;
});

// response interceptor: retries + normalized ApiError
client.interceptors.response.use(
  (response: unknown) => response,
  async (error: unknown) => {
    const err = error as {
      config?: RequestConfig & { __retryCount?: unknown };
      response?: { status?: unknown; data?: unknown };
      message?: unknown;
      code?: unknown;
    };

    const config = err?.config;
    if (!config) {
      return Promise.reject(
        new ApiError({
          status: (typeof err?.response?.status === 'number' ? err.response.status : 0) ?? 0,
          message:
            (typeof err?.message === 'string' ? err.message : 'Request failed') || 'Request failed',
          details: err?.response?.data,
        }),
      );
    }
    const status = typeof err?.response?.status === 'number' ? err.response.status : 0;

    const shouldRetry = status >= 500 || status === 429 || err?.code === 'ECONNABORTED' || !status;

    if (shouldRetry) {
      const currentRetryCount = retryCounts.get(config) ?? 0;

      if (currentRetryCount < MAX_RETRIES) {
        const nextRetryCount = currentRetryCount + 1;
        retryCounts.set(config, nextRetryCount);

        const backoff =
          RETRY_BACKOFF_MS[nextRetryCount] !== undefined
            ? RETRY_BACKOFF_MS[nextRetryCount]
            : MAX_BACKOFF_MS;
        await new Promise((res) => setTimeout(res, backoff));
        return client.request(config);
      }
    }

    const message =
      (err?.response?.data as { message?: string })?.message ||
      (typeof err?.message === 'string' ? err.message : undefined) ||
      'Request failed';

    return Promise.reject(
      new ApiError({
        status,
        message,
        details: err?.response?.data,
      }),
    );
  },
);

export default client;
