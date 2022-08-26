import { FormItem } from "./Form.typings";

export const checkIsDisabledForm = (data: FormItem[]) => {
  if (!data || data?.length === 0) {
    return true;
  }
  const disabled = data.some(({ isRequired, value }) => {
    if (isRequired) {
      return !value;
    }
    return false;
  });
  return disabled;
};
