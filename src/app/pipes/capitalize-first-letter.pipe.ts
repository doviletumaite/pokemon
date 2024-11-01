import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizeFirstLetter',
  standalone: true
})
export class CapitalizeFirstLetterPipe implements PipeTransform {

  transform(input: string): string {
    if (!input) return input;
    return input.charAt(0).toUpperCase() + input.slice(1);
  }

}
