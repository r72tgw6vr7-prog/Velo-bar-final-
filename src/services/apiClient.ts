const DEFAULT_TIMEOUT = 15000;

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface ApiClientOptions {
  baseUrl?: string;
  headers?: Record<string, string>;
  timeoutMs?: number;
}

export interface RequestOptions extends RequestInit {
  timeoutMs?: number;
  skipJson?: boolean;
}

export class ApiClient {
  private baseUrl: string;
  private defaultHeaders: Record<string, string>;
  private timeoutMs: number;

  constructor(opts: ApiClientOptions = {}) {
    this.baseUrl = opts.baseUrl || import.meta.env.VITE_API_BASE_URL || '';
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      ...opts.headers,
    };
    this.timeoutMs = opts.timeoutMs ?? DEFAULT_TIMEOUT;
  }

  async request<T>(path: string, method: HttpMethod, options: RequestOptions = {}): Promise<T> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), options.timeoutMs ?? this.timeoutMs);

    try {
      const res = await fetch(this.baseUrl + path, {
        method,
        headers: { ...this.defaultHeaders, ...(options.headers || {}) },
        signal: controller.signal,
        ...options,
      });

      if (!res.ok) {
        const errorBody = await this.safeJson(res);
        const message =
          errorBody && typeof errorBody === 'object' && 'message' in errorBody
            ? String((errorBody as { message?: unknown }).message)
            : res.statusText;
        throw new Error(message);
      }

      if (options.skipJson) {
        return res as unknown as T;
      }

      return (await res.json()) as T;
    } finally {
      clearTimeout(timeout);
    }
  }

  private async safeJson(res: Response): Promise<unknown | undefined> {
    try {
      return await res.json();
    } catch {
      return undefined;
    }
  }

  get<T>(path: string, options?: RequestOptions) {
    return this.request<T>(path, 'GET', options);
  }
  post<T>(path: string, body?: unknown, options?: RequestOptions) {
    return this.request<T>(path, 'POST', { ...options, body: JSON.stringify(body) });
  }
  put<T>(path: string, body?: unknown, options?: RequestOptions) {
    return this.request<T>(path, 'PUT', { ...options, body: JSON.stringify(body) });
  }
  patch<T>(path: string, body?: unknown, options?: RequestOptions) {
    return this.request<T>(path, 'PATCH', { ...options, body: JSON.stringify(body) });
  }
  delete<T>(path: string, options?: RequestOptions) {
    return this.request<T>(path, 'DELETE', options);
  }
}

export const apiClient = new ApiClient();
