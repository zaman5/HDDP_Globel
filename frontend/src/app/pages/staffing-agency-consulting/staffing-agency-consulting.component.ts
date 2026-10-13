import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

// Keyword cluster: healthcare staffing consulting, start a nurse staffing agency,
// staffing agency setup services, recruitment SOP development, healthcare compliance consulting.
@Component({
  selector: 'app-staffing-agency-consulting',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="band !pb-14">
      <div class="wrap">
        <p class="t-kicker">Healthcare staffing consulting</p>
        <h1 class="t-h1 max-w-[24ch]">Start or grow a nurse staffing agency with expert setup support</h1>
        <p class="t-lede mt-5">Staffing agency setup services and staffing business advisory for founders and owners in the US healthcare market—from licensing and compliance to recruitment SOPs, credentialing and back-office systems.</p>
        <div class="mt-8 flex flex-wrap gap-3">
          <a routerLink="/contact-us" class="btn btn-primary">Talk to our team</a>
          <a [routerLink]="[]" fragment="startup-guide" class="btn btn-outline">Read the startup guide</a>
        </div>
      </div>
    </section>

    <!-- SERVICES -->
    <section class="band band-mist">
      <div class="wrap split">
        <div>
          <h2 class="t-h2">Staffing agency setup services</h2>
          <p class="t-body mt-4">Practical help from people who run healthcare recruitment every day. Use one service or the full launch package.</p>
        </div>
        <ul class="ruled">
          <li *ngFor="let s of services" class="def-row">
            <h3 class="t-h3">{{ s.title }}</h3>
            <p class="t-body m-0">{{ s.text }}</p>
          </li>
        </ul>
      </div>
    </section>

    <!-- GUIDE -->
    <section id="startup-guide" class="band scroll-mt-20">
      <div class="wrap">
        <div class="max-w-3xl">
          <p class="t-kicker">Healthcare staffing startup guide</p>
          <h2 class="t-h2">How to start a nurse staffing agency in the US</h2>
          <p class="t-body mt-4">A step-by-step overview of what it takes to launch a nurse staffing agency. Requirements differ by state, so confirm the details with a local attorney and accountant before you launch.</p>
        </div>

        <ol class="list-none m-0 p-0 mt-10 border-t border-line">
          <li *ngFor="let step of guide; let i = index" class="grid gap-3 py-8 border-b border-line md:grid-cols-12 md:gap-8">
            <span class="md:col-span-1 font-heading font-semibold text-teal-ink text-2xl leading-none" aria-hidden="true">{{ i + 1 }}</span>
            <h3 class="md:col-span-4 t-h3 !text-xl">{{ step.title }}</h3>
            <div class="md:col-span-7">
              <p class="t-body m-0">{{ step.text }}</p>
              <p *ngIf="step.help" class="t-small mt-2"><span class="font-semibold text-navy">How we help:</span> {{ step.help }}</p>
            </div>
          </li>
        </ol>
        <p class="t-small mt-6 max-w-3xl">This guide is general information, not legal, tax or financial advice.</p>
      </div>
    </section>

    <!-- CTA -->
    <section class="band band-navy">
      <div class="wrap flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
        <div>
          <h2 class="t-h1">Planning your staffing agency launch?</h2>
          <p class="mt-3 text-lg text-white/80">Book a call about setup, compliance, recruitment SOPs or offshore recruiter teams.</p>
        </div>
        <a routerLink="/contact-us" class="btn btn-light shrink-0">Talk to our team</a>
      </div>
    </section>
  `
})
export class StaffingAgencyConsultingComponent {
  services = [
    { title: 'Business model and market advisory', text: 'Choose your focus—travel nurses, local contract, per diem or permanent placement—and the specialties, states and clients to target first.' },
    { title: 'Healthcare compliance consulting', text: 'State nurse agency licensing or registration, credentialing standards, worker classification and preparation for Joint Commission Health Care Staffing Services certification.' },
    { title: 'Recruitment SOP development', text: 'Written processes for sourcing, candidate screening, submittals, credentialing, onboarding and redeployment, ready to train your team on.' },
    { title: 'Technology and VMS/MSP readiness', text: 'Selecting an ATS, setting up job boards and preparing to work with hospital vendor management systems and managed service providers.' },
    { title: 'Back-office and offshore team setup', text: 'Credentialing, nurse scheduling support, timesheets and payroll processing workflows, with offshore recruiter teams when you are ready to scale.' }
  ];

  guide = [
    {
      title: 'Choose your niche and business model',
      text: 'Decide whether you will place travel nurses, local contract and per diem nurses, or permanent staff, and which specialties and states you will serve. A focused start makes recruiting and selling easier.',
      help: 'Market and competitor review for your target states and specialties.'
    },
    {
      title: 'Form the business and register',
      text: 'Set up a legal entity, get an EIN, open business bank accounts and register with your state. Several states, including Illinois, Minnesota and Connecticut, require nurse staffing agencies to be licensed or registered.',
      help: 'A checklist of registrations for the states you plan to operate in.'
    },
    {
      title: 'Get insured',
      text: 'Typical cover includes general liability, professional liability, workers’ compensation and employment practices liability. Hospital contracts usually set minimum limits.',
      help: null
    },
    {
      title: 'Decide on worker classification and payroll',
      text: 'Most nurse staffing agencies employ clinicians as W-2 employees. Plan payroll processing, multi-state payroll tax, travel stipends and how you will fund payroll before clients pay.',
      help: 'Payroll and timesheet workflows run by our back-office team.'
    },
    {
      title: 'Build compliance and credentialing',
      text: 'Create credential file checklists, primary source licence verification, background check and drug screen processes, competency checklists and document expiry tracking.',
      help: 'Credentialing support services and audit-ready file templates.'
    },
    {
      title: 'Set up recruiting',
      text: 'Choose an ATS, write recruitment SOPs, build job board and social sourcing, and create a candidate screening process that produces strong submittals.',
      help: 'Recruitment SOP development and offshore recruiter teams.'
    },
    {
      title: 'Win your first clients',
      text: 'Approach hospitals, long-term care facilities and MSPs, and apply to work on vendor management systems. Clear bill rates, fast submittals and complete credential files win orders.',
      help: 'Submittal templates and VMS/MSP onboarding preparation.'
    },
    {
      title: 'Scale with outsourcing',
      text: 'As orders grow, add capacity without adding fixed cost: offshore recruiters, credentialing support and back-office support for staffing agencies.',
      help: 'Recruitment process outsourcing (RPO) and back-office support.'
    }
  ];
}
