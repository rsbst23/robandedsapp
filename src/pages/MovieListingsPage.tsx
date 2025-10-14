import { useEffect, useState } from "react";
import type { Film } from "../types/types";
import { Container } from "@mui/material";
import DatePicker from "../components/DatePicker";
import MovieListings from "../components/MovieListings";
import { useFilmStore } from "../stores/filmStore";

const MovieListingsPage = () => {
  const { films, setFilms } = useFilmStore();
  const [selectedDate, setSelectedDate] = useState<Date>(
    new Date("2025-10-15")
  );

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
  }, []);

  return (
    <Container maxWidth="md">
      <DatePicker selectedDate={selectedDate} onDateSelect={setSelectedDate} />
      <MovieListings films={films} selectedDate={selectedDate} />
      <p>Selected Date: {selectedDate?.toString()} </p>
    </Container>
  );
};

export default MovieListingsPage;
