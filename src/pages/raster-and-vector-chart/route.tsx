import React from "react";
import { PathRouteProps } from "react-router-dom";

const route: PathRouteProps = {
  path: "/raster_and_vector_chart",
  element: React.lazy(() => import("./index")) as unknown as React.ReactNode,
};

export default route;
