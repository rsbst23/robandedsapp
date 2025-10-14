import { Paper } from "@mui/material";
import MovieSummary from "./MovieSummary";
import ShowingTimes from "./ShowingTimes";
import type { Film } from "../types/types";

interface MovieListingProps {
  film: Film;
  showTimes: Date[];
}

const MovieShowingCard = ({ film, showTimes }: MovieListingProps) => {
  return (
    <Paper className="movie-listing-card" elevation={3} sx={{ p: 2 }}>
      <MovieSummary film={film} />
      <ShowingTimes
        filmId={film.id}
        selectedDate={new Date()}
        showTimes={showTimes}
      />
    </Paper>
  );
};

export default MovieShowingCard;
