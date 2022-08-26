import { ButtonProps } from "antd";
import {
  DraggerProps,
  UploadChangeParam,
  UploadFile,
  UploadProps,
} from "antd/lib/upload";

export type IButton = {
  buttonType: string;
  useToUploadFile?: boolean;
  buttonProps?: ButtonProps;
  draggerProps?: {
    onChangeFile: (info: UploadChangeParam<UploadFile<any>> | any) => any;
  } & DraggerProps;
  uploadProps?: UploadProps;
};
