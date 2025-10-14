import { Paper } from "@mui/material";
import MovieSummary from "./MovieSummary";
import ShowingTimes from "./ShowingTimes";
import type { Film } from "../types/types";

interface MovieListingProps {
  film: Film;
  selectedDate?: Date;
}

const MovieShowingCard = ({ film, selectedDate }: MovieListingProps) => {
  return (
    <Paper className="movie-listing-card" elevation={3} sx={{ p: 2 }}>
      <MovieSummary film={film} />
      <ShowingTimes filmId={film.id} selectedDate={selectedDate} />
    </Paper>
  );
};

export default MovieShowingCard;
