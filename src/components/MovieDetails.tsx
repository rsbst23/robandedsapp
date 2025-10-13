import { Typography } from "@mui/material";

interface MovieDetailsProps {
  imageUrl: string;
  title: string;
  description: string;
  runTime: string;
  rating: number;
  votes: number;
  releaseDate: Date;
  filmUrl: string;
  showTimes: Date[];
}

const MovieDetails = ({
  imageUrl,
  title,
  description,
  runTime,
  rating,
  votes,
  releaseDate,
  filmUrl,
}: MovieDetailsProps) => {
  return (
    <div>
      Movie Details
      <Typography variant="body2">{imageUrl}</Typography>
      <Typography variant="body2">{title}</Typography>
      <Typography variant="body2">{description}</Typography>
      <Typography variant="body2">{runTime}</Typography>
      <Typography variant="body2">{rating}</Typography>
      <Typography variant="body2">{votes}</Typography>
      <Typography variant="body2">
        {releaseDate.toLocaleDateString()}
      </Typography>
      <Typography variant="body2">{filmUrl}</Typography>
    </div>
  );
};

export default MovieDetails;
