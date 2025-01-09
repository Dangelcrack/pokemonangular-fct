export interface Gym {
    id?: string; // Usado como ID en Firestore
    location: string; // Ubicación del gimnasio
    leader: string; // Líder del gimnasio
    name: string; // Nombre del gimnasio
    type: string; // Tipo del gimnasio (e.g., Agua, Fuego)
  }
  