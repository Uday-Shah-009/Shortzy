import {createRootRoute} from "@tanstack/react-router";
import App from "../App";
import homeRoute from "./home.route";
import authRoute from "./auth.route";
import dashBRoute from "./DashB.route";

export const rootRoute = createRootRoute({
    component: App,
});

export const routeTree =  rootRoute.addChildren([
    homeRoute,
    authRoute,
    dashBRoute,
 ]);
  


