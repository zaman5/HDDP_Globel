import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ModalService } from '../../services/modal.service';
import { ToastService } from '../../services/toast.service';
import { JobPosition } from '../../models/models';

@Component({
  selector: 'app-candidates',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="flex flex-col w-full">
      
      <!-- HERO -->
      <section class="bg-white py-16 lg:py-20 border-b border-slate-200">
        <div class="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div class="lg:col-span-7 flex flex-col gap-4">
            <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#eff4ff] w-fit">
              <span class="w-2.5 h-2.5 rounded-full bg-[#5FCF80] animate-pulse"></span>
              <span class="text-xs font-bold text-[#004b87] uppercase tracking-wider">Active Clinical Opportunities Nationwide</span>
            </div>
            <h1 class="font-heading text-4xl sm:text-5xl font-extrabold text-[#003461] tracking-tight leading-tight">
              Advance Your Healthcare Career with HDDP
            </h1>
            <p class="text-base sm:text-lg text-slate-600 leading-relaxed">
              We connect Registered Nurses and clinical professionals with high-compensation travel contracts, per diem shifts, and permanent roles across top hospital networks.
            </p>
            
            <div class="flex flex-wrap items-center gap-4 pt-2">
              <button (click)="modalService.openResumeModal()" class="bg-[#004b87] hover:bg-[#0B3C5D] text-white font-bold px-7 py-3.5 rounded-xl shadow-md transition-all text-sm flex items-center gap-2">
                <span>Submit Your Resume</span>
                <span class="material-symbols-outlined text-[18px]">cloud_upload</span>
              </button>
              <a href="#jobs-search" class="bg-[#eff4ff] hover:bg-[#e5eeff] text-[#004b87] font-semibold px-6 py-3.5 rounded-xl transition-all text-sm flex items-center gap-1.5">
                <span class="material-symbols-outlined text-[18px]">search</span>
                <span>Browse {{ jobs().length }} Open Jobs</span>
              </a>
            </div>

            <!-- Trust Metrics -->
            <div class="grid grid-cols-3 gap-4 pt-6 max-w-md">
              <div>
                <span class="font-heading text-2xl sm:text-3xl font-extrabold text-[#004b87] block">100% Free</span>
                <span class="text-xs text-slate-500 font-medium">Candidate Advocacy</span>
              </div>
              <div>
                <span class="font-heading text-2xl sm:text-3xl font-extrabold text-[#004b87] block">48h</span>
                <span class="text-xs text-slate-500 font-medium">Avg Review Speed</span>
              </div>
              <div>
                <span class="font-heading text-2xl sm:text-3xl font-extrabold text-[#004b87] block">500+</span>
                <span class="text-xs text-slate-500 font-medium">Partner Facilities</span>
              </div>
            </div>
          </div>

          <!-- Featured Clinician Profile Card -->
          <div class="lg:col-span-5 relative">
            <div class="bg-gradient-to-br from-[#003461] to-[#0B3C5D] text-white p-6 sm:p-8 rounded-3xl shadow-2xl relative">
              <div class="flex items-center gap-4 border-b border-white/10 pb-4">
                <div class="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-white">
                  <span class="material-symbols-outlined text-[32px] text-[#86f4f1]">badge</span>
                </div>
                <div>
                  <h3 class="font-heading text-lg font-bold">Direct Representation</h3>
                  <p class="text-xs text-slate-300">Dedicated Recruiter • Custom Pay Packages</p>
                </div>
              </div>

              <div class="mt-4 space-y-3 text-xs text-slate-200">
                <div class="flex items-start gap-2">
                  <span class="material-symbols-outlined text-[#5FCF80] text-[18px]">verified</span>
                  <span><strong>Top Tier Rates:</strong> Maximum travel stipends, tax-free housing, and bonus incentives.</span>
                </div>
                <div class="flex items-start gap-2">
                  <span class="material-symbols-outlined text-[#5FCF80] text-[18px]">verified</span>
                  <span><strong>Licensing Assistance:</strong> Reimbursement and fast-track processing for compact and state boards.</span>
                </div>
                <div class="flex items-start gap-2">
                  <span class="material-symbols-outlined text-[#5FCF80] text-[18px]">verified</span>
                  <span><strong>24/7 Clinical Support:</strong> Peer nurse advocate on standby during every assignment.</span>
                </div>
              </div>

              <button (click)="modalService.openResumeModal()" class="mt-6 w-full py-3 bg-[#f2a900] hover:bg-amber-400 text-slate-900 font-extrabold rounded-xl text-xs uppercase tracking-wider transition-all shadow">
                Join Our Talent Network
              </button>
            </div>
          </div>

        </div>
      </section>

      <!-- SEARCH & FILTERABLE JOB BOARD -->
      <section id="jobs-search" class="py-16 bg-[#F5F7FA]">
        <div class="max-w-7xl mx-auto px-6 lg:px-12">
          
          <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <span class="text-xs font-bold uppercase tracking-wider text-[#006a68]">Live Opportunities</span>
              <h2 class="font-heading text-3xl font-extrabold text-[#003461] mt-1">Search Available Positions</h2>
            </div>
            <span class="text-xs font-semibold text-slate-500 bg-white px-3.5 py-2 rounded-xl border border-slate-200">
              Showing {{ jobs().length }} Active Requisitions
            </span>
          </div>

          <!-- Search Filter Bar -->
          <div class="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label class="block text-xs font-bold uppercase text-slate-600 mb-1">Keywords / Title</label>
              <input 
                type="text" 
                [(ngModel)]="searchQuery" 
                (ngModelChange)="filterJobs()" 
                placeholder="e.g. ICU, OR, Radiography..." 
                class="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#004b87] text-xs text-slate-900" />
            </div>

            <div>
              <label class="block text-xs font-bold uppercase text-slate-600 mb-1">Specialty</label>
              <select 
                [(ngModel)]="selectedSpecialty" 
                (ngModelChange)="filterJobs()" 
                class="w-full px-3 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#004b87] bg-white text-xs text-slate-900">
                <option value="">All Specialties</option>
                <option value="Nursing">Nursing (All Units)</option>
                <option value="ICU">ICU / CCU</option>
                <option value="Emergency">Emergency Department</option>
                <option value="Perioperative">Operating Room / OR</option>
                <option value="Med-Surg">Med-Surg / Tele</option>
                <option value="Allied Health">Allied Health & Diagnostics</option>
                <option value="Informatics">EHR & Informatics</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-bold uppercase text-slate-600 mb-1">Position Type</label>
              <select 
                [(ngModel)]="selectedJobType" 
                (ngModelChange)="filterJobs()" 
                class="w-full px-3 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#004b87] bg-white text-xs text-slate-900">
                <option value="">All Job Types</option>
                <option value="Travel">Travel Contract</option>
                <option value="Direct">Direct Hire / Full Time</option>
                <option value="Per Diem">Per Diem / PRN</option>
                <option value="Contract-to-Hire">Contract-to-Hire</option>
              </select>
            </div>

            <div class="flex items-end">
              <button 
                (click)="resetFilters()" 
                class="w-full py-2.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors">
                Clear Filters
              </button>
            </div>
          </div>

          <!-- Jobs List Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div *ngFor="let job of jobs()" class="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 hover:border-[#004b87] shadow-sm hover:shadow-lg transition-all flex flex-col justify-between">
              <div>
                <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div class="flex items-center gap-2">
                    <span class="px-2.5 py-1 rounded bg-[#004b87]/10 text-[#004b87] text-xs font-bold">{{ job.job_type }}</span>
                    <span *ngIf="job.compact_eligible" class="px-2 py-0.5 rounded bg-teal-100 text-teal-800 text-[11px] font-bold">eNLC Compact</span>
                  </div>
                  <span class="inline-flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full">
                    <span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    {{ job.urgency_level }}
                  </span>
                </div>

                <h3 class="font-heading text-xl font-bold text-[#003461]">{{ job.title }}</h3>
                
                <div class="mt-2 flex flex-wrap items-center gap-4 text-xs text-slate-500 font-medium">
                  <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[16px] text-[#006a68]">location_on</span>{{ job.location }}</span>
                  <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[16px] text-[#006a68]">schedule</span>{{ job.shift }}</span>
                  <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[16px] text-[#006a68]">work_history</span>{{ job.experience_required }}</span>
                </div>

                <p class="mt-4 text-xs text-slate-600 leading-relaxed">{{ job.description }}</p>

                <div class="mt-3 bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-[11px] text-slate-600">
                  <strong class="text-slate-800">Requirements:</strong> {{ job.requirements }}
                </div>
              </div>

              <div class="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span class="text-[11px] text-slate-400 block font-semibold uppercase">Estimated Rate</span>
                  <span class="text-base font-extrabold text-[#003461]">{{ job.pay_range }}</span>
                </div>
                <button 
                  (click)="modalService.openResumeModal(job.title)" 
                  class="px-6 py-2.5 rounded-xl bg-[#004b87] hover:bg-[#0B3C5D] text-white text-xs font-bold transition-all shadow hover:shadow-md flex items-center gap-1.5">
                  <span>Apply Now</span>
                  <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
            </div>

            <div *ngIf="jobs().length === 0" class="col-span-2 text-center py-16 bg-white rounded-2xl border border-slate-200">
              <span class="material-symbols-outlined text-[48px] text-slate-400">search_off</span>
              <h3 class="font-heading text-lg font-bold text-slate-700 mt-2">No positions matched your search</h3>
              <p class="text-xs text-slate-500 mt-1">Try adjusting your specialty or search term, or submit a general resume application.</p>
              <button (click)="resetFilters()" class="mt-4 px-4 py-2 bg-[#004b87] text-white rounded-lg text-xs font-bold">
                Reset Filters
              </button>
            </div>

          </div>

        </div>
      </section>

    </div>
  `
})
export class CandidatesComponent implements OnInit {
  apiService = inject(ApiService);
  modalService = inject(ModalService);
  toastService = inject(ToastService);

  allJobs: JobPosition[] = [];
  jobs = signal<JobPosition[]>([]);
  searchQuery = '';
  selectedSpecialty = '';
  selectedJobType = '';

  ngOnInit() {
    this.loadJobs();
  }

  loadJobs() {
    this.apiService.getJobs().subscribe({
      next: (res) => {
        if (res.data) {
          this.allJobs = res.data;
          this.jobs.set(res.data);
        }
      }
    });
  }

  filterJobs() {
    const filtered = this.allJobs.filter(job => {
      const matchSearch = !this.searchQuery || 
        job.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        job.department.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        job.requirements.toLowerCase().includes(this.searchQuery.toLowerCase());

      const matchSpecialty = !this.selectedSpecialty || 
        job.specialty.toLowerCase().includes(this.selectedSpecialty.toLowerCase()) ||
        job.department.toLowerCase().includes(this.selectedSpecialty.toLowerCase());

      const matchType = !this.selectedJobType || 
        job.job_type.toLowerCase().includes(this.selectedJobType.toLowerCase());

      return matchSearch && matchSpecialty && matchType;
    });

    this.jobs.set(filtered);
  }

  resetFilters() {
    this.searchQuery = '';
    this.selectedSpecialty = '';
    this.selectedJobType = '';
    this.jobs.set(this.allJobs);
  }
}
