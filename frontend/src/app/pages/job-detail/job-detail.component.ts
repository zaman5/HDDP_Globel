import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';
import { JobPosition } from '../../models/models';

const ALLOWED_EXTENSIONS = ['.pdf', '.doc', '.docx', '.rtf', '.txt'];
const MAX_FILE_BYTES = 10 * 1024 * 1024;
const JSON_LD_ID = 'job-posting-jsonld';

// Region label and ISO code per supported country
const COUNTRY_INFO: Record<string, { region: string; iso: string }> = {
  'United States': { region: 'State', iso: 'US' },
  'United Kingdom': { region: 'County / Region', iso: 'GB' },
  'Canada': { region: 'Province / Territory', iso: 'CA' }
};

@Component({
  selector: 'app-job-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div *ngIf="loading()" class="wrap band t-body" role="status">Loading job details…</div>

    <div *ngIf="!loading() && !job()" class="wrap band">
      <h1 class="t-h2">This job is no longer available</h1>
      <p class="t-body mt-3">It may have been filled or closed.</p>
      <a routerLink="/candidates" class="btn btn-primary mt-6">See open jobs</a>
    </div>

    <ng-container *ngIf="job() as j">

      <!-- HEADER -->
      <section class="band !pb-10 border-b border-line">
        <div class="wrap">
          <a *ngIf="!applyMode()" routerLink="/candidates" class="link text-sm">All jobs</a>
          <a *ngIf="applyMode()" [routerLink]="['/candidates', j.id]" class="link text-sm">Back to job details</a>
          <p *ngIf="applyMode()" class="t-kicker mt-6 !mb-2">Job application</p>
          <h1 class="t-h1 max-w-[26ch]" [ngClass]="applyMode() ? 'mt-0' : 'mt-4'">{{ j.title }}</h1>
          <dl class="mt-5 flex flex-wrap gap-x-10 gap-y-3 text-[0.95rem]">
            <div><dt class="text-sm text-muted">Location</dt><dd class="m-0 font-semibold">{{ j.location }}, {{ countryOf(j) }}</dd></div>
            <div><dt class="text-sm text-muted">Job type</dt><dd class="m-0 font-semibold">{{ j.job_type }}</dd></div>
            <div *ngIf="j.pay_range"><dt class="text-sm text-muted">Pay</dt><dd class="m-0 font-semibold">{{ j.pay_range }}</dd></div>
          </dl>
          <a *ngIf="!applyMode()" [routerLink]="['/candidates', j.id, 'apply']" class="btn btn-primary mt-8">Apply for this job</a>
        </div>
      </section>

      <!-- DETAILS -->
      <section *ngIf="!applyMode()" class="band">
        <div class="wrap grid gap-12 lg:grid-cols-12">
          <div class="lg:col-span-8">
            <h2 class="t-h2">About the role</h2>
            <p class="t-body mt-4 whitespace-pre-line">{{ j.description || 'Our recruiter will share full details during screening.' }}</p>

            <h2 class="t-h2 mt-12">Requirements</h2>
            <p class="t-body mt-4 whitespace-pre-line">{{ j.requirements || 'Discussed during screening.' }}</p>

            <p class="t-small mt-12 pt-6 border-t border-line">
              This role is with one of our partner healthcare staffing agencies or providers, which makes the final hiring decision.
              Candidates must meet the licensing and work-authorization requirements of the country where the job is based.
              We consider all qualified applicants. <a routerLink="/privacy-policy" fragment="equal-opportunity" class="link">Equal opportunity and accommodations</a>.
            </p>
          </div>

          <aside class="lg:col-span-4" aria-label="Job summary">
            <div class="bg-mist rounded-lg p-6">
              <h2 class="t-h3">Job summary</h2>
              <dl class="mt-4 m-0">
                <div *ngFor="let row of summary(j)" class="py-3 border-t border-line first:border-0 first:pt-0">
                  <dt class="text-sm text-muted">{{ row.label }}</dt>
                  <dd class="m-0 font-semibold text-ink">{{ row.value }}</dd>
                </div>
              </dl>
              <a [routerLink]="['/candidates', j.id, 'apply']" class="btn btn-primary btn-block mt-6">Apply now</a>
              <p class="t-small mt-3 text-center">Takes about 3 minutes. Have your CV ready.</p>
            </div>
          </aside>
        </div>
      </section>

      <!-- APPLICATION FORM -->
      <section *ngIf="applyMode()" id="apply-form" class="band band-mist scroll-mt-24">
        <div class="wrap">
          <div *ngIf="submitted()" class="max-w-2xl bg-white border border-line rounded-lg p-8" role="status">
            <h2 class="t-h2">Application sent</h2>
            <p class="t-body mt-3">Thank you for applying for <strong>{{ j.title }}</strong>. A recruiter will review your profile and contact you by email or phone.</p>
            <a routerLink="/candidates" class="btn btn-outline mt-6">See more jobs</a>
          </div>

          <form *ngIf="!submitted()" (ngSubmit)="submit(j)" class="hd-form max-w-3xl bg-white border border-line rounded-lg p-6 sm:p-10" novalidate>
            <h2 class="t-h2">Your details</h2>
            <p class="t-small mt-1">Fields marked * are required.</p>

            <div class="grid gap-5 sm:grid-cols-2 mt-6">
              <div>
                <label for="ap-first">First name *</label>
                <input id="ap-first" type="text" autocomplete="given-name" [(ngModel)]="form.first_name" name="first_name" required />
              </div>
              <div>
                <label for="ap-last">Last name *</label>
                <input id="ap-last" type="text" autocomplete="family-name" [(ngModel)]="form.last_name" name="last_name" required />
              </div>
              <div>
                <label for="ap-email">Email *</label>
                <input id="ap-email" type="email" autocomplete="email" [(ngModel)]="form.email" name="email" required />
              </div>
              <div>
                <label for="ap-phone">Phone, with country code *</label>
                <input id="ap-phone" type="tel" autocomplete="tel" placeholder="+1 312 555 0100" [(ngModel)]="form.phone" name="phone" required />
              </div>
              <div>
                <label for="ap-country">Country you live in *</label>
                <select id="ap-country" autocomplete="country-name" [(ngModel)]="form.country" name="country" required>
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Canada">Canada</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label for="ap-region">{{ regionLabel(form.country) }}</label>
                <input id="ap-region" type="text" autocomplete="address-level1" [(ngModel)]="form.current_state" name="current_state" />
              </div>
              <div>
                <label for="ap-city">City or town</label>
                <input id="ap-city" type="text" autocomplete="address-level2" [(ngModel)]="form.current_city" name="current_city" />
              </div>
              <div>
                <label for="ap-exp">Years of experience *</label>
                <select id="ap-exp" [(ngModel)]="form.years_experience" name="years_experience">
                  <option value="Less than 1 Year">Less than 1 year</option>
                  <option value="1-2 Years">1–2 years</option>
                  <option value="3-5 Years">3–5 years</option>
                  <option value="6-10 Years">6–10 years</option>
                  <option value="10+ Years">More than 10 years</option>
                </select>
              </div>
            </div>

            <h2 class="t-h3 mt-10 pt-8 border-t border-line">Qualifications</h2>
            <div class="grid gap-5 mt-5">
              <div>
                <label for="ap-license">Licence, registration and certifications</label>
                <input id="ap-license" type="text" [(ngModel)]="form.license_type" name="license_type" placeholder="e.g. RN (Texas), NCLEX-RN, NMC PIN, CNO registration, BLS" />
              </div>
              <div>
                <label for="ap-auth">Are you legally authorized to work in {{ countryWithArticle(j) }}? *</label>
                <select id="ap-auth" [(ngModel)]="form.work_authorization" name="work_authorization" required>
                  <option value="" disabled>Select an answer</option>
                  <option value="Yes">Yes</option>
                  <option value="Yes - requires visa sponsorship">Yes, but I will need visa sponsorship in future</option>
                  <option value="No - requires visa sponsorship">No, I would need visa sponsorship</option>
                </select>
              </div>
              <div>
                <label for="ap-pay">Expected pay, with currency</label>
                <input id="ap-pay" type="text" [(ngModel)]="form.desired_pay" name="desired_pay" placeholder="Optional, e.g. USD 45/hr, GBP 32,000/yr, CAD 40/hr" />
              </div>
            </div>

            <h2 class="t-h3 mt-10 pt-8 border-t border-line">CV and cover note</h2>
            <div class="grid gap-5 mt-5">
              <div>
                <span id="ap-cv-label" class="block text-[0.9rem] font-semibold text-ink mb-1.5">CV / resume *</span>
                <label for="ap-cv" class="plain flex flex-wrap items-center gap-4 p-4 border border-dashed rounded cursor-pointer focus-within:ring-2 focus-within:ring-teal"
                  [ngClass]="fileName() ? 'border-teal bg-[#EEF8F8]' : 'border-[#B8C4CE] bg-mist hover:border-navy'">
                  <span class="btn btn-outline !py-2 !px-4 pointer-events-none">{{ fileName() ? 'Change file' : 'Choose file' }}</span>
                  <span class="text-[0.95rem]" [ngClass]="fileName() ? 'font-semibold text-ink' : 'text-muted'">{{ fileName() || 'PDF, DOC, DOCX, RTF or TXT, up to 10 MB' }}</span>
                  <input id="ap-cv" type="file" class="sr-only" aria-labelledby="ap-cv-label" accept=".pdf,.doc,.docx,.rtf,.txt" (change)="onFileSelected($event)" />
                </label>
                <p class="help">Please leave out your date of birth, photo, ID numbers and health details.</p>
              </div>
              <div>
                <label for="ap-notes">Cover note</label>
                <textarea id="ap-notes" rows="4" [(ngModel)]="form.notes" name="notes" placeholder="Optional. A few lines on why this role suits you."></textarea>
              </div>
            </div>

            <div class="flex items-start gap-3 mt-8 pt-6 border-t border-line">
              <input id="ap-consent" type="checkbox" [(ngModel)]="form.privacy_consent" name="privacy_consent" required class="mt-1 shrink-0" />
              <label for="ap-consent" class="plain text-[0.9rem] leading-relaxed text-muted">
                I have read the <a routerLink="/privacy-policy" target="_blank" class="link">privacy policy</a> and agree that HDDP Consultants may store my application and CV, process it (including by its team outside my country), and share it with partner staffing agencies and healthcare providers for this and similar roles. I can withdraw consent or ask for deletion at any time. *
              </label>
            </div>

            <button type="submit" [disabled]="isSubmitting()" class="btn btn-primary mt-8">
              {{ isSubmitting() ? 'Sending application…' : 'Send application' }}
            </button>
          </form>
        </div>
      </section>

    </ng-container>

`
})
export class JobDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private apiService = inject(ApiService);
  private toastService = inject(ToastService);
  private title = inject(Title);
  private meta = inject(Meta);
  private document = inject(DOCUMENT);

  job = signal<JobPosition | null>(null);
  // true on /candidates/:id/apply (form page), false on /candidates/:id (details page)
  applyMode = signal<boolean>(false);
  loading = signal<boolean>(true);
  isSubmitting = signal<boolean>(false);
  submitted = signal<boolean>(false);
  fileName = signal<string>('');
  private file: File | null = null;

  form = this.emptyForm();

  constructor() {
    inject(DestroyRef).onDestroy(() => this.document.getElementById(JSON_LD_ID)?.remove());
  }

  ngOnInit() {
    this.route.data.subscribe(data => this.applyMode.set(!!data['apply']));
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.loading.set(true);
      this.submitted.set(false);
      this.apiService.getJobById(id).subscribe({
        next: (res) => {
          const job = res.data && res.data.status === 'Open' ? res.data : null;
          this.job.set(job);
          this.loading.set(false);
          if (job) this.applySeo(job);
        },
        error: () => {
          this.job.set(null);
          this.loading.set(false);
        }
      });
    });
  }

  countryOf(j: JobPosition): string {
    return j.country || 'United States';
  }

  countryWithArticle(j: JobPosition): string {
    const country = this.countryOf(j);
    return country.startsWith('United') ? `the ${country}` : country;
  }

  regionLabel(country: string): string {
    return COUNTRY_INFO[country]?.region || 'State / Province / Region';
  }

  summary(j: JobPosition) {
    return [
      { label: 'Job Type', value: j.job_type },
      { label: 'Specialty', value: j.specialty },
      { label: 'Location', value: j.location },
      { label: 'Country', value: this.countryOf(j) },
      { label: 'Shift', value: j.shift },
      { label: 'Experience', value: j.experience_required },
      { label: 'Pay Range', value: j.pay_range }
    ].filter(row => row.value);
  }

  scrollToForm() {
    this.document.getElementById('apply-form')?.scrollIntoView({ behavior: 'smooth' });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    const ext = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      this.toastService.error('Unsupported File', 'Please upload a PDF, DOC, DOCX, RTF or TXT file.');
      input.value = '';
      return;
    }
    if (file.size > MAX_FILE_BYTES) {
      this.toastService.error('File Too Large', 'Your CV must be 10 MB or smaller.');
      input.value = '';
      return;
    }
    this.file = file;
    this.fileName.set(file.name);
  }

  submit(j: JobPosition) {
    const f = this.form;
    if (!f.first_name.trim() || !f.last_name.trim() || !f.email.trim() || !f.phone.trim()) {
      this.toastService.error('Required Fields', 'Please enter your first name, last name, email and phone.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) {
      this.toastService.error('Invalid Email', 'Please enter a valid email address.');
      return;
    }
    if (!f.work_authorization) {
      this.toastService.error('Work Authorization', `Please tell us whether you are authorized to work in ${this.countryWithArticle(j)}.`);
      return;
    }
    if (!this.file) {
      this.toastService.error('CV Required', 'Please upload your CV / resume to apply.');
      return;
    }
    if (!f.privacy_consent) {
      this.toastService.error('Consent Required', 'Please confirm you have read the Privacy Policy and agree to your application being processed.');
      return;
    }

    const data = new FormData();
    data.append('first_name', f.first_name.trim());
    data.append('last_name', f.last_name.trim());
    data.append('email', f.email.trim());
    data.append('phone', f.phone.trim());
    data.append('specialty', j.specialty || j.title);
    data.append('license_type', f.license_type.trim());
    data.append('years_experience', f.years_experience);
    data.append('desired_pay', f.desired_pay.trim());
    data.append('country', f.country);
    data.append('current_city', f.current_city.trim());
    data.append('current_state', f.current_state.trim());
    data.append('work_authorization', f.work_authorization);
    data.append('privacy_consent', 'true');
    data.append('notes', f.notes.trim());
    data.append('job_id', String(j.id));
    data.append('job_title', j.title);
    data.append('resume', this.file, this.file.name);

    this.isSubmitting.set(true);
    this.apiService.submitCandidateApplication(data).subscribe({
      next: () => {
        this.isSubmitting.set(false);
        this.submitted.set(true);
        this.form = this.emptyForm();
        this.file = null;
        this.fileName.set('');
        this.toastService.success('Application sent', 'A recruiter will contact you shortly.');
        this.scrollToForm();
      },
      error: (err) => {
        this.isSubmitting.set(false);
        this.toastService.error('Submission Failed', err?.message || 'Could not submit your application. Please try again.');
      }
    });
  }

  // Page title, meta description and Google for Jobs (JobPosting) structured data
  private applySeo(j: JobPosition) {
    const country = this.countryOf(j);
    const place = `${j.location}, ${country}`;
    this.title.setTitle(`${this.applyMode() ? 'Apply: ' : ''}${j.title} – ${place} | HDDP Consultants`);
    this.meta.updateTag({
      name: 'description',
      content: `${j.title} (${j.job_type}) in ${place}. ${(j.description || '').slice(0, 120)} Apply online with your CV.`
    });

    const city = (j.location || '').split('(')[0].split(',')[0].trim();
    const jsonLd = {
      '@context': 'https://schema.org/',
      '@type': 'JobPosting',
      title: j.title,
      description: `<p>${this.escape(j.description)}</p><p><strong>Requirements:</strong> ${this.escape(j.requirements)}</p>`,
      datePosted: (j.created_at || new Date().toISOString()).slice(0, 10),
      employmentType: this.employmentType(j.job_type),
      hiringOrganization: { '@type': 'Organization', name: 'HDDP Consultants', sameAs: this.document.location.origin },
      jobLocation: {
        '@type': 'Place',
        address: {
          '@type': 'PostalAddress',
          addressLocality: city,
          addressRegion: j.state || undefined,
          addressCountry: COUNTRY_INFO[country]?.iso || country
        }
      },
      occupationalCategory: j.specialty,
      experienceRequirements: j.experience_required,
      directApply: true
    };

    let script = this.document.getElementById(JSON_LD_ID) as HTMLScriptElement | null;
    if (!script) {
      script = this.document.createElement('script');
      script.id = JSON_LD_ID;
      script.type = 'application/ld+json';
      this.document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(jsonLd);
  }

  private employmentType(jobType: string): string[] {
    const t = (jobType || '').toLowerCase();
    if (t.includes('per diem') || t.includes('prn')) return ['PER_DIEM'];
    if (t.includes('contract') || t.includes('travel') || t.includes('locum')) return ['CONTRACTOR', 'TEMPORARY'];
    if (t.includes('part')) return ['PART_TIME'];
    return ['FULL_TIME'];
  }

  private escape(text: string | undefined): string {
    return (text || '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c] as string));
  }

  private emptyForm() {
    return {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      country: 'United States',
      current_city: '',
      current_state: '',
      license_type: '',
      years_experience: '1-2 Years',
      work_authorization: '',
      desired_pay: '',
      notes: '',
      privacy_consent: false
    };
  }
}
