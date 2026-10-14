import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <a [routerLink]="[]" fragment="main" class="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:bg-white focus:px-4 focus:py-2 focus:rounded">Skip to content</a>
    <header class="fixed top-0 left-0 w-full z-50 bg-white border-b border-line">
      <div class="wrap !max-w-[1360px] h-[76px] flex items-center justify-between gap-6">

        <a routerLink="/" class="flex items-center shrink-0" aria-label="HDDP Consultants home">
          <span class="relative block w-[160px] h-[66px] overflow-hidden"><img alt="HDDP Consultants" class="absolute max-w-none w-[196px] h-[131px] left-[-21px] top-[-28px]" src="assets/MainLogoHDDP.png" /></span>
        </a>

        <nav class="hidden xl:flex items-center gap-5 text-[0.92rem] text-ink" aria-label="Main">
          <a *ngFor="let l of links" [routerLink]="l.path" routerLinkActive="!text-navy font-semibold border-teal" [routerLinkActiveOptions]="{ exact: l.path === '/' }"
             class="py-1 border-b-2 border-transparent hover:text-navy transition-colors whitespace-nowrap">{{ l.label }}</a>
        </nav>

        <div class="flex items-center gap-5 shrink-0">
          <a routerLink="/contact-us" class="btn btn-primary !py-2.5 !px-5 whitespace-nowrap hidden sm:inline-flex xl:hidden min-[1400px]:inline-flex">Schedule a Consultation</a>
          <button type="button" (click)="toggleMobileMenu()" class="xl:hidden p-2 rounded text-navy" [attr.aria-expanded]="isMobileMenuOpen()" aria-label="Menu">
            <span class="material-symbols-outlined text-[28px]" aria-hidden="true">{{ isMobileMenuOpen() ? 'close' : 'menu' }}</span>
          </button>
        </div>
      </div>

      <div *ngIf="isMobileMenuOpen()" class="xl:hidden bg-white border-t border-line">
        <nav class="wrap py-4 flex flex-col" aria-label="Mobile">
          <a *ngFor="let l of links" (click)="closeMobileMenu()" [routerLink]="l.path" routerLinkActive="!text-navy font-semibold" [routerLinkActiveOptions]="{ exact: l.path === '/' }"
             class="py-3 border-b border-line text-ink">{{ l.label }}</a>
          <div class="pt-4 grid gap-2">
            <a routerLink="/contact-us" (click)="closeMobileMenu()" class="btn btn-primary btn-block">Schedule a Consultation</a>
          </div>
        </nav>
      </div>
    </header>
  `
})
export class NavbarComponent {
  isMobileMenuOpen = signal<boolean>(false);

  links = [
    // Page names and order from the approved website copy
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Healthcare Recruitment Support' },
    { path: '/who-we-serve', label: 'Partner With HDDP' },
    { path: '/jobs', label: 'For Candidates' },
    { path: '/how-it-works', label: 'Our Process' },
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
