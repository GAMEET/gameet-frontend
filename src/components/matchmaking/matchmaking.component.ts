import { Component, OnInit } from '@angular/core';
import { MatchmakingService } from './../../services/matchmaking.service';
import { UsuarioCompatible } from './../../models/usuario-compatible';
import { InteractService } from './../../services/interact.service'

@Component({
  selector: 'app-matchmaking',
  templateUrl: './matchmaking.component.html',
  styleUrls: ['./matchmaking.component.scss']
})
export class MatchmakingComponent implements OnInit {
  
  usuarios: UsuarioCompatible[] = [];
  token: string | null = localStorage.getItem('token'); 

  constructor(private matchmakingService: MatchmakingService, private interactService: InteractService) { }


  ngOnInit(): void {
    this.matchmakingService.getUsuariosCompatibles().subscribe(
      (data: UsuarioCompatible[]) => {
        this.usuarios = data.map(usuario => {
          usuario.caracteristicas = this.cleanArray(usuario.caracteristicas);
          usuario.juegos = this.cleanArray(usuario.juegos);
          if (usuario.imagenPerfil) {
            const contentType = 'image/jpeg'; // Ajusta el tipo de contenido según el tipo de imagen
            const blob = this.base64ToBlob(usuario.imagenPerfil, contentType);
            usuario.imagenPerfilUrl = this.createImageFromBlob(blob);
          }
          return usuario;
        });
        console.log(this.usuarios);
      },
      (error) => {
        console.error('Error al obtener usuarios compatibles', error);
        if (error.status === 403) {
          console.error('Acceso no autorizado. Verifica tu token.');
        }
      }
    );
  }

  private cleanArray(arr: any): string[] {
    if (Array.isArray(arr)) {
      return arr.map(item => item.replace(/^[\[\]"]+|[\[\]"]+$/g, '').trim());
    }
    return [];
  }


  private base64ToBlob(base64: string, contentType: string = ''): Blob {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: contentType });
  }

  private createImageFromBlob(blob: Blob): string {
    return URL.createObjectURL(blob);
  }

  // Método para manejar el like
  likeUsuario(username: string): void {
    if (this.token) {
      this.interactService.interactuar(username, true, this.token).subscribe(
        () => {
          console.log(`Usuario ${username} liked`);
          this.removeUserFromList(username);
        },
        (error) => {
          console.error('Error en la interacción con el usuario:', error);
        }
      );
    } else {
      console.error('No token found');
    }
  }

  // Método para manejar el dislike
  dislikeUsuario(username: string): void {
    if (this.token) {
      this.interactService.interactuar(username, false, this.token).subscribe(
        () => {
          console.log(`Usuario ${username} disliked`);
          this.removeUserFromList(username);
        },
        (error) => {
          console.error('Error en la interacción con el usuario:', error);
        }
      );
    } else {
      console.error('No token found');
    }
  }

  // Método para eliminar usuario de la lista después de la interacción
  private removeUserFromList(username: string): void {
    this.usuarios = this.usuarios.filter(usuario => usuario.username !== username);
  }
  
}
