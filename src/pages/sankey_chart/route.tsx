import React from "react";
import { PathRouteProps } from "react-router-dom";

const route: PathRouteProps = {
  path: "/sankey_chart",
  element: React.lazy(() => import("./index")) as unknown as React.ReactNode,
  children: <>Sankey Chart</>,
};

export default route;
