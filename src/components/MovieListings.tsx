import { Grid } from "@mui/material";
import type { Film } from "../types/types";
import MovieShowingCard from "./MovieShowingCard";

interface MovieListingProps {
  films: Film[];
  selectedDate?: Date; // Optional prop for selected date
}

const MovieListings = ({ films, selectedDate }: MovieListingProps) => {
  
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {films.map((film) => (
        <Grid key={film.id} size={{ xs: 2, sm: 4, md: 4 }}>
          <MovieShowingCard film={film} selectedDate={selectedDate} />
        </Grid>
      ))}
    </Grid>
  );
};

export default MovieListings;
