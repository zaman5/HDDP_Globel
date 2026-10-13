import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';
import { ModalService } from '../../services/modal.service';
import { PartnerApplication } from '../../models/models';

@Component({
  selector: 'app-partner-with-us',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <!-- HERO -->
    <section class="band !pb-14">
      <div class="wrap">
        <p class="t-kicker">Who we serve</p>
        <h1 class="t-h1 max-w-[24ch]">Nurse staffing solutions for hospitals and staffing agencies</h1>
        <p class="t-lede mt-5">A healthcare staffing partner that adds recruiting and compliance capacity behind your team. We never contact your clients or place candidates with them directly.</p>
        <nav aria-label="Audiences" class="mt-8 flex flex-wrap gap-2">
          <a *ngFor="let a of audiences" [routerLink]="[]" [fragment]="a.id" class="px-4 py-2 rounded-full border border-line text-sm font-semibold text-navy hover:border-navy">{{ a.title }}</a>
        </nav>
      </div>
    </section>

    <!-- AUDIENCES -->
    <section *ngFor="let a of audiences; let odd = odd" [id]="a.id" class="band scroll-mt-20" [class.band-mist]="!odd">
      <div class="wrap split">
        <div>
          <h2 class="t-h2">{{ a.title }}</h2>
          <p class="t-body mt-4">{{ a.intro }}</p>
        </div>
        <div class="grid gap-10 sm:grid-cols-2">
          <div>
            <p class="font-semibold text-navy mb-3">Common challenges</p>
            <ul class="list-disc pl-5 m-0 space-y-2 text-muted">
              <li *ngFor="let c of a.challenges">{{ c }}</li>
            </ul>
          </div>
          <div>
            <p class="font-semibold text-navy mb-3">How we help</p>
            <ul class="tick-list">
              <li *ngFor="let h of a.help">{{ h }}</li>
            </ul>
            <a [routerLink]="a.servicePath" [fragment]="a.service" class="link inline-block mt-4">{{ a.serviceLabel }}</a>
          </div>
        </div>
      </div>
    </section>

    <!-- RESULTS -->
    <section class="band" [class.band-mist]="audiences.length % 2 === 0">
      <div class="wrap split">
        <h2 class="t-h2">What clients gain</h2>
        <ul class="ruled">
          <li *ngFor="let v of value" class="def-row">
            <h3 class="t-h3">{{ v.title }}</h3>
            <p class="t-body m-0">{{ v.text }}</p>
          </li>
        </ul>
      </div>
    </section>

    <!-- FORM -->
    <section id="partner-form" class="band band-mist scroll-mt-24">
      <div class="wrap split">
        <div>
          <h2 class="t-h2">Talk to our team</h2>
          <p class="t-body mt-4">Tell us about your organization and hiring needs. We reply within one business day to discuss the right service and model.</p>
          <p class="t-body mt-3">Need candidates for specific open roles now? <button type="button" (click)="modalService.openRequestTalent()" class="link bg-transparent border-0 p-0 cursor-pointer">Request talent</button> instead.</p>
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
                <option value="Healthcare Staffing Agency">Nurse / healthcare staffing agency</option>
                <option value="Hospital or Health System">Hospital or health system</option>
                <option value="Long-Term Care / Post-Acute">Long-term care / post-acute provider</option>
                <option value="MSP / VMS Provider">MSP / VMS provider</option>
                <option value="Healthcare Provider">Other healthcare provider</option>
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
            <textarea id="pt-msg" rows="4" [(ngModel)]="formData.message" name="message" placeholder="Services you are interested in (sourcing, RPO, credentialing, back-office) and current hiring needs"></textarea>
          </div>
          <button type="submit" [disabled]="isSubmitting()" class="btn btn-primary">
            {{ isSubmitting() ? 'Sending…' : 'Send message' }}
          </button>
        </form>
      </div>
    </section>
  `
})
export class PartnerWithUsComponent {
  apiService = inject(ApiService);
  toastService = inject(ToastService);
  modalService = inject(ModalService);

  isSubmitting = signal<boolean>(false);

  audiences = [
    {
      id: 'staffing-agencies',
      title: 'Nurse staffing agencies',
      intro: 'Travel nurse staffing agencies and locum, per diem and permanent placement firms that need more recruiting capacity and back office support for their healthcare staffing company.',
      challenges: [
        'More open orders from clients than recruiters can work',
        'Slow submittals losing orders to competing agencies',
        'Credentialing backlogs delaying start dates',
        'High cost of hiring and training in-house recruiters'
      ],
      help: [
        'Pre-screened candidates for your orders in 48–96 hours',
        'Offshore recruiter teams working in your ATS',
        'Credential files built to your client checklists',
        'White-label: your agency owns the client and the candidate relationship'
      ],
      servicePath: '/services',
      service: 'rpo',
      serviceLabel: 'See recruitment process outsourcing'
    },
    {
      id: 'hospitals',
      title: 'Hospitals and health systems',
      intro: 'Hospital staffing solutions for HR and talent acquisition teams at hospitals, health systems and long-term care providers who need to hire travel nurses quickly, hire locum nurses or fill permanent roles.',
      challenges: [
        'Persistent RN vacancies and rising agency spend',
        'Talent acquisition teams stretched across many requisitions',
        'Opening new units or service lines on tight timelines',
        'Compliance files that must be complete before day one'
      ],
      help: [
        'Contract healthcare staff and permanent hires, reducing reliance on premium agency rates',
        'Urgent nurse staffing services for census surges and unit openings',
        'Locum nurse staffing solutions for leave cover and short-term gaps',
        'Primary source licence verification and credential file preparation',
        'Candidates screened against your unit, shift and specialty requirements'
      ],
      servicePath: '/services',
      service: 'talent-sourcing',
      serviceLabel: 'See talent sourcing'
    },
    {
      id: 'new-agencies',
      title: 'New and growing staffing agencies',
      intro: 'Founders planning to start a nurse staffing agency, and young agencies building their first processes.',
      challenges: [
        'Unclear state licensing and compliance requirements',
        'No recruitment SOPs or credentialing process yet',
        'Too few recruiters to respond to first client orders',
        'Payroll, scheduling and back-office work taking over'
      ],
      help: [
        'Staffing agency setup services and business advisory',
        'Healthcare compliance consulting and recruitment SOP development',
        'Offshore recruiter teams from day one',
        'Back-office, scheduling and payroll processing support'
      ],
      servicePath: '/staffing-agency-consulting',
      service: undefined,
      serviceLabel: 'See healthcare staffing consulting'
    }
  ];

  value = [
    { title: 'Faster fills', text: 'Shorter time from requisition to submittal, so fewer orders are lost.' },
    { title: 'Lower cost per hire', text: 'Recruiting capacity without adding full-time salaries and benefits.' },
    { title: 'Higher fill rates', text: 'More candidates screened per requisition, across more specialties.' },
    { title: 'Scalable healthcare workforce', text: 'Add recruiters when census rises, and scale back when it slows.' }
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
        this.toastService.success('Message sent', 'Our team will contact you within one business day.');
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
