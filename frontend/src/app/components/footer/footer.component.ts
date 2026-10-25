import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CookieConsentService } from '../../services/cookie-consent.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <footer class="bg-[#082C45] text-white">
      <div class="wrap pt-16 pb-10">
        <div class="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">

          <div class="sm:col-span-2 lg:col-span-4">
            <p class="font-heading text-xl font-semibold text-white">HDDP Consultants</p>
            <ul class="mt-5 space-y-2 text-[0.95rem] text-white/75" aria-label="Contact">
              <li><a href="mailto:info@hddpconsultants.com" class="hover:text-white [overflow-wrap:anywhere]">info&#64;hddpconsultants.com</a></li>
              <li><a href="tel:8005554337" class="hover:text-white">(800) 555-4337</a></li>
              <li><a routerLink="/contact-us" class="hover:text-white">Contact form</a></li>
            </ul>
            <a routerLink="/contact-us" class="btn btn-light mt-6">Schedule a Consultation</a>
          </div>

          <div class="lg:col-span-4">
            <p class="font-semibold text-white mb-3">Healthcare Recruitment Support</p>
            <ul class="space-y-2 text-[0.95rem] text-white/75">
              <li><a routerLink="/services" class="hover:text-white">Healthcare Recruitment Support</a></li>
              <li><a routerLink="/services" fragment="roles" class="hover:text-white">Roles we can help source</a></li>
              <li><a routerLink="/services" fragment="engagement-models" class="hover:text-white">Flexible engagement models</a></li>
              <li><a routerLink="/services" fragment="screening" class="hover:text-white">Screening and documentation support</a></li>
            </ul>
          </div>

          <div class="lg:col-span-4">
            <p class="font-semibold text-white mb-3">Pages</p>
            <ul class="space-y-2 text-[0.95rem] text-white/75">
              <li><a routerLink="/" class="hover:text-white">Home</a></li>
              <li><a routerLink="/who-we-serve" class="hover:text-white">Partner With HDDP</a></li>
              <li><a routerLink="/how-it-works" class="hover:text-white">Our Process</a></li>
              <li><a routerLink="/about-us" class="hover:text-white">About HDDP Consultants</a></li>
              <li><a routerLink="/jobs" class="hover:text-white">For Candidates</a></li>
              <li><a routerLink="/contact-us" class="hover:text-white">Contact</a></li>
            </ul>
          </div>
        </div>

        <p class="mt-14 mb-0 text-sm leading-relaxed text-white/60 max-w-[100ch]">HDDP Consultants provides recruitment sourcing and administrative support services to eligible hiring partners. Hiring, employment, professional licensing, credentialing approval, work assignments, supervision, and other regulated decisions remain the responsibility of the applicable hiring organization or authorized provider. Services are subject to applicable law and the scope agreed in writing.</p>

        <div class="mt-8 pt-6 border-t border-white/15 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between text-sm text-white/60">
          <p class="m-0">© {{ year }} HDDP Consultants. All rights reserved.</p>
          <nav class="flex flex-wrap gap-x-6 gap-y-2" aria-label="Legal">
            <a routerLink="/privacy-policy" class="hover:text-white">Privacy &amp; cookies</a>
            <button type="button" (click)="consent.openPreferences()" class="hover:text-white bg-transparent border-0 p-0 cursor-pointer text-white/60">Cookie settings</button>
            <a routerLink="/sitemap" class="hover:text-white">Site map</a>
          </nav>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {
  consent = inject(CookieConsentService);
  year = new Date().getFullYear();
}
