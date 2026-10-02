import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';
import { ContactInquiry } from '../../models/models';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="flex flex-col w-full">
      
      <!-- HERO -->
      <section class="bg-[#003461] text-white py-16 lg:py-24 px-6 lg:px-12 relative overflow-hidden">
        <div class="max-w-7xl mx-auto relative z-10 text-center max-w-3xl mx-auto">
          <span class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-xs font-bold uppercase tracking-wider text-[#86f4f1] mb-4">
            Connect With HDDP Consultants
          </span>
          <h1 class="font-heading text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            We Are Here to Support Your Clinical Mission
          </h1>
          <p class="mt-4 text-base sm:text-lg text-slate-200 leading-relaxed">
            Have questions about candidate placements, hospital partnerships, or custom staffing SLA contracts? Our dedicated healthcare recruitment advisors are standing by.
          </p>
        </div>
      </section>

      <!-- CONTACT DETAILS & FORM -->
      <section class="py-16 lg:py-24 bg-[#F5F7FA]">
        <div class="max-w-7xl mx-auto px-6 lg:px-12">
          
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            <!-- Left Contact Info Cards -->
            <div class="lg:col-span-5 flex flex-col gap-6">
              
              <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
                <div class="w-12 h-12 rounded-xl bg-[#004b87] text-white flex items-center justify-center shrink-0">
                  <span class="material-symbols-outlined text-[24px]">call</span>
                </div>
                <div>
                  <h3 class="font-heading text-base font-bold text-[#003461]">Toll-Free Enterprise Hotline</h3>
                  <p class="text-xs text-slate-500 mt-0.5">24/7 Rapid Response Staffing Line</p>
                  <a href="tel:8005554337" class="text-sm font-bold text-[#004b87] hover:underline mt-1 block">(800) 555-HDDP (4337)</a>
                </div>
              </div>

              <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
                <div class="w-12 h-12 rounded-xl bg-[#006a68] text-white flex items-center justify-center shrink-0">
                  <span class="material-symbols-outlined text-[24px]">mail</span>
                </div>
                <div>
                  <h3 class="font-heading text-base font-bold text-[#003461]">Email Communications</h3>
                  <p class="text-xs text-slate-500 mt-0.5">Direct Requisition & Inquiry Ingestion</p>
                  <a href="mailto:staffing@hddpconsultants.com" class="text-sm font-bold text-[#004b87] hover:underline mt-1 block">staffing&#64;hddpconsultants.com</a>
                </div>
              </div>

              <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
                <div class="w-12 h-12 rounded-xl bg-[#0B3C5D] text-white flex items-center justify-center shrink-0">
                  <span class="material-symbols-outlined text-[24px]">location_on</span>
                </div>
                <div>
                  <h3 class="font-heading text-base font-bold text-[#003461]">National Headquarters</h3>
                  <p class="text-xs text-slate-500 mt-0.5">Corporate Operations & Credentialing Center</p>
                  <p class="text-xs text-slate-700 font-medium mt-1">100 Enterprise Parkway, Suite 400<br>Chicago, IL 60601</p>
                </div>
              </div>

              <!-- Live Database Status Widget -->
              <div class="bg-[#eff4ff] p-5 rounded-2xl border border-[#004b87]/20 text-xs text-[#003461]">
                <div class="flex items-center gap-2 font-bold mb-1">
                  <span class="w-2.5 h-2.5 rounded-full bg-[#5FCF80] animate-pulse"></span>
                  <span>Live REST API & Database Synchronized</span>
                </div>
                <p class="text-slate-600">All submissions are instantly recorded into the backend database and delivered to account directors.</p>
              </div>

            </div>

            <!-- Right Interactive Form -->
            <div class="lg:col-span-7 bg-white p-8 rounded-3xl border border-slate-200 shadow-xl">
              <h2 class="font-heading text-2xl font-bold text-[#003461] mb-1">Send a Message or Consultation Request</h2>
              <p class="text-xs text-slate-500 mb-6">Our clinical staffing team responds to all formal inquiries within 24 business hours.</p>

              <form (ngSubmit)="submitInquiry()" class="space-y-4">
                
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs font-bold uppercase text-slate-700 mb-1">Full Name *</label>
                    <input 
                      type="text" 
                      [(ngModel)]="formData.full_name" 
                      name="full_name" 
                      required 
                      placeholder="e.g. Amanda Roberts" 
                      class="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#004b87] text-sm text-slate-900" />
                  </div>
                  <div>
                    <label class="block text-xs font-bold uppercase text-slate-700 mb-1">Work Email *</label>
                    <input 
                      type="email" 
                      [(ngModel)]="formData.email" 
                      name="email" 
                      required 
                      placeholder="e.g. amanda&#64;healthnetwork.com" 
                      class="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#004b87] text-sm text-slate-900" />
                  </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs font-bold uppercase text-slate-700 mb-1">Phone Number</label>
                    <input 
                      type="tel" 
                      [(ngModel)]="formData.phone" 
                      name="phone" 
                      placeholder="e.g. (312) 555-0188" 
                      class="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#004b87] text-sm text-slate-900" />
                  </div>
                  <div>
                    <label class="block text-xs font-bold uppercase text-slate-700 mb-1">Inquiry Category</label>
                    <select 
                      [(ngModel)]="formData.inquiry_type" 
                      name="inquiry_type" 
                      class="w-full px-3 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#004b87] bg-white text-sm text-slate-900">
                      <option value="Hospital Staffing Requisition">Hospital Staffing Requisition</option>
                      <option value="Staffing Agency Partnership">Staffing Agency Partnership</option>
                      <option value="Candidate & Clinician Support">Candidate & Clinician Support</option>
                      <option value="Credentialing & Compliance Audit">Credentialing & Compliance Audit</option>
                      <option value="General Consultation">General Consultation</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label class="block text-xs font-bold uppercase text-slate-700 mb-1">Subject *</label>
                  <input 
                    type="text" 
                    [(ngModel)]="formData.subject" 
                    name="subject" 
                    required 
                    placeholder="e.g. Inquiry regarding ICU Travel RN Requisitions" 
                    class="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#004b87] text-sm text-slate-900" />
                </div>

                <div>
                  <label class="block text-xs font-bold uppercase text-slate-700 mb-1">Message / Consultation Details *</label>
                  <textarea 
                    rows="4" 
                    [(ngModel)]="formData.message" 
                    name="message" 
                    required 
                    placeholder="Please provide details about your facility requirements, volume, or clinical inquiries..." 
                    class="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#004b87] text-sm text-slate-900 resize-none"></textarea>
                </div>

                <button 
                  type="submit" 
                  [disabled]="isSubmitting()" 
                  class="w-full py-3.5 rounded-xl bg-[#004b87] hover:bg-[#0B3C5D] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50">
                  <span *ngIf="!isSubmitting()">Transmit Message</span>
                  <span *ngIf="isSubmitting()">Sending Message...</span>
                  <span class="material-symbols-outlined text-[18px]">send</span>
                </button>

              </form>
            </div>

          </div>

        </div>
      </section>

    </div>
  `
})
export class ContactUsComponent {
  apiService = inject(ApiService);
  toastService = inject(ToastService);

  isSubmitting = signal<boolean>(false);

  formData: ContactInquiry = {
    full_name: '',
    email: '',
    phone: '',
    inquiry_type: 'Hospital Staffing Requisition',
    subject: '',
    message: ''
  };

  submitInquiry() {
    if (!this.formData.full_name || !this.formData.email || !this.formData.message) {
      this.toastService.error('Missing Required Fields', 'Please complete Name, Email, and Message.');
      return;
    }

    this.isSubmitting.set(true);
    this.apiService.submitContactInquiry(this.formData).subscribe({
      next: (res) => {
        this.isSubmitting.set(false);
        this.toastService.success('Message Transmitted!', 'Your consultation request has been submitted to the MySQL database.');
        this.formData = {
          full_name: '',
          email: '',
          phone: '',
          inquiry_type: 'Hospital Staffing Requisition',
          subject: '',
          message: ''
        };
      },
      error: (err) => {
        this.isSubmitting.set(false);
        this.toastService.error('Transmission Failed', err.error?.message || 'Could not send message.');
      }
    });
  }
}
