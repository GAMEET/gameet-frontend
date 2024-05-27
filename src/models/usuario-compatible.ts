export interface UsuarioCompatible {
    username: string;
    descripcion: string;
    email: string;
    imagenPerfil?: string;
    imagenPerfilUrl?: string;
    telefono: number;
    caracteristicas: string[];
    horarioJuego: string;
    juegos: string[];
    mapaJuegoConsolas: { [juego: string]: string[] };
  }
  