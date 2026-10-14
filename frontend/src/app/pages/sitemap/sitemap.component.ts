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
        { label: 'Partner With HDDP', path: '/who-we-serve' },
        { label: 'Our Process', path: '/how-it-works' },
        { label: 'About HDDP Consultants', path: '/about-us' },
        { label: 'Contact', path: '/contact-us' }
      ]
    },
    {
      id: 'services', title: 'Healthcare Recruitment Support', path: '/services',
      links: [
        { label: 'Our role', path: '/services', fragment: 'our-role' },
        { label: 'Roles we can help source', path: '/services', fragment: 'roles' },
        { label: 'Flexible engagement models', path: '/services', fragment: 'engagement-models' },
        { label: 'Screening and documentation support', path: '/services', fragment: 'screening' }
      ]
    },
    {
      id: 'who-we-serve', title: 'Partner With HDDP', path: '/who-we-serve',
      links: [
        { label: 'Who we partner with', path: '/who-we-serve', fragment: 'who-we-partner-with' },
        { label: 'Partnership models', path: '/who-we-serve', fragment: 'partnership-models' },
        { label: 'Explore a Partnership', path: '/who-we-serve', fragment: 'partner-form' }
      ]
    },
    {
      id: 'nurses', title: 'For Candidates', path: '/jobs',
      links: [
        { label: 'Open roles', path: '/jobs', fragment: 'open-roles' },
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
