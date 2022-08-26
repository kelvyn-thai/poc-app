import React from "react";
import D3Chart, { IBaseD3ChartProps } from "components/charts/D3Chart";
import { createZoomableMapTilesChart } from "./D3ZoomableMapTiles.utils";
import { Item } from "./D3ZoomableMapTiles.typings";
import geojson from "./singapor-geojson.json";
import jsonData from "./data.json";
import styles from "./D3ZoomableMapTiles.styles.module.scss";

interface IProps extends IBaseD3ChartProps {
  data: {
    // geojson: d3.GeoPermissibleObjects | any;
    // items: Item[];
    // scaleRatio: number;
    // renderItem: (item: Item) => React.ReactElement | React.ReactNode | any;
    features: d3.GeoPermissibleObjects | any;
  };
}

const D3ZoomableMapTiles = ({
  data: {
    // will get from api later
    // items, scaleRatio, geojson, renderItem,
    features,
  },
  ...rest
}: IProps) => {
  const ref: React.MutableRefObject<HTMLDivElement | null> = React.useRef(null);
  const refSVG = React.useRef(null);
  const { points, scaleRatio } = jsonData;
  const items = React.useMemo(
    () =>
      points.map((point) => ({
        ...point,
        coordinates: point.position,
      })),
    [points]
  );
  const renderItem = React.useCallback((item: Item) => {
    const { id, name, position, attributes } = item;
    const factories = [
      {
        label: "#ID",
        value: id,
      },
      {
        label: "Item Name",
        value: name,
      },
      {
        label: "Coordinates",
        value: position,
      },
      {
        label: "Attributes",
        value: attributes,
      },
    ];
    return factories.map(({ label, value }) => (
      <div key={label} className={`${styles.item}`}>
        <div className="font-medium">{label}</div>
        <div className="">{value}</div>
      </div>
    ));
  }, []);
  const renderItems = React.useMemo(
    () =>
      items.map((item) => {
        const { id } = item;
        return (
          <div
            id={`item-${id}`}
            key={id}
            className="tooltip fixed -[1000] invisible opacity-0 flex flex-col p-[10px] h-[fit-content] bg-white rounded-[4px] shadow-xl text-black text-xs"
          >
            {renderItem(item)}
          </div>
        );
      }),
    [items]
  );
  React.useLayoutEffect(() => {
    if (ref.current && refSVG.current && !rest.isLoading) {
      createZoomableMapTilesChart({
        svg: refSVG.current,
        container: ref.current,
        features,
        items: items as unknown[] as Item[],
        geojson,
        scaleRatio,
      });
    }
  }, [ref, refSVG, rest.isLoading, features, items, geojson, scaleRatio]);
  return (
    <D3Chart
      classNameContainer={`${rest.classNameContainer || ""} min-h-[500px]`}
      ref={{ ref, refSVG } as any}
      {...rest}
    >
      {renderItems}
    </D3Chart>
  );
};

export default React.memo(D3ZoomableMapTiles);
