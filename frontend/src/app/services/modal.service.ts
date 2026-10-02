import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  isRequestTalentOpen = signal<boolean>(false);
  isResumeModalOpen = signal<boolean>(false);
  selectedJobTitle = signal<string>('');

  openRequestTalent(prefillRole?: string) {
    if (prefillRole) {
      this.selectedJobTitle.set(prefillRole);
    }
    this.isRequestTalentOpen.set(true);
  }

  closeRequestTalent() {
    this.isRequestTalentOpen.set(false);
  }

  openResumeModal(prefillJob?: string) {
    if (prefillJob) {
      this.selectedJobTitle.set(prefillJob);
    }
    this.isResumeModalOpen.set(true);
  }

  closeResumeModal() {
    this.isResumeModalOpen.set(false);
  }
}
