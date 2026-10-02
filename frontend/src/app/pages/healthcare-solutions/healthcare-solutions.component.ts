import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-healthcare-solutions',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="flex flex-col w-full">
      
      <!-- HERO -->
      <section class="bg-[#003461] text-white py-16 lg:py-24 px-6 lg:px-12 relative overflow-hidden">
        <div class="max-w-7xl mx-auto relative z-10">
          <div class="max-w-3xl">
            <span class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-xs font-bold uppercase tracking-wider text-[#86f4f1] mb-4">
              Enterprise Clinical Staffing Solutions
            </span>
            <h1 class="font-heading text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Specialized Workforce Models for Modern Healthcare Networks
            </h1>
            <p class="mt-4 text-base sm:text-lg text-slate-200 leading-relaxed">
              We bridge clinical resource gaps with precision, delivering verified RNs, Allied Health specialists, Locum Tenens physicians, and EHR informatics consultants tailored to your facility's operational tempo.
            </p>
            <div class="mt-8 flex flex-wrap gap-4">
              <button (click)="modalService.openRequestTalent()" class="bg-[#f2a900] hover:bg-amber-400 text-slate-900 font-extrabold px-8 py-3.5 rounded-xl shadow-lg transition-all text-sm flex items-center gap-2">
                <span>Request Clinical Talent</span>
                <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
              <a routerLink="/partner-with-us" class="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3.5 rounded-xl border border-white/20 transition-all text-sm">
                Explore Partnership Tiers
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- 6 SPECIALIZED SERVICE DIVISIONS -->
      <section class="py-16 lg:py-24 bg-[#F5F7FA]">
        <div class="max-w-7xl mx-auto px-6 lg:px-12">
          
          <div class="text-center max-w-3xl mx-auto mb-16">
            <h2 class="font-heading text-3xl font-extrabold text-[#003461]">Our Clinical Service Divisions</h2>
            <p class="text-slate-600 mt-2">Comprehensive staffing capabilities backed by 100% credential verification.</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            <!-- Division 1 -->
            <div class="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between">
              <div>
                <div class="w-14 h-14 rounded-xl bg-[#e5eeff] text-[#004b87] flex items-center justify-center mb-5">
                  <span class="material-symbols-outlined text-[32px]">flight_takeoff</span>
                </div>
                <h3 class="font-heading text-xl font-bold text-[#003461]">Travel Nursing Contracts</h3>
                <p class="text-slate-600 text-sm mt-3 leading-relaxed">
                  High-caliber Registered Nurses ready for 8, 13, or 26-week assignments. Fully vetted for ICU, CCU, ER, OR, NICU, PICU, Telemetry, and Med-Surg departments.
                </p>
                <ul class="mt-4 space-y-2 text-xs text-slate-700 font-medium">
                  <li class="flex items-center gap-2"><span class="material-symbols-outlined text-[#5FCF80] text-[16px]">check_circle</span>Compact Licensure verified in 40+ states</li>
                  <li class="flex items-center gap-2"><span class="material-symbols-outlined text-[#5FCF80] text-[16px]">check_circle</span>BLS, ACLS, PALS, TNCC certifications checked</li>
                  <li class="flex items-center gap-2"><span class="material-symbols-outlined text-[#5FCF80] text-[16px]">check_circle</span>Minimum 2 years high-acuity acute experience</li>
                </ul>
              </div>
              <button (click)="modalService.openRequestTalent('Travel Nursing')" class="mt-6 w-full py-2.5 bg-[#eff4ff] hover:bg-[#004b87] text-[#004b87] hover:text-white font-bold rounded-lg text-xs transition-colors">
                Request Travel Nurses
              </button>
            </div>

            <!-- Division 2 -->
            <div class="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between">
              <div>
                <div class="w-14 h-14 rounded-xl bg-[#86f4f1]/20 text-[#006a68] flex items-center justify-center mb-5">
                  <span class="material-symbols-outlined text-[32px]">local_hospital</span>
                </div>
                <h3 class="font-heading text-xl font-bold text-[#003461]">Per Diem & PRN Sourcing</h3>
                <p class="text-slate-600 text-sm mt-3 leading-relaxed">
                  On-demand clinical staffing to solve sudden headcount deficits, medical leaves, and census spikes. 24/7 responsiveness for same-day or next-day shift coverage.
                </p>
                <ul class="mt-4 space-y-2 text-xs text-slate-700 font-medium">
                  <li class="flex items-center gap-2"><span class="material-symbols-outlined text-[#5FCF80] text-[16px]">check_circle</span>2-hour dispatch SLA for emergency shifts</li>
                  <li class="flex items-center gap-2"><span class="material-symbols-outlined text-[#5FCF80] text-[16px]">check_circle</span>Local regional talent pools</li>
                  <li class="flex items-center gap-2"><span class="material-symbols-outlined text-[#5FCF80] text-[16px]">check_circle</span>Automated shift confirmation & timesheets</li>
                </ul>
              </div>
              <button (click)="modalService.openRequestTalent('Per Diem / PRN')" class="mt-6 w-full py-2.5 bg-[#eff4ff] hover:bg-[#004b87] text-[#004b87] hover:text-white font-bold rounded-lg text-xs transition-colors">
                Request PRN Staffing
              </button>
            </div>

            <!-- Division 3 -->
            <div class="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between">
              <div>
                <div class="w-14 h-14 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-5">
                  <span class="material-symbols-outlined text-[32px]">biotech</span>
                </div>
                <h3 class="font-heading text-xl font-bold text-[#003461]">Allied Health & Diagnostics</h3>
                <p class="text-slate-600 text-sm mt-3 leading-relaxed">
                  Essential clinical specialists including ARRT Radiologic Technologists, Sonographers, MRI/CT Techs, Respiratory Therapists, and Medical Laboratory Technologists.
                </p>
                <ul class="mt-4 space-y-2 text-xs text-slate-700 font-medium">
                  <li class="flex items-center gap-2"><span class="material-symbols-outlined text-[#5FCF80] text-[16px]">check_circle</span>ARRT, ARDMS, RRT, ASCP credentials</li>
                  <li class="flex items-center gap-2"><span class="material-symbols-outlined text-[#5FCF80] text-[16px]">check_circle</span>Interventional radiology & cath lab experts</li>
                  <li class="flex items-center gap-2"><span class="material-symbols-outlined text-[#5FCF80] text-[16px]">check_circle</span>Pediatric & adult diagnostic competencies</li>
                </ul>
              </div>
              <button (click)="modalService.openRequestTalent('Allied Health')" class="mt-6 w-full py-2.5 bg-[#eff4ff] hover:bg-[#004b87] text-[#004b87] hover:text-white font-bold rounded-lg text-xs transition-colors">
                Request Allied Specialists
              </button>
            </div>

            <!-- Division 4 -->
            <div class="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between">
              <div>
                <div class="w-14 h-14 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center mb-5">
                  <span class="material-symbols-outlined text-[32px]">stethoscope</span>
                </div>
                <h3 class="font-heading text-xl font-bold text-[#003461]">Locum Tenens & Physicians</h3>
                <p class="text-slate-600 text-sm mt-3 leading-relaxed">
                  Board-certified and board-eligible physicians and Advanced Practice Registered Nurses (APRN / NP / PA) across Hospital Medicine, Critical Care, Emergency, and Surgery.
                </p>
                <ul class="mt-4 space-y-2 text-xs text-slate-700 font-medium">
                  <li class="flex items-center gap-2"><span class="material-symbols-outlined text-[#5FCF80] text-[16px]">check_circle</span>Full NPDB and DEA registration vetting</li>
                  <li class="flex items-center gap-2"><span class="material-symbols-outlined text-[#5FCF80] text-[16px]">check_circle</span>Comprehensive malpractice coverage</li>
                  <li class="flex items-center gap-2"><span class="material-symbols-outlined text-[#5FCF80] text-[16px]">check_circle</span>Hospital credentialing packet assistance</li>
                </ul>
              </div>
              <button (click)="modalService.openRequestTalent('Locum Tenens')" class="mt-6 w-full py-2.5 bg-[#eff4ff] hover:bg-[#004b87] text-[#004b87] hover:text-white font-bold rounded-lg text-xs transition-colors">
                Request Locum Tenens
              </button>
            </div>

            <!-- Division 5 -->
            <div class="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between">
              <div>
                <div class="w-14 h-14 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-5">
                  <span class="material-symbols-outlined text-[32px]">terminal</span>
                </div>
                <h3 class="font-heading text-xl font-bold text-[#003461]">EHR & Clinical Informatics</h3>
                <p class="text-slate-600 text-sm mt-3 leading-relaxed">
                  Epic, Cerner, Meditech, and Altera certified specialists to ensure flawless system implementations, staff elbow-to-elbow training, and custom clinical workflow optimization.
                </p>
                <ul class="mt-4 space-y-2 text-xs text-slate-700 font-medium">
                  <li class="flex items-center gap-2"><span class="material-symbols-outlined text-[#5FCF80] text-[16px]">check_circle</span>Epic ClinDoc, Willow, Cadence, Stork, ASAP</li>
                  <li class="flex items-center gap-2"><span class="material-symbols-outlined text-[#5FCF80] text-[16px]">check_circle</span>Go-Live support & 24/7 post-deployment</li>
                  <li class="flex items-center gap-2"><span class="material-symbols-outlined text-[#5FCF80] text-[16px]">check_circle</span>Dual clinical + IT certified consultants</li>
                </ul>
              </div>
              <button (click)="modalService.openRequestTalent('EHR & Informatics')" class="mt-6 w-full py-2.5 bg-[#eff4ff] hover:bg-[#004b87] text-[#004b87] hover:text-white font-bold rounded-lg text-xs transition-colors">
                Request EHR Consultants
              </button>
            </div>

            <!-- Division 6 -->
            <div class="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between">
              <div>
                <div class="w-14 h-14 rounded-xl bg-red-100 text-red-800 flex items-center justify-center mb-5">
                  <span class="material-symbols-outlined text-[32px]">emergency</span>
                </div>
                <h3 class="font-heading text-xl font-bold text-[#003461]">Crisis & Strike Surge Units</h3>
                <p class="text-slate-600 text-sm mt-3 leading-relaxed">
                  Rapid deployment strike teams and surge staff for natural disasters, pandemic escalations, facility renovations, and labor dispute contingencies.
                </p>
                <ul class="mt-4 space-y-2 text-xs text-slate-700 font-medium">
                  <li class="flex items-center gap-2"><span class="material-symbols-outlined text-[#5FCF80] text-[16px]">check_circle</span>24 to 48-hour on-site boots on the ground</li>
                  <li class="flex items-center gap-2"><span class="material-symbols-outlined text-[#5FCF80] text-[16px]">check_circle</span>Fully self-contained logistical orientation</li>
                  <li class="flex items-center gap-2"><span class="material-symbols-outlined text-[#5FCF80] text-[16px]">check_circle</span>Coordinated command center oversight</li>
                </ul>
              </div>
              <button (click)="modalService.openRequestTalent('Crisis / Strike Surge')" class="mt-6 w-full py-2.5 bg-[#eff4ff] hover:bg-[#004b87] text-[#004b87] hover:text-white font-bold rounded-lg text-xs transition-colors">
                Request Crisis Teams
              </button>
            </div>

          </div>

        </div>
      </section>

      <!-- QUALITY & COMPLIANCE STANDARD -->
      <section class="py-16 bg-white border-t border-slate-200">
        <div class="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span class="text-xs font-bold uppercase tracking-wider text-[#006a68]">10-Point Credentialing Protocol</span>
            <h2 class="font-heading text-3xl font-extrabold text-[#003461] mt-2">Zero-Tolerance Quality & Compliance Standard</h2>
            <p class="text-slate-600 text-sm mt-3 leading-relaxed">
              Every clinician represented by HDDP Consultants undergoes rigorous primary-source verification prior to submission. We align seamlessly with Joint Commission, CMS, and facility-specific bylaws.
            </p>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6 text-xs text-slate-700">
              <div class="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center gap-2">
                <span class="material-symbols-outlined text-[#5FCF80] text-[18px]">verified</span>
                <span>Nursys Primary Source Licensure</span>
              </div>
              <div class="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center gap-2">
                <span class="material-symbols-outlined text-[#5FCF80] text-[18px]">verified</span>
                <span>10-Panel Drug & Nicotine Screen</span>
              </div>
              <div class="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center gap-2">
                <span class="material-symbols-outlined text-[#5FCF80] text-[18px]">verified</span>
                <span>OIG / SAM / GSA Sanction Checks</span>
              </div>
              <div class="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center gap-2">
                <span class="material-symbols-outlined text-[#5FCF80] text-[18px]">verified</span>
                <span>FBI Fingerprint Background Screen</span>
              </div>
              <div class="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center gap-2">
                <span class="material-symbols-outlined text-[#5FCF80] text-[18px]">verified</span>
                <span>Comprehensive Health & Titers</span>
              </div>
              <div class="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center gap-2">
                <span class="material-symbols-outlined text-[#5FCF80] text-[18px]">verified</span>
                <span>Peer Clinical Reference Audits</span>
              </div>
            </div>
          </div>

          <div class="bg-[#0B3C5D] text-white p-8 rounded-3xl shadow-xl flex flex-col justify-between">
            <div>
              <span class="text-xs font-bold uppercase tracking-wider text-[#86f4f1]">Ready to order talent?</span>
              <h3 class="font-heading text-2xl font-bold text-white mt-1">Submit Your Requirements Today</h3>
              <p class="text-slate-300 text-sm mt-3">
                Our team can present pre-qualified candidate profiles within 24 to 48 hours for immediate review and interview scheduling.
              </p>
            </div>
            <button (click)="modalService.openRequestTalent()" class="mt-8 bg-[#f2a900] hover:bg-amber-400 text-slate-900 font-bold py-3.5 px-6 rounded-xl transition-all shadow text-sm flex items-center justify-center gap-2">
              <span>Launch Staffing Requisition</span>
              <span class="material-symbols-outlined text-[18px]">send</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  `
})
export class HealthcareSolutionsComponent {
  modalService = inject(ModalService);
}
