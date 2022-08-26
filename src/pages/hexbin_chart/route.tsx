import React from "react";
import { PathRouteProps } from "react-router-dom";

const route: PathRouteProps = {
  path: "/hexbin_chart",
  element: React.lazy(() => import("./index")) as unknown as React.ReactNode,
  children: <>Hexbin Chart</>,
};

export default route;
