import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {


  constructor() { }

  capitalizeFirstLetter(input: string): string {
    if (!input) return input;
    return input.charAt(0).toUpperCase() + input.slice(1);
  }

}
