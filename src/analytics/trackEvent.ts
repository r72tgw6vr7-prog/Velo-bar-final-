import analytics from '@/utils/analytics';

/**
 * Typed, privacy-friendly event tracking wrapper.
 *
 * This module centralizes event naming and schema for core funnels.
 * It wraps the GA4 integration in `utils/analytics` and remains
 * completely safe when analytics is not configured (no-op).
 *
 * Event schema (conceptual):
 *
 * trackEvent({
 *   category: 'CTA',
 *   action: 'click',
 *   label: 'hero_firmenevent',
 *   metadata: { location: 'home_hero' },
 * });
 *
 * → GA4 payload via `analytics.event`:
 *   event_name: 'click'
 *   params: {
 *     event_category: 'CTA',
 *     event_action: 'click',
 *     event_label: 'hero_firmenevent',
 *     location: 'home_hero',
 *     timestamp: 1700000000000,
 *   }
 *
 * Booking wizard examples:
 *
 * trackBookingStepView(1, 'Event-Basics');
 * // category: 'BookingWizard', action: 'step_view', label: 'step_1'
 *
 * trackBookingSubmitSuccess();
 * // category: 'BookingWizard', action: 'submit_success', label: 'booking_submit'
 *
 * trackBookingSubmitError('network_error');
 * // category: 'BookingWizard', action: 'submit_error', label: 'booking_submit', metadata.error_type: 'network_error'
 */

// Centralized enums for categories, actions and labels
export const EVENT_CATEGORIES = {
  CTA: 'CTA',
  BOOKING_WIZARD: 'BookingWizard',
  FORM: 'Form',
} as const;

export type EventCategory = (typeof EVENT_CATEGORIES)[keyof typeof EVENT_CATEGORIES];

export const EVENT_ACTIONS = {
  CLICK: 'click',
  STEP_VIEW: 'step_view',
  SUBMIT_SUCCESS: 'submit_success',
  SUBMIT_ERROR: 'submit_error',
} as const;

export type EventAction = (typeof EVENT_ACTIONS)[keyof typeof EVENT_ACTIONS];

export const EVENT_LABELS = {
  HERO_FIRMENEVENT: 'hero_firmenevent',
  HERO_PRIVATE_FEIER: 'hero_private_feier',
  BOOKING_SUBMIT: 'booking_submit',
} as const;

export type EventLabel = (typeof EVENT_LABELS)[keyof typeof EVENT_LABELS] | string;

export interface TrackEventInput {
  category: EventCategory;
  action: EventAction;
  label?: EventLabel;
  /** Optional numeric value associated with the event */
  value?: number;
  /** Additional structured, non-PII metadata */
  metadata?: Record<string, unknown>;
}

/**
 * Low-level event sender.
 *
 * - Delegates to GA4 wrapper (`analytics.event`), which is null-safe.
 * - Adds GA-compatible fields (event_category/event_action/event_label).
 */
export function trackEvent(input: TrackEventInput): void {
  const { category, action, label, value, metadata } = input;

  const params: Record<string, unknown> = {
    event_category: category,
    event_action: action,
  };

  if (label) {
    params.event_label = label;
  }

  if (typeof value === 'number') {
    params.value = value;
  }

  if (metadata) {
    Object.assign(params, metadata);
  }

  // `analytics.event` is already null-safe and will no-op if GA4 is disabled.
  analytics.event(action, params);
}

// Convenience wrappers for current funnels

/** Track hero primary CTA click: Firmenevent buchen */
export function trackHeroFirmeneventClick(): void {
  trackEvent({
    category: EVENT_CATEGORIES.CTA,
    action: EVENT_ACTIONS.CLICK,
    label: EVENT_LABELS.HERO_FIRMENEVENT,
    metadata: { location: 'home_hero' },
  });
}

/** Track hero secondary CTA click: Private Feier */
export function trackHeroPrivateFeierClick(): void {
  trackEvent({
    category: EVENT_CATEGORIES.CTA,
    action: EVENT_ACTIONS.CLICK,
    label: EVENT_LABELS.HERO_PRIVATE_FEIER,
    metadata: { location: 'home_hero' },
  });
}

/** Track booking wizard step view */
export function trackBookingStepView(step: number, stepTitle?: string): void {
  trackEvent({
    category: EVENT_CATEGORIES.BOOKING_WIZARD,
    action: EVENT_ACTIONS.STEP_VIEW,
    label: `step_${step}`,
    metadata: stepTitle ? { step_title: stepTitle } : undefined,
  });
}

/** Track successful booking wizard submission */
export function trackBookingSubmitSuccess(
  source?: string,
  utmParams?: Record<string, string>,
): void {
  trackEvent({
    category: EVENT_CATEGORIES.BOOKING_WIZARD,
    action: EVENT_ACTIONS.SUBMIT_SUCCESS,
    label: EVENT_LABELS.BOOKING_SUBMIT,
    metadata: {
      ...(source && { source }),
      ...(utmParams && Object.keys(utmParams).length > 0 && { ...utmParams }),
    },
  });
}

/** Track failed booking wizard submission */
export function trackBookingSubmitError(errorType?: string, source?: string): void {
  trackEvent({
    category: EVENT_CATEGORIES.BOOKING_WIZARD,
    action: EVENT_ACTIONS.SUBMIT_ERROR,
    label: EVENT_LABELS.BOOKING_SUBMIT,
    metadata: {
      ...(errorType && { error_type: errorType }),
      ...(source && { source }),
    },
  });
}

/** Track content page CTA clicks with source attribution */
export function trackContentCTAClick(
  pageSlug: string,
  ctaType: 'primary' | 'secondary',
  destination: string,
): void {
  trackEvent({
    category: EVENT_CATEGORIES.CTA,
    action: EVENT_ACTIONS.CLICK,
    label: `content_${ctaType}_cta`,
    metadata: {
      page_slug: pageSlug,
      destination,
    },
  });
}

/** Get UTM parameters from URL */
export function getUTMParams(): Record<string, string> {
  if (typeof window === 'undefined') return {};

  const params = new URLSearchParams(window.location.search);
  const utmParams: Record<string, string> = {};

  const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'source'];
  utmKeys.forEach((key) => {
    const value = params.get(key);
    if (value) {
      utmParams[key] = value;
    }
  });

  return utmParams;
}
