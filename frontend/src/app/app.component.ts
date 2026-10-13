import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router, RouterOutlet, Scroll } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { RequestTalentModalComponent } from './components/request-talent-modal/request-talent-modal.component';
import { ResumeModalComponent } from './components/resume-modal/resume-modal.component';
import { ToastComponent } from './components/toast/toast.component';
import { CookieBannerComponent } from './components/cookie-banner/cookie-banner.component';
import { ApiService } from './services/api.service';
import { SeoService } from './services/seo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    RequestTalentModalComponent,
    ResumeModalComponent,
    ToastComponent,
    CookieBannerComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  apiService = inject(ApiService);
  private router = inject(Router);
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  constructor() {
    inject(SeoService).init();
    if (!this.isBrowser) return;

    // Jump to #fragment links (e.g. /services#rpo) once the new page has rendered;
    // otherwise restore the position on back/forward, or start at the top.
    history.scrollRestoration = 'manual';
    this.router.events.subscribe(e => {
      if (!(e instanceof Scroll)) return;
      setTimeout(() => {
        const target = e.anchor ? document.getElementById(e.anchor) : null;
        if (target) target.scrollIntoView({ behavior: 'instant' as ScrollBehavior });
        else window.scrollTo({ left: e.position?.[0] ?? 0, top: e.position?.[1] ?? 0, behavior: 'instant' as ScrollBehavior });
      }, 50);
    });
  }

  ngOnInit() {
    if (!this.isBrowser) return;
    // Initial health check ping
    this.apiService.checkHealth().subscribe({
      next: (res) => {
        console.log('[HDDP API Health]', res);
      }
    });
  }
}
