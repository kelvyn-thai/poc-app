import React from "react";
import throttle from "lodash/throttle";

export const useResizeWindow = ({
  callback,
}: {
  callback: (ev: UIEvent) => any;
}) => {
  const handleResize = React.useCallback((ev: UIEvent) => {
    if (typeof callback === "function") {
      callback(ev);
    }
  }, []);
  React.useEffect(() => {
    window.addEventListener("resize", throttle(handleResize, 1000));
    return () => window.removeEventListener("resize", handleResize);
  }, []);
};
