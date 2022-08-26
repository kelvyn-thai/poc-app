import {
  REGION_ENERGY_CONSUMPTION,
  EnergyConsumptionUnit,
} from "pages/hierachy_map";
import { createStore } from "zustand-store";
import { ModalOperationEnergyRanking } from "./EnergyRanking.typings";

type IState = {
  modalOperationEnergyRanking: ModalOperationEnergyRanking;
};

interface IActions {
  setModalOperationEnergyRanking: (
    modalData: ModalOperationEnergyRanking
  ) => any;
  resetStore: () => any;
}

const initialState = {
  units: {
    [REGION_ENERGY_CONSUMPTION]: "baseWatt" as EnergyConsumptionUnit,
  },
  modalOperationEnergyRanking: {
    isVisible: false,
    isCreate: false,
    resource: undefined,
  },
};

export const [useEnergyRankingConfiguration, { getState, destroy }] =
  createStore<IState & IActions>(
    (set, get) => ({
      ...initialState,
      setModalOperationEnergyRanking: (modalOperationEnergyRanking) => {
        const { isVisible } = modalOperationEnergyRanking;
        if (isVisible) {
          set({
            modalOperationEnergyRanking: {
              ...get().modalOperationEnergyRanking,
              ...modalOperationEnergyRanking,
            },
          });
        } else {
          set({
            modalOperationEnergyRanking: {
              ...initialState.modalOperationEnergyRanking,
            },
          });
        }
      },
      resetStore: () => set({ ...initialState }),
    }),
    "ConfigurationStore"
  );
