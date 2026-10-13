import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <!-- HERO -->
    <section class="band !pt-16 lg:!pt-20">
      <div class="wrap grid gap-14 lg:grid-cols-12 lg:items-center">
        <div class="lg:col-span-7">
          <p class="t-kicker">Recruitment partner for hospital HR teams and nurse staffing agencies</p>
          <h1 class="t-display max-w-[19ch]">Connecting healthcare talent to where it matters most</h1>
          <p class="t-lede mt-6">
            HDDP Consultants works behind US hospital HR teams and nurse staffing agencies to deliver pre-screened, credential-ready nurses and healthcare professionals—quickly, efficiently and at scale. We also support clients in the UK and Canada.
          </p>
          <p class="t-body mt-4">
            From critical staffing shortages to urgent placements, we act as your extended recruitment engine—helping you fill roles faster while reducing hiring costs and operational strain.
          </p>
          <div class="mt-8 flex flex-wrap gap-3">
            <button type="button" (click)="modalService.openRequestTalent()" class="btn btn-primary">Request talent</button>
            <a routerLink="/how-it-works" class="btn btn-outline">See how it works</a>
          </div>
        </div>

        <!-- What partners receive: a candidate summary -->
        <figure class="lg:col-span-5 m-0">
          <div class="bg-white border border-line rounded-lg shadow-[0_18px_40px_-18px_rgba(11,60,93,0.35)]">
            <div class="px-6 pt-5 pb-4 border-b border-line flex items-start justify-between gap-4">
              <div>
                <p class="text-sm text-muted">Candidate summary</p>
                <p class="font-heading font-semibold text-navy text-lg leading-snug">Registered Nurse, Med-Surg</p>
              </div>
              <span class="text-xs font-semibold text-teal-ink bg-mist border border-line rounded px-2 py-1 whitespace-nowrap">Ready to submit</span>
            </div>

            <div class="px-6 py-5 border-b border-line">
              <div class="flex justify-between text-sm">
                <span class="text-muted">Requirement received</span>
                <span class="font-semibold">0 h</span>
              </div>
              <div class="relative mt-3 h-2 rounded-full bg-mist" aria-hidden="true">
                <div class="absolute inset-y-0 left-1/2 right-0 rounded-r-full bg-teal/25"></div>
                <div class="absolute inset-y-0 left-0 w-[54%] rounded-l-full bg-teal"></div>
                <div class="absolute -top-1 left-[54%] -ml-2 h-4 w-4 rounded-full border-[3px] border-white bg-navy shadow"></div>
              </div>
              <div class="mt-2 flex justify-between text-xs text-muted">
                <span>0 h</span><span>48 h</span><span>96 h</span>
              </div>
              <p class="mt-3 text-sm"><span class="font-semibold text-navy">Submitted at 52 hours</span>, inside the 48–96 hour window.</p>
            </div>

            <ul class="px-6 py-4 m-0 list-none text-sm">
              <li *ngFor="let c of checks" class="flex items-center justify-between gap-4 py-2 border-b border-line last:border-0">
                <span>{{ c.label }}</span>
                <span class="flex items-center gap-1.5 font-semibold" [ngClass]="c.done ? 'text-teal-ink' : 'text-muted'">
                  <span class="inline-block h-2.5 w-2.5 rounded-full" [ngClass]="c.done ? 'bg-[#5FCF80]' : 'border-2 border-teal'"></span>
                  {{ c.state }}
                </span>
              </li>
            </ul>
          </div>
          <figcaption class="mt-3 text-sm text-muted">Example of the summary sent with each candidate.</figcaption>
        </figure>
      </div>
    </section>

    <!-- TRUST BAR -->
    <section class="border-y border-line">
      <div class="wrap grid grid-cols-2 lg:grid-cols-4">
        <div *ngFor="let t of trust; let i = index" class="py-7 pr-4 border-line" [ngClass]="i > 0 ? 'lg:border-l lg:pl-8' : ''">
          <p class="font-heading font-semibold text-navy text-lg">{{ t.title }}</p>
          <p class="text-sm text-muted mt-1">{{ t.text }}</p>
        </div>
      </div>
    </section>

    <!-- PROBLEM → SOLUTION -->
    <section class="band">
      <div class="wrap split">
        <div>
          <h2 class="t-h2">Healthcare staffing challenges, and how HDDP solves them</h2>
        </div>
        <div>
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="text-sm text-muted">
                <th scope="col" class="font-semibold pb-3 w-1/2">The challenge</th>
                <th scope="col" class="font-semibold pb-3">How HDDP helps</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let r of challenges" class="border-t border-line align-top">
                <td class="py-5 pr-6 text-ink">{{ r.problem }}</td>
                <td class="py-5 font-semibold text-navy">{{ r.answer }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- CORE SERVICES -->
    <section class="band band-mist">
      <div class="wrap split">
        <div>
          <h2 class="t-h2">Core services</h2>
          <p class="t-body mt-4">Recruitment support for nurse and healthcare staffing agencies. We add capacity to your team; your agency keeps its clients and its operations.</p>
          <a routerLink="/services" class="link inline-block mt-6">All services, roles and specialties</a>
        </div>
        <ul class="ruled">
          <li *ngFor="let s of services" class="def-row">
            <h3 class="t-h3"><a routerLink="/services" [fragment]="s.id" class="hover:underline underline-offset-4 decoration-1">{{ s.title }}</a></h3>
            <p class="t-body m-0">{{ s.text }}</p>
          </li>
        </ul>
      </div>
    </section>

    <!-- HOW IT WORKS -->
    <section class="band">
      <div class="wrap">
        <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <h2 class="t-h2">How it works</h2>
          <p class="font-heading font-semibold text-teal-ink text-lg m-0">Qualified candidates delivered within 48–96 hours</p>
        </div>
        <ol class="steps steps-row">
          <li *ngFor="let step of steps"><span class="font-semibold text-navy">{{ step }}</span></li>
        </ol>
        <a routerLink="/how-it-works" class="link inline-block mt-8">Steps, submittal packet and compliance</a>
      </div>
    </section>

    <!-- WHO WE SERVE -->
    <section class="band band-mist">
      <div class="wrap">
        <h2 class="t-h2">Who we serve</h2>
        <div class="mt-10 grid gap-10 md:grid-cols-2">
          <a *ngFor="let a of audiences" routerLink="/who-we-serve" [fragment]="a.id" class="group block border-t-2 border-teal pt-6">
            <h3 class="t-h3 group-hover:underline underline-offset-4 decoration-1">{{ a.title }}</h3>
            <p class="t-body mt-2 m-0">{{ a.text }}</p>
          </a>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="band band-navy">
      <div class="wrap flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
        <div>
          <h2 class="t-h1">Struggling to fill healthcare roles?</h2>
          <p class="mt-3 text-lg text-white/80">Let HDDP deliver pre-screened candidates—fast, reliable, and ready.</p>
        </div>
        <div class="flex flex-wrap gap-3 shrink-0">
          <button type="button" (click)="modalService.openRequestTalent()" class="btn btn-light">Request talent</button>
          <a routerLink="/contact-us" class="btn btn-ghost-light">Talk to our team</a>
        </div>
      </div>
    </section>
  `
})
export class HomeComponent {
  modalService = inject(ModalService);

  checks = [
    { label: 'Resume and experience screening', state: 'Done', done: true },
    { label: 'Communication evaluation', state: 'Done', done: true },
    { label: 'Role fit assessment', state: 'Done', done: true },
    { label: 'Credential verification', state: 'Coordinating', done: false }
  ];

  trust = [
    { title: 'Trusted recruitment partner', text: 'We support agencies; we don’t compete with them.' },
    { title: '25+ years combined expertise', text: 'In healthcare recruitment and staffing.' },
    { title: 'Global talent network', text: 'Sourcing for roles in the USA, UK and Canada.' },
    { title: 'Fast delivery', text: 'Candidates within 48–96 hours.' }
  ];

  challenges = [
    { problem: 'Ongoing nurse shortages', answer: 'Rapid candidate delivery' },
    { problem: 'Slow hiring cycles', answer: 'Pre-screened, qualified professionals' },
    { problem: 'Burnout due to understaffing', answer: 'Scalable offshore recruitment teams' },
    { problem: 'High cost of recruitment', answer: 'Cost-efficient hiring support' }
  ];

  services = [
    { id: 'talent-sourcing', title: 'Nurse and healthcare talent sourcing', text: 'We identify and deliver qualified healthcare professionals aligned with your specific requirements.' },
    { id: 'rpo', title: 'Recruitment process outsourcing (RPO)', text: 'Dedicated offshore recruiters acting as an extension of your internal hiring team.' },
    { id: 'credentialing', title: 'Credentialing and compliance support', text: 'Primary source licence verification, certification tracking and credential files built to your checklist.' },
    { id: 'back-office', title: 'Back-office recruitment support', text: 'Interview scheduling, ATS updates, VMS submittals and onboarding paperwork.' }
  ];

  steps = [
    'Requirement intake',
    'Targeted sourcing',
    'Screening',
    'Licence and credential verification',
    'Submittal and follow-up'
  ];

  audiences = [
    { id: 'hospitals', title: 'Hospitals and health systems', text: 'Extra recruiting capacity for HR and talent acquisition teams filling RN, LPN, CNA and allied roles.' },
    { id: 'staffing-agencies', title: 'Nurse staffing agencies', text: 'White-label sourcing, dedicated recruiters and credentialing support for travel, per diem and permanent desks.' }
  ];
}
