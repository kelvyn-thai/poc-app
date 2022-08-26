import React from "react";
import { ColumnsType } from "antd/lib/table";
import Table from "components/antd/Table";
import {
  EnergyRanking,
  ENERGY_RANKING_BUILDING_NAME,
  ENERGY_RANKING_ENERGY,
  ENERGY_RANKING_ENERGY_DENSITY,
  ENERGY_RANKING_RECORD_COLUMN,
  formatterValueToLocaleString,
  useMutationDeleteEnergyRanking,
  useQueryEnergyRanking,
  useSelectedCountry,
} from "pages/hierachy_map";
import { Button } from "antd";
import { useQueryClient } from "@tanstack/react-query";
import { useEnergyRankingConfiguration } from "./EnergyRanking.zustand";
import ModalOperationEnergyRanking from "./EnergyRanking.Modal";

const TableEnergyRanking = React.memo(() => {
  const {
    country: { country },
  } = useSelectedCountry();
  const queryClient = useQueryClient();
  const { setModalOperationEnergyRanking } = useEnergyRankingConfiguration();
  const { data: dataSource = [], isLoading } = useQueryEnergyRanking(country);
  const mutationDelete = useMutationDeleteEnergyRanking(country);
  const columns: ColumnsType<EnergyRanking> = [
    {
      title: ENERGY_RANKING_RECORD_COLUMN[ENERGY_RANKING_BUILDING_NAME],
      dataIndex: ENERGY_RANKING_BUILDING_NAME,
      key: ENERGY_RANKING_BUILDING_NAME,
    },
    {
      title: ENERGY_RANKING_RECORD_COLUMN[ENERGY_RANKING_ENERGY],
      dataIndex: ENERGY_RANKING_ENERGY,
      key: ENERGY_RANKING_ENERGY,
      render: (value) => formatterValueToLocaleString({ value, divide: 1 }),
      sorter: (a, b) => b[ENERGY_RANKING_ENERGY] - a[ENERGY_RANKING_ENERGY],
      sortDirections: ["ascend", "descend"],
      defaultSortOrder: "descend",
    },
    {
      title: ENERGY_RANKING_RECORD_COLUMN[ENERGY_RANKING_ENERGY_DENSITY],
      dataIndex: ENERGY_RANKING_ENERGY_DENSITY,
      key: ENERGY_RANKING_ENERGY_DENSITY,
      render: (value) => formatterValueToLocaleString({ value, divide: 1 }),
      sorter: (a, b) =>
        b[ENERGY_RANKING_ENERGY_DENSITY] - a[ENERGY_RANKING_ENERGY_DENSITY],
      sortDirections: ["ascend", "descend"],
      defaultSortOrder: "descend",
    },
  ];
  return (
    <>
      <Button
        type="primary"
        onClick={() =>
          setModalOperationEnergyRanking({ isVisible: true, isCreate: true })
        }
        className="mb-3"
      >
        New Record
      </Button>
      <Table
        dataSource={dataSource.map((r) => ({ ...r, key: r.id }))}
        columns={columns}
        loading={isLoading}
        hasOperationColumn
        onEditRecord={(_, record) =>
          setModalOperationEnergyRanking({
            isVisible: true,
            resource: record,
            isCreate: false,
          })
        }
        onRemoveRecord={(_, record) => {
          const key = [`energy-ranking-${country}`];
          queryClient.setQueryData(
            key,
            (data: any) =>
              data && data.filter((i: EnergyRanking) => i.id !== record.id)
          );
          mutationDelete.mutate(record.id);
        }}
      />
      <ModalOperationEnergyRanking />
    </>
  );
});

export default React.memo(TableEnergyRanking);
