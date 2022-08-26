/* eslint-disable no-bitwise */
/* eslint-disable prefer-arrow-callback */
import * as d3 from "d3";
import { ENV } from "env";
import { cachePromise } from "utils/cachePromise";
import * as echarts from "echarts";
import Stack from "utils/stack";
import isEqual from "lodash/isEqual";
import { HierachyData } from "./D3Hierachy.typings";

const stack2D = new Stack();
const stack3D = new Stack();

const renderEchartsMap = ({
  hierachy,
  mapName,
  mapEcharts,
  nameProperty,
  renderTooltip,
}: {
  hierachy: HierachyData;
  mapName: string;
  mapEcharts: echarts.EChartsType;
  nameProperty: string | any;
  renderTooltip: (feature: any) => any;
}) => {
  const { geometry, regions = [] } = hierachy;
  const scaleColor = d3.scaleOrdinal(regions, d3.schemeCategory10);
  echarts.registerMap(mapName, geometry);
  const defaultAreaColor = "#333D3F";
  const rbgDefaultAreaColor = d3.color(defaultAreaColor) as d3.RGBColor;
  const rbgShadowColor = rbgDefaultAreaColor;
  rbgShadowColor.opacity = 0.5;
  const rgbaShadowColor = String(rbgShadowColor);
  const options = {
    geo: {
      map: mapName,
      zoom: 1,
      roam: true,
      animation: false,
      nameProperty,
      label: {
        show: false,
      },
      itemStyle: {
        areaColor: defaultAreaColor,
        shadowColor: rgbaShadowColor,
        shadowOffsetX: 0,
        shadowOffsetY: 10,
      },
    },
    series: [
      {
        name: "map",
        type: "map",
        map: mapName,
        selectedMode: false,
        roam: true,
        label: {
          show: false,
          color: "#ffffff",
        },

        itemStyle: {
          areaColor: defaultAreaColor,
          shadowColor: rgbaShadowColor,
          shadowOffsetX: -2,
          shadowOffsetY: 2,
          shadowBlur: 10,
        },
        emphasis: {
          label: {
            color: "#ffffff",
          },
          itemStyle: {
            areaColor: "#6289AB",
            shadowColor: rgbaShadowColor,
            shadowOffsetX: 0,
            shadowOffsetY: 10,
          },
        },
        data: regions.map((r) => {
          const areaColor = scaleColor(r);
          const rgbColor = d3.color(areaColor) as d3.RGBColor;
          const shadowColor = rgbColor;
          shadowColor.opacity = 1;
          const emphasisShadowColor = rgbColor;
          emphasisShadowColor.opacity = 0.5;
          return {
            name: r,
            label: {
              show: false,
              color: "#FFF",
            },
            itemStyle: {
              areaColor,
              shadowColor: String(shadowColor),
              shadowOffsetX: 0,
              shadowOffsetY: 10,
            },
            emphasis: {
              focus: "self",
              label: {
                color: "#FFFFFF",
                show: true,
              },
              itemStyle: {
                areaColor,
                shadowColor: String(emphasisShadowColor),
                shadowOffsetX: 0,
                shadowOffsetY: 10,
              },
            },
          };
        }),
      },
    ],
    tooltip: {
      show: true,
      trigger: "item" as any,
      formatter: (params: { [key: string]: any } | any[] | any) => {
        const { name } = params;
        const feature = geometry?.features.find((f: any) =>
          isEqual(f?.properties?.name, name)
        );
        if (feature) {
          return renderTooltip({ feature, name });
        }
        return "";
      },
      // alwaysShowContent: true,
      padding: 0,
      borderWidth: 0,
    },
  };
  mapEcharts.setOption(options);
  mapEcharts.hideLoading();
};

let $echartsMap: echarts.EChartsType | any;
/**
 * createHierachyChart3D this function using for generator 3D map
 * @param container - HTMLDivElement div container -> using for draw map
 * @param hierachy - HierachyData recursive json data
 */
