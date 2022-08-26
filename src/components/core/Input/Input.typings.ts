import {
  IDropdownBox,
  IOption,
} from "components/core/Dropdown/Dropdown.SelectBox";

export type InputReadOnlyProps = {
  value: string;
};

export type InputNumberProps = {
  onChangeInput: (e: React.ChangeEvent<HTMLInputElement>, value: string) => any;
} & React.InputHTMLAttributes<HTMLInputElement>;

export type InputDropdownBoxProps = {
  dropdownBoxProps: IDropdownBox;
  selected: IOption[];
  handleSaveSelected: () => any;
  dropdownValue: React.ReactNode | React.ReactElement | string | any;
};
