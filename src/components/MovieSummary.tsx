import type { Film } from "../types/types";

interface MovieSummaryProps {
  film: Film;
}

const MovieSummary = ({ film }: MovieSummaryProps) => {
  return (
    <div className="movie-card">
      <img
        src={"http://localhost:3008/" + film.poster_path}
        alt={film.title}
        className="movie-image"
      />
      <div className="movie-details">
        <h2 className="movie-title">{film.title}</h2>
        <p className="movie-runtime">{film.runtime} minutes</p>
        <p className="movie-tagline">{film.tagline}</p>
      </div>
    </div>
  );
};

export default MovieSummary;
