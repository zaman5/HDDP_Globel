import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <a [routerLink]="[]" fragment="main" class="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:bg-white focus:px-4 focus:py-2 focus:rounded">Skip to content</a>
    <header class="fixed top-0 left-0 w-full z-50 bg-white border-b border-line">
      <div class="wrap h-[76px] flex items-center justify-between gap-6">

        <a routerLink="/" class="flex items-center shrink-0" aria-label="HDDP Consultants home">
          <span class="relative block w-[160px] h-[66px] overflow-hidden"><img alt="HDDP Consultants" class="absolute max-w-none w-[196px] h-[131px] left-[-21px] top-[-28px]" src="assets/MainLogoHDDP.png" /></span>
        </a>

        <nav class="hidden lg:flex items-center gap-7 text-[0.95rem] text-ink" aria-label="Main">
          <a *ngFor="let l of links" [routerLink]="l.path" routerLinkActive="!text-navy font-semibold border-teal"
             class="py-1 border-b-2 border-transparent hover:text-navy transition-colors">{{ l.label }}</a>
        </nav>

        <div class="flex items-center gap-3 shrink-0">
          <button type="button" (click)="modalService.openRequestTalent()" class="btn btn-primary !py-2.5 !px-5 hidden sm:inline-flex">Request talent</button>
          <button type="button" (click)="toggleMobileMenu()" class="lg:hidden p-2 rounded text-navy" [attr.aria-expanded]="isMobileMenuOpen()" aria-label="Menu">
            <span class="material-symbols-outlined text-[28px]" aria-hidden="true">{{ isMobileMenuOpen() ? 'close' : 'menu' }}</span>
          </button>
        </div>
      </div>

      <div *ngIf="isMobileMenuOpen()" class="lg:hidden bg-white border-t border-line">
        <nav class="wrap py-4 flex flex-col" aria-label="Mobile">
          <a *ngFor="let l of links" (click)="closeMobileMenu()" [routerLink]="l.path" routerLinkActive="!text-navy font-semibold"
             class="py-3 border-b border-line text-ink">{{ l.label }}</a>
          <div class="pt-4 grid gap-2">
            <button type="button" (click)="modalService.openRequestTalent(); closeMobileMenu()" class="btn btn-primary btn-block">Request talent</button>
            <button type="button" (click)="modalService.openResumeModal(); closeMobileMenu()" class="btn btn-outline btn-block">Submit your resume</button>
          </div>
        </nav>
      </div>
    </header>
  `
})
export class NavbarComponent {
  modalService = inject(ModalService);
  isMobileMenuOpen = signal<boolean>(false);

  links = [
    { path: '/healthcare-solutions', label: 'Solutions' },
    { path: '/partner-with-us', label: 'Partner with us' },
    { path: '/process', label: 'Process' },
    { path: '/candidates', label: 'Jobs' },
    { path: '/about-us', label: 'About' },
    { path: '/contact-us', label: 'Contact' }
  ];

  toggleMobileMenu() {
    this.isMobileMenuOpen.update(v => !v);
  }

  closeMobileMenu() {
    this.isMobileMenuOpen.set(false);
  }
}
