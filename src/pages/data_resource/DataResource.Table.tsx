import { IChart } from "database/tables/chart";
import React from "react";
import { useDataResource, useSelectedChartByType } from "./DataResource.hook";
import { useDataResourceStore } from "./DataResource.zustand";

const Table = () => {
  const { resources, actionSetResource, handleGetCharts } = useDataResource();
  const { actionSetChartId } = useDataResourceStore();
  const { chartId } = useSelectedChartByType({});
  React.useEffect(() => {
    handleGetCharts({});
    return () => {
      actionSetResource([]);
    };
  }, []);
  return (
    <div>
      {resources.length > 0 && (
        <div>
          <div className="grid grid-cols-3 text-white font-medium text-lg bg-gray-500 h-10 items-center">
            <div>ID</div>
            <div>Name</div>
            <div>Status</div>
          </div>
          {resources.map((r: IChart) => (
            <div
              key={r.id}
              className="grid grid-cols-3 cursor-pointer font-medium h-10 items-center text-base hover:bg-gray-50 hover:font-medium hover:text-black hover:border-t-[0.5px] hover:border-t-transparent border-solid border-t-[0.5px] border-t-gray-300"
              onClick={() => actionSetChartId(r.id)}
            >
              <div>{r.id}</div>
              <div>{r.name}</div>
              <div>{chartId === r.id && "Actived"}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default React.memo(Table);
