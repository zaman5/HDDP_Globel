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
      <div class="wrap grid gap-12 lg:grid-cols-12 lg:items-center">
        <div class="lg:col-span-7">
          <p class="t-kicker">For Candidates</p>
          <h1 class="t-h1">Explore Healthcare Career Opportunities</h1>
          <p class="t-lede mt-5">HDDP helps candidates connect with potential opportunities shared by independent hiring partners in our recruitment network.</p>
        </div>
        <div class="lg:col-span-5">
          <div class="photo-frame aspect-[4/3] lg:aspect-square">
            <img class="photo" src="assets/images/candidate.jpg" width="1400" height="1469" fetchpriority="high"
                 alt="Smiling healthcare professional holding a stethoscope" />
          </div>
        </div>
      </div>
    </section>

    <!-- HOW THE PROCESS WORKS -->
    <section class="band band-mist">
      <div class="wrap">
        <h2 class="t-h2 mb-10">How the process works</h2>
        <ol class="steps md:grid-cols-2 lg:grid-cols-4 md:grid">
          <li *ngFor="let step of steps"><span class="font-semibold text-navy">{{ step }}</span></li>
        </ol>
      </div>
    </section>

    <!-- CANDIDATE EXPERIENCE -->
    <section class="band">
      <div class="wrap split">
        <h2 class="t-h2">A clear, respectful candidate experience</h2>
        <div>
          <p class="t-body m-0">We aim to communicate clearly, handle candidate information responsibly, and help candidates understand the next steps. Submission of a resume does not guarantee an interview, job offer, placement, or specific work assignment.</p>
          <p class="notice t-small mt-6 mb-0"><strong class="text-navy">Candidate notice:</strong> HDDP is a recruitment-support partner. Unless expressly stated in a separate written agreement, HDDP is not the employer of record, does not assign clinical shifts, and does not make the hiring partner’s employment or credentialing decisions.</p>
          <button type="button" (click)="modalService.openResumeModal()" class="btn btn-primary mt-6">Submit Your Resume</button>
        </div>
      </div>
    </section>

    <!-- OPEN JOBS -->
    <section id="open-roles" class="band rule-top scroll-mt-20">
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
          <ng-container *ngIf="!loading() && !loadError()">{{ filteredJobs().length }} open {{ filteredJobs().length === 1 ? 'job' : 'jobs' }}</ng-container>
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

        <div *ngIf="loadError()" class="mt-6 p-8 bg-mist rounded" role="alert">
          <p class="font-semibold text-navy m-0">We couldn’t load jobs right now.</p>
          <p class="t-body mt-2 mb-4">Please try again, or submit your resume and share your preferred role or location.</p>
          <button type="button" (click)="loadJobs()" class="btn btn-outline">Try again</button>
        </div>
        <div *ngIf="!loading() && !loadError() && !filteredJobs().length" class="mt-6 p-8 bg-mist rounded">
          <p class="font-semibold text-navy">No open jobs match your search.</p>
          <p class="t-body mt-1">Clear the filters, or submit your resume and share your preferred role or location.</p>
          <button type="button" (click)="modalService.openResumeModal()" class="btn btn-primary mt-4">Submit Your Resume</button>
        </div>
      </div>
    </section>

  `
})
export class CandidatesComponent implements OnInit {
  apiService = inject(ApiService);
  modalService = inject(ModalService);

  jobs = signal<JobPosition[]>([]);
  loading = signal<boolean>(true);
  loadError = signal<boolean>(false);
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
    this.loadJobs();
  }

  loadJobs() {
    this.loading.set(true);
    this.loadError.set(false);
    this.apiService.getJobs({}).subscribe({
      next: res => {
        this.jobs.set(res.data || []);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.loadError.set(true);
      }
    });
  }

  steps = [
    'Share your resume and preferred role or location.',
    'Our team may contact you to clarify your experience and job preferences.',
    'With your permission, relevant information may be shared with a suitable hiring partner.',
    'The hiring partner determines whether to proceed with interviews, credential checks, and its own hiring process.'
  ];
}
