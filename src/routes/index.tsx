import { createFileRoute } from "@tanstack/react-router";
import MovieListingsPage from "../pages/MovieListingsPage";
import "../index.css";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <MovieListingsPage />;
}
