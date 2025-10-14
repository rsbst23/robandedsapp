interface ShowingTimesProps {
  filmId: number;
  selectedDate: Date;
  showTimes: Date[];
}

function ShowingTimes({ showTimes }: ShowingTimesProps) {
  return (
    <>
      <div className="showtimes-container">
        <h3>Showing times for Sunday, October 5</h3>
        <div className="showtimes-grid">
          {showTimes.map((time, index) => (
            <button key={index} className="showtime-btn">
              {time.toLocaleTimeString("en-US", {
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
