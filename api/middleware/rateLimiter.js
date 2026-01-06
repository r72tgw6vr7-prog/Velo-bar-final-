/**
 * SERVERLESS RATE LIMITER
 *
 * Simple in-memory rate limiting for Vercel serverless functions.
 * For production with multiple instances, use Vercel KV or Upstash Redis.
 *
 * IMPORTANT: This implementation uses in-memory storage which resets on cold starts.
 * For persistent rate limiting across serverless instances, integrate with:
 * - Vercel KV: https://vercel.com/docs/storage/vercel-kv
 * - Upstash Redis: https://upstash.com/
 */

// In-memory store for rate limiting (resets on cold start)
const rateLimitStore = new Map();
import { hasKV, kvIncr, kvExpire, kvTTL, kvGet, kvDel } from '../utils/kv.js';

// Configuration
const RATE_LIMIT_CONFIG = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 100, // max requests per window
  message: 'Too many requests from this IP, please try again later.',
  statusCode: 429,
};

/**
 * Get client IP address from request headers
 */
function getClientIp(req) {
  // Vercel provides the client IP in x-forwarded-for or x-real-ip
  const forwarded = req.headers['x-forwarded-for'];
  const realIp = req.headers['x-real-ip'];

  if (forwarded) {
    // x-forwarded-for can be a comma-separated list
    return forwarded.split(',')[0].trim();
  }

  return realIp || req.connection?.remoteAddress || 'unknown';
}

/**
 * Clean up expired entries from the rate limit store
 */
function cleanupExpiredEntries() {
  const now = Date.now();
  for (const [key, data] of rateLimitStore.entries()) {
    if (now > data.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}

/**
 * Rate limiting middleware for Vercel serverless functions
 *
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Object} options - Rate limit configuration
 * @returns {boolean} - Returns true if request is allowed, false if rate limited
 */
export function checkRateLimit(req, res, options = {}) {
  const config = { ...RATE_LIMIT_CONFIG, ...options };
  const clientIp = getClientIp(req);
  const now = Date.now();

  if (hasKV) {
    // KV-backed rate limiter (supports multi-instance)
    const key = `ratelimit:${clientIp}`;
    const windowSeconds = Math.ceil(config.windowMs / 1000);
    return (async () => {
      let count = await kvIncr(key);
      // Set TTL on first increment in window
      if (count === 1) {
        await kvExpire(key, windowSeconds);
      }
      const ttl = await kvTTL(key); // seconds until reset
      const remaining = Math.max(0, config.maxRequests - count);
      const resetMs = ttl > 0 ? now + ttl * 1000 : now + config.windowMs;

      if (count > config.maxRequests) {
        res.setHeader('X-RateLimit-Limit', config.maxRequests);
        res.setHeader('X-RateLimit-Remaining', 0);
        res.setHeader('X-RateLimit-Reset', new Date(resetMs).toISOString());
        res.setHeader('Retry-After', String(Math.max(1, ttl)));
        res.status(config.statusCode).json({
          success: false,
          error: 'RATE_LIMIT_EXCEEDED',
          message: config.message,
          retryAfter: Math.max(1, ttl),
        });
        return false;
      }
      res.setHeader('X-RateLimit-Limit', config.maxRequests);
      res.setHeader('X-RateLimit-Remaining', remaining);
      res.setHeader('X-RateLimit-Reset', new Date(resetMs).toISOString());
      return true;
    })();
  }

  // In-memory fallback (single-instance only)
  // Avoid randomized cleanup during tests to keep behavior deterministic
  if (process.env.NODE_ENV !== 'test') {
    if (Math.random() < 0.1) {
      cleanupExpiredEntries();
    }
  }
  let rateLimitData = rateLimitStore.get(clientIp);
  if (!rateLimitData || now > rateLimitData.resetTime) {
    rateLimitData = {
      count: 0,
      resetTime: now + config.windowMs,
      firstRequest: now,
    };
    rateLimitStore.set(clientIp, rateLimitData);
  }
  rateLimitData.count++;
  if (rateLimitData.count > config.maxRequests) {
    const retryAfter = Math.ceil((rateLimitData.resetTime - now) / 1000);
    // Provide consistent rate limit headers even when rejecting requests
    res.setHeader('X-RateLimit-Limit', config.maxRequests);
    res.setHeader('X-RateLimit-Remaining', 0);
    res.setHeader('X-RateLimit-Reset', new Date(rateLimitData.resetTime).toISOString());
    res.setHeader('Retry-After', String(Math.max(1, retryAfter)));
    res.status(config.statusCode).json({
      success: false,
      error: 'RATE_LIMIT_EXCEEDED',
      message: config.message,
      retryAfter,
    });
    return false;
  }
  res.setHeader('X-RateLimit-Limit', config.maxRequests);
  res.setHeader('X-RateLimit-Remaining', Math.max(0, config.maxRequests - rateLimitData.count));
  res.setHeader('X-RateLimit-Reset', new Date(rateLimitData.resetTime).toISOString());
  return true;
}

/**
 * Get rate limit status for an IP
 */
export function getRateLimitStatus(req) {
  const clientIp = getClientIp(req);
  if (hasKV) {
    return (async () => {
      const key = `ratelimit:${clientIp}`;
      const ttl = await kvTTL(key);
      const val = await kvGet(key);
      const count = Number(val || 0);
      if (!val || ttl <= 0) {
        return { limited: false, remaining: RATE_LIMIT_CONFIG.maxRequests };
      }
      return {
        limited: count >= RATE_LIMIT_CONFIG.maxRequests,
        remaining: Math.max(0, RATE_LIMIT_CONFIG.maxRequests - count),
        resetTime: Date.now() + ttl * 1000,
      };
    })();
  }
  const rateLimitData = rateLimitStore.get(clientIp);
  if (!rateLimitData) {
    return { limited: false, remaining: RATE_LIMIT_CONFIG.maxRequests };
  }
  const now = Date.now();
  if (now > rateLimitData.resetTime) {
    return { limited: false, remaining: RATE_LIMIT_CONFIG.maxRequests };
  }
  return {
    limited: rateLimitData.count >= RATE_LIMIT_CONFIG.maxRequests,
    remaining: Math.max(0, RATE_LIMIT_CONFIG.maxRequests - rateLimitData.count),
    resetTime: rateLimitData.resetTime,
  };
}

/**
 * Clear rate limit for an IP (useful for testing)
 */
export function clearRateLimit(ip) {
  if (hasKV) {
    return kvDel(`ratelimit:${ip}`);
  }
  rateLimitStore.delete(ip);
}

export default checkRateLimit;
