import React from "react";
import D3Chart, { IBaseD3ChartProps } from "components/charts/D3Chart";
import classNames from "classnames";
import ReactDOM from "react-dom/server";
import * as d3 from "d3";
import { createHierachyChart3D } from "./D3Hierachy.utils";
import { HierachyData } from "./D3Hierachy.typings";
import styles from "./D3Hierachy.styles.module.scss";

interface IProps extends IBaseD3ChartProps {
  data: {
    hierachy: HierachyData | any;
    width: number | any;
    height: number | any;
  };
  renderTooltip?: (data: {
    feature: any;
    name: string;
  }) => React.ReactNode | React.ReactElement | any;
}

const D3Hierachy: React.FC<IProps> = ({
  data,
  renderTooltip,
  isLoading,
  ...rest
}: IProps) => {
  const ref = React.useRef(null);
  const callbackRenderTooltip = (dt: { feature: any; name: string }) => {
    let $tooltip;
    const { feature } = dt;
    if (typeof renderTooltip === "function") {
      $tooltip = renderTooltip(dt);
    } else {
      $tooltip = (
        <div>
          {Object.entries(feature?.properties).map(
            ([key, value]: [string, any]) => (
              <div
                className={`grid gap-3 ${classNames(styles.tooltip)}`}
                key={key}
              >
                <div className="font-medium text-base text-black">{key}</div>
                {value && <div>{value}</div>}
              </div>
            )
          )}
        </div>
      );
    }
    return ReactDOM.renderToString($tooltip);
  };
  React.useEffect(() => {
    if (isLoading || !ref.current) {
      return;
    }
    const $echartMapEle = createHierachyChart3D({
      container: ref.current,
      ...data,
      renderTooltip: callbackRenderTooltip,
    });
    return () => {
      if ($echartMapEle) {
        d3.select($echartMapEle).remove();
      }
    };
  }, [ref, data, renderTooltip]);
  return (
    <D3Chart
      {...{
        ...rest,
        isLoading,
        ref: {
          ref,
        } as any,
      }}
    >
      {!isLoading && !data.hierachy && <div>Geojson is not valid</div>}
    </D3Chart>
  );
};

D3Hierachy.defaultProps = {
  renderTooltip: undefined,
};

export default React.memo(D3Hierachy);
