import React from "react";
import useWindowDimensions from "hooks/useWindowDimensions";
import { D3HierachyChart3D } from "components/charts/D3Hierachy";
import Panel from "components/core/Panel";
import isEqual from "lodash/isEqual";
import toUpper from "lodash/toUpper";
import BreakLine from "components/core/BreakLine";
import appStyle from "styles/App.module.scss";
import { Region } from "./Map.typings";
import { useGeojsonRegions, useRegionListData } from "./Map.hooks";
import "./Map.style.scss";

const HierachyMap = () => {
  const { height } = useWindowDimensions();
  const { geojsonRegions, isLoading } = useGeojsonRegions();
  const { regionList } = useRegionListData();
  const renderTooltip = ({ name }: { name: string }) => {
    let child = null;
    const upperName = toUpper(name);
    const regionHover = regionList.find((r: Region) =>
      isEqual(upperName, r.regionname)
    );
    if (regionHover) {
      const {
        energy_densisty_YTD_formatted,
        buildings_formatted,
        floor_area_formatted,
        active_alerts_formatted,
        open_tickets_formatted,
      } = regionHover as unknown as Region;
      child = (
        <>
          <div
            className="grid items-center gap-2 justify-between"
            style={{
              gridTemplateColumns: "repeat(2, minmax(100px, 50%))",
            }}
          >
            <div className="text-xs truncate text-gray-400">{`${buildings_formatted} Buildings`}</div>
            <div className="text-right text-xs truncate text-gray-400">
              {floor_area_formatted}
            </div>
          </div>
          <BreakLine className="my-2" />
          <div className="flex flex-row justify-around gap-3 p-3">
            {[
              {
                title: "Energy Density YTD",
                value: energy_densisty_YTD_formatted,
              },
              {
                title: "Active Alerts",
                value: active_alerts_formatted,
              },
              {
                title: "Open Tickets",
                value: open_tickets_formatted,
              },
            ].map(({ title, value }) => (
              <div key={title}>
                <div className="text-sm font-medium text-white text-center truncate mb-1 sub-font">
                  {value}
                </div>
                <div className="text-xs text-gray-500 truncate">{title}</div>
              </div>
            ))}
          </div>
        </>
      );
    } else {
      child = <div className={`${appStyle.absCenter}`}>Not data yet!</div>;
    }

    return (
      <Panel
        className="w-fit min-w-[380px] max-w-[400px] h-auto min-h-[150px]"
        title={upperName}
        panelTitleClassName="text-sm"
        classNameBlockTitle="mb-2"
      >
        {!!child && child}
      </Panel>
    );
  };

  return (
    <D3HierachyChart3D
      data={{
        hierachy: geojsonRegions,
        width: "auto",
        height: height - 240,
      }}
      renderTooltip={renderTooltip}
      isLoading={isLoading}
      classNameContainer="z-1"
    />
  );
};

export default React.memo(HierachyMap);
