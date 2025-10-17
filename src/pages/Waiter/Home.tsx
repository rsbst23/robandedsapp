import React from "react";
import { Link } from "@tanstack/react-router";
import { useAuth } from "../../hooks/useAuth";

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div style={containerStyles}>
      <div style={contentStyles}>
        <h1 style={titleStyles}>Dinner and a Movie</h1>
        <h2 style={subtitleStyles}>Server's site</h2>

        {isAuthenticated ? (
          <div style={welcomeContainerStyles}>
            <p style={welcomeStyles}>Welcome, {user?.first || "User"}!</p>
          </div>
        ) : (
          <div style={loginPromptStyles}>
            <p style={messageStyles}>
              You are not logged in. Click{" "}
              <Link to="/waiterlogin" style={linkStyles}>
                here
              </Link>{" "}
              to log in.
            </p>
          </div>
        )}

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
  alignItems: "flex-start",
  padding: "40px 20px",
};

const contentStyles: React.CSSProperties = {
  backgroundColor: "white",
  padding: "40px",
  borderRadius: "8px",
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  width: "100%",
  maxWidth: "600px",
  textAlign: "left",
};

const titleStyles: React.CSSProperties = {
  fontSize: "36px",
  fontWeight: "bold",
  marginBottom: "10px",
  color: "#333",
  lineHeight: "1.2",
};

const subtitleStyles: React.CSSProperties = {
  fontSize: "24px",
  fontWeight: "normal",
  marginBottom: "30px",
  color: "#333",
  lineHeight: "1.3",
};

const welcomeContainerStyles: React.CSSProperties = {
  marginBottom: "40px",
};

const welcomeStyles: React.CSSProperties = {
  fontSize: "18px",
  color: "#333",
  margin: "0",
  lineHeight: "1.4",
};

const loginPromptStyles: React.CSSProperties = {
  marginBottom: "40px",
};

const messageStyles: React.CSSProperties = {
  fontSize: "16px",
  color: "#333",
  margin: "0",
  lineHeight: "1.4",
};

const linkStyles: React.CSSProperties = {
  color: "#1976d2",
  textDecoration: "underline",
  cursor: "pointer",
};

const footerStyles: React.CSSProperties = {
  textAlign: "left",
  color: "#666",
  fontSize: "14px",
  marginTop: "60px",
  borderTop: "1px solid #eee",
  paddingTop: "20px",
};

export default Home;
