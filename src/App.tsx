import "./App.css";
import LandingPage from "./components/LandingPage";
import MovieDetails from "./components/MovieDetails";
import PickSeats from "./components/PickSeats";
import Checkout from "./components/Checkout";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import MovieListingsPage from "./pages/MovieListingsPage";

function App() {
  return (
    <>
      <header>Header</header>
      <nav>navigation</nav>
      <MovieListingsPage />
      <MovieDetailsPage filmId={1} />
      {/* <PickSeats />
      <Checkout /> */}
      <footer>Footer</footer>
    </>
  );
}

export default App;
