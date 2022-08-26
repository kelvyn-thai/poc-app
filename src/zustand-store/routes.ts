import { PathRouteProps } from "react-router-dom";
import { createStore } from "zustand-store";

interface State {
  routes: PathRouteProps[];
}

interface Actions {
  actionSetRoutes: (routes: PathRouteProps[]) => void;
}

const initialState: State = {
  routes: [],
};

export const [useRoutesStore] = createStore<State & Actions>(
  (set) => ({
    ...initialState,
    actionSetRoutes: (routes) =>
      set({
        routes: [...routes],
      }),
  }),
  "useRoutesStore"
);
