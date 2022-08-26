import React from "react";
import D3Chart, { IBaseD3ChartProps } from "components/charts/D3Chart";
import Button from "components/core/Button";
import { createHierachyChart2D } from "./D3Hierachy.utils";
import { HierachyData } from "./D3Hierachy.typings";

interface IProps extends IBaseD3ChartProps {
  data: {
    hierachy: HierachyData | any;
    width: number;
    height: number;
  };
}

const D3Hierachy = ({ data, ...rest }: IProps) => {
  const ref = React.useRef(null);
  const refSVG = React.useRef(null);
  React.useLayoutEffect(() => {
    if (ref.current && refSVG.current && data) {
      createHierachyChart2D({
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
    >
      <Button title="Back" />
    </D3Chart>
  );
};

export default React.memo(D3Hierachy);
