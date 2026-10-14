import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';
import { PartnerApplication } from '../../models/models';

@Component({
  selector: 'app-partner-with-us',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <!-- HERO -->
    <section class="band !pb-14">
      <div class="wrap grid gap-12 lg:grid-cols-12 lg:items-center">
        <div class="lg:col-span-7">
          <p class="t-kicker">Partner With HDDP</p>
          <h1 class="t-h1 max-w-[24ch]">An Extension of Your Recruitment Team</h1>
          <p class="t-lede mt-5">Work with HDDP to expand sourcing capacity, improve recruitment coordination, and support your team during periods of high demand.</p>
        </div>
        <div class="lg:col-span-5">
          <div class="photo-frame aspect-[4/3]">
            <img class="photo" src="assets/images/partnership.jpg" width="1400" height="933" fetchpriority="high"
                 alt="Two business partners shaking hands over a laptop" />
          </div>
        </div>
      </div>
    </section>

    <!-- WHO WE PARTNER WITH -->
    <section id="who-we-partner-with" class="band band-mist scroll-mt-20">
      <div class="wrap split">
        <h2 class="t-h2">Who we partner with</h2>
        <p class="t-body m-0">We primarily support established U.S. healthcare staffing agencies and other organizations whose operating model and requirements are compatible with recruitment-only and back-office support services.</p>
      </div>
    </section>

    <!-- PARTNERSHIP MODELS -->
    <section id="partnership-models" class="band scroll-mt-20">
      <div class="wrap split">
        <h2 class="t-h2">Partnership models</h2>
        <ul class="ruled">
          <li *ngFor="let m of models" class="def-row">
            <h3 class="t-h3">{{ m.title }}</h3>
            <p class="t-body m-0">{{ m.text }}</p>
          </li>
        </ul>
      </div>
    </section>

    <!-- WHAT YOU CAN EXPECT / HOW A PARTNERSHIP BEGINS -->
    <section class="band band-mist">
      <div class="wrap grid gap-12 lg:grid-cols-2">
        <div>
          <h2 class="t-h2">What you can expect</h2>
          <ul class="tick-list mt-6">
            <li *ngFor="let e of expect">{{ e }}</li>
          </ul>
        </div>
        <div>
          <h2 class="t-h2">How a partnership begins</h2>
          <ol class="steps mt-6">
            <li *ngFor="let b of begins"><span class="font-semibold text-navy">{{ b }}</span></li>
          </ol>
        </div>
      </div>
    </section>

    <!-- FORM -->
    <section id="partner-form" class="band scroll-mt-24">
      <div class="wrap split">
        <div>
          <h2 class="t-h2">Explore a Partnership</h2>
          <p class="t-small mt-4">We use these details only to respond to you. See our <a routerLink="/privacy-policy" class="link">privacy policy</a>.</p>
        </div>

        <form (ngSubmit)="submitPartner()" class="hd-form bg-white border border-line rounded-lg p-6 sm:p-8 space-y-5" novalidate>
          <div class="grid gap-5 sm:grid-cols-2">
            <div>
              <label for="pt-company">Company name *</label>
              <input id="pt-company" type="text" autocomplete="organization" [(ngModel)]="formData.company_name" name="company_name" required />
            </div>
            <div>
              <label for="pt-name">Your name *</label>
              <input id="pt-name" type="text" autocomplete="name" [(ngModel)]="formData.contact_name" name="contact_name" required />
            </div>
            <div>
              <label for="pt-title">Job title</label>
              <input id="pt-title" type="text" autocomplete="organization-title" [(ngModel)]="formData.job_title" name="job_title" />
            </div>
            <div>
              <label for="pt-email">Work email *</label>
              <input id="pt-email" type="email" autocomplete="email" [(ngModel)]="formData.work_email" name="work_email" required />
            </div>
            <div>
              <label for="pt-phone">Phone (with country code) *</label>
              <input id="pt-phone" type="tel" autocomplete="tel" [(ngModel)]="formData.phone_number" name="phone_number" required />
            </div>
            <div>
              <label for="pt-type">Organization type</label>
              <select id="pt-type" [(ngModel)]="formData.organization_type" name="organization_type">
                <option value="Healthcare Staffing Agency">U.S. healthcare staffing agency</option>
                <option value="Healthcare Provider">Other healthcare hiring organization</option>
              </select>
            </div>
            <div>
              <label for="pt-volume">Monthly hiring volume</label>
              <select id="pt-volume" [(ngModel)]="formData.staffing_volume" name="staffing_volume">
                <option value="1 - 10 Candidates/mo">1–10 candidates a month</option>
                <option value="10 - 50 Candidates/mo">10–50 candidates a month</option>
                <option value="50 - 150 Candidates/mo">50–150 candidates a month</option>
                <option value="150+ Candidates/mo">150+ candidates a month</option>
              </select>
            </div>
          </div>
          <div>
            <label for="pt-roles">Roles you hire for</label>
            <input id="pt-roles" type="text" [(ngModel)]="formData.specialized_units" name="specialized_units" placeholder="e.g. RN, LPN, CNA, radiology technicians" />
          </div>
          <div>
            <label for="pt-msg">Anything else we should know</label>
            <textarea id="pt-msg" rows="4" [(ngModel)]="formData.message" name="message" placeholder="Support you are interested in (sourcing, dedicated recruiters, recruitment operations, documentation workflows) and current hiring priorities"></textarea>
          </div>
          <button type="submit" [disabled]="isSubmitting()" class="btn btn-primary">
            {{ isSubmitting() ? 'Sending…' : 'Explore a Partnership' }}
          </button>
        </form>
      </div>
    </section>
  `
})
export class PartnerWithUsComponent {
  apiService = inject(ApiService);
  toastService = inject(ToastService);

  isSubmitting = signal<boolean>(false);

  models = [
    { title: 'Talent Sourcing Partner', text: 'Share role requirements and candidate criteria with us. We source and screen potential candidates for your team to review and progress through your own hiring process.' },
    { title: 'Dedicated Recruitment Support', text: 'Add one or more recruiters who focus on your agreed roles, pipelines, and recruitment metrics.' },
    { title: 'Recruitment Operations Support', text: 'Delegate defined administrative tasks such as interview coordination, candidate follow-up, requisition updates, and pipeline reporting.' },
    { title: 'Documentation Workflow Support', text: 'Improve visibility over candidate documentation through organized checklists, follow-ups, and status tracking. Formal credentialing and compliance decisions remain with the responsible organization.' }
  ];

  expect = [
    'A clearly defined scope of work and points of contact',
    'Agreed response times and reporting cadence',
    'Candidate summaries aligned with your requirements',
    'Transparent communication about pipeline progress',
    'A flexible model that can scale with demand'
  ];

  begins = [
    'Introductory discussion and needs assessment',
    'Agreement on scope, responsibilities, data handling, and commercial terms',
    'Recruitment workflow and reporting setup',
    'Pilot requisitions or a defined support period',
    'Review of results and adjustment of the engagement'
  ];

  formData: PartnerApplication = this.emptyForm();

  submitPartner() {
    const f = this.formData;
    if (!f.company_name.trim() || !f.contact_name.trim() || !f.work_email.trim() || !f.phone_number.trim()) {
      this.toastService.error('Missing details', 'Please enter your company name, your name, work email and phone.');
      return;
    }

    this.isSubmitting.set(true);
    this.apiService.submitPartnerApplication({
      ...f,
      job_title: f.job_title.trim() || 'Not provided',
      specialized_units: f.specialized_units.trim() || 'Not specified'
    }).subscribe({
      next: () => {
        this.isSubmitting.set(false);
        this.toastService.success('Message sent', 'Your message has been received. A member of our team will review your request and contact you if there is a potential fit.');
        this.formData = this.emptyForm();
      },
      error: (err) => {
        this.isSubmitting.set(false);
        this.toastService.error('Request not sent', err?.message || 'Please try again, or email staffing@hddpconsultants.com.');
      }
    });
  }

  private emptyForm(): PartnerApplication {
    return {
      company_name: '',
      contact_name: '',
      job_title: '',
      work_email: '',
      phone_number: '',
      organization_type: 'Healthcare Staffing Agency',
      staffing_volume: '10 - 50 Candidates/mo',
      specialized_units: '',
      geographic_reach: 'United States',
      message: ''
    };
  }
}
