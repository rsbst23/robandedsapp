import React, { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "../../hooks/useAuth";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { loginWaiter } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const user = await loginWaiter(username, password);
      if (user) {
        // Navigate to appropriate page based on user type
        if (user.isServer) {
          navigate({ to: "/" }); // Navigate to waiter dashboard
        } else {
          navigate({ to: "/" }); // Navigate to customer dashboard
        }
      } else {
        setError("Invalid username or password");
      }
    } catch {
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={containerStyles}>
      <div style={formContainerStyles}>
        <h1 style={titleStyles}>Login</h1>

        <form onSubmit={handleSubmit} style={formStyles}>
          <div style={fieldGroupStyles}>
            <label htmlFor="username" style={labelStyles}>
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={inputStyles}
              placeholder="server1"
              required
            />
          </div>

          <div style={fieldGroupStyles}>
            <label htmlFor="password" style={labelStyles}>
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyles}
              placeholder="••••"
              required
            />
          </div>

          {error && <div style={errorStyles}>{error}</div>}

          <button
            type="submit"
            disabled={isLoading}
            style={{
              ...loginButtonStyles,
              opacity: isLoading ? 0.6 : 1,
              cursor: isLoading ? "not-allowed" : "pointer",
            }}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div style={footerStyles}>Copyright © 2025 Dinner and a Movie</div>
      </div>
    </div>
  );
};

const containerStyles: React.CSSProperties = {
  minHeight: "100vh",
  backgroundColor: "#f5f5f5",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
};

const formContainerStyles: React.CSSProperties = {
  backgroundColor: "white",
  padding: "40px",
  borderRadius: "8px",
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  width: "100%",
  maxWidth: "400px",
};

const titleStyles: React.CSSProperties = {
  fontSize: "32px",
  fontWeight: "bold",
  marginBottom: "30px",
  color: "#333",
};

const formStyles: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
};

const fieldGroupStyles: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "5px",
};

const labelStyles: React.CSSProperties = {
  fontSize: "14px",
  fontWeight: "500",
  color: "#333",
};

const inputStyles: React.CSSProperties = {
  padding: "12px",
  border: "1px solid #ddd",
  borderRadius: "4px",
  fontSize: "16px",
  backgroundColor: "#f8f9ff",
  outline: "none",
  transition: "border-color 0.2s",
};

const errorStyles: React.CSSProperties = {
  color: "#d32f2f",
  fontSize: "14px",
  textAlign: "center",
  padding: "10px",
  backgroundColor: "#ffebee",
  border: "1px solid #ffcdd2",
  borderRadius: "4px",
};

const loginButtonStyles: React.CSSProperties = {
  backgroundColor: "#ff9800",
  color: "white",
  border: "none",
  padding: "12px 24px",
  borderRadius: "4px",
  fontSize: "16px",
  fontWeight: "bold",
  cursor: "pointer",
  transition: "background-color 0.2s",
  marginTop: "10px",
};

const footerStyles: React.CSSProperties = {
  textAlign: "center",
  marginTop: "30px",
  color: "#666",
  fontSize: "14px",
};

export default LoginPage;
