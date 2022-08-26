import React from "react";
import {
  ALERTS,
  ALERTS_DISPLAY_NAME,
  TICKETS,
  TICKETS_DISPLAY_NAME,
  useMutationAlertsAndTickets,
  useSelectedCountry,
} from "pages/hierachy_map";
import { useOperationFormControlled } from "components/antd/Form";
import { ModalControl } from "components/antd/Modal";
import { useAlertsAndTicketsStore } from "./AlertsAndTickets.zustand";
import ConfigurationFormOperationEnergyRanking from "./AlertsAndTickets.FormOperation";

const ModalOperation = () => {
  const {
    country: { country },
  } = useSelectedCountry();
  const {
    modalOperation: { isCreate, resource, isVisible },
    setModalOperation,
  } = useAlertsAndTicketsStore();
  const mutation = useMutationAlertsAndTickets(country);
  const form = useOperationFormControlled(
    [
      { name: ALERTS, value: "" },
      { name: TICKETS, value: "" },
      { name: ALERTS_DISPLAY_NAME, value: "" },
      { name: TICKETS_DISPLAY_NAME, value: "" },
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
        [ALERTS]: formFields[ALERTS],
        [ALERTS_DISPLAY_NAME]: formFields[ALERTS_DISPLAY_NAME],
        [TICKETS]: formFields[TICKETS],
        [TICKETS_DISPLAY_NAME]: formFields[TICKETS_DISPLAY_NAME],
      });
    } catch (error) {
      //
    }
  }, [form]);
  return (
    <ModalControl
      title="Form"
      visible={isVisible}
      onCancel={() => setModalOperation({ isVisible: false, isCreate })}
      okButtonProps={{ disabled }}
      onOk={async () => {
        await handleOperationRegion();
        setModalOperation({ isVisible: false, isCreate });
      }}
      confirmLoading={mutation.isLoading}
      destroyOnClose
    >
      <ConfigurationFormOperationEnergyRanking form={form} />
    </ModalControl>
  );
};

export default React.memo(ModalOperation);
