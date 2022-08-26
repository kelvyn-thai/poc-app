import {
  researchChart,
  getAllCharts,
  IChart,
  clearAllChart,
} from "database/tables/chart";
import isNumber from "lodash/isNumber";
import React from "react";
import { isJSONString } from "utils/isJSONString";
import { ChartOption } from "./DataResource.typings";
import {
  useDataResourceStore,
  getDataResourceState,
} from "./DataResource.zustand";

export const useDataResource = () => {
  const { resources, actionSetResource } = useDataResourceStore();
  const { option } = getDataResourceState();
  const handleGetCharts = async ({ type = option }: { type?: ChartOption }) => {
    try {
      const charts: IChart[] = await getAllCharts();
      const chartsFilterByOption = charts.filter((c) => c.type === type);
      actionSetResource(chartsFilterByOption);
    } catch (error) {
      clearAllChart();
    }
  };
  return {
    resources,
    actionSetResource,
    handleGetCharts,
  };
};

export const useSelectedChartByType = ({ type }: { type?: ChartOption }) => {
  const [data, setData] = React.useState<IChart | null>(null);
  const [isLoading, setIsFetchData] = React.useState(true);
  const state = getDataResourceState();
  const { actionChartData } = useDataResourceStore();
  const chartId = state[type || state.option];
  const handleGetRecord = React.useCallback(async () => {
    try {
      if (isNumber(chartId)) {
        const chart = await researchChart(chartId);
        if (chart && chart.id && isJSONString(chart.data)) {
          setData(chart);
        }
      }
    } catch (error) {
      actionChartData(undefined, type || state.option);
    }
    setIsFetchData(false);
  }, [chartId]);
  React.useEffect(() => {
    handleGetRecord();
  }, []);
  return {
    data,
    isLoading,
    chartId,
  };
};
