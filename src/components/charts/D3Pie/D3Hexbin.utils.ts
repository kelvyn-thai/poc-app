import * as d3 from "d3";
import { Domain } from "domain";
import { wrap } from "../Utils";
import { PieChartItem } from "./D3Hexbin.typings";

export const createPieChart = ({
  size,
  svg,
  data,
  donut = 80,
  container,
  renderTooltip,
  scaleColor,
  donutText,
  subDonutText,
}: {
  size: number;
  svg: SVGElement;
  data: PieChartItem[];
  donut?: number;
  container: HTMLDivElement;
  renderTooltip?: (
    event: any,
    d:
      | d3.PieArcDatum<
          | number
          | {
              valueOf(): number;
            }
        >
      | any,
    selector: SVGPathElement | any
  ) => any;
  scaleColor: d3.ScaleOrdinal<Domain, Range, any> | any;
  donutText?: string;
  subDonutText?: string;
}) => {
  const $container = d3.select(container);
  const radius = size / 2;
  const $svg = d3.select(svg).attr("width", size).attr("height", size);
  $svg.html("");
  const $g = $svg
    .append("g")
    .attr("transform", `translate(${size / 2},${size / 2})`);
  //   const scaleColor2 = d3.scaleOrdinal(data, d3.schemeTableau10);
  // Generate the pie
  const pie = d3.pie();
  const innerRadius = (donut / 100) * radius;
  const outerRadius = radius;
  // Generate the arcs
  const arc: any = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);
  // Generate groups
  const values = data.map((i) => (i.value < 0.1 ? 0.1 : i.value));
  const pieData = pie(values);
  const $arcs = $g
    .selectAll("arc")
    .data(pieData)
    .enter()
    .append("g")
    .attr("class", "arc");
  // Draw arc paths
  $arcs
    .append("path")
    .attr("d", arc)
    .attr("cursor", "pointer")
    .attr("fill", (d, index) => scaleColor(data[index]))
    .on("mouseover", function onMouseOver(event, d) {
      if (typeof renderTooltip === "function") {
        renderTooltip(event, d, this);
      }
    })
    .on("mouseleave", () => {
      if (typeof renderTooltip === "function") {
        const $tooltip = $container.selectChild(".tooltip-container");
        $tooltip.html("");
      }
    });
  // center value
  if (donutText) {
    $g.append("text")
      .attr("class", "donut-text")
      .attr("text-anchor", "middle")
      .attr("y", "0")
      .attr("fill", "#FFF")
      .style("font-size", "16px")
      .style("font-family", "BPDS_Iconfont")
      .style("font-style", "normal")
      .style("font-weight", "400")
      .text(donutText)
      .each(function invokeWrap() {
        const maxWidth = innerRadius * 2;
        return wrap({ selector: this, width: maxWidth, padding: 0 });
      });
  }
  if (subDonutText) {
    $g.append("text")
      .attr("class", "donut-text")
      .attr("text-anchor", "middle")
      .attr("y", "20")
      .attr("fill", "#6b7280")
      .style("font-size", "12px")
      .text(subDonutText)
      .each(function invokeWrap() {
        const maxWidth = innerRadius * 2;
        return wrap({ selector: this, width: maxWidth, padding: 0 });
      });
  }
};
