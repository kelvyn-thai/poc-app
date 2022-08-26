import React from "react";
import { D3HierachyChart3D } from "components/charts/D3Hierachy";
import { useDataResourceStore } from "pages/data_resource";

const HierachyChart = () => {
  const { hierachy } = useDataResourceStore();
  if (!hierachy) {
    return null;
  }
  return (
    <D3HierachyChart3D
      data={{ hierachy, width: "100%", height: 640 }}
      chartName="Hierachy Chart"
    />
  );
};

export default React.memo(HierachyChart);
