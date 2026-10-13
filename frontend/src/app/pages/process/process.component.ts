import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-process',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="band !pb-12">
      <div class="wrap">
        <p class="t-kicker">How it works</p>
        <h1 class="t-h1 max-w-[22ch]">From requisition to submittal in 48–96 hours</h1>
        <p class="t-lede mt-5">Five steps, the same for every client. Each candidate arrives with a submittal packet your team can review in minutes.</p>
      </div>
    </section>

    <!-- STEPS -->
    <section class="band !pt-0">
      <div class="wrap">
        <ol class="list-none m-0 p-0 border-t border-line">
          <li *ngFor="let step of steps; let i = index" class="grid gap-3 py-8 border-b border-line md:grid-cols-12 md:gap-8">
            <span class="md:col-span-1 font-heading font-semibold text-teal-ink text-2xl leading-none" aria-hidden="true">{{ i + 1 }}</span>
            <div class="md:col-span-4">
              <h2 class="t-h3 !text-xl">{{ step.title }}</h2>
              <p class="text-sm text-muted mt-1">{{ step.time }}</p>
            </div>
            <p class="md:col-span-7 t-body m-0">{{ step.text }}</p>
          </li>
        </ol>
      </div>
    </section>

    <!-- SUBMITTAL PACKET -->
    <section id="submittal-packet" class="band band-mist scroll-mt-20">
      <div class="wrap split">
        <div>
          <h2 class="t-h2">What’s in every submittal packet</h2>
          <p class="t-body mt-4">Formatted to your template, ready to forward to a hiring manager or upload to a VMS.</p>
        </div>
        <ul class="tick-list grid sm:grid-cols-2 gap-x-10">
          <li *ngFor="let p of packet">{{ p }}</li>
        </ul>
      </div>
    </section>

    <!-- COMPLIANCE -->
    <section id="compliance" class="band scroll-mt-20">
      <div class="wrap split">
        <div>
          <h2 class="t-h2">US credentialing and compliance standards</h2>
          <p class="t-body mt-4">Our screening follows the primary-source verification approach used in The Joint Commission’s Health Care Staffing Services standards, so it fits agencies that are certified or working towards it.</p>
          <p class="t-small mt-4">Responsibilities are confirmed in each client agreement.</p>
        </div>
        <div class="grid gap-10 sm:grid-cols-2">
          <div>
            <p class="font-semibold text-navy mb-3">Completed by HDDP</p>
            <ul class="tick-list">
              <li *ngFor="let c of weDo">{{ c }}</li>
            </ul>
          </div>
          <div>
            <p class="font-semibold text-navy mb-3">Completed by your agency or facility</p>
            <ul class="list-disc pl-5 m-0 space-y-2 text-muted">
              <li *ngFor="let c of clientDoes">{{ c }}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- DATA PROTECTION -->
    <section class="band band-mist">
      <div class="wrap split">
        <h2 class="t-h2">Candidate data handling</h2>
        <ul class="ruled">
          <li *ngFor="let d of dataHandling" class="def-row">
            <h3 class="t-h3">{{ d.title }}</h3>
            <p class="t-body m-0">{{ d.text }}</p>
          </li>
        </ul>
      </div>
    </section>

    <section class="band band-navy">
      <div class="wrap flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
        <div>
          <h2 class="t-h1">Ready to send your first requisition?</h2>
          <p class="mt-3 text-lg text-white/80">Share the role and we will confirm requirements within one business day.</p>
        </div>
        <div class="flex flex-wrap gap-3 shrink-0">
          <button type="button" (click)="modalService.openRequestTalent()" class="btn btn-light">Request talent</button>
          <a routerLink="/contact-us" class="btn btn-ghost-light">Talk to our team</a>
        </div>
      </div>
    </section>
  `
})
export class ProcessComponent {
  modalService = inject(ModalService);

  steps = [
    { title: 'Requirement intake', time: 'Day 0', text: 'We confirm the role, specialty, unit, licence state or compact eligibility, certifications, experience, shift, pay rate, start date and assignment length with your team.' },
    { title: 'Targeted sourcing', time: 'Day 0–2', text: 'Recruiters search our candidate database, job boards and referral networks for clinicians who match the requirement and the location.' },
    { title: 'Screening', time: 'Day 1–3', text: 'Phone screen for clinical experience, specialty skills, communication, availability and shift preferences, plus a skills checklist for the specialty.' },
    { title: 'Verification', time: 'Day 2–4', text: 'Licence verified with the state board of nursing or Nursys®, certifications checked, exclusion lists searched and references requested.' },
    { title: 'Submittal and follow-up', time: 'Day 2–4, then ongoing', text: 'We send the candidate with a submittal packet, schedule interviews, keep the candidate engaged and support onboarding until the start date.' }
  ];

  packet = [
    'Candidate summary and right-to-represent confirmation',
    'Updated resume with work history gaps explained',
    'Licence verification printout (state board or Nursys®)',
    'Certifications with expiry dates (BLS, ACLS, PALS, NRP, TNCC)',
    'Completed specialty skills checklist',
    'Professional references',
    'Availability, shift preference and pay expectations',
    'Recruiter screening notes'
  ];

  weDo = [
    'Primary source licence verification, including multistate (NLC) status',
    'Certification and expiry tracking',
    'OIG LEIE and SAM.gov exclusion checks',
    'Skills checklists and reference collection',
    'Work history and gap review',
    'Credential file audit against your checklist'
  ];

  clientDoes = [
    'Background checks, with FCRA disclosure and authorization',
    'Drug screening',
    'Health records: immunizations, TB testing, physicals and fit testing',
    'Form I-9 and E-Verify after an offer',
    'Facility orientation and competency validation',
    'Hiring decision and employment contract'
  ];

  dataHandling = [
    { title: 'Consent-based', text: 'Candidates agree to their profile being shared with you before we submit them.' },
    { title: 'Need-to-know access', text: 'Resumes and documents are accessible only to the recruiters working your account.' },
    { title: 'No health records', text: 'We do not collect or store candidate health information; it stays with you.' },
    { title: 'Fair hiring', text: 'We screen on qualifications only, in line with EEOC guidance and state fair-chance and salary-history laws.' }
  ];
}
