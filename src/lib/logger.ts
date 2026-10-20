export interface LogContext {
  [key: string]: unknown;
}

function serializeError(error: unknown): Record<string, unknown> {
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      stack: process.env.NODE_ENV === 'production' ? undefined : error.stack,
    };
  }
  return { value: error };
}

function log(level: string, message: string, context: LogContext = {}): void {
  const entry = {
    level,
    message,
    timestamp: new Date().toISOString(),
    service: 'velo-bar',
    env: process.env.NODE_ENV || 'development',
    ...context,
  };

  if (process.env.NODE_ENV === 'production' || process.env.VERCEL === '1') {
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(entry));
  } else {
    // eslint-disable-next-line no-console
    console.log(`[${entry.level}] ${entry.message}`, context);
  }
}

export const logger = {
  info: (message: string, context?: LogContext) => log('info', message, context),
  warn: (message: string, context?: LogContext) => log('warn', message, context),
  error: (message: string, error?: unknown, context?: LogContext) =>
    log('error', message, { ...context, error: error ? serializeError(error) : undefined }),
  security: (message: string, context?: LogContext) => log('security', message, context),
};
