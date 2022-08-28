import React from "react";
import Tabs, { TabItem } from "components/core/Tabs";
import D3Pie, { PieChartItem } from "components/charts/D3Pie";
import "pages/general_info/components/Chart/Chart.style.scss";
import "pages/general_info/GeneralInfo.style.scss";
import { TAB_GEN_SOURCE, TAB_REC_STANDARD } from "./PieChart.constant";
import "./PieChart.style.scss";

const data: PieChartItem[] = [
  {
    id: "0",
    value: 10,
    label: "Wind",
  },
  {
    id: "1",
    value: 20,
    label: "Solar",
  },
  {
    id: "2",
    value: 30,
    label: "Biogas",
  },
  {
    id: "3",
    value: 40,
    label: "Hydro",
  },
  {
    id: "4",
    value: 50,
    label: "Geothermal",
  },
];

const PieChartTabs = React.memo(() => {
  const [selectedTab, setSelected] = React.useState(TAB_GEN_SOURCE.key);
  const tabPanes = React.useMemo(
    (): TabItem[] =>
      [TAB_GEN_SOURCE, TAB_REC_STANDARD].map(({ key, value }) => ({
        key,
        value,
      })),
    []
  );
  console.log("selectedTab", selectedTab);
  return (
    <Tabs
      className="mb-5"
      tabItems={tabPanes}
      onClickTabItem={(key) => setSelected(key)}
      hasDivideLine={false}
    />
  );
});

const PieChartComponent = () => (
  <div className="chart-item">
    <div className="chart-content">
      <PieChartTabs />
      <D3Pie
        data={{
          size: 200,
          pieData: data,
          donutText: "Donut text",
          subDonutText: "Total REC quantity",
        }}
      />
    </div>
  </div>
);

export default React.memo(PieChartComponent);
