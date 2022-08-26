import classNames from "classnames";
import React from "react";
import appStyle from "styles/App.module.scss";

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
    className={`${isCenterAbsolute && appStyle.absCenter} ${classNames(
      className
    )}`}
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
