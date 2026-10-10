import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';
import { JobPosition, CandidateApplication, TalentRequest, PartnerApplication, ContactInquiry, PlatformStats } from '../../models/models';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="flex flex-col w-full bg-[#F5F7FA] min-h-screen pb-20">
      
      <!-- ADMIN HEADER -->
      <section class="bg-[#0B3C5D] text-white py-10 px-6 lg:px-12 border-b border-[#213145]">
        <div class="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-0.5 rounded bg-amber-400/20 text-amber-300 font-bold text-xs uppercase tracking-wider">Enterprise Management Portal</span>
              <span class="w-2 h-2 rounded-full bg-[#5FCF80] animate-pulse"></span>
              <span class="text-xs text-slate-300">Database Engine: <strong>{{ stats()?.dbEngine || 'Active' }}</strong></span>
            </div>
            <h1 class="font-heading text-3xl font-extrabold text-white mt-1">HDDP Recruitment Command Center</h1>
          </div>

          <div class="flex items-center gap-3">
            <button (click)="refreshData()" class="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 border border-white/20">
              <span class="material-symbols-outlined text-[16px]">refresh</span>
              <span>Refresh Records</span>
            </button>
            <button (click)="activeTab = 'new-job'" class="px-5 py-2 bg-[#f2a900] hover:bg-amber-400 text-slate-900 font-extrabold rounded-lg text-xs transition-all shadow flex items-center gap-1.5">
              <span class="material-symbols-outlined text-[16px]">add_circle</span>
              <span>Publish New Position</span>
            </button>
          </div>
        </div>
      </section>

      <!-- STATS STRIP -->
      <div class="max-w-7xl mx-auto px-6 lg:px-12 -mt-5">
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <span class="text-xs text-slate-400 font-semibold block uppercase">Candidates Applied</span>
            <span class="font-heading text-2xl font-extrabold text-[#004b87]">{{ candidates().length }}</span>
          </div>
          <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <span class="text-xs text-slate-400 font-semibold block uppercase">Staffing Requisitions</span>
            <span class="font-heading text-2xl font-extrabold text-[#004b87]">{{ talentRequests().length }}</span>
          </div>
          <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <span class="text-xs text-slate-400 font-semibold block uppercase">Partner Inquiries</span>
            <span class="font-heading text-2xl font-extrabold text-[#004b87]">{{ partnerApps().length }}</span>
          </div>
          <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <span class="text-xs text-slate-400 font-semibold block uppercase">Active Job Postings</span>
            <span class="font-heading text-2xl font-extrabold text-[#004b87]">{{ jobs().length }}</span>
          </div>
        </div>
      </div>

      <!-- MAIN TABS & DATA TABLES -->
      <div class="max-w-7xl mx-auto px-6 lg:px-12 mt-8">
        
        <!-- Tab Switcher -->
        <div class="flex items-center gap-2 border-b border-slate-200 pb-2 mb-6 overflow-x-auto text-xs font-bold uppercase tracking-wider">
          <button 
            (click)="activeTab = 'candidates'" 
            [ngClass]="activeTab === 'candidates' ? 'bg-[#004b87] text-white' : 'bg-white text-slate-600 hover:bg-slate-100'"
            class="px-4 py-2.5 rounded-lg transition-all flex items-center gap-1.5 shrink-0 border border-slate-200">
            <span class="material-symbols-outlined text-[18px]">person</span>
            <span>Candidates ({{ candidates().length }})</span>
          </button>

          <button 
            (click)="activeTab = 'talent-requests'" 
            [ngClass]="activeTab === 'talent-requests' ? 'bg-[#004b87] text-white' : 'bg-white text-slate-600 hover:bg-slate-100'"
            class="px-4 py-2.5 rounded-lg transition-all flex items-center gap-1.5 shrink-0 border border-slate-200">
            <span class="material-symbols-outlined text-[18px]">assignment</span>
            <span>Talent Requests ({{ talentRequests().length }})</span>
          </button>

          <button 
            (click)="activeTab = 'partners'" 
            [ngClass]="activeTab === 'partners' ? 'bg-[#004b87] text-white' : 'bg-white text-slate-600 hover:bg-slate-100'"
            class="px-4 py-2.5 rounded-lg transition-all flex items-center gap-1.5 shrink-0 border border-slate-200">
            <span class="material-symbols-outlined text-[18px]">handshake</span>
            <span>Partner Applications ({{ partnerApps().length }})</span>
          </button>

          <button 
            (click)="activeTab = 'contacts'" 
            [ngClass]="activeTab === 'contacts' ? 'bg-[#004b87] text-white' : 'bg-white text-slate-600 hover:bg-slate-100'"
            class="px-4 py-2.5 rounded-lg transition-all flex items-center gap-1.5 shrink-0 border border-slate-200">
            <span class="material-symbols-outlined text-[18px]">mail</span>
            <span>Inquiries ({{ contactInquiries().length }})</span>
          </button>

          <button 
            (click)="activeTab = 'new-job'" 
            [ngClass]="activeTab === 'new-job' ? 'bg-[#004b87] text-white' : 'bg-white text-slate-600 hover:bg-slate-100'"
            class="px-4 py-2.5 rounded-lg transition-all flex items-center gap-1.5 shrink-0 border border-slate-200">
            <span class="material-symbols-outlined text-[18px]">add</span>
            <span>Post Job</span>
          </button>
        </div>

        <!-- TAB 1: CANDIDATES -->
        <div *ngIf="activeTab === 'candidates'" class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div class="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <h3 class="font-heading font-bold text-sm text-[#003461]">Submitted Candidate Applications</h3>
            <span class="text-xs text-slate-500">Click a row to see full details</span>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs text-slate-700">
              <thead class="bg-slate-100 text-slate-600 uppercase font-bold text-[11px] border-b border-slate-200">
                <tr>
                  <th class="p-3.5">ID</th>
                  <th class="p-3.5">Name</th>
                  <th class="p-3.5">Contact</th>
                  <th class="p-3.5">Applied For</th>
                  <th class="p-3.5">Experience</th>
                  <th class="p-3.5">Applied On</th>
                  <th class="p-3.5">Status</th>
                  <th class="p-3.5">CV / Resume</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                <ng-container *ngFor="let c of candidates()">
                <tr (click)="toggleCandidate(c.id)" class="hover:bg-slate-50 cursor-pointer" [ngClass]="expandedCandidateId === c.id ? 'bg-slate-50' : ''">
                  <td class="p-3.5 font-bold text-slate-900">
                    <span class="material-symbols-outlined text-[16px] align-middle text-slate-400">{{ expandedCandidateId === c.id ? 'expand_less' : 'expand_more' }}</span>#{{ c.id }}
                  </td>
                  <td class="p-3.5 font-bold text-[#004b87]">{{ c.first_name }} {{ c.last_name }}</td>
                  <td class="p-3.5">
                    <div>{{ c.email }}</div>
                    <div class="text-slate-400 text-[11px]">{{ c.phone }}</div>
                  </td>
                  <td class="p-3.5">
                    <span *ngIf="c.job_title" class="px-2 py-0.5 rounded bg-blue-50 text-blue-800 font-semibold">{{ c.job_title }}</span>
                    <span *ngIf="!c.job_title" class="text-slate-400">General application</span>
                  </td>
                  <td class="p-3.5">{{ c.years_experience }}</td>
                  <td class="p-3.5">{{ c.created_at | date:'mediumDate' }}</td>
                  <td class="p-3.5"><span class="px-2 py-0.5 rounded bg-amber-50 text-amber-800 font-bold">{{ c.status }}</span></td>
                  <td class="p-3.5">
                    <a *ngIf="c.resume_path && c.id" [href]="apiService.getResumeDownloadUrl(c.id)" (click)="$event.stopPropagation()"
                      class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#004b87] hover:bg-[#0B3C5D] text-white font-bold">
                      <span class="material-symbols-outlined text-[16px]">download</span>
                      Download
                    </a>
                    <span *ngIf="!c.resume_path" class="text-slate-400">No file</span>
                  </td>
                </tr>
                <tr *ngIf="expandedCandidateId === c.id" class="bg-slate-50">
                  <td colspan="8" class="px-6 pb-6 pt-2">
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-5 rounded-xl border border-slate-200">
                      <div><span class="block text-[10px] uppercase font-bold text-slate-400">Full Name</span>{{ c.first_name }} {{ c.last_name }}</div>
                      <div><span class="block text-[10px] uppercase font-bold text-slate-400">Email</span><a [href]="'mailto:' + c.email" class="text-[#004b87] font-semibold">{{ c.email }}</a></div>
                      <div><span class="block text-[10px] uppercase font-bold text-slate-400">Phone</span><a [href]="'tel:' + c.phone" class="text-[#004b87] font-semibold">{{ c.phone }}</a></div>
                      <div><span class="block text-[10px] uppercase font-bold text-slate-400">Location</span>{{ locationOf(c) }}<span *ngIf="c.country"> — {{ c.country }}</span></div>
                      <div><span class="block text-[10px] uppercase font-bold text-slate-400">Work Authorization</span>{{ c.work_authorization || '—' }}</div>
                      <div><span class="block text-[10px] uppercase font-bold text-slate-400">Privacy Consent Given</span>{{ c.privacy_consent_at ? (c.privacy_consent_at | date:'medium') : 'Not recorded' }}</div>
                      <div><span class="block text-[10px] uppercase font-bold text-slate-400">Applied For</span>{{ c.job_title || 'General application' }}<span *ngIf="c.job_id" class="text-slate-400"> (Job #{{ c.job_id }})</span></div>
                      <div><span class="block text-[10px] uppercase font-bold text-slate-400">Specialty</span>{{ c.specialty || '—' }}</div>
                      <div><span class="block text-[10px] uppercase font-bold text-slate-400">License / Certifications</span>{{ c.license_type || '—' }}</div>
                      <div><span class="block text-[10px] uppercase font-bold text-slate-400">Experience</span>{{ c.years_experience || '—' }}</div>
                      <div><span class="block text-[10px] uppercase font-bold text-slate-400">Expected Pay</span>{{ c.desired_pay || '—' }}</div>
                      <div><span class="block text-[10px] uppercase font-bold text-slate-400">Applied On</span>{{ c.created_at | date:'medium' }}</div>
                      <div class="col-span-2"><span class="block text-[10px] uppercase font-bold text-slate-400">CV / Resume File</span>
                        <a *ngIf="c.resume_path && c.id" [href]="apiService.getResumeDownloadUrl(c.id)" class="inline-flex items-center gap-1 text-[#004b87] font-bold">
                          <span class="material-symbols-outlined text-[16px]">download</span>{{ c.resume_filename }}
                        </a>
                        <span *ngIf="!c.resume_path">No file uploaded</span>
                      </div>
                      <div class="col-span-2 md:col-span-4"><span class="block text-[10px] uppercase font-bold text-slate-400">Cover Note</span><p class="whitespace-pre-line">{{ c.notes || '—' }}</p></div>
                    </div>
                  </td>
                </tr>
                </ng-container>
                <tr *ngIf="candidates().length === 0">
                  <td colspan="8" class="p-8 text-center text-slate-400">No candidate submissions recorded yet. Submit one from Candidates page!</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- TAB 2: TALENT REQUESTS -->
        <div *ngIf="activeTab === 'talent-requests'" class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div class="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <h3 class="font-heading font-bold text-sm text-[#003461]">Hospital & Partner Staffing Requisitions</h3>
            <span class="text-xs text-slate-500">Stored in MySQL DB</span>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs text-slate-700">
              <thead class="bg-slate-100 text-slate-600 uppercase font-bold text-[11px] border-b border-slate-200">
                <tr>
                  <th class="p-3.5">ID</th>
                  <th class="p-3.5">Organization</th>
                  <th class="p-3.5">Contact</th>
                  <th class="p-3.5">Roles Needed</th>
                  <th class="p-3.5">Qty</th>
                  <th class="p-3.5">Location</th>
                  <th class="p-3.5">Urgency</th>
                  <th class="p-3.5">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                <tr *ngFor="let r of talentRequests()" class="hover:bg-slate-50">
                  <td class="p-3.5 font-bold text-slate-900">#{{ r.id }}</td>
                  <td class="p-3.5 font-bold text-[#004b87]">{{ r.organization_name }}</td>
                  <td class="p-3.5">
                    <div>{{ r.contact_name }}</div>
                    <div class="text-slate-400 text-[11px]">{{ r.work_email }} • {{ r.phone_number }}</div>
                  </td>
                  <td class="p-3.5 font-semibold text-slate-800">{{ r.roles_needed }}</td>
                  <td class="p-3.5 font-bold">{{ r.num_positions }}</td>
                  <td class="p-3.5">{{ r.facility_city }}, {{ r.facility_state }}</td>
                  <td class="p-3.5"><span class="px-2 py-0.5 rounded bg-red-50 text-red-800 font-bold">{{ r.urgency_level }}</span></td>
                  <td class="p-3.5"><span class="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-bold">{{ r.status }}</span></td>
                </tr>
                <tr *ngIf="talentRequests().length === 0">
                  <td colspan="8" class="p-8 text-center text-slate-400">No requisitions logged yet.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- TAB 3: PARTNER APPLICATIONS -->
        <div *ngIf="activeTab === 'partners'" class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div class="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <h3 class="font-heading font-bold text-sm text-[#003461]">B2B Agency & Hospital Partner Applications</h3>
            <span class="text-xs text-slate-500">Stored in MySQL DB</span>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs text-slate-700">
              <thead class="bg-slate-100 text-slate-600 uppercase font-bold text-[11px] border-b border-slate-200">
                <tr>
                  <th class="p-3.5">ID</th>
                  <th class="p-3.5">Company</th>
                  <th class="p-3.5">Contact & Title</th>
                  <th class="p-3.5">Organization Type</th>
                  <th class="p-3.5">Volume</th>
                  <th class="p-3.5">Coverage</th>
                  <th class="p-3.5">Units</th>
                  <th class="p-3.5">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                <tr *ngFor="let p of partnerApps()" class="hover:bg-slate-50">
                  <td class="p-3.5 font-bold text-slate-900">#{{ p.id }}</td>
                  <td class="p-3.5 font-bold text-[#004b87]">{{ p.company_name }}</td>
                  <td class="p-3.5">
                    <div>{{ p.contact_name }} ({{ p.job_title }})</div>
                    <div class="text-slate-400 text-[11px]">{{ p.work_email }} • {{ p.phone_number }}</div>
                  </td>
                  <td class="p-3.5">{{ p.organization_type }}</td>
                  <td class="p-3.5 font-semibold">{{ p.staffing_volume }}</td>
                  <td class="p-3.5">{{ p.geographic_reach }}</td>
                  <td class="p-3.5 text-slate-600">{{ p.specialized_units }}</td>
                  <td class="p-3.5"><span class="px-2 py-0.5 rounded bg-amber-50 text-amber-800 font-bold">{{ p.status }}</span></td>
                </tr>
                <tr *ngIf="partnerApps().length === 0">
                  <td colspan="8" class="p-8 text-center text-slate-400">No partner applications yet.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- TAB 4: CONTACT INQUIRIES -->
        <div *ngIf="activeTab === 'contacts'" class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div class="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <h3 class="font-heading font-bold text-sm text-[#003461]">Website Inquiries & Consultation Requests</h3>
            <span class="text-xs text-slate-500">Stored in MySQL DB</span>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs text-slate-700">
              <thead class="bg-slate-100 text-slate-600 uppercase font-bold text-[11px] border-b border-slate-200">
                <tr>
                  <th class="p-3.5">ID</th>
                  <th class="p-3.5">Name</th>
                  <th class="p-3.5">Contact</th>
                  <th class="p-3.5">Category</th>
                  <th class="p-3.5">Subject</th>
                  <th class="p-3.5">Message</th>
                  <th class="p-3.5">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                <tr *ngFor="let i of contactInquiries()" class="hover:bg-slate-50">
                  <td class="p-3.5 font-bold text-slate-900">#{{ i.id }}</td>
                  <td class="p-3.5 font-bold text-[#004b87]">{{ i.full_name }}</td>
                  <td class="p-3.5">
                    <div>{{ i.email }}</div>
                    <div class="text-slate-400 text-[11px]">{{ i.phone || 'No phone' }}</div>
                  </td>
                  <td class="p-3.5"><span class="px-2 py-0.5 rounded bg-blue-50 text-blue-800 font-semibold">{{ i.inquiry_type }}</span></td>
                  <td class="p-3.5 font-semibold text-slate-900">{{ i.subject }}</td>
                  <td class="p-3.5 text-slate-600 max-w-xs truncate">{{ i.message }}</td>
                  <td class="p-3.5"><span class="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold">{{ i.status }}</span></td>
                </tr>
                <tr *ngIf="contactInquiries().length === 0">
                  <td colspan="7" class="p-8 text-center text-slate-400">No contact inquiries yet.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- TAB 5: PUBLISH NEW JOB FORM -->
        <div *ngIf="activeTab === 'new-job'" class="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm max-w-3xl mx-auto">
          <h3 class="font-heading text-xl font-bold text-[#003461] mb-1">Publish New Clinical Position to Database</h3>
          <p class="text-xs text-slate-500 mb-6">New openings appear immediately on the Candidates page. Avoid age-, gender- or nationality-based requirements ("young", "native English speaker") — they breach US, UK and Canadian equality laws.</p>

          <form (ngSubmit)="publishJob()" class="space-y-4 text-xs">
            
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block font-bold text-slate-700 mb-1">Job Title *</label>
                <input 
                  type="text" 
                  [(ngModel)]="newJob.title" 
                  name="title" 
                  required 
                  placeholder="e.g. Pediatric Intensive Care (PICU) RN" 
                  class="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#004b87] text-slate-900" />
              </div>
              <div>
                <label class="block font-bold text-slate-700 mb-1">Department</label>
                <input 
                  type="text" 
                  [(ngModel)]="newJob.department" 
                  name="department" 
                  placeholder="Pediatric Services" 
                  class="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#004b87] text-slate-900" />
              </div>
            </div>

            <div>
              <label class="block font-bold text-slate-700 mb-1">Country *</label>
              <select 
                [(ngModel)]="newJob.country" 
                name="country" 
                class="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#004b87] bg-white text-slate-900">
                <option value="United States">United States</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Canada">Canada</option>
              </select>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label class="block font-bold text-slate-700 mb-1">Specialty *</label>
                <input 
                  type="text" 
                  [(ngModel)]="newJob.specialty" 
                  name="specialty" 
                  required 
                  placeholder="Nursing - PICU" 
                  class="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#004b87] text-slate-900" />
              </div>
              <div>
                <label class="block font-bold text-slate-700 mb-1">Location *</label>
                <input 
                  type="text" 
                  [(ngModel)]="newJob.location" 
                  name="location" 
                  required 
                  placeholder="Dallas, TX (Children's Hospital)" 
                  class="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#004b87] text-slate-900" />
              </div>
              <div>
                <label class="block font-bold text-slate-700 mb-1">State / Province / County</label>
                <input 
                  type="text" 
                  [(ngModel)]="newJob.state" 
                  name="state" 
                  placeholder="Texas" 
                  class="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#004b87] text-slate-900" />
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label class="block font-bold text-slate-700 mb-1">Job Type</label>
                <select 
                  [(ngModel)]="newJob.job_type" 
                  name="job_type" 
                  class="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#004b87] bg-white text-slate-900">
                  <option value="Travel Contract (13 Wks)">Travel Contract (13 Wks)</option>
                  <option value="Direct Hire / Full Time">Direct Hire / Full Time</option>
                  <option value="Per Diem / PRN">Per Diem / PRN</option>
                  <option value="Contract-to-Hire">Contract-to-Hire</option>
                  <option value="Permanent / Full Time">Permanent / Full Time</option>
                  <option value="Part Time">Part Time</option>
                </select>
              </div>

              <div>
                <label class="block font-bold text-slate-700 mb-1">Shift</label>
                <input 
                  type="text" 
                  [(ngModel)]="newJob.shift" 
                  name="shift" 
                  placeholder="12h Nights / 36h/wk" 
                  class="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#004b87] text-slate-900" />
              </div>

              <div>
                <label class="block font-bold text-slate-700 mb-1">Pay Range (with currency)</label>
                <input 
                  type="text" 
                  [(ngModel)]="newJob.pay_range" 
                  name="pay_range" 
                  placeholder="USD 40-48/hr, GBP 30,000-34,000/yr, CAD 38-45/hr" 
                  class="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#004b87] text-slate-900" />
                <p class="mt-1 text-[10px] text-slate-500">Pay ranges are legally required in job ads in several US states (e.g. CA, NY, CO, WA, IL) and parts of Canada (e.g. BC, ON).</p>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block font-bold text-slate-700 mb-1">Experience Required</label>
                <input 
                  type="text" 
                  [(ngModel)]="newJob.experience_required" 
                  name="experience_required" 
                  placeholder="2+ Years PICU experience" 
                  class="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#004b87] text-slate-900" />
              </div>
              <div>
                <label class="block font-bold text-slate-700 mb-1">Urgency</label>
                <input 
                  type="text" 
                  [(ngModel)]="newJob.urgency_level" 
                  name="urgency_level" 
                  placeholder="Immediate Need" 
                  class="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#004b87] text-slate-900" />
              </div>
            </div>

            <div>
              <label class="block font-bold text-slate-700 mb-1">Role Description</label>
              <textarea 
                rows="2" 
                [(ngModel)]="newJob.description" 
                name="description" 
                placeholder="Provide clinical responsibilities, patient ratios, and unit environment..." 
                class="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#004b87] text-slate-900 resize-none"></textarea>
            </div>

            <div>
              <label class="block font-bold text-slate-700 mb-1">Requirements & Certifications</label>
              <input 
                type="text" 
                [(ngModel)]="newJob.requirements" 
                name="requirements" 
                placeholder="Active RN license, BLS, PALS required. Compact accepted." 
                class="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#004b87] text-slate-900" />
            </div>

            <button 
              type="submit" 
              class="w-full py-3 bg-[#004b87] hover:bg-[#0B3C5D] text-white font-bold rounded-lg transition-all text-xs uppercase tracking-wider shadow">
              Publish Position to Database
            </button>
          </form>
        </div>

      </div>

    </div>
  `
})
export class AdminComponent implements OnInit {
  apiService = inject(ApiService);
  toastService = inject(ToastService);

  activeTab: 'candidates' | 'talent-requests' | 'partners' | 'contacts' | 'new-job' = 'candidates';

  candidates = signal<CandidateApplication[]>([]);
  talentRequests = signal<TalentRequest[]>([]);
  partnerApps = signal<PartnerApplication[]>([]);
  contactInquiries = signal<ContactInquiry[]>([]);
  jobs = signal<JobPosition[]>([]);
  stats = signal<PlatformStats | null>(null);
  expandedCandidateId: number | undefined;

  locationOf(c: CandidateApplication) {
    return [c.current_city, c.current_state].filter(Boolean).join(', ') || '—';
  }

  toggleCandidate(id: number | undefined) {
    this.expandedCandidateId = this.expandedCandidateId === id ? undefined : id;
  }

  newJob: Partial<JobPosition> = {
    country: 'United States',
    title: '',
    department: 'Intensive Care',
    specialty: 'Nursing - ICU',
    location: '',
    state: '',
    job_type: 'Travel Contract (13 Wks)',
    shift: '12h Nights / 36h/wk',
    pay_range: '$3,200 - $3,700 / wk',
    experience_required: '2+ Years',
    urgency_level: 'Immediate Need',
    description: '',
    requirements: 'Active RN License, BLS, ACLS'
  };

  ngOnInit() {
    this.refreshData();
  }

  refreshData() {
    this.apiService.getStats().subscribe(res => {
      if (res.data) this.stats.set(res.data);
    });

    this.apiService.getCandidates().subscribe(res => {
      if (res.data) this.candidates.set(res.data);
    });

    this.apiService.getTalentRequests().subscribe(res => {
      if (res.data) this.talentRequests.set(res.data);
    });

    this.apiService.getPartners().subscribe(res => {
      if (res.data) this.partnerApps.set(res.data);
    });

    this.apiService.getContactInquiries().subscribe(res => {
      if (res.data) this.contactInquiries.set(res.data);
    });

    this.apiService.getJobs().subscribe(res => {
      if (res.data) this.jobs.set(res.data);
    });
  }

  publishJob() {
    if (!this.newJob.title || !this.newJob.specialty || !this.newJob.location) {
      this.toastService.error('Missing Fields', 'Title, Specialty, and Location are required.');
      return;
    }

    this.apiService.createJob(this.newJob).subscribe({
      next: (res) => {
        this.toastService.success('Position Published!', 'New job position stored in MySQL database.');
        this.newJob = {
          country: 'United States',
          title: '',
          department: '',
          specialty: '',
          location: '',
          state: '',
          job_type: 'Travel Contract (13 Wks)',
          shift: '12h Nights',
          pay_range: '',
          experience_required: '',
          urgency_level: 'Immediate Need',
          description: '',
          requirements: ''
        };
        this.refreshData();
        this.activeTab = 'candidates';
      },
      error: (err) => {
        this.toastService.error('Error Publishing Job', err.error?.message || 'Failed to save job');
      }
    });
  }
}
