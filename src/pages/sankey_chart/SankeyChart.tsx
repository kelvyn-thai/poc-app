import React from "react";
import D3Sankey from "components/charts/D3Sankey";
import json from "./sankey.json";

const SankeyChart = () => <D3Sankey data={json} />;

export default React.memo(SankeyChart);
