import { Component, OnInit } from '@angular/core';
import { VideoGamesProfileService } from '../../services/video-games-profile.service';
import { Juego } from './../../models/juego';
import { JuegoUsuario } from './../../models/juego-usuario.model';

@Component({
  selector: 'app-video-games-available',
  templateUrl: './video-games-available.component.html',
  styleUrls: ['./video-games-available.component.scss']
})
export class VideoGamesAvailableComponent implements OnInit {
  juegos: Juego[] = [];
  juegosUsuario: JuegoUsuario[] = [];
  ratings: { [gameIndex: number]: { [consoleIndex: number]: number } } = {};
  alert = { show: false, message: '', color: '' }; // Estado para el alert

  constructor(private videoGamesProfileService: VideoGamesProfileService) { }

  ngOnInit(): void {
    this.videoGamesProfileService.getAllJuegos().subscribe(
      (data: Juego[]) => {
        this.juegos = data;
        this.initializeRatings();
      },
      (error) => {
        console.error('Error al obtener los juegos', error);
      }
    );

    this.videoGamesProfileService.getJuegosUsuario().subscribe(
      (data: JuegoUsuario[]) => {
        this.juegosUsuario = data;
      },
      (error) => {
        console.error('Error al obtener los juegos del usuario', error);
      }
    );
  }

  getGenreNames(juego: Juego): string {
    return juego.genero ? juego.genero.join(', ') : '';
  }

  initializeRatings(): void {
    this.juegos.forEach((game, gameIndex) => {
      this.ratings[gameIndex] = {};
      game.consolas.forEach((_, consoleIndex) => {
        this.ratings[gameIndex][consoleIndex] = 0;
      });
    });
  }

  updateRating(gameIndex: number, consoleIndex: number, rating: number): void {
    this.ratings[gameIndex][consoleIndex] = rating;
  }

  isRatingSelected(gameIndex: number, consoleIndex: number): boolean {
    return this.ratings[gameIndex][consoleIndex] > 0;
  }

  onSubmit(gameIndex: number, consoleIndex: number, gameId: string, consola: string): void {
    const rating = this.ratings[gameIndex][consoleIndex];
    if (rating > 0) {
      const juegoUsuario = {
        juego: gameId,
        nivel: rating,
        consola: consola
      };
      const token = localStorage.getItem('token');
      if (token) {
        this.videoGamesProfileService.seleccionarJuego(juegoUsuario, token).subscribe(
          () => {
            console.log('Juego añadido con éxito');
            this.showAlert('Juego añadido con éxito', 'alert-primary');
          },
          (error) => {
            console.error('Error al añadir el juego', error);
          }
        );
      } else {
        console.error('No token found');
      }
    }
  }

  showAlert(message: string, color: string): void {
    this.alert = { show: true, message: message, color: color };
    setTimeout(() => {
      this.alert.show = false;
    }, 3000);
  }
}
