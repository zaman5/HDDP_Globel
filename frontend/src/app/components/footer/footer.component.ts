import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ModalService } from '../../services/modal.service';
import { ToastService } from '../../services/toast.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <footer class="bg-[#0B3C5D] text-white pt-16 pb-12 border-t border-[#213145]">
      <div class="max-w-7xl mx-auto px-6 lg:px-12">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          <!-- Column 1: Brand & Identity -->
          <div class="lg:col-span-2 flex flex-col gap-4">
            <div class="flex items-center gap-3">
              <div class="h-10 w-10 rounded-lg bg-white p-1 flex items-center justify-center">
                <img 
                  alt="HDDP Logo" 
                  class="h-8 w-auto object-contain" 
                  src="assets/MainLogoHDDP.png" 
                  onerror="this.src='https://lh3.googleusercontent.com/aida/AEtjO1VoailF1rysfcvHd9e6Z0GYEd0fhHm6Utm94YfI81BW9KeFfr0ovIvTSA9ki5ZxgGAXsk3Ghy4uWyEgmy7GuBQwO587Q3AG6JSIGO0HxJBo6GusgjikJP5kJt_2VLspl2lpfn5nkMMZrYD9v7OKOnGezwp6gP0OpQ8Xh18b3dju-8ZENyj-kc75zMEsIGZjNKfH6nt8BRX_oCgS7X7UMqqZHAr6Vub-_f-5gV9oqLDb9j9xoP36jz08QPN18wMDd8z_UkgbbwJHeQ'" />
              </div>
              <div>
                <span class="font-heading text-xl font-bold tracking-tight text-white leading-none">HDDP Consultants</span>
                <p class="text-xs text-[#8abcff] mt-0.5">Clinical Trust & Deployment System</p>
              </div>
            </div>

            <p class="text-sm text-slate-300 max-w-sm leading-relaxed mt-2">
              HDDP Consultants is an enterprise clinical recruitment and healthcare staffing engine. Connecting pre-screened nurses and healthcare specialists to hospital networks and staffing agencies across all 50 states.
            </p>

            <div class="flex items-center gap-3 mt-2 text-xs text-slate-300">
              <span class="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full">
                <span class="w-2 h-2 rounded-full bg-[#5FCF80] animate-pulse"></span>
                Joint Commission Aligned
              </span>
              <span class="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full">
                <span class="material-symbols-outlined text-[14px] text-[#86f4f1]">verified</span>
                100% Primary-Source Verified
              </span>
            </div>
          </div>

          <!-- Column 2: Quick Links -->
          <div class="flex flex-col gap-3">
            <h4 class="font-heading text-sm font-bold uppercase tracking-wider text-[#8abcff]">Solutions</h4>
            <ul class="space-y-2 text-sm text-slate-300">
              <li><a routerLink="/healthcare-solutions" class="hover:text-white transition-colors">Travel Nursing</a></li>
              <li><a routerLink="/healthcare-solutions" class="hover:text-white transition-colors">Per Diem Staffing</a></li>
              <li><a routerLink="/healthcare-solutions" class="hover:text-white transition-colors">Allied Health Professionals</a></li>
              <li><a routerLink="/healthcare-solutions" class="hover:text-white transition-colors">Locum Tenens & Physicians</a></li>
              <li><a routerLink="/healthcare-solutions" class="hover:text-white transition-colors">EHR & Informatics Specialists</a></li>
              <li><a routerLink="/healthcare-solutions" class="hover:text-white transition-colors">Crisis & Rapid Deployment</a></li>
            </ul>
          </div>

          <!-- Column 3: Portals & Navigation -->
          <div class="flex flex-col gap-3">
            <h4 class="font-heading text-sm font-bold uppercase tracking-wider text-[#8abcff]">Navigation</h4>
            <ul class="space-y-2 text-sm text-slate-300">
              <li><a routerLink="/" class="hover:text-white transition-colors">Home Overview</a></li>
              <li><a routerLink="/partner-with-us" class="hover:text-white transition-colors">Partner With Us</a></li>
              <li><a routerLink="/candidates" class="hover:text-white transition-colors">Candidate Job Board</a></li>
              <li><a routerLink="/process" class="hover:text-white transition-colors">5-Step Clinical Process</a></li>
              <li><a routerLink="/about-us" class="hover:text-white transition-colors">About HDDP</a></li>
              <li><a routerLink="/contact-us" class="hover:text-white transition-colors">Contact & Support</a></li>
              <li><a routerLink="/admin" class="hover:text-white transition-colors text-amber-300 font-medium flex items-center gap-1"><span class="material-symbols-outlined text-[16px]">admin_panel_settings</span>Admin Dashboard</a></li>
            </ul>
          </div>

          <!-- Column 4: Contact & Newsletter -->
          <div class="flex flex-col gap-3">
            <h4 class="font-heading text-sm font-bold uppercase tracking-wider text-[#8abcff]">Direct Contact</h4>
            <div class="space-y-2 text-sm text-slate-300">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-[18px] text-[#86f4f1]">call</span>
                <span>(800) 555-HDDP (4337)</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-[18px] text-[#86f4f1]">mail</span>
                <span>staffing&#64;hddpconsultants.com</span>
              </div>
              <div class="flex items-start gap-2">
                <span class="material-symbols-outlined text-[18px] text-[#86f4f1] shrink-0 mt-0.5">location_on</span>
                <span>100 Enterprise Parkway, Suite 400<br>Chicago, IL 60601</span>
              </div>
            </div>

            <!-- Urgent Talent Button -->
            <button (click)="modalService.openRequestTalent()" class="mt-3 w-full bg-[#f2a900] hover:bg-amber-400 text-slate-900 font-bold py-2.5 px-4 rounded-lg text-xs uppercase tracking-wider transition-all shadow">
              Urgent Staffing Request
            </button>
          </div>

        </div>

        <!-- Bottom Copyright -->
        <div class="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 HDDP Consultants, LLC. All rights reserved. U.S. National Healthcare Staffing Infrastructure.</p>
          <div class="flex items-center gap-6">
            <a routerLink="/contact-us" class="hover:text-white transition-colors">Privacy Policy</a>
            <a routerLink="/contact-us" class="hover:text-white transition-colors">Terms of Service</a>
            <a routerLink="/contact-us" class="hover:text-white transition-colors">HIPAA Compliance</a>
            <a routerLink="/contact-us" class="hover:text-white transition-colors">Equal Opportunity Employer</a>
          </div>
        </div>

      </div>
    </footer>
  `
})
export class FooterComponent {
  modalService = inject(ModalService);
  toastService = inject(ToastService);
}
