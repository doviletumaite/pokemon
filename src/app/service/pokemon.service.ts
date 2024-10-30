import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PokemonResponse } from '../interfaces/pokemon';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  data?: PokemonResponse

  constructor(private http: HttpClient) { }

  getPokemon(){
   return this.http.get<PokemonResponse>(environment.POKEMON_API_URL + '?&limit=151').pipe(
    map(res=>{
      this.data = res
      return res
    })
   )
  }

  getPokemonDetails(name: string){
    return this.http.get<PokemonResponse>(environment.POKEMON_API_URL + '/' + name)
   }

  loadMorePokemons(){
    return this.http.get<PokemonResponse>(this.data?.next!)
  }

}
