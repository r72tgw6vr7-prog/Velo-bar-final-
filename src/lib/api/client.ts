/**
 * Minimal fetch wrapper with JSON handling and error normalization.
 */

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface ApiRequestOptions<TBody = unknown> extends RequestInit {
  method?: HttpMethod;
  body?: TBody extends BodyInit ? TBody : TBody extends undefined ? undefined : string;
  headers?: HeadersInit;
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

export async function apiRequest<TResponse = unknown, TBody = unknown>(
  url: string,
  options: ApiRequestOptions<TBody> = {},
): Promise<TResponse> {
  const { headers, body, method = 'GET', ...rest } = options;

  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(headers || {}),
    },
    body: typeof body === 'string' || body === undefined ? body : JSON.stringify(body),
    ...rest,
  });

  const contentType = response.headers.get('content-type');
  const isJson = contentType && contentType.includes('application/json');
  const data = isJson ? await response.json().catch(() => null) : null;

  if (!response.ok) {
    const errorData = data as { message?: string; [key: string]: unknown } | null;
    throw new ApiError({
      status: response.status,
      message: errorData?.message || response.statusText || 'Request failed',
      details: errorData ?? undefined,
    });
  }

  return (data as TResponse) ?? (undefined as TResponse);
}
