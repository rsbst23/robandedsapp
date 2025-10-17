import React from "react";
import { Link } from "@tanstack/react-router";
import { useAuth } from "../../hooks/useAuth";

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <>
      <style>{`
        .home-container {
          animation: fadeIn 0.8s ease-out;
        }
        
        .content-card {
          animation: slideUp 0.6s ease-out 0.2s both;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .welcome-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(102, 126, 234, 0.2) !important;
        }
        
        .login-prompt:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(255, 107, 107, 0.15) !important;
        }
        
        .floating-bg {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          overflow: hidden;
          pointer-events: none;
        }
        
        .floating-bg::before {
          content: '';
          position: absolute;
          top: 20%;
          left: 15%;
          width: 150px;
          height: 150px;
          background: radial-gradient(circle, rgba(102, 126, 234, 0.1) 0%, transparent 70%);
          border-radius: 50%;
          animation: float 8s ease-in-out infinite;
        }
        
        .floating-bg::after {
          content: '';
          position: absolute;
          top: 60%;
          right: 20%;
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, rgba(255, 107, 107, 0.08) 0%, transparent 70%);
          border-radius: 50%;
          animation: float 10s ease-in-out infinite reverse;
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-30px) rotate(180deg);
          }
        }
        
        .status-badge {
          animation: pulse 2s ease-in-out infinite;
        }
        
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
      `}</style>
      <div style={containerStyles} className="home-container">
        <div className="floating-bg"></div>
        <div style={contentStyles} className="content-card">
          <div style={headerSectionStyles}>
            <div style={titleContainerStyles}>
              <h1 style={titleStyles}>Dinner and a Movie</h1>
              <div style={titleUnderlineStyles}></div>
            </div>
            <h2 style={subtitleStyles}>Waiter Portal Dashboard</h2>
          </div>

        {isAuthenticated ? (
          <div style={welcomeContainerStyles} className="welcome-card">
            <div style={statusBadgeStyles} className="status-badge">
              <span style={statusDotStyles}></span>
              Online
            </div>
            <h3 style={welcomeTitleStyles}>Welcome back, {user?.first || "Waiter"}!</h3>
            <p style={welcomeMessageStyles}>
              You're successfully logged in to the waiter portal. Ready to serve customers and manage orders.
            </p>
            <div style={quickActionsStyles}>
              <Link to="/orders" style={actionButtonStyles}>
                📋 View Orders
              </Link>
              <Link to="/areas" style={actionButtonStyles}>
                🏢 Theater Areas
              </Link>
            </div>
          </div>
        ) : (
          <div style={loginPromptStyles} className="login-prompt">
            <div style={loginIconStyles}>🔐</div>
            <h3 style={loginTitleStyles}>Authentication Required</h3>
            <p style={messageStyles}>
              Please log in to access the waiter portal and manage your assigned areas and orders.
            </p>
            <Link to="/waiterlogin" style={loginButtonStyles}>
              Sign In to Continue
            </Link>
          </div>
        )}

        <div style={footerStyles}>
          <div style={footerContentStyles}>
            <span>© 2025 Dinner and a Movie</span>
            <span style={footerDividerStyles}>•</span>
            <span>Waiter Portal</span>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

const containerStyles: React.CSSProperties = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  padding: "40px 20px",
  position: "relative",
};

const contentStyles: React.CSSProperties = {
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  backdropFilter: "blur(20px)",
  padding: "50px",
  borderRadius: "24px",
  boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.2)",
  width: "100%",
  maxWidth: "700px",
  textAlign: "left",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  position: "relative",
  zIndex: 1,
};

const headerSectionStyles: React.CSSProperties = {
  marginBottom: "40px",
  textAlign: "center",
};

const titleContainerStyles: React.CSSProperties = {
  position: "relative",
  display: "inline-block",
  marginBottom: "15px",
};

