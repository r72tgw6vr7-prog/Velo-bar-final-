/**
 * CSRF Helper Utility
 *
 * Client-side utility for managing CSRF tokens in React application.
 * Automatically fetches and includes CSRF tokens in API requests.
 */

import React from 'react';

const CSRF_TOKEN_KEY = 'csrf-token';
const CSRF_ENDPOINT = '/api/csrf-token';

/**
 * Fetch a new CSRF token from the server
 */
export async function fetchCsrfToken(): Promise<string> {
  try {
    const response = await fetch(CSRF_ENDPOINT, {
      method: 'GET',
      credentials: 'include', // Important: include cookies
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch CSRF token');
    }

    const data = await response.json();

    if (data.success && data.csrfToken) {
      // Store token in sessionStorage for reuse
      sessionStorage.setItem(CSRF_TOKEN_KEY, data.csrfToken);
      return data.csrfToken;
    }

    throw new Error('Invalid CSRF token response');
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('CSRF token fetch error:', error);
    }
    throw error;
  }
}

/**
 * Get CSRF token (from cache or fetch new)
 */
export async function getCsrfToken(): Promise<string> {
  // Try to get from sessionStorage first
  const cachedToken = sessionStorage.getItem(CSRF_TOKEN_KEY);

  if (cachedToken) {
    return cachedToken;
  }

  // Fetch new token if not cached
  return await fetchCsrfToken();
}

/**
 * Clear cached CSRF token (call this after token is used or expired)
 */
export function clearCsrfToken(): void {
  sessionStorage.removeItem(CSRF_TOKEN_KEY);
}

/**
 * Make a CSRF-protected API request
 *
 * @param url - API endpoint URL
 * @param options - Fetch options
 * @returns Response from fetch
 */
export async function csrfFetch(url: string, options: RequestInit = {}): Promise<Response> {
  // For GET requests, no CSRF token needed
  if (!options.method || options.method.toUpperCase() === 'GET') {
    return fetch(url, options);
  }

  try {
    // Get CSRF token
    const csrfToken = await getCsrfToken();

    // Add CSRF token to headers
    const headers = new Headers(options.headers || {});
    headers.set('X-CSRF-Token', csrfToken);

    // Preserve Content-Type for FormData; only set for JSON/string bodies
    const isFormData = typeof FormData !== 'undefined' && (options as any).body instanceof FormData;
    if (!isFormData) {
      // Only set if not already provided
      if (!headers.has('Content-Type')) {
        headers.set('Content-Type', 'application/json');
      }
    }

    // Make request with CSRF token
    const response = await fetch(url, {
      ...options,
      credentials: 'include', // Important: include cookies
      headers,
    });

    // If CSRF validation failed, clear token and retry once
    if (response.status === 403) {
      const data = await response.json();
      if (data.error === 'CSRF_VALIDATION_FAILED') {
        clearCsrfToken();

        // Retry with new token
        const newToken = await fetchCsrfToken();
        headers.set('X-CSRF-Token', newToken);

        return fetch(url, {
          ...options,
          credentials: 'include',
          headers,
        });
      }
    }

    // If successful, clear token (single-use tokens)
    if (response.ok) {
      clearCsrfToken();
    }

    return response;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('CSRF-protected request error:', error);
    }
    throw error;
  }
}

/**
 * React Hook for CSRF token management
 */
export function useCsrfToken() {
  const [token, setToken] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  const refreshToken = async () => {
    setLoading(true);
    setError(null);

    try {
      const newToken = await fetchCsrfToken();
      setToken(newToken);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    refreshToken();
  }, []);

  return {
    token,
    loading,
    error,
    refreshToken,
    clearToken: clearCsrfToken,
  };
}

// For non-React usage
export default {
  getCsrfToken,
  fetchCsrfToken,
  clearCsrfToken,
  csrfFetch,
};
