import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="band">
      <div class="wrap split">
        <div>
          <p class="t-kicker">About HDDP Consultants</p>
          <h1 class="t-h1">Empowering workforces. Elevating healthcare staffing.</h1>
        </div>
        <div class="lg:pt-10">
          <p class="t-lede !text-ink">
            HDDP Consultants is a global workforce solutions firm delivering recruitment and staffing support across healthcare, IT, and professional services sectors.
          </p>
          <p class="t-body mt-5">
            In healthcare, we work behind hospital HR teams and nurse staffing agencies—mainly in the United States, and also in the United Kingdom and Canada—sourcing, screening and credentialing candidates so our clients can fill roles faster.
          </p>
          <p class="t-body mt-5">
            HDDP stands for Hiring, Development &amp; Deployment Process Consultants.
          </p>
        </div>
      </div>
    </section>

    <section class="band band-mist">
      <div class="wrap split">
        <h2 class="t-h2">Why clients choose HDDP</h2>
        <ul class="ruled">
          <li *ngFor="let s of strengths" class="def-row">
            <h3 class="t-h3">{{ s.title }}</h3>
            <p class="t-body m-0">{{ s.text }}</p>
          </li>
        </ul>
      </div>
    </section>

    <section class="band">
      <div class="wrap flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <h2 class="t-h2">Work with us</h2>
        <div class="flex flex-wrap gap-3">
          <a routerLink="/contact-us" class="btn btn-primary">Talk to our team</a>
          <a routerLink="/jobs" class="btn btn-outline">Find jobs</a>
        </div>
      </div>
    </section>
  `
})
export class AboutUsComponent {
  strengths = [
    { title: 'Speed', text: 'Qualified candidates within 48–96 hours of receiving a requisition.' },
    { title: 'Healthcare specialists', text: 'Recruiters who know US nursing specialties, licensure and the Nurse Licensure Compact.' },
    { title: 'Compliance first', text: 'Primary source verification on every candidate, and clear lines on what you and we each check.' },
    { title: 'We don’t compete with you', text: 'We never approach your clients or place candidates with them directly.' },
    { title: 'Scalable and cost-efficient', text: 'Offshore recruiting capacity that grows with your requisitions, without adding to your payroll.' }
  ];
}
