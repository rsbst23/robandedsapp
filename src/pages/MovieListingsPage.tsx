import { useEffect, useState } from "react";
import type { Film } from "../types/types";
import { Container } from "@mui/material";
import ShowingDates from "../components/ShowingDates";
import MovieListings from "../components/MovieListings";

const MovieListingsPage = () => {
  const [films, setFilms] = useState<Film[]>([]);

  useEffect(() => {
    const fetchMovies = async (): Promise<void> => {
      try {
        const response = await fetch("http://localhost:3008/Films");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Film[] = await response.json();
        setFilms(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <Container maxWidth="md">
      <ShowingDates />
      <MovieListings films={films} />
    </Container>
  );
};

export default MovieListingsPage;
