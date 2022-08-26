import React from "react";
import { renderToString } from "react-dom/server";
import D3Tooltip from "./index";

export const useRenderTooltip = () => {
  const renderTooltip = React.useCallback(
    ({ value, event }: { event: any; value: string }) => {
      const { pageX, pageY } = event;
      const left = `${pageX + 20}px`;
      const top = `${pageY - 20}px`;
      const tooltip = renderToString(
        <D3Tooltip
          value={value}
          style={{
            top,
            left,
            opacity: 1,
            visibility: "visible",
            zIndex: Number.MAX_SAFE_INTEGER,
          }}
        />
      );
      return tooltip;
    },
    []
  );
  return [renderTooltip];
};
