import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

  pokemons: any[] = [];
  isLoading: boolean = true;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.pokemonService.getAllPokemons().subscribe({
      next: (data) => {
        // Añade la URL de las imágenes al array
        this.pokemons = data.results.map((pokemon: any, index: number) => ({
          ...pokemon,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`
        }));
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading Pokémon list', err);
        this.isLoading = false;
      }
    });
  }
}
