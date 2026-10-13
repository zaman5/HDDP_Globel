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
import { StaffingAgencyConsultingComponent } from './pages/staffing-agency-consulting/staffing-agency-consulting.component';

// SEO: keep titles under ~60 characters and descriptions around 140–160.
// Each page owns one keyword cluster (see the comment above each route) so pages don't compete.
// SeoService turns `title` and `data` into meta, canonical and social tags.
// Public pages listed here must also be in routes.txt (prerender), public/sitemap.xml,
// STATIC_PAGES in server.js and the site map page (pages/sitemap).
export const routes: Routes = [
  {
    // nurse staffing services, healthcare staffing partner, travel/locum/contract/per diem nurses
    path: '', component: HomeComponent,
    title: 'Nurse Staffing Services & Healthcare Staffing Partner | HDDP',
    data: { description: 'Global healthcare staffing partner for US hospitals and staffing agencies: travel, locum, contract and per diem nurses, pre-screened in 48–96 hours.' }
  },
  {
    // healthcare recruitment services, RPO healthcare, credentialing support, back office, payroll, scheduling
    path: 'services', component: HealthcareSolutionsComponent,
    title: 'Healthcare Recruitment, RPO & Credentialing Services | HDDP',
    data: { description: 'Healthcare recruitment services: nurse sourcing, offshore recruiter teams (RPO), credentialing support, back-office, payroll and scheduling support.' }
  },
  {
    // nurse staffing solutions for hospitals, hire travel/locum nurses, back office support for staffing companies
    path: 'who-we-serve', component: PartnerWithUsComponent,
    title: 'Nurse Staffing Solutions for Hospitals & Agencies | HDDP',
    data: { description: 'Hospital staffing solutions and back office support for healthcare staffing companies. Hire travel and locum nurses quickly with a scalable partner.' }
  },
  {
    // candidate screening healthcare, credentialing and compliance support for nurses
    path: 'how-it-works', component: ProcessComponent,
    title: 'Healthcare Candidate Screening & Credentialing | HDDP',
    data: { description: 'From requisition to submittal in 48–96 hours: sourcing, screening, primary source licence verification, skills checklists and a complete submittal packet.' }
  },
  {
    // travel nurse jobs USA, travel RN jobs, locum nurse jobs, nurse job listings, healthcare job board
    path: 'jobs', component: CandidatesComponent,
    title: 'Travel Nurse, Locum & Per Diem Nursing Jobs USA | HDDP',
    data: { description: 'Nurse job listings: travel RN jobs, ICU and ER travel nurse roles, locum and per diem nursing jobs and allied health jobs in the USA, UK and Canada.' }
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
    // global healthcare staffing partner, offshore recruitment excellence
    path: 'about-us', component: AboutUsComponent,
    title: 'About HDDP | Global Healthcare Staffing Partner',
    data: { description: 'HDDP Consultants is a global healthcare staffing partner helping US hospitals and nurse staffing agencies source, screen and credential clinical talent.' }
  },
  {
    // hire locum nurses, contract healthcare staff providers
    path: 'contact-us', component: ContactUsComponent,
    title: 'Hire Travel & Locum Nurses | Contact HDDP Consultants',
    data: { description: 'Hire travel nurses, locum nurses and contract healthcare staff, or ask about RPO, credentialing, back-office support or staffing agency consulting.' }
  },
  {
    // healthcare staffing consulting, start a nurse staffing agency, staffing agency setup services
    path: 'staffing-agency-consulting', component: StaffingAgencyConsultingComponent,
    title: 'Start a Nurse Staffing Agency | Staffing Consulting | HDDP',
    data: { description: 'Healthcare staffing consulting and staffing agency setup services, plus a step-by-step guide on how to start a nurse staffing agency in the US.' }
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
