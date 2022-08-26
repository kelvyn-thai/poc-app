export type Item = {
  id: string;
  coordinates: [number, number] | number[];
  [key: string]: any;
};

export type Feature = {
  geojson: d3.GeoPermissibleObjects | any;
  stroke: string;
};

export type TypeZoomableMapTilesChart = {
  container: HTMLDivElement;
  svg: SVGElement;
  width?: number;
  height?: number;
  items: Item[];
  features: d3.GeoPermissibleObjects | any;
  geojson: d3.GeoPermissibleObjects | any;
  scaleRatio: number;
};
