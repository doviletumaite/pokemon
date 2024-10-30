import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AutocompleteComponent } from "./autocomplete/autocomplete.component";
import { PokemonService } from './service/pokemon.service';
import { Pokemon, PokemonResponse } from './interfaces/pokemon';
import { map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AutocompleteComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent implements OnInit {

  public pokemon$?: Observable<PokemonResponse>

  constructor(public pokeData: PokemonService){}

  ngOnInit(): void {
    this.getPokemon()
  }

  getPokemon(){
    this.pokemon$ = this.pokeData.getPokemon()
  }

}

