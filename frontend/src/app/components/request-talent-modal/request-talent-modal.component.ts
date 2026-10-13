import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalService } from '../../services/modal.service';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';
import { TalentRequest } from '../../models/models';
import { DialogDirective } from '../dialog.directive';

@Component({
  selector: 'app-request-talent-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, DialogDirective],
  template: `
    <div *ngIf="modalService.isRequestTalentOpen()" class="fixed inset-0 z-[9990] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
      <div appDialog (dialogClose)="modalService.closeRequestTalent()" role="dialog" aria-modal="true" aria-labelledby="rt-title" tabindex="-1" class="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] animate-slide-up outline-none">
        
        <!-- Modal Header -->
        <div class="bg-navy text-white px-6 py-5 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <span class="material-symbols-outlined text-white text-[24px]" aria-hidden="true">assignment_add</span>
            </div>
            <div>
              <h2 id="rt-title" class="font-heading text-lg font-bold text-white m-0">Request talent</h2>
              <p class="text-sm text-white/75">Pre-screened candidates within 48–96 hours</p>
            </div>
          </div>
          <button type="button" (click)="modalService.closeRequestTalent()" aria-label="Close" class="text-slate-300 hover:text-white p-1 rounded-lg">
            <span class="material-symbols-outlined text-[24px]" aria-hidden="true">close</span>
          </button>
        </div>

        <!-- Modal Body / Form -->
        <form (ngSubmit)="submitRequest()" class="hd-form p-6 overflow-y-auto space-y-4 text-sm flex-1" novalidate>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label for="rt-organization-name" class="block font-semibold text-slate-700 mb-1">Organization Name *</label>
              <input id="rt-organization-name" 
                type="text" 
                [(ngModel)]="formData.organization_name" 
                name="organization_name" 
                required 
                placeholder="e.g. Apex Health Staffing" 
                class="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#004b87] focus:border-transparent text-slate-900" />
            </div>
            <div>
              <label for="rt-contact-name" class="block font-semibold text-slate-700 mb-1">Contact Name *</label>
              <input id="rt-contact-name" 
                type="text" 
                [(ngModel)]="formData.contact_name" 
                name="contact_name" 
                required 
                placeholder="e.g. Dr. Arthur Vance" 
                class="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#004b87] focus:border-transparent text-slate-900" />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label for="rt-work-email" class="block font-semibold text-slate-700 mb-1">Work Email *</label>
              <input id="rt-work-email" 
                type="email" 
                [(ngModel)]="formData.work_email" 
                name="work_email" 
                required 
                placeholder="e.g. avant&#64;hospital.org" 
                class="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#004b87] focus:border-transparent text-slate-900" />
            </div>
            <div>
              <label for="rt-phone-number" class="block font-semibold text-slate-700 mb-1">Direct Phone Number *</label>
              <input id="rt-phone-number" 
                type="tel" 
                [(ngModel)]="formData.phone_number" 
                name="phone_number" 
                required 
                placeholder="e.g. (312) 555-0199" 
                class="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#004b87] focus:border-transparent text-slate-900" />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label for="rt-facility-type" class="block font-semibold text-slate-700 mb-1">Organization Type</label>
              <select id="rt-facility-type" 
                [(ngModel)]="formData.facility_type" 
                name="facility_type" 
                class="w-full px-3 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#004b87] bg-white text-slate-900">
                <option value="Healthcare Staffing Agency">Nurse / Healthcare Staffing Agency</option>
                <option value="Hospital or Health System">Hospital or Health System</option>
                <option value="Long-Term Care / Post-Acute">Long-Term Care / Post-Acute</option>
                <option value="MSP / VMS Provider">MSP / VMS Provider</option>
                <option value="Healthcare Provider">Other Healthcare Provider</option>
              </select>
            </div>
            <div>
              <label for="rt-facility-city" class="block font-semibold text-slate-700 mb-1">Facility City</label>
              <input id="rt-facility-city" 
                type="text" 
                [(ngModel)]="formData.facility_city" 
                name="facility_city" 
                placeholder="Chicago" 
                class="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#004b87] text-slate-900" />
            </div>
            <div>
              <label for="rt-facility-state" class="block font-semibold text-slate-700 mb-1">State</label>
              <input id="rt-facility-state" 
                type="text" 
                [(ngModel)]="formData.facility_state" 
                name="facility_state" 
                placeholder="IL" 
                class="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#004b87] text-slate-900" />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div class="sm:col-span-2">
              <label for="rt-roles-needed" class="block font-semibold text-slate-700 mb-1">Roles / Specialties Needed *</label>
              <input id="rt-roles-needed" 
                type="text" 
                [(ngModel)]="formData.roles_needed" 
                name="roles_needed" 
                required 
                placeholder="e.g. 5x RNs, 3x CNAs, 1x Radiology Tech" 
                class="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#004b87] text-slate-900" />
            </div>
            <div>
              <label for="rt-num-positions" class="block font-semibold text-slate-700 mb-1">Number of Openings</label>
              <input id="rt-num-positions" 
                type="number" 
                min="1" 
                [(ngModel)]="formData.num_positions" 
                name="num_positions" 
                class="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#004b87] text-slate-900" />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label for="rt-urgency-level" class="block font-semibold text-slate-700 mb-1">Urgency Level</label>
              <select id="rt-urgency-level" 
                [(ngModel)]="formData.urgency_level" 
                name="urgency_level" 
                class="w-full px-3 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#004b87] bg-white text-slate-900">
                <option value="Urgent (Candidates in 48-96h)">Urgent (Candidates in 48–96h)</option>
                <option value="Immediate Need (Within 1-2 Weeks)">Immediate Need (Within 1-2 Weeks)</option>
                <option value="Planned Sourcing (30 Days+)">Planned Sourcing (30 Days+)</option>
                <option value="Ongoing Talent Pipeline">Ongoing Talent Pipeline</option>
              </select>
            </div>
            <div>
              <label for="rt-target-start-date" class="block font-semibold text-slate-700 mb-1">Target Start Date</label>
              <input id="rt-target-start-date" 
                type="text" 
                [(ngModel)]="formData.target_start_date" 
                name="target_start_date" 
                placeholder="e.g. ASAP or Nov 15, 2026" 
                class="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#004b87] text-slate-900" />
            </div>
          </div>

          <div>
            <label for="rt-additional-notes" class="block font-semibold text-slate-700 mb-1">Clinical Requirements & Specifications</label>
            <textarea id="rt-additional-notes" 
              rows="3" 
              [(ngModel)]="formData.additional_notes" 
              name="additional_notes" 
              placeholder="Required licenses/certifications, experience, and preferred engagement model (Per Placement, Monthly Retainer, Dedicated Recruiter, Project-Based)..." 
              class="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#004b87] text-slate-900 resize-none"></textarea>
          </div>

          <!-- Action Buttons -->
          <div class="pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
            <button 
              type="button" 
              (click)="modalService.closeRequestTalent()" 
              class="px-5 py-2.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold transition-colors">
              Cancel
            </button>
            <button 
              type="submit" 
              [disabled]="isSubmitting()" 
              class="btn btn-primary">
              <span *ngIf="!isSubmitting()">Send talent request</span>
              <span *ngIf="isSubmitting()">Submitting Requisition...</span>
              <span class="material-symbols-outlined text-[18px]">send</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  `
})
export class RequestTalentModalComponent {
  modalService = inject(ModalService);
  apiService = inject(ApiService);
  toastService = inject(ToastService);

