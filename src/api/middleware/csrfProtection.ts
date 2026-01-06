/* eslint-disable @typescript-eslint/no-explicit-any */
import * as csrf from '../../../api/middleware/csrfProtection.js';

export const csrfProtection = (csrf as any).csrfProtection || (csrf as any).default;
export const generateCsrfToken = (csrf as any).generateCsrfToken;
export const setCsrfToken = (csrf as any).setCsrfToken;
export const validateCsrfToken = (csrf as any).validateCsrfToken;
export const handleGetCsrfToken = (csrf as any).handleGetCsrfToken;

export default csrfProtection;
