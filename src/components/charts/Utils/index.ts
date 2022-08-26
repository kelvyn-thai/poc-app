import * as d3 from "d3";
import floor from "lodash/floor";

export function wrap({
  selector,
  width,
  padding = 0,
}: {
  selector: any;
  width: number;
  padding?: number;
}) {
  const self = d3.select(selector);
  let textLength = self.node().getComputedTextLength();
  let text = self.text();
  while (textLength > width - 2 * padding && text.length > 0) {
    text = text.slice(0, -1);
    self.text(`${text}...`);
    textLength = self.node().getComputedTextLength();
  }
}

export const calculatePercent = (
  value: number,
  total: number,
  precision?: number
) => {
  const p = (value / total) * 100;
  const floorPercent = floor(p, precision || 2);
  return floorPercent;
};
