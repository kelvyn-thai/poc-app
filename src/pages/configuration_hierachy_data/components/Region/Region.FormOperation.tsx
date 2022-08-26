import React from "react";
import { Form, Input, Select, Space, Tooltip } from "antd";
import { useValidatorInputNumber } from "components/antd/Input";
import { FormType } from "components/antd/Form";
import {
  EnergyConsumptionUnit,
  Region,
  REGION_RECORD_COLUMN,
  REGION_BUILDINGS,
  REGION_ENERGY_CONSUMPTION,
  REGION_ENERGY_DENSITY_CONSUMPTION,
  REGION_FLOOR_AREA,
  REGION_NAME,
  REGION_OPEN_TICKETS,
  REGION_ALERT_TICKETS,
} from "pages/hierachy_map";
import {
  convertECByUnit,
  EC_UNITS,
  formatterValueToLocaleString,
} from "pages/hierachy_map/Map.utils";
import styles from "./Region.styles.module.scss";
import {
  useConfigurationRegion,
  useUnitsOperationRegion,
} from "./Region.zustand";

const { Option } = Select;

const FormOperationRegion: React.FC<{
  form: FormType;
  isCreate: boolean;
  region?: Region;
}> = ({
  form: { getFieldValue, formFields: fields, setFormFields: setFields },
  isCreate,
  region,
}) => {
  const [form] = Form.useForm();
  const {
    modalOperationRegion: { isVisible },
  } = useConfigurationRegion();
  const isUpdated = !isCreate && region && isVisible;
  const { validator: validatorInputNumber } = useValidatorInputNumber();
  const { selectedUnit: ecUnit, setUnitsOperationRegion: setEcUnit } =
    useUnitsOperationRegion(REGION_ENERGY_CONSUMPTION);
  const ec = getFieldValue(REGION_ENERGY_CONSUMPTION);
  const ecConverted = convertECByUnit({
    value: ec,
    unit: ecUnit as EnergyConsumptionUnit,
  });
  return (
    <Form
      form={form}
      name="form-operation-geojson"
      fields={fields}
      onFieldsChange={(_, allFields) => setFields(allFields)}
      className={`form-operation-region ${styles.formOperationRegion}`}
    >
      <Form.Item label={REGION_RECORD_COLUMN[REGION_NAME]} name={REGION_NAME}>
        <Input disabled={!isCreate} />
      </Form.Item>
      <Form.Item
        label={REGION_RECORD_COLUMN[REGION_ENERGY_CONSUMPTION]}
        name={REGION_ENERGY_CONSUMPTION}
        rules={validatorInputNumber}
      >
        <Space>
          <Input
            defaultValue={isUpdated ? region[REGION_ENERGY_CONSUMPTION] : ""}
            className="ant-input-number"
          />
          <Tooltip
            title={`Equivalent ${formatterValueToLocaleString({
              value: ecConverted,
              divide: 1,
            })} ${EC_UNITS.baseWatt}`}
          >
            <Select
              defaultValue={ecUnit}
              onChange={(unit) => setEcUnit(REGION_ENERGY_CONSUMPTION, unit)}
              className="w-[70px]"
            >
              {Object.entries(EC_UNITS).map(([key, value]) => (
                <Option key={key} value={key}>
                  {value}
                </Option>
              ))}
            </Select>
          </Tooltip>
        </Space>
      </Form.Item>
      <Form.Item
        label={REGION_RECORD_COLUMN[REGION_ENERGY_DENSITY_CONSUMPTION]}
        name={REGION_ENERGY_DENSITY_CONSUMPTION}
        rules={validatorInputNumber}
      >
        <Input className="ant-input-number" />
      </Form.Item>
      <Form.Item
        label={REGION_RECORD_COLUMN[REGION_OPEN_TICKETS]}
        name={REGION_OPEN_TICKETS}
        rules={validatorInputNumber}
      >
        <Input className="ant-input-number" />
      </Form.Item>
      <Form.Item
        label={REGION_RECORD_COLUMN[REGION_ALERT_TICKETS]}
        name={REGION_ALERT_TICKETS}
        rules={validatorInputNumber}
      >
        <Input className="ant-input-number" />
      </Form.Item>
      <Form.Item
        label={REGION_RECORD_COLUMN[REGION_BUILDINGS]}
        name={REGION_BUILDINGS}
        rules={validatorInputNumber}
      >
        <Input className="ant-input-number" />
      </Form.Item>
      <Form.Item
        label={REGION_RECORD_COLUMN[REGION_FLOOR_AREA]}
        name={REGION_FLOOR_AREA}
        rules={validatorInputNumber}
      >
        <Input className="ant-input-number" />
      </Form.Item>
    </Form>
  );
};

FormOperationRegion.defaultProps = {
  region: undefined,
};

export default React.memo(FormOperationRegion);
