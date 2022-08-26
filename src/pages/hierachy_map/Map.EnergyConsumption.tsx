import Panel from "components/core/Panel";
import D3PieChart from "components/charts/D3Pie";
import React from "react";
import { useEnergyConsumptionData } from "./Map.hooks";

const EnergyConsumption = () => {
  const {
    pieData,
    donutText,
    subDonutText,
    isLoading,
    formatterValue,
    renderTooltipValue,
  } = useEnergyConsumptionData();
  return (
    <Panel
      title="Energy Consumption"
      isLoading={isLoading}
      classNameBlockTitle="mb-3"
      panelTitleClassName="text-base"
    >
      <D3PieChart
        data={{
          size: 125,
          pieData,
          formatterValue,
          quantitiesItemOnChart: 5,
          donutText,
          subDonutText,
          renderTooltipValue,
        }}
      />
    </Panel>
  );
};

export default React.memo(EnergyConsumption);
