export interface Player {
  name: string;
  cedula: string;
  egresado: boolean;
}

export type Sport = 'microfutbol' | 'baloncesto' | 'pingpong';
export interface Team {
  id: string;
  name: string;
  sport: Sport;
  captain: string;
  email: string;
  phone: string;
  registrationDate: string;
  players: Player[];
}
