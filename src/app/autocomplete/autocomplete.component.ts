import { Component, Input, OnInit, Output, EventEmitter, HostListener, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { UtilsService } from '../service/utils';

@Component({
  selector: 'app-autocomplete',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.less'
})
export class AutocompleteComponent<T> implements OnInit, OnChanges{

  @Input() itemList: T[] | any[] = []

  public filteredItems: T[] | any[] = []

  @Output() select = new EventEmitter<T>()

  @Output() reset = new EventEmitter<boolean>()

  @Output() reachedBottom = new EventEmitter<boolean>()

  @Input() searchKey!: string

  public searchControl = new FormControl('');

  public showDropdownList = false;

  public isInputFocused = false

  constructor(public utils: UtilsService){}

  ngOnInit(): void {
    this.filteredItems = [...this.itemList]

    this.searchControl.valueChanges.subscribe(value => {
      this.onInputChange(value)
    });
  }

  public trackItem (index: number, item: any) {
     return `${item.name}-${index}`
  }

  public onInputChange(value: string | any) {
    if (typeof value !== 'string') {
      return;
    }

    const searchValue = value.toLowerCase()

    this.filteredItems = this.itemList
      .filter(item => item[this.searchKey]?.toLowerCase().includes(searchValue))

    this.showDropdownList = this.filteredItems.length > 0
  }

  public onFocus(){
   this.filteredItems = this.itemList
   this.showDropdownList = true
   this.isInputFocused = true
  }

  public hideDropdown(){
    this.showDropdownList = false
  }

  public onItemSelect(item: any) {
    this.select.emit(item)
    this.searchControl.setValue(item.name)
    this.showDropdownList = false
    this.isInputFocused = false
  }

  public highlightMatch(item: any): string {
    const regex = new RegExp(`(${this.searchControl.value})`, 'gi')
    return item[this.searchKey]?.replace(regex, '<strong>$1</strong>')
  }

  @HostListener('scroll', ['$event']) onScroll(event: Event) {
    const target = event.target as HTMLElement

    if (target.scrollTop + target.clientHeight >= target.scrollHeight) {
      this.reachedBottom.emit(true);
    }
  }

  @HostListener('document:click', ['$event']) onClick(event: MouseEvent) {
    const target = event.target as HTMLElement
    const inputBox = document.querySelector('.input-box') as HTMLElement
    const dropdown = document.querySelector('.pop-up-list-container') as HTMLElement

    if (inputBox && !inputBox.contains(target) && dropdown && !dropdown.contains(target)) {
        this.showDropdownList = false
    }
}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['itemList']) {
      this.updateFilteredItems()
    }
  }

  private updateFilteredItems(): void {
    this.filteredItems = this.itemList
  }

  public onReset(){
    this.searchControl.setValue('')
    this.showDropdownList = false
    this.reset.emit(true)
  }
}
