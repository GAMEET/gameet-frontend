import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Juego } from '../models/juego';
import { JuegoUsuario } from '../models/juego-usuario.model';

@Injectable({
  providedIn: 'root'
})
export class VideoGamesProfileService {

  private apiUrl = 'http://localhost:8080/api/juegos';
  private apiUrlUsuario = 'http://localhost:8080/api/juegosUsuario';
  private apiUrlSeleccionJuego = 'http://localhost:8080/api/seleccionJuego';
  private apiUrlEliminarJuego = 'http://localhost:8080/api/eliminarJuego';

  constructor(private http: HttpClient) { }

  getAllJuegos(): Observable<Juego[]> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found in localStorage');
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Juego[]>(this.apiUrl, { headers });
  }

  getJuegosUsuario(): Observable<JuegoUsuario[]> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found in localStorage');
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<JuegoUsuario[]>(this.apiUrlUsuario, { headers });
  }

  seleccionarJuego(juegoRequest: { juego: string, nivel: number, consola: string }, token: string): Observable<void> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<void>(this.apiUrlSeleccionJuego, juegoRequest, { headers });
  }

  eliminarJuego(juegoRequest: { juego: string, nivel: number, consola: string }, token: string): Observable<void> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<void>(this.apiUrlEliminarJuego, juegoRequest, { headers });
  }
}

