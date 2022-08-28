import { InboxOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { ModalControl } from "components/antd/Modal";
import { useReaderFile } from "hooks/useReaderFile";
import { FormType, useOperationFormControlled } from "components/antd/Form";
import { Upload, Button, Input, Form, Row } from "antd";
import { RcFile } from "antd/lib/upload";
import {
  GEOJSON_INFO_COUNTRY,
  GEOJSON_INFO_DATA,
  GEOJSON_INFO_RECORD_COLUMN,
  useMutationOperationGeojsonMapOfACountry,
  useSelectedCountry,
} from "pages/hierachy_map";
import React from "react";
import ErrorBoundary from "components/core/ErrorBoundary";
import "./GeoInfo.style.scss";

type GeoInfoDraggerProps = {
  isCreate: boolean;
};

const DraggerForm = ({
  isCreate,
  form: { formFields: fields, setFormFields: setFields },
  setGeojsonCountry,
}: {
  isCreate: boolean;
  form: FormType;
  setGeojsonCountry: React.Dispatch<React.SetStateAction<any>>;
}) => {
  const [form] = Form.useForm();
  const { readData, handleValidateAcceptType } = useReaderFile();
  return (
    <ErrorBoundary>
      <Form
        form={form}
        name="form-operation-geojson"
        fields={fields}
        onFieldsChange={(_, allFields) => setFields(allFields)}
      >
        <Form.Item
          label={GEOJSON_INFO_RECORD_COLUMN[GEOJSON_INFO_COUNTRY]}
          name={GEOJSON_INFO_COUNTRY}
          rules={[{ required: true, message: "Please input country's name!" }]}
        >
          <Input disabled={!isCreate} />
        </Form.Item>
        <Form.Item label={GEOJSON_INFO_RECORD_COLUMN[GEOJSON_INFO_DATA]}>
          <Upload.Dragger
            className="antd-dragger bg-primary-100"
            beforeUpload={(file: RcFile, files: RcFile[]) => {
              const isJSONFile = handleValidateAcceptType(
                file,
                "application/json"
              );
              if (!isJSONFile) {
                return Upload.LIST_IGNORE;
              }
              readData({
                files,
                callbackSetData: (jsonData: string) => {
                  const jsonParse = JSON.parse(jsonData);
                  setGeojsonCountry(jsonParse);
                },
              });
              return false;
            }}
            multiple={false}
            maxCount={1}
            accept="application/json"
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload.
            </p>
          </Upload.Dragger>
        </Form.Item>
      </Form>
    </ErrorBoundary>
  );
};

const GeoInfoDragger: React.FC<GeoInfoDraggerProps> = ({ isCreate }) => {
  const [isVisible, setVisibleModal] = React.useState(false);
  const mutation = useMutationOperationGeojsonMapOfACountry({ isCreate });
  const {
    country: { country: defaultCountry },
  } = useSelectedCountry();
  const [geojsonCountry, setGeojsonCountry] = React.useState({});
  const initialValues = React.useMemo(
    () =>
      isCreate && defaultCountry
        ? undefined
        : { [GEOJSON_INFO_COUNTRY]: defaultCountry },
    [defaultCountry, isCreate]
  );
  const form = useOperationFormControlled(
    [
      { name: GEOJSON_INFO_COUNTRY, value: "" },
      { name: GEOJSON_INFO_DATA, value: "" },
    ],
    initialValues
  );
  const { disabled, getFieldsValue } = form;
  const handleCreateGeojsonMapOfACountry = React.useCallback(async () => {
    try {
      if (disabled) {
        return;
      }
      const formFields = getFieldsValue();
      await mutation.mutateAsync({
        [GEOJSON_INFO_COUNTRY]: formFields[GEOJSON_INFO_COUNTRY],
        [GEOJSON_INFO_DATA]: geojsonCountry,
      });
    } catch (error) {
      //
    }
  }, [disabled, getFieldsValue, geojsonCountry]);
  return (
    <Row>
      <Button
        type="primary"
        className="flex items-center"
        icon={isCreate ? <PlusOutlined /> : <UploadOutlined />}
        onClick={() => setVisibleModal(true)}
      >
        {isCreate ? "Add new" : "Upload geojson"}
      </Button>
      <ModalControl
        title="Form"
        visible={isVisible}
        onCancel={() => setVisibleModal(false)}
        okButtonProps={{ disabled }}
        onOk={async () => {
          await handleCreateGeojsonMapOfACountry();
          setVisibleModal(false);
        }}
        confirmLoading={mutation.isLoading}
      >
        <DraggerForm
          isCreate={isCreate}
          form={form}
          setGeojsonCountry={setGeojsonCountry}
        />
      </ModalControl>
    </Row>
  );
};

export default React.memo(GeoInfoDragger);
