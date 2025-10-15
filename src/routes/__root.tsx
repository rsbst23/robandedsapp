import { Outlet, createRootRoute } from "@tanstack/react-router";
import "../index.css";

export const Route = createRootRoute({
  component: RootComponent,
});

import Header from "../components/Header";

function RootComponent() {
  return (
    <>
      <Header />
      <Outlet />
      <footer>Copyright 2024 Troiana is Awesome Inc</footer>
    </>
  );
}
