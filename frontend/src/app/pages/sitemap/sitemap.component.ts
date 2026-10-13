import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { JobPosition } from '../../models/models';

interface SitemapLink {
  label: string;
  path: string;
  fragment?: string;
}

// Human-readable site map. Search engines use /sitemap.xml; keep both in step when pages change.
@Component({
  selector: 'app-sitemap',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="band !pb-12 band-mist border-b border-line">
      <div class="wrap">
        <h1 class="t-h1">Site map</h1>
        <p class="t-lede mt-4">Every page on the HDDP Consultants website, in one place.</p>
      </div>
    </section>

    <section class="band-tight">
      <div class="wrap grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
        <nav *ngFor="let g of groups" [attr.aria-labelledby]="'sm-' + g.id">
          <h2 [id]="'sm-' + g.id" class="t-h3 pb-3 border-b-2 border-teal">
            <a [routerLink]="g.path" class="hover:underline underline-offset-4 decoration-1">{{ g.title }}</a>
          </h2>
          <ul class="list-none m-0 p-0 mt-3">
            <li *ngFor="let l of g.links" class="py-2 border-b border-line">
              <a [routerLink]="l.path" [fragment]="l.fragment" class="link !font-normal">{{ l.label }}</a>
            </li>
          </ul>
        </nav>

        <nav aria-labelledby="sm-jobs" class="sm:col-span-2 lg:col-span-3">
          <h2 id="sm-jobs" class="t-h3 pb-3 border-b-2 border-teal">
            <a routerLink="/jobs" class="hover:underline underline-offset-4 decoration-1">Open jobs</a>
          </h2>
          <p *ngIf="loadingJobs()" class="t-small mt-3" role="status">Loading jobs…</p>
          <p *ngIf="!loadingJobs() && !jobs().length" class="t-small mt-3">No open jobs right now. <a routerLink="/jobs" class="link">See the jobs page</a>.</p>
          <ul *ngIf="jobs().length" class="list-none m-0 p-0 mt-3 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
            <li *ngFor="let j of jobs()" class="py-2 border-b border-line">
              <a [routerLink]="['/jobs', j.id]" class="link !font-normal">{{ j.title }}</a>
              <span class="block text-sm text-muted">{{ j.location }}</span>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  `
})
export class SitemapComponent implements OnInit {
  private api = inject(ApiService);

  jobs = signal<JobPosition[]>([]);
  loadingJobs = signal(true);

  groups: { id: string; title: string; path: string; links: SitemapLink[] }[] = [
    {
      id: 'home', title: 'Home', path: '/',
      links: [
        { label: 'Who we serve', path: '/who-we-serve' },
        { label: 'How it works', path: '/how-it-works' },
        { label: 'About us', path: '/about-us' },
        { label: 'Contact us', path: '/contact-us' }
      ]
    },
    {
      id: 'services', title: 'Services', path: '/services',
      links: [
        { label: 'Nurse and healthcare talent sourcing', path: '/services', fragment: 'talent-sourcing' },
        { label: 'Recruitment process outsourcing (RPO)', path: '/services', fragment: 'rpo' },
        { label: 'Credentialing and compliance support', path: '/services', fragment: 'credentialing' },
        { label: 'Back-office recruitment support', path: '/services', fragment: 'back-office' },
        { label: 'Roles, specialties and assignment types', path: '/services', fragment: 'roles' },
        { label: 'Engagement models', path: '/services', fragment: 'pricing' },
        { label: 'Healthcare staffing consulting', path: '/staffing-agency-consulting' },
        { label: 'How to start a nurse staffing agency', path: '/staffing-agency-consulting', fragment: 'startup-guide' }
      ]
    },
    {
      id: 'who-we-serve', title: 'Who we serve', path: '/who-we-serve',
      links: [
        { label: 'Nurse staffing agencies', path: '/who-we-serve', fragment: 'staffing-agencies' },
        { label: 'Hospitals and health systems', path: '/who-we-serve', fragment: 'hospitals' },
        { label: 'New and growing staffing agencies', path: '/who-we-serve', fragment: 'new-agencies' }
      ]
    },
    {
      id: 'how-it-works', title: 'How it works', path: '/how-it-works',
      links: [
        { label: 'Submittal packet', path: '/how-it-works', fragment: 'submittal-packet' },
        { label: 'US credentialing and compliance standards', path: '/how-it-works', fragment: 'compliance' }
      ]
    },
    {
      id: 'nurses', title: 'For nurses', path: '/jobs',
      links: [
        { label: 'Find jobs', path: '/jobs' },
        { label: 'Equal opportunity and accommodations', path: '/privacy-policy', fragment: 'equal-opportunity' },
        { label: 'Recruitment scam warning', path: '/privacy-policy', fragment: 'recruitment-fraud' }
      ]
    },
    {
      id: 'legal', title: 'Legal', path: '/privacy-policy',
      links: [
        { label: 'Privacy policy', path: '/privacy-policy' },
        { label: 'US privacy rights', path: '/privacy-policy', fragment: 'us-rights' },
        { label: 'UK privacy rights', path: '/privacy-policy', fragment: 'uk-rights' },
        { label: 'Canada privacy rights', path: '/privacy-policy', fragment: 'canada-rights' },
        { label: 'Cookie policy', path: '/cookie-policy' }
      ]
    }
  ];

  ngOnInit() {
    this.api.getJobs({}).subscribe({
      next: res => {
        this.jobs.set(res.data || []);
        this.loadingJobs.set(false);
      },
      error: () => this.loadingJobs.set(false)
    });
  }
}
