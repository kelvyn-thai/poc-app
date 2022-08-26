import React from "react";
import D3Chart, { IBaseD3ChartProps } from "components/charts/D3Chart";
import { createBubbleChart } from "./utils";
import { TypeBubbleItem } from "./typings";

interface IProps extends IBaseD3ChartProps {
  data: any[];
}

const D3BubbleChart = ({ data, ...rest }: IProps) => {
  const ref = React.useRef(null);
  const refSVG = React.useRef(null);
  React.useLayoutEffect(() => {
    if (ref.current && refSVG.current && data?.length > 0) {
      createBubbleChart({
        data: data.map((d: TypeBubbleItem) => {
          const { id, value } = d;
          const groupInfo = id.split(".") as any;
          const foo = [...groupInfo.pop().split(/(?=[A-Z][a-z])/g)];
          const label = [...foo, value.toLocaleString("en")].join("\n");
          const group = groupInfo[1];
          const link = `https://google.com/${label}`;
          const title = `${label}\n${value.toLocaleString("en")}`;
          return {
            ...d,
            label,
            group,
            link,
            title,
          };
        }),
        svg: refSVG.current,
        container: ref.current,
      });
    }
  }, [data, ref, refSVG]);
  return <D3Chart {...rest} ref={{ ref, refSVG } as any} />;
};

export default React.memo(D3BubbleChart);
