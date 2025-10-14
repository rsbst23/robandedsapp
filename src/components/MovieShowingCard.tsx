import { Link, Paper } from "@mui/material";
import MovieSummary from "./MovieSummary";
import ShowingTimes from "./ShowingTimes";
import type { Film } from "../types/types";

interface MovieListingProps {
  film: Film;
}

const MovieShowingCard = ({ film }: MovieListingProps) => {
  return (
    <Link href={`/films/${film.id}`} underline="none">
      <Paper className="movie-listing-card" elevation={3} sx={{ p: 2 }}>
        <MovieSummary film={film} />
        <ShowingTimes filmId={film.id} />
      </Paper>
    </Link>
  );
};

export default MovieShowingCard;
