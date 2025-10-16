import type { Film } from "../types/types";

export class FilmRepository {
  private baseUrl: string;

  constructor(baseUrl: string = "http://localhost:3008") {
    this.baseUrl = baseUrl;
  }

  async getFilmById(filmId: number): Promise<Film | null> {
    try {
      const response = await fetch(`${this.baseUrl}/Films/${filmId}`);

      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: Film = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching film by ID:", error);
      throw error;
    }
  }

  async getAllFilms(): Promise<Film[]> {
    try {
      const response = await fetch(`${this.baseUrl}/Films`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: Film[] = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching all films:", error);
      throw error;
    }
  }

  async searchFilms(query: string): Promise<Film[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/Films?search=${encodeURIComponent(query)}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: Film[] = await response.json();
      return data;
    } catch (error) {
      console.error("Error searching films:", error);
      throw error;
    }
  }

  async getFilmsByGenre(genre: string): Promise<Film[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/Films?genre=${encodeURIComponent(genre)}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: Film[] = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching films by genre:", error);
      throw error;
    }
  }
}

// Export a singleton instance
export const filmRepository = new FilmRepository();
