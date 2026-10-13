import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="band">
      <div class="wrap max-w-2xl">
        <p class="t-kicker">Error 404</p>
        <h1 class="t-h1">Page not found</h1>
        <p class="t-lede mt-4">The page you are looking for has moved or no longer exists.</p>
        <div class="mt-8 flex flex-wrap gap-3">
          <a routerLink="/" class="btn btn-primary">Go to the home page</a>
          <a routerLink="/jobs" class="btn btn-outline">Find jobs</a>
        </div>
        <ul class="mt-10 list-none p-0 m-0 flex flex-wrap gap-x-6 gap-y-2">
          <li><a routerLink="/services" class="link">Services</a></li>
          <li><a routerLink="/who-we-serve" class="link">Who we serve</a></li>
          <li><a routerLink="/how-it-works" class="link">How it works</a></li>
          <li><a routerLink="/contact-us" class="link">Contact</a></li>
        </ul>
      </div>
    </section>
  `
})
export class NotFoundComponent {}
