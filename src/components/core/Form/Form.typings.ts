export type FormItem = {
  isRequired?: boolean;
  validate?: any[];
  key: string;
  value: any;
};

export type FormStateItem = {
  data: FormItem[];
  isSubmitting: boolean;
};
