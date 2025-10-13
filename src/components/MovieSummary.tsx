const MovieSummary = ({
  imageUrl,
  title,
  description,
  runTime,
}: {
  imageUrl: string;
  title: string;
  description: string;
  runTime: string;
}) => {
  return (
    <div className="movie-card">
      <img src={imageUrl} alt={title} className="movie-image" />
      <div className="movie-details">
        <h2 className="movie-title">{title}</h2>
        <p className="movie-runtime">{runTime}</p>
        <p className="movie-summary">{description}</p>
      </div>
    </div>
  );
};

export default MovieSummary;
