import React from "react";
import { Col, Form, Input, Row } from "antd";
import {
  useValidatorInput,
  useValidatorInputNumber,
} from "components/antd/Input";
import { FormType } from "components/antd/Form";
import {
  ALERTS,
  TICKETS,
  ALERT_AND_TICKETS_RECORD_COLUMN,
  ALERTS_DISPLAY_NAME,
  DISPLAY_NAME,
  TICKETS_DISPLAY_NAME,
} from "pages/hierachy_map";
import styles from "./AlertsAndTickets.styles.module.scss";

const FormOperationRegion: React.FC<{
  form: FormType;
}> = ({ form: { formFields: fields, setFormFields: setFields } }) => {
  const [form] = Form.useForm();
  const { validator: validatorInputNumber } = useValidatorInputNumber();
  const { validator: validatorInput } = useValidatorInput();
  return (
    <Form
      form={form}
      name="form-operation-geojson"
      fields={fields}
      onFieldsChange={(_, allFields) => setFields(allFields)}
      className={`form-operation-region ${styles.formOperation}`}
    >
      <Row gutter={16 + 8 * 2}>
        <Col span={12}>
          <Form.Item
            label={ALERT_AND_TICKETS_RECORD_COLUMN[ALERTS]}
            name={ALERTS}
            rules={validatorInputNumber}
          >
            <Input className="ant-input-number" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={ALERT_AND_TICKETS_RECORD_COLUMN[DISPLAY_NAME]}
            name={ALERTS_DISPLAY_NAME}
            rules={validatorInput}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16 + 8 * 2}>
        <Col span={12}>
          <Form.Item
            label={ALERT_AND_TICKETS_RECORD_COLUMN[TICKETS]}
            name={TICKETS}
            rules={validatorInputNumber}
          >
            <Input className="ant-input-number" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={ALERT_AND_TICKETS_RECORD_COLUMN[DISPLAY_NAME]}
            name={TICKETS_DISPLAY_NAME}
            rules={validatorInput}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default React.memo(FormOperationRegion);
