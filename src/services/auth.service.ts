import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChatClientService, DefaultStreamChatGenerics } from 'stream-chat-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth/login';

  constructor(
    private http: HttpClient,
    private chatClientService: ChatClientService<DefaultStreamChatGenerics>
  ) {}

  login(username: string, password: string): Observable<boolean> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { username, password };

    return this.http.post<{ token: string }>(this.apiUrl, body, { headers }).pipe(
      map(response => {
        console.log('Token recibido:', response.token);  // Verificar el contenido de la respuesta
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          return true;
        }
        return false;
      })
    );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  async logout(): Promise<void> {
    localStorage.removeItem('token');
    if (this.chatClientService.chatClient.userID) {
      await this.chatClientService.chatClient.disconnectUser();
      console.log('Chat client disconnected');
    }
  }
}
