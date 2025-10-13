import { Container, Typography, Paper, Box } from "@mui/material";
import { List, ListItem, ListItemText, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import MovieShowingCard from "./MovieShowingCard";
import type { Film } from "../types/types";

function LandingPage() {
  const [movies, setMovies] = useState<Film[]>([]);

  useEffect(() => {
    const fetchMovies = async (): Promise<void> => {
      try {
        const response = await fetch("http://localhost:3008/Films");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Film[] = await response.json();
        setMovies(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  const showTimes = [
    new Date(2025, 10, 13, 18, 30),
    new Date(2025, 10, 13, 20, 30),
    new Date(2025, 10, 13, 22, 30),
  ];

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Showings for Sunday, October 5
          </Typography>
          <Container
            sx={{ display: "flex", backgroundColor: "lightgray", mb: 2 }}
          >
            <List sx={{ display: "flex", flexDirection: "row", p: 0 }}>
              <ListItem sx={{ width: "auto" }}>
                <ListItemText primary="Sun" />
              </ListItem>
              <ListItem sx={{ width: "auto" }}>
                <ListItemText primary="Mon" />
              </ListItem>
              <ListItem sx={{ width: "auto" }}>
                <ListItemText primary="Tue" />
              </ListItem>
              <ListItem sx={{ width: "auto" }}>
                <ListItemText primary="Wed" />
              </ListItem>
              <ListItem sx={{ width: "auto" }}>
                <ListItemText primary="Thur" />
              </ListItem>
              <ListItem sx={{ width: "auto" }}>
                <ListItemText primary="Fri" />
              </ListItem>
              <ListItem sx={{ width: "auto" }}>
                <ListItemText primary="Sat" />
              </ListItem>
            </List>
          </Container>
        </Paper>
      </Box>

      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {movies.map((movie) => (
          <Grid key={movie.id} size={{ xs: 2, sm: 4, md: 4 }}>
            <MovieShowingCard film={movie} showTimes={showTimes} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default LandingPage;
