/**
 * CENTRALIZED IMAGE PATH CONFIGURATION
 * =====================================
 * Single source of truth for all image paths in the application.
 *
 * RULES:
 * 1. ALL paths must be lowercase
 * 2. Use hyphens for multi-word names (event-photo-1.jpg)
 * 3. Never use spaces or underscores
 * 4. Always include file extension
 * 5. Paths are relative to /public directory
 */

export const IMAGE_PATHS = {
  // Icons and logos
  icons: {
    crown: '/icons/crown.svg',
    diamond: '/Diamond.svg',
  },

  // Hero section
  hero: {
    // use an existing gallery hero as the default background
    background: '/Velo Gallery/mobile-bar-hero.jpg',
    trustBadge1: '/images/clients/client-01.svg',
    trustBadge2: '/images/clients/client-02.svg',
    trustBadge3: '/images/clients/client-03.svg',
    trustBadge4: '/images/clients/client-04.svg',
  },

  // Background images
  backgrounds: {
    cosmic: '/Velo Gallery/mobile-bar-hero.jpg',
  },

  // Partners logos
  partners: {
    nannybag: '/images/partners/nannybag-logo.svg',
    iamrobot: '/images/partners/iamrobot-logo.svg',
    partner3: '/images/clients/client-05.svg',
    bqla: '/images/clients/client-06.svg',
  },

  // Fallback images
  fallback: {
    placeholder: '/images/placeholder.svg',
  },
} as const;

// Type-safe image path getter
export type ImageCategory = keyof typeof IMAGE_PATHS;
export type ImageKey<T extends ImageCategory> = keyof (typeof IMAGE_PATHS)[T];

export function getImagePath<T extends ImageCategory>(category: T, key: ImageKey<T>): string {
  return IMAGE_PATHS[category][key] as string;
}

// Type for all possible image paths in our system
type ImagePathValue = string;

// Validate that an image path exists (client-side check)
export function isValidImagePath(path: string): boolean {
  // Get all image paths as a flattened array of strings
  const allImagePaths = Object.values(IMAGE_PATHS).flatMap((category) =>
    Object.values(category),
  ) as ImagePathValue[];

  // Check if the given path exists in our defined paths
  return allImagePaths.includes(path);
}
