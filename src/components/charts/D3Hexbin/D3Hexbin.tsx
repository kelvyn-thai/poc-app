import React from "react";
import D3Chart, { IBaseD3ChartProps } from "components/charts/D3Chart";
import { createHexbinChart } from "./D3Hexbin.utils";
import { HexbinPoints } from "./D3Hexbin.typings";

interface IProps extends IBaseD3ChartProps {
  data: {
    points: HexbinPoints;
    geojson: d3.GeoPermissibleObjects | any;
    width?: number;
    height?: number;
  };
}

const D3Hexbin = ({ data, ...rest }: IProps) => {
  const ref = React.useRef(null);
  const refSVG = React.useRef(null);
  React.useLayoutEffect(() => {
    if (ref.current && refSVG.current && data) {
      createHexbinChart({
        svg: refSVG.current,
        container: ref.current,
        ...data,
      });
    }
  }, [ref, refSVG, data]);
  return (
    <D3Chart
      {...{
        ...rest,
        ref: {
          ref,
          refSVG,
        } as any,
      }}
    />
  );
};

export default D3Hexbin;
