import D3Sankey, { IData } from "components/charts/D3Sankey";
import React from "react";
import { useQueries, UseQueryResult } from "@tanstack/react-query";
import styles from "./styles.module.scss";

const queriesAPI = [
  {
    queryKey: ["sankey-chart-id", "sankey-carbon-emission"],
    queryFn: () =>
      fetch(
        "https://envision-wgtc.s3.ap-southeast-1.amazonaws.com/kasa-carbon.json"
      ).then((res) => res.json()),
    chartName: "Carbon Emission",
    drawBySankey: false,
  },
  {
    queryKey: ["sankey-chart-id", "sankey-ne"],
    queryFn: () =>
      fetch(
        "https://envision-wgtc.s3.ap-southeast-1.amazonaws.com/kasa-ne.json"
      ).then((res) => res.json()),
    chartName: "Carbon Netutralization",
    drawBySankey: true,
  },
];

const SankeyChart = () => {
  const queries = useQueries({ queries: queriesAPI });
  return (
    <div className={`grid ${styles.sankeyContainer}`}>
      {queries.map(
        (
          {
            data = { nodes: [], links: [] },
            isFetching,
          }: UseQueryResult<IData, any>,
          index
        ) => (
          <D3Sankey
            data={data}
            chartName={queriesAPI[index].chartName}
            key={queriesAPI[index].queryKey[1]}
            isLoading={isFetching}
          />
        )
      )}
    </div>
  );
};

export default React.memo(SankeyChart);
