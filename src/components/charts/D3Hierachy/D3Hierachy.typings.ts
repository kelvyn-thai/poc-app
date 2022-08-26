import * as d3 from "d3";

export type HierachyPoints = [number, number][];

export type HierachyData = {
  id: string;
  name: string;
  geometry: d3.GeoPermissibleObjects | any; // geojson object
  children: HierachyData[];
  points?: HierachyPoints[];
  width?: number;
  height?: number | any;
  nameProperty?: string | any;
  useAssetPath?: boolean;
  regions?: string[];
};
