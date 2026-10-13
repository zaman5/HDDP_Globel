import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ModalService } from '../../services/modal.service';
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
            <p class="mt-3 text-[0.95rem] leading-relaxed text-white/75 max-w-sm">
              Global healthcare staffing partner for hospitals and nurse staffing agencies: travel, locum, contract and per diem nurses in the United States, United Kingdom and Canada.
            </p>
            <ul class="mt-5 space-y-2 text-[0.95rem] text-white/75" aria-label="Contact">
              <li><a href="mailto:staffing@hddpconsultants.com" class="hover:text-white [overflow-wrap:anywhere]">staffing&#64;hddpconsultants.com</a></li>
              <li><a href="tel:8005554337" class="hover:text-white">(800) 555-4337</a></li>
              <li><a routerLink="/contact-us" class="hover:text-white">Contact form</a></li>
            </ul>
            <button type="button" (click)="modalService.openRequestTalent()" class="btn btn-light mt-6">Request talent</button>
          </div>

          <div class="lg:col-span-4">
            <p class="font-semibold text-white mb-3">Services</p>
            <ul class="space-y-2 text-[0.95rem] text-white/75">
              <li><a routerLink="/services" fragment="talent-sourcing" class="hover:text-white">Nurse talent sourcing</a></li>
              <li><a routerLink="/services" fragment="rpo" class="hover:text-white">Recruitment process outsourcing</a></li>
              <li><a routerLink="/services" fragment="credentialing" class="hover:text-white">Credentialing and compliance</a></li>
              <li><a routerLink="/services" fragment="back-office" class="hover:text-white">Back-office support</a></li>
              <li><a routerLink="/staffing-agency-consulting" class="hover:text-white">Staffing agency consulting</a></li>
            </ul>
          </div>

          <div class="lg:col-span-4">
            <p class="font-semibold text-white mb-3">Company</p>
            <ul class="space-y-2 text-[0.95rem] text-white/75">
              <li><a routerLink="/who-we-serve" fragment="hospitals" class="hover:text-white">Hospitals and health systems</a></li>
              <li><a routerLink="/who-we-serve" fragment="staffing-agencies" class="hover:text-white">Nurse staffing agencies</a></li>
              <li><a routerLink="/how-it-works" class="hover:text-white">How it works</a></li>
              <li><a routerLink="/about-us" class="hover:text-white">About</a></li>
              <li><a routerLink="/jobs" class="hover:text-white">Find jobs (nurses)</a></li>
            </ul>
          </div>
        </div>

        <div class="mt-14 pt-6 border-t border-white/15 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between text-sm text-white/60">
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
  modalService = inject(ModalService);
  consent = inject(CookieConsentService);
  year = new Date().getFullYear();
}
