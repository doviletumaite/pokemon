import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PokemonResponse } from '../interfaces/pokemon';
import { map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  data!: PokemonResponse

  constructor(private http: HttpClient) { }

  getPokemon(){
    try {
      return this.http.get<PokemonResponse>('https://pokeapi.co/api/v2/pokemon?&limit=151').pipe(
        map(res=>{
          this.data = res
          return res
        })
       )
    } catch (error) {
      console.log("Error fetching pokemon",error)
      return
    }
  }

  getPokemonDetails(name: string){
    try {
      return this.http.get<PokemonResponse>('https://pokeapi.co/api/v2/pokemon/' + name)
    } catch (error) {
      console.log("Error fetching pokemon",error)
      return
    }

   }

  loadMorePokemons(){
    try {
      return this.http.get<PokemonResponse>(this.data?.next!).pipe(
        map(res=>{
        return this.data = {
            ...this.data,
            results: [...this.data!.results, ...res.results],
            next: res.next
         }
        })
       )
    } catch (error) {
      console.log("Error fetching pokemon",error)
      return
    }
  }

}
