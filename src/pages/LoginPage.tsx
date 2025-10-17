import React, { useState } from "react";
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Container,
} from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "../hooks/useAuth";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const { loginCustomer, user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset messages
    setError(null);
    setSuccess(false);
    setLoading(true);

    // Basic validation
    if (!username.trim() || !password.trim()) {
      setError("Please enter both username and password");
      setLoading(false);
      return;
    }

    try {
      loginCustomer(username, password);

      // // Check if login was successful by checking the returned result
      // if (isAuthenticated && user) {
      //   setSuccess(true);
      //   setError(null);

      //   // Redirect to home page or dashboard after successful login
      //   setTimeout(() => {
      //     navigate({ to: "/" });
      //   }, 1500);
      // } else {
      //   setError("Invalid username or password. Please try again.");
      // }
    } catch (err) {
      setError("Login failed. Please check your credentials and try again.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    if (error) setError(null); // Clear error when user starts typing
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (error) setError(null); // Clear error when user starts typing
  };

  if (isAuthenticated && user) {
    // If already logged in, redirect to home or dashboard
    navigate({ to: "/" });
    return null; // Prevent rendering the login form
  }

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            width: "100%",
            maxWidth: 400,
            borderRadius: 2,
          }}
        >
          <Typography
            component="h1"
            variant="h4"
            align="center"
            gutterBottom
            sx={{ color: "#1976d2", fontWeight: "bold" }}
          >
            Login
          </Typography>

          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            sx={{ mb: 3 }}
          >
            Please enter your credentials to continue
          </Typography>

          {/* Success Message */}
          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Login successful! Welcome back, {user?.first}. Redirecting...
            </Alert>
          )}

          {/* Error Message */}
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={handleUsernameChange}
              disabled={loading}
              error={!!error && !username.trim()}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={handlePasswordChange}
              disabled={loading}
              error={!!error && !password.trim()}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                height: 48,
                fontSize: "1.1rem",
                backgroundColor: "#1976d2",
                "&:hover": {
                  backgroundColor: "#1565c0",
                },
              }}
              disabled={loading || !username.trim() || !password.trim()}
            >
              {loading ? (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
                  Logging in...
                </Box>
              ) : (
                "Login"
              )}
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default LoginPage;
