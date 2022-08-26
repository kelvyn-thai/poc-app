import classNames from "classnames";
import React from "react";

const BreakLine: React.FC<
  { className?: string | undefined } & React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
> = ({ className = "", ...rest }) => (
  <div
    className={`h-[1px] bg-slate-300 w-[100%] ${classNames(className)}`}
    {...rest}
  />
);

BreakLine.defaultProps = {
  className: "",
};
export default React.memo(BreakLine);
