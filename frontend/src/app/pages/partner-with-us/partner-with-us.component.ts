import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';
import { PartnerApplication } from '../../models/models';

@Component({
  selector: 'app-partner-with-us',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="flex flex-col w-full">
      
      <!-- HERO -->
      <section class="bg-[#003461] text-white py-16 lg:py-24 px-6 lg:px-12 relative overflow-hidden">
        <div class="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div class="lg:col-span-7 flex flex-col gap-4">
            <span class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-xs font-bold uppercase tracking-wider text-[#86f4f1] w-fit">
              B2B Healthcare & Agency Alliances
            </span>
            <h1 class="font-heading text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Scale Your Recruitment Engine with HDDP Consultants
            </h1>
            <p class="text-base sm:text-lg text-slate-200 leading-relaxed">
              We partner with hospital systems, MSPs, VMS providers, and primary staffing agencies to co-source, backfill, and supply pre-screened clinical talent under guaranteed SLA benchmarks.
            </p>
            <div class="flex flex-wrap gap-4 pt-2">
              <a href="#partner-form" class="bg-[#f2a900] hover:bg-amber-400 text-slate-900 font-extrabold px-8 py-3.5 rounded-xl shadow-lg transition-all text-sm flex items-center gap-2">
                <span>Start Partnership Application</span>
                <span class="material-symbols-outlined text-[18px]">arrow_downward</span>
              </a>
            </div>
          </div>

          <!-- Quick Metrics Panel -->
          <div class="lg:col-span-5 bg-white/10 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white/20 text-white flex flex-col gap-6">
            <h3 class="font-heading text-xl font-bold border-b border-white/15 pb-3">Why Agencies Partner With HDDP</h3>
            
            <div class="flex items-start gap-4">
              <div class="w-10 h-10 rounded-xl bg-[#5FCF80]/20 text-[#5FCF80] flex items-center justify-center shrink-0">
                <span class="material-symbols-outlined text-[24px]">trending_up</span>
              </div>
              <div>
                <h4 class="font-bold text-sm">Fill Difficult Shift Quotas</h4>
                <p class="text-xs text-slate-300 mt-0.5">Overcome local candidate shortages with national pipeline sourcing.</p>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div class="w-10 h-10 rounded-xl bg-[#86f4f1]/20 text-[#86f4f1] flex items-center justify-center shrink-0">
                <span class="material-symbols-outlined text-[24px]">verified</span>
              </div>
              <div>
                <h4 class="font-bold text-sm">100% Shared Compliance Risk</h4>
                <p class="text-xs text-slate-300 mt-0.5">Full Joint Commission and client-specific onboarding packages.</p>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div class="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0">
                <span class="material-symbols-outlined text-[24px]">bolt</span>
              </div>
              <div>
                <h4 class="font-bold text-sm">Guaranteed SLA Delivery</h4>
                <p class="text-xs text-slate-300 mt-0.5">Matched profiles submitted within 24 to 48 hours of requisition.</p>
              </div>
            </div>

          </div>

        </div>
      </section>

      <!-- PARTNERSHIP MODELS -->
      <section class="py-16 bg-[#F5F7FA]">
        <div class="max-w-7xl mx-auto px-6 lg:px-12">
          
          <div class="text-center max-w-3xl mx-auto mb-16">
            <h2 class="font-heading text-3xl font-extrabold text-[#003461]">Flexible Partnership Frameworks</h2>
            <p class="text-slate-600 mt-2">Designed to integrate frictionlessly with your existing operations.</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div class="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <span class="text-xs font-bold uppercase tracking-wider text-[#006a68]">Tier 1 Model</span>
                <h3 class="font-heading text-xl font-bold text-[#003461] mt-1">Direct Sourcing Partner</h3>
                <p class="text-xs text-slate-600 mt-3 leading-relaxed">
                  We supply pre-qualified, ready-to-interview clinical profiles directly into your talent acquisition workflow under competitive split or placement fees.
                </p>
                <ul class="mt-4 space-y-2 text-xs text-slate-700">
                  <li class="flex items-center gap-2"><span class="material-symbols-outlined text-xs text-[#5FCF80]">check</span>No upfront or retainer fees</li>
                  <li class="flex items-center gap-2"><span class="material-symbols-outlined text-xs text-[#5FCF80]">check</span>You retain primary client relationship</li>
                  <li class="flex items-center gap-2"><span class="material-symbols-outlined text-xs text-[#5FCF80]">check</span>Pay-on-performance settlement</li>
                </ul>
              </div>
            </div>

            <div class="bg-white p-8 rounded-2xl border-2 border-[#004b87] shadow-md flex flex-col justify-between relative">
              <span class="absolute -top-3 right-6 bg-[#004b87] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">Most Popular</span>
              <div>
                <span class="text-xs font-bold uppercase tracking-wider text-[#004b87]">Tier 2 Model</span>
                <h3 class="font-heading text-xl font-bold text-[#003461] mt-1">MSP / VMS Co-Vendor</h3>
                <p class="text-xs text-slate-600 mt-3 leading-relaxed">
                  We integrate as an authorized secondary or tertiary supplier into your Vendor Management System (Fieldglass, ShiftWise, Medefis, RightSourcing).
                </p>
                <ul class="mt-4 space-y-2 text-xs text-slate-700">
                  <li class="flex items-center gap-2"><span class="material-symbols-outlined text-xs text-[#5FCF80]">check</span>Automated candidate submission</li>
                  <li class="flex items-center gap-2"><span class="material-symbols-outlined text-xs text-[#5FCF80]">check</span>100% VMS compliance scoring</li>
                  <li class="flex items-center gap-2"><span class="material-symbols-outlined text-xs text-[#5FCF80]">check</span>Dedicated Account Director</li>
                </ul>
              </div>
            </div>

            <div class="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <span class="text-xs font-bold uppercase tracking-wider text-[#006a68]">Tier 3 Model</span>
                <h3 class="font-heading text-xl font-bold text-[#003461] mt-1">Primary Hospital Network Vendor</h3>
                <p class="text-xs text-slate-600 mt-3 leading-relaxed">
                  Master Services Agreement (MSA) directly with regional health systems and independent hospitals for enterprise-wide clinical staffing.
                </p>
                <ul class="mt-4 space-y-2 text-xs text-slate-700">
                  <li class="flex items-center gap-2"><span class="material-symbols-outlined text-xs text-[#5FCF80]">check</span>Custom rate card structures</li>
                  <li class="flex items-center gap-2"><span class="material-symbols-outlined text-xs text-[#5FCF80]">check</span>Crisis surge guarantees</li>
                  <li class="flex items-center gap-2"><span class="material-symbols-outlined text-xs text-[#5FCF80]">check</span>Quarterly business reviews & metrics</li>
                </ul>
              </div>
            </div>

          </div>

        </div>
      </section>

      <!-- PARTNERSHIP INTAKE FORM SECTION -->
      <section id="partner-form" class="py-16 lg:py-24 bg-white border-t border-slate-200">
        <div class="max-w-4xl mx-auto px-6 lg:px-12">
          
          <div class="text-center mb-12">
            <span class="text-xs font-bold uppercase tracking-wider text-[#006a68]">Institutional Intake</span>
            <h2 class="font-heading text-3xl font-extrabold text-[#003461] mt-1">Submit Partnership Application</h2>
            <p class="text-slate-600 text-sm mt-2">Connect with our executive partnership committee to initiate MSA agreements.</p>
          </div>

          <form (ngSubmit)="submitPartner()" class="bg-[#F8F9FF] p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
            
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label class="block font-semibold text-slate-700 text-xs uppercase mb-1">Company / Organization Name *</label>
                <input 
                  type="text" 
                  [(ngModel)]="formData.company_name" 
                  name="company_name" 
                  required 
                  placeholder="e.g. Apex Health Staffing Solutions" 
                  class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#004b87] bg-white text-slate-900 text-sm" />
              </div>
              <div>
                <label class="block font-semibold text-slate-700 text-xs uppercase mb-1">Contact Name *</label>
                <input 
                  type="text" 
                  [(ngModel)]="formData.contact_name" 
                  name="contact_name" 
                  required 
                  placeholder="e.g. Michael Thorne" 
                  class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#004b87] bg-white text-slate-900 text-sm" />
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <label class="block font-semibold text-slate-700 text-xs uppercase mb-1">Job Title *</label>
                <input 
                  type="text" 
                  [(ngModel)]="formData.job_title" 
                  name="job_title" 
                  required 
                  placeholder="e.g. VP of Talent Acquisition" 
                  class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#004b87] bg-white text-slate-900 text-sm" />
              </div>
              <div>
                <label class="block font-semibold text-slate-700 text-xs uppercase mb-1">Work Email *</label>
                <input 
                  type="email" 
                  [(ngModel)]="formData.work_email" 
                  name="work_email" 
                  required 
                  placeholder="e.g. mthorne&#64;apexhealth.com" 
                  class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#004b87] bg-white text-slate-900 text-sm" />
              </div>
              <div>
                <label class="block font-semibold text-slate-700 text-xs uppercase mb-1">Phone Number *</label>
                <input 
                  type="tel" 
                  [(ngModel)]="formData.phone_number" 
                  name="phone_number" 
                  required 
                  placeholder="e.g. (800) 555-0182" 
                  class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#004b87] bg-white text-slate-900 text-sm" />
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <label class="block font-semibold text-slate-700 text-xs uppercase mb-1">Organization Type</label>
                <select 
                  [(ngModel)]="formData.organization_type" 
                  name="organization_type" 
                  class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#004b87] bg-white text-slate-900 text-sm">
                  <option value="Healthcare Staffing Agency">Staffing Agency</option>
                  <option value="Managed Service Provider (MSP)">MSP / VMS Provider</option>
                  <option value="Hospital / Health System">Hospital System</option>
                  <option value="Ambulatory / Surgical Network">Surgical Network</option>
                </select>
              </div>

              <div>
                <label class="block font-semibold text-slate-700 text-xs uppercase mb-1">Monthly Placement Volume</label>
                <select 
                  [(ngModel)]="formData.staffing_volume" 
                  name="staffing_volume" 
                  class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#004b87] bg-white text-slate-900 text-sm">
                  <option value="1 - 10 Clinicians/mo">1 - 10 Clinicians/mo</option>
                  <option value="10 - 50 Clinicians/mo">10 - 50 Clinicians/mo</option>
                  <option value="50 - 150 Clinicians/mo">50 - 150 Clinicians/mo</option>
                  <option value="150+ Enterprise Scale">150+ Enterprise Scale</option>
                </select>
              </div>

              <div>
                <label class="block font-semibold text-slate-700 text-xs uppercase mb-1">Geographic Coverage</label>
                <select 
                  [(ngModel)]="formData.geographic_reach" 
                  name="geographic_reach" 
                  class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#004b87] bg-white text-slate-900 text-sm">
                  <option value="National (All 50 States)">National (50 States)</option>
                  <option value="Regional (Multi-State)">Regional (Multi-State)</option>
                  <option value="Single State / Local">Single State / Local</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block font-semibold text-slate-700 text-xs uppercase mb-1">Target Specialized Units & Specialties</label>
              <input 
                type="text" 
                [(ngModel)]="formData.specialized_units" 
                name="specialized_units" 
                placeholder="e.g. ICU, Emergency Dept, Cath Lab, Med-Surg, Epic EHR Consultants" 
                class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#004b87] bg-white text-slate-900 text-sm" />
            </div>

            <div>
              <label class="block font-semibold text-slate-700 text-xs uppercase mb-1">Partnership Objectives & Notes</label>
              <textarea 
                rows="3" 
                [(ngModel)]="formData.message" 
                name="message" 
                placeholder="Detail current vendor tier gaps, VMS software used, or volume requirements..." 
                class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#004b87] bg-white text-slate-900 text-sm resize-none"></textarea>
            </div>

            <button 
              type="submit" 
              [disabled]="isSubmitting()" 
              class="w-full py-4 rounded-xl bg-[#004b87] hover:bg-[#0B3C5D] text-white font-bold text-base shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50">
              <span *ngIf="!isSubmitting()">Submit Partnership Application</span>
              <span *ngIf="isSubmitting()">Processing Application...</span>
              <span class="material-symbols-outlined text-[20px]">handshake</span>
            </button>

          </form>

        </div>
      </section>

    </div>
  `
})
export class PartnerWithUsComponent {
  apiService = inject(ApiService);
  toastService = inject(ToastService);

  isSubmitting = signal<boolean>(false);

  formData: PartnerApplication = {
    company_name: '',
    contact_name: '',
    job_title: '',
    work_email: '',
    phone_number: '',
    organization_type: 'Healthcare Staffing Agency',
    staffing_volume: '10 - 50 Clinicians/mo',
    specialized_units: 'ICU, ER, Med-Surg, Allied Health',
    geographic_reach: 'National (All 50 States)',
    message: ''
  };

  submitPartner() {
    if (!this.formData.company_name || !this.formData.contact_name || !this.formData.work_email || !this.formData.phone_number) {
      this.toastService.error('Missing Required Fields', 'Please complete company name, contact, email, and phone number.');
      return;
    }

    this.isSubmitting.set(true);
    this.apiService.submitPartnerApplication(this.formData).subscribe({
      next: (res) => {
        this.isSubmitting.set(false);
        this.toastService.success('Partnership Application Submitted!', 'Our Enterprise Alliance team will review your organization profile and reach out within 24 hours.');
        this.formData = {
          company_name: '',
          contact_name: '',
          job_title: '',
          work_email: '',
          phone_number: '',
          organization_type: 'Healthcare Staffing Agency',
          staffing_volume: '10 - 50 Clinicians/mo',
          specialized_units: '',
          geographic_reach: 'National (All 50 States)',
          message: ''
        };
      },
      error: (err) => {
        this.isSubmitting.set(false);
        this.toastService.error('Submission Failed', err.error?.message || 'Could not submit partner application.');
      }
    });
  }
}
