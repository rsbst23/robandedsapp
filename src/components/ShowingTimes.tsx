import { useEffect, useState } from "react";
import type { Showing } from "../types/types";

interface ShowingTimesProps {
  filmId: number;
  selectedDate?: Date;
}

function ShowingTimes({ filmId, selectedDate }: ShowingTimesProps) {
  const [showTimes, setShowTimes] = useState<Showing[]>([]);

  useEffect(() => {
    // Only fetch if films array is empty to avoid refetching on every render
    const fetchShowingTimes = async (): Promise<void> => {
      try {
        const response = await fetch(
          `http://localhost:3008/Showings/${filmId}/${selectedDate.toISOString()}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Showing[] = await response.json();
        setShowTimes(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchShowingTimes();
  }, [filmId, selectedDate]);

  return (
    <>
      <div className="showtimes-container">
        <h3>Showing times for Sunday, October 5</h3>
        <div className="showtimes-grid">
          {showTimes.map((showing) => (
            <button key={showing.id} className="showtime-btn">
              {new Date(showing.showing_time).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
              })}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default ShowingTimes;
