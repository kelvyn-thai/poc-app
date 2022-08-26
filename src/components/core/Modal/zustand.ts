import React from "react";
import { createStore } from "zustand-store";

interface ModalState {
  isVisible: boolean;
  content?: React.ReactNode | React.ReactElement | any;
  data?: any; // them data cho modal
}

interface ModalActions {
  setVisibleModal: ({
    isVisible,
    content,
  }: {
    isVisible: boolean;
    content?: React.ReactNode | React.ReactElement | any;
  }) => void;
  setModalData: (data: any) => any;
}

const initialState: ModalState = {
  isVisible: false,
  content: null,
  data: {},
};

export const [useModalStore] = createStore<ModalState & ModalActions>(
  (set) => ({
    ...initialState,
    setVisibleModal: ({ isVisible, content }) => set({ isVisible, content }),
    setModalData: (data) => set({ data }),
  }),
  "useModalStore"
);
