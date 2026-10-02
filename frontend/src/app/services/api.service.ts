import { Injectable } from '@angular/core';
import { Observable, from, of, catchError, map } from 'rxjs';
import { JobPosition, CandidateApplication, TalentRequest, PartnerApplication, ContactInquiry, PlatformStats } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:5000/api';

  // Helper request method
  private request<T>(endpoint: string, options: RequestInit = {}): Observable<T> {
    return from(
      fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers: {
          ...options.headers
        }
      }).then(async (res) => {
        const json = await res.json();
        if (!res.ok) {
          throw new Error(json.message || 'API request failed');
        }
        return json as T;
      })
    );
  }

  // Health check
  checkHealth(): Observable<any> {
    return this.request<any>('/health').pipe(
      catchError(err => of({ status: 'offline', error: err.message }))
    );
  }

  // Live Stats
  getStats(): Observable<{ success: boolean; data: PlatformStats }> {
    return this.request<{ success: boolean; data: PlatformStats }>('/stats').pipe(
      catchError(() => of({
        success: true,
        data: {
          activeOpenings: 126,
          totalCandidates: 14500,
          partnerFacilities: 500,
          retentionRate: '98.4%',
          avgTurnaround: '48–96h',
          statesCovered: 50,
          activeRequisitions: 34,
          partnerApplications: 18,
          dbEngine: 'MySQL/SQLite'
        }
      }))
    );
  }

  // Jobs
  getJobs(filters?: { search?: string; specialty?: string; state?: string; job_type?: string }): Observable<{ success: boolean; count: number; data: JobPosition[] }> {
    const params = new URLSearchParams();
    if (filters?.search) params.append('search', filters.search);
    if (filters?.specialty) params.append('specialty', filters.specialty);
    if (filters?.state) params.append('state', filters.state);
    if (filters?.job_type) params.append('job_type', filters.job_type);

    const query = params.toString() ? `?${params.toString()}` : '';
    return this.request<{ success: boolean; count: number; data: JobPosition[] }>(`/jobs${query}`).pipe(
      catchError((err) => {
        console.warn('Jobs fetch fallback:', err);
        return of({ success: true, count: 0, data: [] });
      })
    );
  }

  getJobById(id: number): Observable<{ success: boolean; data: JobPosition }> {
    return this.request<{ success: boolean; data: JobPosition }>(`/jobs/${id}`);
  }

  createJob(job: Partial<JobPosition>): Observable<any> {
    return this.request<any>('/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(job)
    });
  }

  // Candidates & Applications
  submitCandidateApplication(formData: FormData): Observable<any> {
    return this.request<any>('/candidates/apply', {
      method: 'POST',
      body: formData
    });
  }

  getCandidates(specialty?: string, status?: string): Observable<{ success: boolean; count: number; data: CandidateApplication[] }> {
    const params = new URLSearchParams();
    if (specialty) params.append('specialty', specialty);
    if (status) params.append('status', status);
    const query = params.toString() ? `?${params.toString()}` : '';

    return this.request<{ success: boolean; count: number; data: CandidateApplication[] }>(`/candidates${query}`).pipe(
      catchError(() => of({ success: true, count: 0, data: [] }))
    );
  }

  // Talent Requisitions
  submitTalentRequest(request: TalentRequest): Observable<any> {
    return this.request<any>('/talent-requests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request)
    });
  }

  getTalentRequests(): Observable<{ success: boolean; count: number; data: TalentRequest[] }> {
    return this.request<{ success: boolean; count: number; data: TalentRequest[] }>('/talent-requests').pipe(
      catchError(() => of({ success: true, count: 0, data: [] }))
    );
  }

  // Partner Applications
  submitPartnerApplication(partner: PartnerApplication): Observable<any> {
    return this.request<any>('/partners', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(partner)
    });
  }

  getPartners(): Observable<{ success: boolean; count: number; data: PartnerApplication[] }> {
    return this.request<{ success: boolean; count: number; data: PartnerApplication[] }>('/partners').pipe(
      catchError(() => of({ success: true, count: 0, data: [] }))
    );
  }

  // Contact Inquiries
  submitContactInquiry(inquiry: ContactInquiry): Observable<any> {
    return this.request<any>('/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inquiry)
    });
  }

  getContactInquiries(): Observable<{ success: boolean; count: number; data: ContactInquiry[] }> {
    return this.request<{ success: boolean; count: number; data: ContactInquiry[] }>('/contact').pipe(
      catchError(() => of({ success: true, count: 0, data: [] }))
    );
  }
}
