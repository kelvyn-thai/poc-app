import { PlusOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import Table from "components/antd/Table";
import { ColumnsType } from "antd/lib/table";
import {
  formatterValueToLocaleString,
  Region,
  RegionResponse,
  REGION_ALERT_TICKETS,
  REGION_BUILDINGS,
  REGION_COORDINATES,
  REGION_ENERGY_CONSUMPTION,
  REGION_ENERGY_DENSITY_CONSUMPTION,
  REGION_FLOOR_AREA,
  REGION_NAME,
  REGION_OPEN_TICKETS,
  REGION_RECORD_COLUMN,
  useMutationAutoGenerateRegion,
  useMutationDeleteRegion,
  useRegionListData,
  useSelectedCountry,
} from "pages/hierachy_map";
import React from "react";
import { useQueryClient } from "@tanstack/react-query";
import ConfigurationModalOperationRegion from "./Region.Modal";
import { useConfigurationRegion } from "./Region.zustand";

const ConfigurationRegion = () => {
  const { setModalOperationRegion } = useConfigurationRegion();
  const queryClient = useQueryClient();
  const {
    country: { country },
  } = useSelectedCountry();
  const { regionList: dataSource, isLoading } = useRegionListData();
  const mutationAutoGenerateRegion = useMutationAutoGenerateRegion();
  const mutationDeleteRegion = useMutationDeleteRegion();
  const columns: ColumnsType<Region> = [
    {
      title: REGION_RECORD_COLUMN[REGION_NAME],
      dataIndex: REGION_NAME,
      key: REGION_NAME,
      render: (value) => value,
      fixed: "left",
    },
    {
      title: REGION_RECORD_COLUMN[REGION_COORDINATES],
      dataIndex: REGION_COORDINATES,
      key: REGION_COORDINATES,
      render: (value) => value,
      ellipsis: true,
      width: 200,
    },
    {
      title: REGION_RECORD_COLUMN[REGION_ENERGY_CONSUMPTION],
      dataIndex: REGION_ENERGY_CONSUMPTION,
      key: REGION_ENERGY_CONSUMPTION,
      render: (value) => formatterValueToLocaleString({ value, divide: 1 }),
      sorter: (a, b) =>
        b[REGION_ENERGY_CONSUMPTION] - a[REGION_ENERGY_CONSUMPTION],
      sortDirections: ["ascend", "descend"],
      defaultSortOrder: "descend",
    },
    {
      title: REGION_RECORD_COLUMN[REGION_ENERGY_DENSITY_CONSUMPTION],
      dataIndex: REGION_ENERGY_DENSITY_CONSUMPTION,
      key: REGION_ENERGY_DENSITY_CONSUMPTION,
      render: (value) => value,
    },
    {
      title: REGION_RECORD_COLUMN[REGION_OPEN_TICKETS],
      dataIndex: REGION_OPEN_TICKETS,
      key: REGION_OPEN_TICKETS,
      render: (value) => value,
    },
    {
      title: REGION_RECORD_COLUMN[REGION_ALERT_TICKETS],
      dataIndex: REGION_ALERT_TICKETS,
      key: REGION_ALERT_TICKETS,
      render: (value) => value,
    },
    {
      title: REGION_RECORD_COLUMN[REGION_BUILDINGS],
      dataIndex: REGION_BUILDINGS,
      key: REGION_BUILDINGS,
      render: (value) => value,
    },
    {
      title: REGION_RECORD_COLUMN[REGION_FLOOR_AREA],
      dataIndex: REGION_FLOOR_AREA,
      key: REGION_FLOOR_AREA,
      render: (value) => value,
    },
  ];
  return (
    <>
      <Space className="mb-5">
        <Button
          className="flex items-center"
          type="primary"
          icon={<PlusOutlined />}
          disabled
        >
          Add
        </Button>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => mutationAutoGenerateRegion.mutate()}
          loading={mutationAutoGenerateRegion.isLoading}
          className="flex items-center"
        >
          Auto fill
        </Button>
      </Space>
      <Table
        dataSource={dataSource.map((r) => ({ ...r, key: r.id }))}
        columns={columns}
        loading={isLoading}
        scroll={{ x: 1150 }}
        hasOperationColumn
        onEditRecord={(_, record) =>
          setModalOperationRegion({
            isVisible: true,
            isCreate: false,
            region: record,
          })
        }
        onRemoveRecord={(_, record) => {
          const key = ["region-details", record.regionname, country];
          queryClient.setQueryData(key, (res: RegionResponse | any) => ({
            ...res,
            data: undefined,
          }));
          mutationDeleteRegion.mutate(record.id);
        }}
      />
      <ConfigurationModalOperationRegion />
    </>
  );
};
export default React.memo(ConfigurationRegion);
