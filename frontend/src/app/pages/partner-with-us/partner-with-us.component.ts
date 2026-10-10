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
      <div class="wrap grid gap-12 lg:grid-cols-12 lg:items-end">
        <div class="lg:col-span-7">
          <p class="t-kicker">Partner with us</p>
          <h1 class="t-h1 max-w-[20ch]">Your recruitment engine for healthcare staffing</h1>
          <p class="t-lede mt-5">Scale faster without increasing internal hiring costs.</p>
          <button type="button" (click)="scrollToForm()" class="btn btn-primary mt-8">Become a partner</button>
        </div>
        <div class="lg:col-span-5 border-l-4 border-teal pl-6">
          <p class="text-lg leading-relaxed text-ink">
            HDDP Consultants works as a strategic recruitment partner to licensed nurse and healthcare staffing agencies in the USA, UK and Canada.
          </p>
          <p class="mt-3 font-semibold text-navy">We strengthen your delivery capability without replacing your core operations.</p>
        </div>
      </div>
    </section>

    <!-- PARTNERSHIP MODELS -->
    <section class="band band-mist">
      <div class="wrap split">
        <div>
          <h2 class="t-h2">Partnership models</h2>
          <p class="t-body mt-4">Offshore recruitment support that plugs into your existing hiring workflow.</p>
        </div>
        <ul class="ruled">
          <li *ngFor="let m of models" class="def-row">
            <h3 class="t-h3">{{ m.title }}</h3>
            <p class="t-body m-0">{{ m.text }}</p>
          </li>
        </ul>
      </div>
    </section>

    <!-- VALUE -->
    <section class="band">
      <div class="wrap split">
        <h2 class="t-h2">What partners gain</h2>
        <ul class="tick-list grid sm:grid-cols-2 gap-x-10 text-lg">
          <li *ngFor="let v of value" class="font-semibold text-navy">{{ v }}</li>
        </ul>
      </div>
    </section>

    <!-- FORM -->
    <section id="partner-form" class="band band-mist scroll-mt-24">
      <div class="wrap split">
        <div>
          <h2 class="t-h2">Start a recruitment partnership</h2>
          <p class="t-body mt-4">Tell us about your agency and hiring needs. Our partnership team will follow up to discuss the right model.</p>
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
                <option value="Healthcare Staffing Agency">Healthcare staffing agency</option>
                <option value="Healthcare Provider">Healthcare provider</option>
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
            <div>
              <label for="pt-reach">Where you place candidates</label>
              <select id="pt-reach" [(ngModel)]="formData.geographic_reach" name="geographic_reach">
                <option value="United States">United States</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Canada">Canada</option>
                <option value="More than one of these countries">More than one of these countries</option>
              </select>
            </div>
          </div>
          <div>
            <label for="pt-roles">Roles you hire for</label>
            <input id="pt-roles" type="text" [(ngModel)]="formData.specialized_units" name="specialized_units" placeholder="e.g. RN, LPN/RPN, CNA/HCA/PSW, radiographers" />
          </div>
          <div>
            <label for="pt-msg">Anything else we should know</label>
            <textarea id="pt-msg" rows="4" [(ngModel)]="formData.message" name="message" placeholder="Preferred model (talent supply, dedicated recruitment team, back-office support) and current hiring needs"></textarea>
          </div>
          <button type="submit" [disabled]="isSubmitting()" class="btn btn-primary">
            {{ isSubmitting() ? 'Sending…' : 'Send partnership request' }}
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
    { title: 'Talent supply model', text: 'Receive pre-screened candidates ready for submission.' },
    { title: 'Dedicated recruitment teams', text: 'Offshore recruiters aligned with your hiring needs.' },
    { title: 'Back-office support', text: 'Credentialing, documentation, and coordination.' }
  ];

  value = ['Faster placements', 'Lower operational cost', 'Increased fill rates', 'Scalable hiring capacity'];

  formData: PartnerApplication = this.emptyForm();

  scrollToForm() {
    document.getElementById('partner-form')?.scrollIntoView({ behavior: 'smooth' });
  }

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
        this.toastService.success('Partnership request sent', 'Our partnership team will contact you shortly.');
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
