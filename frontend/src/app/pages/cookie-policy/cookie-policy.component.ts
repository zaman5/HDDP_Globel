import { Component, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LEGAL } from '../../legal.config';
import { CookieConsentService } from '../../services/cookie-consent.service';

@Component({
  selector: 'app-cookie-policy',
  standalone: true,
  imports: [CommonModule, RouterLink, DatePipe],
  template: `
    <section class="band !pb-12 band-mist border-b border-line">
      <div class="wrap">
        <p class="t-kicker">Legal</p>
        <h1 class="t-h1">Cookie policy</h1>
        <p class="t-lede mt-4">What cookies and similar technologies this website uses, why, and how you control them.</p>
        <p class="t-small mt-4">Last updated: {{ L.lastUpdated }}</p>
      </div>
    </section>

    <section class="band-tight">
      <div class="wrap">
        <article class="legal max-w-3xl">

          <div class="rounded-lg border border-line p-6 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
            <div>
              <p class="font-semibold text-navy m-0">Your current choice</p>
              <p class="t-small m-0 mt-1" *ngIf="consent.consent() as c; else noChoice">
                Analytics: <strong>{{ c.analytics ? 'on' : 'off' }}</strong> · Marketing: <strong>{{ c.marketing ? 'on' : 'off' }}</strong>
                · saved {{ c.updatedAt | date:'mediumDate' }}
              </p>
              <ng-template #noChoice><p class="t-small m-0 mt-1">You haven’t made a choice yet. Optional cookies are off.</p></ng-template>
            </div>
            <button type="button" class="btn btn-primary shrink-0" (click)="consent.openPreferences()">Change cookie settings</button>
          </div>

          <h2 id="what-are-cookies">1. What cookies are</h2>
          <p>Cookies are small text files a website stores in your browser. Similar technologies include local storage, pixels and scripts that read information from your device. In this policy we call them all “cookies”.</p>
          <p>“First-party” cookies are set by this site. “Third-party” cookies are set by another company’s service used on this site.</p>

          <h2 id="how-we-use">2. How we use cookies</h2>
          <p>We keep cookies to a minimum. Today this site sets <strong>only one strictly necessary cookie</strong>, which remembers your cookie choices. We do not currently use analytics or advertising cookies. If we add them, they will only load after you switch them on, and we will update the table below.</p>

          <div class="table-wrap">
            <table>
              <caption class="sr-only">Cookies used on this website</caption>
              <thead>
                <tr><th scope="col">Name</th><th scope="col">Category</th><th scope="col">Set by</th><th scope="col">Purpose</th><th scope="col">Expires</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>hddp_consent</code></td>
                  <td>Strictly necessary</td>
                  <td>{{ L.brand }} (first party)</td>
                  <td>Stores your cookie choices so we don’t ask again on every page.</td>
                  <td>6 months</td>
                </tr>
                <tr>
                  <td colspan="5" class="text-muted">Analytics cookies: none in use.</td>
                </tr>
                <tr>
                  <td colspan="5" class="text-muted">Marketing cookies: none in use.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 id="categories">3. Cookie categories</h2>
          <dl class="m-0">
            <div class="py-4 border-t border-line">
              <dt class="font-semibold text-navy">Strictly necessary (always on)</dt>
              <dd class="m-0 mt-1">Needed for the site to work, keep it secure and remember your privacy choices. The law allows these without consent.</dd>
            </div>
            <div class="py-4 border-t border-line">
              <dt class="font-semibold text-navy">Analytics (off unless you turn them on)</dt>
              <dd class="m-0 mt-1">Count visits and show which pages are useful so we can improve the site. Results are aggregated.</dd>
            </div>
            <div class="py-4 border-t border-b border-line">
              <dt class="font-semibold text-navy">Marketing (off unless you turn them on)</dt>
              <dd class="m-0 mt-1">Measure our job and recruitment advertising and show relevant ads elsewhere. Under some US state laws this may count as “sharing” for targeted advertising.</dd>
            </div>
          </dl>

          <h2 id="third-parties">4. Third-party services that don’t set cookies</h2>
          <p>To display the site, your browser downloads fonts, icons and styles from these providers. They receive your IP address and browser details like any web request, but do not set cookies for us:</p>
          <ul>
            <li><strong>Google Fonts</strong> (fonts and icons): <a href="https://policies.google.com/privacy" target="_blank" rel="noopener" class="link">Google privacy policy</a></li>
            <li><strong>Tailwind CSS CDN</strong> (page styles), served from cdn.tailwindcss.com</li>
          </ul>

          <h2 id="manage">5. How to control cookies</h2>
          <ul>
            <li><strong>On this site:</strong> use <button type="button" class="link bg-transparent border-0 p-0 cursor-pointer" (click)="consent.openPreferences()">Cookie settings</button> (also in the footer) to accept, refuse or withdraw consent at any time. Withdrawing is as easy as giving consent.</li>
            <li><strong>Global Privacy Control:</strong> if your browser sends a GPC signal, we treat it as an opt-out of marketing cookies and of any sale or sharing of personal information.{{ consent.gpc ? ' Your browser is sending this signal now.' : '' }}</li>
            <li><strong>In your browser:</strong> you can block or delete cookies in your browser settings. See help for
              <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener" class="link">Chrome</a>,
              <a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener" class="link">Safari</a>,
              <a href="https://support.mozilla.org/kb/clear-cookies-and-site-data-firefox" target="_blank" rel="noopener" class="link">Firefox</a> and
              <a href="https://support.microsoft.com/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener" class="link">Edge</a>.
              Blocking strictly necessary cookies means we can’t remember your choices.</li>
          </ul>

          <h2 id="laws">6. The laws we follow</h2>
          <ul>
            <li><strong>United Kingdom:</strong> the Privacy and Electronic Communications Regulations (PECR) and UK GDPR. Non-essential cookies need your prior consent.</li>
            <li><strong>Canada:</strong> PIPEDA and Quebec’s Law 25. Tracking technologies are off by default and need your consent.</li>
            <li><strong>United States:</strong> state privacy laws such as the CCPA/CPRA. You can opt out of the sale or sharing of personal information, including through GPC.</li>
          </ul>

          <h2 id="changes">7. Changes and contact</h2>
          <p>We will update this policy and the date above if we change the cookies we use, and ask for your consent again where needed. For how we handle personal information more generally, see our <a routerLink="/privacy-policy" class="link">privacy policy</a>. Questions: <a [href]="'mailto:' + L.privacyEmail" class="link">{{ L.privacyEmail }}</a>.</p>

        </article>
      </div>
    </section>
  `
})
export class CookiePolicyComponent {
  consent = inject(CookieConsentService);
  L = LEGAL;
}