  isSubmitting = signal<boolean>(false);

  formData: TalentRequest = {
    organization_name: '',
    contact_name: '',
    work_email: '',
    phone_number: '',
    facility_type: 'Healthcare Staffing Agency',
    facility_city: '',
    facility_state: '',
    roles_needed: '',
    num_positions: 1,
    urgency_level: 'Immediate Need (Within 1-2 Weeks)',
    shift_requirements: '12h Rotating / Days & Nights',
    target_start_date: '',
    additional_notes: ''
  };

  submitRequest() {
    if (!this.formData.organization_name || !this.formData.contact_name || !this.formData.work_email || !this.formData.roles_needed) {
      this.toastService.error('Missing Fields', 'Please fill in all required fields to submit your talent requisition.');
      return;
    }

    this.isSubmitting.set(true);
    this.apiService.submitTalentRequest(this.formData).subscribe({
      next: (res) => {
        this.isSubmitting.set(false);
        this.toastService.success('Request received', 'Thank you. Our recruitment team will follow up within one business day.');
        this.modalService.closeRequestTalent();
        this.resetForm();
      },
      error: (err) => {
        this.isSubmitting.set(false);
        this.toastService.error('Submission Error', err.error?.message || 'Could not submit talent request.');
      }
    });
  }

  resetForm() {
    this.formData = {
      organization_name: '',
      contact_name: '',
      work_email: '',
      phone_number: '',
      facility_type: 'Healthcare Staffing Agency',
      facility_city: '',
      facility_state: '',
      roles_needed: '',
      num_positions: 1,
      urgency_level: 'Immediate Need (Within 1-2 Weeks)',
      shift_requirements: '12h Rotating / Days & Nights',
      target_start_date: '',
      additional_notes: ''
    };
  }
}
