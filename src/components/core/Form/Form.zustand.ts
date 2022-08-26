import React from "react";
import { createStore } from "zustand-store";
import { FormItem, FormStateItem } from "./Form.typings";
import { checkIsDisabledForm } from "./Form.utils";

type IState = {
  [formName: string]: FormStateItem | any;
};

interface IActions {
  actionSetFormData: (formData: FormItem[], formName: string) => any;
  actionSetIsSubmitting: (isSubmitting: boolean, formName: string) => any;
  actionInitFormData: (formName: string, initialValues: FormItem[]) => any;
}

const initialState = {};

export const [useStore] = createStore<IState & IActions>(
  (set, get) => ({
    ...initialState,
    actionSetFormData: (formData, formName) => {
      const state = get();
      const formState = state[formName];
      if (!formState) {
        return;
      }
      const { data } = formState;
      let newData: FormItem[] = [...data];
      formData.forEach((item) => {
        const { key, value } = item;
        const foundIndex = newData.findIndex((o) => o.key === key);
        newData =
          foundIndex > -1
            ? [...newData].map((o) => (o.key === key ? { ...o, value } : o)) // update
            : [...newData, item]; // create new
      });
      set({ [formName]: { ...formState, data: newData } });
    },
    actionSetIsSubmitting: (isSubmitting, formName) => {
      const state = get();
      const formState = state[formName];
      set({ [formName]: { ...formState, isSubmitting } });
    },
    actionInitFormData: (formName, initialValues) => {
      set({ [formName]: { data: [...initialValues], isSubmitting: false } });
    },
  }),
  "FormStore"
);

export const useForm = (formName: string, initialValues?: FormItem[]) => {
  const state = useStore();
  const formState: FormStateItem = state[formName] || {
    data: [],
    isSubmitting: false,
  };
  const { data, isSubmitting } = formState;
  const isDisabled = checkIsDisabledForm(data);
  React.useEffect(() => {
    state.actionInitFormData(formName, initialValues || []);
  }, [formName, initialValues]);
  return {
    data,
    isDisabled,
    isSubmitting,
    setFormData: (formData: FormItem[]) =>
      state.actionSetFormData(formData, formName),
    getValueByKey: (key: string) => data.find((i) => i.key === key)?.value,
    setFormSubmitting: (submitting: boolean) =>
      state.actionSetIsSubmitting(submitting, formName),
  };
};
