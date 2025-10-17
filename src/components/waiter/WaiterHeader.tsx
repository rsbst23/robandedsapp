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
          position: relative;
          background: linear-gradient(45deg, #fff, #f0f8ff, #fff, #e6e6fa, #fff);
          background-size: 400% 400%;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: bold;
          font-size: 24px;
          text-shadow: none;
          animation: shimmer 3s ease-in-out infinite, sparkleGlow 2s ease-in-out infinite alternate;
          filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.5));
        }

        .header-logo::before {
          content: '';
          position: absolute;
          top: -5px;
          left: -5px;
          right: -5px;
          bottom: -5px;
          background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          border-radius: 8px;
          animation: rotate 4s linear infinite;
          z-index: -1;
        }

        .header-logo::after {
          content: '✨';
          position: absolute;
          top: -10px;
          right: -15px;
          font-size: 16px;
          animation: sparkle 2s ease-in-out infinite;
        }

        .sparkle-container {
          position: relative;
          display: inline-block;
        }

        .sparkle {
          position: absolute;
          color: white;
          font-size: 12px;
          animation: sparkleFloat 3s ease-in-out infinite;
          pointer-events: none;
        }

        .sparkle:nth-child(1) {
          top: -15px;
          left: 10px;
          animation-delay: 0s;
        }

        .sparkle:nth-child(2) {
          top: -10px;
          right: 20px;
          animation-delay: 0.7s;
        }

        .sparkle:nth-child(3) {
          bottom: -15px;
          left: 50%;
          animation-delay: 1.4s;
        }

        .sparkle:nth-child(4) {
          top: 5px;
          left: -10px;
          animation-delay: 2.1s;
        }

        @keyframes shimmer {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes sparkleGlow {
          from {
            filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.3)) drop-shadow(0 0 20px rgba(255, 255, 255, 0.1));
          }
          to {
            filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.6)) drop-shadow(0 0 30px rgba(255, 255, 255, 0.2));
          }
        }

        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes sparkle {
          0%, 100% {
            opacity: 0;
            transform: scale(0.5) rotate(0deg);
          }
          50% {
            opacity: 1;
            transform: scale(1.2) rotate(180deg);
          }
        }

        @keyframes sparkleFloat {
          0%, 100% {
            opacity: 0;
            transform: translateY(0) scale(0.8);
          }
          25% {
            opacity: 1;
            transform: translateY(-10px) scale(1.2);
          }
          75% {
            opacity: 1;
            transform: translateY(-5px) scale(1);
          }
        }

        .magic-border {
          position: relative;
          overflow: hidden;
        }

        .magic-border::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          animation: sweep 3s ease-in-out infinite;
        }

        @keyframes sweep {
          0% {
            left: -100%;
          }
          100% {
            left: 100%;
          }
        }

        .header-container {
          position: relative;
          overflow: hidden;
        }

        .header-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 60%, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
          animation: floating 6s ease-in-out infinite;
          pointer-events: none;
        }

        @keyframes floating {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(10px, -10px) scale(1.05);
          }
          50% {
            transform: translate(-5px, 5px) scale(0.95);
          }
          75% {
            transform: translate(-10px, -5px) scale(1.02);
          }
        }
      `}</style>
      <header style={headerStyles} className="header-container">
        <nav style={navStyles} className="magic-border">
          <div style={logoStyles} className="header-logo sparkle-container">
            WAITER PORTAL
            <span className="sparkle">✨</span>
            <span className="sparkle">⭐</span>
            <span className="sparkle">💫</span>
            <span className="sparkle">✨</span>
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
