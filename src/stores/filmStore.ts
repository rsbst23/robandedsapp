import { create } from 'zustand';
import type { Film, Seat } from '../types/types';

interface FilmStore {
  films: Film[];
  setFilms: (films: Film[]) => void;
  addFilm: (film: Film) => void;
  removeFilm: (id: number) => void;
}

interface CartStore{
  seats: Seat[];

  addSeat: (seat: Seat) => void;
  removeSeat: (id: number) => void;
  clearSeats: () => void;
}

export const useFilmStore = create<FilmStore>((set) => ({
  films: [],
  
  // Set the entire films array (useful for initial data loading)
  setFilms: (films) => set({ films }),
  
  // Add a new film to the store
  addFilm: (film) => set((state) => ({
    films: [...state.films, film]
  })),
  
  // Remove a film by id
  removeFilm: (id) => set((state) => ({
    films: state.films.filter(film => film.id !== id)
  })),
}));


interface CartStore{
  seats: Seat[];

  addSeat: (seat: Seat) => void;
  removeSeat: (id: number) => void;
  clearSeats: () => void;
}


export const  useCartStore = create<CartStore>((set) => ({
  seats: [],
  addSeat: (seat) => set((state) => ({
    seats: [...state.seats, seat]
  })),  
  removeSeat: (id) => set((state) => ({
    seats: state.seats.filter(seat => seat.id !== id)
  })),
  clearSeats: () => set({ seats: [] }),
}));


interface GlobalStore{
  selectedDate: Date;
  setSelectedDate: (date: Date) => void; 
}

export const useGlobalStore = create<GlobalStore>((set) => ({
  selectedDate: new Date(),
  setSelectedDate: (date) => set({ selectedDate: date }),
}));