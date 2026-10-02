import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed top-24 right-5 z-[9999] flex flex-col gap-3 max-w-md w-full pointer-events-none">
      <div 
        *ngFor="let toast of toastService.toasts()" 
        class="pointer-events-auto p-4 rounded-xl shadow-xl flex items-start gap-3 border transition-all duration-300 animate-slide-up"
        [ngClass]="{
          'bg-emerald-950 text-white border-emerald-700': toast.type === 'success',
          'bg-red-950 text-white border-red-700': toast.type === 'error',
          'bg-[#0B3C5D] text-white border-[#27609d]': toast.type === 'info',
          'bg-amber-950 text-white border-amber-600': toast.type === 'warning'
        }">
        <span class="material-symbols-outlined text-[24px] shrink-0 mt-0.5"
          [ngClass]="{
            'text-emerald-400': toast.type === 'success',
            'text-red-400': toast.type === 'error',
            'text-[#8abcff]': toast.type === 'info',
            'text-amber-400': toast.type === 'warning'
          }">
          {{ toast.type === 'success' ? 'check_circle' : toast.type === 'error' ? 'error' : toast.type === 'warning' ? 'warning' : 'info' }}
        </span>
        <div class="flex-1">
          <h4 class="font-bold text-sm leading-snug">{{ toast.title }}</h4>
          <p class="text-xs mt-1 text-slate-200 leading-relaxed">{{ toast.message }}</p>
        </div>
        <button (click)="toastService.remove(toast.id)" class="text-slate-400 hover:text-white transition-colors p-1 rounded">
          <span class="material-symbols-outlined text-[18px]">close</span>
        </button>
      </div>
    </div>
  `
})
export class ToastComponent {
  toastService = inject(ToastService);
}
