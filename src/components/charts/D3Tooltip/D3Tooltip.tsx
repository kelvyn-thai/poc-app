import React from "react";

interface IProps {
  value: string | React.ReactNode | React.ReactElement | any;
  className?: string | any;
}

const D3Tooltip: React.FC<
  IProps &
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >
> = ({ value, className = "", ...rest }) => (
  <div
    className={`tooltip fixed flex justify-center items-center p-[10px] h-[40px] bg-white rounded-[4px] shadow-xl text-black ${className}`}
    style={{
      opacity: 0,
      visibility: "hidden",
      ...rest.style,
    }}
    {...rest}
  >
    {value && value}
  </div>
);
D3Tooltip.defaultProps = {
  className: "",
};
export default React.memo(D3Tooltip);
