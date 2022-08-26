import React from "react";
import * as d3 from "d3";
import D3RasterAndVector from "components/charts/D3RasterAndVector";

interface IState {
  isLoading: boolean;
  topology: TopoJSON.Topology | any;
}

const RasterAndVectorChart = () => {
  const [state, setState] = React.useState<IState>({
    isLoading: true,
    topology: null,
  });
  const handleFetchData = React.useCallback(async () => {
    try {
      const topojsonObjVN = (await d3.json(
        "https://raw.githubusercontent.com/gponster/d3tuts/master/vn-states.json"
      )) as TopoJSON.Topology;
      setState({
        isLoading: false,
        topology: topojsonObjVN,
      });
    } catch (error) {
      //
    }
  }, []);
  React.useEffect(() => {
    handleFetchData();
  }, []);
  if (state.isLoading) {
    return null;
  }
  return (
    <D3RasterAndVector
      chartName="Raster & Vector"
      isLoading={state.isLoading}
      topology={state.topology}
    />
  );
};

export default React.memo(RasterAndVectorChart);
