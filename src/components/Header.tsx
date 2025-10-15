import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "@tanstack/react-router";
import { useAuth } from "../hooks/useAuth";

const Header = () => {
  const { logout, isAuthenticated, user } = useAuth();

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            fontWeight: "bold",
            fontSize: { xs: "1.1rem", sm: "1.25rem" },
          }}
        >
          Dinner and a Movie
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          {!isAuthenticated ? (
            <Button
              color="inherit"
              component={Link}
              to="/login"
              sx={{
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              Login
            </Button>
          ) : (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="body1" sx={{ color: "white" }}>
                Welcome, {user?.username}!
              </Typography>
              <Button
                color="inherit"
                onClick={logout}
                to="/login"
                component={Link}
                sx={{
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                Logout
              </Button>
            </Box>
          )}
          <Button
            color="inherit"
            component={Link}
            to="/register"
            sx={{
              textTransform: "none",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
            }}
          >
            Register
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
