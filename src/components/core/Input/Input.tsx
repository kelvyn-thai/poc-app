import classNames from "classnames";
import React from "react";
import Button, { ICoreButtonProps } from "components/core/Button";
import { DropdownBox } from "components/core/Dropdown";
import styles from "./Input.styles.module.scss";
import {
  InputNumberProps,
  InputReadOnlyProps,
  InputDropdownBoxProps,
} from "./Input.typings";

type InputType =
  | "input"
  | "file"
  | "read-only"
  | "input-number"
  | "input-dropdown";

interface ICoreInput {
  label: string;
  isRequired?: boolean;
  type?: InputType | string;
  optionProps?:
    | ICoreButtonProps
    | React.InputHTMLAttributes<HTMLInputElement>
    | InputNumberProps
    | InputDropdownBoxProps
    | any;
  renderInputComponent?: () => React.ReactElement | React.ReactNode | any;
}

const defaultInputStyle = `w-fit border-solid border-gray-500 border-[0.5px] focus:border-blue-500 block outline-none h-10 rounded text-black font-normal text-sm w-[100%] py-2 px-3`;

const CoreInput: React.FC<ICoreInput> = (props: ICoreInput) => {
  const { label, isRequired, type, optionProps, renderInputComponent } = props;
  const renderInput = React.useCallback(() => {
    switch (type) {
      case "input": {
        return (
          <input
            className={`w${defaultInputStyle} ${classNames(
              styles.input || ""
            )}`}
            maxLength={32}
            {...optionProps}
          />
        );
      }
      case "input-number": {
        const { onChangeInput, ...rest } = optionProps as InputNumberProps;
        const floatRegExp = /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/;
        return (
          <input
            className={`${defaultInputStyle} ${classNames(styles.input || "")}`}
            maxLength={32}
            onChange={(e) => {
              e.preventDefault();
              const { value } = e.target;
              if (value === "" || floatRegExp.test(value)) {
                onChangeInput(e, value);
              }
            }}
            {...rest}
          />
        );
      }
      case "file":
        return <Button {...optionProps} />;
      case "read-only": {
        const { value } = optionProps as InputReadOnlyProps;
        return <div className="opacity-50 cursor-not-allowed">{value}</div>;
      }
      case "input-dropdown": {
        const {
          dropdownBoxProps,
          selected,
          handleSaveSelected,
          dropdownValue,
        } = optionProps as InputDropdownBoxProps;
        const selectedData = selected.length > 0;
        return (
          <div
            className="grid items-center gap-4"
            style={{
              gridTemplateColumns: `1fr min-content ${
                selectedData ? "min-content" : ""
              } `,
            }}
          >
            <div
              className={`flex items-center overflow-scroll ${defaultInputStyle}`}
            >
              {dropdownValue}
            </div>
            {selectedData && (
              <Button title="Save" onClick={handleSaveSelected} />
            )}
            <DropdownBox {...dropdownBoxProps} />
          </div>
        );
      }

      default:
        if (typeof renderInputComponent === "function") {
          return renderInputComponent();
        }
        break;
    }
  }, [props]);
  return (
    <div className={`grid ${styles.inputContainer} mb-4`}>
      <div
        className={`flex items-center black font-medium text-sm ${styles.inputLabel}`}
      >
        <span
          className={`${isRequired ? "opacity-100" : "opacity-0"} text-red-500`}
        >
          *
        </span>
        {label}
      </div>
      {renderInput()}
    </div>
  );
};
CoreInput.defaultProps = {
  isRequired: false,
  type: "input",
  optionProps: null,
  renderInputComponent: undefined,
};

export default React.memo(CoreInput);
