import React from "react";
import { PathRouteProps } from "react-router-dom";

const route: PathRouteProps = {
  path: "/control_center",
  element: React.lazy(() => import("./index")) as unknown as React.ReactNode,
  children: <>Control Center</>,
};

export default route;
