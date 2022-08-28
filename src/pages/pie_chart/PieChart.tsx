import D3PieChart, { PieChartItem } from "components/charts/D3Pie";
import React from "react";

const PieChartPage = () => (
  <div className="w-fit m-auto">
    <D3PieChart
      data={{
        size: 200,
        pieData: [...Array(10)].map((val, index) => ({
          id: index,
          label: `Label ${index}`,
          value: Math.floor(Math.random() * (1e4 - 1 + 1) + 1),
        })) as unknown[] as PieChartItem[],
        donutText: "Donut text",
        subDonutText: "Sub donut text",
      }}
    />
  </div>
);

export default React.memo(PieChartPage);
