import { Container, Typography, Paper, Box } from "@mui/material";
import { List, ListItem, ListItemText } from "@mui/material";

const ShowingDates = () => {
  return (
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
  );
};

export default ShowingDates;
