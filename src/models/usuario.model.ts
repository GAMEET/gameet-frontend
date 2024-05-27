export interface Usuario {
    username: string;
    descripcion: string;
    password: string;
    email: string;
    imagenPerfil: string;
    imagenPerfilUrl?: string
    telefono: number;
    caracteristicas: string[];
    horarioJuego: string;
    activo: boolean;
}