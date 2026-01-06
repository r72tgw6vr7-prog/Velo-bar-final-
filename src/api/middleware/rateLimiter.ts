/* eslint-disable @typescript-eslint/no-explicit-any */
import * as rl from '../../../api/middleware/rateLimiter.js';

export const rateLimiter = (rl as any).rateLimiter || (rl as any).default;
export const makeRateLimitStore = (rl as any).makeRateLimitStore;
export const defaultOptions = (rl as any).defaultOptions;

export default rateLimiter;
