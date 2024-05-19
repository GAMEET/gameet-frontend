import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;

  login(username: string, password: string): boolean {
    // Aquí debes implementar la verificación de las credenciales
    // Simulamos una autenticación exitosa
    this.isAuthenticated = username === 'admin' && password === 'admin';
    return this.isAuthenticated;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}
