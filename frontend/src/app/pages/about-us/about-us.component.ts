import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="flex flex-col w-full">
      
      <!-- HERO -->
      <section class="bg-[#003461] text-white py-16 lg:py-24 px-6 lg:px-12 relative overflow-hidden">
        <div class="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div class="lg:col-span-7 flex flex-col gap-4">
            <span class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-xs font-bold uppercase tracking-wider text-[#86f4f1] w-fit">
              Clinical Integrity • Operational Rigor
            </span>
            <h1 class="font-heading text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Pioneering Clinical Recruitment Infrastructure
            </h1>
            <p class="text-base sm:text-lg text-slate-200 leading-relaxed">
              HDDP Consultants was founded on a singular premise: healthcare delivery should never be compromised by staffing bottlenecks. We provide the enterprise recruitment backbone powering top health networks across the country.
            </p>
          </div>
          <div class="lg:col-span-5 bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 text-white flex flex-col gap-4 text-center">
            <span class="font-heading text-5xl font-extrabold text-[#86f4f1]">25+ Years</span>
            <span class="text-sm font-semibold uppercase tracking-wider text-slate-200">Combined Clinical Staffing Leadership</span>
            <div class="pt-4 border-t border-white/15 grid grid-cols-2 gap-4 text-center">
              <div>
                <span class="text-2xl font-bold block text-white">50 States</span>
                <span class="text-xs text-slate-300">Licensure Network</span>
              </div>
              <div>
                <span class="text-2xl font-bold block text-white">100%</span>
                <span class="text-xs text-slate-300">Compliance Rate</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CORE VALUES -->
      <section class="py-16 lg:py-20 bg-[#F5F7FA]">
        <div class="max-w-7xl mx-auto px-6 lg:px-12">
          <div class="text-center max-w-3xl mx-auto mb-16">
            <h2 class="font-heading text-3xl font-extrabold text-[#003461]">Our Operating Principles</h2>
            <p class="text-slate-600 mt-2">The four institutional cornerstones of HDDP Consultants.</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div class="w-12 h-12 rounded-xl bg-[#e5eeff] text-[#004b87] flex items-center justify-center mb-4">
                <span class="material-symbols-outlined text-[28px]">verified_user</span>
              </div>
              <h3 class="font-heading text-lg font-bold text-[#003461]">Clinical Precision</h3>
              <p class="text-slate-600 text-xs mt-2 leading-relaxed">
                Zero shortcuts in vetting. Every nurse and specialist is verified against state nursing boards, national sanction registers, and hands-on peer evaluations.
              </p>
            </div>

            <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div class="w-12 h-12 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center mb-4">
                <span class="material-symbols-outlined text-[28px]">speed</span>
              </div>
              <h3 class="font-heading text-lg font-bold text-[#003461]">Velocity & Agility</h3>
              <p class="text-slate-600 text-xs mt-2 leading-relaxed">
                Healthcare needs do not wait. Our dedicated sourcing desks operate with a strict 48–96 hour SLA from requisition to verified candidate presentation.
              </p>
            </div>

            <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div class="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-4">
                <span class="material-symbols-outlined text-[28px]">handshake</span>
              </div>
              <h3 class="font-heading text-lg font-bold text-[#003461]">Clinician Advocacy</h3>
              <p class="text-slate-600 text-xs mt-2 leading-relaxed">
                We champion our clinicians with market-leading compensation, transparent housing packages, around-the-clock advocate support, and career advancement.
              </p>
            </div>

            <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div class="w-12 h-12 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center mb-4">
                <span class="material-symbols-outlined text-[28px]">hub</span>
              </div>
              <h3 class="font-heading text-lg font-bold text-[#003461]">Enterprise Scale</h3>
              <p class="text-slate-600 text-xs mt-2 leading-relaxed">
                Seamless integration into VMS and MSP workflows with automated documentation feeds, consolidated billing, and dedicated executive account management.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- LEADERSHIP / GOVERNANCE -->
      <section class="py-16 bg-white border-t border-slate-200">
        <div class="max-w-7xl mx-auto px-6 lg:px-12">
          <div class="text-center max-w-3xl mx-auto mb-16">
            <span class="text-xs font-bold uppercase tracking-wider text-[#006a68]">Governance & Advisory</span>
            <h2 class="font-heading text-3xl font-extrabold text-[#003461] mt-1">Clinical Leadership Team</h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="bg-[#F8F9FF] p-6 rounded-2xl border border-slate-200 text-center">
              <div class="w-20 h-20 mx-auto rounded-full bg-[#004b87] text-white flex items-center justify-center text-2xl font-bold mb-4">
                EA
              </div>
              <h3 class="font-heading text-lg font-bold text-[#003461]">Dr. Elizabeth Adams, MD, MBA</h3>
              <p class="text-xs font-semibold text-[#006a68] mt-0.5">Chief Medical Officer & Clinical Governance</p>
              <p class="text-xs text-slate-600 mt-3 leading-relaxed">
                20+ years of acute hospital administration and clinical governance oversight across major academic medical centers.
              </p>
            </div>

            <div class="bg-[#F8F9FF] p-6 rounded-2xl border border-slate-200 text-center">
              <div class="w-20 h-20 mx-auto rounded-full bg-[#006a68] text-white flex items-center justify-center text-2xl font-bold mb-4">
                MR
              </div>
              <h3 class="font-heading text-lg font-bold text-[#003461]">Marcus Reynolds, RN, BSN, CCRN</h3>
              <p class="text-xs font-semibold text-[#006a68] mt-0.5">VP of Clinical Quality & Credentialing</p>
              <p class="text-xs text-slate-600 mt-3 leading-relaxed">
                Former ICU Nurse Director directing our 10-point primary-source verification and Joint Commission compliance teams.
              </p>
            </div>

            <div class="bg-[#F8F9FF] p-6 rounded-2xl border border-slate-200 text-center">
              <div class="w-20 h-20 mx-auto rounded-full bg-[#0B3C5D] text-white flex items-center justify-center text-2xl font-bold mb-4">
                SK
              </div>
              <h3 class="font-heading text-lg font-bold text-[#003461]">Sophia Kim</h3>
              <p class="text-xs font-semibold text-[#006a68] mt-0.5">Director of Enterprise Partnerships</p>
              <p class="text-xs text-slate-600 mt-3 leading-relaxed">
                Oversees MSP, VMS, and hospital network vendor relationships with bespoke SLA guarantees and delivery frameworks.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  `
})
export class AboutUsComponent {}
