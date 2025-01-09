import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Pokemon } from '../models/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=1000'; // Aquí puedes cambiar el límite según lo que quieras

  constructor(private http: HttpClient) { }

  // Método para obtener todos los Pokémon (con paginación)
  getAllPokemons(): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente o de la red
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del servidor
      errorMessage = `Server Error: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
