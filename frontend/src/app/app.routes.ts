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
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'HDDP Consultants | Nurse Staffing & Healthcare Recruitment Partner – USA, UK & Canada' },
  { path: 'healthcare-solutions', component: HealthcareSolutionsComponent, title: 'Nurse & Healthcare Talent Sourcing, RPO & Credentialing Support | HDDP Consultants' },
  { path: 'partner-with-us', component: PartnerWithUsComponent, title: 'Offshore Recruitment Teams for Nurse Staffing Agencies – USA, UK & Canada | HDDP Consultants' },
  { path: 'candidates', component: CandidatesComponent, title: 'Nursing & Healthcare Jobs in the USA, UK & Canada | HDDP Consultants' },
  { path: 'candidates/:id', component: JobDetailComponent, title: 'Job Details | HDDP Consultants' },
  { path: 'candidates/:id/apply', component: JobDetailComponent, data: { apply: true }, title: 'Apply for Job | HDDP Consultants' },
  { path: 'process', component: ProcessComponent, title: 'Healthcare Recruitment Process | HDDP Consultants' },
  { path: 'about-us', component: AboutUsComponent, title: 'About Us | HDDP Consultants' },
  { path: 'contact-us', component: ContactUsComponent, title: 'Contact Us | HDDP Consultants' },
  { path: 'privacy-policy', component: PrivacyPolicyComponent, title: 'Privacy Policy (US, UK & Canada) | HDDP Consultants' },
  { path: 'admin', component: AdminComponent, title: 'Admin Command Center | HDDP Consultants' },
  { path: '**', redirectTo: '' }
];
