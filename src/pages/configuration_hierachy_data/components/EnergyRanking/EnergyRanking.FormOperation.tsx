import React from "react";
import { Form, Input } from "antd";
import { useValidatorInputNumber } from "components/antd/Input";
import { FormType } from "components/antd/Form";
import {
  ENERGY_RANKING_RECORD_COLUMN,
  ENERGY_RANKING_BUILDING_NAME,
  ENERGY_RANKING_ENERGY,
  ENERGY_RANKING_ENERGY_DENSITY,
} from "pages/hierachy_map";
import styles from "pages/configuration_hierachy_data/components/Region/Region.styles.module.scss";
import { useEnergyRankingConfiguration } from "./EnergyRanking.zustand";

const FormOperationRegion: React.FC<{
  form: FormType;
}> = ({ form: { formFields: fields, setFormFields: setFields } }) => {
  const [form] = Form.useForm();
  const {
    modalOperationEnergyRanking: { isCreate },
  } = useEnergyRankingConfiguration();
  const { validator: validatorInputNumber } = useValidatorInputNumber();
  return (
    <Form
      form={form}
      name="form-operation-geojson"
      fields={fields}
      onFieldsChange={(_, allFields) => setFields(allFields)}
      className={`form-operation-region ${styles.formOperationRegion}`}
    >
      <Form.Item
        label={ENERGY_RANKING_RECORD_COLUMN[ENERGY_RANKING_BUILDING_NAME]}
        name={ENERGY_RANKING_BUILDING_NAME}
      >
        <Input disabled={!isCreate} />
      </Form.Item>
      <Form.Item
        label={ENERGY_RANKING_RECORD_COLUMN[ENERGY_RANKING_ENERGY]}
        name={ENERGY_RANKING_ENERGY}
        rules={validatorInputNumber}
      >
        <Input className="ant-input-number" />
      </Form.Item>
      <Form.Item
        label={ENERGY_RANKING_RECORD_COLUMN[ENERGY_RANKING_ENERGY_DENSITY]}
        name={ENERGY_RANKING_ENERGY_DENSITY}
        rules={validatorInputNumber}
      >
        <Input className="ant-input-number" />
      </Form.Item>
    </Form>
  );
};

export default React.memo(FormOperationRegion);
