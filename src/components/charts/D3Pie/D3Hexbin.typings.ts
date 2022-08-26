export type PieChartItem = {
  id: string;
  label: string;
  value: number;
};

export type PieChartItemRender = {
  percent: number;
} & PieChartItem;
