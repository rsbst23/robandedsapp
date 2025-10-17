import { Outlet, createRootRoute } from "@tanstack/react-router";
import "../index.css";

export const Route = createRootRoute({
  component: RootComponent,
});

// import Header from "../components/Header";
import WaiterHeader from "../components/waiter/WaiterHeader";
import Footer from "../components/Footer";

function RootComponent() {
  return (
    <>
      {/* <Header /> */}
      <WaiterHeader />
      <Outlet />
      <Footer />
    </>
  );
}
