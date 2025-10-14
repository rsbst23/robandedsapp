import { createFileRoute } from "@tanstack/react-router";
import MovieDetailsPage from "../../pages/MovieDetailsPage";
export const Route = createFileRoute("/films/$filmId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { filmId } = Route.useParams();
  return <MovieDetailsPage filmId={Number(filmId)} />;
}
