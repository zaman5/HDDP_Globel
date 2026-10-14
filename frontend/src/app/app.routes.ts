import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { HealthcareSolutionsComponent } from './pages/healthcare-solutions/healthcare-solutions.component';
import { PartnerWithUsComponent } from './pages/partner-with-us/partner-with-us.component';
import { CandidatesComponent } from './pages/candidates/candidates.component';
import { JobDetailComponent } from './pages/job-detail/job-detail.component';
import { ProcessComponent } from './pages/process/process.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { AdminComponent } from './pages/admin/admin.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { SitemapComponent } from './pages/sitemap/sitemap.component';

// SEO: keep titles under ~60 characters and descriptions around 140–160.
// SeoService turns `title` and `data` into meta, canonical and social tags.
// Public pages listed here must also be in routes.txt (prerender), public/sitemap.xml,
// STATIC_PAGES in server.js and the site map page (pages/sitemap).
export const routes: Routes = [
  {
    // healthcare recruitment support, RPO, talent sourcing (title and description from the approved copy)
    path: '', component: HomeComponent,
    title: 'HDDP Consultants | Healthcare Recruitment & RPO Support',
    data: { description: 'HDDP Consultants supports U.S. healthcare staffing agencies with talent sourcing, recruitment process outsourcing, candidate screening coordination, and scalable recruitment operations support.' }
  },
  {
    // healthcare recruitment support, candidate sourcing and screening
    path: 'services', component: HealthcareSolutionsComponent,
    title: 'Healthcare Recruitment Support | HDDP Consultants',
    data: { description: 'Recruitment support for U.S. healthcare staffing agencies and eligible hiring partners: candidate sourcing, preliminary screening, interview coordination and documentation tracking.' }
  },
  {
    // recruitment partnerships (title and description from the approved copy)
    path: 'who-we-serve', component: PartnerWithUsComponent,
    title: 'Recruitment Partnerships | HDDP Consultants',
    data: { description: 'Extend your recruitment capacity with HDDP Consultants through candidate sourcing, dedicated recruitment support, and back-office coordination for eligible healthcare hiring partners.' }
  },
  {
    // recruitment process
    path: 'how-it-works', component: ProcessComponent,
    title: 'Our Recruitment Process | HDDP Consultants',
    data: { description: 'A structured, transparent recruitment process: understand the requirement, source candidates, conduct preliminary screening, coordinate documentation, submit and follow up.' }
  },
  {
    // healthcare career opportunities for candidates
    path: 'jobs', component: CandidatesComponent,
    title: 'Healthcare Career Opportunities | HDDP Consultants',
    data: { description: 'Explore healthcare career opportunities shared by independent hiring partners in the HDDP recruitment network. Share your resume and preferred role or location.' }
  },
  {
    path: 'jobs/:id', component: JobDetailComponent,
    title: 'Healthcare Job | HDDP Consultants'
  },
  {
    path: 'jobs/:id/apply', component: JobDetailComponent,
    title: 'Apply for Job | HDDP Consultants',
    // The form page duplicates the job page; keep only the job page in search results.
    data: { apply: true, robots: 'noindex, follow' }
  },
  {
    // about HDDP
    path: 'about-us', component: AboutUsComponent,
    title: 'About HDDP Consultants | Recruitment & Workforce Support',
    data: { description: 'HDDP Consultants provides recruitment, workforce advisory, and operational support to organizations seeking practical, flexible ways to strengthen their people operations.' }
  },
  {
    // contact / consultation request
    path: 'contact-us', component: ContactUsComponent,
    title: 'Contact HDDP Consultants | Request a Consultation',
    data: { description: 'Tell us about your hiring priorities, current recruitment workflow, or back-office support requirements. We will follow up to discuss whether HDDP is a good fit.' }
  },
  {
    path: 'privacy-policy',
    loadComponent: () => import('./pages/privacy-policy/privacy-policy.component').then(m => m.PrivacyPolicyComponent),
    title: 'Privacy Policy | HDDP Consultants',
    data: { description: 'How HDDP Consultants collects, uses and protects personal information about candidates, clients and visitors in the USA, UK and Canada.' }
  },
  {
    path: 'cookie-policy',
    loadComponent: () => import('./pages/cookie-policy/cookie-policy.component').then(m => m.CookiePolicyComponent),
    title: 'Cookie Policy | HDDP Consultants',
    data: { description: 'The cookies the HDDP Consultants website uses, why we use them, and how to change your cookie settings.' }
  },
  {
    path: 'sitemap', component: SitemapComponent,
    title: 'Site Map | HDDP Consultants',
    data: { description: 'All pages on the HDDP Consultants website: recruitment support, partnerships, our process, candidate opportunities, about, contact and policies.' }
  },
  {
    path: 'admin', component: AdminComponent,
    title: 'Admin | HDDP Consultants',
    data: { robots: 'noindex, nofollow' }
  },

  // Old addresses, kept so existing links and search results still work
  { path: 'healthcare-solutions', redirectTo: 'services' },
  { path: 'staffing-agency-consulting', redirectTo: 'services' },
  { path: 'partner-with-us', redirectTo: 'who-we-serve' },
  { path: 'process', redirectTo: 'how-it-works' },
  { path: 'candidates', redirectTo: 'jobs' },
  { path: 'candidates/:id', redirectTo: 'jobs/:id' },
  { path: 'candidates/:id/apply', redirectTo: 'jobs/:id/apply' },

  {
    path: '**', component: NotFoundComponent,
    title: 'Page Not Found | HDDP Consultants',
    data: { robots: 'noindex, follow' }
  }
];
