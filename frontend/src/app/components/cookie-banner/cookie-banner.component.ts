import { Component, ElementRef, HostListener, OnDestroy, ViewChild, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CookieConsentService } from '../../services/cookie-consent.service';

@Component({
  selector: 'app-cookie-banner',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <!-- First-visit banner: not a cookie wall, the site stays usable -->
    <!-- Spacer the size of the banner, so the footer (and its privacy links) can scroll clear of it -->
    <!-- Default heights until the real one is measured -->
    <div *ngIf="consent.bannerVisible()" aria-hidden="true" class="h-[340px] sm:h-[250px] lg:h-[200px]" [style.height.px]="bannerHeight() || null"></div>
    <section #banner *ngIf="consent.bannerVisible()" role="region" aria-labelledby="cb-title"
      class="fixed inset-x-0 bottom-0 z-[60] p-4 sm:p-6 pointer-events-none">
      <div class="pointer-events-auto mx-auto max-w-5xl bg-white border border-line rounded-lg shadow-modal p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center gap-5">
        <div class="flex-1">
          <h2 id="cb-title" class="font-heading text-lg font-semibold text-navy m-0">Cookies on this site</h2>
          <p class="t-small mt-1.5 !max-w-none">
            We use essential cookies to make this site work. With your permission we would also use optional analytics and marketing cookies.
            Optional cookies stay off unless you turn them on. <a routerLink="/cookie-policy" class="link">Cookie policy</a>
          </p>
        </div>
        <div class="grid grid-cols-2 sm:flex gap-3 shrink-0">
          <button type="button" class="btn btn-outline col-span-2 order-last sm:order-none !py-2.5 sm:!py-[13px]" (click)="openPreferences()">Manage choices</button>
          <button type="button" class="btn btn-outline !px-3 sm:!px-6" (click)="consent.rejectAll()">Reject optional</button>
          <button type="button" class="btn btn-primary !px-3 sm:!px-6" (click)="consent.acceptAll()">Accept all</button>
        </div>
      </div>
    </section>

    <!-- Preferences dialog -->
    <div *ngIf="consent.preferencesOpen()" class="fixed inset-0 z-[70] flex items-end sm:items-center justify-center bg-[#082C45]/50 p-0 sm:p-6" (click)="close()">
      <div #dialog role="dialog" aria-modal="true" aria-labelledby="cp-title" tabindex="-1"
        class="bg-white w-full sm:max-w-xl max-h-[92vh] overflow-y-auto rounded-t-lg sm:rounded-lg shadow-modal outline-none"
        (click)="$event.stopPropagation()">
        <div class="flex items-start justify-between gap-4 p-6 border-b border-line">
          <div>
            <h2 id="cp-title" class="t-h3 m-0">Cookie preferences</h2>
            <p class="t-small mt-1">Choose which optional cookies we may use. You can change this at any time from “Cookie settings” in the footer.</p>
          </div>
          <button type="button" (click)="close()" aria-label="Close cookie preferences" class="p-1 -m-1 text-muted hover:text-navy rounded">
            <span class="material-symbols-outlined text-[22px]" aria-hidden="true">close</span>
          </button>
        </div>

        <ul class="list-none m-0 p-0 divide-y divide-line">
          <li *ngFor="let c of categories" class="p-6 flex gap-4 justify-between">
            <div>
              <p class="font-semibold text-navy m-0" [id]="'cat-' + c.key">{{ c.title }}</p>
              <p class="t-small mt-1">{{ c.description }}</p>
              <p *ngIf="c.key === 'marketing' && consent.gpc" class="t-small mt-2 !text-teal-ink font-semibold">
                Your browser is sending a Global Privacy Control signal, so marketing cookies stay off.
              </p>
            </div>
            <label class="switch shrink-0" [class.switch-locked]="c.locked">
              <input type="checkbox" role="switch" [attr.aria-labelledby]="'cat-' + c.key"
                [disabled]="c.locked || (c.key === 'marketing' && consent.gpc)"
                [checked]="c.key === 'necessary' ? true : choices[c.key]"
                (change)="toggle(c.key, $any($event.target).checked)" />
              <span class="switch-track" aria-hidden="true"></span>
              <span class="sr-only">{{ c.locked ? 'Always on' : 'Allow' }}</span>
            </label>
          </li>
        </ul>

        <div class="p-6 border-t border-line flex flex-col-reverse sm:flex-row gap-3 sm:justify-between">
          <a routerLink="/cookie-policy" (click)="close()" class="link self-center text-sm">Read the cookie policy</a>
          <div class="flex flex-col sm:flex-row gap-3">
            <button type="button" class="btn btn-outline" (click)="rejectAll()">Reject optional</button>
            <button type="button" class="btn btn-primary" (click)="saveChoices()">Save choices</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .switch { position: relative; display: inline-flex; width: 46px; height: 26px; cursor: pointer; margin-top: 2px; }
    .switch input { position: absolute; inset: 0; opacity: 0; margin: 0; cursor: inherit; }
    .switch-track { width: 100%; height: 100%; border-radius: 999px; background: #B8C4CE; transition: background-color .15s ease; position: relative; }
    .switch-track::after { content: ''; position: absolute; top: 3px; left: 3px; width: 20px; height: 20px; border-radius: 50%; background: #fff; box-shadow: 0 1px 2px rgba(0,0,0,.2); transition: transform .15s ease; }
    .switch input:checked + .switch-track { background: var(--teal-ink); }
    .switch input:checked + .switch-track::after { transform: translateX(20px); }
    .switch input:focus-visible + .switch-track { outline: 3px solid var(--teal); outline-offset: 2px; }
    .switch input:disabled { cursor: not-allowed; }
    .switch input:disabled + .switch-track { opacity: .6; }
  `]
})
export class CookieBannerComponent implements OnDestroy {
  consent = inject(CookieConsentService);

  @ViewChild('dialog') dialog?: ElementRef<HTMLElement>;

  bannerHeight = signal(0);
  private resizeObserver?: ResizeObserver;

  // Track the banner's height (it changes with screen width) for the spacer above.
  @ViewChild('banner') set bannerEl(el: ElementRef<HTMLElement> | undefined) {
    this.resizeObserver?.disconnect();
    if (!el || typeof ResizeObserver === 'undefined') return;
    this.resizeObserver = new ResizeObserver(([entry]) => {
      // A signal, because ResizeObserver callbacks run outside change detection
      this.bannerHeight.set(Math.ceil(entry.target.getBoundingClientRect().height));
    });
    this.resizeObserver.observe(el.nativeElement);
  }
  private returnFocus: HTMLElement | null = null;

  choices = { analytics: false, marketing: false };

  categories: { key: 'necessary' | 'analytics' | 'marketing'; title: string; description: string; locked: boolean }[] = [
    { key: 'necessary', title: 'Strictly necessary', locked: true,
      description: 'Needed for the site to work and to remember your cookie choices. These cannot be switched off.' },
    { key: 'analytics', title: 'Analytics', locked: false,
      description: 'Help us understand which pages are visited and how the site performs, using aggregated statistics.' },
    { key: 'marketing', title: 'Marketing', locked: false,
      description: 'Used to measure job and recruitment advertising and to show relevant ads on other sites.' }
  ];

  constructor() {
    // Sync toggles with saved state and manage focus each time the dialog opens.
    effect(() => {
      if (!this.consent.preferencesOpen()) return;
      const saved = this.consent.consent();
      this.choices = { analytics: !!saved?.analytics, marketing: !!saved?.marketing && !this.consent.gpc };
      this.returnFocus = document.activeElement as HTMLElement | null;
      setTimeout(() => this.dialog?.nativeElement.focus());
    });
  }

  openPreferences() {
    this.consent.openPreferences();
  }

  toggle(key: 'necessary' | 'analytics' | 'marketing', value: boolean) {
    if (key !== 'necessary') this.choices[key] = value;
  }

  saveChoices() {
    this.consent.save(this.choices);
    this.restoreFocus();
  }

  rejectAll() {
    this.consent.rejectAll();
    this.restoreFocus();
  }

  close() {
    this.consent.closePreferences();
    this.restoreFocus();
  }

  ngOnDestroy() {
    this.resizeObserver?.disconnect();
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    if (this.consent.preferencesOpen()) this.close();
  }

  private restoreFocus() {
    const el = this.returnFocus;
    this.returnFocus = null;
    if (el && document.contains(el)) setTimeout(() => el.focus());
  }
}