const titleStyles: React.CSSProperties = {
  fontSize: "42px",
  fontWeight: "700",
  marginBottom: "0",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  lineHeight: "1.2",
  letterSpacing: "-1px",
};

const titleUnderlineStyles: React.CSSProperties = {
  height: "4px",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  borderRadius: "2px",
  width: "60%",
  margin: "8px auto 0",
};

const subtitleStyles: React.CSSProperties = {
  fontSize: "20px",
  fontWeight: "400",
  marginBottom: "0",
  color: "#64748b",
  lineHeight: "1.3",
};

const welcomeContainerStyles: React.CSSProperties = {
  marginBottom: "40px",
  padding: "30px",
  background: "linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)",
  borderRadius: "20px",
  border: "2px solid rgba(102, 126, 234, 0.1)",
  transition: "all 0.3s ease",
  position: "relative",
};

const statusBadgeStyles: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  backgroundColor: "#10b981",
  color: "white",
  padding: "6px 16px",
  borderRadius: "20px",
  fontSize: "14px",
  fontWeight: "600",
  marginBottom: "20px",
};

const statusDotStyles: React.CSSProperties = {
  width: "8px",
  height: "8px",
  backgroundColor: "white",
  borderRadius: "50%",
};

const welcomeTitleStyles: React.CSSProperties = {
  fontSize: "28px",
  fontWeight: "600",
  color: "#1f2937",
  marginBottom: "15px",
  margin: "0 0 15px 0",
};

const welcomeMessageStyles: React.CSSProperties = {
  fontSize: "16px",
  color: "#64748b",
  lineHeight: "1.6",
  marginBottom: "25px",
};

const quickActionsStyles: React.CSSProperties = {
  display: "flex",
  gap: "15px",
  flexWrap: "wrap",
};

const actionButtonStyles: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  padding: "12px 20px",
  backgroundColor: "white",
  color: "#667eea",
  textDecoration: "none",
  borderRadius: "12px",
  fontWeight: "600",
  fontSize: "14px",
  border: "2px solid #667eea",
  transition: "all 0.3s ease",
  boxShadow: "0 4px 10px rgba(102, 126, 234, 0.1)",
};

const loginPromptStyles: React.CSSProperties = {
  marginBottom: "40px",
  padding: "40px 30px",
  textAlign: "center",
  background: "linear-gradient(135deg, rgba(255, 107, 107, 0.1) 0%, rgba(238, 90, 36, 0.1) 100%)",
  borderRadius: "20px",
  border: "2px solid rgba(255, 107, 107, 0.1)",
  transition: "all 0.3s ease",
};

const loginIconStyles: React.CSSProperties = {
  fontSize: "48px",
  marginBottom: "20px",
};

const loginTitleStyles: React.CSSProperties = {
  fontSize: "24px",
  fontWeight: "600",
  color: "#1f2937",
  marginBottom: "15px",
  margin: "0 0 15px 0",
};

const loginButtonStyles: React.CSSProperties = {
  display: "inline-block",
  padding: "14px 28px",
  background: "linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)",
  color: "white",
  textDecoration: "none",
  borderRadius: "12px",
  fontWeight: "600",
  fontSize: "16px",
  marginTop: "20px",
  transition: "all 0.3s ease",
  boxShadow: "0 6px 20px rgba(255, 107, 107, 0.3)",
};

const messageStyles: React.CSSProperties = {
  fontSize: "16px",
  color: "#64748b",
  margin: "0",
  lineHeight: "1.6",
};

const footerStyles: React.CSSProperties = {
  marginTop: "50px",
  paddingTop: "25px",
  borderTop: "2px solid rgba(102, 126, 234, 0.1)",
};

const footerContentStyles: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "12px",
  color: "#9ca3af",
  fontSize: "14px",
  fontWeight: "500",
};

const footerDividerStyles: React.CSSProperties = {
  color: "#d1d5db",
};

export default Home;
