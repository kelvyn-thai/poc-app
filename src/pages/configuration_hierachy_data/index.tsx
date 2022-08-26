import React from "react";
import { Row, Col, Popconfirm, Tooltip } from "antd";
import Tabs, { ITabPane } from "components/antd/Tabs";
import {
  Country,
  useCountryStatusList,
  useMutationDeleteCountry,
  useMapStore,
} from "pages/hierachy_map";
import { DataNode } from "antd/lib/tree";
import Tree from "components/antd/Tree";
import { CheckCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import GeoInfo, { GeoInfoDragger } from "./components/GeoInfo";
import Region from "./components/Region";
import ConfigurationDataResource from "./components/DataResource";

const TreeCountryList = React.memo(() => {
  const { data: countries = [] } = useCountryStatusList();
  const mutationDeleteCountry = useMutationDeleteCountry();
  const { country: activedCountryId, actionSetSelectedCountry } = useMapStore();
  const treeData: DataNode[] = React.useMemo(
    () =>
      countries?.map((c: Country) => {
        const { id, country } = c;
        return {
          title: country,
          key: id,
        };
      }) || [],
    [countries]
  );
  const handleRenderTitle = React.useCallback(
    (node: DataNode) => {
      const isSelected = node.key === activedCountryId;
      const isActived = countries.find((c) => c.id === node.key)?.actived;
      return (
        <div
          key={node.key}
          className={`ant-tree-title-container grid gap-2 items-center h-8 px-2 ${
            isSelected ? "bg-primary-1000" : "transparent"
          }`}
          style={{ gridTemplateColumns: `2fr 24px 24px` }}
        >
          <div
            className={`ant-tree-title-text cursor-pointer truncate text-sm ${
              isSelected ? "text-white font-medium" : "text-gray-400"
            }`}
          >
            {node.title as React.ReactNode}
          </div>
          {isActived ? (
            <Tooltip title="Country actived">
              <CheckCircleOutlined />
            </Tooltip>
          ) : (
            <span />
          )}
          <Popconfirm
            title="Are you sure to delete this item?"
            onConfirm={() => mutationDeleteCountry.mutate(node.key as number)}
            okText="Yes"
            cancelText="No"
            okButtonProps={{ loading: mutationDeleteCountry.isLoading }}
          >
            <DeleteOutlined />
          </Popconfirm>
        </div>
      );
    },
    [activedCountryId, mutationDeleteCountry, countries]
  );
  return (
    <Tree
      treeData={treeData}
      onSelectKey={(keys) => {
        const countryId = keys[0] as number;
        actionSetSelectedCountry(countryId);
      }}
      titleRender={handleRenderTitle}
    />
  );
});

const AntdConfiguration = () => {
  const tabPanes: ITabPane[] = React.useMemo(
    () => [
      {
        tab: "Geometry",
        key: "geometry",
        children: <GeoInfo />,
      },
      {
        tab: "Region",
        key: "region",
        children: <Region />,
      },
      {
        tab: "Data resource",
        key: "data_resource",
        children: <ConfigurationDataResource />,
      },
    ],
    []
  );

  return (
    <div>
      <GeoInfoDragger isCreate />
      <Row className="mt-5">
        <Col span={6} className="p-3 bg-primary-900 min-h-[600px] h-auto">
          <TreeCountryList />
        </Col>
        <Col span={18} className="pl-5">
          <Tabs tabPanes={tabPanes} />
        </Col>
      </Row>
    </div>
  );
};

export default React.memo(AntdConfiguration);
