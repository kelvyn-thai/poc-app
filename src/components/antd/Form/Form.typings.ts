export type FieldProperty =
  | "name"
  | "value"
  | "touched"
  | "validating"
  | "errors";

export type FieldName = string | number | (string | number)[] | any;

export type FieldData = {
  name: FieldName;
  value?: any;
  touched?: boolean;
  validating?: boolean;
  errors?: string[];
};

export type FormType = {
  formFields: FieldData[];
  setFormFields: React.Dispatch<React.SetStateAction<FieldData[]>>;
  getFieldValue: (fieldName: FieldName) => any;
  getFieldsValue: () => any;
  getFieldError: (fieldName: FieldName) => any;
  getFieldsError: () => any;
  disabled: boolean;
};
