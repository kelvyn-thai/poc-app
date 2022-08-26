import React from "react";
import { Button, Skeleton, Space } from "antd";
import {
  useSelectedCountry,
  useGeojsonRegions,
  useMutationUpdateActiveCountry,
} from "pages/hierachy_map";
import { D3HierachyChart3D } from "components/charts/D3Hierachy";
import { CheckCircleOutlined } from "@ant-design/icons";
import ConfigurationGeoInfoDragger from "./GeoInfo.Dragger";

const GeoInfo = () => {
  const { geojsonRegions, isLoading } = useGeojsonRegions();
  const {
    country: { actived, id },
  } = useSelectedCountry();
  const mutateUpdateActiveCountry = useMutationUpdateActiveCountry();
  return (
    <>
      <Space>
        <ConfigurationGeoInfoDragger isCreate={false} />
        <Button
          type="primary"
          loading={mutateUpdateActiveCountry.isLoading}
          onClick={() => mutateUpdateActiveCountry.mutate(id)}
          className={`bg-green flex items-center ${
            actived ? "ant-btn-actived" : ""
          }`}
          icon={<CheckCircleOutlined />}
        >
          {actived ? "Actived" : "Active"}
        </Button>
      </Space>
      {isLoading ? (
        <Skeleton className="mt-4" />
      ) : (
        <D3HierachyChart3D
          data={{
            hierachy: geojsonRegions,
            width: "auto",
            height: 480,
          }}
          classNameContainer="z-1"
        />
      )}
    </>
  );
};

export default React.memo(GeoInfo);
