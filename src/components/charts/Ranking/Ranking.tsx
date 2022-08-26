import _orderBy from "lodash/orderBy";
import classNames from "classnames";
import React from "react";
import sum from "lodash/sum";
import { RankingChartItem } from "./Ranking.typings";
import style from "./Ranking.style.module.scss";

interface IProps {
  data: {
    rankingData: RankingChartItem[];
    topRanking?: number;
    orderBy?: "asc" | "desc";
    formatterValue?: (item: RankingChartItem) => string;
  };
  rankingChartContainerClassName?: string | any;
}
const D3Ranking: React.FC<IProps> = ({
  data: { rankingData, topRanking = 5, orderBy = "desc", formatterValue },
  rankingChartContainerClassName,
}: IProps) => {
  const values = React.useMemo(
    () => rankingData.map((i) => i.value),
    [rankingData]
  );
  const total = React.useMemo(() => sum(values), [values]);
  const sorted = React.useMemo(
    () => _orderBy(rankingData, (i) => i.value, orderBy),
    [rankingData, orderBy]
  );
  return (
    <div
      className={`ranking-chart-container ${classNames(
        rankingChartContainerClassName
      )}`}
    >
      {sorted.slice(0, topRanking).map((item) => (
        <div
          className={`ranking-item grid items-center gap-5 mb-2 ${classNames(
            style["ranking-item"]
          )}`}
          key={item.id}
        >
          <div className="font-medium text-xs text-gray-500 truncate capitalize">
            {item.label}
          </div>
          <div className="bg-transparent h-2 rounded relative w-[100%] min-w-[100px]">
            <div
              className="rounded bg-blue-500 absolute top-0 left-0 h-[100%]"
              style={{
                width: `${(item.value / total) * 100}%`,
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

D3Ranking.defaultProps = {
  rankingChartContainerClassName: "",
};

export default React.memo(D3Ranking);
