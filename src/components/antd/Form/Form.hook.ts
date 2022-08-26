import React from "react";
import { FieldData, FieldName, FieldProperty } from "./Form.typings";

export const useOperationFormControlled = (
  fields: FieldData[],
  initialValues?: { [key: string]: any }
) => {
  const [formFields, setFormFields] = React.useState<FieldData[]>(fields);
  React.useEffect(() => {
    if (!initialValues) {
      return;
    }
    setFormFields(
      fields.map((field) => {
        const { name } = field;
        return {
          ...field,
          name,
          value: initialValues[name],
        };
      })
    );
  }, [initialValues]);
  const form = React.useMemo(() => {
    const getFormFields = (property: FieldProperty) =>
      formFields.reduce((prev: any, curr: FieldData) => {
        const newPrev = { ...prev };
        newPrev[curr.name] = curr[property];
        return newPrev;
      }, {} as { [key: string]: any });
    const getFieldsValue = () => getFormFields("value");
    const getFieldValue = (fieldName: FieldName) => {
      const fieldsValue = getFieldsValue();
      return fieldsValue[fieldName];
    };
    const getFieldsError = () => getFormFields("errors");
    const getFieldError = (fieldName: FieldName) => {
      const fieldsError = getFieldsValue();
      return fieldsError[fieldName];
    };
    const disabled = formFields.some(
      ({ value, errors = [] }) => !value || errors?.length > 0
    );
    return {
      getFieldValue,
      getFieldsValue,
      getFieldError,
      getFieldsError,
      disabled,
    };
  }, [formFields]);
  return {
    formFields,
    setFormFields,
    ...form,
  };
};
