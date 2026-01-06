// TODO: Re-enable error monitoring after deployment
// import * as Sentry from '@sentry/browser';
// import LogRocket from 'logrocket';

// Add type declaration for Vite's import.meta.env
interface ImportMetaEnv {
  DEV: boolean;
  PROD: boolean;
  MODE: string;
}

export function initErrorMonitoring() {
  // Error monitoring disabled until deployment
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console -- dev-only info to indicate that Sentry/LogRocket are intentionally disabled
    console.info('Error monitoring disabled in development');
  }
}

export function captureError(error: Error, context?: Record<string, any>) {
  // Error monitoring disabled until deployment
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console -- dev-only error surface until remote monitoring is wired up
    console.error('Error:', error, context);
  }
}
