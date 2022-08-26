import { ModalProps } from "antd";

export type ModalType = {
  handleConfirm?: () => any;
} & ModalProps;
