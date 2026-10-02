import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <header class="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-xl border-b border-[#E2E8F0] shadow-[0_1px_8px_rgba(11,60,93,0.06)]">
      <div class="h-24 sm:h-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between gap-4">
        
        <!-- Brand Logo -->
        <a routerLink="/" class="flex items-center shrink-0 group py-2">
          <img 
            alt="HDDP Consultants" 
            class="h-20 sm:h-24 w-auto max-h-24 object-contain transition-transform group-hover:scale-105" 
            src="assets/MainLogoHDDP.png"
            onerror="this.src='https://lh3.googleusercontent.com/aida/AEtjO1VoailF1rysfcvHd9e6Z0GYEd0fhHm6Utm94YfI81BW9KeFfr0ovIvTSA9ki5ZxgGAXsk3Ghy4uWyEgmy7GuBQwO587Q3AG6JSIGO0HxJBo6GusgjikJP5kJt_2VLspl2lpfn5nkMMZrYD9v7OKOnGezwp6gP0OpQ8Xh18b3dju-8ZENyj-kc75zMEsIGZjNKfH6nt8BRX_oCgS7X7UMqqZHAr6Vub-_f-5gV9oqLDb9j9xoP36jz08QPN18wMDd8z_UkgbbwJHeQ'" />
        </a>

        <!-- Desktop Navigation Links -->
        <nav class="hidden xl:flex items-center gap-6 text-[15px] font-medium text-[#424750]">
          <a routerLink="/healthcare-solutions" routerLinkActive="text-[#004b87] font-bold underline decoration-2 underline-offset-8" class="hover:text-[#004b87] transition-colors py-2">Healthcare Solutions</a>
          <a routerLink="/partner-with-us" routerLinkActive="text-[#004b87] font-bold underline decoration-2 underline-offset-8" class="hover:text-[#004b87] transition-colors py-2">Partner With Us</a>
          <a routerLink="/process" routerLinkActive="text-[#004b87] font-bold underline decoration-2 underline-offset-8" class="hover:text-[#004b87] transition-colors py-2">Process</a>
          <a routerLink="/about-us" routerLinkActive="text-[#004b87] font-bold underline decoration-2 underline-offset-8" class="hover:text-[#004b87] transition-colors py-2">About Us</a>
          <a routerLink="/contact-us" routerLinkActive="text-[#004b87] font-bold underline decoration-2 underline-offset-8" class="hover:text-[#004b87] transition-colors py-2">Contact Us</a>
          <a routerLink="/candidates" routerLinkActive="text-[#004b87] font-bold underline decoration-2 underline-offset-8" class="hover:text-[#004b87] transition-colors py-2">Careers</a>
        </nav>

        <!-- Right Action CTAs -->
        <div class="flex items-center gap-3 shrink-0">
          <button (click)="modalService.openRequestTalent()" class="inline-flex items-center gap-1.5 justify-center text-sm font-semibold bg-[#004b87] hover:bg-[#0B3C5D] text-white px-5 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all">
            <span>Request Talent</span>
            <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>

          <!-- Mobile Hamburger Menu Button -->
          <button (click)="toggleMobileMenu()" class="xl:hidden p-2 rounded-lg text-[#003461] hover:bg-[#eff4ff]">
            <span class="material-symbols-outlined text-[28px]">{{ isMobileMenuOpen() ? 'close' : 'menu' }}</span>
          </button>
        </div>

      </div>

      <!-- Mobile Dropdown Navigation Drawer -->
      <div *ngIf="isMobileMenuOpen()" class="xl:hidden bg-white border-b border-[#E2E8F0] px-6 py-5 flex flex-col gap-3 shadow-lg animate-fade-in">
        <a (click)="closeMobileMenu()" routerLink="/healthcare-solutions" routerLinkActive="text-[#004b87] font-bold bg-[#eff4ff]" class="px-3 py-2.5 rounded-lg text-base font-medium text-[#424750]">Healthcare Solutions</a>
        <a (click)="closeMobileMenu()" routerLink="/partner-with-us" routerLinkActive="text-[#004b87] font-bold bg-[#eff4ff]" class="px-3 py-2.5 rounded-lg text-base font-medium text-[#424750]">Partner With Us</a>
        <a (click)="closeMobileMenu()" routerLink="/process" routerLinkActive="text-[#004b87] font-bold bg-[#eff4ff]" class="px-3 py-2.5 rounded-lg text-base font-medium text-[#424750]">Our Process</a>
        <a (click)="closeMobileMenu()" routerLink="/about-us" routerLinkActive="text-[#004b87] font-bold bg-[#eff4ff]" class="px-3 py-2.5 rounded-lg text-base font-medium text-[#424750]">About Us</a>
        <a (click)="closeMobileMenu()" routerLink="/contact-us" routerLinkActive="text-[#004b87] font-bold bg-[#eff4ff]" class="px-3 py-2.5 rounded-lg text-base font-medium text-[#424750]">Contact Us</a>
        <a (click)="closeMobileMenu()" routerLink="/candidates" routerLinkActive="text-[#004b87] font-bold bg-[#eff4ff]" class="px-3 py-2.5 rounded-lg text-base font-medium text-[#424750]">Careers</a>
        
        <div class="pt-3 border-t border-slate-100 flex flex-col gap-2">
          <button (click)="modalService.openRequestTalent(); closeMobileMenu()" class="w-full text-center font-semibold bg-[#004b87] text-white py-3 rounded-lg shadow-sm">
            Request Talent
          </button>
          <button (click)="modalService.openResumeModal(); closeMobileMenu()" class="w-full text-center font-semibold bg-[#eff4ff] text-[#004b87] py-3 rounded-lg border border-[#004b87]/30">
            Submit Resume
          </button>
        </div>
      </div>
    </header>
  `
})
export class NavbarComponent {
  modalService = inject(ModalService);
  isMobileMenuOpen = signal<boolean>(false);

  toggleMobileMenu() {
    this.isMobileMenuOpen.update(v => !v);
  }

  closeMobileMenu() {
    this.isMobileMenuOpen.set(false);
  }
}
