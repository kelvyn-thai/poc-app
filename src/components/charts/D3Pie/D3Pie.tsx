import React from "react";
import D3Chart, { IBaseD3ChartProps } from "components/charts/D3Chart";
import { useRenderTooltip } from "components/charts/D3Tooltip";
import * as d3 from "d3";
import orderBy from "lodash/orderBy";
import ReactDOM from "react-dom/server";
import { calculatePercent } from "components/charts/Utils";
import sum from "lodash/sum";
import classNames from "classnames";
import { createPieChart } from "./D3Hexbin.utils";
import { PieChartItem, PieChartItemRender } from "./D3Hexbin.typings";
import style from "./D3Hexbin.style.module.scss";

interface IProps extends IBaseD3ChartProps {
  data: {
    pieData: PieChartItem[];
    size: number;
    donutText?: string;
    subDonutText?: string;
    quantitiesItemOnChart?: number;
    pieChartContainerClassName?: string | any;
    formatterValue?: (item: PieChartItemRender) => string;
    renderTooltipValue?: (
      item: PieChartItemRender
    ) => React.ReactNode | React.ReactElement | any;
  };
}

const D3Pie: React.FC<IProps> = (props) => {
  const { data, ...rest }: IProps = props;
  const {
    pieData: dataResource = [],
    size,
    donutText,
    subDonutText,
    quantitiesItemOnChart = 5,
    pieChartContainerClassName = "",
    formatterValue,
    renderTooltipValue,
  } = data;
  const ref = React.useRef(null);
  const refContainer = React.useRef(null);
  const refSVG = React.useRef(null);
  const [renderTooltip] = useRenderTooltip();
  const pieData: PieChartItemRender[] = React.useMemo(() => {
    const total = sum(dataResource.map((i) => i.value));
    const inputPieData: PieChartItemRender[] = dataResource.map((i) => ({
      ...i,
      percent: calculatePercent(i.value, total),
    }));
    const pieDataSorted = orderBy(inputPieData, (i) => i.value, "desc");
    if (pieDataSorted.length > quantitiesItemOnChart) {
      const persist = pieDataSorted.slice(0, quantitiesItemOnChart - 1);
      const remain = pieDataSorted.slice(
        quantitiesItemOnChart,
        pieDataSorted.length - 1
      );
      return [
        ...persist,
        { id: "other", label: "Other", value: sum(remain.map((i) => i.value)) },
      ].map((i) => ({
        ...i,
        percent: calculatePercent(i.value, total),
      }));
    }
    return pieDataSorted;
  }, [dataResource]);
  const scaleColor = React.useMemo(
    () => d3.scaleOrdinal(pieData, d3.schemeCategory10),
    [pieData]
  );
  const renderTooltipPieChart = React.useCallback(
    (
      event: any,
      d:
        | d3.PieArcDatum<
            | number
            | {
                valueOf(): number;
              }
          >
        | any
      // selector: SVGPathElement | any
    ) => {
      if (!ref.current) {
        return;
      }
      const item: PieChartItemRender = pieData[d.index];
      const { value, label } = item;
      const tooltipVal =
        typeof renderTooltipValue === "function"
          ? ReactDOM.renderToString(renderTooltipValue(item))
          : `${label} has value = ${value}`;
      const tooltip = renderTooltip({ value: tooltipVal, event });
      return d3
        .select(ref.current)
        .selectChild(".tooltip-container")
        .html(tooltip);
    },
    [ref, pieData]
  );
  const renderPieChartInfo = React.useCallback(
    () =>
      pieData.map((item) => {
        const { label, value, id } = item;
        return (
          <div
            key={id}
            className={`grid gap-2 mb-2 ${style.pieChartInfo} last:mb-0`}
          >
            <div
              className="grid gap-1 items-center"
              style={{ gridTemplateColumns: "min-content 1fr" }}
            >
              <div
                className="rounded-full w-2 h-2"
                style={{ backgroundColor: scaleColor(item) }}
              />
              <div className="font-medium text-sm text-gray-500 truncate">
                {label}
              </div>
            </div>
            <div className="font-medium text-base text-white truncate sub-font">
              {typeof formatterValue === "function"
                ? formatterValue(item)
                : value}
            </div>
          </div>
        );
      }),
    [pieData, formatterValue]
  );
  React.useLayoutEffect(() => {
    if (ref.current && refSVG.current && pieData) {
      createPieChart({
        svg: refSVG.current,
        container: ref.current,
        renderTooltip: renderTooltipPieChart,
        data: pieData,
        size,
        scaleColor,
        donutText,
        subDonutText,
      });
    }
  }, [ref, refSVG, refContainer, data, scaleColor, size]);
  return (
    <div
      className={`pie-chart-container ${classNames(
        pieChartContainerClassName
      )}`}
    >
      <div
        className="pie-chart grid gap-5 items-center"
        style={{
          gridTemplateColumns: `${size}px 1fr`,
        }}
      >
        <D3Chart
          {...{
            ...rest,
            ref: {
              ref,
              refSVG,
            } as any,
          }}
        >
          <div className="tooltip-container" />
        </D3Chart>
        <div className="pie-chart-info">{renderPieChartInfo()}</div>
      </div>
    </div>
  );
};

export default React.memo(D3Pie);
