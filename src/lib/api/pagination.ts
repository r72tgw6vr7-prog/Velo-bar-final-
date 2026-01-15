 export type PageParams = {
  page?: number;
  pageSize?: number;
  cursor?: string;
  [key: string]: unknown;
};

export type PaginatedResponse<T> = {
  items: T[];
  total?: number;
  page?: number;
  pageSize?: number;
  nextCursor?: string | null;
};

export function withQuery(baseUrl: string, params?: Record<string, unknown>): string {
  if (!params) return baseUrl;
  const url = new URL(
    baseUrl,
    typeof window !== 'undefined' ? window.location.origin : 'http://localhost',
  );
  Object.entries(params).forEach(([k, v]) => {
    if (v === undefined || v === null) return;
    if (Array.isArray(v)) {
      v.forEach((vv) => url.searchParams.append(k, String(vv)));
    } else {
      url.searchParams.set(k, String(v));
    }
  });
  // return pathname + search so server relative paths are preserved
  return url.pathname + (url.search ? url.search : '');
}
