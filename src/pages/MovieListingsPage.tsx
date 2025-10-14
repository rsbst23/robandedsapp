import { useEffect } from "react";
import type { Film } from "../types/types";
import { Container } from "@mui/material";
import DatePicker from "../components/DatePicker";
import MovieListings from "../components/MovieListings";
import { useFilmStore } from "../stores/filmStore";

const MovieListingsPage = () => {
  const { films, setFilms } = useFilmStore();

  useEffect(() => {
    // Only fetch if films array is empty to avoid refetching on every render
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
  }, [setFilms]);

  return (
    <Container maxWidth="md">
      <DatePicker />
      <MovieListings films={films} />
    </Container>
  );
};

export default MovieListingsPage;
