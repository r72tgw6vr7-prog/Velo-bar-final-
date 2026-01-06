/**
 * Performance Budget Configuration
 * Enforces 2MB total initial load budget
 */

module.exports = {
  // Bundle size limits (before compression)
  budgets: {
    javascript: {
      max: '600kb', // ~400kb gzipped
      warn: '500kb'
    },
    css: {
      max: '150kb', // ~100kb gzipped  
      warn: '120kb'
    },
    images: {
      max: '1200kb', // Critical path images only
      warn: '1000kb'
    },
    fonts: {
      max: '150kb',
      warn: '120kb'
    },
    total: {
      max: '2048kb', // 2MB hard limit
      warn: '1800kb'
    }
  },
  
  // Lighthouse CI performance budgets
  lighthouse: {
    'resource-summary:script:size': 400000, // 400KB JS (gzipped)
    'resource-summary:stylesheet:size': 100000, // 100KB CSS (gzipped)
    'resource-summary:image:size': 800000, // 800KB images (critical)
    'resource-summary:total:size': 2000000, // 2MB total
    'first-contentful-paint': 1500,
    'largest-contentful-paint': 2000,
    'cumulative-layout-shift': 0.1,
    'total-blocking-time': 200
  }
};
