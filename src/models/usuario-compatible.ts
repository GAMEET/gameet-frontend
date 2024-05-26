export interface UsuarioCompatible {
    username: string;
    descripcion: number;
    email: string;
    imagenPerfil?: string;
    imagenPerfilUrl?: string
    telefono: number;
    caracteristicas: string[];
    horarioJuego: string;
    juegos: string[];
}
