import React from "react";
import Loading from "components/core/Loading";

interface IProps {
  title: string;
  sub?: React.ReactNode | React.ReactElement | any;
  className?: string | undefined | any;
  isLoading?: boolean;
  classNameBlockTitle?: string | any;
  childrenCenter?: boolean;
  panelTitleClassName?: string | undefined | any;
}
const Panel: React.FC<
  IProps &
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >
> = ({
  title,
  children,
  sub,
  className = "",
  isLoading,
  classNameBlockTitle,
  childrenCenter,
  panelTitleClassName = "",
  ...rest
}) => (
  <div
    className={`relative bg-[#212029] p-5 h-auto ${className || ""}`}
    {...rest}
  >
    <div
      className={`grid items-center justify-between gap-3 ${classNameBlockTitle}`}
    >
      <div
        className={`panel-title font-medium text-white truncate max-w-100px ${
          panelTitleClassName || ""
        }`}
      >
        {title}
      </div>
      {sub && sub}
    </div>
    {isLoading ? (
      <Loading />
    ) : (
      children && (
        <div
          className={`${
            childrenCenter ? "flex justify-center items-center" : ""
          } `}
        >
          {children}
        </div>
      )
    )}
  </div>
);

Panel.defaultProps = {
  sub: null,
  className: "",
  isLoading: false,
  classNameBlockTitle: "",
  childrenCenter: false,
  panelTitleClassName: "",
};
export default React.memo(Panel);
