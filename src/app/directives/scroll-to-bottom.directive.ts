import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appScrollToBottom]',
  standalone: true
})
export class ScrollToBottomDirective {

  @Output() reachedBottom = new EventEmitter<boolean>();

  constructor(private el: ElementRef) { }

  @HostListener('scroll', ['$event']) onScroll() {
    const target = this.el.nativeElement as HTMLElement
    const scrollPosition = target.scrollTop + target.clientHeight
    const maxScroll = target.scrollHeight

    if (scrollPosition >= maxScroll - 1) {
      this.reachedBottom.emit()
    }
  }
}