export const createHierachyChart3D = (paramsFnc: {
  container: HTMLDivElement;
  hierachy: HierachyData;
  renderTooltip: (feature: any) => any;
  width: number | any;
  height: number | any;
}) => {
  let $echartMapEle;
  try {
    const { hierachy, container, renderTooltip, width, height } = paramsFnc;
    const $container = d3.select(container);
    if (!hierachy) {
      $echartsMap.dispose();
      return;
    }
    const {
      geometry, // geometry json
      children = [], // children hierachy recursive
      name, // name map
      nameProperty = "name", // https://echarts.apache.org/en/option.html#geo.nameProperty
      // useAssetPath = false, // if useAssetPath === true -> get geometry data from asset resource (geometry is really heavy)
      id,
    } = hierachy;
    // bind id for container

    if ($echartsMap) {
      $echartsMap.dispose(); // trick for re-draw chart
    }
    $echartMapEle = $container.append("div").attr("id", id).node() as any;
    // init chart -> $echartsMap is instance of echarts.EChartsType
    $echartsMap = echarts.init($echartMapEle, undefined, { width, height });
    // show loading
    $echartsMap.showLoading();
    // function to render Echarts map
    renderEchartsMap({
      hierachy,
      mapName: name,
      mapEcharts: $echartsMap,
      nameProperty,
      renderTooltip,
    });
    const isStackEmpty = stack3D.isEmpty();
    const handleEvent = ({ dataIndex }: any) => {
      let child;
      // get feature base on index
      const feature = geometry.features[dataIndex];
      // find geometry feature base on properties
      if (feature) {
        child = children.find((c) =>
          isEqual(c.name, feature?.properties?.name)
        );
      }
      return child;
    };
    // handle for event on click area
    $echartsMap.on("click", (params: any) => {
      // when click to area (district, states, province,...)
      // if they have children (mean it's hierachy) ->
      // push current hierachy to stack + re-create chart base on data
      const child: HierachyData | any = handleEvent(params);
      if (child) {
        stack3D.push(hierachy);
        createHierachyChart3D({ ...paramsFnc, hierachy: child });
      }
    });
    // handle for event go back when double click area
    $echartsMap.on("dblclick", (params: any) => {
      const child: HierachyData | any = handleEvent(params);
      if (!isStackEmpty) {
        // when stack is empty -> we no need back
        if (!child) {
          const peek = stack3D.peek();
          stack3D.pop();
          createHierachyChart3D({
            ...paramsFnc,
            hierachy: peek as unknown as HierachyData,
          });
        }
      }
    });
    // handle for event zoom
    $echartsMap.on("georoam", (params: any) => {
      const option: any = $echartsMap.getOption();
      if (params.zoom) {
        option.geo[0].zoom = option.series[0].zoom;
        option.geo[0].center = option.series[0].center;
      } else {
        option.geo[0].center = option.series[0].center;
      }
      $echartsMap.setOption(option);
    });
  } catch (error) {
    //
  }
  return $echartMapEle;
};

export const createHierachyChart2D = async (params: {
  svg: SVGSVGElement;
  container: HTMLDivElement;
  hierachy: HierachyData;
  width?: number | any;
  height?: number | any;
}) => {
  try {
    const { svg, hierachy, width = 800, height = 400 } = params;
    const {
      geometry: geometryPath,
      children = [],
      // points = [],
    } = hierachy;
    const assetPath = `${ENV.ASSETS_PATH}/${geometryPath}`;
    const geometry: any = await cachePromise(assetPath, () =>
      d3.json(assetPath)
    );
    const $svg = d3
      .select(svg)
      .attr("width", width)
      .attr("height", height)
      .attr("viewbox", `0,0,${width},${height}`);
    $svg.html("");
    // draw map
    const centroid = d3.geoPath().centroid(geometry);
    const projection = d3 // https://github.com/d3/d3-geo#projections
      .geoMercator()
      .scale(1 / (2 * Math.PI))
      .translate(centroid)
      .fitSize([width, height], geometry);
    // Generator map from project + geometry data: https://github.com/d3/d3-geo#geoPath
    // NOTE: every map will has difference projection (scale, center, translate, v...v). We need research source from google to make sure it can be work
    const color = d3.scaleOrdinal(geometry.features, d3.schemeCategory10);
    const printData = (render: any) => {
      $svg.html("");
      geometry.features.forEach((item: any) => {
        $svg
          .append("path")
          .datum(item)
          .attr("class", "geometry-map")
          .attr("pointer-events", "visible")
          .attr("stroke", "#777")
          .attr("stroke-width", 0.5)
          .attr("stroke-linejoin", "round")
          .attr("cursor", "pointer")
          .attr("fill", "none")
          .attr("d", (d: any) => render(d))
          .each(function eachSelection(d) {
            const $this = d3.select(this);
            const child = children.find((c) => c.id === d.properties.id);
            const hasChild = !!child?.id;
            const isStackEmpty = stack2D.isEmpty();
            if (hasChild) {
              $this.attr("opacity", 1);
              $this.attr("fill", color(d));
            } else {
              $this.attr("opacity", 0.5);
            }
            $this
              .on("mouseover", function onMouseOver() {
                $this.attr("opacity", 1);
                if (!hasChild) {
                  $this.attr("fill", "#FFF");
                }
              })
              .on("mouseleave", function onMouseLeave() {
                if (!hasChild) {
                  $this.attr("opacity", 0.5);
                  $this.attr("fill", "none");
                }
              })
              .on("click", function onClick() {
                if (hasChild) {
                  // has child -> continue
                  stack2D.push(hierachy);
                  createHierachyChart2D({ ...params, hierachy: child });
                }
              })
              .on("dblclick", function onDoubleClick() {
                if (!isStackEmpty) {
                  // check if stack2D is not empty (initial case)
                  if (!hasChild) {
                    // item don't have children -> go back
                    const peek = stack2D.peek();
                    stack2D.pop();
                    createHierachyChart2D({
                      ...params,
                      hierachy: peek as unknown as HierachyData,
                    });
                  }
                }
              });
          });
      });
    };
    printData(d3.geoPath(projection));
  } catch (error) {
    //
  }
};
