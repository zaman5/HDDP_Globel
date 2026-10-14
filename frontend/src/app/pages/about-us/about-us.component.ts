import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

// Copy follows "HDDP USA Website Rewritten Copy", section 6 (About HDDP Consultants).
@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="band">
      <div class="wrap grid gap-12 lg:grid-cols-12 lg:items-center">
        <div class="lg:col-span-7">
          <p class="t-kicker">About HDDP Consultants</p>
          <h1 class="t-h1">Empowering Workforces. Elevating Business.</h1>
          <p class="t-lede mt-5">HDDP Consultants provides recruitment, workforce advisory, and operational support to organizations seeking practical, flexible ways to strengthen their people operations.</p>
        </div>
        <div class="lg:col-span-5">
          <div class="photo-frame aspect-[4/3]">
            <img class="photo" src="assets/images/about-team.jpg" width="1400" height="915" fetchpriority="high"
                 alt="HDDP team members collaborating around a laptop in the office" />
          </div>
        </div>
      </div>
    </section>

    <section class="band band-mist">
      <div class="wrap split">
        <h2 class="t-h2">Who we are</h2>
        <p class="t-body m-0">We combine recruitment experience, structured delivery processes, and global sourcing capabilities to support clients across healthcare, technology, and professional services. For the U.S. healthcare market, our focus is on recruitment sourcing and back-office support for appropriate hiring partners, not on directly employing or assigning healthcare professionals.</p>
      </div>
    </section>

    <section class="band">
      <div class="wrap split">
        <h2 class="t-h2">How we work</h2>
        <ul class="ruled">
          <li *ngFor="let s of principles" class="t-body !max-w-none"><strong class="font-heading font-semibold text-navy">{{ s.title }}:</strong> {{ s.text }}</li>
        </ul>
      </div>
    </section>

    <section class="band band-navy">
      <div class="wrap flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
        <div>
          <h2 class="t-h1">Our commitment</h2>
          <p class="mt-3 text-lg text-white/80 max-w-[60ch]">We aim to help clients build stronger candidate pipelines, reduce avoidable recruitment administration, and create a more consistent hiring experience.</p>
        </div>
        <div class="flex flex-wrap gap-3 shrink-0">
          <a routerLink="/contact-us" class="btn btn-light">Get to Know HDDP</a>
        </div>
      </div>
    </section>
  `
})
export class AboutUsComponent {
  principles = [
    { title: 'Partnership first', text: 'we align our work to the client’s needs and agreed responsibilities.' },
    { title: 'Structured delivery', text: 'we use clear workflows, candidate tracking, and regular communication.' },
    { title: 'Flexible capacity', text: 'support can be configured around requisitions, projects, or dedicated teams.' },
    { title: 'Responsible handling', text: 'candidate information is managed according to agreed privacy and data-handling requirements.' }
  ];
}
