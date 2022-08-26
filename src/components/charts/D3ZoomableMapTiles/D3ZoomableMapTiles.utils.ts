/* eslint-disable no-bitwise */
import * as d3 from "d3";
import * as d3Tile from "d3-tile";
import * as d3Hexbin from "d3-hexbin";
import { Item, TypeZoomableMapTilesChart } from "./D3ZoomableMapTiles.typings";

const url = (x: number, y: number, z: number) =>
  `https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/${z}/${x}/${y}${
    devicePixelRatio > 1 ? "@2x" : ""
  }?access_token=pk.eyJ1IjoieWtkbjk2cyIsImEiOiJjbDU5bmhlaGwwMTU1M2tvMTJidTJ1bjRxIn0.7BuOOOeDnw0ybTrxcv_I8Q`;

/**
 * Reference: https://observablehq.com/@d3/zoomable-map-tiles
 * createZoomableMapTilesChart - This function using for generator zoomable tiles chart
 * container: HTMLDivElement - Chart container element;
 * svg: SVGElement - using for render map;
 * width?: number - chart width;
 * height?: number - chart height;
 * items: Item[] - hexagon points data includes id, coordinates,... We will have 'id' & 'coordinates' is require prop, some property will use to render information when click to hexagon item
 * features: Feature[] - geojson arrays. The first item is always main man (country, states,...), remain item will be sub area (religion)
 * geojson: d3.GeoPermissibleObjects. using to render map
 * scaleRatio: number - ratio to scale map
 * @returns svg chart
 */
export const createZoomableMapTilesChart = (
  params: TypeZoomableMapTilesChart
) => {
  const {
    svg,
    width = 928,
    height = 500,
    items,
    container,
    features,
    geojson,
    scaleRatio,
  } = params;
  const $svg = d3.select(svg); // selection svg element to handle
  const $container = d3.select(container); // selection container element to handle
  $svg.html(""); // trick to avoid duplicate data
  $svg.attr("viewBox", [0, 0, width, height]);
  const projection = d3 // https://github.com/d3/d3-geo#projections
    .geoMercator()
    .scale(1 / (2 * Math.PI))
    .translate([0, 0]);
  const render = d3.geoPath(projection); // https://github.com/d3/d3-geo#paths
  const tile = d3Tile // https://github.com/d3/d3-tile
    .tile()
    .extent([
      [0, 0],
      [width, height],
    ])
    .tileSize(512);
  let image = $svg
    .append("g")
    .attr("pointer-events", "none")
    .selectAll("image");
  const $area = $svg
    .append("path")
    .attr("class", "feature-path")
    .attr("pointer-events", "none")
    .attr("fill", () => "red");
  const $map = $svg
    .append("path")
    .attr("pointer-events", "none")
    .attr("fill", "none")
    .attr("class", "map-path");
  const vector = $svg.append("g"); // holds hexagons
  let hexes; // to hold hexagons
  // init hexbin instance
  // https://github.com/d3/d3-hexbin
  // https://d3-graph-gallery.com/graph/density2d_hexbin.html
  // https://observablehq.com/@d3/hexbin-map?collection=@d3/d3-hexbin
  const hexbin = d3Hexbin
    .hexbin()
    .extent([
      [0, 0],
      [width, height],
    ])
    .radius(9)
    .x((d) => {
      const [x] = projection(d) as [number, number];
      return x;
    })
    .y((d) => {
      const [, y] = projection(d) as [number, number];
      return y;
    });
  const points = items.map((item) => {
    const { coordinates } = item;
    return [...coordinates, item];
  }) as unknown[] as [number, number][];
  const zoomed = (transform: any) => {
    $container
      .selectAll(".tooltip")
      .attr("visibility", "hidden")
      .style("opacity", 0)
      .style("visibility", "hidden");
    const tiles = tile(transform); // https://observablehq.com/@d3/zoomable-map-tiles
    image = image // images get from api mapbox -> mapping to tiles layout
      .data(tiles, (d: any) => d)
      .join("image")
      .attr("xlink:href", ([x, y, z]: any) => url(x, y, z))
      .attr("x", ([x]: any) => (x + tiles.translate[0]) * tiles.scale)
      .attr("y", ([, y]: any) => (y + tiles.translate[1]) * tiles.scale)
      .attr("width", tiles.scale)
      .attr("height", tiles.scale);
    projection
      .scale(transform.k / (2 * Math.PI))
      .translate([transform.x, transform.y]);
    hexes = vector.selectAll("path").data(hexbin(points));
    hexes
      .enter()
      .append("path")
      .merge(hexes as any)
      .attr("transform", (d) => `translate(${d.x},${d.y})`)
      .attr("d", hexbin.hexagon())
      .attr("cursor", "pointer")
      .attr("fill", (datum: any) => {
        const item: Item = datum[0][2];
        const { color } = item;
        return color;
      })
      .attr("stroke", "currentColor")
      .attr("stroke-width", "0.5")
      // eslint-disable-next-line func-names, prefer-arrow-callback
      .on("click", function (event: any, datum: any) {
        try {
          const item: Item = datum[0][2];
          const { id } = item;
          const { pageX, pageY } = event;
          const $item = $container.select(`#item-${id}`);
          const isVisible = $item.attr("visibility") === "visible";
          const status = `${isVisible ? "hidden" : "visible"}`;
          $item
            .attr("visibility", status)
            .style("visibility", status)
            .style("opacity", `${isVisible ? "0" : "1"}`)
            .style("left", `${pageX + 20}px`)
            .style("top", `${pageY - 20}px`);
        } catch (error) {
          //
        }
      });
    $map.attr("d", render(geojson));
    $area.attr("d", render(features));
  };
  const zoom = d3
    .zoom()
    .scaleExtent([1 << 8, 1 << 30])
    .extent([
      [0, 0],
      [width, height],
    ])
    .on("zoom", ({ transform }) => zoomed(transform));
  const centerCoordinates = d3.geoPath().centroid(features);
  const projectionCenter = projection(centerCoordinates) as [number, number];
  $svg
    .call((selection: any) => zoom(selection))
    .call((selection: any) =>
      zoom.transform(
        selection,
        d3.zoomIdentity
          .translate(width / 2, height / 2)
          .scale(-1 << scaleRatio)
          .translate(...projectionCenter)
          .scale(-1)
      )
    );
  return $svg.node();
};
