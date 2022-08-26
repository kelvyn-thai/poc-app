import * as d3 from "d3";
import * as topojson from "topojson";
import * as d3Tile from "d3-tile";
import { TypeRasterAndVectorChart } from "./D3RasterAndVector.typings";

const url = (x: number, y: number, z: number) =>
  `https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/${z}/${x}/${y}${
    devicePixelRatio > 1 ? "@2x" : ""
  }?access_token=pk.eyJ1IjoieWtkbjk2cyIsImEiOiJjbDU5bmhlaGwwMTU1M2tvMTJidTJ1bjRxIn0.7BuOOOeDnw0ybTrxcv_I8Q`;

/**
 * createRasterAndVectorChart - This function using for generator raster and vector chart
 * @params data TypeBubbleItem[]. Some property need to mapping: link, title, label, value,...
 * @returns svg chart
 */
export const createRasterAndVectorChart = (
  params: TypeRasterAndVectorChart
) => {
  let { height = 896 } = params;
  const { svg, topology, width = 928 } = params;
  const $svg = d3.select(svg);
  $svg.html("");
  const vectors = topojson.feature(topology, topology.objects.states);
  const projection = d3.geoMercator().fitWidth(width, vectors);
  const path = d3.geoPath(projection);
  const [[, y0], [, y1]] = d3.geoPath(projection).bounds(vectors);
  height = Math.ceil(y1 - y0);
  $svg
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto; height: intrinsic;");
  const scale = projection.scale() * (2 * Math.PI);
  const projectionScale = 2 ** Math.floor(Math.log2(scale)) / (2 * Math.PI);
  const center =
    projection.invert && projection.invert([width / 2, height / 2]);
  const translate = [width / 2, height / 2];
  projection.center(center as [number, number]);
  projection.scale(projectionScale);
  projection.translate(translate as [number, number]);
  const tile = d3Tile
    .tile()
    .size([width, height])
    .scale(projection.scale() * 2 * Math.PI)
    .translate(projection([0, 0]))
    .tileSize(512);
  const data: any = tile().map((datum: any, index: number, tiles: any) => ({
    datum,
    scale: tiles.scale,
    translate: tiles.translate,
  }));

  $svg
    .append("g")
    .selectAll("image")
    .data(data)
    .enter()
    .append("image")
    // eslint-disable-next-line func-names
    .each(function (d: any) {
      const {
        datum,
        scale: k,
        translate: [tx, ty],
      } = d;
      const [x, y, z] = datum;
      return d3
        .select(this)
        .attr("xlink:href", url(x, y, z))
        .attr("x", `${Math.round((x + tx) * k)}`)
        .attr("y", `${Math.round((y + ty) * k)}`)
        .attr("width", k)
        .attr("height", k);
    });

  $svg
    .append("path")
    .attr("stroke", "red")
    .attr("fill", "none")
    .attr("d", path(vectors));
};
