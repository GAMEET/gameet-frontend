import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from '../models/video-game.model';

@Injectable({
  providedIn: 'root'
})
export class VideoGameNewsService {
  private apiUrl = 'https://api.rawg.io/api/games';
  private apiKey = '0bafcca66de548ab8426d2544e2a7621';

  constructor(private http: HttpClient) {}

  getUpcomingGames(): Observable<{ results: Game[] }> {
    const date = new Date();
    const year = date.getFullYear();
    const month = this.convertToTwoDigits(date.getMonth() + 1);
    const day = this.convertToTwoDigits(date.getDate());
    const today = `${year}-${month}-${day}`;
    const nextYear = `${year + 1}-${month}-${day}`;
    const url = `${this.apiUrl}?key=${this.apiKey}&dates=${today},${nextYear}&ordering=-added`;

    return this.http.get<{ results: Game[] }>(url);
  }

  private convertToTwoDigits(digit: number): string {
    return digit.toString().padStart(2, '0');
  }
}
