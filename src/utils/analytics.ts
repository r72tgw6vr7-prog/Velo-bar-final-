/**
 * Google Analytics 4 (GA4) Integration
 *
 * Features:
 * - Environment-based configuration
 * - Event tracking for user interactions
 * - Privacy-compliant implementation
 * - TypeScript support
 * - Error handling and fallbacks
 */

/* eslint-disable no-console -- analytics wrapper logs initialization and debug details in development environments */

// GA4 Event Types
export interface GAEvent {
  action: string;
  category?: string;
  label?: string;
  value?: number;
  // GA4 custom parameters
  page_title?: string;
  page_location?: string;
  content_group1?: string;
  custom_parameter?: string;
}

// Predefined events for the portfolio site
export const GA_EVENTS = {
  // Booking Events
  BOOKING_STARTED: 'booking_started',
  BOOKING_COMPLETED: 'booking_completed',
  BOOKING_ABANDONED: 'booking_abandoned',
  SERVICE_SELECTED: 'service_selected',
  ARTIST_SELECTED: 'artist_selected',

  // Gallery Events
  GALLERY_VIEW: 'gallery_view',
  IMAGE_CLICKED: 'image_clicked',
  FILTER_APPLIED: 'filter_applied',
  LIGHTBOX_OPENED: 'lightbox_opened',

  // Form Events
  CONTACT_FORM_SUBMITTED: 'contact_form_submitted',
  FORM_ERROR: 'form_error',

  // Navigation Events
  PAGE_VIEW: 'page_view',
  EXTERNAL_LINK_CLICKED: 'external_link_clicked',
  PHONE_CLICKED: 'phone_clicked',
  EMAIL_CLICKED: 'email_clicked',
  SOCIAL_CLICKED: 'social_clicked',

  // User Engagement
  SCROLL_DEPTH: 'scroll_depth',
  TIME_ON_PAGE: 'time_on_page',
  CTA_CLICKED: 'cta_clicked',
};

class GoogleAnalytics {
  private measurementId: string | null = null;
  private isInitialized: boolean = false;
  private debugMode: boolean = false;

  constructor() {
    this.measurementId = import.meta.env.VITE_GA4_MEASUREMENT_ID || null;
    this.debugMode = import.meta.env.VITE_APP_ENV === 'development';

    if (this.measurementId) {
      this.initialize();
    } else {
      console.warn('GA4: No measurement ID found. Analytics disabled.');
    }
  }

