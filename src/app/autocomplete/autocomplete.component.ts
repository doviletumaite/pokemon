import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms'

@Component({
  selector: 'app-autocomplete',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.less'
})
export class AutocompleteComponent<T> implements OnInit {

  @Input() itemList: T[] = []

  @Output() select = new EventEmitter<T>()

  searchControl = new FormControl('');

  showDropdownList = false;

  constructor(){}

  ngOnInit(): void {}

  onSelect(item: T){
   this.select.emit(item)
  }

  onInputChange(){

  }

  showDropdown(){
   this.showDropdownList = true
  }

  hideDropdown(){
    this.showDropdownList = false
  }

  onItemSelect(item: any) {
    this.select.emit(item);
    this.searchControl.setValue(item.name);
    this.showDropdownList = false;
  }

  highlightMatch(item: any): string {
    const regex = new RegExp(`(${this.searchControl.value})`, 'gi');
    return item.name.replace(regex, '<strong>$1</strong>');
  }
}
