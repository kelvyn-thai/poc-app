import { createStore } from "zustand-store";
import { ModalOperation } from "./AlertsAndTickets.typings";

type IState = {
  modalOperation: ModalOperation;
};

interface IActions {
  setModalOperation: (modalData: ModalOperation) => any;
}

const initialState = {
  modalOperation: {
    isVisible: false,
    isCreate: false,
    resource: undefined,
  },
};

export const [useAlertsAndTicketsStore, { getState, destroy }] = createStore<
  IState & IActions
>(
  (set, get) => ({
    ...initialState,
    setModalOperation: (modalOperation) => {
      const { isVisible } = modalOperation;
      if (isVisible) {
        set({
          modalOperation: {
            ...get().modalOperation,
            ...modalOperation,
          },
        });
      } else {
        set({
          modalOperation: {
            ...initialState.modalOperation,
          },
        });
      }
    },
  }),
  "AlertsAndTicketsConfigurationStore"
);
