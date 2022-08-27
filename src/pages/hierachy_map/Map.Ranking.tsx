import Panel from "components/core/Panel";
import D3Ranking from "components/charts/Ranking";
import React from "react";
import { Button } from "antd";
import "./Map.style.scss";
import { useActivedCountry, useEnergyRankingData } from "./Map.hooks";
import { formatterValueToLocaleString } from "./Map.utils";

const factories = [
  {
    key: "energy",
    tab: "Energy",
  },
  {
    key: "energy-density",
    tab: "Energy Density",
  },
];

const Ranking = () => {
  const [selected, setSelected] = React.useState(factories[0].key);
  const { countryName: country } = useActivedCountry();
  const { data, isLoading, unit, minFractionDigits } = useEnergyRankingData(
    selected === "energy-density",
    country
  );
  return (
    <Panel
      title="Ranking"
      sub={
        <div className="flex justify-end">
          {factories.map(({ key, tab }) => {
            const isSelected = key === selected;
            return (
              <Button
                key={key}
                onClick={() => setSelected(key)}
                type={isSelected ? "primary" : "default"}
              >
                {tab}
              </Button>
            );
          })}
        </div>
      }
      isLoading={isLoading}
      classNameBlockTitle="block-ranking-title mb-3"
      panelTitleClassName="text-base"
    >
      <D3Ranking
        data={{
          rankingData: data,
          formatterValue: ({ value }) =>
            formatterValueToLocaleString({
              value,
              divide: 1,
              unit,
              fractionDigits: minFractionDigits,
            }),
        }}
      />
    </Panel>
  );
};

export default React.memo(Ranking);
