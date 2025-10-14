import "./App.css";
import Header from "./components/Header";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import MovieListingsPage from "./pages/MovieListingsPage";

function App() {
  return (
    <>
      <Header />

      <MovieListingsPage />
      <MovieDetailsPage filmId={1} />
      {/* <PickSeats />
      <Checkout /> */}
      <footer>Copyright 2024 Troiana Inc</footer>
    </>
  );
}

export default App;
