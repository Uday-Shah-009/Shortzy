import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./routeTree.js";
import Homepage from "../pages/Homepage.jsx";

const homeRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: Homepage,
  });

  export default homeRoute;