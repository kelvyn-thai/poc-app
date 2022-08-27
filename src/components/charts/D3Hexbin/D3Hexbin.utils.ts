import * as d3 from "d3";
import * as d3Hexbin from "d3-hexbin";
import { HexbinPoints } from "./D3Hexbin.typings";

/**
 * createHexbinChart this function use for generator  / draw map from geojson object (which contains spherical polygons) -> 2D (planar points)
 * @param points - [number, number][] coordinates points in spherical (3D maps). We can go to google maps an pick any point with [longitude, latitude]
 * @param options -
 *+ width: number;  width of map
  + height: number; height of map
  + projection: d3.GeoConicProjection | d3.GeoStreamWrapper | null | any;  Projections transform spherical polygonal geometry to planar polygonal geometry. D3 provides implementations of several classes of standard projections: - https://github.com/d3/d3-geo-projection
  + data: geojson objection (should topojson - TopoJSON is an extension of GeoJSON that encodes topology.); https://github.com/topojson/topojson
 * @svg - svg element
 */
export const createHexbinChart = async ({
  points,
  geojson,
  width = 800,
  height = 640,
  svg,
}: {
  points: HexbinPoints;
  geojson: d3.GeoPermissibleObjects | any;
  width?: number;
  height?: number;
  svg: SVGSVGElement;
  container: HTMLDivElement;
}) => {
  try {
    const $svg = d3
      .select(svg)
      .attr("width", width)
      .attr("height", height)
      .attr("viewbox", `0,0,${width},${height}`);
    $svg.html("");
    // draw map
    const centroid = d3.geoPath().centroid(geojson);
    const projection = d3 // https://github.com/d3/d3-geo#projections
      .geoMercator()
      .scale(1 / (2 * Math.PI))
      .translate(centroid)
      .fitSize([width, height], geojson);
    const render = d3.geoPath(projection); // https://github.com/d3/d3-geo#paths
    // Generator map from project + geojson data: https://github.com/d3/d3-geo#geoPath
    // NOTE: every map will has difference projection (scale, center, translate, v...v). We need research source from google to make sure it can be work
    geojson.features.forEach((item: any) =>
      $svg
        .append("path")
        .datum(item)
        .attr("class", "geometry-map")
        .attr("pointer-events", "visible")
        .attr("stroke", "#777")
        .attr("stroke-width", 0.5)
        .attr("stroke-linejoin", "round")
        .attr("cursor", "pointer")
        .attr("fill", "none")
        .attr("d", (d: any) => render(d))
    );

    // Reformat the data: d3.hexbin() needs a specific format
    // Prepare a color palette
    const color = d3.scaleOrdinal(points, d3.schemeTableau10);
    // init hexbin instance
    const hexbin = d3Hexbin
      .hexbin()
      .extent([
        [0, 0],
        [width, height],
      ])
      .radius(9);
    // projection points - transform spherical polygonal geometry to planar polygonal geometry
    // meaning after we use d3.geoPath to generate map 2D -> we need use projection to project points 3D -> points 2D and mapping to our map
    const hexbinPoints = points.map((point) => projection(point)) as [
      number,
      number
    ][];
    $svg
      .append("g")
      .attr("class", "hexagon-data")
      .selectAll("path")
      // data hexbin points -> use d3.hexbin to generate hexagonal, Bins the specified array of points, returning an array of hexagonal bins.
      .data(hexbin(hexbinPoints))
      .enter()
      .append("path")
      .attr("transform", (d) => `translate(${d.x},${d.y})`)
      .attr("d", hexbin.hexagon())
      .attr("fill", (d: any) => color(d))
      .attr("stroke", "currentColor")
      .attr("stroke-width", "0.5");
  } catch (error) {
    // console.log("error", error);
  }
};
