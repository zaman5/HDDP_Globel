import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-healthcare-solutions',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <!-- HERO -->
    <section class="band !pb-14">
      <div class="wrap">
        <p class="t-kicker">Solutions</p>
        <h1 class="t-h1 max-w-[22ch]">Comprehensive healthcare talent solutions</h1>
        <p class="t-lede mt-5">Built for nurse staffing agencies and healthcare organizations in the United States, United Kingdom and Canada.</p>
        <p class="t-body mt-4">
          Healthcare systems in all three countries continue to face workforce shortages across nursing and allied health roles. HDDP Consultants supports this ecosystem by delivering structured, high-quality talent pipelines aligned with industry standards and client expectations.
        </p>
        <div class="mt-8 flex flex-wrap gap-3">
          <button type="button" (click)="modalService.openRequestTalent()" class="btn btn-primary">Request a talent pipeline</button>
          <a routerLink="/partner-with-us" class="btn btn-outline">Partner with us</a>
        </div>
      </div>
    </section>

    <!-- ROLES WE COVER -->
    <section class="band band-mist">
      <div class="wrap split">
        <div>
          <h2 class="t-h2">Roles we cover</h2>
          <p class="t-body mt-4">Job titles differ between countries. We recruit for the equivalent role in each market.</p>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse min-w-[560px]">
            <caption class="sr-only">Roles we recruit for, with the equivalent title in each country</caption>
            <thead>
              <tr class="text-sm text-muted">
                <th scope="col" class="font-semibold pb-3 pr-4">Role</th>
                <th scope="col" class="font-semibold pb-3 pr-4">USA</th>
                <th scope="col" class="font-semibold pb-3 pr-4">UK</th>
                <th scope="col" class="font-semibold pb-3">Canada</th>
              </tr>
            </thead>
            <ng-container *ngFor="let g of roleGroups">
              <tbody>
                <tr><th scope="rowgroup" colspan="4" class="pt-6 pb-2 font-heading font-semibold text-navy text-lg">{{ g.group }}</th></tr>
                <tr *ngFor="let r of g.roles" class="border-t border-line align-top">
                  <th scope="row" class="py-3 pr-4 font-semibold text-ink">{{ r.role }}</th>
                  <td class="py-3 pr-4 text-muted">{{ r.us }}</td>
                  <td class="py-3 pr-4 text-muted">{{ r.uk }}</td>
                  <td class="py-3 text-muted">{{ r.ca }}</td>
                </tr>
              </tbody>
            </ng-container>
          </table>
        </div>
      </div>
    </section>

    <!-- DELIVERY MODELS -->
    <section class="band">
      <div class="wrap split">
        <div>
          <h2 class="t-h2">Flexible engagement options</h2>
          <p class="t-body mt-4">Choose the model that matches your hiring volume.</p>
        </div>
        <ul class="ruled">
          <li *ngFor="let m of deliveryModels" class="def-row">
            <h3 class="t-h3">{{ m.label }}</h3>
            <p class="t-body m-0">{{ m.text }}</p>
          </li>
        </ul>
      </div>
    </section>

    <!-- QUALITY FRAMEWORK -->
    <section class="band band-mist">
      <div class="wrap split">
        <div>
          <h2 class="t-h2">Quality framework</h2>
          <p class="t-body mt-4">Each candidate undergoes four checks before we submit them to you.</p>
        </div>
        <div>
          <ul class="tick-list text-lg">
            <li *ngFor="let q of qualityChecks" class="font-semibold text-navy">{{ q }}</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="band band-navy">
      <div class="wrap flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
        <div>
          <h2 class="t-h1">Need a healthcare talent pipeline?</h2>
          <p class="mt-3 text-lg text-white/80">Share your requirements and receive pre-screened candidates within 48–96 hours.</p>
        </div>
        <button type="button" (click)="modalService.openRequestTalent()" class="btn btn-light shrink-0">Request a talent pipeline</button>
      </div>
    </section>
  `
})
export class HealthcareSolutionsComponent {
  modalService = inject(ModalService);

  roleGroups = [
    {
      group: 'Nursing',
      roles: [
        { role: 'Registered Nurse', us: 'RN', uk: 'Registered Nurse (NMC)', ca: 'RN' },
        { role: 'Practical Nurse', us: 'LPN / LVN', uk: 'Nursing Associate', ca: 'RPN / LPN' },
        { role: 'Nursing Assistant', us: 'CNA', uk: 'Healthcare Assistant (HCA)', ca: 'PSW' }
      ]
    },
    {
      group: 'Allied health',
      roles: [
        { role: 'Radiology', us: 'Radiologic Technologist', uk: 'Radiographer', ca: 'Medical Radiation Technologist' },
        { role: 'Laboratory', us: 'Lab Technician', uk: 'Laboratory Assistant', ca: 'Medical Laboratory Technician' },
        { role: 'Clinical support', us: 'Medical Assistant', uk: 'Clinical Support Worker', ca: 'Medical Office Assistant' }
      ]
    },
    {
      group: 'Healthcare IT',
      roles: [
        { role: 'EHR', us: 'EHR Specialist', uk: 'EPR Specialist', ca: 'EHR / EMR Specialist' },
        { role: 'Data', us: 'Clinical Data Analyst', uk: 'Clinical Data Analyst', ca: 'Clinical Data Analyst' }
      ]
    }
  ];

  deliveryModels = [
    { label: 'Per placement', text: 'Pay for each candidate placed. Suited to occasional or hard-to-fill roles.' },
    { label: 'Monthly retainer', text: 'A fixed monthly fee for an ongoing flow of screened candidates.' },
    { label: 'Dedicated recruiter model', text: 'Offshore recruiters who work only on your requisitions, as part of your team.' },
    { label: 'Project-based hiring', text: 'A defined volume of hires over a set period, such as a new unit or contract.' }
  ];

  qualityChecks = [
    'Resume and experience screening',
    'Communication evaluation',
    'Role fit assessment',
    'Credential verification coordination'
  ];
}
