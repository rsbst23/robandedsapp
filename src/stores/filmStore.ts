import { create } from 'zustand';
import type { Film } from '../types/types';

interface FilmStore {
  films: Film[];
  setFilms: (films: Film[]) => void;
  addFilm: (film: Film) => void;
  removeFilm: (id: number) => void;
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
