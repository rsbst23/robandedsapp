import { useEffect, useState } from "react";
import MovieDetails from "../components/MovieDetails";
import type { Film } from "../types/types";

interface MovieDetailsPageProps {
  filmId: number;
}

const MovieDetailsPage = ({ filmId }: MovieDetailsPageProps) => {
  const [film, setFilm] = useState<Film | null>(null);

  useEffect(() => {
    const fetchMovies = async (): Promise<void> => {
      try {
        const response = await fetch(`http://localhost:3008/Films/${filmId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Film = await response.json();
        setFilm(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  return film ? <MovieDetails film={film} /> : null;
};

export default MovieDetailsPage;
