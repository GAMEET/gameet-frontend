import { Component, OnInit } from '@angular/core';
import { VideoGameNewsService } from '../../services/video-game-news.service';
import { Game } from '../../models/video-game.model';

@Component({
  selector: 'app-video-game-news',
  templateUrl: './video-game-news.component.html',
  styleUrls: ['./video-game-news.component.scss']
})
export class VideoGameNewsComponent implements OnInit {
  games: Game[] = [];

  constructor(private newsService: VideoGameNewsService) {}

  ngOnInit(): void {
    this.newsService.getUpcomingGames().subscribe(
      (data) => {
        this.games = data.results;
      },
      (error) => {
        console.error('Error fetching data', error);
        this.games = [];
      }
    );
  }

  getPlatformNames(game: Game): string {
    return game.platforms ? game.platforms.map((p: any) => p.platform.name).join(', ') : '';
  }

  getGenreNames(game: Game): string {
    return game.genres ? game.genres.map((g: any) => g.name).join(', ') : '';
  }
}
