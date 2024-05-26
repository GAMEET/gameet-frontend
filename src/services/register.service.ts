import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = 'http://localhost:8080/auth/registro';

  constructor(private http: HttpClient) { }

  register(formData: FormData): Observable<boolean> {
    return this.http.post<{ token: string }>(this.apiUrl, formData).pipe(
      map(response => {
        console.log('Token recibido:', response.token); // Verificar el contenido de la respuesta
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          return true;
        }
        return false;
      })
    );
  }
}
