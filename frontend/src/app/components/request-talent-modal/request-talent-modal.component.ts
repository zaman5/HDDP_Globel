import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalService } from '../../services/modal.service';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';
import { TalentRequest } from '../../models/models';

@Component({
  selector: 'app-request-talent-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div *ngIf="modalService.isRequestTalentOpen()" class="fixed inset-0 z-[9990] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
      <div class="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] animate-slide-up">
        
        <!-- Modal Header -->
        <div class="bg-[#003461] text-white px-6 py-5 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <span class="material-symbols-outlined text-[#86f4f1] text-[24px]">assignment_add</span>
            </div>
            <div>
              <h3 class="font-heading text-lg font-bold">Request Clinical Talent</h3>
              <p class="text-xs text-[#8abcff]">Enterprise Staffing Requisition • 48-96h Deployment SLA</p>
            </div>
          </div>
          <button (click)="modalService.closeRequestTalent()" class="text-slate-300 hover:text-white p-1 rounded-lg">
            <span class="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        <!-- Modal Body / Form -->
        <form (ngSubmit)="submitRequest()" class="p-6 overflow-y-auto space-y-4 text-sm flex-1">
          
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block font-semibold text-slate-700 mb-1">Organization / Facility Name *</label>
              <input 
                type="text" 
                [(ngModel)]="formData.organization_name" 
                name="organization_name" 
                required 
                placeholder="e.g. Northwestern Memorial Hospital" 
                class="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#004b87] focus:border-transparent text-slate-900" />
            </div>
            <div>
              <label class="block font-semibold text-slate-700 mb-1">Contact Name *</label>
              <input 
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
              <label class="block font-semibold text-slate-700 mb-1">Work Email *</label>
              <input 
                type="email" 
                [(ngModel)]="formData.work_email" 
                name="work_email" 
                required 
                placeholder="e.g. avant&#64;hospital.org" 
                class="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#004b87] focus:border-transparent text-slate-900" />
            </div>
            <div>
              <label class="block font-semibold text-slate-700 mb-1">Direct Phone Number *</label>
              <input 
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
              <label class="block font-semibold text-slate-700 mb-1">Facility Type</label>
              <select 
                [(ngModel)]="formData.facility_type" 
                name="facility_type" 
                class="w-full px-3 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#004b87] bg-white text-slate-900">
                <option value="Acute Care Hospital">Acute Care Hospital</option>
                <option value="Level 1/2 Trauma Center">Level 1/2 Trauma Center</option>
                <option value="Ambulatory / Surgery Center">Ambulatory / Surgery Center</option>
                <option value="Long-Term Acute Care (LTACH)">LTACH Facility</option>
                <option value="Healthcare Staffing Agency">Staffing Agency Partner</option>
              </select>
            </div>
            <div>
              <label class="block font-semibold text-slate-700 mb-1">Facility City</label>
              <input 
                type="text" 
                [(ngModel)]="formData.facility_city" 
                name="facility_city" 
                placeholder="Chicago" 
                class="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#004b87] text-slate-900" />
            </div>
            <div>
              <label class="block font-semibold text-slate-700 mb-1">State</label>
              <input 
                type="text" 
                [(ngModel)]="formData.facility_state" 
                name="facility_state" 
                placeholder="IL" 
                class="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#004b87] text-slate-900" />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div class="sm:col-span-2">
              <label class="block font-semibold text-slate-700 mb-1">Roles / Specialties Needed *</label>
              <input 
                type="text" 
                [(ngModel)]="formData.roles_needed" 
                name="roles_needed" 
                required 
                placeholder="e.g. 5x ICU RNs, 2x OR Scrub Nurses" 
                class="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#004b87] text-slate-900" />
            </div>
            <div>
              <label class="block font-semibold text-slate-700 mb-1">Number of Openings</label>
              <input 
                type="number" 
                min="1" 
                [(ngModel)]="formData.num_positions" 
                name="num_positions" 
                class="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#004b87] text-slate-900" />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block font-semibold text-slate-700 mb-1">Urgency Level</label>
              <select 
                [(ngModel)]="formData.urgency_level" 
                name="urgency_level" 
                class="w-full px-3 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#004b87] bg-white text-slate-900">
                <option value="Critical / Rapid Deployment (24-48h)">Critical / Rapid Deployment (24-48h)</option>
                <option value="Immediate Need (Within 1-2 Weeks)">Immediate Need (Within 1-2 Weeks)</option>
                <option value="Planned Sourcing (30 Days+)">Planned Sourcing (30 Days+)</option>
                <option value="Per Diem / Ongoing Pool">Per Diem / Ongoing Pool</option>
              </select>
            </div>
            <div>
              <label class="block font-semibold text-slate-700 mb-1">Target Start Date</label>
              <input 
                type="text" 
                [(ngModel)]="formData.target_start_date" 
                name="target_start_date" 
                placeholder="e.g. ASAP or Nov 15, 2026" 
                class="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#004b87] text-slate-900" />
            </div>
          </div>

          <div>
            <label class="block font-semibold text-slate-700 mb-1">Clinical Requirements & Specifications</label>
            <textarea 
              rows="3" 
              [(ngModel)]="formData.additional_notes" 
              name="additional_notes" 
              placeholder="Specify required certifications (BLS, ACLS, NIHSS, Epic/Cerner EHR proficiency, compact licensure requirements)..." 
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
              class="px-7 py-2.5 rounded-lg bg-[#004b87] hover:bg-[#0B3C5D] text-white font-bold shadow-md transition-all flex items-center gap-2 disabled:opacity-50">
              <span *ngIf="!isSubmitting()">Deploy Requisition</span>
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
    facility_type: 'Acute Care Hospital',
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
        this.toastService.success('Requisition Received!', 'Your talent request has been logged into MySQL database. Our clinical staffing coordinator will follow up immediately.');
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
      facility_type: 'Acute Care Hospital',
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
