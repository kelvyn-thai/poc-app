import { SankeyExtraProperties, SankeyNodeMinimal } from "d3-sankey";

export type TNode = SankeyExtraProperties;

export type TLink = SankeyExtraProperties;

export type IData = {
  nodes: TNode[];
  links: TLink[];
};

export type IOptions = {
  format?: (value: string) => string; // a function or format specifier for values in titles
  nodeId: (d: TNode) => string; // given d in nodes, returns a unique identifier (string)
  nodeLabel?: (d: TNode) => string; // given d in (computed) nodes, text to label the associated rect
  nodeTitle?: (d: TNode) => string; // given d in (computed) nodes, hover text
  nodeAlign?: (
    node: SankeyNodeMinimal<SankeyExtraProperties, SankeyExtraProperties>,
    n: number
  ) => number; // Sankey node alignment strategy: left, right, justify, center
  nodeWidth?: number; // width of node rects: default 24px
  nodePadding?: number; // vertical separation between adjacent nodes: default 8px
  nodeLabelPadding?: number; // horizontal separation between node and label: default 6px
  nodeStroke?: string; // stroke around node rects: default "currentColor"
  nodeStrokeWidth?: number; // width of stroke around node rects, in pixels
  nodeStrokeOpacity?: number; // opacity of stroke around node rects
  nodeStrokeLinejoin?: string; // line join for stroke around node rects
  linkSource?: (l: TLink) => string; // given d in links, returns a node identifier string
  linkTarget?: (l: TLink) => string; // given d in links, returns a node identifier string
  linkValue?: (l: TLink) => string; // given d in links, returns the quantitative value
  linkPath?: (d: TLink) => any; // given d in (computed) links, returns the SVG path
  linkTitle?: (l: TLink) => string; // given d in (computed) links
  linkColor?: string; // source, target, source-target, or static color: default "source-target"
  linkStrokeOpacity?: number; // link stroke opacity
  linkMixBlendMode?:
    | "normal"
    | "multiply"
    | "screen"
    | "overlay"
    | "darken"
    | "lighten"
    | "color-dodge"
    | "color-burn"
    | "hard-light"
    | "soft-light"
    | "difference"
    | "exclusion"
    | "hue"
    | "saturation"
    | "color"
    | "luminosity"; // link blending mode
  colors?: any[]; // array of colors
  width?: number; // outer width, in pixels
  height?: number; // outer height, in pixels
  marginTop?: number; // top margin, in pixels
  marginRight?: number; // right margin, in pixels
  marginBottom?: number; // bottom margin, in pixels
  marginLeft?: number; // left margin, in pixels
  nodeGroup: (d: TNode) => string; // given d in nodes, returns an (ordinal) value for color
  standardizeNode: (d: SankeyExtraProperties) => SankeyExtraProperties; // standardize node value ex:  {name: string}[] => need standardize to format {name: string; id: string}[]
  standardizeLink: (d: SankeyExtraProperties) => SankeyExtraProperties; // standardize link value ex: {s: string,t: string,value: number;}[] => need standardize to format {source: string; target: string; value: number}[]
  onMouseEnterNode?: (event: any, d: SankeyExtraProperties) => void;
  onMouseLeaveNode?: (event: any, d: SankeyExtraProperties) => void;
  onMouseEnterLink?: (event: any, d: SankeyExtraProperties) => void;
  onMouseLeaveLink?: (event: any, d: SankeyExtraProperties) => void;
};
