import { useEffect, useMemo, useState, useCallback, useRef } from 'react';
import client, { ApiError } from './axiosClient';

type QueryStatus = 'idle' | 'loading' | 'error' | 'success';

export interface UseApiQueryOptions<TData> {
  enabled?: boolean;
  initialData?: TData;
  refetchOnMount?: boolean;
  /** How long data is considered fresh (ms). Defaults to 60s. */
  staleTime?: number;
  /** How long to keep data in cache after unused (ms). Defaults to 5min. */
  cacheTime?: number;
  /** If true and cache available, return cached data and revalidate in background. Defaults to true. */
  revalidateOnMount?: boolean;
  onSuccess?: (data: TData) => void;
  onError?: (error: ApiError) => void;
}

export interface UseApiQueryResult<TData> {
  data: TData | undefined;
  error: ApiError | null;
  status: QueryStatus;
  isLoading: boolean;
  isError: boolean;
  refetch: () => Promise<void>;
  /** True when the data came from cache and is older than staleTime */
  isStale?: boolean;
}

// Simple in-memory cache (module-scoped)
type CacheEntry = { data: unknown; updatedAt: number; timeout?: ReturnType<typeof setTimeout> };
const QUERY_CACHE = new Map<string, CacheEntry>();
const INFLIGHT = new Map<string, Promise<unknown>>();

/** Build cache key identically to useApiQuery */
function buildCacheKey(url: string, key: string | string[]): string {
  return `${url}__${JSON.stringify(key)}`;
}

/** Manually invalidate a cached query by key+url. Also clears any expiry timeout. */
export function invalidateQuery(key: string | string[], url: string): void {
  const cacheKey = buildCacheKey(url, key);
  const entry = QUERY_CACHE.get(cacheKey);
  if (entry?.timeout) clearTimeout(entry.timeout);
  QUERY_CACHE.delete(cacheKey);
}

/** Clear the entire query cache and cancel expiry timers. */
export function clearQueryCache(): void {
  for (const [k, entry] of QUERY_CACHE.entries()) {
    if (entry?.timeout) clearTimeout(entry.timeout);
    QUERY_CACHE.delete(k);
  }
}

export function useApiQuery<TData = unknown>(
  key: string | string[],
  url: string,
  options: UseApiQueryOptions<TData> = {},
): UseApiQueryResult<TData> {
  const {
    enabled = true,
    initialData,
    refetchOnMount = true,
    staleTime = 60_000,
    cacheTime = 5 * 60_000,
    revalidateOnMount = true,
    onSuccess,
    onError,
  } = options;
  const [data, setData] = useState<TData | undefined>(initialData);
  const [error, setError] = useState<ApiError | null>(null);
  const [status, setStatus] = useState<QueryStatus>('idle');
  const [isStale, setIsStale] = useState<boolean | undefined>(undefined);
  const isMounted = useRef(true);

  const cacheKey = useMemo(() => `${url}__${JSON.stringify(key)}`, [url, key]);

  const fetchData = useCallback(async () => {
    if (!enabled) return;
    // Dedupe concurrent requests
    if (INFLIGHT.has(cacheKey)) {
      try {
        await INFLIGHT.get(cacheKey);
      } catch {
        // ignore, error handling below
      }
    }
    setStatus((prev) => (prev === 'success' ? prev : 'loading'));
    setError(null);
    const req: Promise<TData> = client
      .get(url)
      .then((res: { data: TData }) => {
        if (!isMounted.current) return res.data;
        setData(res.data);
        setStatus('success');
        setIsStale(false);
        // update cache
        const prev = QUERY_CACHE.get(cacheKey);
        if (prev?.timeout) clearTimeout(prev.timeout);
        const timeout = setTimeout(() => QUERY_CACHE.delete(cacheKey), cacheTime);
        QUERY_CACHE.set(cacheKey, { data: res.data, updatedAt: Date.now(), timeout });
        onSuccess?.(res.data);
        return res.data;
      })
      .catch((err: unknown) => {
        const apiErr = err as ApiError;
        if (!isMounted.current) return Promise.reject(apiErr);
        setError(apiErr);
        setStatus('error');
        onError?.(apiErr);
        return Promise.reject(apiErr);
      })
      .finally(() => {
        INFLIGHT.delete(cacheKey);
      });
    INFLIGHT.set(cacheKey, req as unknown as Promise<unknown>);
    await req;
  }, [enabled, url, cacheKey, cacheTime, onSuccess, onError]);

  const keyDep = useMemo(() => JSON.stringify(key), [key]);

  useEffect(() => {
    isMounted.current = true;
    // Serve from cache if available
    const entry = QUERY_CACHE.get(cacheKey);
    const now = Date.now();
    if (entry && enabled) {
      setData(entry.data as TData);
      setStatus('success');
      const stale = now - entry.updatedAt > staleTime;
      setIsStale(stale);
      if (revalidateOnMount && refetchOnMount) {
        void fetchData(); // SWR background revalidate
      }
    } else if (refetchOnMount && enabled) {
      void fetchData();
    }

    if (refetchOnMount && enabled) {
      // already handled above; kept for backward safety
    }
    // key in deps to refetch when it changes
    return () => {
      isMounted.current = false;
    };
  }, [fetchData, enabled, refetchOnMount, keyDep, cacheKey, revalidateOnMount, staleTime]);

  return useMemo(
    () => ({
      data,
      error,
      status,
      isLoading: status === 'loading',
      isError: status === 'error',
      refetch: fetchData,
      isStale,
    }),
    [data, error, status, fetchData, isStale],
  );
}

export interface UseApiMutationResult<TData, TVariables> {
  mutate: (variables: TVariables) => Promise<TData>;
  status: QueryStatus;
  error: ApiError | null;
  isLoading: boolean;
  isError: boolean;
}

export function useApiMutation<TData = unknown, TVariables = unknown>(
  url: string,
  method: 'post' | 'put' | 'patch' | 'delete' = 'post',
  options?: {
    onSuccess?: (data: TData) => void;
    onError?: (error: ApiError) => void;
  },
): UseApiMutationResult<TData, TVariables> {
  const [status, setStatus] = useState<QueryStatus>('idle');
  const [error, setError] = useState<ApiError | null>(null);

  const mutate = useCallback(
    async (variables: TVariables): Promise<TData> => {
      setStatus('loading');
      setError(null);
      try {
        const res: { data: TData } = await client.request({ url, method, data: variables });
        setStatus('success');
        options?.onSuccess?.(res.data);
        return res.data;
      } catch (err: unknown) {
        const apiErr = err as ApiError;
        setError(apiErr);
        setStatus('error');
        options?.onError?.(apiErr);
        throw apiErr;
      }
    },
    [url, method, options],
  );

  return {
    mutate,
    status,
    error,
    isLoading: status === 'loading',
    isError: status === 'error',
  };
}
