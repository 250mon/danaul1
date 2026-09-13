// GA4 measurement ID. This is a public identifier (it ships in the page source
// on every site that uses it), so it is kept in code rather than as another
// NEXT_PUBLIC_* build arg.
export const GA_MEASUREMENT_ID = 'G-LMQQKNGCV6';

// Keep local development out of the property's reporting.
export const analyticsEnabled = process.env.NODE_ENV === 'production';

declare global {
  interface Window {
    gtag?: (command: string, eventName: string, params?: Record<string, unknown>) => void;
  }
}

type EventParams = Record<string, string | number | boolean>;

/**
 * Send a GA4 event. Safe to call anywhere: it no-ops during SSR, in
 * development, and when the tag is blocked by an ad blocker.
 *
 * The actions that matter on this site (phone taps, Naver booking, map links)
 * all navigate away, so they produce no pageview of their own.
 */
export function trackEvent(name: string, params: EventParams = {}): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', name, params);
}
