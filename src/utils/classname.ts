import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple class names or conditional class names
 * and merges Tailwind classes properly
 *
 * @example
 * // Basic usage
 * cn('text-red-500', 'bg-blue-500')
 * // => 'text-red-500 bg-blue-500'
 *
 * @example
 * // With conditionals
 * cn('text-white', isActive && 'bg-blue-500', isBig ? 'text-lg' : 'text-sm')
 * // => 'text-white bg-blue-500 text-lg'
 *
 * @example
 * // Merges conflicting classes properly
 * cn('px-4 py-2', 'p-4')
 * // => 'p-4' (p-4 overrides px-4 and py-2)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
