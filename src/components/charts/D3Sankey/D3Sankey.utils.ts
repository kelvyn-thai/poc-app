/* eslint-disable prefer-const */
import * as d3 from "d3";
import uniq from "lodash/uniq";
import * as d3Sankey from "d3-sankey";
import {
  SankeyExtraProperties,
  sankeyJustify,
  SankeyLinkMinimal,
  SankeyNodeMinimal,
} from "d3-sankey";
import { IData, IOptions } from "./D3Sankey.typings";

export const intern = (value: SankeyExtraProperties | string | number) =>
  value !== null && typeof value === "object" ? value.valueOf() : value;

// Copyright 2021 Observable, Inc.
// Released under the ISC license.
// https://observablehq.com/@d3/sankey-diagram
export const createSankeyChart = ({
  data,
  options,
  svg,
  container,
}: {
  data: IData;
  options: IOptions;
  svg: SVGSVGElement;
  container: HTMLDivElement;
}) => {
  let {
    nodes, // an iterable of node objects (typically [{id}, …]); implied by links if missing
    links, // an iterable of link objects (typically [{source, target}, …])
  } = data;
  // let Tt: string[] = [];
  let Tl: string[] = [];
  let Lt: string[] = [];
  let color: any;
  let G: (string | number | Record<string, unknown> | any)[] = [];
  try {
    const {
      format = d3.format,
      nodeId,
      nodeLabel,
      // nodeTitle,
      nodeAlign = sankeyJustify,
      nodeWidth = 24,
      nodePadding = 20,
      nodeLabelPadding = 6,
      // nodeStroke = "currentColor",
      // nodeStrokeWidth,
      // nodeStrokeOpacity = 1,
      // nodeStrokeLinejoin,
      linkSource = ({ source }) => source,
      linkTarget = ({ target }) => target,
      linkValue = ({ value }) => value,
      // linkPath,
      linkTitle,
      // linkStrokeOpacity = 1,
      linkMixBlendMode = "normal",
      colors = d3.schemeTableau10,
      width = 640,
      height = 400,
      nodeGroup,
      standardizeNode,
      standardizeLink,
      onMouseEnterLink,
      onMouseEnterNode,
      onMouseLeaveLink,
      onMouseLeaveNode,
    } = options;
    // init $svg frame
    let { linkColor = "source-target" } = options;
    links = links.map((link) => standardizeLink(link));
    // Compute values.
    const LS = d3.map(links, linkSource).map(intern);
    const LT = d3.map(links, linkTarget).map(intern);
    const LV = d3.map(links, linkValue);
    const nodesFromLinks = Array.from(d3.union(LS, LT), (id) => ({
      id,
      name: id,
    }));
    // get nodes from links to make sure source / target is valid
    nodes = nodesFromLinks.map((node) => standardizeNode(node));
    const N = d3.map(nodes, nodeId).map(intern);
    G = d3.map(nodes, (d) => nodeGroup(d)).map(intern);
    // Replace the input nodes and links with mutable objects for the simulation.
    nodes = d3.map(nodes, (_, i) => ({ id: N[i] }));
    links = d3.map(links, (_, i) => ({
      source: LS[i],
      target: LT[i],
      value: LV[i],
    }));
    // Ignore a group-based linkColor option if no groups are specified.
    if (!G && ["source", "target", "source-target"].includes(linkColor))
      linkColor = "currentColor";
    // Compute default domains.
    const nodeGroups = G;

    // Construct the scales. The color will scale by d3.scaleOrdinal
    // Reference: https://observablehq.com/@d3/d3-scaleordinal
    color = d3.scaleOrdinal(nodeGroups, colors);

    Tl = d3.map(nodes, (d) => (nodeLabel ? nodeLabel(d) : d.id));
    // Compute the Sankey layout get sankey layout generator =>
    /**
     nodes: SankeyNodeMinimal<
        SankeyExtraProperties,
        SankeyExtraProperties
      >[];
      links: SankeyLinkMinimal<
        SankeyExtraProperties,
        SankeyExtraProperties
      >[]
     */

    // init a sankey instance
    const sankey = d3Sankey
      .sankey()
      .nodeId(({ index: i }) => N[i as number] as string)
      .nodeAlign(nodeAlign)
      .nodeWidth(nodeWidth)
      .nodePadding(nodePadding)
      .extent([
        [20, 20],
        [width - 10, height - 10],
      ]);

    // init sankey diagram (graph) from input data
    const graph = sankey({
      nodes: [...nodes] as unknown[] as SankeyNodeMinimal<
        SankeyExtraProperties,
        SankeyExtraProperties
      >[],
      links: [...links] as unknown[] as SankeyLinkMinimal<
        SankeyExtraProperties,
        SankeyExtraProperties
      >[],
    });
    nodes = graph.nodes;
    links = graph.links;

    // Links title mapping
    Lt = d3.map(links, (d) =>
      linkTitle
        ? linkTitle(d)
        : `${d.source.id} → ${d.target.id}\n${format(d.value)}`
    );

    const $svg = d3
      .select(svg)
      .attr("width", width)
      .attr("height", height)
      .attr("viewbox", `0, 0, ${width},${height}`);
    // This is trick to remove old content.
    // Because we are combine two ways control + un-control in React APP -> can be conflict dom vs virtual dom
    $svg.html("");
    // A unique identifier for clip paths (to avoid conflicts).
    const uid = `O-${Math.random().toString(16).slice(2)}`;

    let link = $svg
      .append("g") // $svg will append tag <g fill='none' class='g-links'></g> <=> tag g will contain all links
      .attr("fill", "none") // tag g:  https://developer.mozilla.org/en-US/docs/Web/SVG/Element/g
      .attr("class", "g-links")
      .selectAll("g"); // , selects the descendant elements 'g-link' in "g-links"

    // all tag "g-link" will mapping data from 'links' (graph.links - which auto generate from d3 sankey instance)
    const allLinks = link
      .data(links)
      .join("g") // append all 'g-link' from 'graph.links' -> Return void
      // add some attr for 'g-link'
      .style("mix-blend-mode", linkMixBlendMode)
      .attr("class", "g-link")
      .attr(
        "stroke",
        (d: SankeyExtraProperties) => `url(#${uid}-link-${d.index})` // stroke color mapping id from linear gradient
      );

    // append linearGradient color for each link
    allLinks
      .append("linearGradient")
      .attr("id", (d: SankeyExtraProperties) => `${uid}-link-${d.index}`)
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", (d: SankeyExtraProperties) => d.source.x1)
      .attr("x2", (d: SankeyExtraProperties) => d.target.x0)
      .call(
        (
          gradient // Returns this selection.
        ) =>
          gradient // gradient <=> this -> append tag <stop offset="0%" stop-color="color(G[i])"></stop>
            .append("stop")
            .attr("offset", "0%")
            .attr(
              "stop-color",
              ({ source: { index: i } }: SankeyExtraProperties) => color(G[i])
            )
      )
      .call(
        (
          gradient // Returns this selection.
        ) =>
          gradient // gradient <=> this -> append tag <stop offset="100%" stop-color="color(G[i])"></stop>
            .append("stop")
            .attr("offset", "100%")
            .attr(
              "stop-color",
              ({ target: { index: i } }: SankeyExtraProperties) => color(G[i])
            )
      );

    const allPathLinks = allLinks
      .append("path") // append path to raw real-link
      .attr("class", "path-link")
      .attr("stroke-width", (d: SankeyExtraProperties) => Math.max(d.width, 1))
      .attr("cursor", "pointer")
      .attr("opacity", 0.5)
      .on("mouseenter", (event: any, d: SankeyExtraProperties) => {
        // mouseenter: this event will handle when hover link
        d3.select(event.target).attr("opacity", "1"); // make link hovered highlight
        const { index } = d;
        const text = Lt[index];
        const { pageX, pageY } = event;
        // show tooltip base on coordinate of mouse
        d3.select(container)
          .selectChild(".tooltip")
          .html(text)
          .style("opacity", "1")
          .style("visibility", "visible")
          .style("left", `${pageX + 20}px`)
          .style("top", `${pageY - 20}px`);
        // callback onMouseEnterLink
        if (typeof onMouseEnterLink === "function") {
          onMouseEnterLink(event, d);
        }
      })
      .on("mouseleave", (event: any, d: SankeyExtraProperties) => {
        // mouseleave: this event will handle when un-hover link
        d3.select(event.target).attr("opacity", "0.5"); // remove highlight
        d3.select(container)
          .selectChild(".tooltip")
          .style("opacity", "0")
          .style("visibility", "hidden"); // hide tooltip info
        // callback onMouseLeaveLink
        if (typeof onMouseLeaveLink === "function") {
          onMouseLeaveLink(event, d);
        }
      })
      .attr(
        "d",
        (d: SankeyExtraProperties) =>
          d3Sankey.sankeyLinkHorizontal()(
            d as SankeyLinkMinimal<SankeyExtraProperties, SankeyExtraProperties>
          )
        /**
         * Get a horizontal link shape suitable for a Sankey diagram.
         * Source and target accessors are pre-configured
         * and work with the default x- and y- accessors of the link shape generator.
         */
      );

    const node = $svg
      .append("g") // $svg will append tag <g fill='none' class='g-nodes'></g> <=> tag g will contain all nodes
      .attr("class", "g-nodes") // tag g:  https://developer.mozilla.org/en-US/docs/Web/SVG/Element/g
      .selectAll("g");

    const gNodes = node
      .data(graph.nodes)
      .enter() // Return the enter selection <=> all 'g-node' tag
      .append("g")
      .attr("class", "g-node")
      .call((allGNodes) =>
        // this
        // d3.drag: https://github.com/d3/d3-drag
        d3
          .drag() // he returned behavior, drag, is both an object and a function, and is typically applied to selected elements via selection.call.
          // eslint-disable-next-line func-names
          .on("start", function () {
            // start drag node
            // we have to use normal function to access this <=> ONE 'g-node'
            if (this.parentNode) {
              this.parentNode.appendChild(this);
            }
          })
          // eslint-disable-next-line func-names
          .on("drag", function (event: any) {
            // handle event drag - re-draw sankey diagram
            // we have to use normal function to access this <=> ONE 'g-node'
            const rectY = Number(d3.select(this).select("rect").attr("y")); // dy 'g-node'
            const d = event.subject; // get datum node from event.subject
            /**
               * d: d3Sankey.SankeyNodeMinimal<
                SankeyExtraProperties,
                SankeyExtraProperties
               * 
              >
               */
            d.y0 += event.dy;
            const yTranslate = d.y0 - rectY;
            // node only transform vertical (by y)
            d3.select(this).attr("transform", `translate(0,${yTranslate})`);
            allPathLinks.attr("d", (dLink) =>
              d3Sankey.sankeyLinkHorizontal()(
                dLink as d3Sankey.SankeyLinkMinimal<
                  SankeyExtraProperties,
                  SankeyExtraProperties
                >
              )
            );
            // re-update graph. Node: we need to separate to 2 parts -> make it can update
            // 1: sankey instance
            // 2: graph generator from sankey instance
            sankey.update(graph);
          })(allGNodes as any)
      );

    // all g-nodes will append rect
    gNodes
      .append("rect")
      .attr("cursor", "pointer")
      .attr("x", (d: SankeyExtraProperties) => d.x0)
      .attr("y", (d: SankeyExtraProperties) => d.y0)
      .attr("height", (d: SankeyExtraProperties) => Math.max(d.y1 - d.y0, 1))
      .attr("width", (d: SankeyExtraProperties) => d.x1 - d.x0)
      .attr("fill", (d: SankeyExtraProperties) => colors[d.depth])
      .on("mouseenter", (event: any, d: d3Sankey.SankeyExtraProperties) => {
        // mouseenter: this event will handle when hover node
        const { sourceLinks, targetLinks } = d;
        // get all index from links + nodes
        const indexes = uniq([
          ...sourceLinks.map(
            (
              l:
                | SankeyLinkMinimal<
                    SankeyExtraProperties,
                    SankeyExtraProperties
                  >
                | any
            ) => l.index
          ),
          ...targetLinks.map(
            (
              l: SankeyLinkMinimal<SankeyExtraProperties, SankeyExtraProperties>
            ) => l.index
          ),
        ]);
        // highlight all path links from a node which selected
        allPathLinks.attr("opacity", (datum: SankeyExtraProperties) =>
          indexes.includes(datum.index) ? "1" : "0.5"
        );
        // callback onMouseEnterNode
        if (typeof onMouseEnterNode === "function") {
          onMouseEnterNode(event, d);
        }
      })
      .on("mouseleave", (event: any, d: d3Sankey.SankeyExtraProperties) => {
        // mouseleave: this event will handle when un-hover link
        allPathLinks.attr("opacity", "0.5");
        // callback onMouseLeaveNode
        if (typeof onMouseLeaveNode === "function") {
          onMouseLeaveNode(event, d);
        }
      });

    // append text
    gNodes
      .append("text")
      .join("text")
      .attr("x", (d: SankeyExtraProperties) =>
        d.x0 < width / 2 ? d.x1 + nodeLabelPadding : d.x0 - nodeLabelPadding
      )
      .attr("y", (d: SankeyExtraProperties) => (d.y1 + d.y0) / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", (d: SankeyExtraProperties) =>
        d.x0 < width / 2 ? "start" : "end"
      )
      .attr("fill", "#FFFFFF")
      .attr("stroke", "#FFFFFF")
      .attr("font-size", "16")
      .text(({ index: i }: SankeyExtraProperties) => Tl[i]);
  } catch (error) {
    // console.log(error);
  }
};
