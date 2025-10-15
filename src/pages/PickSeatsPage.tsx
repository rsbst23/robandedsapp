import { Button, Box, Typography, Paper } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { type Reservation, type Showing, type Theater } from "../types/types";

interface PickSeatsPageProps {
  showingId: number;
}

interface Seat {
  id: number;
  seatNumber: number;
  isReserved: boolean;
}

interface Table {
  id: number;
  tableNumber: number;
  seats: Seat[];
}

const PickSeatsPage = ({ showingId }: PickSeatsPageProps) => {
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

  const { data: showingData } = useQuery<Showing>({
    queryKey: ["showing", showingId],
    queryFn: () =>
      fetch(`http://localhost:3008/api/showings/${showingId}`).then((res) =>
        res.json()
      ),
  });

  const { data: theaterData } = useQuery<Theater>({
    queryKey: ["theater", showingData?.theater_id],
    queryFn: () =>
      fetch(`http://localhost:3008/Theaters/${showingData!.theater_id}`).then(
        (res) => res.json()
      ),
    enabled: !!showingData?.theater_id,
  });

  const { data: reservationsData } = useQuery<Reservation[]>({
    queryKey: ["reservations", showingId],
    queryFn: () =>
      fetch(`http://localhost:3008/showings/${showingId}/reservations`).then(
        (res) => res.json()
      ),
    enabled: !!showingData?.theater_id,
  });

  //TOD: check for loading and errors

  console.log(showingData, theaterData, reservationsData);
  // Mock theater data - replace with actual API data
  const tables: Table[] = [
    {
      id: 1,
      tableNumber: 1,
      seats: [
        { id: 1, seatNumber: 1, isReserved: true },
        { id: 2, seatNumber: 2, isReserved: true },
        { id: 3, seatNumber: 3, isReserved: true },
        { id: 4, seatNumber: 4, isReserved: true },
      ],
    },
    {
      id: 2,
      tableNumber: 2,
      seats: [
        { id: 5, seatNumber: 1, isReserved: true },
        { id: 6, seatNumber: 2, isReserved: true },
      ],
    },
    {
      id: 3,
      tableNumber: 3,
      seats: [{ id: 7, seatNumber: 1, isReserved: true }],
    },
    {
      id: 4,
      tableNumber: 4,
      seats: [
        { id: 8, seatNumber: 1, isReserved: false },
        { id: 9, seatNumber: 2, isReserved: true },
      ],
    },
    {
      id: 5,
      tableNumber: 5,
      seats: [{ id: 10, seatNumber: 1, isReserved: false }],
    },
    {
      id: 6,
      tableNumber: 6,
      seats: [
        { id: 11, seatNumber: 1, isReserved: true },
        { id: 12, seatNumber: 2, isReserved: true },
        { id: 13, seatNumber: 3, isReserved: false },
        { id: 14, seatNumber: 4, isReserved: false },
      ],
    },
    {
      id: 7,
      tableNumber: 7,
      seats: [{ id: 15, seatNumber: 1, isReserved: true }],
    },
    {
      id: 8,
      tableNumber: 8,
      seats: [
        { id: 16, seatNumber: 1, isReserved: true },
        { id: 17, seatNumber: 2, isReserved: true },
        { id: 18, seatNumber: 3, isReserved: false },
        { id: 19, seatNumber: 4, isReserved: false },
      ],
    },
    {
      id: 9,
      tableNumber: 9,
      seats: [{ id: 20, seatNumber: 1, isReserved: false }],
    },
    {
      id: 10,
      tableNumber: 10,
      seats: [
        { id: 21, seatNumber: 1, isReserved: true },
        { id: 22, seatNumber: 2, isReserved: true },
      ],
    },
    {
      id: 11,
      tableNumber: 11,
      seats: [
        { id: 23, seatNumber: 1, isReserved: true },
        { id: 24, seatNumber: 2, isReserved: true },
        { id: 25, seatNumber: 3, isReserved: true },
        { id: 26, seatNumber: 4, isReserved: false },
      ],
    },
    {
      id: 12,
      tableNumber: 12,
      seats: [{ id: 27, seatNumber: 1, isReserved: true }],
    },
    {
      id: 13,
      tableNumber: 13,
      seats: [
        { id: 28, seatNumber: 1, isReserved: true },
        { id: 29, seatNumber: 2, isReserved: false },
      ],
    },
    {
      id: 14,
      tableNumber: 14,
      seats: [
        { id: 30, seatNumber: 1, isReserved: true },
        { id: 31, seatNumber: 2, isReserved: true },
      ],
    },
    {
      id: 15,
      tableNumber: 15,
      seats: [
        { id: 32, seatNumber: 1, isReserved: true },
        { id: 33, seatNumber: 2, isReserved: true },
        { id: 34, seatNumber: 3, isReserved: true },
        { id: 35, seatNumber: 4, isReserved: true },
      ],
    },
  ];

  const handleSeatClick = (seatId: number, isReserved: boolean) => {
    if (isReserved) return;

    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((id) => id !== seatId)
        : [...prev, seatId]
    );
  };

  const handleProceedToPayment = () => {
    navigate({ to: "/checkout" });
  };

  const getSeatStyle = (seat: Seat) => {
    const baseStyle = {
      width: "40px",
      height: "40px",
      margin: "2px",
      border: "2px solid #333",
      borderRadius: "4px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "14px",
      fontWeight: "bold",
      cursor: seat.isReserved ? "not-allowed" : "pointer",
      color: "#333",
    };

    if (seat.isReserved) {
      return { ...baseStyle, backgroundColor: "#d32f2f", color: "white" };
    } else if (selectedSeats.includes(seat.id)) {
      return { ...baseStyle, backgroundColor: "#ffa726", color: "white" };
    } else {
      return {
        ...baseStyle,
        backgroundColor: "white",
        border: "2px solid #333",
      };
    }
  };

  const getTableStyle = (tableNumber: number) => {
    return {
      backgroundColor: "#1976d2",
      color: "white",
      padding: "8px 16px",
      borderRadius:
        tableNumber === 3 ||
        tableNumber === 5 ||
        tableNumber === 7 ||
        tableNumber === 9 ||
        tableNumber === 12
          ? "50%"
          : "20px",
      minWidth:
        tableNumber === 3 ||
        tableNumber === 5 ||
        tableNumber === 7 ||
        tableNumber === 9 ||
        tableNumber === 12
          ? "60px"
          : "120px",
      height:
        tableNumber === 3 ||
        tableNumber === 5 ||
        tableNumber === 7 ||
        tableNumber === 9 ||
        tableNumber === 12
          ? "60px"
          : "auto",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "18px",
      fontWeight: "bold",
      marginBottom: "8px",
    };
  };

  return (
    <Box sx={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      {/* Header */}
      <Paper
        sx={{
          backgroundColor: "#9c27b0",
          color: "white",
          padding: "20px",
          marginBottom: "20px",
        }}
      >
        <Typography variant="h4" component="h1">
          Where would you like to sit?
        </Typography>
      </Paper>

      {/* Movie Info */}
      <Typography variant="h6" sx={{ marginBottom: "20px", color: "#666" }}>
        Watching Prognosis Negative in Marilyn Monroe Theater on Sunday, October
        5 at 3:45 pm
      </Typography>

      {/* Theater Layout */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "20px",
          marginBottom: "40px",
          justifyItems: "center",
        }}
      >
        {tables.map((table) => (
          <Box
            key={table.id}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box sx={getTableStyle(table.tableNumber)}>{table.tableNumber}</Box>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                maxWidth: "120px",
              }}
            >
              {table.seats.map((seat) => (
                <Box
                  key={seat.id}
                  sx={getSeatStyle(seat)}
                  onClick={() => handleSeatClick(seat.id, seat.isReserved)}
                >
                  {seat.seatNumber}
                </Box>
              ))}
            </Box>
          </Box>
        ))}
      </Box>

      {/* Checkout Button */}
      <Paper
        sx={{
          backgroundColor: "#9c27b0",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <Button
          variant="contained"
          onClick={handleProceedToPayment}
          sx={{
            backgroundColor: "rgba(255,255,255,0.2)",
            color: "white",
            fontSize: "18px",
            padding: "12px 40px",
            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.3)",
            },
          }}
        >
          CHECK OUT
        </Button>
      </Paper>
    </Box>
  );
};
export default PickSeatsPage;
