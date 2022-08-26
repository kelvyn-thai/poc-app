import React from "react";
import { createStore } from "zustand-store";
import { ModalType } from "./Modal.typings";

interface ModalState {
  isVisible: boolean;
  content?: React.ReactNode | React.ReactElement | any;
  data?: any;
  modalProps?: ModalType;
  isLoading: boolean;
}

interface ModalActions {
  setVisibleModal: ({
    isVisible,
    content,
    data,
    modalProps,
  }: {
    isVisible: boolean;
    content?: React.ReactNode | React.ReactElement | any;
    data?: any;
    modalProps?: ModalType;
  }) => void;
  setModalData: (data: any) => any;
  setConfirmLoadingModal: (loading: boolean) => any;
}

const initialState: ModalState = {
  isVisible: false,
  content: null,
  data: null,
  modalProps: undefined,
  isLoading: false,
};

export const [useModalStore] = createStore<ModalState & ModalActions>(
  (set) => ({
    ...initialState,
    setVisibleModal: ({ isVisible, ...rest }) => {
      if (isVisible) {
        set({ isVisible, ...rest });
      } else {
        set({ ...initialState });
      }
    },
    setModalData: (data) => set({ data }),
    setConfirmLoadingModal: (loading) => set({ isLoading: loading }),
  }),

  "useAntdModalStore"
);
