import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';
import { ContactInquiry } from '../../models/models';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <section class="band">
      <div class="wrap split">
        <div>
          <p class="t-kicker">Contact</p>
          <h1 class="t-h1">Let’s build your healthcare workforce</h1>
          <p class="t-body mt-5">Hire travel nurses, locum nurses and contract healthcare staff, or ask about RPO, credentialing, back-office support or staffing agency consulting. Tell us your requirements and we’ll recommend the right model.</p>

          <dl class="mt-10 m-0">
            <div class="py-4 border-t border-line">
              <dt class="text-sm text-muted">Email</dt>
              <dd class="m-0"><a href="mailto:staffing@hddpconsultants.com" class="link">staffing&#64;hddpconsultants.com</a></dd>
            </div>
            <div class="py-4 border-t border-b border-line">
              <dt class="text-sm text-muted">Phone</dt>
              <dd class="m-0"><a href="tel:8005554337" class="link">(800) 555-4337</a></dd>
            </div>
          </dl>
          <p class="t-small mt-6">Looking for a job? <a routerLink="/jobs" class="link">See open jobs</a> instead.</p>
        </div>

        <form (ngSubmit)="submitInquiry()" class="hd-form bg-mist rounded-lg p-6 sm:p-10 space-y-5" novalidate>
          <h2 class="t-h2">Talk to our team</h2>
          <div class="grid gap-5 sm:grid-cols-2">
            <div>
              <label for="ct-name">Name *</label>
              <input id="ct-name" type="text" autocomplete="name" [(ngModel)]="formData.full_name" name="full_name" required />
            </div>
            <div>
              <label for="ct-company">Company</label>
              <input id="ct-company" type="text" autocomplete="organization" [(ngModel)]="formData.subject" name="subject" />
            </div>
            <div>
              <label for="ct-email">Work email *</label>
              <input id="ct-email" type="email" autocomplete="email" [(ngModel)]="formData.email" name="email" required />
            </div>
            <div>
              <label for="ct-phone">Phone</label>
              <input id="ct-phone" type="tel" autocomplete="tel" [(ngModel)]="formData.phone" name="phone" />
            </div>
          </div>
          <div>
            <label for="ct-topic">What do you need?</label>
            <select id="ct-topic" [(ngModel)]="formData.inquiry_type" name="inquiry_type">
              <option value="Talent Request">Candidates for open roles</option>
              <option value="Staffing Agency Partnership">A recruitment partnership</option>
              <option value="Credentialing & Back-Office Support">Credentialing or back-office support</option>
              <option value="Staffing Agency Consulting">Starting or growing a staffing agency</option>
              <option value="Candidate Inquiry">I’m a candidate</option>
              <option value="General Consultation">Something else</option>
            </select>
          </div>
          <div>
            <label for="ct-msg">Requirement details *</label>
            <textarea id="ct-msg" rows="5" [(ngModel)]="formData.message" name="message" required placeholder="Roles needed, number of openings, locations and timeline"></textarea>
          </div>
          <p class="t-small">We use these details only to respond to you. See our <a routerLink="/privacy-policy" class="link">privacy policy</a>.</p>
          <button type="submit" [disabled]="isSubmitting()" class="btn btn-primary">
            {{ isSubmitting() ? 'Sending…' : 'Send message' }}
          </button>
        </form>
      </div>
    </section>
  `
})
export class ContactUsComponent {
  apiService = inject(ApiService);
  toastService = inject(ToastService);

  isSubmitting = signal<boolean>(false);

  formData: ContactInquiry = this.emptyForm();

  submitInquiry() {
    const f = this.formData;
    if (!f.full_name.trim() || !f.email.trim() || !f.message.trim()) {
      this.toastService.error('Missing details', 'Please enter your name, work email and requirement details.');
      return;
    }

    this.isSubmitting.set(true);
    // The "subject" column holds the company name
    this.apiService.submitContactInquiry({ ...f, subject: f.subject.trim() || 'Not provided' }).subscribe({
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

  private emptyForm(): ContactInquiry {
    return {
      full_name: '',
      email: '',
      phone: '',
      inquiry_type: 'Talent Request',
      subject: '',
      message: ''
    };
  }
}
