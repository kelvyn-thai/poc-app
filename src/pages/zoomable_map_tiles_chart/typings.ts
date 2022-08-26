export interface IPoint {
  id: string;
  name: string;
  type: string;
  color: string;
  position: [number, number];
  attributes: string;
}

export interface IData {
  points: IPoint[];
  scaleRatio: number;
  centerCoordinates: [number, number];
}
