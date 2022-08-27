import { Routes, Route, PathRouteProps, HashRouter } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import { getAppInfo, getUserInfo } from "sdk/esb-app-portal-sdk";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppLayout from "components/core/AppLayout";
import { useAccountStore } from "zustand-store/account";
import { getOrganizationState } from "zustand-store/organization";
import { useRoutesStore } from "zustand-store/routes";
import ErrorBoundary from "components/core/ErrorBoundary";
import styles from "styles/App.module.scss";
import ModalAntd from "components/antd/Modal";
import Modal from "components/core/Modal";
import HomePage from "pages/home";

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
const MapPage = React.lazy(() => import("pages/hierachy_map"));
const PieChartPage = React.lazy(() => import("pages/pie_chart"));
const AntdConfigurationPage = React.lazy(
  () => import("pages/configuration_hierachy_data")
);
const PictorialBarPage = React.lazy(() => import("pages/pictorial_bar"));

const allRoutes: PathRouteProps[] = [
  { path: "/", element: <HomePage /> },
  { path: "/bubble-chart", element: <BubbleChartPage /> },
  { path: "/sankey-chart", element: <SankeyChartPage /> },
  { path: "/hexbin-chart", element: <HexbinChartPage /> },
  { path: "/control-center", element: <ControlCenterPage /> },
  { path: "/data-resource", element: <DataResourcePage /> },
  { path: "/pie-chart", element: <PieChartPage /> },
  { path: "/hierachy-map", element: <MapPage /> },
  { path: "/configuration", element: <AntdConfigurationPage /> },
  { path: "/pictorial-bar", element: <PictorialBarPage /> },
];

const AllRoutes = ({ routes }: { routes: PathRouteProps[] }) => (
  <Routes>
    {routes.map(({ path, element }) => (
      <Route
        key={path}
        path={path}
        element={<React.Suspense fallback="...">{element}</React.Suspense>}
      />
    ))}
  </Routes>
);

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
            <AppLayout>
              <AllRoutes routes={routes} />
            </AppLayout>
            <ModalAntd />
            <Modal />
          </HashRouter>
        </QueryClientProvider>
      </div>
    </ErrorBoundary>
  );
};
export default App;
