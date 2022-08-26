import React from "react";
import * as d3 from "d3";
import D3Chart, { IBaseD3ChartProps } from "components/charts/D3Chart";
import { useResizeWindow } from "hooks/useResizeWindow";
import { createRasterAndVectorChart } from "./D3RasterAndVector.utils";

interface IProps extends IBaseD3ChartProps {
  topology: TopoJSON.Topology;
}

export const getBoundingClientRect = (element: any) => {
  const $element = d3.select(element);
  const rect = $element.node()?.getBoundingClientRect() as DOMRect;
  return rect;
};

const D3RasterAndVector = ({ topology, ...rest }: IProps) => {
  const ref: React.MutableRefObject<HTMLDivElement | null> = React.useRef(null);
  const refSVG = React.useRef(null);

  const callback = React.useCallback(() => {
    if (ref.current && refSVG.current) {
      // const { width } = getBoundingClientRect(ref.current);
      createRasterAndVectorChart({
        svg: refSVG.current,
        container: ref.current,
        topology,
        // width,
      });
    }
  }, [ref, refSVG]);
  useResizeWindow({ callback });
  React.useLayoutEffect(() => {
    if (ref.current && refSVG.current) {
      // const { width } = getBoundingClientRect(ref.current);
      createRasterAndVectorChart({
        svg: refSVG.current,
        container: ref.current,
        topology,
        // width,
      });
    }
  }, [ref, refSVG]);
  return <D3Chart {...rest} ref={{ ref, refSVG } as any} />;
};

export default React.memo(D3RasterAndVector);
