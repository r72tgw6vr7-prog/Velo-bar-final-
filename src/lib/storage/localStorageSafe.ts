/**
 * Safe wrappers around localStorage to avoid crashes in environments
 * where storage is unavailable (SSR, private mode, quota errors).
 */
const isBrowser = typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

export function getItemSafe<T = unknown>(key: string): T | null {
  if (!isBrowser) return null;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function setItemSafe(key: string, value: unknown): void {
  if (!isBrowser) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore quota or serialization errors
  }
}

export function removeItemSafe(key: string): void {
  if (!isBrowser) return;
  try {
    window.localStorage.removeItem(key);
  } catch {
    // ignore
  }
}
