import React from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "../../stores/authStore";

interface WaiterHeaderProps {
  userName?: string;
}

const WaiterHeader: React.FC<WaiterHeaderProps> = ({ userName }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const displayName = userName || user?.first || "USER";

  const handleLogout = () => {
    logout();
    navigate({ to: "/login" });
  };

  return (
    <>
      <style>{`
        .waiter-nav-link:hover,
        .waiter-logout-btn:hover {
          background-color: rgba(255, 255, 255, 0.1) !important;
        }
      `}</style>
      <header style={headerStyles}>
        <nav style={navStyles}>
          <div style={navItemsStyles}>
            <Link to="/" style={linkStyles} className="waiter-nav-link">
              MAIN
            </Link>
            <Link to="/orders" style={linkStyles} className="waiter-nav-link">
              ORDERS
            </Link>
            <Link to="/areas" style={linkStyles} className="waiter-nav-link">
              AREAS
            </Link>
            <button
              onClick={handleLogout}
              style={logoutButtonStyles}
              className="waiter-logout-btn"
            >
              LOGOUT
            </button>
          </div>
          <div style={userGreetingStyles}>HELLO, {displayName}!</div>
        </nav>
      </header>
    </>
  );
};

const headerStyles: React.CSSProperties = {
  backgroundColor: "#4285f4",
  padding: "0",
  margin: "0",
  width: "100%",
};

const navStyles: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "12px 20px",
  maxWidth: "100%",
};

const navItemsStyles: React.CSSProperties = {
  display: "flex",
  gap: "30px",
  alignItems: "center",
};

const linkStyles: React.CSSProperties = {
  color: "white",
  textDecoration: "none",
  fontSize: "16px",
  fontWeight: "bold",
  padding: "8px 12px",
  borderRadius: "4px",
  transition: "background-color 0.2s",
};

const logoutButtonStyles: React.CSSProperties = {
  color: "white",
  backgroundColor: "transparent",
  border: "none",
  fontSize: "16px",
  fontWeight: "bold",
  padding: "8px 12px",
  borderRadius: "4px",
  cursor: "pointer",
  transition: "background-color 0.2s",
};

const userGreetingStyles: React.CSSProperties = {
  color: "white",
  fontSize: "16px",
  fontWeight: "bold",
};

export default WaiterHeader;
