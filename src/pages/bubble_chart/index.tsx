import React from "react";
import D3Bubble from "components/charts/D3Bubble";
import bubbleJson from "./bubble_json.json";

const BubbleChart = () => <D3Bubble data={bubbleJson} />;

export default React.memo(BubbleChart);
