import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProfileService } from './../../services/profile.service';
import { Usuario } from './../../models/usuario.model'; // Asegúrate de que la ruta sea correcta
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  usuario: Usuario = {
    username: '',
    descripcion: '',
    password: '',
    email: '',
    imagenPerfil: '',
    telefono: 0,
    caracteristicas: [],
    horarioJuego: '',
    activo: true
  };
  selectedFile: File | null = null;
  imageUrl: string | null = null;
  confirmPassword: string = '';

  alertMessage: string | null = null;
  alertType: 'success' | 'error' = 'success';

  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(private profileService: ProfileService, private router: Router) { }

  ngOnInit(): void {
    this.profileService.getProfile().subscribe(data => {
      this.usuario = data;
      if (this.usuario.imagenPerfil) {
        const contentType = 'image/jpeg'; // Ajusta el tipo de contenido según el tipo de imagen
        const blob = this.base64ToBlob(this.usuario.imagenPerfil, contentType);
        this.usuario.imagenPerfilUrl = this.createImageFromBlob(blob);
        this.imageUrl = this.usuario.imagenPerfilUrl;
      }
    });
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

  isChecked(caracteristica: string): boolean {
    return this.usuario.caracteristicas?.includes(caracteristica) ?? false;
  }

  toggleCaracteristica(caracteristica: string): void {
    const index = this.usuario.caracteristicas.indexOf(caracteristica);
    if (index > -1) {
      this.usuario.caracteristicas.splice(index, 1);
    } else {
      this.usuario.caracteristicas.push(caracteristica);
    }
  }

  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  previewFile(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files ? input.files[0] : null;

    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        // Remove the prefix 'data:image/png;base64,' or similar
        const base64String = (reader.result as string).replace(/^data:image\/[a-z]+;base64,/, '');
        this.imageUrl = reader.result as string;
        this.usuario.imagenPerfil = base64String; // Save the base64 string without prefix
      }, false);

      reader.readAsDataURL(file);
    }
  }

  modificarPerfil(): void {
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Remove the prefix 'data:image/png;base64,' or similar
        const base64String = (reader.result as string).replace(/^data:image\/[a-z]+;base64,/, '');
        this.usuario.imagenPerfil = base64String;
        this.saveProfile();
      };
      reader.readAsDataURL(this.selectedFile);
    } else {
      this.saveProfile();
    }
  }

  saveProfile(): void {
    this.profileService.updateProfile(this.usuario).subscribe({
      next: (response) => {
        this.showAlert('Perfil modificado con éxito', 'success');
      },
      error: (error: HttpErrorResponse) => {
        this.showAlert('Error al modificar el perfil', 'error');
      }
    });
  }

  showAlert(message: string, type: 'success' | 'error'): void {
    this.alertMessage = message;
    this.alertType = type;
    setTimeout(() => {
      this.alertMessage = null;
    }, 5000); // Ocultar la alerta después de 5 segundos
  }

  updateHorarioJuego(horario: string): void {
    this.usuario.horarioJuego = horario;
  }

  activarPerfil(): void {
    this.profileService.activarUsuario().subscribe({
      next: (response) => {
        this.usuario.activo = true;
        this.showAlert('Perfil activado con éxito', 'success');
      },
      error: (error: HttpErrorResponse) => {
        this.showAlert('Error al activar el perfil', 'error');
      }
    });
  }
  
  desactivarPerfil(): void {
    this.profileService.desactivarUsuario().subscribe({
      next: (response) => {
        this.usuario.activo = false;
        this.showAlert('Perfil desactivado con éxito', 'success');
      },
      error: (error: HttpErrorResponse) => {
        this.showAlert('Error al desactivar el perfil', 'error');
      }
    });
  }

  eliminarPerfil(): void {
    this.profileService.eliminarUsuario().subscribe({
      next: (response) => {
        this.router.navigate(['/login']);
        this.showAlert('Perfil eliminado con éxito', 'success');
      },
      error: (error: HttpErrorResponse) => {
        this.showAlert('Error al eliminar el perfil', 'error');
      }
    });
  }
}
