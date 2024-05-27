export interface JuegoUsuario {
    id: string;
    genero: string[];
    imagenPortada: string;
    consolaNivel: { [key: string]: number };
    titulo: string;
  }
  