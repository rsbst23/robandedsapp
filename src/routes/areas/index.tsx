import { createFileRoute } from "@tanstack/react-router";
import TheaterArea from "../../pages/Waiter/TheaterArea";

export const Route = createFileRoute("/areas/")({
  component: TheaterArea,
});
