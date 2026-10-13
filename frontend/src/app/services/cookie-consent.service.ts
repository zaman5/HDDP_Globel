import { Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type ConsentCategory = 'analytics' | 'marketing';

export interface ConsentState {
  version: number;
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
}

const COOKIE_NAME = 'hddp_consent';
// Bump when cookie categories or their purposes change, so visitors are asked again.
const CONSENT_VERSION = 1;
const MAX_AGE_DAYS = 180;
// Cookies set by common analytics / ad tags; removed when consent is refused or withdrawn.
const NON_ESSENTIAL_PREFIXES = ['_ga', '_gid', '_gat', '_gcl', '_fbp', '_fbc', '_clck', '_clsk', '_hj', 'li_', '_uet'];

/**
 * Stores the visitor's cookie choices in a first-party cookie.
 * Any optional script (analytics, ads) must check `isGranted()` before loading,
 * or listen for the `hddp:consent` window event.
 */
@Injectable({ providedIn: 'root' })
export class CookieConsentService {
  /** Global Privacy Control browser signal — treated as an opt-out of marketing/sharing. */
  readonly gpc = typeof navigator !== 'undefined' && (navigator as any).globalPrivacyControl === true;

  readonly consent = signal<ConsentState | null>(this.read());
  readonly preferencesOpen = signal(false);
  // Never baked into prerendered HTML: returning visitors who already chose would see it flash.
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  readonly bannerVisible = computed(() => this.isBrowser && this.consent() === null && !this.preferencesOpen());

  isGranted(category: ConsentCategory): boolean {
    return !!this.consent()?.[category];
  }

  acceptAll() {
    this.save({ analytics: true, marketing: !this.gpc });
  }

  rejectAll() {
    this.save({ analytics: false, marketing: false });
  }

  save(choices: { analytics: boolean; marketing: boolean }) {
    const state: ConsentState = {
      version: CONSENT_VERSION,
      necessary: true,
      analytics: choices.analytics,
      marketing: choices.marketing && !this.gpc,
      updatedAt: new Date().toISOString()
    };
    this.write(state);
    if (!state.analytics || !state.marketing) this.clearNonEssentialCookies();
    this.consent.set(state);
    this.preferencesOpen.set(false);
    window.dispatchEvent(new CustomEvent('hddp:consent', { detail: state }));
  }

  openPreferences() {
    this.preferencesOpen.set(true);
  }

  closePreferences() {
    this.preferencesOpen.set(false);
  }

  private read(): ConsentState | null {
    if (typeof document === 'undefined') return null;
    const raw = document.cookie.split('; ').find(c => c.startsWith(COOKIE_NAME + '='));
    if (!raw) return null;
    try {
      const state = JSON.parse(decodeURIComponent(raw.slice(COOKIE_NAME.length + 1))) as ConsentState;
      return state.version === CONSENT_VERSION ? state : null;
    } catch {
      return null;
    }
  }

  private write(state: ConsentState) {
    const secure = location.protocol === 'https:' ? '; Secure' : '';
    document.cookie = `${COOKIE_NAME}=${encodeURIComponent(JSON.stringify(state))}; Max-Age=${MAX_AGE_DAYS * 86400}; Path=/; SameSite=Lax${secure}`;
  }

  private clearNonEssentialCookies() {
    const host = location.hostname;
    const domains = ['', host, '.' + host, '.' + host.split('.').slice(-2).join('.')];
    for (const cookie of document.cookie.split('; ')) {
      const name = cookie.split('=')[0];
      if (!NON_ESSENTIAL_PREFIXES.some(p => name.startsWith(p))) continue;
      for (const d of domains) {
        document.cookie = `${name}=; Max-Age=0; Path=/${d ? '; Domain=' + d : ''}`;
      }
    }
  }
}
