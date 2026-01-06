interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

interface ConsentRecord {
  preferences: CookiePreferences;
  timestamp: string;
  source: 'direct' | 'banner' | 'preferences';
  version: string;
}

interface ConsentEvent {
  type: 'grant' | 'withdraw' | 'modify';
  preferences: CookiePreferences;
  timestamp: string;
  source: 'direct' | 'banner' | 'preferences';
}

const CONSENT_VERSION = '1.0.0';
const CONSENT_STORAGE_KEY = 'cookieConsent';
const AUDIT_LOG_KEY = 'consentAuditLog';

/**
 * Blocks third-party trackers until user consent is granted.
 * Should be called as early as possible in the application lifecycle.
 */
export function blockTrackersUntilConsent(): void {
  const consent = getConsentStatus();

  // If no consent record exists or analytics/marketing are disabled
  if (!consent || (!consent.analytics && !consent.marketing)) {
    // Create global control variables to prevent script loading
    window.__BLOCK_GA__ = true;
    window.__BLOCK_FB_PIXEL__ = true;
    window.__BLOCK_MARKETING__ = true;

    // Override potential tracking functions
    window.ga = function () {
      if (process.env.NODE_ENV === 'development') {
        console.warn('Analytics blocked due to missing consent');
      }
    };
    window.fbq = function () {
      if (process.env.NODE_ENV === 'development') {
        console.warn('Facebook Pixel blocked due to missing consent');
      }
    };
  }
}

/**
 * Saves the user's consent preferences with audit trail.
 * @param preferences User's cookie preferences
 * @param source Where the consent was given
 */
export function saveConsentChoice(
  preferences: CookiePreferences,
  source: ConsentRecord['source'] = 'banner',
): void {
  const timestamp = new Date().toISOString();

  // Create consent record
  const consentRecord: ConsentRecord = {
    preferences,
    timestamp,
    source,
    version: CONSENT_VERSION,
  };

  // Save to localStorage
  localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consentRecord));

  // Log consent event
  const event: ConsentEvent = {
    type: 'grant',
    preferences,
    timestamp,
    source,
  };
  auditLog(event);

  // Dispatch event for other parts of the application
  window.dispatchEvent(new CustomEvent('consentUpdated', { detail: consentRecord }));
}

/**
 * Withdraws all optional consent while maintaining essential cookies.
 * As per GDPR Art. 7(3), withdrawal must be as easy as giving consent.
 */
export function withdrawConsent(): void {
  const preferences: CookiePreferences = {
    essential: true, // Essential cookies cannot be withdrawn
    analytics: false,
    marketing: false,
  };

  const timestamp = new Date().toISOString();

  // Update localStorage
  const consentRecord: ConsentRecord = {
    preferences,
    timestamp,
    source: 'direct',
    version: CONSENT_VERSION,
  };

  localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consentRecord));

  // Log withdrawal
  const event: ConsentEvent = {
    type: 'withdraw',
    preferences,
    timestamp,
    source: 'direct',
  };
  auditLog(event);

  // Dispatch event
  window.dispatchEvent(new CustomEvent('consentUpdated', { detail: consentRecord }));
}

/**
 * Gets the current consent status.
 * @returns Current cookie preferences or null if no consent given
 */
export function getConsentStatus(): CookiePreferences | null {
  const storedConsent = localStorage.getItem(CONSENT_STORAGE_KEY);

  if (!storedConsent) {
    return null;
  }

  try {
    const consentRecord: ConsentRecord = JSON.parse(storedConsent);
    return consentRecord.preferences;
  } catch (e) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error parsing consent record:', e);
    }
    return null;
  }
}

/**
 * Records consent events for compliance auditing.
 * Maintains a timestamped log of all consent-related actions.
 * @param event The consent event to log
 */
export function auditLog(event: ConsentEvent): void {
  // Get existing log
  const existingLog = localStorage.getItem(AUDIT_LOG_KEY);
  let log: ConsentEvent[] = [];

  if (existingLog) {
    try {
      log = JSON.parse(existingLog);
    } catch (e) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error parsing audit log:', e);
      }
    }
  }

  // Add new event
  log.push(event);

  // Keep only last 100 events to manage storage size
  if (log.length > 100) {
    log = log.slice(-100);
  }

  // Save updated log
  localStorage.setItem(AUDIT_LOG_KEY, JSON.stringify(log));
}

// Type declarations for global variables
declare global {
  interface Window {
    __BLOCK_GA__?: boolean;
    __BLOCK_FB_PIXEL__?: boolean;
    __BLOCK_MARKETING__?: boolean;
    ga?: (...args: any[]) => void;
    fbq?: (...args: any[]) => void;
  }
}
