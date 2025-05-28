import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./routeTree.js";
import DashBoard from "../pages/DashBoard.jsx";

// Simplified route without auth check for now
const dashBRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: DashBoard,
});

  export default dashBRoute;
