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
          <p class="t-kicker">Global healthcare staffing partner for hospitals and nurse staffing agencies</p>
          <h1 class="t-display max-w-[19ch]">Nurse staffing services that fill healthcare roles fast</h1>
          <p class="t-lede mt-6">
            HDDP Consultants delivers pre-screened, credential-ready travel nurses, locum nurses, contract and per diem nurses and allied health professionals to US hospitals and nurse staffing agencies—with fast turnaround, cost-effective nurse staffing and scalable healthcare workforce solutions. We also support clients in the UK and Canada.
          </p>
          <p class="t-body mt-4">
            From urgent nurse staffing needs to long-term hospital staffing solutions, we act as your extended recruitment engine—so you can hire travel nurses quickly, cover locum and temporary healthcare staffing gaps, and reduce hiring costs.
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
          <h2 class="t-h2">Healthcare recruitment services</h2>
          <p class="t-body mt-4">Healthcare talent acquisition, offshore support and consulting for nurse staffing agencies and hospitals. We add capacity to your team; you keep your clients and your operations.</p>
          <a routerLink="/services" class="link inline-block mt-6">All services, roles and specialties</a>
        </div>
        <ul class="ruled">
          <li *ngFor="let s of services" class="def-row">
            <h3 class="t-h3"><a [routerLink]="s.id === 'consulting' ? '/staffing-agency-consulting' : '/services'" [fragment]="s.id === 'consulting' ? undefined : s.id" class="hover:underline underline-offset-4 decoration-1">{{ s.title }}</a></h3>
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

    <!-- FAQ -->
    <section class="band">
      <div class="wrap split">
        <h2 class="t-h2">Frequently asked questions</h2>
        <div class="border-t border-line">
          <details *ngFor="let f of faqs" class="group border-b border-line py-5">
            <summary class="flex justify-between gap-6 cursor-pointer list-none font-semibold text-navy text-[1.05rem]">
              {{ f.q }}
              <span class="text-teal-ink text-xl leading-none transition-transform group-open:rotate-45" aria-hidden="true">+</span>
            </summary>
            <p class="t-body mt-3 mb-0">{{ f.a }}</p>
          </details>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="band band-navy">
      <div class="wrap flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
        <div>
          <h2 class="t-h1">Need nurses urgently?</h2>
          <p class="mt-3 text-lg text-white/80">Hire locum nurses, travel nurses and contract healthcare staff—pre-screened and ready in 48–96 hours.</p>
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
    { title: 'Global talent network', text: 'International nurse recruitment for the USA, UK and Canada.' },
    { title: 'Fast turnaround', text: 'Pre-screened candidates within 48–96 hours.' }
  ];

  challenges = [
    { problem: 'Ongoing nurse shortages', answer: 'Rapid candidate delivery' },
    { problem: 'Slow hiring cycles', answer: 'Pre-screened, qualified professionals' },
    { problem: 'Burnout due to understaffing', answer: 'Scalable offshore recruitment teams' },
    { problem: 'High cost of recruitment', answer: 'Cost-efficient hiring support' }
  ];

  services = [
    { id: 'talent-sourcing', title: 'Nurse and healthcare talent sourcing', text: 'We identify and deliver qualified healthcare professionals aligned with your specific requirements.' },
    { id: 'rpo', title: 'Recruitment process outsourcing (RPO) for healthcare', text: 'Dedicated offshore recruiters acting as an extension of your internal hiring team.' },
    { id: 'credentialing', title: 'Credentialing and compliance support', text: 'Primary source licence verification, certification tracking and credential files built to your checklist.' },
    { id: 'back-office', title: 'Back-office support for staffing agencies', text: 'Nurse scheduling support, payroll processing support, ATS updates, VMS submittals and onboarding paperwork.' },
    { id: 'consulting', title: 'Healthcare staffing consulting', text: 'Staffing agency setup services, healthcare compliance consulting and recruitment SOP development.' }
  ];

  steps = [
    'Requirement intake',
    'Targeted sourcing',
    'Screening',
    'Licence and credential verification',
    'Submittal and follow-up'
  ];

  faqs = [
    { q: 'How quickly can you supply travel nurses or contract nurses?', a: 'For contract nurse staffing and travel nurse requests we usually submit pre-screened, credential-checked candidates within 48–96 hours. Urgent requests for common specialties are often filled at the faster end of that window.' },
    { q: 'Do you provide locum nurses and per diem nurses?', a: 'Yes. We source locum nurses and other locum healthcare staff, per diem nurses, contract nurses and travel nurses, as well as permanent hires, across RN, LPN/LVN, CNA, nurse practitioner and allied health roles.' },
    { q: 'Are you a healthcare staffing agency?', a: 'We are a healthcare staffing partner. We recruit, screen and credential candidates for hospitals and nurse staffing agencies, and provide offshore recruiter teams and back-office support. Your agency or facility makes the hiring decision.' },
    { q: 'Do you offer back office support for healthcare staffing companies?', a: 'Yes. Our offshore staffing support covers credentialing, nurse scheduling support, payroll processing support, ATS updates and VMS submittals, so your recruiters can focus on filling orders.' },
    { q: 'Can you help me start a nurse staffing agency?', a: 'Yes. Our healthcare staffing consulting covers staffing agency setup, healthcare compliance, recruitment SOP development and offshore team setup. See our guide on how to start a nurse staffing agency in the US.' },
    { q: 'Do you recruit nurses internationally?', a: 'Yes. Alongside healthcare staffing in the USA we run international nurse recruitment and overseas nurse staffing. Every candidate must hold the licence and work authorization that the role requires before we submit them.' }
  ];

  audiences = [
    { id: 'hospitals', title: 'Hospitals and health systems', text: 'Nurse staffing solutions for hospitals: registered nurse (RN), LPN, CNA, allied health and healthcare IT staffing for HR and talent acquisition teams.' },
    { id: 'staffing-agencies', title: 'Nurse staffing agencies', text: 'White-label sourcing, offshore recruiter teams and back office support for healthcare staffing companies on travel, per diem and permanent desks.' }
  ];
}
