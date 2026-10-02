import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { HealthcareSolutionsComponent } from './pages/healthcare-solutions/healthcare-solutions.component';
import { PartnerWithUsComponent } from './pages/partner-with-us/partner-with-us.component';
import { CandidatesComponent } from './pages/candidates/candidates.component';
import { ProcessComponent } from './pages/process/process.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { AdminComponent } from './pages/admin/admin.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'HDDP Consultants | Premier Healthcare Recruitment & Staffing' },
  { path: 'healthcare-solutions', component: HealthcareSolutionsComponent, title: 'Healthcare Solutions | HDDP Consultants' },
  { path: 'partner-with-us', component: PartnerWithUsComponent, title: 'Partner With Us | HDDP Consultants' },
  { path: 'candidates', component: CandidatesComponent, title: 'Candidates & Careers | HDDP Consultants' },
  { path: 'process', component: ProcessComponent, title: 'Our 5-Step Process | HDDP Consultants' },
  { path: 'about-us', component: AboutUsComponent, title: 'About Us | HDDP Consultants' },
  { path: 'contact-us', component: ContactUsComponent, title: 'Contact Us | HDDP Consultants' },
  { path: 'admin', component: AdminComponent, title: 'Admin Command Center | HDDP Consultants' },
  { path: '**', redirectTo: '' }
];
