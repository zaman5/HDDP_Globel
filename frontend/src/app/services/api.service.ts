import { Injectable, PLATFORM_ID, inject, isDevMode, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { EMPTY, Observable, from, of, catchError, map } from 'rxjs';
import { JobPosition, CandidateApplication, TalentRequest, PartnerApplication, ContactInquiry, PlatformStats } from '../models/models';

const ADMIN_TOKEN_KEY = 'hddp_admin_token';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // In production the API is served from the same origin as the site (server.js mounts /api).
  private baseUrl = isDevMode() ? 'http://localhost:5000/api' : '/api';

  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  /** Admin token for this browser tab only (cleared when the tab closes or on sign-out). */
  readonly adminToken = signal<string | null>(this.readAdminToken());

  // Helper request method
  private request<T>(endpoint: string, options: RequestInit = {}, admin = false): Observable<T> {
    // No API calls while prerendering pages at build time; data loads in the browser.
    if (!this.isBrowser) return EMPTY;
    return from(this.send(endpoint, options, admin).then(res => res.json() as Promise<T>));
  }

  // Sends a request and turns any failure (including non-JSON error pages) into a readable Error
  private async send(endpoint: string, options: RequestInit = {}, admin = false): Promise<Response> {
    const headers: Record<string, string> = { ...(options.headers as Record<string, string>) };
    if (admin && this.adminToken()) headers['Authorization'] = `Bearer ${this.adminToken()}`;

    let res: Response;
    try {
      res = await fetch(`${this.baseUrl}${endpoint}`, { ...options, headers });
    } catch {
      throw new Error('Could not reach the server. Check your connection and try again.');
    }
    if (!res.ok) {
      let message = res.status === 413 ? 'The file is too large. The maximum size is 10 MB.' : 'Something went wrong. Please try again.';
      try {
        const json = await res.clone().json();
        if (json?.message) message = json.message;
      } catch { /* not JSON */ }
      if (admin && res.status === 401) this.signOutAdmin();
      const error = new Error(message) as Error & { status?: number };
      error.status = res.status;
      throw error;
    }
    return res;
  }

  // ---- Admin session ----
  verifyAdminToken(token: string): Observable<{ success: boolean }> {
    if (!this.isBrowser) return EMPTY;
    return from(fetch(`${this.baseUrl}/admin/session`, { headers: { Authorization: `Bearer ${token}` } }).then(async res => {
      if (res.ok) {
        this.adminToken.set(token);
        try { sessionStorage.setItem(ADMIN_TOKEN_KEY, token); } catch { /* storage blocked */ }
        return { success: true };
      }
      let message = 'That admin key is not correct.';
      try { message = (await res.json())?.message || message; } catch { /* not JSON */ }
      if (res.status === 401) message = 'That admin key is not correct.';
      throw new Error(message);
    }, () => { throw new Error('Could not reach the server.'); }));
  }

  signOutAdmin() {
    this.adminToken.set(null);
    try { sessionStorage.removeItem(ADMIN_TOKEN_KEY); } catch { /* storage blocked */ }
  }

  private readAdminToken(): string | null {
    if (!this.isBrowser) return null;
    try { return sessionStorage.getItem(ADMIN_TOKEN_KEY); } catch { return null; }
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
          avgTurnaround: '48-96h',
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
    return this.request<{ success: boolean; count: number; data: JobPosition[] }>(`/jobs${query}`);
  }

  getJobById(id: number): Observable<{ success: boolean; data: JobPosition }> {
    return this.request<{ success: boolean; data: JobPosition }>(`/jobs/${id}`);
  }

  createJob(job: Partial<JobPosition>): Observable<any> {
    return this.request<any>('/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(job)
    }, true);
  }

  // Candidates & Applications
  submitCandidateApplication(formData: FormData): Observable<any> {
    return this.request<any>('/candidates/apply', {
      method: 'POST',
      body: formData
    });
  }

  // Downloads a candidate's CV with the admin token (a plain link can't send it)
  async downloadResume(candidateId: number, fallbackName = 'cv'): Promise<void> {
    const res = await this.send(`/candidates/${candidateId}/resume`, {}, true);
    const disposition = res.headers.get('Content-Disposition') || '';
    const match = disposition.match(/filename\*?=(?:UTF-8'')?"?([^";]+)"?/i);
    const name = match ? decodeURIComponent(match[1]) : fallbackName;
    const url = URL.createObjectURL(await res.blob());
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  getCandidates(specialty?: string, status?: string): Observable<{ success: boolean; count: number; data: CandidateApplication[] }> {
    const params = new URLSearchParams();
    if (specialty) params.append('specialty', specialty);
    if (status) params.append('status', status);
    const query = params.toString() ? `?${params.toString()}` : '';

    return this.request<{ success: boolean; count: number; data: CandidateApplication[] }>(`/candidates${query}`, {}, true);
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
    return this.request<{ success: boolean; count: number; data: TalentRequest[] }>('/talent-requests', {}, true);
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
    return this.request<{ success: boolean; count: number; data: PartnerApplication[] }>('/partners', {}, true);
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
    return this.request<{ success: boolean; count: number; data: ContactInquiry[] }>('/contact', {}, true);
  }
}
