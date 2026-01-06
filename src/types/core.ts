export type PageType =
  | 'home'
  | 'artists'
  | 'services'
  | 'contact'
  | 'booking'
  | 'followup'
  | 'faq'
  | 'legal'
  | 'datenschutz'
  | 'impressum'
  | 'not-found';

export interface BreadcrumbData {
  label: string;
  path: string;
  children?: BreadcrumbData[];
}

export interface RouteConfig {
  path: string;
  component: () => Promise<{ default: React.ComponentType<any> }>;
  breadcrumb?: string;
  children?: RouteConfig[];
}

// Re-export common types
export type { ReactNode } from 'react';
