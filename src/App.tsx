import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LandingPage from './components/LandingPage'
import MovieDetails from './components/MovieDetails'
import PickSeats from './components/PickSeats'
import Checkout from './components/Checkout'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <header>Header</header> 
      <nav>navigation</nav>
      <LandingPage />
      <MovieDetails
        imageUrl="imageUrl"
        title="title"
        description="description"
        runTime="runTime"
        rating={0}
        votes={0}
        releaseDate={new Date()}
        filmUrl="filmUrl"
        showTimes={[]}
      />
      <PickSeats />
      <Checkout />
      <footer>Footer</footer>
    </>
  )
}

export default App
