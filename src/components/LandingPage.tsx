import { Container, Typography, Button, Paper, Box } from '@mui/material'
import { PlayArrow } from '@mui/icons-material'
import ShowingTimes from "./ShowingTimes"
import { List, ListItem, ListItemText, Grid, CircularProgress } from '@mui/material'
import MovieListing from './MovieListing'
import { useState, useEffect } from 'react'

// Define the type for film data
interface Film {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
  runTime: string;
  showTimes?: Date[];
}

function LandingPage() {
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const showTimes = [new Date(2025, 10, 13, 18, 30), new Date(2025, 10, 13, 20, 30), new Date(2025, 10, 13, 22, 30)];

  // Fetch films data from server
  useEffect(() => {
    const fetchFilms = async () => {
        const response = await fetch('http://localhost:3008/films');        
        const filmsData = await response.json();
        setFilms(filmsData);       
    };

    fetchFilms();
  }, []);


  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Showings for Sunday, October 5
          </Typography>
          <Container sx={{display: "flex", backgroundColor: "lightgray", mb: 2}}>
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

        {loading && (
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress />
            <Typography variant="body1" sx={{ ml: 2 }}>Loading films...</Typography>
          </Box>
        )}

        {error && (
          <Paper elevation={2} sx={{ p: 2, mb: 2, bgcolor: 'error.light', color: 'error.contrastText' }}>
            <Typography variant="body1">Error loading films: {error}</Typography>
          </Paper>
        )}

        {!loading && !error && (
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {films.length > 0 ? (
              films.map((film) => (
                <Grid key={film.id} size={{ xs: 2, sm: 4, md: 4 }}>
                  <MovieListing 
                    imageUrl={film.imageUrl} 
                    title={film.title} 
                    description={film.description} 
                    runTime={film.runTime} 
                    showTimes={showTimes} 
                  />
                </Grid>
              ))
            ) : (
              <Grid size={12}>
                <Typography variant="body1" textAlign="center">No films available</Typography>
              </Grid>
            )}
          </Grid>
        )}
    </Container>     
  )
}

export default LandingPage