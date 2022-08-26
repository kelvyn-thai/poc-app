import * as d3 from "d3";
import uniq from "lodash/uniq";
import { TypeBubbleChart } from "./typings";

/**
 * createBubbleChart - This function using for generator bubble chart
 * @params data TypeBubbleItem[]. Some property need to mapping: link, title, label, value,...
 * @returns svg chart
 */
export const createBubbleChart = (params: TypeBubbleChart) => {
  const {
    data, // TypeBubbleItem[] - data for chart
    svg, // SVGElement - using for draw chart
    width = 1152, // Width of chart
    height = 1152, // Height of chart
    groupColors, // an array of colors (for groups)
  } = params;
  const colors = groupColors || d3.schemeTableau10;
  // Compute the values.
  // values
  const V = data.map((d) => d.value);
  // index values
  const I = d3.range(V.length).filter((i) => V[i] > 0);
  const DATA = (d: any) => d.data;
  // Unique the groups.
  // group values
  const G = data.map((d) => d.group);
  const groups = uniq(I.map((i) => G[i]));
  // Construct scales.
  const color = G && d3.scaleOrdinal(groups, colors);
  // Compute labels and titles.
  // Compute layout: create a 1-deep hierarchy, and pack it.
  const packLayout = d3.pack().size([width, height]).padding(10); // Enclosure diagrams use containment (nesting) to represent the hierarchy. https://d3-wiki.readthedocs.io/zh_CN/master/Pack-Layout
  // Generator a hierarchical layout. https://github.com/d3/d3-hierarchy
  const hierarchyNode = d3
    .hierarchy({ children: data })
    .sum((d: any) => d.value); // reference it to easy understand about functionality https://github.com/d3/d3-hierarchy/blob/main/src/hierarchy/sum.js
  const root = packLayout(hierarchyNode); // packed layout with hierarchy
  const $svg = d3.select(svg);
  $svg.html("");
  // config some attributes basic of map
  $svg
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto; height: intrinsic;")
    .attr("font-size", 10)
    .attr("font-family", "sans-serif")
    .attr("text-anchor", "middle")
    .attr("fill", "#FFF");
  const leaf = $svg
    .selectAll("a")
    .data(root.leaves()) // Returns the array of leaf nodes in traversal order; leaves are nodes with no children.
    // https://github.com/d3/d3-hierarchy/blob/main/README.md#node_leaves
    .join("a")
    .attr("xlink:href", (d) => DATA(d).link)
    .attr("target", "_blank")
    .attr("transform", (d) => `translate(${d.x},${d.y})`);

  // append circle (bubble) the radius will come from hierarchy generator node
  leaf
    .append("circle")
    .attr("stroke", "#FFF")
    .attr("stroke-width", 1)
    .attr("stroke-opacity", 1)
    .attr("fill", (d: any) => color(DATA(d).group)) // scaleOrdinal by group https://observablehq.com/@d3/d3-scaleordinal
    .attr("fill-opacity", 1)
    .attr("r", (d) => d.r);
  leaf.append("title").text((d) => DATA(d).title);
  const uid = `O-${Math.random().toString(16).slice(2)}`;
  leaf
    .append("clipPath") // clipPath to ellipsis  https://developer.mozilla.org/en-US/docs/Web/SVG/Element/clipPath
    .attr("id", (d) => `${uid}-clip-${DATA(d).id}`)
    .append("circle")
    .attr("r", (d) => d.r);
  leaf
    .append("text")
    .attr(
      "clip-path",
      (d) =>
        `url(${new URL(`#${uid}-clip-${DATA(d).id}`, window.location as any)})`
    )
    .selectAll("tspan")
    .data((d) => `${DATA(d).label}`.split(/\n/g)) // label - string[]
    .join("tspan")
    .attr("x", 0)
    .attr("y", (d, i, tspans) => `${i - tspans.length / 2 + 0.85}em`)
    .attr("fill-opacity", (d, i, tspans) =>
      i === tspans.length - 1 ? 0.7 : null
    )
    .text((d) => d);

  return Object.assign($svg.node() as any, { scales: { color } });
};
