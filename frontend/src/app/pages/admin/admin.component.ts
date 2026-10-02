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
            <span class="text-xs text-slate-500">Stored in MySQL DB</span>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs text-slate-700">
              <thead class="bg-slate-100 text-slate-600 uppercase font-bold text-[11px] border-b border-slate-200">
                <tr>
                  <th class="p-3.5">ID</th>
                  <th class="p-3.5">Name</th>
                  <th class="p-3.5">Contact</th>
                  <th class="p-3.5">Specialty</th>
                  <th class="p-3.5">License</th>
                  <th class="p-3.5">Experience</th>
                  <th class="p-3.5">Desired Pay</th>
                  <th class="p-3.5">Status</th>
                  <th class="p-3.5">Resume</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                <tr *ngFor="let c of candidates()" class="hover:bg-slate-50">
                  <td class="p-3.5 font-bold text-slate-900">#{{ c.id }}</td>
                  <td class="p-3.5 font-bold text-[#004b87]">{{ c.first_name }} {{ c.last_name }}</td>
                  <td class="p-3.5">
                    <div>{{ c.email }}</div>
                    <div class="text-slate-400 text-[11px]">{{ c.phone }}</div>
                  </td>
                  <td class="p-3.5"><span class="px-2 py-0.5 rounded bg-blue-50 text-blue-800 font-semibold">{{ c.specialty }}</span></td>
                  <td class="p-3.5">
                    <div>{{ c.license_type }}</div>
                    <span *ngIf="c.compact_license" class="text-[10px] text-emerald-700 font-bold">Compact (eNLC)</span>
                  </td>
                  <td class="p-3.5">{{ c.years_experience }}</td>
                  <td class="p-3.5 font-semibold">{{ c.desired_pay || 'Negotiable' }}</td>
                  <td class="p-3.5"><span class="px-2 py-0.5 rounded bg-amber-50 text-amber-800 font-bold">{{ c.status }}</span></td>
                  <td class="p-3.5">
                    <span *ngIf="c.resume_filename" class="text-emerald-700 font-bold flex items-center gap-1">
                      <span class="material-symbols-outlined text-xs">attach_file</span>
                      {{ c.resume_filename }}
                    </span>
                    <span *ngIf="!c.resume_filename" class="text-slate-400">Direct Form</span>
                  </td>
                </tr>
                <tr *ngIf="candidates().length === 0">
                  <td colspan="9" class="p-8 text-center text-slate-400">No candidate submissions recorded yet. Submit one from Candidates page!</td>
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
          <p class="text-xs text-slate-500 mb-6">New openings appear immediately on the live candidate job board.</p>

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
                <label class="block font-bold text-slate-700 mb-1">State</label>
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
                <label class="block font-bold text-slate-700 mb-1">Pay Range</label>
                <input 
                  type="text" 
                  [(ngModel)]="newJob.pay_range" 
                  name="pay_range" 
                  placeholder="$3,400 - $3,950 / wk" 
                  class="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#004b87] text-slate-900" />
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

  newJob: Partial<JobPosition> = {
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
