import { createFileRoute } from "@tanstack/react-router";
// import MovieListingsPage from "../pages/MovieListingsPage";
import Home from "../pages/Waiter/Home";
import "../index.css";

export const Route = createFileRoute("/")({
  component: Home,
});
