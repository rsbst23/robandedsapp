import { Container, Typography, Button, Paper, Box } from '@mui/material'
import { PlayArrow } from '@mui/icons-material'
import ShowingTimes from "./ShowingTimes"
import { List, ListItem, ListItemText, Grid } from '@mui/material'
import MovieListing from './MovieListing'

function LandingPage() {
  const showTimes = [new Date(2025, 10, 13, 18, 30), new Date(2025, 10, 13, 20, 30), new Date(2025, 10, 13, 22, 30)];


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

        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>                
            <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                <MovieListing imageUrl="imageUrl" title="title" description="description" runTime="runTime" showTimes={showTimes} />
            </Grid>
            <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                <MovieListing imageUrl="imageUrl" title="title" description="description" runTime="runTime" showTimes={showTimes} />
            </Grid>
            <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                <MovieListing imageUrl="imageUrl" title="title" description="description" runTime="runTime" showTimes={showTimes} />
            </Grid>
        </Grid>
    </Container>     
  )
}

export default LandingPage