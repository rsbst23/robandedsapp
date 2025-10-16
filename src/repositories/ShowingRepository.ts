import type { Showing } from "../types/types";

export class ShowingRepository {
  private baseUrl: string;

  constructor(baseUrl: string = "http://localhost:3008") {
    this.baseUrl = baseUrl;
  }

  async getShowingsByFilmAndDate(
    filmId: number,
    date: Date
  ): Promise<Showing[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/Showings/${filmId}/${date.toISOString()}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: Showing[] = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching showing times:", error);
      throw error; // Re-throw to allow component to handle the error
    }
  }

  async getShowingById(showingId: number): Promise<Showing | null> {
    try {
      const response = await fetch(`${this.baseUrl}/Showings/${showingId}`);

      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: Showing = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching showing by ID:", error);
      throw error;
    }
  }

  async getAllShowings(): Promise<Showing[]> {
    try {
      const response = await fetch(`${this.baseUrl}/Showings`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: Showing[] = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching all showings:", error);
      throw error;
    }
  }
}

// Export a singleton instance
export const showingRepository = new ShowingRepository();
