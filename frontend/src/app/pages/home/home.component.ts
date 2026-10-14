import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

// Copy follows "HDDP USA Website Rewritten Copy", section 1 (Home Page).
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <!-- HERO -->
    <section class="band !pt-16 lg:!pt-20">
      <div class="wrap grid gap-12 lg:grid-cols-12 lg:items-center">
        <div class="lg:col-span-7">
          <h1 class="t-display max-w-[20ch]">Helping Healthcare Staffing Teams Find the Talent They Need</h1>
          <p class="t-lede mt-6">
            HDDP Consultants supports U.S. healthcare staffing agencies with targeted talent sourcing, recruitment operations, and scalable back-office support, helping teams work more efficiently and respond to hiring needs with confidence.
          </p>
          <p class="t-body mt-4">
            From building candidate pipelines to coordinating interviews and supporting documentation workflows, we extend your recruitment capacity without adding unnecessary operational complexity.
          </p>
          <div class="mt-8 flex flex-wrap gap-3">
            <a routerLink="/contact-us" class="btn btn-primary">Discuss Your Hiring Needs</a>
            <a routerLink="/who-we-serve" class="btn btn-outline">Become a Recruitment Partner</a>
          </div>
        </div>
        <div class="lg:col-span-5">
          <div class="photo-frame aspect-[4/3] lg:aspect-[4/5] shadow-[0_18px_40px_-18px_rgba(11,60,93,0.35)]">
            <img class="photo" src="assets/images/home-hero.jpg" width="1400" height="933" fetchpriority="high"
                 alt="Recruiter working on a laptop with a stethoscope on the desk" />
          </div>
        </div>
      </div>
    </section>

    <!-- TRUST AND CAPABILITY STRIP -->
    <section class="border-y border-line">
      <ul class="wrap grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 list-none m-0">
        <li *ngFor="let t of trust; let i = index" class="py-6 pr-4 flex items-start gap-3 border-line" [ngClass]="i > 0 ? 'lg:border-l lg:pl-8' : ''">
          <span class="material-symbols-outlined text-teal-ink text-[24px] leading-none" aria-hidden="true">{{ t.icon }}</span>
          <span class="font-heading font-semibold text-navy">{{ t.text }}</span>
        </li>
      </ul>
    </section>

    <!-- THE CHALLENGE AND HOW WE HELP -->
    <section class="band">
      <div class="wrap grid gap-12 lg:grid-cols-2 lg:items-center">
        <div class="photo-frame aspect-[4/3] order-last lg:order-first">
          <img class="photo" src="assets/images/home-team.jpg" width="1400" height="933" loading="lazy"
               alt="Recruitment team reviewing candidate pipelines together on a laptop" />
        </div>
        <div>
          <h2 class="t-h2">The challenge—and how we help</h2>
          <h3 class="t-h3 mt-6">Recruitment teams face growing demands</h3>
          <p class="t-body mt-3">Healthcare staffing agencies often manage high volumes of requisitions, hard-to-reach candidates, time-sensitive hiring needs, and resource-intensive coordination.</p>
          <h3 class="t-h3 mt-8">HDDP adds capacity where it matters</h3>
          <ul class="tick-list mt-3">
            <li *ngFor="let h of help">{{ h }}</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- CORE SERVICES -->
    <section class="band band-mist">
      <div class="wrap split">
        <h2 class="t-h2">Core services</h2>
        <ul class="ruled">
          <li *ngFor="let s of services" class="def-row">
            <h3 class="t-h3">{{ s.title }}</h3>
            <p class="t-body m-0">{{ s.text }}</p>
          </li>
        </ul>
      </div>
    </section>

    <!-- HOW IT WORKS -->
    <section class="band">
      <div class="wrap">
        <h2 class="t-h2 mb-10">How it works</h2>
        <ol class="steps steps-row">
          <li *ngFor="let step of steps"><span class="font-semibold text-navy">{{ step }}</span></li>
        </ol>
        <p class="notice mt-10 mb-0 font-heading font-semibold text-navy">Flexible recruitment support aligned with your priorities and service-level expectations.</p>
      </div>
    </section>

    <!-- WHY HDDP -->
    <section class="band band-mist">
      <div class="wrap grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <h2 class="t-h2">Why HDDP</h2>
          <ul class="tick-list mt-6">
            <li *ngFor="let w of why">{{ w }}</li>
          </ul>
        </div>
        <div class="photo-frame aspect-[4/3]">
          <img class="photo" src="assets/images/interview.jpg" width="1400" height="934" loading="lazy"
               alt="Recruiter coordinating a candidate video interview" />
        </div>
      </div>
    </section>

    <!-- CLOSING CTA -->
    <section class="band band-navy">
      <div class="wrap flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
        <div>
          <h2 class="t-h1">Need More Recruitment Capacity?</h2>
          <p class="mt-3 text-lg text-white/80">Let’s discuss your current hiring priorities and identify a support model that fits your team.</p>
        </div>
        <div class="flex flex-wrap gap-3 shrink-0">
          <a routerLink="/contact-us" class="btn btn-light">Schedule a Consultation</a>
        </div>
      </div>
    </section>
  `
})
export class HomeComponent {
  trust = [
    { icon: 'workspace_premium', text: 'Recruitment and workforce solutions experience' },
    { icon: 'public', text: 'Global talent-sourcing reach' },
    { icon: 'tune', text: 'Flexible, scalable recruitment support' },
    { icon: 'forum', text: 'Responsive delivery and clear communication' }
  ];

  help = [
    'Build targeted candidate pipelines for open requirements.',
    'Provide structured screening and candidate summaries.',
    'Coordinate interviews and recruitment follow-up.',
    'Support documentation tracking and credentialing workflows.',
    'Extend internal teams through dedicated or project-based recruitment support.'
  ];

  services = [
    { title: 'Healthcare Talent Sourcing', text: 'We identify and engage potential candidates against your role criteria, experience requirements, location preferences, and availability needs. Candidate profiles are shared with the hiring partner for its independent review and decision-making.' },
    { title: 'Recruitment Process Outsourcing (RPO)', text: 'Add flexible recruitment capacity through dedicated recruiters who work to your agreed processes, priorities, and reporting requirements.' },
    { title: 'Recruitment Operations Support', text: 'Keep your pipeline moving with interview scheduling, candidate communication, database updates, requisition tracking, and recruitment reporting.' },
    { title: 'Credentialing Documentation Coordination', text: 'We can help track required documents, follow up on outstanding items, and coordinate administrative workflows. Final credential verification, licensing determinations, and approval remain with the responsible hiring organization or authorized provider.' }
  ];

  steps = [
    'Understand your roles, workflow, and service expectations.',
    'Develop a focused sourcing plan.',
    'Identify and screen candidates against agreed criteria.',
    'Coordinate candidate information and required documentation.',
    'Submit profiles to your team and support follow-up.'
  ];

  why = [
    'A practical extension of your recruitment team',
    'Flexible engagement options from individual requisitions to dedicated support',
    'Structured sourcing, screening, and reporting workflows',
    'Global delivery capabilities and cost-conscious operations',
    'A partner focused on responsiveness, transparency, and long-term collaboration'
  ];
}
