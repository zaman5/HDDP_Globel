import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { SITE } from '../site.config';

export interface PageSeo {
  title?: string;
  description?: string;
  /** Path for the canonical URL, e.g. /jobs/6. Defaults to the current path. */
  path?: string;
  robots?: string;
}

const DEFAULT_ROBOTS = 'index, follow, max-image-preview:large, max-snippet:-1';

/**
 * Keeps title, meta description, canonical link, robots and Open Graph / Twitter tags
 * in sync with the current route. Routes set `title` and `data: { description, robots }`;
 * pages with data loaded later (job details) call `setPage()`.
 * Runs during prerendering too, so the tags are in each page's static HTML.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private meta = inject(Meta);
  private title = inject(Title);
  private doc = inject(DOCUMENT);
  private router = inject(Router);

  init() {
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => {
      let route: ActivatedRouteSnapshot = this.router.routerState.snapshot.root;
      while (route.firstChild) route = route.firstChild;
      this.setPage({
        title: route.title,
        description: route.data['description'],
        robots: route.data['robots'],
        path: route.data['canonicalPath']
      });
    });
  }

  setPage(page: PageSeo) {
    const title = page.title || this.title.getTitle() || SITE.name;
    const description = page.description || SITE.defaultDescription;
    // /jobs/6/apply points search engines at /jobs/6
    const path = page.path ?? this.router.url.split(/[?#]/)[0].replace(/\/apply$/, '');
    const url = SITE.url + (path === '/' ? '/' : path.replace(/\/$/, ''));
    const image = SITE.url + SITE.shareImage;

    this.title.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ name: 'robots', content: page.robots || DEFAULT_ROBOTS });

    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: SITE.name });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:image', content: image });

    let link = this.doc.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }
}
