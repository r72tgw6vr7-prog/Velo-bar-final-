import axios from 'axios';

export type HttpResponse<T = any> = { data: T };

// Narrow request/config shape used across the app (sufficient for our wrappers)
export type RequestConfig = {
  url?: string;
  method?: string;
  data?: unknown;
  params?: Record<string, unknown>;
  headers?: Record<string, string>;
  [key: string]: unknown;
};

export type InterceptorManager = {
  request: {
    use: (
      onFulfilled?: (cfg: RequestConfig) => RequestConfig | Promise<RequestConfig>,
      onRejected?: (err: unknown) => unknown,
    ) => number;
  };
  response: {
    use: (onFulfilled?: (res: any) => any, onRejected?: (err: unknown) => unknown) => number;
  };
};

export interface HttpClient {
  raw: any;
  get: <T = any>(url: string, config?: RequestConfig) => Promise<HttpResponse<T>>;
  post: <T = any>(url: string, data?: any, config?: RequestConfig) => Promise<HttpResponse<T>>;
  request: <T = any>(config: RequestConfig) => Promise<HttpResponse<T>>;
  interceptors: InterceptorManager;
}

export function createHttpClient(defaults?: any): HttpClient {
  const inst = axios.create({
    timeout: 15000,
    headers: { 'Content-Type': 'application/json' },
    ...(defaults || {}),
  });

  const get = async <T = any>(url: string, config?: RequestConfig) => {
    const res = await inst.get<T>(url, config as any);
    return { data: res.data } as HttpResponse<T>;
  };

  const post = async <T = any>(url: string, data?: any, config?: RequestConfig) => {
    const res = await inst.post<T>(url, data, config as any);
    return { data: res.data } as HttpResponse<T>;
  };

  const request = async <T = any>(config: RequestConfig) => {
    const res = await inst.request<T>(config as any);
    return { data: res.data } as HttpResponse<T>;
  };

  return {
    raw: inst,
    get,
    post,
    request,
    interceptors: inst.interceptors as unknown as InterceptorManager,
  };
}

// default client
const defaultClient = createHttpClient();
export default defaultClient;
