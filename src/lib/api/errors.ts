import { ApiError } from './axiosClient.ts';

export function getApiErrorMessage(error: unknown, fallback = 'Request failed'): string {
  if (!error) return fallback;
  if ((error as ApiError).message) return (error as ApiError).message;
  if (error instanceof Error) return error.message || fallback;
  return fallback;
}
