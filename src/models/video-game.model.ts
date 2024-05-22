export interface Platform {
    platform: {
      name: string;
    };
  }
  
  export interface Genre {
    name: string;
  }
  
  export interface Game {
    name: string;
    background_image: string;
    released: string;
    platforms: Platform[];
    genres: Genre[];
    clip?: {
      clip: string;
    };
  }