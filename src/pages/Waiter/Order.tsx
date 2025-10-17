import React from "react";
import { Link } from "@tanstack/react-router";
import OrdersList from "../../components/waiter/OrdersList";
import { useWaiterStore } from "../../stores/waiterStore";

const Order = () => {
  const { assignedTheater, assignedTheaterId, isAssigned } = useWaiterStore();

  return (
    <>
      <style>{`
        .order-container {
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
        
        .assignment-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(102, 126, 234, 0.2) !important;
        }
        
        .orders-section:hover {
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
      <div style={containerStyles} className="order-container">
        <div className="floating-bg"></div>
        <div style={contentStyles} className="content-card">
          <div style={headerSectionStyles}>
            <div style={titleContainerStyles}>
              <h1 style={titleStyles}>Order Management</h1>
              <div style={titleUnderlineStyles}></div>
            </div>
            <h2 style={subtitleStyles}>Waiter Order Dashboard</h2>
          </div>

          {!isAssigned || !assignedTheater ? (
            <div style={assignmentPromptStyles} className="assignment-card">
              <div style={assignmentIconStyles}>🏢</div>
              <h3 style={assignmentTitleStyles}>Theater Assignment Required</h3>
              <p style={messageStyles}>
                To view and manage orders, you need to be assigned to a theater
                area first. Please select your theater assignment to get
                started.
              </p>
              <div style={infoBoxStyles}>
                <p style={infoTextStyles}>
                  <strong>Why do I need a theater assignment?</strong>
                  <br />
                  Orders are organized by theater areas to help you focus on
                  your assigned section and provide better service to customers
                  in your area.
                </p>
              </div>
              <Link to="/areas" style={assignmentButtonStyles}>
                🏢 Select Theater Area
              </Link>
            </div>
          ) : (
            <>
              <div style={ordersContainerStyles} className="orders-section">
                <div style={statusBadgeStyles} className="status-badge">
                  <span style={statusDotStyles}></span>
                  Assigned: {assignedTheater.name}
                </div>
                <h3 style={sectionTitleStyles}>My Orders</h3>
                <p style={sectionDescriptionStyles}>
                  Orders assigned to {assignedTheater.name}
                </p>
                <div style={ordersListWrapperStyles}>
                  <OrdersList
                    theaterId={assignedTheaterId || undefined}
                    theaterName={assignedTheater.name}
                  />
                </div>
              </div>

              <div style={dividerStyles}></div>

              <div
                style={otherOrdersContainerStyles}
                className="orders-section"
              >
                <h3 style={sectionTitleStyles}>Other Orders</h3>
                <p style={sectionDescriptionStyles}>
                  Orders from all other areas
                </p>
                <div style={ordersListWrapperStyles}>
                  <OrdersList
                    excludeTheaterId={assignedTheaterId || undefined}
                  />
                </div>
              </div>
            </>
          )}
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
  boxShadow:
    "0 25px 50px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.2)",
  width: "100%",
  maxWidth: "900px",
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

const assignmentPromptStyles: React.CSSProperties = {
  marginBottom: "40px",
  padding: "40px 30px",
  textAlign: "center",
  background:
    "linear-gradient(135deg, rgba(255, 107, 107, 0.1) 0%, rgba(238, 90, 36, 0.1) 100%)",
  borderRadius: "20px",
  border: "2px solid rgba(255, 107, 107, 0.1)",
  transition: "all 0.3s ease",
};

const assignmentIconStyles: React.CSSProperties = {
  fontSize: "48px",
  marginBottom: "20px",
};

const assignmentTitleStyles: React.CSSProperties = {
  fontSize: "24px",
  fontWeight: "600",
  color: "#1f2937",
  marginBottom: "15px",
  margin: "0 0 15px 0",
};

const assignmentButtonStyles: React.CSSProperties = {
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

const infoBoxStyles: React.CSSProperties = {
  backgroundColor: "rgba(59, 130, 246, 0.1)",
  border: "1px solid rgba(59, 130, 246, 0.2)",
  borderRadius: "12px",
  padding: "20px",
  margin: "20px 0",
  textAlign: "left",
};

const infoTextStyles: React.CSSProperties = {
  fontSize: "14px",
  color: "#1f2937",
  margin: "0",
  lineHeight: "1.6",
};

const ordersContainerStyles: React.CSSProperties = {
  marginBottom: "40px",
  padding: "30px",
  background:
    "linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)",
  borderRadius: "20px",
  border: "2px solid rgba(102, 126, 234, 0.1)",
  transition: "all 0.3s ease",
  position: "relative",
};

const otherOrdersContainerStyles: React.CSSProperties = {
  marginBottom: "40px",
  padding: "30px",
  background:
    "linear-gradient(135deg, rgba(255, 107, 107, 0.1) 0%, rgba(238, 90, 36, 0.1) 100%)",
  borderRadius: "20px",
  border: "2px solid rgba(255, 107, 107, 0.1)",
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

const sectionTitleStyles: React.CSSProperties = {
  fontSize: "28px",
  fontWeight: "600",
  color: "#1f2937",
  marginBottom: "15px",
  margin: "0 0 15px 0",
};

const sectionDescriptionStyles: React.CSSProperties = {
  fontSize: "16px",
  color: "#64748b",
  lineHeight: "1.6",
  marginBottom: "25px",
};

const ordersListWrapperStyles: React.CSSProperties = {
  backgroundColor: "white",
  borderRadius: "12px",
  padding: "20px",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
};

const dividerStyles: React.CSSProperties = {
  height: "2px",
  background:
    "linear-gradient(135deg, rgba(102, 126, 234, 0.3) 0%, rgba(118, 75, 162, 0.3) 100%)",
  borderRadius: "1px",
  margin: "40px 0",
};

const messageStyles: React.CSSProperties = {
  fontSize: "16px",
  color: "#64748b",
  margin: "0",
  lineHeight: "1.6",
};

export default Order;
