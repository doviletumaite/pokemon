import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AutocompleteComponent } from "./autocomplete/autocomplete.component";
import { PokemonService } from './service/pokemon.service';
import { Pokemon, PokemonResponse } from './interfaces/pokemon';
import { map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { UtilsService } from './service/utils';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AutocompleteComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent implements OnInit {

  public pokemons$?: Observable<PokemonResponse>

  public selectedPokemon?: any

  public allPokemons: Pokemon[] = []

  constructor(
    public pokeData: PokemonService,
    public utils: UtilsService
  ){}

  ngOnInit(): void {
    this.getPokemon()
    this.pokemons$?.subscribe()
  }

  private getPokemon(){
    this.pokemons$ = this.pokeData.getPokemon().pipe(
      map((res: PokemonResponse) => {
        this.allPokemons = res.results
        return res
      })
    )
  }

  public onPokemonSelect(e: Pokemon){
   this.pokeData.getPokemonDetails(e.name).subscribe(res=>{
    this.selectedPokemon = res
   })
  }

  public onLoadMore(e: any){
     this.pokeData.loadMorePokemons().subscribe((res:PokemonResponse)=>{
      this.allPokemons = [...this.allPokemons, ...res.results]
     })
  }

  public onReset(e:boolean){
    this.selectedPokemon = undefined
  }
}

