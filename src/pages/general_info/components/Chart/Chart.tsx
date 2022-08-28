import React from "react";
import PieChart from "../PieChart";
import RankingChart from "../RankingChart";
import "./Chart.style.scss";

const Charts = () => (
  <div className="chart">
    <RankingChart />
    <PieChart />
  </div>
);

export default React.memo(Charts);
