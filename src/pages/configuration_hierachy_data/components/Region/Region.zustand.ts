import {
  REGION_ENERGY_CONSUMPTION,
  EnergyConsumptionUnit,
  RegionProperty,
} from "pages/hierachy_map";
import { createStore } from "zustand-store";
import { ModalOperationRegion } from "./Region.typings";

type IState = {
  modalOperationRegion: ModalOperationRegion;
  units: {
    [key: string]: any;
  };
};

interface IActions {
  setModalOperationRegion: (modalData: ModalOperationRegion) => any;
  setUnitsOperationRegion: (key: RegionProperty, value: any) => any;
}

const initialState = {
  modalOperationRegion: {
    isVisible: false,
    isCreate: false,
    region: undefined,
  },
  units: {
    [REGION_ENERGY_CONSUMPTION]: "baseWatt" as EnergyConsumptionUnit,
  },
};

export const [useConfigurationRegion, { getState, destroy }] = createStore<
  IState & IActions
>(
  (set, get) => ({
    ...initialState,
    setModalOperationRegion: (modalOperationRegion) => {
      const { isVisible } = modalOperationRegion;
      if (isVisible) {
        set({
          modalOperationRegion: {
            ...get().modalOperationRegion,
            ...modalOperationRegion,
          },
        });
      } else {
        set({ modalOperationRegion: { ...initialState.modalOperationRegion } });
      }
    },
    setUnitsOperationRegion: (key, value) => {
      const { units } = get();
      set({ units: { ...units, [key]: value } });
    },
    resetStore: () => set({ ...initialState }),
  }),
  "ConfigurationStore"
);

export const useUnitsOperationRegion = (key: RegionProperty) => {
  const { units, setUnitsOperationRegion } = useConfigurationRegion();
  const selectedUnit = units[key];
  return { selectedUnit, setUnitsOperationRegion };
};
