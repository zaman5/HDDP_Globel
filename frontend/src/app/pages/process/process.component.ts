import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-process',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="flex flex-col w-full">
      
      <!-- HERO -->
      <section class="bg-[#003461] text-white py-16 lg:py-24 px-6 lg:px-12 relative overflow-hidden">
        <div class="max-w-7xl mx-auto relative z-10 text-center max-w-4xl mx-auto">
          <span class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-xs font-bold uppercase tracking-wider text-[#86f4f1] mb-4">
            The HDDP Precision Deployment Methodology
          </span>
          <h1 class="font-heading text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Our 5-Step Clinical Trust & Deployment System
          </h1>
          <p class="mt-4 text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl mx-auto">
            From initial requirement ingestion to day-one shift orientation, our standardized 5-phase protocol guarantees 100% compliance and ultra-fast 48–96h delivery.
          </p>
        </div>
      </section>

      <!-- 5-STEP TIMELINE -->
      <section class="py-16 lg:py-24 bg-[#F5F7FA]">
        <div class="max-w-5xl mx-auto px-6 lg:px-12">
          
          <div class="space-y-12 relative before:absolute before:inset-0 before:left-8 md:before:left-1/2 before:w-1 before:bg-teal-200 before:-translate-x-1/2">
            
            <!-- Step 1 -->
            <div class="relative flex flex-col md:flex-row items-center gap-8">
              <div class="md:w-1/2 flex md:justify-end text-left md:text-right">
                <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-md">
                  <span class="text-xs font-bold uppercase tracking-wider text-[#006a68]">Phase 01 • Requisition</span>
                  <h3 class="font-heading text-lg font-bold text-[#003461] mt-1">Intake & Clinical Scoping</h3>
                  <p class="text-xs text-slate-600 mt-2 leading-relaxed">
                    We capture exact clinical unit acuity, EHR software proficiency, shift rotation, compact state requirements, and target start dates.
                  </p>
                  <span class="inline-block mt-3 px-2.5 py-1 rounded bg-teal-50 text-teal-800 text-[11px] font-bold">Turnaround: 0–4 Hours</span>
                </div>
              </div>
              <div class="z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#004b87] text-white font-extrabold shadow-lg text-lg border-4 border-white">
                1
              </div>
              <div class="md:w-1/2 hidden md:block"></div>
            </div>

            <!-- Step 2 -->
            <div class="relative flex flex-col md:flex-row items-center gap-8">
              <div class="md:w-1/2 hidden md:block"></div>
              <div class="z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#004b87] text-white font-extrabold shadow-lg text-lg border-4 border-white">
                2
              </div>
              <div class="md:w-1/2 flex justify-start text-left">
                <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-md">
                  <span class="text-xs font-bold uppercase tracking-wider text-[#006a68]">Phase 02 • Sourcing</span>
                  <h3 class="font-heading text-lg font-bold text-[#003461] mt-1">AI-Assisted Candidate Matching</h3>
                  <p class="text-xs text-slate-600 mt-2 leading-relaxed">
                    Our database of 14,500+ pre-vetted clinicians is queried against specialty skills, compact license status, and historical facility ratings.
                  </p>
                  <span class="inline-block mt-3 px-2.5 py-1 rounded bg-teal-50 text-teal-800 text-[11px] font-bold">Turnaround: 4–24 Hours</span>
                </div>
              </div>
            </div>

            <!-- Step 3 -->
            <div class="relative flex flex-col md:flex-row items-center gap-8">
              <div class="md:w-1/2 flex md:justify-end text-left md:text-right">
                <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-md">
                  <span class="text-xs font-bold uppercase tracking-wider text-[#006a68]">Phase 03 • Compliance</span>
                  <h3 class="font-heading text-lg font-bold text-[#003461] mt-1">10-Point Credentialing Audit</h3>
                  <p class="text-xs text-slate-600 mt-2 leading-relaxed">
                    Nursys primary license verification, 10-panel drug screening, FBI background checks, health immunizations, and clinical reference audits.
                  </p>
                  <span class="inline-block mt-3 px-2.5 py-1 rounded bg-teal-50 text-teal-800 text-[11px] font-bold">100% Joint Commission Compliant</span>
                </div>
              </div>
              <div class="z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#004b87] text-white font-extrabold shadow-lg text-lg border-4 border-white">
                3
              </div>
              <div class="md:w-1/2 hidden md:block"></div>
            </div>

            <!-- Step 4 -->
            <div class="relative flex flex-col md:flex-row items-center gap-8">
              <div class="md:w-1/2 hidden md:block"></div>
              <div class="z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#004b87] text-white font-extrabold shadow-lg text-lg border-4 border-white">
                4
              </div>
              <div class="md:w-1/2 flex justify-start text-left">
                <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-md">
                  <span class="text-xs font-bold uppercase tracking-wider text-[#006a68]">Phase 04 • Presentation</span>
                  <h3 class="font-heading text-lg font-bold text-[#003461] mt-1">Profile Submissions & Interview</h3>
                  <p class="text-xs text-slate-600 mt-2 leading-relaxed">
                    We present comprehensive clinical packages with blind skills checklists, reference transcripts, and coordinate seamless hospital hiring interviews.
                  </p>
                  <span class="inline-block mt-3 px-2.5 py-1 rounded bg-teal-50 text-teal-800 text-[11px] font-bold">Turnaround: 24–48 Hours</span>
                </div>
              </div>
            </div>

            <!-- Step 5 -->
            <div class="relative flex flex-col md:flex-row items-center gap-8">
              <div class="md:w-1/2 flex md:justify-end text-left md:text-right">
                <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-md">
                  <span class="text-xs font-bold uppercase tracking-wider text-[#006a68]">Phase 05 • Deployment</span>
                  <h3 class="font-heading text-lg font-bold text-[#003461] mt-1">Orientation & 24/7 Support</h3>
                  <p class="text-xs text-slate-600 mt-2 leading-relaxed">
                    Logistics, lodging, parking, badge pickup, unit orientation coordination, and ongoing weekly clinical check-ins to ensure complete retention.
                  </p>
                  <span class="inline-block mt-3 px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 text-[11px] font-bold">98.4% Retention Guarantee</span>
                </div>
              </div>
              <div class="z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#5FCF80] text-slate-900 font-extrabold shadow-lg text-lg border-4 border-white">
                5
              </div>
              <div class="md:w-1/2 hidden md:block"></div>
            </div>

          </div>

          <!-- Bottom Action -->
          <div class="mt-16 text-center">
            <button (click)="modalService.openRequestTalent()" class="bg-[#004b87] hover:bg-[#0B3C5D] text-white font-bold px-8 py-4 rounded-xl shadow-lg transition-all text-sm inline-flex items-center gap-2">
              <span>Initiate Requisition Under Our 5-Step SLA</span>
              <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>

        </div>
      </section>

    </div>
  `
})
export class ProcessComponent {
  modalService = inject(ModalService);
}
