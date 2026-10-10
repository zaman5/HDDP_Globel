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
            In healthcare, we work as a recruitment partner to nurse and healthcare staffing agencies in the United States, United Kingdom and Canada—sourcing, screening and preparing candidates so our partners can place them faster.
          </p>
          <p class="t-body mt-5">
            HDDP stands for Hiring, Development &amp; Deployment Process Consultants.
          </p>
        </div>
      </div>
    </section>

    <section class="band band-mist">
      <div class="wrap split">
        <h2 class="t-h2">Our strengths</h2>
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
          <a routerLink="/partner-with-us" class="btn btn-primary">Partner with us</a>
          <a routerLink="/candidates" class="btn btn-outline">See open jobs</a>
        </div>
      </div>
    </section>
  `
})
export class AboutUsComponent {
  strengths = [
    { title: 'Global sourcing capabilities', text: 'Recruiters who source candidates for roles in the USA, UK and Canada.' },
    { title: 'Proven recruitment systems', text: 'A structured five-step process, from requirement analysis to delivery and follow-up.' },
    { title: 'Scalable offshore operations', text: 'Recruitment capacity that grows with your requisitions, without adding to your payroll.' }
  ];
}
