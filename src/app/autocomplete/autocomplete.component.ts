import { Component, Input, OnInit, Output, EventEmitter, HostListener, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ClickOutsideDirective } from '../directives/click-outside.directive';
import { ScrollToBottomDirective } from '../directives/scroll-to-bottom.directive';
import { HighlightTextPipe } from '../pipes/highlight-text.pipe';
import { CapitalizeFirstLetterPipe } from '../pipes/capitalize-first-letter.pipe';

@Component({
  selector: 'app-autocomplete',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ClickOutsideDirective,
    ScrollToBottomDirective,
    HighlightTextPipe,
    CapitalizeFirstLetterPipe
  ],
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

  private typedValue?: string

  public showDropdownList = false;

  public isInputFocused = false

  constructor(){}

  ngOnInit(): void {
    this.filteredItems = [...this.itemList]

    this.searchControl.valueChanges.subscribe(value => {
      this.onInputChange(value)
    });
  }

  public onInputChange(value: string | any) {
    if (typeof value !== 'string') {
      return;
    }

    this.typedValue = value.toLocaleLowerCase()
    this.onFilterItems()
  }

  onFilterItems(){
    this.filteredItems = this.itemList
      .filter(item => item[this.searchKey]?.toLowerCase().includes(this.typedValue))
      .sort((a, b) => {
        const aStartsWith = a[this.searchKey]?.toLowerCase().startsWith(this.typedValue)
        const bStartsWith = b[this.searchKey]?.toLowerCase().startsWith(this.typedValue)

        if (aStartsWith && !bStartsWith) return -1
        if (!aStartsWith && bStartsWith) return 1

        return 0;
      });

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

  loadMoreContent(){
    this.reachedBottom.emit(true);
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
