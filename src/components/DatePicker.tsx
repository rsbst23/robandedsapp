import { Container, Typography, Paper, Box } from "@mui/material";
import { List, ListItem, ListItemText } from "@mui/material";
import "./DatePicker.css";
import { useGlobalStore } from "../stores/filmStore";

const DatePicker = () => {
  const { selectedDate, setSelectedDate } = useGlobalStore();
  const startDate = new Date(2025, 9, 12); // October 12, 2025 (month is 0-indexed)

  // Generate 7 consecutive dates starting from 10/12/2025
  const datesList = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + index);
    return date;
  });

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
  };

  const getSelectedDateString = (selectedDate?: Date | null) => {
    return selectedDate?.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Box className="date-picker-container">
      <Paper elevation={3} className="date-picker-paper">
        <Typography
          variant="h3"
          component="h1"
          className="date-picker-title"
          gutterBottom
        >
          Showings for {getSelectedDateString(selectedDate)}
        </Typography>
        <Container className="days-container">
          <List className="days-list">
            {datesList.map((date) => {
              const dateString = date.toISOString().split("T")[0];
              const selectedDateString = selectedDate
                ?.toISOString()
                .split("T")[0];
              const dayName = date.toLocaleDateString("en-US", {
                weekday: "short",
              });
              const dayNumber = date.getDate();

              return (
                <ListItem
                  key={dateString}
                  className={`day-item ${
                    selectedDateString === dateString ? "selected" : ""
                  }`}
                  onClick={() => handleDayClick(date)}
                >
                  <ListItemText
                    primary={dayName}
                    secondary={dayNumber}
                    sx={{ textAlign: "center" }}
                  />
                </ListItem>
              );
            })}
          </List>
        </Container>
      </Paper>
    </Box>
  );
};

export default DatePicker;
