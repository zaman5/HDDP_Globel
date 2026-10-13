import { AfterViewInit, Directive, ElementRef, EventEmitter, HostListener, OnDestroy, Output, inject } from '@angular/core';

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]):not([type=hidden]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Accessible modal behaviour for pop-up forms: moves focus into the dialog, keeps Tab
 * inside it, closes on Escape, stops the page scrolling behind it, and returns focus
 * to the button that opened it.
 */
@Directive({
  selector: '[appDialog]',
  standalone: true
})
export class DialogDirective implements AfterViewInit, OnDestroy {
  @Output() dialogClose = new EventEmitter<void>();

  private host = inject<ElementRef<HTMLElement>>(ElementRef);
  private opener = typeof document !== 'undefined' ? (document.activeElement as HTMLElement | null) : null;

  ngAfterViewInit() {
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      const first = this.focusables().find(el => el.matches('input, select, textarea')) || this.focusables()[0];
      (first || this.host.nativeElement).focus();
    });
  }

  ngOnDestroy() {
    document.body.style.overflow = '';
    if (this.opener && document.contains(this.opener)) this.opener.focus();
  }

  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      event.stopPropagation();
      this.dialogClose.emit();
      return;
    }
    if (event.key !== 'Tab') return;
    const items = this.focusables();
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  private focusables(): HTMLElement[] {
    return Array.from(this.host.nativeElement.querySelectorAll<HTMLElement>(FOCUSABLE))
      .filter(el => el.getClientRects().length > 0);
  }
}
