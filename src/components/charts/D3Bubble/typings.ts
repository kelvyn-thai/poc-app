export type TypeBubbleItem = {
  id: string;
  value: number;
  [key: string]: any;
};

export type TypeBubbleChart = {
  data: TypeBubbleItem[];
  container: HTMLDivElement;
  svg: SVGElement;
  width?: number;
  height?: number;
  groupColors?: string[];
};
