import { IChart } from "database/tables/chart";
import { createPersistStore } from "zustand-store";
import { ChartOption } from "./DataResource.typings";

type IState = {
  [chartKey in ChartOption]: any;
} & {
  option: ChartOption;
  toggleExample: boolean;
  chartName: string;
  resources: IChart[];
};

interface IActions {
  actionSetChartId: (chartId: string | number | undefined) => any;
  actionSetOption: (option: ChartOption) => void;
  actionToggleExample: () => void;
  actionSetChartName: (value: string) => any;
  actionSetResource: (resources: IChart[]) => any;
  actionChartData: (chartId: any, option: ChartOption) => any;
}

const initialState = {
  option: "sankey" as ChartOption,
  sankey: undefined,
  bubble: undefined,
  hexbin: undefined,
  tiles: undefined,
  hierachy: undefined,
  toggleExample: false,
  chartName: "",
  resources: [],
};

export const [useDataResourceStore, { getState: getDataResourceState }] =
  createPersistStore<IState & IActions>(
    (set, get) => ({
      ...initialState,
      actionSetOption: (option) => set({ option }),
      actionSetChartId: (chartId: string | number | undefined) => {
        const { option } = get();
        set({ [option]: chartId });
      },
      actionToggleExample: () => set({ toggleExample: !get().toggleExample }),
      actionSetChartName: (value: string) => set({ chartName: value }),
      actionSetResource: (resources) => set({ resources }),
      actionChartData: (chartId: any, option: ChartOption) =>
        set({ [option]: chartId }),
    }),
    "StoreDataResource"
  );
