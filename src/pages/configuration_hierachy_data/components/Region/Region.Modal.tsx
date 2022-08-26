import React from "react";
import { useOperationFormControlled } from "components/antd/Form";
import { ModalControl } from "components/antd/Modal";
import {
  EnergyConsumptionUnit,
  REGION_ALERT_TICKETS,
  REGION_BUILDINGS,
  REGION_ENERGY_CONSUMPTION,
  REGION_ENERGY_DENSITY_CONSUMPTION,
  REGION_FLOOR_AREA,
  REGION_NAME,
  REGION_OPEN_TICKETS,
  useMutationOperationRegion,
} from "pages/hierachy_map";
import { convertECByUnit } from "pages/hierachy_map/Map.utils";
import {
  useConfigurationRegion,
  useUnitsOperationRegion,
} from "./Region.zustand";
import ConfigurationFormOperationRegion from "./Region.FormOperation";

const OperationRegion = () => {
  const {
    modalOperationRegion: { isCreate, region, isVisible },
    setModalOperationRegion,
  } = useConfigurationRegion();
  const { selectedUnit: ecUnit } = useUnitsOperationRegion(
    REGION_ENERGY_CONSUMPTION
  );
  const mutationUpdateRegion = useMutationOperationRegion({ isCreate });
  const form = useOperationFormControlled(
    [
      { name: REGION_NAME, value: "" },
      { name: REGION_ENERGY_CONSUMPTION, value: "" },
      { name: REGION_ENERGY_DENSITY_CONSUMPTION, value: "" },
      { name: REGION_OPEN_TICKETS, value: "" },
      { name: REGION_ALERT_TICKETS, value: "" },
      { name: REGION_BUILDINGS, value: "" },
      { name: REGION_FLOOR_AREA, value: "" },
    ],
    region
  );
  const { disabled, getFieldsValue } = form;
  const handleOperationRegion = React.useCallback(async () => {
    try {
      if (disabled) {
        return;
      }
      const formFields = getFieldsValue();
      const { [REGION_ENERGY_CONSUMPTION]: ec } = formFields;
      const energyConsumption = convertECByUnit({
        value: ec,
        unit: ecUnit as EnergyConsumptionUnit,
      });
      await mutationUpdateRegion.mutateAsync({
        region: formFields[REGION_NAME],
        info: {
          [REGION_ENERGY_CONSUMPTION]: energyConsumption,
          [REGION_ENERGY_DENSITY_CONSUMPTION]:
            formFields[REGION_ENERGY_DENSITY_CONSUMPTION],
          [REGION_OPEN_TICKETS]: formFields[REGION_OPEN_TICKETS],
          [REGION_ALERT_TICKETS]: formFields[REGION_ALERT_TICKETS],
          [REGION_BUILDINGS]: formFields[REGION_BUILDINGS],
          [REGION_FLOOR_AREA]: formFields[REGION_FLOOR_AREA],
        },
      });
    } catch (error) {
      //
    }
  }, [disabled, ecUnit]);
  return (
    <ModalControl
      title="Form"
      visible={isVisible}
      onCancel={() => setModalOperationRegion({ isVisible: false, isCreate })}
      okButtonProps={{ disabled }}
      onOk={async () => {
        await handleOperationRegion();
        setModalOperationRegion({ isVisible: false, isCreate });
      }}
      confirmLoading={mutationUpdateRegion.isLoading}
      destroyOnClose
    >
      <ConfigurationFormOperationRegion
        isCreate={isCreate}
        region={region}
        form={form}
      />
    </ModalControl>
  );
};

export default React.memo(OperationRegion);
