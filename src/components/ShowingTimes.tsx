import { useEffect, useState } from "react";
import type { Showing } from "../types/types";
import { useGlobalStore } from "../stores/filmStore";
import { Link } from "@tanstack/react-router";
import { showingRepository } from "../repositories/ShowingRepository";

interface ShowingTimesProps {
  filmId: number;
}

function ShowingTimes({ filmId }: ShowingTimesProps) {
  const { selectedDate } = useGlobalStore();
  const [showTimes, setShowTimes] = useState<Showing[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShowingTimes = async (): Promise<void> => {
      if (!selectedDate) return;

      setLoading(true);
      setError(null);

      try {
        const data = await showingRepository.getShowingsByFilmAndDate(
          filmId,
          selectedDate
        );
        setShowTimes(data);
      } catch (error) {
        setError("Failed to load showing times. Please try again.");
        console.error("Error fetching showing times:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShowingTimes();
  }, [filmId, selectedDate]);

  return (
    <>
      <div className="showtimes-container">
        <h3>Showing times for Sunday, October 5</h3>

        {loading && <p>Loading showing times...</p>}

        {error && <p style={{ color: "red" }}>{error}</p>}

        {!loading && !error && (
          <div className="showtimes-grid">
            {showTimes.length > 0 ? (
              showTimes.map((showing) => (
                <Link
                  to="/pick-seats/$showingId"
                  params={{ showingId: showing.id.toString() }}
                  key={showing.id}
                  style={{ textDecoration: "none" }}
                >
                  <button className="showtime-btn">
                    {new Date(showing.showing_time).toLocaleTimeString(
                      "en-US",
                      {
                        hour: "numeric",
                        minute: "2-digit",
                      }
                    )}
                  </button>
                </Link>
              ))
            ) : (
              <p>No showing times available for this date.</p>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default ShowingTimes;
