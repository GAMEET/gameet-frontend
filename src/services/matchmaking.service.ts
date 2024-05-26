import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioCompatible } from './../models/usuario-compatible';

@Injectable({
  providedIn: 'root'
})
export class MatchmakingService {

  private apiUrl = 'http://localhost:8080/api/usuariosCompatibles';

  constructor(private http: HttpClient) { }

  getUsuariosCompatibles(): Observable<UsuarioCompatible[]> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found in localStorage');
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<UsuarioCompatible[]>(this.apiUrl, { headers });
  }
}
