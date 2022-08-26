import React from "react";
import Loading from "components/core/Loading";
import D3Sankey from "components/charts/D3Sankey";
import D3Bubble from "components/charts/D3Bubble";
import isNumber from "lodash/isNumber";
import D3Hexbin from "components/charts/D3Hexbin";
import { useSelectedChartByType } from "./DataResource.hook";
import { ChartOption, ChartDataItem } from "./DataResource.typings";

const DataResourceChart = ({ type }: { type: ChartOption }) => {
  const { data, isLoading } = useSelectedChartByType({ type });
  if (isLoading) {
    return <Loading />;
  }
  if (!data) {
    return null;
  }
  const { data: jsonDataString, name } = data;
  const jsonParse: ChartDataItem[] = JSON.parse(jsonDataString);
  let ChartComponent: any;
  let chartData: any;
  switch (type) {
    case "sankey": {
      ChartComponent = D3Sankey;
      chartData = JSON.parse(
        jsonParse.find((i) => i.key === type)?.value || ""
      );
      break;
    }
    case "bubble": {
      ChartComponent = D3Bubble;
      chartData = JSON.parse(
        jsonParse.find((i) => i.key === type)?.value || ""
      );
      break;
    }
    case "hexbin": {
      const points =
        JSON.parse(jsonParse.find((i) => i.key === type)?.value) || [];
      const geojson =
        JSON.parse(jsonParse.find((i) => i.key === "geometry")?.value) || {};
      chartData = {
        points: points
          .map((point: any) => [
            Number(point.longitude),
            Number(point.latitude),
          ])
          .filter((point: [number, number]) => {
            const [long, lat] = point;
            return isNumber(long) && isNumber(lat);
          }),
        geojson,
      };
      ChartComponent = D3Hexbin;
      break;
    }
    default:
      break;
  }
  if (!chartData) {
    return null;
  }
  return <ChartComponent data={chartData} chartName={name} />;
};

export default React.memo(DataResourceChart);
