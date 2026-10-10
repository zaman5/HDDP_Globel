import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <footer class="bg-[#082C45] text-white">
      <div class="wrap pt-16 pb-10">
        <div class="grid gap-10 md:grid-cols-12">

          <div class="md:col-span-4">
            <p class="font-heading text-xl font-semibold text-white">HDDP Consultants</p>
            <p class="mt-3 text-[0.95rem] leading-relaxed text-white/75 max-w-sm">
              Recruitment partner to nurse and healthcare staffing agencies in the United States, United Kingdom and Canada.
            </p>
            <button type="button" (click)="modalService.openRequestTalent()" class="btn btn-light mt-6">Request talent</button>
          </div>

          <div class="md:col-span-3">
            <p class="font-semibold text-white mb-3">Services</p>
            <ul class="space-y-2 text-[0.95rem] text-white/75">
              <li><a routerLink="/healthcare-solutions" class="hover:text-white">Healthcare talent sourcing</a></li>
              <li><a routerLink="/healthcare-solutions" class="hover:text-white">Recruitment process outsourcing</a></li>
              <li><a routerLink="/healthcare-solutions" class="hover:text-white">Credentialing support</a></li>
              <li><a routerLink="/healthcare-solutions" class="hover:text-white">Back-office recruitment support</a></li>
            </ul>
          </div>

          <div class="md:col-span-2">
            <p class="font-semibold text-white mb-3">Company</p>
            <ul class="space-y-2 text-[0.95rem] text-white/75">
              <li><a routerLink="/about-us" class="hover:text-white">About</a></li>
              <li><a routerLink="/process" class="hover:text-white">Our process</a></li>
              <li><a routerLink="/partner-with-us" class="hover:text-white">Partner with us</a></li>
              <li><a routerLink="/candidates" class="hover:text-white">Jobs</a></li>
            </ul>
          </div>

          <div class="md:col-span-3">
            <p class="font-semibold text-white mb-3">Contact</p>
            <ul class="space-y-2 text-[0.95rem] text-white/75">
              <li><a href="mailto:staffing@hddpconsultants.com" class="hover:text-white">staffing&#64;hddpconsultants.com</a></li>
              <li><a href="tel:8005554337" class="hover:text-white">(800) 555-4337</a></li>
              <li><a routerLink="/contact-us" class="hover:text-white">Contact form</a></li>
            </ul>
          </div>
        </div>

        <div class="mt-14 pt-6 border-t border-white/15 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between text-sm text-white/60">
          <p>© {{ year }} HDDP Consultants. All rights reserved.</p>
          <div class="flex flex-wrap gap-x-6 gap-y-2">
            <a routerLink="/privacy-policy" class="hover:text-white">Privacy policy</a>
            <a routerLink="/privacy-policy" fragment="us-rights" class="hover:text-white">US privacy rights</a>
            <a routerLink="/privacy-policy" fragment="equal-opportunity" class="hover:text-white">Equal opportunity</a>
          </div>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {
  modalService = inject(ModalService);
  year = new Date().getFullYear();
}
