import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { RequestTalentModalComponent } from './components/request-talent-modal/request-talent-modal.component';
import { ResumeModalComponent } from './components/resume-modal/resume-modal.component';
import { ToastComponent } from './components/toast/toast.component';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    RequestTalentModalComponent,
    ResumeModalComponent,
    ToastComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  apiService = inject(ApiService);

  ngOnInit() {
    // Initial health check ping
    this.apiService.checkHealth().subscribe({
      next: (res) => {
        console.log('[HDDP API Health]', res);
      }
    });
  }
}
