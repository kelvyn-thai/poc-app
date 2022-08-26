import { Rule } from "rc-field-form/lib/interface";
import { useI18n } from "i18n";
import React from "react";
import { getValidatorInputNumber, required } from "./Input.utils";

/**
 * useValidatorInputNumber
 * This hook will return validator for input number. Message will be translator by i18n
 * NOTE!
 * You have you normal input (<Input />) to make sure it's work right. <InputNumber /> don't fire validator when type
 * @returns {validator: RuleInputNumber[]}
 */
export const useValidatorInputNumber: () => {
  validator: Rule[];
} = () => {
  const t = useI18n();
  return React.useMemo(() => {
    const validator: Rule[] = getValidatorInputNumber();
    return { validator };
  }, [t]);
};

/**
 * useValidatorInput
 * This hook will return validator for input. Message will be translator by i18n
 * @returns {validator: Rule[]}
 */
export const useValidatorInput = () => {
  const t = useI18n();
  return React.useMemo(() => {
    const validator: Rule[] = [required];
    return { validator };
  }, [t]);
};
