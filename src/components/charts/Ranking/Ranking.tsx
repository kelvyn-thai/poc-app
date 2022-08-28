import _orderBy from "lodash/orderBy";
import React from "react";
import { randomColor } from "styles";
import { RankingChartItem } from "./Ranking.typings";
import "./Ranking.style.scss";

interface IProps {
  data: {
    rankingData: RankingChartItem[];
    topRanking?: number;
    orderBy?: "asc" | "desc";
    formatterValue?: (item: RankingChartItem) => string;
  };
}
const D3Ranking: React.FC<IProps> = ({
  data: { rankingData, topRanking = 5, orderBy = "desc", formatterValue },
}: IProps) => {
  const values = React.useMemo(
    () => rankingData.map((i) => i.value),
    [rankingData]
  );
  const max = React.useMemo(() => Math.max(...values), [values]);
  const sorted = React.useMemo(
    () => _orderBy(rankingData, (i) => i.value, orderBy),
    [rankingData, orderBy]
  );
  return (
    <div className="ranking-chart-container">
      {sorted.slice(0, topRanking).map((item) => (
        <div
          className="ranking-item grid items-center gap-2 mb-5"
          key={item.id}
        >
          <div className="font-medium text-xs text-gray-500 truncate capitalize">
            {item.label}
          </div>
          <div className="bg-transparent h-2 rounded relative w-[100%] min-w-[100px]">
            <div
              className="rounded  absolute top-0 left-0 h-[100%]"
              style={{
                width: `${(item.value / max) * 100}%`,
                background: `linear-gradient(90deg,  rgba(25, 153, 119, 0.8) 0%, ${randomColor()} 100%)`,
              }}
            />
          </div>
          <div className="font-normal text-xs text-white truncate text-right">
            {typeof formatterValue === "function"
              ? formatterValue(item)
              : item.value}
          </div>
        </div>
      ))}
    </div>
  );
};

export default React.memo(D3Ranking);
