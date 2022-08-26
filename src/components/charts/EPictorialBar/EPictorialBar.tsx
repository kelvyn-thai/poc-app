import React from "react";
import D3Chart, { IBaseD3ChartProps } from "components/charts/D3Chart";
import { createEPictorialBar } from "./EPictorialBar.utils";
import { EPictorialBarItem } from "./EPictorialBar.typings";

interface IProps extends IBaseD3ChartProps {
  data: {
    data?: EPictorialBarItem[];
    width: number | any;
    height: number | any;
  };
  renderTooltip?: (data: {
    feature: any;
    name: string;
  }) => React.ReactNode | React.ReactElement | any;
}

const EPictorialBar: React.FC<IProps> = ({
  data: { data, width, height },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  renderTooltip,
}) => {
  const ref = React.useRef();
  React.useEffect(() => {
    if (ref.current) {
      createEPictorialBar({
        container: ref.current,
        width,
        height,
        data,
      });
    }
  }, [ref]);
  return <D3Chart ref={{ ref } as any} />;
};

EPictorialBar.defaultProps = {
  renderTooltip: undefined,
};

export default React.memo(EPictorialBar);
