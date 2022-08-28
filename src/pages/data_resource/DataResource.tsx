import Button from "components/core/Button";
import React from "react";
import { useModalStore } from "components/core/Modal";
import Dropdown from "components/core/Dropdown";
import { Space } from "antd";
import Content from "./DataResource.ModalContent";
import Table from "./DataResource.Table";
import { ChartOption } from "./DataResource.typings";
import { useDataResourceStore } from "./DataResource.zustand";
import { CHART_OPTIONS } from "./DataResource.constants";
import { useDataResource } from "./DataResource.hook";

const DataResource = () => {
  const { setVisibleModal } = useModalStore();
  const { option, actionSetChartName, actionSetOption } =
    useDataResourceStore();
  const { handleGetCharts } = useDataResource();
  const chartOptions = React.useMemo(
    () =>
      CHART_OPTIONS.map((chartOption) => ({
        id: chartOption,
        value: chartOption,
        label: chartOption,
      })),
    []
  );
  return (
    <div className="bg-transparent text-white">
      <Space>
        <Dropdown
          defaultSelected={option}
          onSelectOption={(value) => {
            const type = value as ChartOption;
            actionSetOption(type);
            actionSetChartName("");
            handleGetCharts({ type });
          }}
          options={chartOptions}
        />
        <Button
          title="+ New data resource"
          onClick={() =>
            setVisibleModal({ isVisible: true, content: <Content /> })
          }
          className="mb-4"
        />
      </Space>
      <Table />
    </div>
  );
};

export default React.memo(DataResource);
