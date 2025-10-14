import { Paper } from "@mui/material";
import MovieSummary from "./MovieSummary";
import ShowingTimes from "./ShowingTimes";
import type { Film } from "../types/types";
import { Link } from "@tanstack/react-router";

interface MovieListingProps {
  film: Film;
}

const MovieShowingCard = ({ film }: MovieListingProps) => {
  return (
    <Link
      to="/films/$filmId"
      params={{ filmId: film.id.toString() }}
      style={{ textDecoration: "none" }}
    >
      <Paper className="movie-listing-card" elevation={3} sx={{ p: 2 }}>
        <MovieSummary film={film} />
        <ShowingTimes filmId={film.id} />
      </Paper>
    </Link>
  );
};

export default MovieShowingCard;
