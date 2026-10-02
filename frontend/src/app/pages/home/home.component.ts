import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { ModalService } from '../../services/modal.service';
import { PlatformStats, JobPosition } from '../../models/models';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="flex flex-col w-full">
      
      <!-- HERO SECTION -->
      <section class="relative w-full overflow-hidden bg-[#f8f9ff] pt-6 pb-12 lg:pt-10 lg:pb-16">
        <!-- Ambient Blurred Backdrops -->
        <div class="pointer-events-none absolute -top-40 right-[-10%] h-[580px] w-[580px] rounded-full bg-gradient-to-br from-[#006a68]/15 via-[#d3e4ff]/30 to-transparent blur-3xl"></div>
        <div class="pointer-events-none absolute -bottom-32 -left-20 h-[480px] w-[480px] rounded-full bg-gradient-to-tr from-[#5FCF80]/15 via-[#e5eeff]/40 to-transparent blur-3xl"></div>

        <div class="relative mx-auto max-w-7xl px-6 lg:px-12">
          <div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            
            <!-- Left Column: Copy & CTAs -->
            <div class="flex flex-col lg:col-span-7">
              <h1 class="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#003461] tracking-tight leading-[1.15]">
                Connecting Healthcare Talent to Where It Matters Most
              </h1>

              <p class="mt-6 text-lg sm:text-xl text-[#1E293B] font-medium leading-relaxed">
                HDDP Consultants partners with healthcare staffing agencies and hospital providers to deliver pre-screened, job-ready nurses and clinicians—quickly, efficiently, and at scale.
              </p>

              <p class="mt-3 text-base text-slate-600 max-w-2xl leading-relaxed">
                From critical emergency shortages to high-volume travel contracts, we act as your dedicated recruitment infrastructure—helping you fill clinical roles faster while drastically lowering staffing overhead.
              </p>

              <!-- CTAs -->
              <div class="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
                <button 
                  (click)="modalService.openRequestTalent()" 
                  class="inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#004b87] hover:bg-[#0B3C5D] px-8 py-4 text-base font-bold text-white shadow-lg hover:shadow-xl transition-all">
                  <span>Request Talent</span>
                  <span class="material-symbols-outlined text-[20px]">arrow_forward</span>
                </button>
                <a 
                  routerLink="/partner-with-us" 
                  class="inline-flex items-center justify-center gap-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 px-8 py-4 text-base font-bold text-[#003461] shadow-sm transition-all">
                  <span class="material-symbols-outlined text-[20px] text-[#006a68]">handshake</span>
                  <span>Partner With Us</span>
                </a>
              </div>

              <!-- Micro Credentialing Highlights -->
              <div class="mt-10 flex flex-wrap items-center gap-6 text-slate-700 text-sm font-semibold">
                <div class="flex items-center gap-2">
                  <span class="material-symbols-outlined text-[#5FCF80] text-[22px]">verified</span>
                  <span>Primary-Source Verified</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="material-symbols-outlined text-[#5FCF80] text-[22px]">verified</span>
                  <span>Joint Commission Aligned</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="material-symbols-outlined text-[#5FCF80] text-[22px]">speed</span>
                  <span>48–96h Turnaround SLA</span>
                </div>
              </div>
            </div>

            <!-- Right Column: Visual Composite Card -->
            <div class="relative lg:col-span-5">
              <div class="relative overflow-hidden rounded-3xl bg-white shadow-2xl border border-slate-200">
                <img 
                  class="h-[440px] w-full object-cover object-top" 
                  alt="Clinical registered nurse on duty" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHDrmUJM8S8umdBMVSw7Lar0K0cv0lJK5Clb5gz08lz43fPA3cH5e5i0uochZzEnjQxPzZuIcpEkArN7Z8aniergr4X5G5yuhVceuBDpiTN_SYw5Ioio16cR-K3cw5qCk_hrYE-U_yvmD5ps6GSEVSrbcbkIz8zWwdGpUKH61mZ5ygjFV4u_A5x1bSqjvrSOMnh17rvjxHW6O5IGqviH_1qvGrBGhiYO1GYBEd93SbZytJ1L8pRqhBZw" />
                <div class="absolute inset-0 bg-gradient-to-t from-[#0B3C5D]/80 via-transparent to-transparent"></div>
                
                <!-- Bottom Live Badge -->
                <div class="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-xl bg-white/95 px-4 py-3 backdrop-blur-md shadow-lg border border-slate-100">
                  <div class="flex items-center gap-3">
                    <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-[#006a68]/15 text-[#006a68]">
                      <span class="material-symbols-outlined text-[24px]">verified_user</span>
                    </div>
                    <div>
                      <div class="font-bold text-sm text-[#003461]">Credential Verified</div>
                      <div class="text-xs text-slate-500">RN • ICU / Med-Surg • Compact License</div>
                    </div>
                  </div>
                  <span class="inline-flex items-center rounded-md bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 text-xs">
                    Ready to Deploy
                  </span>
                </div>
              </div>

              <!-- Floating SLA Metric Badge -->
              <div class="absolute -top-5 -left-5 z-20 hidden sm:flex items-center gap-3 rounded-2xl bg-white p-4 shadow-xl border border-slate-100">
                <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-[#004b87] text-white">
                  <span class="material-symbols-outlined text-[26px]">timer</span>
                </div>
                <div>
                  <div class="font-heading text-2xl font-extrabold text-[#003461] leading-tight">48–96h</div>
                  <div class="text-xs text-slate-500 font-medium">Placement Turnaround SLA</div>
                </div>
              </div>

              <!-- Floating Retention Badge -->
              <div class="absolute -bottom-5 -right-4 z-20 hidden sm:flex items-center gap-3 rounded-2xl bg-[#0B3C5D] p-4 text-white shadow-xl">
                <span class="material-symbols-outlined text-[#86f4f1] text-[28px]">groups</span>
                <div>
                  <div class="font-heading text-xl font-bold">98.4%</div>
                  <div class="text-xs text-slate-300">Client Retention Rate</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- TRUST & CREDIBILITY METRICS BAR -->
      <section class="w-full bg-white border-y border-[#E2E8F0] py-8">
        <div class="max-w-7xl mx-auto px-6 lg:px-12">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div class="flex flex-col items-center">
              <span class="font-heading text-3xl sm:text-4xl font-extrabold text-[#004b87]">500+</span>
              <span class="text-xs sm:text-sm font-semibold text-slate-600 mt-1">Partner Healthcare Facilities</span>
            </div>
            <div class="flex flex-col items-center">
              <span class="font-heading text-3xl sm:text-4xl font-extrabold text-[#004b87]">14,500+</span>
              <span class="text-xs sm:text-sm font-semibold text-slate-600 mt-1">Pre-Screened Clinicians</span>
            </div>
            <div class="flex flex-col items-center">
              <span class="font-heading text-3xl sm:text-4xl font-extrabold text-[#004b87]">50 States</span>
              <span class="text-xs sm:text-sm font-semibold text-slate-600 mt-1">National Licensure Network</span>
            </div>
            <div class="flex flex-col items-center">
              <span class="font-heading text-3xl sm:text-4xl font-extrabold text-[#004b87]">48–96h</span>
              <span class="text-xs sm:text-sm font-semibold text-slate-600 mt-1">Average Sourcing Velocity</span>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 2: 4 CORE SERVICE PILLARS -->
      <section class="w-full py-16 lg:py-24 bg-[#F5F7FA]">
        <div class="max-w-7xl mx-auto px-6 lg:px-12">
          
          <div class="text-center max-w-3xl mx-auto mb-16">
            <span class="text-xs font-bold uppercase tracking-wider text-[#006a68] bg-[#eff4ff] px-4 py-1.5 rounded-full">Comprehensive Clinical Coverage</span>
            <h2 class="font-heading text-3xl sm:text-4xl font-extrabold text-[#003461] mt-3">
              Tailored Healthcare Solutions Built for Scalability
            </h2>
            <p class="text-slate-600 mt-3 text-base">
              Whether you need rapid surge relief, specialized travel nursing contracts, or enterprise Allied Health coverage, HDDP delivers compliant workforce solutions.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <!-- Card 1 -->
            <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between">
              <div>
                <div class="w-12 h-12 rounded-xl bg-[#e5eeff] text-[#004b87] flex items-center justify-center mb-4">
                  <span class="material-symbols-outlined text-[28px]">flight_takeoff</span>
                </div>
                <h3 class="font-heading text-lg font-bold text-[#003461]">Travel Nursing</h3>
                <p class="text-slate-600 text-sm mt-2 leading-relaxed">
                  13 to 26-week assignments for ICU, ER, OR, Telemetry, and Med-Surg RNs ready for immediate deployment.
                </p>
                <div class="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-500 space-y-1.5">
                  <div class="flex items-center gap-1.5"><span class="material-symbols-outlined text-xs text-[#5FCF80]">check_circle</span>Compact Multi-State</div>
                  <div class="flex items-center gap-1.5"><span class="material-symbols-outlined text-xs text-[#5FCF80]">check_circle</span>Full Health Clearances</div>
                </div>
              </div>
              <a routerLink="/healthcare-solutions" class="mt-6 text-xs font-bold text-[#004b87] hover:text-[#0B3C5D] flex items-center gap-1">
                <span>Learn More</span>
                <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
              </a>
            </div>

            <!-- Card 2 -->
            <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between">
              <div>
                <div class="w-12 h-12 rounded-xl bg-[#86f4f1]/20 text-[#006a68] flex items-center justify-center mb-4">
                  <span class="material-symbols-outlined text-[28px]">schedule</span>
                </div>
                <h3 class="font-heading text-lg font-bold text-[#003461]">Per Diem & PRN Staffing</h3>
                <p class="text-slate-600 text-sm mt-2 leading-relaxed">
                  Flexible local shift coverage to manage census spikes, seasonal surges, and unexpected nurse call-outs.
                </p>
                <div class="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-500 space-y-1.5">
                  <div class="flex items-center gap-1.5"><span class="material-symbols-outlined text-xs text-[#5FCF80]">check_circle</span>24/7 Dispatch Availability</div>
                  <div class="flex items-center gap-1.5"><span class="material-symbols-outlined text-xs text-[#5FCF80]">check_circle</span>Local Clinician Pools</div>
                </div>
              </div>
              <a routerLink="/healthcare-solutions" class="mt-6 text-xs font-bold text-[#004b87] hover:text-[#0B3C5D] flex items-center gap-1">
                <span>Learn More</span>
                <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
              </a>
            </div>

            <!-- Card 3 -->
            <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between">
              <div>
                <div class="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-4">
                  <span class="material-symbols-outlined text-[28px]">biotech</span>
                </div>
                <h3 class="font-heading text-lg font-bold text-[#003461]">Allied Health & Imaging</h3>
                <p class="text-slate-600 text-sm mt-2 leading-relaxed">
                  Radiologic Technologists, Cath Lab Specialists, Respiratory Therapists, and Certified Lab Technicians.
                </p>
                <div class="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-500 space-y-1.5">
                  <div class="flex items-center gap-1.5"><span class="material-symbols-outlined text-xs text-[#5FCF80]">check_circle</span>ARRT / NBRC Certified</div>
                  <div class="flex items-center gap-1.5"><span class="material-symbols-outlined text-xs text-[#5FCF80]">check_circle</span>Specialty Verified</div>
                </div>
              </div>
              <a routerLink="/healthcare-solutions" class="mt-6 text-xs font-bold text-[#004b87] hover:text-[#0B3C5D] flex items-center gap-1">
                <span>Learn More</span>
                <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
              </a>
            </div>

            <!-- Card 4 -->
            <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between">
              <div>
                <div class="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4">
                  <span class="material-symbols-outlined text-[28px]">terminal</span>
                </div>
                <h3 class="font-heading text-lg font-bold text-[#003461]">EHR & Clinical Tech</h3>
                <p class="text-slate-600 text-sm mt-2 leading-relaxed">
                  Epic and Cerner credentialed clinical informatics trainers and Go-Live support teams for hospital system upgrades.
                </p>
                <div class="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-500 space-y-1.5">
                  <div class="flex items-center gap-1.5"><span class="material-symbols-outlined text-xs text-[#5FCF80]">check_circle</span>Epic / Cerner Certified</div>
                  <div class="flex items-center gap-1.5"><span class="material-symbols-outlined text-xs text-[#5FCF80]">check_circle</span>Workflow Optimization</div>
                </div>
              </div>
              <a routerLink="/healthcare-solutions" class="mt-6 text-xs font-bold text-[#004b87] hover:text-[#0B3C5D] flex items-center gap-1">
                <span>Learn More</span>
                <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
              </a>
            </div>

          </div>

        </div>
      </section>

      <!-- SECTION 3: FEATURED OPEN POSITIONS -->
      <section class="w-full py-16 bg-white border-t border-slate-200">
        <div class="max-w-7xl mx-auto px-6 lg:px-12">
          
          <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span class="text-xs font-bold uppercase tracking-wider text-[#006a68]">Live Requisitions</span>
              <h2 class="font-heading text-3xl font-extrabold text-[#003461] mt-1">Featured High-Priority Openings</h2>
              <p class="text-slate-600 text-sm mt-1">Direct from our partner hospital network across the United States.</p>
            </div>
            <a routerLink="/candidates" class="inline-flex items-center gap-2 text-sm font-bold text-[#004b87] hover:text-[#0B3C5D]">
              <span>View All {{ totalJobs() }} Open Positions</span>
              <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
            </a>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div *ngFor="let job of featuredJobs()" class="bg-[#F8F9FF] p-6 rounded-2xl border border-slate-200 hover:border-[#004b87] shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between gap-2 mb-3">
                  <span class="px-2.5 py-1 rounded bg-[#004b87]/10 text-[#004b87] text-xs font-bold">{{ job.job_type }}</span>
                  <span class="inline-flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full">
                    <span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    {{ job.urgency_level }}
                  </span>
                </div>
                <h3 class="font-heading text-lg font-bold text-[#003461] leading-snug">{{ job.title }}</h3>
                <div class="mt-2 flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                  <span class="material-symbols-outlined text-[16px] text-[#006a68]">location_on</span>
                  <span>{{ job.location }}</span>
                </div>
                <p class="mt-3 text-xs text-slate-600 leading-relaxed line-clamp-2">{{ job.description }}</p>
              </div>

              <div class="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">
                <div>
                  <span class="text-xs text-slate-400 block font-medium">Est. Compensation</span>
                  <span class="text-sm font-extrabold text-[#003461]">{{ job.pay_range }}</span>
                </div>
                <button 
                  (click)="modalService.openResumeModal(job.title)" 
                  class="px-4 py-2 rounded-lg bg-[#004b87] hover:bg-[#0B3C5D] text-white text-xs font-bold transition-colors">
                  Quick Apply
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      <!-- SECTION 4: CALL TO ACTION BANNER -->
      <section class="w-full bg-[#0B3C5D] text-white py-16 px-6 lg:px-12 relative overflow-hidden">
        <div class="max-w-5xl mx-auto text-center relative z-10">
          <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold uppercase tracking-wider text-[#86f4f1] mb-4">
            <span class="w-2 h-2 rounded-full bg-[#5FCF80]"></span>
            Accelerate Your Healthcare Workforce
          </span>
          <h2 class="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Ready to Solve Your Clinical Staffing Challenges?
          </h2>
          <p class="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
            Connect with our enterprise talent directors today to discuss rapid deployment contracts, per diem pooling, or custom agency partnerships.
          </p>

          <div class="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              (click)="modalService.openRequestTalent()" 
              class="w-full sm:w-auto bg-[#f2a900] hover:bg-amber-400 text-slate-900 font-extrabold px-8 py-4 rounded-xl shadow-lg transition-all text-base flex items-center justify-center gap-2">
              <span>Submit Staffing Requisition</span>
              <span class="material-symbols-outlined text-[20px]">send</span>
            </button>
            <a 
              routerLink="/contact-us" 
              class="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-4 rounded-xl border border-white/20 transition-all text-base flex items-center justify-center gap-2">
              <span class="material-symbols-outlined text-[20px]">phone</span>
              <span>Speak to an Advisor</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  `
})
export class HomeComponent implements OnInit {
  apiService = inject(ApiService);
  modalService = inject(ModalService);

  featuredJobs = signal<JobPosition[]>([]);
  totalJobs = signal<number>(6);

  ngOnInit() {
    this.apiService.getJobs().subscribe({
      next: (res) => {
        if (res.data) {
          this.featuredJobs.set(res.data.slice(0, 3));
          this.totalJobs.set(res.count);
        }
      }
    });
  }
}
