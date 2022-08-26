import toNumber from "lodash/toNumber";
import { Rule } from "rc-field-form/lib/interface";
import isNaN from "lodash/isNaN";
import { RuleInputNumber } from "./Input.typings";

export const required: Rule = {
  required: true,
  message: "Required",
};

export const validNumber: RuleInputNumber = {
  message: "Please enter a valid number",
  validator(rule, value) {
    const valToNumber = toNumber(value);
    if (isNaN(valToNumber)) {
      return Promise.reject(rule.message);
    }
    return Promise.resolve(value);
  },
};

export const positiveNumber: RuleInputNumber = {
  message: "Number has to > 0",
  validator(rule, value) {
    const valToNumber = toNumber(value);
    if (isNaN(valToNumber) || valToNumber > 0 || !value) {
      return Promise.resolve(value);
    }
    return Promise.reject(rule.message);
  },
};

export const getValidatorInputNumber: () => Rule[] = () => [
  required,
  validNumber,
  positiveNumber,
];
