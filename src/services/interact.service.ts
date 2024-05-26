import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InteractService {

  private apiUrl = 'http://localhost:8080/api/usuariosCompatibles/interaccion';

  constructor(private http: HttpClient) { }

  interactuar(username: string, like: boolean, token: string): Observable<void> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    const body = {
      username: username,
      like: like
    };

    return this.http.post<void>(this.apiUrl, body, { headers });
  }
}
