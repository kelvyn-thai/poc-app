import React from "react";
import D3Chart, { IBaseD3ChartProps } from "components/charts/D3Chart";
import useWindowDimensions from "hooks/useWindowDimensions";
import { createSankeyChart } from "./D3Sankey.utils";
import { IData } from "./D3Sankey.typings";

interface IProps extends IBaseD3ChartProps {
  data: IData;
}

const D3Sankey = ({ data, ...rest }: IProps) => {
  const ref = React.useRef(null);
  const refSVG = React.useRef(null);
  const { width, height } = useWindowDimensions();
  React.useLayoutEffect(() => {
    if (data?.links?.length > 0 && ref.current && refSVG.current) {
      createSankeyChart({
        data,
        options: {
          nodeWidth: 24,
          nodeGroup: (d) => d.id.split(/\W/)[0],
          nodeId: (d) => d.id,
          standardizeNode: (d) => ({ id: d.name }),
          standardizeLink: (d) => ({
            source: d.source,
            target: d.target,
            value: d.value,
          }),
          width: 0.5 * width,
          height: 0.75 * height,
        },
        svg: refSVG.current,
        container: ref.current,
      });
    }
  }, [ref, refSVG, data]);

  return (
    <D3Chart {...{ ...rest, ref: { ref, refSVG } as any }}>
      <div className="tooltip fixed -[1000] invisible opacity-0 flex justify-center items-center p-[10px] h-[40px] bg-white rounded-[4px] shadow-xl text-black" />
    </D3Chart>
  );
};

export default React.memo(D3Sankey);
