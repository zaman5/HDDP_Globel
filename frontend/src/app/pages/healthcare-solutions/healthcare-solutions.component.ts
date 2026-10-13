import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ModalService } from '../../services/modal.service';

// Services page: what HDDP delivers. Who it is for lives on /who-we-serve, the steps on /how-it-works.
@Component({
  selector: 'app-healthcare-solutions',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <!-- HERO -->
    <section class="band !pb-14">
      <div class="wrap">
        <p class="t-kicker">Services</p>
        <h1 class="t-h1 max-w-[24ch]">Healthcare recruitment services and nurse staffing support</h1>
        <p class="t-lede mt-5">Healthcare outsourcing services for hospital HR teams and nurse staffing agencies: talent sourcing, RPO, credentialing, back-office support and consulting. Use them on their own or together—you keep the client relationship and the hiring decision.</p>
        <nav aria-label="Services on this page" class="mt-8 flex flex-wrap gap-2">
          <a *ngFor="let s of services" [routerLink]="[]" [fragment]="s.id" class="px-4 py-2 rounded-full border border-line text-sm font-semibold text-navy hover:border-navy">{{ s.title }}</a>
        </nav>
      </div>
    </section>

    <!-- SERVICES -->
    <section *ngFor="let s of services; let odd = odd" [id]="s.id" class="band scroll-mt-20" [class.band-mist]="!odd">
      <div class="wrap split">
        <div>
          <h2 class="t-h2">{{ s.title }}</h2>
          <p class="t-body mt-4">{{ s.summary }}</p>
          <p class="mt-5 text-sm"><span class="font-semibold text-navy">Best for:</span> <span class="text-muted">{{ s.bestFor }}</span></p>
          <a *ngIf="s.link" [routerLink]="s.link" class="link inline-block mt-5">{{ s.linkLabel }}</a>
        </div>
        <div>
          <p class="font-semibold text-navy mb-3">What’s included</p>
          <ul class="tick-list">
            <li *ngFor="let i of s.included">{{ i }}</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- ROLES & SPECIALTIES -->
    <section id="roles" class="band scroll-mt-20" [class.band-mist]="services.length % 2 === 0">
      <div class="wrap split">
        <div>
          <h2 class="t-h2">Nurse and allied health staffing: roles and assignment types</h2>
          <p class="t-body mt-4">Registered nurse (RN) staffing, LPN and CNA staffing, nurse practitioners, allied health professionals staffing and healthcare IT staffing. US job titles are shown first; for UK and Canadian clients we recruit the equivalent role.</p>
        </div>
        <div>
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse min-w-[560px]">
              <caption class="sr-only">Roles we recruit for, with the equivalent title in each country</caption>
              <thead>
                <tr class="text-sm text-muted">
                  <th scope="col" class="font-semibold pb-3 pr-4">USA</th>
                  <th scope="col" class="font-semibold pb-3 pr-4">UK</th>
                  <th scope="col" class="font-semibold pb-3">Canada</th>
                </tr>
              </thead>
              <ng-container *ngFor="let g of roleGroups">
                <tbody>
                  <tr><th scope="rowgroup" colspan="3" class="pt-6 pb-2 font-heading font-semibold text-navy text-lg">{{ g.group }}</th></tr>
                  <tr *ngFor="let r of g.roles" class="border-t border-line align-top">
                    <th scope="row" class="py-3 pr-4 font-semibold text-ink">{{ r.us }}</th>
                    <td class="py-3 pr-4 text-muted">{{ r.uk }}</td>
                    <td class="py-3 text-muted">{{ r.ca }}</td>
                  </tr>
                </tbody>
              </ng-container>
            </table>
          </div>

          <h3 class="t-h3 mt-10">Nursing specialties</h3>
          <ul class="mt-3 flex flex-wrap gap-2 list-none p-0">
            <li *ngFor="let sp of specialties" class="px-3 py-1.5 rounded bg-white border border-line text-sm">{{ sp }}</li>
          </ul>

          <h3 class="t-h3 mt-10">Assignment types</h3>
          <ul class="ruled ruled-compact mt-3">
            <li *ngFor="let a of assignmentTypes" class="def-row">
              <span class="font-semibold text-navy">{{ a.title }}</span>
              <span class="text-muted">{{ a.text }}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- ENGAGEMENT MODELS -->
    <section id="pricing" class="band scroll-mt-20" [class.band-mist]="services.length % 2 !== 0">
      <div class="wrap split">
        <div>
          <h2 class="t-h2">Engagement models</h2>
          <p class="t-body mt-4">Affordable healthcare staffing services, priced to match your hiring volume. We confirm scope and fees in a written agreement before work starts.</p>
        </div>
        <ul class="ruled">
          <li *ngFor="let m of engagementModels" class="def-row">
            <h3 class="t-h3">{{ m.label }}</h3>
            <p class="t-body m-0">{{ m.text }}</p>
          </li>
        </ul>
      </div>
    </section>

    <!-- CTA -->
    <section class="band band-navy">
      <div class="wrap flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
        <div>
          <h2 class="t-h1">Have open requisitions?</h2>
          <p class="mt-3 text-lg text-white/80">Send the roles and receive pre-screened candidates within 48–96 hours.</p>
        </div>
        <div class="flex flex-wrap gap-3 shrink-0">
          <button type="button" (click)="modalService.openRequestTalent()" class="btn btn-light">Request talent</button>
          <a routerLink="/contact-us" class="btn btn-ghost-light">Talk to our team</a>
        </div>
      </div>
    </section>
  `
})
export class HealthcareSolutionsComponent {
  modalService = inject(ModalService);

  services: { id: string; title: string; summary: string; bestFor: string; included: string[]; link?: string; linkLabel?: string }[] = [
    {
      id: 'talent-sourcing',
      title: 'Nurse and healthcare talent sourcing',
      summary: 'Medical staff sourcing and candidate screening for travel nurses, locum nurses, contract and per diem roles. We find, screen and submit candidates for your open requisitions.',
      bestFor: 'Urgent nurse staffing, hard-to-fill specialties, surge demand and new contracts.',
      included: [
        'Sourcing from job boards, our candidate database and referral networks',
        'Phone screen for experience, specialty, shift and location preferences',
        'Licence and certification check against the requirement',
        'Candidate summary and submittal packet with each profile',
        'Interview scheduling and candidate follow-up'
      ]
    },
    {
      id: 'rpo',
      title: 'Recruitment process outsourcing (RPO) for healthcare',
      summary: 'Offshore recruiter teams who work only on your requisitions, inside your workflow, during your US business hours—offshore healthcare recruitment teams that work like your own nurse recruitment agency, at a fraction of in-house cost.',
      bestFor: 'Agencies and HR teams with steady volume who want to grow capacity without growing payroll.',
      included: [
        'Recruiters and sourcers assigned to your account',
        'Work inside your ATS and job-board accounts with your access rules',
        'Coverage across US time zones, including evenings and weekends by agreement',
        'Weekly reporting on submittals, interviews and fills',
        'Scale the team up or down with notice'
      ]
    },
    {
      id: 'credentialing',
      title: 'Credentialing and compliance support',
      summary: 'Credentialing support services for nurses and allied staff. We collect and organise the documents your compliance team needs, so candidates are ready to start sooner.',
      bestFor: 'Agencies and hospitals with credentialing backlogs or tight start dates.',
      included: [
        'Primary source licence verification with state boards of nursing and Nursys®',
        'Tracking BLS, ACLS, PALS, NRP, TNCC and specialty certifications and expiry dates',
        'Skills checklists and professional reference collection',
        'OIG and SAM.gov exclusion list checks',
        'Credential file audit against your client or facility checklist'
      ]
    },
    {
      id: 'back-office',
      title: 'Back-office support for staffing agencies',
      summary: 'Offshore staffing support for the administrative work that slows recruiters down—scheduling, payroll inputs and paperwork handled by a trained team.',
      bestFor: 'Recruiting teams spending too much time on admin.',
      included: [
        'Nurse scheduling support, shift confirmations and interview scheduling',
        'Timesheet collection and healthcare payroll processing support',
        'ATS data entry, pipeline updates and candidate re-engagement',
        'Submittals into client VMS/MSP portals',
        'Onboarding document chasing and reminders',
        'Job posting and refresh across boards'
      ]
    },
    {
      id: 'consulting',
      title: 'Healthcare staffing consulting',
      summary: 'Staffing agency setup services and staffing business advisory for founders and growing agencies.',
      bestFor: 'Anyone planning to start a nurse staffing agency, or an agency ready to scale.',
      included: [
        'Business model, niche and market advisory',
        'Healthcare compliance consulting and state licensing checklists',
        'Recruitment SOP development',
        'ATS, VMS and MSP readiness',
        'Offshore recruiter and back-office team setup'
      ],
      link: '/staffing-agency-consulting',
      linkLabel: 'Staffing agency setup and startup guide'
    }
  ];

  roleGroups = [
    {
      group: 'Nursing',
      roles: [
        { us: 'Registered Nurse (RN)', uk: 'Registered Nurse (NMC)', ca: 'Registered Nurse (RN)' },
        { us: 'Licensed Practical / Vocational Nurse (LPN / LVN)', uk: 'Nursing Associate', ca: 'Registered / Licensed Practical Nurse (RPN / LPN)' },
        { us: 'Certified Nursing Assistant (CNA)', uk: 'Healthcare Assistant (HCA)', ca: 'Personal Support Worker (PSW)' },
        { us: 'Nurse Practitioner (NP)', uk: 'Advanced Nurse Practitioner', ca: 'Nurse Practitioner (NP)' }
      ]
    },
    {
      group: 'Allied health',
      roles: [
        { us: 'Radiologic Technologist', uk: 'Radiographer', ca: 'Medical Radiation Technologist' },
        { us: 'Medical Lab Technician / Scientist', uk: 'Biomedical Scientist', ca: 'Medical Laboratory Technologist' },
        { us: 'Respiratory Therapist', uk: 'Respiratory Physiologist', ca: 'Respiratory Therapist' },
        { us: 'Surgical Technologist', uk: 'Operating Department Practitioner', ca: 'Operating Room Technician' },
        { us: 'Physical / Occupational Therapist', uk: 'Physiotherapist / Occupational Therapist', ca: 'Physiotherapist / Occupational Therapist' }
      ]
    },
    {
      group: 'Healthcare IT',
      roles: [
        { us: 'EHR Analyst (Epic, Cerner / Oracle Health)', uk: 'EPR Specialist', ca: 'EHR / EMR Specialist' },
        { us: 'Clinical Data Analyst', uk: 'Clinical Data Analyst', ca: 'Clinical Data Analyst' }
      ]
    }
  ];

  specialties = [
    'ICU / Critical Care', 'Emergency (ER)', 'Operating Room (OR)', 'PACU', 'Labor & Delivery', 'NICU', 'PICU',
    'Med-Surg', 'Telemetry', 'Step-Down / PCU', 'Oncology', 'Dialysis', 'Behavioral Health', 'Cath Lab',
    'Home Health', 'Long-Term Care / SNF', 'Case Management'
  ];

  assignmentTypes = [
    { title: 'Travel nurses', text: 'Typically 13-week travel RN assignments, including ICU travel nurses and ER travel nurses.' },
    { title: 'Locum and contract nurses', text: 'Locum nurses, locum tenens healthcare staff and local contract nurses for fixed-term cover.' },
    { title: 'Per diem nurses / PRN', text: 'Shift-by-shift cover for gaps and call-outs.' },
    { title: 'Permanent / direct hire', text: 'Full-time hires onto the facility’s own staff.' },
    { title: 'Rapid response', text: 'Temporary healthcare staffing at short notice for census surges and new units.' }
  ];

  engagementModels = [
    { label: 'Per placement', text: 'A fee for each candidate placed. Suited to occasional or hard-to-fill roles.' },
    { label: 'Monthly retainer', text: 'A fixed monthly fee for an ongoing flow of screened candidates.' },
    { label: 'Dedicated recruiter (RPO)', text: 'A monthly fee per recruiter working only on your requisitions.' },
    { label: 'Project-based', text: 'A defined number of hires over a set period, such as a unit opening or a new contract.' }
  ];
}
