import React from "react";
import {
  ENERGY_RANKING_BUILDING_NAME,
  ENERGY_RANKING_ENERGY,
  ENERGY_RANKING_ENERGY_DENSITY,
  useMutationOperationEnergyRanking,
  useSelectedCountry,
} from "pages/hierachy_map";
import { useOperationFormControlled } from "components/antd/Form";
import { ModalControl } from "components/antd/Modal";
import { useEnergyRankingConfiguration } from "./EnergyRanking.zustand";
import ConfigurationFormOperationEnergyRanking from "./EnergyRanking.FormOperation";

const ModalOperationEnergyRanking = () => {
  const {
    country: { country },
  } = useSelectedCountry();
  const {
    modalOperationEnergyRanking: { isCreate, resource, isVisible },
    setModalOperationEnergyRanking,
  } = useEnergyRankingConfiguration();
  const mutation = useMutationOperationEnergyRanking(country);
  const form = useOperationFormControlled(
    [
      { name: ENERGY_RANKING_BUILDING_NAME, value: "" },
      { name: ENERGY_RANKING_ENERGY, value: "" },
      { name: ENERGY_RANKING_ENERGY_DENSITY, value: "" },
    ],
    resource
  );
  const { disabled, getFieldsValue } = form;
  const handleOperationRegion = React.useCallback(async () => {
    try {
      if (disabled) {
        return;
      }
      const formFields = getFieldsValue();
      await mutation.mutateAsync({
        buildingname: formFields[ENERGY_RANKING_BUILDING_NAME],
        info: {
          [ENERGY_RANKING_ENERGY]: formFields[ENERGY_RANKING_ENERGY],
          [ENERGY_RANKING_ENERGY_DENSITY]:
            formFields[ENERGY_RANKING_ENERGY_DENSITY],
        },
      });
    } catch (error) {
      //
    }
  }, [form]);
  return (
    <ModalControl
      title="Form"
      visible={isVisible}
      onCancel={() =>
        setModalOperationEnergyRanking({ isVisible: false, isCreate })
      }
      okButtonProps={{ disabled }}
      onOk={async () => {
        await handleOperationRegion();
        setModalOperationEnergyRanking({ isVisible: false, isCreate });
      }}
      confirmLoading={mutation.isLoading}
      destroyOnClose
    >
      <ConfigurationFormOperationEnergyRanking form={form} />
    </ModalControl>
  );
};

export default React.memo(ModalOperationEnergyRanking);
