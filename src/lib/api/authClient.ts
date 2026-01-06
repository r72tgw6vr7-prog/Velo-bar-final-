import { createHttpClient, HttpClient, RequestConfig } from './httpClient';
// NOTE: Use the typed `createHttpClient` factory so call-sites can use generic `get/post/request` returning `{ data: T }`.

/**
 * Authenticated axios client with:
 * - In-memory access token
 * - httpOnly refresh cookie (backend-owned)
 * - CSRF header (reads non-httpOnly CSRF cookie if present)
 * - Single-flight refresh and retry of the original request
 */

type AccessToken = string | null;

let accessToken: AccessToken = null;
let isRefreshing = false;
const refreshQueue: Array<(token: string | null) => void> = [];

export interface AuthResponse {
  accessToken: string;
}

export class AuthApiError extends Error {
  status: number;
  details?: unknown;
  constructor(status: number, message: string, details?: unknown) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

// create a dedicated auth client (needs withCredentials)
const authClient: HttpClient = createHttpClient({
  timeout: 15000,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

const CSRF_COOKIE = 'XSRF-TOKEN';
const CSRF_HEADER = 'X-CSRF-Token';

function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined;
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? decodeURIComponent(match[2]) : undefined;
}

export function setAccessToken(token: AccessToken) {
  accessToken = token;
}

export function getAccessToken(): AccessToken {
  return accessToken;
}

function subscribeRefresh(callback: (token: string | null) => void) {
  refreshQueue.push(callback);
}

function notifyRefresh(token: string | null) {
  while (refreshQueue.length) {
    const cb = refreshQueue.shift();
    cb?.(token);
  }
}

async function refreshToken(): Promise<string | null> {
  try {
    const response = await authClient.post('/api/auth/refresh');
    const token = response.data?.accessToken || null;
    setAccessToken(token);
    return token;
  } catch {
    setAccessToken(null);
    return null;
  }
}

authClient.interceptors.request.use((config: RequestConfig) => {
  const token = getAccessToken();
  if (token && config.headers) {
    (config.headers as Record<string, string | undefined>).Authorization = `Bearer ${token}`;
  }

  const csrf = getCookie(CSRF_COOKIE);
  if (csrf && config.headers) {
    (config.headers as Record<string, string | undefined>)[CSRF_HEADER] = csrf;
  }

  return config;
});

authClient.interceptors.response.use(
  (response: any) => response,
  async (error: any) => {
    const originalConfig =
      (error?.config as (RequestConfig & { __retry?: boolean }) | undefined) || undefined;
    const status = error?.response?.status ?? 0;

    const isAuthError = status === 401;
    if (!originalConfig || !isAuthError || originalConfig.__retry) {
      const message =
        (error?.response?.data as { message?: string } | undefined)?.message ||
        error?.message ||
        'Request failed';
      return Promise.reject(new AuthApiError(status, message, error?.response?.data));
    }

    // Single-flight refresh
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        subscribeRefresh((token) => {
          if (!token) {
            reject(new AuthApiError(401, 'Unable to refresh session'));
            return;
          }
          if (originalConfig.headers) {
            (originalConfig.headers as Record<string, string | undefined>).Authorization =
              `Bearer ${token}`;
          }
          originalConfig.__retry = true;
          resolve(authClient.request(originalConfig));
        });
      });
    }

    isRefreshing = true;
    originalConfig.__retry = true;

    const newToken = await refreshToken();
    isRefreshing = false;
    notifyRefresh(newToken);

    if (!newToken) {
      return Promise.reject(new AuthApiError(401, 'Session expired'));
    }

    if (originalConfig.headers) {
      (originalConfig.headers as Record<string, string | undefined>).Authorization =
        `Bearer ${newToken}`;
    }

    return authClient.request(originalConfig);
  },
);

export default authClient;
