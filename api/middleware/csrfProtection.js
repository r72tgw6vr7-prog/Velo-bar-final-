/**
 * CSRF PROTECTION FOR SERVERLESS FUNCTIONS
 *
 * Implements CSRF token generation and validation for Vercel serverless API routes.
 * Uses cryptographic tokens stored in httpOnly cookies for security.
 *
 * IMPORTANT: For production with sessions, integrate with:
 * - Vercel KV for token storage
 * - JWT-based tokens with signing
 * - Session management library
 */

import { randomUUID } from 'crypto';
import { hasKV, kvSet, kvGetDel } from '../utils/kv.js';

// In-memory token store fallback (for development)
const csrfTokenStore = new Map();

// Token expiration time (1 hour)
const TOKEN_EXPIRY_MS = 60 * 60 * 1000;
const TOKEN_EXPIRY_SECONDS = Math.floor(TOKEN_EXPIRY_MS / 1000);

// Cookie configuration
const CSRF_COOKIE_NAME = 'csrf-token';
const CSRF_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: TOKEN_EXPIRY_MS,
  path: '/',
};

/**
 * Generate a new CSRF token
 */
export function generateCsrfToken() {
  const token = randomUUID();
  const expiresAt = Date.now() + TOKEN_EXPIRY_MS;

  // Store token single-use marker
  if (hasKV) {
    // Use NX to avoid accidental overwrite; set TTL
    // Value can be constant since we rely on GETDEL semantics during validation
    kvSet(`csrf:${token}`, '1', { ex: TOKEN_EXPIRY_SECONDS, nx: true }).catch(() => {});
  } else {
    csrfTokenStore.set(token, {
      expiresAt,
      used: false,
    });
    // Cleanup old tokens (10% chance)
    if (Math.random() < 0.1) {
      cleanupExpiredTokens();
    }
  }

  return token;
}

/**
 * Set CSRF token in response cookie and header
 */
export function setCsrfToken(res) {
  const token = generateCsrfToken();

  // Set token in cookie
  const cookieValue =
    `${CSRF_COOKIE_NAME}=${token}; ` +
    `HttpOnly; ` +
    `${CSRF_COOKIE_OPTIONS.secure ? 'Secure; ' : ''}` +
    `SameSite=${CSRF_COOKIE_OPTIONS.sameSite}; ` +
    `Max-Age=${CSRF_COOKIE_OPTIONS.maxAge / 1000}; ` +
    `Path=${CSRF_COOKIE_OPTIONS.path}`;

  res.setHeader('Set-Cookie', cookieValue);

  // Also send token in response for client-side access
  res.setHeader('X-CSRF-Token', token);

  return token;
}

/**
 * Validate CSRF token from request
 */
export function validateCsrfToken(req) {
  // Get token from header (sent by client in POST requests)
  const headerToken = req.headers['x-csrf-token'] || req.headers['X-CSRF-Token'];

  // Get token from cookie (set by server)
  const cookieToken = parseCookie(req.headers.cookie, CSRF_COOKIE_NAME);

  if (!headerToken || !cookieToken) {
    return {
      valid: false,
      error: 'CSRF token missing',
    };
  }

  // Tokens must match
  if (headerToken !== cookieToken) {
    return {
      valid: false,
      error: 'CSRF token mismatch',
    };
  }

  if (hasKV) {
    // Atomically consume token (single-use)
    return kvGetDel(`csrf:${headerToken}`)
      .then((result) => {
        if (result === null || result === undefined) {
          return { valid: false, error: 'CSRF token not found or expired' };
        }
        return { valid: true, token: headerToken };
      })
      .catch(() => ({ valid: false, error: 'CSRF validation failed' }));
  }

  // Fallback: in-memory validation
  const tokenData = csrfTokenStore.get(headerToken);
  if (!tokenData) {
    return { valid: false, error: 'CSRF token not found or expired' };
  }
  if (Date.now() > tokenData.expiresAt) {
    csrfTokenStore.delete(headerToken);
    return { valid: false, error: 'CSRF token expired' };
  }
  if (tokenData.used) {
    return { valid: false, error: 'CSRF token already used' };
  }
  tokenData.used = true;

  return {
    valid: true,
    token: headerToken,
  };
}

/**
 * CSRF protection middleware
 */
export function csrfProtection(req, res) {
  // GET requests don't need CSRF validation (they should be idempotent)
  if (req.method === 'GET' || req.method === 'HEAD' || req.method === 'OPTIONS') {
    return { valid: true };
  }

  // Validate CSRF token for state-changing requests
  const result = validateCsrfToken(req);
  // Support promise if KV path is async
  if (result && typeof result.then === 'function') {
    return result.then((validation) => {
      if (!validation.valid) {
        res.status(403).json({
          success: false,
          error: 'CSRF_VALIDATION_FAILED',
          message: validation.error || 'Invalid or missing CSRF token',
        });
        return { valid: false };
      }
      return { valid: true };
    });
  }
  if (!result.valid) {
    res.status(403).json({
      success: false,
      error: 'CSRF_VALIDATION_FAILED',
      message: result.error || 'Invalid or missing CSRF token',
    });
    return { valid: false };
  }
  return { valid: true };
}

/**
 * Parse cookie from cookie header string
 */
function parseCookie(cookieHeader, name) {
  if (!cookieHeader) return null;

  const cookies = cookieHeader.split(';').map((c) => c.trim());
  const cookie = cookies.find((c) => c.startsWith(`${name}=`));

  return cookie ? cookie.split('=')[1] : null;
}

/**
 * Cleanup expired tokens
 */
function cleanupExpiredTokens() {
  const now = Date.now();
  for (const [token, data] of csrfTokenStore.entries()) {
    if (now > data.expiresAt || data.used) {
      csrfTokenStore.delete(token);
    }
  }
}

/**
 * Get CSRF token endpoint (for initial page load)
 */
export function handleGetCsrfToken(req, res) {
  const token = setCsrfToken(res);

  res.status(200).json({
    success: true,
    csrfToken: token,
  });
}

export default csrfProtection;
