import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlightText',
  standalone: true
})
export class HighlightTextPipe implements PipeTransform {

  transform(value: string, searchValue: string | null): string {
    if (!searchValue) return value

    const regex = new RegExp(`(${searchValue})`, 'gi')

    return value.replace(regex, '<strong>$1</strong>')
  }

}
