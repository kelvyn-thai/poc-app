import { Modal } from "antd";
import React from "react";
import { CloseOutlined } from "@ant-design/icons";
import { useModalStore } from "./Modal.zustand";
import styles from "./Modal.styles.module.scss";

const BaseModal = () => {
  const {
    setVisibleModal,
    isVisible,
    content,
    modalProps,
    isLoading,
    setConfirmLoadingModal,
  } = useModalStore();
  if (!modalProps) {
    return null;
  }
  const { handleConfirm, title, ...rest } = modalProps;
  return (
    <Modal
      centered
      className={`antd-modal bg-primary-100 ${styles.antdModal}`}
      closeIcon={<CloseOutlined className="text-white" />}
      destroyOnClose
      title={<div className="ant-modal-title text-white">{title}</div>}
      forceRender
      visible={isVisible}
      onOk={async () => {
        setConfirmLoadingModal(true);
        if (typeof handleConfirm === "function") {
          await handleConfirm();
        }
        setConfirmLoadingModal(false);
      }}
      onCancel={() => setVisibleModal({ isVisible: false })}
      confirmLoading={isLoading}
      {...rest}
    >
      {content}
    </Modal>
  );
};
export default React.memo(BaseModal);
