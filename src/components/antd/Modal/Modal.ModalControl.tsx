import { Modal } from "antd";
import React from "react";
import { CloseOutlined } from "@ant-design/icons";
import styles from "./Modal.styles.module.scss";
import { ModalType } from "./Modal.typings";

const ModalControl: React.FC<ModalType> = ({ title, visible, ...rest }) =>
  visible ? (
    <Modal
      centered
      className={`antd-modal bg-primary-100 ${styles.antdModal}`}
      closeIcon={<CloseOutlined className="text-white" />}
      destroyOnClose
      title={<div className="ant-modal-title text-white">{title}</div>}
      forceRender
      visible={visible}
      {...rest}
    />
  ) : null;

export default React.memo(ModalControl);
