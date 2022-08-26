import useOutsideRef from "hooks/useDetectClickOutside";
import React from "react";
import style from "./style.module.scss";

export interface IOption {
  id: string;
  value: string;
  label: string;
}

export interface IDropdownBox {
  options: IOption[];
  title: string;
  dropdownBoxContainerClassName?: string;
  selected: IOption[];
  setSelected: (selected: IOption[]) => any;
}

const DropdownBox: React.FC<IDropdownBox> = ({
  options,
  title,
  dropdownBoxContainerClassName,
  selected,
  setSelected,
}: IDropdownBox) => {
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
      className={`dropdownBox-container w-fit ${dropdownBoxContainerClassName}`}
    >
      <div
        className={`flex border-none relative cursor-pointer items-center h-10 min-w-[150px] text-white bg-blue-500 font-normal capitalize w-fit ${style.dropdownBox}`}
      >
        <div
          className="absolute left-1 right-4 top-0 h-[100%] flex items-center"
          onClick={() => setToggle(!toggle)}
        >
          <div className="text-sm">{title}</div>
        </div>
        {toggle && (
          <div className="dropdownBox-menu absolute top-[100%] left-0 w-[100%] z-10 max-h-[200px] overflow-y-scroll bg-blue-500">
            {options.map((option) => {
              const { id, label } = option;
              const isExisted = selected.findIndex((i) => i.id === id) > -1;
              const current = isExisted
                ? selected.filter((i) => i.id !== id)
                : [...selected, option];
              return (
                <div
                  className="grid gap-1 items-center min-h-[40px] min-w-[150px] border-t-orange-100 p-1 hover:bg-blue-600 border-solid border-t-[0.5px] w-fit"
                  style={{
                    gridTemplateColumns: `20px fit-content(100%)`,
                  }}
                  key={id}
                  onClick={() => setSelected(current)}
                >
                  <i
                    className={`fa-regular ${
                      isExisted ? "fa-square-check" : "fa-square"
                    } `}
                  />
                  <div className="text-sm text-white hove'r:font-medium capitalize">
                    {label}
                  </div>
                </div>
              );
            })}
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

DropdownBox.defaultProps = {
  dropdownBoxContainerClassName: "",
};

export default React.memo(DropdownBox);