  /**
   * Initialize Google Analytics 4
   */
  private initialize(): void {
    if (typeof window === 'undefined' || this.isInitialized) return;

    try {
      // Load gtag script
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${this.measurementId}`;
      document.head.appendChild(script);

      // Initialize gtag
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () {
        window.dataLayer.push(arguments);
      };

      window.gtag('js', new Date());
      window.gtag('config', this.measurementId!, {
        // Privacy settings
        anonymize_ip: true,
        allow_google_signals: false,
        allow_ad_personalization_signals: false,

        // Debug mode for development
        debug_mode: this.debugMode,

        // Custom configuration
        send_page_view: false, // We'll send manually for better control
        cookie_flags: 'SameSite=Strict;Secure',
      });

      this.isInitialized = true;

      if (this.debugMode) {
        console.log('GA4: Initialized with ID:', this.measurementId);
      }
    } catch (error) {
      console.error('GA4: Failed to initialize:', error);
    }
  }

  /**
   * Track a page view
   */
  pageView(path: string, title?: string): void {
    if (!this.isReady()) return;

    try {
      window.gtag('event', 'page_view', {
        page_title: title || document.title,
        page_location: window.location.origin + path,
        page_path: path,
      });

      if (this.debugMode) {
        console.log('GA4: Page view tracked:', path);
      }
    } catch (error) {
      console.error('GA4: Page view tracking failed:', error);
    }
  }

  /**
   * Track a custom event
   */
  event(eventName: string, parameters?: Record<string, unknown>): void {
    if (!this.isReady()) return;

    try {
      window.gtag('event', eventName, {
        ...parameters,
        timestamp: Date.now(),
      });

      if (this.debugMode) {
        console.log('GA4: Event tracked:', eventName, parameters);
      }
    } catch (error) {
      console.error('GA4: Event tracking failed:', error);
    }
  }

  /**
   * Track booking events
   */
  trackBooking = {
    started: (service?: string) => {
      this.event(GA_EVENTS.BOOKING_STARTED, {
        content_group1: 'booking',
        service_type: service,
      });
    },

    completed: (service: string, artist: string, value?: number) => {
      this.event(GA_EVENTS.BOOKING_COMPLETED, {
        content_group1: 'booking',
        service_type: service,
        artist_name: artist,
        value: value,
      });
    },

    abandoned: (step: string) => {
      this.event(GA_EVENTS.BOOKING_ABANDONED, {
        content_group1: 'booking',
        abandonment_step: step,
      });
    },

    serviceSelected: (service: string) => {
      this.event(GA_EVENTS.SERVICE_SELECTED, {
        content_group1: 'booking',
        service_type: service,
      });
    },

    artistSelected: (artist: string) => {
      this.event(GA_EVENTS.ARTIST_SELECTED, {
        content_group1: 'booking',
        artist_name: artist,
      });
    },
  };

  /**
   * Track gallery events
   */
  trackGallery = {
    view: (filterType?: string) => {
      this.event(GA_EVENTS.GALLERY_VIEW, {
        content_group1: 'gallery',
        filter_type: filterType,
      });
    },

    imageClicked: (imageId: string, artist: string, style: string) => {
      this.event(GA_EVENTS.IMAGE_CLICKED, {
        content_group1: 'gallery',
        image_id: imageId,
        artist_name: artist,
        work_style: style,
      });
    },

    filterApplied: (filterType: string, filterValue: string) => {
      this.event(GA_EVENTS.FILTER_APPLIED, {
        content_group1: 'gallery',
        filter_type: filterType,
        filter_value: filterValue,
      });
    },

    lightboxOpened: (imageId: string) => {
      this.event(GA_EVENTS.LIGHTBOX_OPENED, {
        content_group1: 'gallery',
        image_id: imageId,
      });
    },
  };

  /**
   * Track form events
   */
  trackForm = {
    submitted: (formType: string, success: boolean = true) => {
      this.event(success ? GA_EVENTS.CONTACT_FORM_SUBMITTED : GA_EVENTS.FORM_ERROR, {
        content_group1: 'forms',
        form_type: formType,
        success: success,
      });
    },

    error: (formType: string, errorType: string) => {
      this.event(GA_EVENTS.FORM_ERROR, {
        content_group1: 'forms',
        form_type: formType,
        error_type: errorType,
      });
    },
  };

  /**
   * Track navigation and engagement
   */
  trackEngagement = {
    externalLink: (url: string, linkText?: string) => {
      this.event(GA_EVENTS.EXTERNAL_LINK_CLICKED, {
        content_group1: 'navigation',
        link_url: url,
        link_text: linkText,
      });
    },

    phone: () => {
      this.event(GA_EVENTS.PHONE_CLICKED, {
        content_group1: 'contact',
      });
    },

    email: () => {
      this.event(GA_EVENTS.EMAIL_CLICKED, {
        content_group1: 'contact',
      });
    },

    social: (platform: string) => {
      this.event(GA_EVENTS.SOCIAL_CLICKED, {
        content_group1: 'social',
        social_platform: platform,
      });
    },

    cta: (ctaText: string, location: string) => {
      this.event(GA_EVENTS.CTA_CLICKED, {
        content_group1: 'engagement',
        cta_text: ctaText,
        cta_location: location,
      });
    },

    scrollDepth: (percentage: number) => {
      // Only track meaningful milestones
      if ([25, 50, 75, 100].includes(percentage)) {
        this.event(GA_EVENTS.SCROLL_DEPTH, {
          content_group1: 'engagement',
          scroll_percentage: percentage,
        });
      }
    },
  };

  /**
   * Check if GA4 is ready to use
   */
  private isReady(): boolean {
    if (!this.isInitialized || !this.measurementId) {
      if (this.debugMode) {
        console.warn('GA4: Not initialized or no measurement ID');
      }
      return false;
    }

    if (typeof window === 'undefined' || !window.gtag) {
      if (this.debugMode) {
        console.warn('GA4: gtag not available');
      }
      return false;
    }

    return true;
  }

  /**
   * Get debug information
   */
  getDebugInfo(): object {
    return {
      measurementId: this.measurementId,
      isInitialized: this.isInitialized,
      debugMode: this.debugMode,
      gtagAvailable: typeof window !== 'undefined' && !!window.gtag,
    };
  }
}

// Global instance
export const analytics = new GoogleAnalytics();

// Export for use in components
export default analytics;

// Extend window type for TypeScript
declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}
