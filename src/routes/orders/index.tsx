import { createFileRoute } from "@tanstack/react-router";
import Order from "../../pages/Waiter/Order";

export const Route = createFileRoute("/orders/")({
  component: Order,
});
