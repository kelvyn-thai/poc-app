import useOutsideRef from "hooks/useDetectClickOutside";
import React from "react";
import style from "./style.module.scss";

export interface IOption {
  id: string;
  value: string;
  label: string;
}

interface IDropdown {
  options: IOption[];
  onSelectOption: (value: string) => any;
  defaultSelected: string;
  dropdownContainerClassName?: string;
}

const Dropdown: React.FC<IDropdown> = ({
  options,
  onSelectOption,
  defaultSelected,
  dropdownContainerClassName,
}: IDropdown) => {
  const [toggle, setToggle] = React.useState(false);
  const ref = React.useRef(null);
  useOutsideRef(ref, () => {
    if (toggle) {
      setToggle(false);
    }
  });
  return (
    <div
      ref={ref}
      className={`dropdown-container w-fit mb-4 ${dropdownContainerClassName}`}
    >
      <div
        className={`flex border-none relative cursor-pointer items-center pl-2 h-10 min-w-[150px] text-white bg-blue-500 font-normal capitalize w-fit ${style.dropdown}`}
        onClick={() => setToggle(!toggle)}
      >
        {defaultSelected}
        {toggle && (
          <div className="dropdown-menu absolute top-[100%] left-0 w-[100%] z-10">
            {options.map(({ id, value, label }) => (
              <div
                className="flex pl-2 border-t-orange-100 items-center h-10 min-w-[150px] text-white bg-blue-500 font-medium capitalize w-fit hover:bg-blue-600 hover:font-medium border-solid border-t-[0.5px]"
                key={id}
                onClick={() => {
                  onSelectOption(value);
                }}
              >
                {label}
              </div>
            ))}
          </div>
        )}
        <div
          className={`${style.toggle} ${
            toggle ? style.toggleVisible : style.toggleDisabled
          }`}
        />
      </div>
    </div>
  );
};

Dropdown.defaultProps = {
  dropdownContainerClassName: "",
};

export default React.memo(Dropdown);
