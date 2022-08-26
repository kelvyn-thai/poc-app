import React from "react";
import D3ZoomableMapTiles from "components/charts/D3ZoomableMapTiles";
import { useDataResourceStore } from "pages/data_resource";

const ZoomableMapTilesChart = () => {
  const { tiles } = useDataResourceStore();
  if (!tiles) {
    return null;
  }
  return (
    <D3ZoomableMapTiles
      data={{
        features: tiles,
      }}
      chartName="Zoomable Map Tiles Chart"
    />
  );
};

export default React.memo(ZoomableMapTilesChart);
