import { createFileRoute } from "@tanstack/react-router";
import Login from "../../pages/Waiter/Login";

export const Route = createFileRoute("/waiterlogin/")({
  component: Login,
});
