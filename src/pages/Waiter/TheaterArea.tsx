import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Paper,
  Alert,
  CircularProgress,
  Button,
} from "@mui/material";
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
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
      >
        <CircularProgress />
        <Typography variant="body1" sx={{ ml: 2 }}>
          Loading theaters...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        Error loading theaters. Please try again later.
      </Alert>
    );
  }

  return (
    <Box sx={{ maxWidth: 600, margin: "0 auto", padding: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Select Your Theater Area
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Choose the theater area you'll be serving today.
      </Typography>

      {isAssigned && (
        <Alert severity="success" sx={{ mb: 3 }}>
          You have been assigned to{" "}
          {assignedTheater?.name
            ? `${assignedTheater.name} (Theater ${assignedTheater.id})`
            : "your selected theater"}
          !
          <Button
            size="small"
            color="inherit"
            onClick={handleClearAssignment}
            sx={{ ml: 2 }}
          >
            Clear Assignment
          </Button>
        </Alert>
      )}

      <Paper elevation={2} sx={{ p: 3 }}>
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel id="theater-select-label">Theater Area</InputLabel>
          <Select
            labelId="theater-select-label"
            id="theater-select"
            value={selectedTheaterId}
            label="Theater Area"
            onChange={(e) => handleTheaterChange(e.target.value as number)}
            disabled={isAssigned}
          >
            <MenuItem value="">
              <em>Select a theater area...</em>
            </MenuItem>
            {theaters?.map((theater) => {
              const totalTables = theater.tables?.length || 0;
              const totalSeats =
                theater.tables?.reduce(
                  (total, table) => total + (table.seats?.length || 0),
                  0
                ) || 0;

              return (
                <MenuItem key={theater.id} value={theater.id}>
                  {theater.name} ({totalTables} tables - {totalSeats} seats)
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        {(selectedTheater || assignedTheater) && (
          <Box
            sx={{ mb: 3, p: 2, backgroundColor: "grey.50", borderRadius: 1 }}
          >
            <Typography variant="h6" gutterBottom>
              Theater Details
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Theater ID:</strong>{" "}
              {(selectedTheater || assignedTheater)?.id}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Theater Name:</strong>{" "}
              {(selectedTheater || assignedTheater)?.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Number of Tables:</strong>{" "}
              {(selectedTheater || assignedTheater)?.tables?.length || 0}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Total Seats:</strong>{" "}
              {(selectedTheater || assignedTheater)?.tables?.reduce(
                (total, table) => total + (table.seats?.length || 0),
                0
              ) || 0}
            </Typography>
            {isAssigned && assignedTheater && (
              <Typography variant="body2" color="success.main" sx={{ mt: 1 }}>
                <strong>Status:</strong> Currently Assigned
              </Typography>
            )}
          </Box>
        )}

        <Button
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          disabled={!selectedTheaterId || isAssigned}
          onClick={handleAssignToArea}
          sx={{
            textTransform: "none",
            fontSize: "1.1rem",
            py: 1.5,
          }}
        >
          {isAssigned ? "Assigned to Area" : "Assign Me to This Area"}
        </Button>
      </Paper>
    </Box>
  );
};

export default TheaterArea;
