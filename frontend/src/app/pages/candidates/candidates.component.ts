import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { ModalService } from '../../services/modal.service';
import { JobPosition } from '../../models/models';

@Component({
  selector: 'app-candidates',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <!-- HERO -->
    <section class="band !pb-12">
      <div class="wrap grid gap-10 lg:grid-cols-12 lg:items-end">
        <div class="lg:col-span-8">
          <p class="t-kicker">Nurse job listings</p>
          <h1 class="t-h1">Travel nurse, locum and per diem nursing jobs</h1>
          <p class="t-lede mt-5">
            Browse travel RN jobs, ICU and ER travel nurse assignments, locum nurse jobs, per diem and contract roles, and allied health jobs across the USA, UK and Canada. Our healthcare job board is updated as partner agencies and hospitals open new roles.
          </p>
        </div>
        <div class="lg:col-span-4 lg:text-right">
          <p class="t-small mb-3">No matching job yet?</p>
          <button type="button" (click)="modalService.openResumeModal()" class="btn btn-outline">Submit your resume</button>
        </div>
      </div>
    </section>

    <!-- OPEN JOBS -->
    <section class="band !pt-0">
      <div class="wrap">
        <div class="hd-form grid gap-4 sm:grid-cols-[1fr_220px] pb-6 border-b border-line">
          <div>
            <label for="job-search">Search jobs</label>
            <input id="job-search" type="search" [(ngModel)]="search" placeholder="Title, specialty or city" />
          </div>
          <div>
            <label for="job-country">Country</label>
            <select id="job-country" [(ngModel)]="country">
              <option value="">All countries</option>
              <option value="United States">United States</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Canada">Canada</option>
            </select>
          </div>
        </div>

        <p class="t-small mt-4" aria-live="polite">
          <ng-container *ngIf="!loading()">{{ filteredJobs().length }} open {{ filteredJobs().length === 1 ? 'job' : 'jobs' }}</ng-container>
          <ng-container *ngIf="loading()">Loading jobs…</ng-container>
        </p>

        <ul *ngIf="!loading() && filteredJobs().length" class="ruled mt-4">
          <li *ngFor="let job of filteredJobs()" class="!p-0">
            <a [routerLink]="['/jobs', job.id]" class="group grid gap-2 py-6 md:grid-cols-12 md:items-center hover:bg-mist -mx-4 px-4 rounded">
              <span class="md:col-span-6">
                <span class="block font-heading font-semibold text-navy text-lg group-hover:underline underline-offset-4 decoration-1">{{ job.title }}</span>
                <span class="block text-sm text-muted mt-1">{{ job.specialty }}</span>
              </span>
              <span class="md:col-span-3 text-[0.95rem] text-ink">
                {{ job.location }}<br class="hidden md:inline"><span class="text-muted"> {{ job.country || 'United States' }}</span>
              </span>
              <span class="md:col-span-2 text-[0.95rem] text-muted">{{ job.job_type }}</span>
              <span class="md:col-span-1 md:text-right text-sm font-semibold text-teal-ink">View job</span>
            </a>
          </li>
        </ul>

        <div *ngIf="!loading() && !filteredJobs().length" class="mt-6 p-8 bg-mist rounded">
          <p class="font-semibold text-navy">No open jobs match your search.</p>
          <p class="t-body mt-1">Clear the filters, or submit your resume and we’ll contact you when a matching role opens.</p>
          <button type="button" (click)="modalService.openResumeModal()" class="btn btn-primary mt-4">Submit your resume</button>
        </div>
      </div>
    </section>

    <!-- ABOUT THE JOB BOARD -->
    <section class="band rule-top">
      <div class="wrap split">
        <h2 class="t-h2">A travel nurse job portal for the USA, UK and Canada</h2>
        <div>
          <p class="t-body m-0">Our healthcare job board brings travel nurse jobs, locum and per diem roles, contract assignments and permanent positions from partner agencies and hospitals into one place. Think of it as a simple nurse job marketplace and locum jobs platform: browse open roles, apply in minutes and a recruiter will call you.</p>
          <p class="t-body mt-4 mb-0">Hiring? Hospitals and staffing agencies can add roles to our healthcare staffing marketplace by sending a requisition. <a routerLink="/contact-us" class="link">Talk to our team</a>.</p>
        </div>
      </div>
    </section>

    <!-- PROCESS -->
    <section class="band band-mist">
      <div class="wrap">
        <h2 class="t-h2 mb-10">How applying works</h2>
        <ol class="steps steps-row">
          <li *ngFor="let step of steps"><span class="font-semibold text-navy">{{ step }}</span></li>
        </ol>
        <p class="t-small mt-8">Placements are made through our partner network of healthcare staffing agencies and providers. The agency or employer makes the final hiring decision.</p>
      </div>
    </section>
  `
})
export class CandidatesComponent implements OnInit {
  apiService = inject(ApiService);
  modalService = inject(ModalService);

  jobs = signal<JobPosition[]>([]);
  loading = signal<boolean>(true);
  searchTerm = signal<string>('');
  countryFilter = signal<string>('');

  get search() { return this.searchTerm(); }
  set search(value: string) { this.searchTerm.set(value); }

  get country() { return this.countryFilter(); }
  set country(value: string) { this.countryFilter.set(value); }

  filteredJobs = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    const country = this.countryFilter();
    return this.jobs().filter(j =>
      (!country || (j.country || 'United States') === country) &&
      (!term || [j.title, j.specialty, j.location, j.department, j.job_type]
        .some(field => (field || '').toLowerCase().includes(term)))
    );
  });

  ngOnInit() {
    this.apiService.getJobs({}).subscribe(res => {
      this.jobs.set(res.data || []);
      this.loading.set(false);
    });
  }

  steps = [
    'Submit your profile',
    'Screening',
    'Matching',
    'Interview',
    'Placement through a partner agency'
  ];
}
