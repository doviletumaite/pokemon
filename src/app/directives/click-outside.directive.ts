import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appClickOutside]',
  standalone: true
})
export class ClickOutsideDirective {

  @Output() clickOutside = new EventEmitter<void>();

  constructor() {}

  @HostListener('document:click', ['$event']) onClick(event: MouseEvent) {
    const target = event.target as HTMLElement
    const inputBox = document.querySelector('.input-box') as HTMLElement
    const dropdown = document.querySelector('.pop-up-list-container') as HTMLElement

    if (inputBox && !inputBox.contains(target) && dropdown && !dropdown.contains(target)) {
      this.clickOutside.emit()
    }
  }

}
