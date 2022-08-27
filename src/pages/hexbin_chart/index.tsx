import React from "react";
import D3Hexbin from "components/charts/D3Hexbin";
import useWindowDimensions from "hooks/useWindowDimensions";
import geojson from "./vngeometry.json";

const HexbinChart = () => {
  const { width, height } = useWindowDimensions();
  return (
    <D3Hexbin
      data={{
        points: [
          [106.53657616500936, 10.971086861233012],
          [106.68383, 20.865139],
          [105.973907, 9.602521],
          [106.713028, 10.924067],
          [105.681335, 18.679585],
        ],
        geojson,
        width: 0.5 * width,
        height: height - 64,
      }}
    />
  );
};

export default React.memo(HexbinChart);
