import classNames from "classnames";
import React from "react";

const Loading: React.FC<
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > & {
    className?: string;
    isCenterAbsolute?: boolean;
  }
> = ({ className, isCenterAbsolute, ...rest }) => (
  <div
    className={`${isCenterAbsolute && "abs-center"} ${classNames(className)}`}
    {...rest}
  >
    <i className="fa-solid fa-spinner fa-spin-pulse fa-2xl" />
  </div>
);
Loading.defaultProps = {
  className: "",
  isCenterAbsolute: true,
};

export default React.memo(Loading);
