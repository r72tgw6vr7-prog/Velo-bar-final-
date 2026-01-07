/**
 * Mock Data Fixtures
 * Reusable test data for components and integration tests
 */

// Local Artist-like type for tests (decoupled from production domain)
interface Artist {
  id: string;
  name: string;
  slug: string;
  role: string;
  specialties: string[];
  bio: string;
  image: string;
  portfolio: Array<{ id: string; src: string; alt: string; category: string }>;
  social: { instagram: string };
  availability: string;
  experience: string;
}

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
  artist: string;
  artistId: string;
  tags: string[];
  width: number;
  height: number;
  aspectRatio: string;
}

/**
 * Mock Artist Data
 */
export const mockArtist: Artist = {
  id: 'test-artist-1',
  name: 'Test Artist',
  slug: 'test-artist',
  role: 'Full-Stack Developer',
  specialties: ['Realism', 'Fine Line'],
  bio: 'Test artist biography',
  image: '/images/placeholder.svg',
  portfolio: [
    {
      id: 'img-1',
      src: '/test-assets/test-image.jpg',
      alt: 'Test artwork 1',
      category: 'realism',
    },
  ],
  social: {
    instagram: 'https://instagram.com/testartist',
  },
  availability: 'available',
  experience: '5+ years',
};

export const mockArtists: Artist[] = [
  mockArtist,
  {
    ...mockArtist,
    id: 'test-artist-2',
    name: 'Another Artist',
    slug: 'another-artist',
    specialties: ['Blackwork', 'Geometric'],
  },
];

/**
 * Mock Gallery Images
 */
export const mockGalleryImage: GalleryImage = {
  id: 'gallery-1',
  src: '/Velo Gallery/event-1-640w.webp',
  alt: 'Test project screenshot',
  category: 'realism',
  artist: 'Test Artist',
  artistId: 'test-artist-1',
  tags: ['portrait', 'realism', 'black-and-gray'],
  width: 800,
  height: 600,
  aspectRatio: '4/3',
};

const galleryCategories = ['realism', 'fine-line', 'blackwork', 'geometric'] as const;

export const mockGalleryImages: GalleryImage[] = Array.from({ length: 12 }, (_, i) => ({
  ...mockGalleryImage,
  id: `gallery-${i + 1}`,
  src: `/Velo Gallery/event-${(i % 11) + 1}.jpg`,
  category: galleryCategories[i % galleryCategories.length],
}));

/**
 * Mock Service Data
 */
export const mockService = {
  id: 'service-1',
  title: 'Custom Web Application',
  titleDE: 'Individuelle Webanwendung',
  description: 'Custom web application tailored to your requirements',
  descriptionDE: 'Individuelle Webanwendung nach Ihren Vorstellungen',
  price: 'Ab 150€',
  duration: '2-4 hours',
  icon: 'Sparkles',
  features: ['Personal consultation', 'Custom design', 'Professional execution'],
};

export const mockServices = Array.from({ length: 6 }, (_, i) => ({
  ...mockService,
  id: `service-${i + 1}`,
  title: `Service ${i + 1}`,
}));

/**
 * Mock Booking Data
 */
export const mockBookingFormData = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+49 123 456789',
  service: 'custom-web-app',
  date: '2025-12-01',
  message: 'I would like to schedule a call about a custom web application.',
};

/**
 * Mock Contact Form Data
 */
export const mockContactFormData = {
  name: 'Jane Smith',
  email: 'jane.smith@example.com',
  subject: 'General Inquiry',
  message: 'I have a question about your services.',
};

/**
 * Mock Review Data
 */
export const mockReview = {
  id: 'review-1',
  author: 'Sarah M.',
  rating: 5,
  text: 'Amazing experience! Highly professional and talented artists.',
  textDE: 'Großartige Erfahrung! Hochprofessionelle und talentierte Künstler.',
  date: '2025-10-15',
  source: 'Google',
};

export const mockReviews = Array.from({ length: 8 }, (_, i) => ({
  ...mockReview,
  id: `review-${i + 1}`,
  author: `Customer ${i + 1}`,
  rating: Math.floor(Math.random() * 2) + 4, // 4 or 5 stars
}));

/**
 * Mock FAQ Data
 */
export const mockFAQ = {
  id: 'faq-1',
  question: 'How much does a project cost?',
  questionDE: 'Wie viel kostet ein Projekt?',
  answer: 'Prices vary based on scope, complexity, and time required. Starting from €150.',
  answerDE: 'Die Preise variieren je nach Umfang, Komplexität und benötigter Zeit. Ab 150 €.',
  category: 'pricing',
};

export const mockFAQs = Array.from({ length: 10 }, (_, i) => ({
  ...mockFAQ,
  id: `faq-${i + 1}`,
  question: `FAQ Question ${i + 1}?`,
  questionDE: `FAQ Frage ${i + 1}?`,
  category: ['pricing', 'process', 'service'][i % 3],
}));

/**
 * Mock Business Hours
 */
export const mockBusinessHours = {
  monday: { open: '10:00', close: '18:00', closed: false },
  tuesday: { open: '10:00', close: '18:00', closed: false },
  wednesday: { open: '10:00', close: '18:00', closed: false },
  thursday: { open: '10:00', close: '18:00', closed: false },
  friday: { open: '10:00', close: '18:00', closed: false },
  saturday: { open: '12:00', close: '16:00', closed: false },
  sunday: { open: '', close: '', closed: true },
};

/**
 * Mock Navigation Items
 */
export const mockNavItems = [
  { id: 'home', label: 'Home', path: '/' },
  { id: 'services', label: 'Services', path: '/services' },
  { id: 'artists', label: 'Artists', path: '/artists' },
  { id: 'gallery', label: 'Gallery', path: '/gallery' },
  { id: 'booking', label: 'Booking', path: '/booking' },
  { id: 'contact', label: 'Contact', path: '/contact' },
];

/**
 * Mock API Response
 */
export const mockApiSuccessResponse = {
  success: true,
  message: 'Operation completed successfully',
  data: {},
};

export const mockApiErrorResponse = {
  success: false,
  error: 'An error occurred',
  message: 'Something went wrong',
};

/**
 * Helper to create custom mock data
 */
export function createMockArtist(overrides: Partial<Artist> = {}): Artist {
  return { ...mockArtist, ...overrides };
}

export function createMockGalleryImage(overrides: Partial<GalleryImage> = {}): GalleryImage {
  return { ...mockGalleryImage, ...overrides };
}
