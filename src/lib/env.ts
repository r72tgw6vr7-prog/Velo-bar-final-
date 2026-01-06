import { z } from 'zod';

// Environment variable schema
const envSchema = z.object({
  // Website URL (optional at runtime; some preview/build environments won't inject it)
  VITE_SITE_URL: z.string().url().optional().describe('Base URL for the website'),

  // Coburg location
  VITE_COBURG_NAME: z.string().optional().describe('Coburg business name'),
  VITE_COBURG_PHONE: z.string().optional().describe('Coburg phone number'),
  VITE_COBURG_EMAIL: z.string().email().optional().describe('Coburg email'),
  VITE_COBURG_STREET: z.string().optional().describe('Coburg street address'),
  VITE_COBURG_POSTAL: z.string().optional().describe('Coburg postal code'),
  VITE_COBURG_CITY: z.string().optional().describe('Coburg city'),
  VITE_COBURG_COUNTRY: z.string().optional().describe('Coburg country code'),
  VITE_COBURG_WHATSAPP: z.string().optional().describe('Coburg WhatsApp number'),
  VITE_COBURG_OPENING_HOURS: z.string().optional().describe('Coburg opening hours'),
  VITE_COBURG_GEO_LAT: z.string().optional().describe('Coburg latitude'),
  VITE_COBURG_GEO_LNG: z.string().optional().describe('Coburg longitude'),

  // Business information (optional at runtime; validated when present)
  VITE_BUSINESS_NAME: z.string().optional().describe('Business name'),
  VITE_BUSINESS_PHONE: z.string().optional().describe('Business phone number'),
  VITE_BUSINESS_EMAIL: z.string().email().optional().describe('Business email'),
  VITE_BUSINESS_STREET: z.string().optional().describe('Street address'),
  VITE_BUSINESS_POSTAL: z.string().optional().describe('Postal code'),
  VITE_BUSINESS_CITY: z.string().optional().describe('City'),
  VITE_BUSINESS_COUNTRY: z.string().optional().describe('Country code'),
  VITE_WHATSAPP: z.string().optional().describe('WhatsApp number'),
  VITE_OPENING_HOURS: z.string().optional().describe('Opening hours'),

  // Geographic coordinates
  VITE_GEO_LAT: z.string().optional().describe('Latitude'),
  VITE_GEO_LNG: z.string().optional().describe('Longitude'),

  // Optional but recommended
  VITE_GA4_MEASUREMENT_ID: z
    .string()
    .startsWith('G-')
    .optional()
    .describe('Google Analytics 4 Measurement ID'),

  VITE_GOOGLE_MAPS_API_KEY: z
    .string()
    .optional()
    .describe('Google Maps API key for location services'),

  // Social media
  VITE_INSTAGRAM_URL: z.string().url().optional().describe('Instagram URL'),
  VITE_FACEBOOK_URL: z.string().url().optional().describe('Facebook URL'),

  // Business details
  VITE_PRICE_RANGE: z.string().optional().describe('Price range'),
  VITE_CURRENCIES_ACCEPTED: z.string().optional().describe('Accepted currencies'),
  VITE_PAYMENT_METHODS: z.string().optional().describe('Payment methods'),

  // Build-time variables
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

  // Contact form
  VITE_EMAIL_SERVICE_ID: z.string().optional().describe('Email service ID'),
  VITE_EMAIL_TEMPLATE_ID: z.string().optional().describe('Email template ID'),
  VITE_EMAIL_PUBLIC_KEY: z.string().optional().describe('Email public key'),

  // Development
  VITE_APP_ENV: z.string().optional().describe('App environment'),
  VITE_DEBUG: z
    .string()
    .transform((val) => val === 'true')
    .optional()
    .describe('Enable debug logging'),
});

// Parse and validate environment variables
function parseEnv() {
  // Handle both browser and Node.js environments
  const envSource =
    typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env : process.env;

  const isBrowser = typeof window !== 'undefined';
  const isProdBuild = typeof import.meta !== 'undefined' && !!import.meta.env?.PROD;

  try {
    const parsed = envSchema.parse(envSource);

    // Development warnings
    if (parsed.NODE_ENV === 'production') {
      if (!parsed.VITE_GA4_MEASUREMENT_ID) {
        if (process.env.NODE_ENV === 'development') {
          console.warn('GA4_MEASUREMENT_ID not set - analytics disabled');
        }
      }
      if (!parsed.VITE_GOOGLE_MAPS_API_KEY) {
        if (process.env.NODE_ENV === 'development') {
          console.warn('GOOGLE_MAPS_API_KEY not set - maps will show fallback');
        }
      }
    }

    return parsed;
  } catch (error) {
    if (error instanceof z.ZodError) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Environment variable validation failed:');
      }
      error.issues.forEach((issue) => {
        if (process.env.NODE_ENV === 'development') {
          console.error(`  - ${issue.path.join('.')}: ${issue.message}`);
        }
      });

      // Determine production by NODE_ENV or Vite's PROD boolean
      const isProdEnv =
        envSource?.NODE_ENV === 'production' || envSource?.PROD === true || isProdBuild;

      // In production, fail hard on the server (but don't brick the client UI)
      if (isProdEnv && !isBrowser) {
        throw new Error('Invalid environment configuration');
      }

      // In the browser, return a best-effort minimal env so the app can still render.
      return envSchema.partial().parse(envSource);
    }
    throw error;
  }
}

// Export validated environment
export const env = parseEnv();

// Type-safe environment interface
export type Env = z.infer<typeof envSchema>;

// Utility functions
export const isDevelopment = env.NODE_ENV === 'development';
export const isProduction =
  env.NODE_ENV === 'production' || (typeof import.meta !== 'undefined' && !!import.meta.env?.PROD);
export const isDebug = env.VITE_DEBUG || isDevelopment;

// Feature flags based on env
export const features = {
  analytics: !!env.VITE_GA4_MEASUREMENT_ID,
  maps: !!env.VITE_GOOGLE_MAPS_API_KEY,
  contact: !!env.VITE_BUSINESS_EMAIL,
  whatsapp: !!env.VITE_WHATSAPP,
  social: !!(env.VITE_INSTAGRAM_URL || env.VITE_FACEBOOK_URL),
  debug: isDebug,
} as const;

// Validation helper for components
export function requireEnv<K extends keyof Env>(key: K): NonNullable<Env[K]> {
  const value = env[key];
  if (!value) {
    throw new Error(`Required environment variable ${key} is not set`);
  }
  return value as NonNullable<Env[K]>;
}

// Development helper to show env status
if (isDevelopment) {
  // eslint-disable-next-line no-console -- dev-only table summarizing effective environment configuration
  console.table({
    'Site URL': env.VITE_SITE_URL,
    'Business Name': env.VITE_BUSINESS_NAME,
    Analytics: features.analytics ? '[OK]' : '[NO]',
    Maps: features.maps ? '[OK]' : '[NO]',
    WhatsApp: features.whatsapp ? '[OK]' : '[NO]',
    'Social Media': features.social ? '[OK]' : '[NO]',
    Environment: env.NODE_ENV,
  });
}
