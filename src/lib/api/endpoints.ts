// Central endpoint registry and helpers
// Keep all path strings in one place for safer refactors

export const endpoints = {
  artists: '/api/artists',
  gallery: '/api/gallery',
  testimonials: '/api/testimonials',
  contact: '/api/contact',
  booking: '/api/booking',
  me: '/api/auth/me',
  login: '/api/auth/login',
  logout: '/api/auth/logout',
  refresh: '/api/auth/refresh',
} as const;

export type EndpointKey = keyof typeof endpoints;

export const ep = {
  artists: () => endpoints.artists,
  artistById: (id: string | number) => `${endpoints.artists}/${id}`,

  gallery: () => endpoints.gallery,
  galleryByTag: (tag: string) => `${endpoints.gallery}?tag=${encodeURIComponent(tag)}`,

  testimonials: () => endpoints.testimonials,

  contact: () => endpoints.contact,
  booking: () => endpoints.booking,
  me: () => endpoints.me,
  login: () => endpoints.login,
  logout: () => endpoints.logout,
  refresh: () => endpoints.refresh,
} as const;
