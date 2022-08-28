import RankingChart, { RankingChartItem } from "components/charts/Ranking";
import React from "react";
import "pages/general_info/components/Chart/Chart.style.scss";

const data: RankingChartItem[] = [
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

const GeneralInfoRankingChart = () => (
  <div className="chart-item">
    <div className="text-lg mb-5 font-medium">Avg Price/REC</div>
    <RankingChart
      data={{
        rankingData: data,
        topRanking: 5,
        orderBy: "desc",
        formatterValue: (i) => `${i.value} Wh`,
      }}
    />
  </div>
);

export default React.memo(GeneralInfoRankingChart);
