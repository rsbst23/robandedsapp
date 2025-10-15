import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  Alert,
} from "@mui/material";
import type { User } from "../types/types";

const Register = () => {
  const queryClient = useQueryClient();

  const saveUser = async (
    userData: Omit<User, "id" | "adminUser" | "isServer" | "imageUrl">
  ) => {
    const response = await fetch("http://localhost:3008/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Failed to save user");
    }

    return response.json();
  };

  const { mutate, isPending, error, reset } = useMutation({
    mutationFn: saveUser,
    onSuccess: () => {
      // refresh the users data after adding
      queryClient.invalidateQueries({ queryKey: ["users"] });
      // Reset form after successful registration
      setFormData({
        username: "",
        password: "",
        passwordConfirm: "",
        email: "",
        first: "",
        last: "",
        phone: "",
        creditCard: {
          pan: "",
          expiryMonth: 0,
          expiryYear: 0,
        },
      });
    },
    onError: (error) => {
      console.error("Registration failed:", error);
    },
  });

  const [formData, setFormData] = useState<
    Omit<User, "id" | "adminUser" | "isServer" | "imageUrl"> & {
      passwordConfirm: string;
    }
  >({
    username: "",
    password: "",
    passwordConfirm: "",
    email: "",
    first: "",
    last: "",
    phone: "",
    creditCard: {
      pan: "",
      expiryMonth: 0,
      expiryYear: 0,
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "pan" || name === "expiryMonth" || name === "expiryYear") {
      setFormData((prev) => ({
        ...prev,
        creditCard: {
          ...prev.creditCard,
          [name]: name === "pan" ? value : parseInt(value) || 0,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Remove passwordConfirm before sending to API
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordConfirm, ...userData } = formData;

    mutate(userData);
    console.log("Registration data:", userData);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Purple Header */}
      <Box
        sx={{
          backgroundColor: "#8e44ad",
          color: "white",
          padding: "20px 0",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" component="h1" sx={{ fontWeight: "bold" }}>
          Register
        </Typography>
      </Box>

      {/* Registration Form */}
      <Container maxWidth="sm" sx={{ flex: 1, py: 4 }}>
        <Paper elevation={3} sx={{ p: 4, backgroundColor: "white" }}>
          {error && (
            <Alert severity="error" sx={{ mb: 3 }} onClose={() => reset()}>
              Registration failed:{" "}
              {error instanceof Error
                ? error.message
                : "An unexpected error occurred"}
            </Alert>
          )}
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <TextField
                fullWidth
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                variant="outlined"
                required
              />

              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                variant="outlined"
                required
              />

              <TextField
                fullWidth
                label="Password (again)"
                name="passwordConfirm"
                type="password"
                value={formData.passwordConfirm}
                onChange={handleChange}
                variant="outlined"
                required
              />

              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                variant="outlined"
                required
              />

              <TextField
                fullWidth
                label="First name (given name)"
                name="first"
                value={formData.first}
                onChange={handleChange}
                variant="outlined"
                required
              />

              <TextField
                fullWidth
                label="Last name (family name)"
                name="last"
                value={formData.last}
                onChange={handleChange}
                variant="outlined"
                required
              />

              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                variant="outlined"
                required
              />

              <TextField
                fullWidth
                label="Credit card"
                name="pan"
                value={formData.creditCard.pan}
                onChange={handleChange}
                variant="outlined"
                required
              />

              <Box sx={{ display: "flex", gap: 2 }}>
                <TextField
                  fullWidth
                  label="Expiry month"
                  name="expiryMonth"
                  type="number"
                  value={formData.creditCard.expiryMonth || ""}
                  onChange={handleChange}
                  variant="outlined"
                  placeholder="MM"
                  required
                />
                <TextField
                  fullWidth
                  label="Expiry year"
                  name="expiryYear"
                  type="number"
                  value={formData.creditCard.expiryYear || ""}
                  onChange={handleChange}
                  variant="outlined"
                  placeholder="YYYY"
                  required
                />
              </Box>

              <Box sx={{ mt: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isPending}
                  sx={{
                    backgroundColor: "#666",
                    "&:hover": {
                      backgroundColor: "#555",
                    },
                    color: "white",
                    fontWeight: "bold",
                    textTransform: "none",
                    py: 1,
                    px: 3,
                  }}
                >
                  Save
                </Button>
              </Box>
            </Box>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default Register;
