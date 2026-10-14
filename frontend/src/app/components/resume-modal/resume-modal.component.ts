import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ModalService } from '../../services/modal.service';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';
import { DialogDirective } from '../dialog.directive';

const ALLOWED_EXTENSIONS = ['.pdf', '.doc', '.docx', '.rtf', '.txt'];
const MAX_FILE_BYTES = 10 * 1024 * 1024;

@Component({
  selector: 'app-resume-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, DialogDirective],
  template: `
    <div *ngIf="modalService.isResumeModalOpen()" class="fixed inset-0 z-[9990] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
      <div appDialog (dialogClose)="modalService.closeResumeModal()" role="dialog" aria-modal="true" aria-labelledby="rm-title" tabindex="-1" class="outline-none bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] animate-slide-up">

        <!-- Header -->
        <div class="bg-navy text-white px-6 py-5 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <span class="material-symbols-outlined text-white text-[24px]" aria-hidden="true">clinical_notes</span>
            </div>
            <div>
              <h2 id="rm-title" class="font-heading text-lg font-bold text-white m-0">Submit your resume</h2>
              <p class="text-sm text-white/75">Join our talent network for nursing and healthcare roles in the USA, UK and Canada</p>
            </div>
          </div>
          <button type="button" (click)="modalService.closeResumeModal()" aria-label="Close" class="text-white/75 hover:text-white p-1 rounded">
            <span class="material-symbols-outlined text-[24px]" aria-hidden="true">close</span>
          </button>
        </div>

        <!-- Form -->
        <form (ngSubmit)="submitApplication()" class="hd-form p-6 overflow-y-auto space-y-4 text-sm flex-1" novalidate>

          <div *ngIf="modalService.selectedJobTitle()" class="bg-[#eff4ff] p-3 rounded-xl border border-[#004b87]/20 flex items-center gap-2 text-[#003461]">
            <span class="material-symbols-outlined text-[20px] text-[#004b87]" aria-hidden="true">work</span>
            <span class="text-xs font-semibold">Applying for: <strong>{{ modalService.selectedJobTitle() }}</strong></span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label for="rm-first" class="block font-semibold text-slate-700 mb-1">First Name *</label>
              <input id="rm-first" type="text" autocomplete="given-name" [(ngModel)]="formData.first_name" name="first_name" required class="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#006a68] text-slate-900" />
            </div>
            <div>
              <label for="rm-last" class="block font-semibold text-slate-700 mb-1">Last Name *</label>
              <input id="rm-last" type="text" autocomplete="family-name" [(ngModel)]="formData.last_name" name="last_name" required class="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#006a68] text-slate-900" />
            </div>
            <div>
              <label for="rm-email" class="block font-semibold text-slate-700 mb-1">Email Address *</label>
              <input id="rm-email" type="email" autocomplete="email" [(ngModel)]="formData.email" name="email" required class="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#006a68] text-slate-900" />
            </div>
            <div>
              <label for="rm-phone" class="block font-semibold text-slate-700 mb-1">Phone (with country code) *</label>
              <input id="rm-phone" type="tel" autocomplete="tel" [(ngModel)]="formData.phone" name="phone" required placeholder="e.g. +1 312 555 0100" class="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#006a68] text-slate-900" />
            </div>
            <div>
              <label for="rm-country" class="block font-semibold text-slate-700 mb-1">Country You Live In *</label>
              <select id="rm-country" autocomplete="country-name" [(ngModel)]="formData.country" name="country" class="w-full px-3 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#006a68] bg-white text-slate-900">
                <option value="United States">United States</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Canada">Canada</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label for="rm-city" class="block font-semibold text-slate-700 mb-1">City / Town</label>
              <input id="rm-city" type="text" autocomplete="address-level2" [(ngModel)]="formData.current_city" name="current_city" class="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#006a68] text-slate-900" />
            </div>
            <div>
              <label for="rm-role" class="block font-semibold text-slate-700 mb-1">Role *</label>
              <select id="rm-role" [(ngModel)]="formData.specialty" name="specialty" class="w-full px-3 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#006a68] bg-white text-slate-900">
                <option value="Registered Nurse (RN)">Registered Nurse (RN)</option>
                <option value="Licensed / Registered Practical Nurse (LPN / RPN)">Licensed / Registered Practical Nurse (LPN / RPN)</option>
                <option value="Nursing Assistant (CNA / HCA / PSW)">Nursing Assistant (CNA / HCA / PSW)</option>
                <option value="Allied Health - Radiology Technician">Radiology Technician / Radiographer</option>
                <option value="Allied Health - Lab Technician">Lab Technician</option>
                <option value="Allied Health - Medical Assistant">Medical Assistant</option>
                <option value="Healthcare IT - EHR Specialist">EHR Specialist</option>
                <option value="Healthcare IT - Clinical Data Analyst">Clinical Data Analyst</option>
              </select>
            </div>
            <div>
              <label for="rm-exp" class="block font-semibold text-slate-700 mb-1">Years of Experience</label>
              <select id="rm-exp" [(ngModel)]="formData.years_experience" name="years_experience" class="w-full px-3 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#006a68] bg-white text-slate-900">
                <option value="Less than 1 Year">Less than 1 Year</option>
                <option value="1-2 Years">1 - 2 Years</option>
                <option value="3-5 Years">3 - 5 Years</option>
                <option value="6-10 Years">6 - 10 Years</option>
                <option value="10+ Years">10+ Years</option>
              </select>
            </div>
            <div class="sm:col-span-2">
              <label for="rm-license" class="block font-semibold text-slate-700 mb-1">Licence / Registration &amp; Certifications</label>
              <input id="rm-license" type="text" [(ngModel)]="formData.license_type" name="license_type" placeholder="e.g. RN (Texas), NCLEX-RN, NMC PIN, CNO registration, BLS" class="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#006a68] text-slate-900" />
            </div>
            <div *ngIf="formData.country === 'United States'" class="sm:col-span-2">
              <label for="rm-compact" class="block font-semibold text-slate-700 mb-1">Do you hold a multistate licence under the Nurse Licensure Compact (NLC)?</label>
              <select id="rm-compact" [(ngModel)]="formData.compact_license" name="compact_license" class="w-full px-3 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#006a68] bg-white text-slate-900">
                <option [ngValue]="false">No, or not applicable</option>
                <option [ngValue]="true">Yes, multistate (compact) licence</option>
              </select>
            </div>
            <div class="sm:col-span-2">
              <label for="rm-auth" class="block font-semibold text-slate-700 mb-1">Are you legally authorized to work in the country where you want to work? *</label>
              <select id="rm-auth" [(ngModel)]="formData.work_authorization" name="work_authorization" class="w-full px-3 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#006a68] bg-white text-slate-900">
                <option value="" disabled>Select an answer</option>
                <option value="Yes">Yes</option>
                <option value="Yes - requires visa sponsorship">Yes, but I will need visa sponsorship in future</option>
                <option value="No - requires visa sponsorship">No, I would need visa sponsorship</option>
              </select>
            </div>
          </div>

          <!-- Resume Upload -->
          <div>
            <span id="rm-cv-label" class="block font-semibold text-slate-700 mb-1">CV / Resume *</span>
            <label for="rm-cv" class="plain flex flex-col items-center gap-1 border-2 border-dashed p-5 rounded-xl text-center cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-[#006a68]"
              [ngClass]="selectedFileName() ? 'border-emerald-400 bg-emerald-50' : 'border-slate-300 hover:border-[#006a68] bg-slate-50'">
              <span class="material-symbols-outlined text-[32px] text-[#006a68]" aria-hidden="true">{{ selectedFileName() ? 'task' : 'cloud_upload' }}</span>
              <span class="font-semibold text-slate-800 text-xs">{{ selectedFileName() || 'Click to upload (PDF, DOC, DOCX, RTF, TXT • max 10 MB)' }}</span>
              <span class="text-[11px] text-slate-500">Please leave out date of birth, photo, ID numbers and health details.</span>
              <input id="rm-cv" type="file" class="sr-only" aria-labelledby="rm-cv-label" accept=".pdf,.doc,.docx,.rtf,.txt" (change)="onFileSelected($event)" />
            </label>
          </div>

          <div class="flex items-start gap-3 p-3 rounded-xl bg-[#F5F7FA] border border-slate-200">
            <input id="rm-consent" type="checkbox" [(ngModel)]="formData.privacy_consent" name="privacy_consent" class="mt-0.5 h-5 w-5 shrink-0 rounded border-slate-400 text-[#006a68] focus:ring-[#006a68]" />
            <label for="rm-consent" class="plain text-xs text-slate-700 leading-relaxed">
              I have read the <a routerLink="/privacy-policy" target="_blank" class="text-[#004b87] font-semibold underline">Privacy Policy</a> and agree that HDDP Consultants may store my details and CV, process them (including by our team outside my country), and share them with partner staffing agencies and healthcare providers for suitable roles. I can withdraw consent or ask for deletion at any time. *
            </label>
          </div>
          <div class="flex items-start gap-3 px-3">
            <input id="rm-sms" type="checkbox" [(ngModel)]="formData.sms_consent" name="sms_consent" class="mt-0.5 h-5 w-5 shrink-0 rounded border-slate-400 text-[#006a68] focus:ring-[#006a68]" />
            <label for="rm-sms" class="plain text-xs text-slate-700 leading-relaxed">
              Optional: text me about suitable roles at the number above. Up to 4 messages a week; message and data rates may apply. Reply STOP to opt out or HELP for help. Not a condition of applying.
            </label>
          </div>
          <p class="px-3 text-xs text-slate-600">California residents: see our <a routerLink="/privacy-policy" fragment="us-rights" target="_blank" class="text-[#004b87] font-semibold underline">notice at collection</a>.</p>

          <!-- Action Buttons -->
          <div class="pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
            <button type="button" (click)="modalService.closeResumeModal()" class="px-5 py-2.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold transition-colors">
              Cancel
            </button>
            <button type="submit" [disabled]="isSubmitting()" class="btn btn-primary">
              <span>{{ isSubmitting() ? 'Submitting...' : 'Submit Application' }}</span>
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

  formData = this.emptyForm();

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
    this.selectedFile = file;
    this.selectedFileName.set(file.name);
  }

  submitApplication() {
    const f = this.formData;
    if (!f.first_name.trim() || !f.last_name.trim() || !f.email.trim() || !f.phone.trim()) {
      this.toastService.error('Required Fields', 'Please provide your first name, last name, email, and phone number.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) {
      this.toastService.error('Invalid Email', 'Please enter a valid email address.');
      return;
    }
    if (!f.work_authorization) {
      this.toastService.error('Work Authorization', 'Please answer the work authorization question.');
      return;
    }
    if (!this.selectedFile) {
      this.toastService.error('CV Required', 'Please upload your CV / resume.');
      return;
    }
    if (!f.privacy_consent) {
      this.toastService.error('Consent Required', 'Please confirm you have read the Privacy Policy and agree to your application being processed.');
      return;
    }

    this.isSubmitting.set(true);
    const postData = new FormData();
    postData.append('first_name', f.first_name.trim());
    postData.append('last_name', f.last_name.trim());
    postData.append('email', f.email.trim());
    postData.append('phone', f.phone.trim());
    postData.append('specialty', f.specialty);
    postData.append('license_type', f.license_type.trim());
    postData.append('years_experience', f.years_experience);
    postData.append('country', f.country);
    postData.append('current_city', f.current_city.trim());
    postData.append('work_authorization', f.work_authorization);
    postData.append('privacy_consent', 'true');
    postData.append('sms_consent', String(!!f.sms_consent));
    postData.append('compact_license', String(f.country === 'United States' && !!f.compact_license));
    const jobTitle = this.modalService.selectedJobTitle();
    if (jobTitle) postData.append('job_title', jobTitle);
    postData.append('resume', this.selectedFile, this.selectedFile.name);

    this.apiService.submitCandidateApplication(postData).subscribe({
      next: () => {
        this.isSubmitting.set(false);
        this.toastService.success('Application received', 'Thank you. Our team may contact you to clarify your experience and job preferences.');
        this.modalService.closeResumeModal();
        this.formData = this.emptyForm();
        this.selectedFile = null;
        this.selectedFileName.set('');
      },
      error: (err) => {
        this.isSubmitting.set(false);
        this.toastService.error('Upload Error', err?.message || 'Could not submit application.');
      }
    });
  }

  private emptyForm() {
    return {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      country: 'United States',
      current_city: '',
      specialty: 'Registered Nurse (RN)',
      license_type: '',
      years_experience: '1-2 Years',
      work_authorization: '',
      privacy_consent: false,
      sms_consent: false,
      compact_license: false
    };
  }
}
