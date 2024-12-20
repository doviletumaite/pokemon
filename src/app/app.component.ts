import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AutocompleteComponent } from "./autocomplete/autocomplete.component";
import { PokemonService } from './service/pokemon.service';
import { Pokemon, PokemonResponse } from './interfaces/pokemon';
import { CommonModule } from '@angular/common';
import { CapitalizeFirstLetterPipe } from './pipes/capitalize-first-letter.pipe';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    AutocompleteComponent,
    CommonModule,
    CapitalizeFirstLetterPipe
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent implements OnInit {

  public selectedPokemon?: any

  public allPokemons: Pokemon[]= []

  constructor(
    public pokeData: PokemonService
  ){}

  ngOnInit(): void {
    this.getPokemon()
  }

  private getPokemon(){
   this.pokeData.getPokemon()?.subscribe(
      ((res: PokemonResponse) => {
        this.allPokemons = res.results
        return res
      })
    )
  }

  public onPokemonSelect(e: Pokemon){
   this.pokeData.getPokemonDetails(e.name)?.subscribe(res=>{
    this.selectedPokemon = res
   })
  }

  public onLoadMore(e: any){
     this.pokeData.loadMorePokemons()?.subscribe((res:PokemonResponse)=>{
      this.allPokemons = [...this.allPokemons, ...res.results]
     })
  }

  public onReset(e:boolean){
    this.selectedPokemon = undefined
  }
}

