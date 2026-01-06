import { ReactNode } from 'react';

export interface RouteComponentProps {
  // Add common props that will be passed to all route components
  className?: string;
  children?: ReactNode;
  [key: string]: unknown;
}

export interface RouteProps {
  path: string;
  name: string;
  component: React.ComponentType<RouteComponentProps>;
  exact?: boolean;
  isProtected?: boolean;
  layout?: React.ComponentType<{ children: ReactNode }>;
  roles?: string[];
}

export interface RouteConfig extends Omit<RouteProps, 'component'> {
  component: React.LazyExoticComponent<React.ComponentType<RouteComponentProps>>;
}

export interface BreadcrumbItem {
  path: string;
  name: string;
  current: boolean;
}

export interface NavigationItem {
  name: string;
  path: string;
  icon?: ReactNode;
  children?: NavigationItem[];
  roles?: string[];
}

export type RouteParams = {
  [key: string]: string | number | undefined;
};

export type QueryParams = {
  [key: string]: string | string[] | undefined;
};

export type RouteMatch = {
  params: RouteParams;
  query: QueryParams;
  path: string;
  url: string;
  isExact: boolean;
};

export interface LocationState {
  from?: string;
  background?: Location;
  [key: string]: unknown;
}

export interface RouterHistory {
  push: (path: string, state?: LocationState) => void;
  replace: (path: string, state?: LocationState) => void;
  go: (n: number) => void;
  goBack: () => void;
  goForward: () => void;
  location: {
    pathname: string;
    search: string;
    hash: string;
    state: LocationState | null;
    key: string;
  };
  listen: (listener: (location: Location, action: string) => void) => () => void;
  block: (blocker: (location: Location, action: string) => string | void) => () => void;
}
