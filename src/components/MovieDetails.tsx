import { Box, Typography, Container, Link } from "@mui/material";
import type { Film } from "../types/types";
import DatePicker from "./DatePicker";
import ShowingTimes from "./ShowingTimes";

interface MovieDetailsProps {
  film: Film;
}

const MovieDetails = ({ film }: MovieDetailsProps) => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: "flex", gap: 4, alignItems: "flex-start" }}>
        {/* Movie Poster */}
        <Box sx={{ flexShrink: 0 }}>
          <img
            src={"http://localhost:3008/" + film.poster_path}
            alt={film.title}
            style={{
              width: "260px",
              height: "auto",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            }}
          />
        </Box>

        {/* Movie Information */}
        <Box sx={{ flex: 1 }}>
          {/* Title */}
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: "bold",
              mb: 2,
              fontSize: { xs: "2rem", md: "3rem" },
            }}
          >
            {film.title}
          </Typography>

          {/* Tagline */}
          {film.tagline && (
            <Typography
              variant="h5"
              sx={{
                mb: 3,
                fontWeight: 500,
                color: "text.secondary",
                fontSize: { xs: "1.2rem", md: "1.5rem" },
              }}
            >
              {film.tagline}
            </Typography>
          )}

          {/* Description */}
          <Typography
            variant="body1"
            sx={{
              mb: 3,
              lineHeight: 1.7,
              fontSize: "1rem",
            }}
          >
            {film.overview}
          </Typography>

          {/* Movie Details */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Viewer's ratings:</strong> {film.vote_average}/10{" "}
              {film.vote_count} votes
            </Typography>

            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Released:</strong>{" "}
              {new Date(film.release_date).toLocaleDateString("en-US", {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </Typography>

            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>{film.runtime} minutes</strong>
            </Typography>

            {film.homepage && (
              <Link
                href={film.homepage}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: "primary.main",
                  textDecoration: "none",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                {film.homepage}
              </Link>
            )}
          </Box>
          <DatePicker showTitle={false} />
          <ShowingTimes filmId={film.id} />
        </Box>
      </Box>
    </Container>
  );
};

export default MovieDetails;
