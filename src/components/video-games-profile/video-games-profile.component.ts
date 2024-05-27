import { Component, OnInit } from '@angular/core';
import { VideoGamesProfileService } from '../../services/video-games-profile.service';
import { JuegoUsuario } from './../../models/juego-usuario.model';

@Component({
  selector: 'app-video-games-profile',
  templateUrl: './video-games-profile.component.html',
  styleUrls: ['./video-games-profile.component.scss']
})
export class VideoGamesProfileComponent implements OnInit {

  juegosUsuario: JuegoUsuario[] = [];

  constructor(private videoGamesProfileService: VideoGamesProfileService) { }

  ngOnInit(): void {
    this.videoGamesProfileService.getJuegosUsuario().subscribe(
      (data: JuegoUsuario[]) => {
        this.juegosUsuario = data;
      },
      (error) => {
        console.error('Error al obtener los juegos del usuario', error);
      }
    );
  }

  eliminarJuego(juegoId: string, nivel: number, consola: string): void {
    const juegoRequest = {
      juego: juegoId,
      nivel: nivel,
      consola: consola
    };
    const token = localStorage.getItem('token');
    if (token) {
      this.videoGamesProfileService.eliminarJuego(juegoRequest, token).subscribe(
        () => {
          console.log('Juego eliminado con éxito');
          // Encuentra el juego en la lista de juegosUsuario
          const juego = this.juegosUsuario.find(j => j.id === juegoId);
          if (juego) {
            // Elimina la consola específica del juego
            delete juego.consolaNivel[consola];
            // Si no quedan consolas, elimina el juego de la lista
            if (Object.keys(juego.consolaNivel).length === 0) {
              this.juegosUsuario = this.juegosUsuario.filter(j => j.id !== juegoId);
            }
          }
        },
        (error) => {
          console.error('Error al eliminar el juego', error);
        }
      );
    } else {
      console.error('No token found');
    }
  }

  getStars(nivel: number): number[] {
    return Array(nivel).fill(0);
  }

  getEmptyStars(nivel: number): number[] {
    return Array(5 - nivel).fill(0);
  }
}
