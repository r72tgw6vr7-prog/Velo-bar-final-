/* eslint-disable @typescript-eslint/no-explicit-any */
import * as cors from '../../../api/utils/cors.js';

export const applyCors = (cors as any).applyCors;

// Provide a simple `corsOptions` export expected by tests. We mirror the
// runtime behaviour minimally: credentials enabled and an origin value.
export const corsOptions = {
  credentials: true,
  origin: process.env.VITE_ALLOWED_ORIGINS || '*',
};

export default applyCors;
