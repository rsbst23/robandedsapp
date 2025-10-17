import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Theater } from "../../types/types";
import { useWaiterStore } from "../../stores/waiterStore";

const TheaterArea = () => {
  const [selectedTheaterId, setSelectedTheaterId] = useState<number | "">("");

  // Get waiter store state and actions
  const {
    assignedTheaterId,
    assignedTheater,
    isAssigned,
    assignToTheater,
    clearAssignment,
  } = useWaiterStore();

  // Initialize selection from store if already assigned
  useEffect(() => {
    if (assignedTheaterId) {
      setSelectedTheaterId(assignedTheaterId);
    }
  }, [assignedTheaterId]);

  // Fetch all theaters
  const {
    data: theaters,
    isLoading,
    error,
  } = useQuery<Theater[]>({
    queryKey: ["theaters"],
    queryFn: () =>
      fetch("http://localhost:3008/Theaters").then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch theaters");
        }
        return res.json();
      }),
  });

  // Fetch selected theater details
  const { data: selectedTheater } = useQuery<Theater>({
    queryKey: ["theater", selectedTheaterId],
    queryFn: () =>
      fetch(`http://localhost:3008/Theaters/${selectedTheaterId}`).then((res) =>
        res.json()
      ),
    enabled: !!selectedTheaterId,
  });

  const handleTheaterChange = (theaterId: number) => {
    setSelectedTheaterId(theaterId);
  };

  const handleAssignToArea = () => {
    if (selectedTheaterId && selectedTheater) {
      // Save assignment to waiter store
      assignToTheater(selectedTheaterId as number, selectedTheater);
      console.log(`Waiter assigned to theater ${selectedTheaterId} in store`);
    }
  };

  const handleClearAssignment = () => {
    clearAssignment();
    setSelectedTheaterId("");
  };

  if (isLoading) {
    return (
      <>
        <style>{`
          .loading-spinner {
            width: 40px;
            height: 40px;
            border: 4px solid rgba(102, 126, 234, 0.3);
            border-top: 4px solid #667eea;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
          
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
        <div style={containerStyles}>
          <div style={loadingContainerStyles}>
            <div className="loading-spinner"></div>
            <p style={loadingTextStyles}>Loading theaters...</p>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <div style={containerStyles}>
        <div style={errorContainerStyles}>
          <div style={errorIconStyles}>⚠️</div>
          <h3 style={errorTitleStyles}>Unable to Load Theaters</h3>
          <p style={errorMessageStyles}>
            Error loading theaters. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        .theater-card {
          animation: slideUp 0.6s ease-out;
        }
        
        .select-dropdown:focus {
          border-color: #667eea !important;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1) !important;
        }
        
        .assign-button:hover:not(:disabled) {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3) !important;
        }
        
        .clear-button:hover {
          background-color: #dc2626 !important;
          transform: translateY(-1px);
        }
        
        .theater-option:hover {
          background-color: rgba(102, 126, 234, 0.1) !important;
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
          top: 15%;
          left: 10%;
          width: 120px;
          height: 120px;
          background: radial-gradient(circle, rgba(102, 126, 234, 0.1) 0%, transparent 70%);
          border-radius: 50%;
          animation: float 6s ease-in-out infinite;
        }
        
        .floating-bg::after {
          content: '';
          position: absolute;
          top: 70%;
          right: 15%;
          width: 80px;
          height: 80px;
          background: radial-gradient(circle, rgba(255, 107, 107, 0.08) 0%, transparent 70%);
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
      `}</style>
      <div style={containerStyles}>
        <div className="floating-bg"></div>
        <div style={contentStyles} className="theater-card">
          <div style={headerSectionStyles}>
            <h1 style={titleStyles}>Theater Area Assignment</h1>
            <p style={subtitleStyles}>
              Choose the theater area you'll be serving today.
            </p>
          </div>

          {isAssigned && (
            <div style={assignmentAlertStyles}>
              <div style={successIconStyles}>✅</div>
              <div style={alertContentStyles}>
                <h4 style={alertTitleStyles}>Assignment Active</h4>
                <p style={alertMessageStyles}>
                  You have been assigned to{" "}
                  {assignedTheater?.name
                    ? `${assignedTheater.name} (Theater ${assignedTheater.id})`
                    : "your selected theater"}
                  !
                </p>
              </div>
              <button
                onClick={handleClearAssignment}
                style={clearButtonStyles}
                className="clear-button"
              >
                Clear Assignment
              </button>
            </div>
          )}

          <div style={formSectionStyles}>
            <div style={fieldGroupStyles}>
              <label htmlFor="theater-select" style={labelStyles}>
                Theater Area
              </label>
              <select
                id="theater-select"
                value={selectedTheaterId}
                onChange={(e) => handleTheaterChange(Number(e.target.value))}
                disabled={isAssigned}
                style={{
                  ...selectStyles,
                  opacity: isAssigned ? 0.6 : 1,
                  cursor: isAssigned ? "not-allowed" : "pointer",
                }}
                className="select-dropdown"
              >
                <option value="">Select a theater area...</option>
                {theaters?.map((theater) => {
                  const totalTables = theater.tables?.length || 0;
                  const totalSeats =
                    theater.tables?.reduce(
                      (total, table) => total + (table.seats?.length || 0),
                      0
                    ) || 0;

                  return (
                    <option
                      key={theater.id}
                      value={theater.id}
                      className="theater-option"
                    >
                      {theater.name} ({totalTables} tables - {totalSeats} seats)
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          {(selectedTheater || assignedTheater) && (
            <div style={detailsContainerStyles}>
              <h3 style={detailsTitleStyles}>Theater Details</h3>
              <div style={detailsGridStyles}>
                <div style={detailItemStyles}>
                  <span style={detailLabelStyles}>Theater ID:</span>
                  <span style={detailValueStyles}>
                    {(selectedTheater || assignedTheater)?.id}
                  </span>
                </div>
                <div style={detailItemStyles}>
                  <span style={detailLabelStyles}>Theater Name:</span>
                  <span style={detailValueStyles}>
                    {(selectedTheater || assignedTheater)?.name}
                  </span>
                </div>
                <div style={detailItemStyles}>
                  <span style={detailLabelStyles}>Number of Tables:</span>
                  <span style={detailValueStyles}>
                    {(selectedTheater || assignedTheater)?.tables?.length || 0}
                  </span>
                </div>
                <div style={detailItemStyles}>
                  <span style={detailLabelStyles}>Total Seats:</span>
                  <span style={detailValueStyles}>
                    {(selectedTheater || assignedTheater)?.tables?.reduce(
                      (total, table) => total + (table.seats?.length || 0),
                      0
                    ) || 0}
                  </span>
                </div>
                {isAssigned && assignedTheater && (
                  <div style={{ ...detailItemStyles, ...statusItemStyles }}>
                    <span style={detailLabelStyles}>Status:</span>
                    <span style={statusValueStyles}>✅ Currently Assigned</span>
                  </div>
                )}
              </div>
            </div>
          )}

          <button
            disabled={!selectedTheaterId || isAssigned}
            onClick={handleAssignToArea}
            style={{
              ...assignButtonStyles,
              opacity: !selectedTheaterId || isAssigned ? 0.6 : 1,
              cursor:
                !selectedTheaterId || isAssigned ? "not-allowed" : "pointer",
            }}
            className="assign-button"
          >
            {isAssigned ? "✅ Assigned to Area" : "🎯 Assign Me to This Area"}
          </button>
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
  maxWidth: "650px",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  position: "relative",
  zIndex: 1,
};

const headerSectionStyles: React.CSSProperties = {
  textAlign: "center",
  marginBottom: "40px",
};

const titleStyles: React.CSSProperties = {
  fontSize: "36px",
  fontWeight: "700",
  marginBottom: "15px",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  letterSpacing: "-0.5px",
  margin: "0 0 15px 0",
};

const subtitleStyles: React.CSSProperties = {
  fontSize: "18px",
  color: "#64748b",
  margin: "0",
  lineHeight: "1.6",
};

const loadingContainerStyles: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "300px",
  gap: "20px",
};

const loadingTextStyles: React.CSSProperties = {
  fontSize: "18px",
  color: "white",
  margin: "0",
  fontWeight: "500",
};

const errorContainerStyles: React.CSSProperties = {
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  backdropFilter: "blur(20px)",
  padding: "50px",
  borderRadius: "24px",
  textAlign: "center",
  maxWidth: "500px",
  margin: "0 auto",
  border: "2px solid rgba(220, 38, 38, 0.2)",
};

const errorIconStyles: React.CSSProperties = {
  fontSize: "48px",
  marginBottom: "20px",
};

const errorTitleStyles: React.CSSProperties = {
  fontSize: "24px",
  fontWeight: "600",
  color: "#dc2626",
  marginBottom: "15px",
  margin: "0 0 15px 0",
};

const errorMessageStyles: React.CSSProperties = {
  fontSize: "16px",
  color: "#64748b",
  margin: "0",
  lineHeight: "1.6",
};

const assignmentAlertStyles: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "15px",
  padding: "20px",
  backgroundColor: "rgba(16, 185, 129, 0.1)",
  border: "2px solid rgba(16, 185, 129, 0.2)",
  borderRadius: "16px",
  marginBottom: "30px",
};

const successIconStyles: React.CSSProperties = {
  fontSize: "24px",
  flexShrink: 0,
};

const alertContentStyles: React.CSSProperties = {
  flex: 1,
};

const alertTitleStyles: React.CSSProperties = {
  fontSize: "18px",
  fontWeight: "600",
  color: "#065f46",
  marginBottom: "5px",
  margin: "0 0 5px 0",
};

const alertMessageStyles: React.CSSProperties = {
  fontSize: "14px",
  color: "#059669",
  margin: "0",
  lineHeight: "1.5",
};

const clearButtonStyles: React.CSSProperties = {
  padding: "8px 16px",
  backgroundColor: "#ef4444",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontSize: "14px",
  fontWeight: "500",
  cursor: "pointer",
  transition: "all 0.3s ease",
  flexShrink: 0,
};

const formSectionStyles: React.CSSProperties = {
  marginBottom: "30px",
};

const fieldGroupStyles: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
};

const labelStyles: React.CSSProperties = {
  fontSize: "16px",
  fontWeight: "600",
  color: "#374151",
  marginBottom: "2px",
};

const selectStyles: React.CSSProperties = {
  padding: "16px 18px",
  border: "2px solid #e5e7eb",
  borderRadius: "12px",
  fontSize: "16px",
  backgroundColor: "#f9fafb",
  outline: "none",
  transition: "all 0.3s ease",
  fontWeight: "400",
  color: "#374151",
  width: "100%",
};

const detailsContainerStyles: React.CSSProperties = {
  backgroundColor: "#f8fafc",
  padding: "25px",
  borderRadius: "16px",
  marginBottom: "30px",
  border: "2px solid rgba(102, 126, 234, 0.1)",
};

const detailsTitleStyles: React.CSSProperties = {
  fontSize: "20px",
  fontWeight: "600",
  color: "#1f2937",
  marginBottom: "20px",
  margin: "0 0 20px 0",
};

const detailsGridStyles: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
};

const detailItemStyles: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "8px 0",
  borderBottom: "1px solid #e5e7eb",
};

const detailLabelStyles: React.CSSProperties = {
  fontSize: "14px",
  fontWeight: "500",
  color: "#6b7280",
};

const detailValueStyles: React.CSSProperties = {
  fontSize: "14px",
  fontWeight: "600",
  color: "#374151",
};

const statusItemStyles: React.CSSProperties = {
  borderBottom: "none",
  backgroundColor: "rgba(16, 185, 129, 0.1)",
  padding: "12px",
  borderRadius: "8px",
  marginTop: "8px",
};

const statusValueStyles: React.CSSProperties = {
  fontSize: "14px",
  fontWeight: "600",
  color: "#059669",
};

const assignButtonStyles: React.CSSProperties = {
  width: "100%",
  padding: "18px 32px",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  color: "white",
  border: "none",
  borderRadius: "16px",
  fontSize: "18px",
  fontWeight: "600",
  cursor: "pointer",
  transition: "all 0.3s ease",
  boxShadow: "0 8px 25px rgba(102, 126, 234, 0.3)",
  letterSpacing: "0.5px",
  marginTop: "10px",
};

export default TheaterArea;
