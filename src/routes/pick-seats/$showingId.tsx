import { createFileRoute } from "@tanstack/react-router";
import PickSeatsPage from "../../pages/PickSeatsPage";

export const Route = createFileRoute("/pick-seats/$showingId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { showingId } = Route.useParams();
  return <PickSeatsPage showingId={Number(showingId)} />;
}
