import React from "react";

interface IProps {
  value?: string;
}

const CoreText: React.FC<
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > &
    IProps
> = ({ value, ...rest }) => <div {...rest}>{value || "-"}</div>;

CoreText.defaultProps = {
  value: undefined,
};

export default React.memo(CoreText);
