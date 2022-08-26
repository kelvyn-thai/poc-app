import classNames from "classnames";
import Loading from "components/core/Loading";
import React from "react";

export interface IBaseD3ChartProps {
  chartName?: string;
  isLoading?: boolean;
  classNameContainer?: string | any;
  classNameSVGChart?: string | any;
  children?: React.ReactNode | React.ReactElement | any;
}

export interface IRefD3ChartProps {
  ref: React.MutableRefObject<HTMLDivElement | any> | any;
  refSVG: React.MutableRefObject<SVGSVGElement | any> | any;
}

const D3Chart = React.forwardRef(
  (props: IBaseD3ChartProps, { ref, refSVG }: IRefD3ChartProps | any) => {
    const {
      chartName,
      isLoading,
      classNameContainer,
      classNameSVGChart,
      children,
    } = props;
    return (
      <div ref={ref} className={`relative ${classNames(classNameContainer)}`}>
        {chartName && (
          <div className="text-center mb-5 text-xl font-medium">
            {chartName}
          </div>
        )}
        {isLoading && <Loading />}
        {refSVG && (
          <svg ref={refSVG} className={`m-auto ${classNameSVGChart}`} />
        )}
        {children && children}
      </div>
    );
  }
);

D3Chart.defaultProps = {
  chartName: "",
  isLoading: false,
  classNameContainer: "",
  classNameSVGChart: "",
  children: null,
};

export default D3Chart;
