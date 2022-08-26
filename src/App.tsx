import { Routes, Route, PathRouteProps, HashRouter } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import { getAppInfo, getUserInfo } from "sdk/esb-app-portal-sdk";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import FakeAppPortalFrame from "components/core/FakeAppPortalFrame";
import { useAccountStore } from "zustand-store/account";
import { getOrganizationState } from "zustand-store/organization";
import { useRoutesStore } from "zustand-store/routes";
import ErrorBoundary from "components/core/ErrorBoundary";
import { ENV } from "env";
import styles from "styles/App.module.scss";
import ModalAntd from "components/antd/Modal";
import Modal from "components/core/Modal";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: 5e6,
    },
  },
});

const BubbleChartPage = React.lazy(() => import("pages/bubble_chart"));
const SankeyChartPage = React.lazy(() => import("pages/sankey_chart"));
const HexbinChartPage = React.lazy(() => import("pages/hexbin_chart"));
const ControlCenterPage = React.lazy(() => import("pages/control_center"));
const DataResourcePage = React.lazy(() => import("pages/data_resource"));
const ZoomableMapTilesChartPage = React.lazy(
  () => import("pages/zoomable_map_tiles_chart")
);
const HierachyChartPage = React.lazy(() => import("pages/hierachy_chart"));
const MapPage = React.lazy(() => import("pages/hierachy_map"));
const PieChartPage = React.lazy(() => import("pages/pie_chart"));
const AntdConfigurationPage = React.lazy(
  () => import("pages/configuration_hierachy_data")
);
const PictorialBarPage = React.lazy(() => import("pages/pictorial_bar"));
const ModalTestPage = React.lazy(() => import("pages/modal-test"));

const allRoutes: PathRouteProps[] = [
  { path: "/bubble-chart", element: <BubbleChartPage /> },
  { path: "/sankey_chart", element: <SankeyChartPage /> },
  { path: "/hexbin_chart", element: <HexbinChartPage /> },
  { path: "/control_center", element: <ControlCenterPage /> },
  { path: "/data_resource", element: <DataResourcePage /> },
  { path: "/zoomable_map_tiles_chart", element: <ZoomableMapTilesChartPage /> },
  { path: "/hierachy_chart", element: <HierachyChartPage /> },
  { path: "/pie_chart", element: <PieChartPage /> },
  { path: "/hierachy_map", element: <MapPage /> },
  { path: "/configuration_hierachy_data", element: <AntdConfigurationPage /> },
  { path: "/pictorial_bar", element: <PictorialBarPage /> },
];

const AllRoutes = ({ routes }: { routes: PathRouteProps[] }) => (
  <Routes>
    {routes.map(({ path, element }) => (
      <Route
        key={path}
        path={`${ENV.PUBLIC_URL}${path}`}
        element={<React.Suspense fallback="...">{element}</React.Suspense>}
      />
    ))}
    <Route
      key="/modal-test"
      path="/modal-test"
      element={
        <React.Suspense fallback="...">
          <ModalTestPage />
        </React.Suspense>
      }
    />
  </Routes>
);

console.log("ENV", ENV);

const App = () => {
  const { routes, actionSetRoutes: setRoutes } = useRoutesStore();
  const { setMenuList, setPermissionList, login } = useAccountStore();
  const { fetchOrganizations } = getOrganizationState();
  const handleAuthentication = async () => {
    const user = await getUserInfo();
    login(user);
    fetchOrganizations();
    const app = await getAppInfo();
    setMenuList(app.menus);
    setPermissionList(app.permissions);
  };
  const handleLoadRoutes = React.useCallback(() => {
    setRoutes(allRoutes);
  }, []);
  React.useEffect(() => {
    handleAuthentication();
    handleLoadRoutes();
  }, []);
  return (
    <ErrorBoundary>
      <div className={styles.appContainer}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen />
          <HashRouter>
            <FakeAppPortalFrame>
              <AllRoutes routes={routes} />
            </FakeAppPortalFrame>
            <ModalAntd />
            <Modal />
          </HashRouter>
        </QueryClientProvider>
      </div>
    </ErrorBoundary>
  );
};
export default App;
