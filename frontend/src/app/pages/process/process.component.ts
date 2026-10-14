import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

// Copy follows "HDDP USA Website Rewritten Copy", section 5 (Our Process).
@Component({
  selector: 'app-process',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="band !pb-12">
      <div class="wrap grid gap-12 lg:grid-cols-12 lg:items-center">
        <div class="lg:col-span-7">
          <p class="t-kicker">Our Process</p>
          <h1 class="t-h1 max-w-[22ch]">A Structured, Transparent Recruitment Process</h1>
          <p class="t-lede mt-5">We use a consistent workflow to help our partners move from an open requirement to a well-organized candidate pipeline.</p>
        </div>
        <div class="lg:col-span-5">
          <div class="photo-frame aspect-[4/3]">
            <img class="photo" src="assets/images/process.jpg" width="1400" height="933" fetchpriority="high"
                 alt="Team mapping out a recruitment workflow with sticky notes" />
          </div>
        </div>
      </div>
    </section>

    <!-- STEPS -->
    <section class="band !pt-0">
      <div class="wrap">
        <ol class="list-none m-0 p-0 border-t border-line">
          <li *ngFor="let step of steps; let i = index" class="grid gap-3 py-8 border-b border-line md:grid-cols-12 md:gap-8">
            <span class="md:col-span-1 font-heading font-semibold text-teal-ink text-2xl leading-none" aria-hidden="true">{{ i + 1 }}</span>
            <h2 class="md:col-span-4 t-h3 !text-xl">Step {{ i + 1 }}: {{ step.title }}</h2>
            <p class="md:col-span-7 t-body m-0">{{ step.text }}</p>
          </li>
        </ol>
      </div>
    </section>

    <section class="band band-navy">
      <div class="wrap flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
        <p class="t-h1 m-0 text-white font-heading">Clear communication. Consistent process. Recruitment support you can scale.</p>
      </div>
    </section>
  `
})
export class ProcessComponent {
  steps = [
    { title: 'Understand the requirement', text: 'We confirm role details, required experience, location, schedule preferences, compensation parameters where provided, and essential qualifications.' },
    { title: 'Source relevant candidates', text: 'We use targeted outreach and recruitment channels to identify candidates whose stated experience and preferences align with the requirement.' },
    { title: 'Conduct preliminary screening', text: 'We review resumes and conduct agreed screening conversations, then prepare concise summaries for the hiring partner.' },
    { title: 'Coordinate documentation', text: 'We track requested documents and outstanding items where included in the scope. The hiring partner or its designated provider completes formal credential verification and compliance approvals.' },
    { title: 'Submit and follow up', text: 'We share candidate profiles with the hiring partner, coordinate next steps, and provide pipeline updates in line with the agreed workflow.' }
  ];
}
