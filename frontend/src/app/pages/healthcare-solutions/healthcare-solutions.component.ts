import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

// Copy follows "HDDP USA Website Rewritten Copy", section 2 (Healthcare Recruitment Support).
@Component({
  selector: 'app-healthcare-solutions',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <!-- HERO -->
    <section class="band !pb-14">
      <div class="wrap grid gap-12 lg:grid-cols-12 lg:items-center">
        <div class="lg:col-span-7">
          <p class="t-kicker">Healthcare Recruitment Support</p>
          <h1 class="t-h1 max-w-[24ch]">Recruitment Support Built Around Your Healthcare Hiring Needs</h1>
          <p class="t-lede mt-5">HDDP works with U.S. healthcare staffing agencies and other eligible hiring partners to strengthen candidate sourcing, screening, and recruitment coordination.</p>
        </div>
        <div class="lg:col-span-5">
          <div class="photo-frame aspect-[4/3]">
            <img class="photo" src="assets/images/home-team.jpg" width="1400" height="933" fetchpriority="high"
                 alt="Recruitment team planning candidate sourcing together" />
          </div>
        </div>
      </div>
    </section>

    <!-- OUR ROLE -->
    <section id="our-role" class="band band-mist scroll-mt-20">
      <div class="wrap split">
        <h2 class="t-h2">Our role</h2>
        <p class="t-body m-0">We provide recruitment and administrative support to your existing hiring operation. Your organization retains responsibility for employment decisions, offers, engagement terms, credential approval, work assignments, supervision, and any regulated staffing activities.</p>
      </div>
    </section>

    <!-- ROLES WE CAN HELP SOURCE -->
    <section id="roles" class="band scroll-mt-20">
      <div class="wrap">
        <h2 class="t-h2">Roles we can help source</h2>
        <div class="mt-10 grid gap-10 md:grid-cols-3">
          <div *ngFor="let g of roleGroups">
            <div class="photo-frame aspect-[4/3]">
              <img class="photo" [src]="g.image" width="1400" height="933" loading="lazy" [alt]="g.alt" />
            </div>
            <h3 class="t-h3 mt-5">{{ g.group }}</h3>
            <ul class="tick-list mt-2">
              <li *ngFor="let r of g.roles">{{ r }}</li>
            </ul>
          </div>
        </div>
        <p class="notice t-small mt-10 mb-0 max-w-none">Candidate availability and suitability depend on the role, location, licensing requirements, and the hiring partner’s criteria. HDDP does not represent that a candidate is licensed or credentialed unless that status has been appropriately verified by the responsible party.</p>
      </div>
    </section>

    <!-- FLEXIBLE ENGAGEMENT MODELS -->
    <section id="engagement-models" class="band band-mist scroll-mt-20">
      <div class="wrap split">
        <h2 class="t-h2">Flexible engagement models</h2>
        <ul class="ruled">
          <li *ngFor="let m of engagementModels" class="font-heading font-semibold text-navy text-lg">{{ m }}</li>
        </ul>
      </div>
    </section>

    <!-- SCREENING AND DOCUMENTATION SUPPORT -->
    <section id="screening" class="band scroll-mt-20">
      <div class="wrap grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <h2 class="t-h2">Screening and documentation support</h2>
          <p class="t-body mt-4">Depending on the agreed scope, HDDP can review resumes against role criteria, conduct preliminary screening conversations, summarize candidate experience, coordinate interviews, and track documentation. The hiring partner is responsible for final interviews, reference and background checks where required, professional license verification, credentialing decisions, and hiring or engagement decisions.</p>
        </div>
        <div class="photo-frame aspect-[4/3]">
          <img class="photo" src="assets/images/interview.jpg" width="1400" height="934" loading="lazy"
               alt="Recruiter holding a preliminary screening conversation by video call" />
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="band-tight band-navy">
      <div class="wrap flex justify-center">
        <a routerLink="/contact-us" class="btn btn-light">Discuss a Recruitment Support Plan</a>
      </div>
    </section>
  `
})
export class HealthcareSolutionsComponent {
  roleGroups = [
    {
      group: 'Nursing',
      image: 'assets/images/nurse.jpg',
      alt: 'Nurse in teal scrubs',
      roles: ['Registered Nurses (RN)', 'Licensed Practical Nurses (LPN)', 'Certified Nursing Assistants (CNA)']
    },
    {
      group: 'Allied Health',
      image: 'assets/images/lab.jpg',
      alt: 'Laboratory technician using a pipette',
      roles: ['Radiology and imaging technicians', 'Laboratory technicians', 'Medical assistants']
    },
    {
      group: 'Healthcare Technology and Operations',
      image: 'assets/images/health-tech.jpg',
      alt: 'Healthcare technology specialist working at clinical data monitors',
      roles: ['Electronic health record (EHR) specialists', 'Clinical data and reporting analysts', 'Selected healthcare operations and administrative roles']
    }
  ];

  engagementModels = [
    'Per-requisition sourcing support',
    'Monthly recruitment support retainers',
    'Dedicated recruiter or small recruitment pod',
    'Project-based sourcing and pipeline development'
  ];
}
