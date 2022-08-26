import React from "react";
import { PathRouteProps } from "react-router-dom";

const route: PathRouteProps = {
  path: "/bubble_chart",
  element: React.lazy(() => import("./index")) as unknown as React.ReactNode,
};

export default route;
