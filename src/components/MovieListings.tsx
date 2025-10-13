import { Grid } from "@mui/material";
import type { Film } from "../types/types";
import MovieShowingCard from "./MovieShowingCard";

interface MovieListingProps {
  films: Film[];
}

const MovieListings = ({ films }: MovieListingProps) => {
  //TODO: fetch this (here or from parent)
  const showTimes = [
    new Date(2025, 10, 13, 18, 30),
    new Date(2025, 10, 13, 20, 30),
    new Date(2025, 10, 13, 22, 30),
  ];

  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {films.map((film) => (
        <Grid key={films.id} size={{ xs: 2, sm: 4, md: 4 }}>
          <MovieShowingCard film={film} showTimes={showTimes} />
        </Grid>
      ))}
    </Grid>
  );
};

export default MovieListings;
