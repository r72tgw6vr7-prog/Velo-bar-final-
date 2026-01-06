/**
 * Minimal KV client supporting both Vercel KV and Upstash Redis REST APIs
 * Uses REST endpoints available via KV_REST_API_URL/TOKEN or UPSTASH_REDIS_REST_URL/TOKEN
 */
const BASE_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

export const hasKV = Boolean(BASE_URL && TOKEN);

async function rest(path, { method = 'GET', body } = {}) {
  const url = `${BASE_URL}${path}`;
  const res = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    },
    body,
  });
  if (!res.ok) {
    // Surface simple error without breaking callers
    const text = await res.text().catch(() => '');
    throw new Error(`KV REST error ${res.status}: ${text}`);
  }
  return res.json();
}

export async function kvGet(key) {
  const data = await rest(`/get/${encodeURIComponent(key)}`);
  return data && typeof data === 'object' ? data.result : null;
}

export async function kvSet(key, value, { ex, nx, xx } = {}) {
  const params = new URLSearchParams();
  if (ex) params.set('ex', String(ex));
  if (nx) params.set('nx', 'true');
  if (xx) params.set('xx', 'true');
  const encodedVal = typeof value === 'string' ? value : JSON.stringify(value);
  return rest(
    `/set/${encodeURIComponent(key)}/${encodeURIComponent(encodedVal)}${params.size ? `?${params.toString()}` : ''}`,
  );
}

export async function kvIncr(key) {
  const data = await rest(`/incr/${encodeURIComponent(key)}`);
  return data.result;
}

export async function kvExpire(key, seconds) {
  const data = await rest(
    `/expire/${encodeURIComponent(key)}/${encodeURIComponent(String(seconds))}`,
  );
  return data.result === 1;
}

export async function kvTTL(key) {
  const data = await rest(`/ttl/${encodeURIComponent(key)}`);
  // returns seconds to expire or -1/-2
  return typeof data.result === 'number' ? data.result : -2;
}

export async function kvDel(key) {
  const data = await rest(`/del/${encodeURIComponent(key)}`);
  return data.result;
}

export async function kvGetDel(key) {
  // Some deployments may not support GETDEL; try and fallback
  try {
    const data = await rest(`/getdel/${encodeURIComponent(key)}`);
    return data.result ?? null;
  } catch (_) {
    // Fallback: GET then DEL (not atomic)
    const v = await kvGet(key);
    if (v !== null) await kvDel(key);
    return v;
  }
}
