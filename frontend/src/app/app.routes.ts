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
    path: '', component: HomeComponent,
    title: 'Nurse Recruitment Partner for Hospitals & Agencies | HDDP',
    data: { description: 'Pre-screened, credential-ready nurses and allied health candidates for US hospital HR teams and nurse staffing agencies, delivered in 48–96 hours.' }
  },
  {
    path: 'services', component: HealthcareSolutionsComponent,
    title: 'Nurse Sourcing, RPO & Credentialing Services | HDDP',
    data: { description: 'Nurse and healthcare talent sourcing, recruitment process outsourcing (RPO), credentialing and back-office support for hospitals and staffing agencies.' }
  },
  {
    path: 'who-we-serve', component: PartnerWithUsComponent,
    title: 'Recruiting Support for Hospitals & Staffing Agencies | HDDP',
    data: { description: 'White-label recruiting and credentialing capacity for nurse staffing agencies and for hospital HR and talent acquisition teams across the US.' }
  },
  {
    path: 'how-it-works', component: ProcessComponent,
    title: 'Nurse Screening & Credentialing Process | HDDP',
    data: { description: 'From requisition to submittal in 48–96 hours: sourcing, screening, primary source licence verification, skills checklists and a complete submittal packet.' }
  },
  {
    path: 'jobs', component: CandidatesComponent,
    title: 'Nursing Jobs: RN, LPN, CNA & Allied Health | HDDP',
    data: { description: 'Browse travel, per diem, contract and permanent nursing and allied health jobs in the USA, UK and Canada, and apply online in minutes.' }
  },
  {
    path: 'jobs/:id', component: JobDetailComponent,
    title: 'Nursing Job | HDDP Consultants'
  },
  {
    path: 'jobs/:id/apply', component: JobDetailComponent,
    title: 'Apply for Job | HDDP Consultants',
    // The form page duplicates the job page; keep only the job page in search results.
    data: { apply: true, robots: 'noindex, follow' }
  },
  {
    path: 'about-us', component: AboutUsComponent,
    title: 'About HDDP Consultants | Healthcare Recruitment Partner',
    data: { description: 'HDDP Consultants is a healthcare recruitment partner helping US hospitals and nurse staffing agencies source, screen and credential clinical talent.' }
  },
  {
    path: 'contact-us', component: ContactUsComponent,
    title: 'Contact HDDP Consultants | Request Nurse Candidates',
    data: { description: 'Talk to our team about nurse sourcing, recruitment process outsourcing, credentialing or back-office support, or send open requisitions today.' }
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
    data: { description: 'All pages on the HDDP Consultants website: services, who we serve, how it works, nursing jobs, about, contact and policies.' }
  },
  {
    path: 'admin', component: AdminComponent,
    title: 'Admin | HDDP Consultants',
    data: { robots: 'noindex, nofollow' }
  },

  // Old addresses, kept so existing links and search results still work
  { path: 'healthcare-solutions', redirectTo: 'services' },
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
