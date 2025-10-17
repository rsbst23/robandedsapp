import React from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "../../stores/authStore";

const WaiterHeader = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuthStore();

  const displayName = user?.first || "";

  const handleLogout = () => {
    logout();
    navigate({ to: "/waiterlogin" });
  };

  return (
    <>
      <style>{`
        .waiter-nav-link:hover,
        .waiter-logout-btn:hover {
          background-color: rgba(255, 255, 255, 0.15) !important;
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        
        .waiter-nav-link:active,
        .waiter-logout-btn:active {
          transform: translateY(0);
        }

        .user-greeting {
          background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: glow 2s ease-in-out infinite alternate;
        }

        @keyframes glow {
          from {
            filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.3));
          }
          to {
            filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.5));
          }
        }

        .header-logo {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: bold;
          font-size: 24px;
          text-shadow: none;
        }
      `}</style>
      <header style={headerStyles}>
        <nav style={navStyles}>
          <div style={logoStyles} className="header-logo">
            WAITER PORTAL
          </div>
          <div style={navItemsStyles}>
            <Link to="/" style={linkStyles} className="waiter-nav-link">
              MAIN
            </Link>
            {isAuthenticated && (
              <>
                <Link
                  to="/orders"
                  style={linkStyles}
                  className="waiter-nav-link"
                >
                  ORDERS
                </Link>
                <Link
                  to="/areas"
                  style={linkStyles}
                  className="waiter-nav-link"
                >
                  AREAS
                </Link>
                <button
                  onClick={handleLogout}
                  style={logoutButtonStyles}
                  className="waiter-logout-btn"
                >
                  Logout
                </button>
              </>
            )}
            {!isAuthenticated && (
              <>
                <Link
                  to="/waiterlogin"
                  style={linkStyles}
                  className="waiter-nav-link"
                >
                  Login
                </Link>
              </>
            )}
          </div>
          {isAuthenticated && (
            <div style={userGreetingStyles} className="user-greeting">
              HELLO, {displayName}!
            </div>
          )}
        </nav>
      </header>
    </>
  );
};

const headerStyles: React.CSSProperties = {
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  padding: "0",
  margin: "0",
  width: "100%",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
  borderBottom: "3px solid rgba(255, 255, 255, 0.1)",
};

const logoStyles: React.CSSProperties = {
  fontSize: "24px",
  fontWeight: "bold",
  color: "white",
  letterSpacing: "1px",
};

const navStyles: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "16px 32px",
  maxWidth: "100%",
  minHeight: "70px",
};

const navItemsStyles: React.CSSProperties = {
  display: "flex",
  gap: "24px",
  alignItems: "center",
};

const linkStyles: React.CSSProperties = {
  color: "white",
  textDecoration: "none",
  fontSize: "16px",
  fontWeight: "600",
  padding: "12px 20px",
  borderRadius: "25px",
  transition: "all 0.3s ease",
  border: "2px solid transparent",
  position: "relative",
  overflow: "hidden",
  letterSpacing: "0.5px",
};

const logoutButtonStyles: React.CSSProperties = {
  color: "white",
  backgroundColor: "transparent",
  border: "2px solid rgba(255, 255, 255, 0.3)",
  fontSize: "16px",
  fontWeight: "600",
  padding: "12px 20px",
  borderRadius: "25px",
  cursor: "pointer",
  transition: "all 0.3s ease",
  position: "relative",
  overflow: "hidden",
  letterSpacing: "0.5px",
};

const userGreetingStyles: React.CSSProperties = {
  color: "white",
  fontSize: "18px",
  fontWeight: "700",
  letterSpacing: "1px",
  textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
  padding: "8px 16px",
  borderRadius: "20px",
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(10px)",
};

export default WaiterHeader;
