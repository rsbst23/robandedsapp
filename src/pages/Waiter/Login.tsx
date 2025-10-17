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
    <>
      <style>{`
        .login-input:focus {
          border-color: #667eea !important;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1) !important;
          transform: translateY(-2px);
        }
        
        .login-button:hover:not(:disabled) {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3) !important;
        }
        
        .login-button:active {
          transform: translateY(0);
        }
        
        .form-container {
          animation: slideUp 0.6s ease-out;
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
        
        .floating-elements {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          overflow: hidden;
          pointer-events: none;
        }
        
        .floating-elements::before {
          content: '';
          position: absolute;
          top: 10%;
          left: 10%;
          width: 100px;
          height: 100px;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
          border-radius: 50%;
          animation: float 6s ease-in-out infinite;
        }
        
        .floating-elements::after {
          content: '';
          position: absolute;
          top: 60%;
          right: 20%;
          width: 150px;
          height: 150px;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 70%);
          border-radius: 50%;
          animation: float 8s ease-in-out infinite reverse;
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      <div style={containerStyles}>
        <div className="floating-elements"></div>
        <div style={formContainerStyles} className="form-container">
          <div style={titleContainerStyles}>
            <h1 style={titleStyles}>Welcome Back</h1>
            <p style={subtitleStyles}>Sign in to your waiter account</p>
          </div>

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
                className="login-input"
                placeholder="Enter your username"
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
                className="login-input"
                placeholder="Enter your password"
                required
              />
            </div>

            {error && <div style={errorStyles}>{error}</div>}

            <button
              type="submit"
              disabled={isLoading}
              className="login-button"
              style={{
                ...loginButtonStyles,
                opacity: isLoading ? 0.6 : 1,
                cursor: isLoading ? "not-allowed" : "pointer",
              }}
            >
              {isLoading ? (
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                  }}
                >
                  <span style={{ ...loadingSpinnerStyles }}></span>
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div style={footerStyles}>
            © 2025 Dinner and a Movie • Waiter Portal
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
  alignItems: "center",
  padding: "20px",
  position: "relative",
};

const formContainerStyles: React.CSSProperties = {
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  backdropFilter: "blur(20px)",
  padding: "50px",
  borderRadius: "20px",
  boxShadow:
    "0 20px 40px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.2)",
  width: "100%",
  maxWidth: "450px",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  position: "relative",
  zIndex: 1,
};

const titleContainerStyles: React.CSSProperties = {
  textAlign: "center",
  marginBottom: "40px",
};

const titleStyles: React.CSSProperties = {
  fontSize: "36px",
  fontWeight: "700",
  marginBottom: "10px",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  letterSpacing: "-0.5px",
};

const subtitleStyles: React.CSSProperties = {
  fontSize: "16px",
  color: "#666",
  margin: "0",
  fontWeight: "400",
};

const formStyles: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "25px",
};

const fieldGroupStyles: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
};

const labelStyles: React.CSSProperties = {
  fontSize: "15px",
  fontWeight: "600",
  color: "#374151",
  marginBottom: "2px",
};

const inputStyles: React.CSSProperties = {
  padding: "16px 18px",
  border: "2px solid #e5e7eb",
  borderRadius: "12px",
  fontSize: "16px",
  backgroundColor: "#f9fafb",
  outline: "none",
  transition: "all 0.3s ease",
  fontWeight: "400",
  color: "#374151",
};

const errorStyles: React.CSSProperties = {
  color: "#dc2626",
  fontSize: "14px",
  textAlign: "center",
  padding: "12px 16px",
  backgroundColor: "#fef2f2",
  border: "1px solid #fecaca",
  borderRadius: "12px",
  fontWeight: "500",
};

const loginButtonStyles: React.CSSProperties = {
  background: "linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)",
  color: "white",
  border: "none",
  padding: "16px 32px",
  borderRadius: "12px",
  fontSize: "16px",
  fontWeight: "600",
  cursor: "pointer",
  transition: "all 0.3s ease",
  marginTop: "15px",
  boxShadow: "0 4px 15px rgba(255, 107, 107, 0.3)",
  letterSpacing: "0.5px",
};

const loadingSpinnerStyles: React.CSSProperties = {
  width: "16px",
  height: "16px",
  border: "2px solid rgba(255, 255, 255, 0.3)",
  borderTop: "2px solid white",
  borderRadius: "50%",
  animation: "spin 1s linear infinite",
  display: "inline-block",
};

const footerStyles: React.CSSProperties = {
  textAlign: "center",
  marginTop: "40px",
  color: "#9ca3af",
  fontSize: "14px",
  fontWeight: "400",
};

export default LoginPage;
