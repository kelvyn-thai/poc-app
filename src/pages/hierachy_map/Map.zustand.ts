import { createStore } from "zustand-store";
import { GeojsonPropertyList } from "./Map.typings";

type IState = {
  country: number;
  geojsonPropertyList: GeojsonPropertyList[];
};

interface IActions {
  actionSetSelectedCountry: (country: number) => any;
  actionSetGeojsonPropertyList: (data: GeojsonPropertyList) => any;
}

const initialState = {
  country: -1,
  geojsonPropertyList: [],
};

export const [useMapStore, { getState }] = createStore<IState & IActions>(
  (set, get) => ({
    ...initialState,
    actionSetSelectedCountry: (country) => set({ country }),
    actionSetGeojsonPropertyList: (data) =>
      set({ geojsonPropertyList: [...get().geojsonPropertyList, data] }),
  }),
  "MapStore"
);
