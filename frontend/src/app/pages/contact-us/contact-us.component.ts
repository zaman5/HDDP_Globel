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
          <h1 class="t-h1">Let’s Talk About Your Recruitment Needs</h1>
          <p class="t-body mt-5">Tell us about your hiring priorities, current recruitment workflow, or back-office support requirements. We’ll follow up to discuss whether HDDP is a good fit.</p>

          <div class="photo-frame aspect-[4/3] mt-8">
            <img class="photo" src="assets/images/contact.jpg" width="1400" height="934" loading="lazy"
                 alt="HDDP team member at her desk wearing a headset" />
          </div>

          <dl class="mt-8 m-0">
            <div class="py-4 border-t border-line">
              <dt class="text-sm text-muted">Email</dt>
              <dd class="m-0"><a href="mailto:info@hddpconsultants.com" class="link">info&#64;hddpconsultants.com</a></dd>
            </div>
            <div class="py-4 border-t border-b border-line">
              <dt class="text-sm text-muted">Phone</dt>
              <dd class="m-0"><a href="tel:8005554337" class="link">(800) 555-4337</a></dd>
            </div>
          </dl>
        </div>

        <div>
          <div *ngIf="submitted()" class="bg-mist rounded-lg p-6 sm:p-10" role="status">
            <p class="t-body m-0 text-ink">Thank you for contacting HDDP Consultants. Your message has been received. A member of our team will review your request and contact you if there is a potential fit.</p>
            <button type="button" (click)="submitted.set(false)" class="btn btn-outline mt-6">Send another message</button>
          </div>

          <form *ngIf="!submitted()" (ngSubmit)="submitInquiry()" class="hd-form bg-mist rounded-lg p-6 sm:p-10 space-y-5" novalidate>
            <h2 class="t-h2">Request a Consultation</h2>
            <div class="grid gap-5 sm:grid-cols-2">
              <div>
                <label for="ct-name">Full name *</label>
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
                <label for="ct-phone">Phone (optional)</label>
                <input id="ct-phone" type="tel" autocomplete="tel" [(ngModel)]="formData.phone" name="phone" />
              </div>
            </div>
            <div>
              <label for="ct-topic">Type of support needed</label>
              <select id="ct-topic" [(ngModel)]="formData.inquiry_type" name="inquiry_type">
                <option value="Healthcare Talent Sourcing">Healthcare talent sourcing</option>
                <option value="Recruitment Process Outsourcing (RPO)">Recruitment process outsourcing (RPO)</option>
                <option value="Recruitment Operations Support">Recruitment operations support</option>
                <option value="Credentialing Documentation Coordination">Credentialing documentation coordination</option>
                <option value="Recruitment Partnership">A recruitment partnership</option>
                <option value="General Consultation">Something else</option>
              </select>
            </div>
            <div>
              <label for="ct-msg">Roles or project details *</label>
              <textarea id="ct-msg" rows="5" [(ngModel)]="formData.message" name="message" required placeholder="Roles, number of requisitions, locations and timeline"></textarea>
            </div>
            <fieldset>
              <legend class="block font-semibold text-ink text-[0.9rem] mb-2">Preferred contact method</legend>
              <div class="flex flex-wrap gap-6">
                <label *ngFor="let m of contactMethods" class="plain inline-flex items-center gap-2 text-[0.95rem]">
                  <input type="radio" name="contact_method" [value]="m" [(ngModel)]="contactMethod" class="accent-navy" /> {{ m }}
                </label>
              </div>
            </fieldset>
            <p class="t-small">We use these details only to respond to you. See our <a routerLink="/privacy-policy" class="link">privacy policy</a>.</p>
            <button type="submit" [disabled]="isSubmitting()" class="btn btn-primary">
              {{ isSubmitting() ? 'Sending…' : 'Request a Consultation' }}
            </button>
          </form>
        </div>
      </div>
    </section>
  `
})
export class ContactUsComponent {
  apiService = inject(ApiService);
  toastService = inject(ToastService);

  isSubmitting = signal<boolean>(false);
  submitted = signal<boolean>(false);

  contactMethods = ['Email', 'Phone'];
  contactMethod = 'Email';

  formData: ContactInquiry = this.emptyForm();

  submitInquiry() {
    const f = this.formData;
    if (!f.full_name.trim() || !f.email.trim() || !f.message.trim()) {
      this.toastService.error('Missing details', 'Please enter your full name, work email and roles or project details.');
      return;
    }

    this.isSubmitting.set(true);
    // The "subject" column holds the company name; the preferred contact method is added to the message
    this.apiService.submitContactInquiry({
      ...f,
      subject: f.subject.trim() || 'Not provided',
      message: `${f.message.trim()}

Preferred contact method: ${this.contactMethod}`
    }).subscribe({
      next: () => {
        this.isSubmitting.set(false);
        this.submitted.set(true);
        this.formData = this.emptyForm();
        this.contactMethod = 'Email';
      },
      error: (err) => {
        this.isSubmitting.set(false);
        this.toastService.error('Request not sent', err?.message || 'Please try again, or email info@hddpconsultants.com.');
      }
    });
  }

  private emptyForm(): ContactInquiry {
    return {
      full_name: '',
      email: '',
      phone: '',
      inquiry_type: 'Healthcare Talent Sourcing',
      subject: '',
      message: ''
    };
  }
}
