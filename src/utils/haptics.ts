/**
 * Haptic Feedback Utilities
 * ==========================
 * Provides tactile feedback for touch interactions on mobile devices
 * Uses Vibration API (supported on most modern mobile browsers)
 */

/**
 * Check if haptic feedback is supported
 */
export const isHapticsSupported = (): boolean => {
  return typeof window !== 'undefined' && 'vibrate' in navigator;
};

/**
 * Haptic feedback patterns
 * Duration in milliseconds
 */
export const HapticPattern = {
  // Light tap - for general buttons, links
  LIGHT: 10,

  // Medium tap - for important actions, CTAs
  MEDIUM: 20,

  // Heavy tap - for confirmations, destructive actions
  HEAVY: 30,

  // Success - double pulse
  SUCCESS: [15, 50, 15] as const,

  // Error - triple quick pulses
  ERROR: [10, 30, 10, 30, 10] as const,

  // Selection - subtle single pulse
  SELECTION: 5,

  // Toggle - short double tap
  TOGGLE: [10, 20, 10] as const,

  // Long press - sustained vibration
  LONG_PRESS: 50,
} as const;

/**
 * Trigger haptic feedback
 * @param pattern - Vibration pattern (number or array)
 */
type VibratePattern = number | number[];

export const triggerHaptic = (pattern: number | readonly number[]): void => {
  if (!isHapticsSupported()) return;

  try {
    if (Array.isArray(pattern)) {
      navigator.vibrate([...pattern]); // Spread to convert readonly to mutable
    } else {
      navigator.vibrate(pattern as VibratePattern);
    }
  } catch (error) {
    // Silently fail if vibration is not supported or disabled
    // eslint-disable-next-line no-console
    console.debug('Haptic feedback not available:', error);
  }
};

/**
 * Stop any ongoing haptic feedback
 */
export const stopHaptic = (): void => {
  if (!isHapticsSupported()) return;

  try {
    navigator.vibrate(0);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.debug('Could not stop haptic feedback:', error);
  }
};

/**
 * Haptic feedback for common interactions
 */
export const Haptics = {
  /**
   * Light tap - for general buttons
   */
  tap: () => triggerHaptic(HapticPattern.LIGHT),

  /**
   * Medium tap - for primary buttons, CTAs
   */
  tapMedium: () => triggerHaptic(HapticPattern.MEDIUM),

  /**
   * Heavy tap - for important confirmations
   */
  tapHeavy: () => triggerHaptic(HapticPattern.HEAVY),

  /**
   * Success feedback - double pulse
   */
  success: () => triggerHaptic(HapticPattern.SUCCESS),

  /**
   * Error feedback - triple pulse
   */
  error: () => triggerHaptic(HapticPattern.ERROR),

  /**
   * Selection feedback - very light
   */
  selection: () => triggerHaptic(HapticPattern.SELECTION),

  /**
   * Toggle feedback - double tap
   */
  toggle: () => triggerHaptic(HapticPattern.TOGGLE),

  /**
   * Long press feedback - sustained
   */
  longPress: () => triggerHaptic(HapticPattern.LONG_PRESS),

  /**
   * Stop any ongoing vibration
   */
  stop: stopHaptic,
};

/**
 * User preference for haptics
 * Respects system settings and user choice
 */
export const shouldUseHaptics = (): boolean => {
  if (!isHapticsSupported()) return false;

  // Check for reduced motion preference
  if (typeof window !== 'undefined') {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return false;
  }

  // Check localStorage for user preference
  if (typeof localStorage !== 'undefined') {
    const userPreference = localStorage.getItem('haptics-enabled');
    if (userPreference !== null) {
      return userPreference === 'true';
    }
  }

  // Default to enabled if supported
  return true;
};

/**
 * Set user preference for haptics
 */
export const setHapticsPreference = (enabled: boolean): void => {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('haptics-enabled', enabled.toString());
  }
};

/**
 * React hook for haptic feedback
 * Usage: const haptic = useHaptics();
 *        haptic.tap();
 */
export const useHaptics = () => {
  const enabled = shouldUseHaptics();

  return {
    tap: () => enabled && Haptics.tap(),
    tapMedium: () => enabled && Haptics.tapMedium(),
    tapHeavy: () => enabled && Haptics.tapHeavy(),
    success: () => enabled && Haptics.success(),
    error: () => enabled && Haptics.error(),
    selection: () => enabled && Haptics.selection(),
    toggle: () => enabled && Haptics.toggle(),
    longPress: () => enabled && Haptics.longPress(),
    stop: Haptics.stop,
    enabled,
  };
};

export default Haptics;
