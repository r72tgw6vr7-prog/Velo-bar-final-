// @ts-nocheck
/**
 * Test Helper Utilities
 * Shared utilities for testing components across the application
 */

import React, { ReactElement, ReactNode } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { vi } from 'vitest';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { LanguageProvider } from '../../contexts/LanguageContext.ts';
import { AppProvider } from '../../core/state/AppContext.ts';
import { AccessibilityProvider } from '../../components/accessibility/index.ts';

/**
 * Custom render function that wraps components with all necessary providers
 */
interface AllTheProvidersProps {
  children: ReactNode;
  initialLanguage?: 'DE' | 'EN';
  initialRoute?: string;
}

function AllTheProviders({ children, initialLanguage = 'DE', initialRoute }: AllTheProvidersProps) {
  if (initialRoute) {
    return React.createElement(
      MemoryRouter,
      { initialEntries: [initialRoute] },
      React.createElement(
        AppProvider,
        { initialLanguage },
        React.createElement(
          LanguageProvider,
          null,
          React.createElement(AccessibilityProvider, null, children),
        ),
      ),
    );
  }

  return React.createElement(
    BrowserRouter,
    null,
    React.createElement(
      AppProvider,
      { initialLanguage },
      React.createElement(
        LanguageProvider,
        null,
        React.createElement(AccessibilityProvider, null, children),
      ),
    ),
  );
}

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  initialLanguage?: 'DE' | 'EN';
}

/**
 * Custom render with all providers
 */
export function renderWithProviders(ui: ReactElement, options?: CustomRenderOptions) {
  const { initialLanguage, initialRoute, ...renderOptions } = options || {};

  return render(ui, {
    wrapper: ({ children }) =>
      React.createElement(
        AllTheProviders,
        { initialLanguage, initialRoute },
        // Attach initialRoute to children props for Router selection
        React.cloneElement(children as ReactElement, { initialRoute }),
      ),
    ...renderOptions,
  });
}

/**
 * Wait for async operations to complete
 */
export const waitForAsync = () => new Promise((resolve) => setTimeout(resolve, 0));

/**
 * Create mock intersection observer
 */
export function createMockIntersectionObserver() {
  return class MockIntersectionObserver {
    observe = vi.fn();
    disconnect = vi.fn();
    unobserve = vi.fn();
  };
}

/**
 * Mock window.matchMedia
 */
export function createMockMatchMedia(matches: boolean = false) {
  return (query: string) => ({
    matches,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  });
}

/**
 * Mock ResizeObserver
 */
export function createMockResizeObserver() {
  return class MockResizeObserver {
    observe = vi.fn();
    disconnect = vi.fn();
    unobserve = vi.fn();
  };
}

/**
 * Setup common browser API mocks
 */
export function setupBrowserMocks() {
  globalThis.IntersectionObserver =
    createMockIntersectionObserver() as unknown as typeof IntersectionObserver;
  globalThis.ResizeObserver = createMockResizeObserver() as unknown as typeof ResizeObserver;
  Object.defineProperty(globalThis, 'matchMedia', {
    writable: true,
    value: createMockMatchMedia(),
  });
}

/**
 * Clean up all mocks
 */
export function cleanupBrowserMocks() {
  vi.clearAllMocks();
}

/**
 * Create a mock image element
 */
export function createMockImage(loaded: boolean = true) {
  const img = document.createElement('img');

  Object.defineProperty(img, 'complete', {
    get: () => loaded,
  });

  if (loaded) {
    setTimeout(() => {
      img.dispatchEvent(new Event('load'));
    }, 0);
  }

  return img;
}

/**
 * Simulate user typing
 */
export async function typeText(element: HTMLElement, text: string) {
  const { fireEvent } = await import('@testing-library/react');

  for (const char of text) {
    fireEvent.change(element, { target: { value: (element as HTMLInputElement).value + char } });
    await waitForAsync();
  }
}

/**
 * Get element with accessibility role and name
 */
export function getByRoleAndName(role: string, name: string | RegExp) {
  const { screen } = require('@testing-library/react');
  return screen.getByRole(role, { name });
}

/**
 * Assert element has accessible name
 */
export function expectAccessibleName(element: HTMLElement, name: string) {
  expect(element).toHaveAttribute('aria-label', name);
}

/**
 * Create mock form data
 */
export function createMockFormData(data: Record<string, string>) {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value);
  });
  return formData;
}

/**
 * Mock API response
 */
export function createMockApiResponse<T>(data: T, status: number = 200) {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => data,
    text: async () => JSON.stringify(data),
    headers: new Headers(),
  } as Response;
}

export default {
  renderWithProviders,
  waitForAsync,
  setupBrowserMocks,
  cleanupBrowserMocks,
  createMockImage,
  typeText,
  getByRoleAndName,
  expectAccessibleName,
  createMockFormData,
  createMockApiResponse,
};
