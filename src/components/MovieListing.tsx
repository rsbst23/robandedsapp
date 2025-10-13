import {Paper } from '@mui/material'
import MovieSummary from './MovieSummary';
import ShowingTimes from "./ShowingTimes"


const MovieListing = ({ imageUrl, title, description, runTime, showTimes }: { imageUrl: string; title: string; description: string; runTime: string; showTimes: Date[] }) => {
    return (
        
        <Paper className='movie-listing-card' elevation={3} sx={{ p: 2 }}>
            <MovieSummary imageUrl={imageUrl} title={title} description={description} runTime={runTime} />
            <ShowingTimes fileId={1} selectedDate={new Date()} showTimes={showTimes} />
        </Paper>
    )   
}

export default MovieListing;