import EPictorialBar from "components/charts/EPictorialBar";
import useWindowDimensions from "hooks/useWindowDimensions";
import React from "react";

const PictorialBar = () => {
  const { height } = useWindowDimensions();
  return <EPictorialBar data={{ data: [], width: "auto", height }} />;
};

export default React.memo(PictorialBar);
