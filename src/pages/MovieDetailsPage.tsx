import { useEffect, useState } from "react";
import MovieDetails from "../components/MovieDetails";
import type { Film } from "../types/types";
import { filmRepository } from "../repositories/FilmRepository";

interface MovieDetailsPageProps {
  filmId: number;
}

const MovieDetailsPage = ({ filmId }: MovieDetailsPageProps) => {
  const [film, setFilm] = useState<Film | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFilm = async (): Promise<void> => {
      setLoading(true);
      setError(null);

      try {
        const data = await filmRepository.getFilmById(filmId);
        setFilm(data);
      } catch (error) {
        setError("Failed to load movie details. Please try again.");
        console.error("Error fetching film:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilm();
  }, [filmId]);

  if (loading) {
    return <div>Loading movie details...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

  if (!film) {
    return <div>Movie not found.</div>;
  }

  return <MovieDetails film={film} />;
};

export default MovieDetailsPage;
