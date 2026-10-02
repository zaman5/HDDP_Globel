import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalService } from '../../services/modal.service';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-resume-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div *ngIf="modalService.isResumeModalOpen()" class="fixed inset-0 z-[9990] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
      <div class="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] animate-slide-up">
        
        <!-- Header -->
        <div class="bg-[#006a68] text-white px-6 py-5 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <span class="material-symbols-outlined text-[#86f4f1] text-[24px]">clinical_notes</span>
            </div>
            <div>
              <h3 class="font-heading text-lg font-bold">Submit Candidate Application</h3>
              <p class="text-xs text-teal-100">100% Free Clinician Representation • Fast-Track Verification</p>
            </div>
          </div>
          <button (click)="modalService.closeResumeModal()" class="text-teal-200 hover:text-white p-1 rounded-lg">
            <span class="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        <!-- Form -->
        <form (ngSubmit)="submitApplication()" class="p-6 overflow-y-auto space-y-4 text-sm flex-1">
          
          <div *ngIf="modalService.selectedJobTitle()" class="bg-[#eff4ff] p-3 rounded-xl border border-[#004b87]/20 flex items-center gap-2 text-[#003461]">
            <span class="material-symbols-outlined text-[20px] text-[#004b87]">work</span>
            <span class="text-xs font-semibold">Applying for Position: <strong>{{ modalService.selectedJobTitle() }}</strong></span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block font-semibold text-slate-700 mb-1">First Name *</label>
              <input 
                type="text" 
                [(ngModel)]="formData.first_name" 
                name="first_name" 
                required 
                placeholder="e.g. Sarah" 
                class="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#006a68] focus:border-transparent text-slate-900" />
            </div>
            <div>
              <label class="block font-semibold text-slate-700 mb-1">Last Name *</label>
              <input 
                type="text" 
                [(ngModel)]="formData.last_name" 
                name="last_name" 
                required 
                placeholder="e.g. Jenkins" 
                class="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#006a68] focus:border-transparent text-slate-900" />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block font-semibold text-slate-700 mb-1">Email Address *</label>
              <input 
                type="email" 
                [(ngModel)]="formData.email" 
                name="email" 
                required 
                placeholder="e.g. sarah.rn@gmail.com" 
                class="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#006a68] text-slate-900" />
            </div>
            <div>
              <label class="block font-semibold text-slate-700 mb-1">Phone Number *</label>
              <input 
                type="tel" 
                [(ngModel)]="formData.phone" 
                name="phone" 
                required 
                placeholder="e.g. (312) 555-0144" 
                class="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#006a68] text-slate-900" />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label class="block font-semibold text-slate-700 mb-1">Primary Specialty *</label>
              <select 
                [(ngModel)]="formData.specialty" 
                name="specialty" 
                class="w-full px-3 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#006a68] bg-white text-slate-900">
                <option value="Registered Nurse - ICU / CCU">ICU / Critical Care RN</option>
                <option value="Registered Nurse - ER">Emergency Room RN</option>
                <option value="Registered Nurse - OR / Scrub">Perioperative / OR RN</option>
                <option value="Registered Nurse - Med-Surg / Tele">Med-Surg / Telemetry RN</option>
                <option value="Registered Nurse - L&D / NICU">L&D / NICU RN</option>
                <option value="Allied Health - Cath Lab / Imaging">Imaging / Cath Lab</option>
                <option value="Healthcare IT - Epic / Cerner EHR">EHR / Informatics</option>
                <option value="Nurse Practitioner / Advanced Practice">Nurse Practitioner (NP)</option>
              </select>
            </div>

            <div>
              <label class="block font-semibold text-slate-700 mb-1">Years of Experience</label>
              <select 
                [(ngModel)]="formData.years_experience" 
                name="years_experience" 
                class="w-full px-3 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#006a68] bg-white text-slate-900">
                <option value="1-2 Years">1 - 2 Years</option>
                <option value="3-5 Years">3 - 5 Years</option>
                <option value="6-10 Years">6 - 10 Years</option>
                <option value="10+ Years">10+ Years Master</option>
              </select>
            </div>

            <div>
              <label class="block font-semibold text-slate-700 mb-1">License Type</label>
              <input 
                type="text" 
                [(ngModel)]="formData.license_type" 
                name="license_type" 
                placeholder="e.g. RN, BSN, APRN, ARRT" 
                class="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#006a68] text-slate-900" />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            <div class="flex items-center gap-2 pt-2">
              <input 
                type="checkbox" 
                id="compact_license" 
                [(ngModel)]="formData.compact_license" 
                name="compact_license" 
                class="h-4 w-4 text-[#006a68] rounded border-slate-300 focus:ring-[#006a68]" />
              <label for="compact_license" class="font-medium text-slate-700 cursor-pointer">
                I hold an active Multi-State Compact License (eNLC)
              </label>
            </div>
            <div>
              <label class="block font-semibold text-slate-700 mb-1">Desired Pay / Rate Expectation</label>
              <input 
                type="text" 
                [(ngModel)]="formData.desired_pay" 
                name="desired_pay" 
                placeholder="e.g. $3,500/wk or $55/hr" 
                class="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#006a68] text-slate-900" />
            </div>
          </div>

          <!-- Resume Upload -->
          <div class="border-2 border-dashed border-slate-300 hover:border-[#006a68] p-5 rounded-xl text-center bg-slate-50 transition-colors">
            <span class="material-symbols-outlined text-[36px] text-[#006a68]">cloud_upload</span>
            <p class="font-semibold text-slate-800 text-xs mt-1">Upload Resume or Curriculum Vitae (.pdf, .doc, .docx)</p>
            <p *ngIf="selectedFileName()" class="text-xs text-emerald-700 font-bold mt-1">Selected File: {{ selectedFileName() }}</p>
            <input 
              type="file" 
              (change)="onFileSelected($event)" 
              accept=".pdf,.doc,.docx,.rtf" 
              class="mt-2 text-xs text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#006a68] file:text-white hover:file:bg-[#00504f] cursor-pointer" />
          </div>

          <!-- Action Buttons -->
          <div class="pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
            <button 
              type="button" 
              (click)="modalService.closeResumeModal()" 
              class="px-5 py-2.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold transition-colors">
              Cancel
            </button>
            <button 
              type="submit" 
              [disabled]="isSubmitting()" 
              class="px-7 py-2.5 rounded-lg bg-[#006a68] hover:bg-[#00504f] text-white font-bold shadow-md transition-all flex items-center gap-2 disabled:opacity-50">
              <span *ngIf="!isSubmitting()">Submit Application</span>
              <span *ngIf="isSubmitting()">Uploading & Verifying...</span>
              <span class="material-symbols-outlined text-[18px]">verified</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  `
})
export class ResumeModalComponent {
  modalService = inject(ModalService);
  apiService = inject(ApiService);
  toastService = inject(ToastService);

  isSubmitting = signal<boolean>(false);
  selectedFile: File | null = null;
  selectedFileName = signal<string>('');

  formData = {
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    specialty: 'Registered Nurse - ICU / CCU',
    license_type: 'RN, BSN',
    compact_license: true,
    years_experience: '3-5 Years',
    preferred_shift: '12h Days or Nights',
    desired_pay: '$3,400/wk',
    current_city: '',
    current_state: '',
    willing_to_relocate: true,
    notes: ''
  };

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.selectedFileName.set(file.name);
    }
  }

  submitApplication() {
    if (!this.formData.first_name || !this.formData.last_name || !this.formData.email || !this.formData.phone) {
      this.toastService.error('Required Fields', 'Please provide your first name, last name, email, and phone number.');
      return;
    }

    this.isSubmitting.set(true);
    const postData = new FormData();
    postData.append('first_name', this.formData.first_name);
    postData.append('last_name', this.formData.last_name);
    postData.append('email', this.formData.email);
    postData.append('phone', this.formData.phone);
    postData.append('specialty', this.formData.specialty);
    postData.append('license_type', this.formData.license_type);
    postData.append('compact_license', String(this.formData.compact_license));
    postData.append('years_experience', this.formData.years_experience);
    postData.append('preferred_shift', this.formData.preferred_shift);
    postData.append('desired_pay', this.formData.desired_pay);
    postData.append('current_city', this.formData.current_city);
    postData.append('current_state', this.formData.current_state);
    postData.append('notes', this.modalService.selectedJobTitle() ? `Applying for: ${this.modalService.selectedJobTitle()}` : '');

    if (this.selectedFile) {
      postData.append('resume', this.selectedFile, this.selectedFile.name);
    }

    this.apiService.submitCandidateApplication(postData).subscribe({
      next: (res) => {
        this.isSubmitting.set(false);
        this.toastService.success('Application Received!', 'Your credentials have been securely stored in the MySQL database. A recruiter will contact you shortly.');
        this.modalService.closeResumeModal();
        this.selectedFile = null;
        this.selectedFileName.set('');
      },
      error: (err) => {
        this.isSubmitting.set(false);
        this.toastService.error('Upload Error', err.error?.message || 'Could not submit application.');
      }
    });
  }
}
