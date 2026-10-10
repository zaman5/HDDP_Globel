import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-process',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="band !pb-12">
      <div class="wrap">
        <p class="t-kicker">Our process</p>
        <h1 class="t-h1">Structured recruitment process</h1>
        <p class="t-lede mt-5">Five steps from your requirement to a submitted candidate. Most candidates reach you within 48–96 hours.</p>
      </div>
    </section>

    <section class="band !pt-0">
      <div class="wrap">
        <ol class="list-none m-0 p-0 border-t border-line">
          <li *ngFor="let step of steps; let i = index" class="grid gap-3 py-8 border-b border-line md:grid-cols-12 md:gap-8">
            <span class="md:col-span-1 font-heading font-semibold text-teal-ink text-2xl leading-none" aria-hidden="true">{{ i + 1 }}</span>
            <h2 class="md:col-span-4 t-h3 !text-xl">{{ step.title }}</h2>
            <p class="md:col-span-7 t-body m-0">{{ step.text }}</p>
          </li>
        </ol>
      </div>
    </section>

    <section class="band band-navy">
      <div class="wrap flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
        <h2 class="t-h1">Speed + quality = reliable hiring outcomes</h2>
        <button type="button" (click)="modalService.openRequestTalent()" class="btn btn-light shrink-0">Request talent</button>
      </div>
    </section>
  `
})
export class ProcessComponent {
  modalService = inject(ModalService);

  steps = [
    { title: 'Requirement analysis', text: 'We confirm the role, location, licence and experience requirements, shift pattern and start date with your team.' },
    { title: 'Talent sourcing', text: 'Our recruiters search our talent network and job boards for candidates who match the requirement.' },
    { title: 'Screening and evaluation', text: 'Each candidate is screened for resume and experience, communication and role fit.' },
    { title: 'Credentialing support', text: 'We collect documents and coordinate credential verification with you so the candidate is ready for submission.' },
    { title: 'Delivery and follow-up', text: 'We submit the candidate with a summary, arrange interviews and follow up until the role is filled.' }
  ];
}
