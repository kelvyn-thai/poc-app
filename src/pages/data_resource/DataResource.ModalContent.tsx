import React from "react";
import Button, { ICoreButtonProps } from "components/core/Button";
import { ModalContent, useModalStore } from "components/core/Modal";
import CoreInput from "components/core/Input";
import { createChart } from "database/tables/chart";
import { useReaderFile } from "hooks/useReaderFile";
import isNumber from "lodash/isNumber";
import isEmpty from "lodash/isEmpty";
import { useDataResourceStore } from "./DataResource.zustand";
import { useDataResource } from "./DataResource.hook";
import { ChartDataItem } from "./DataResource.typings";

const Content = () => {
  const { option, actionSetChartId } = useDataResourceStore();
  const [chartData, actionSetChartData] = React.useState<ChartDataItem[]>([]);
  const [isSaving, actionSetIsSaving] = React.useState(false);
  const isDisabled = React.useMemo(() => {
    switch (option) {
      case "sankey":
      case "bubble": {
        return isEmpty(chartData);
      }
      default:
        break;
    }
  }, [chartData, option]);
  const chartName = React.useMemo(
    () => chartData.find((i) => i.key === "name")?.value || "",
    [chartData]
  );
  const { readData } = useReaderFile();
  const { setVisibleModal } = useModalStore();
  const { handleGetCharts } = useDataResource();
  const setChartData = React.useCallback(
    (data: ChartDataItem[]) => {
      let newData: ChartDataItem[] = [...chartData];
      data.forEach(({ key, value }) => {
        const foundIndex = newData.findIndex((o) => o.key === key);
        newData =
          foundIndex > -1
            ? [...newData].map((o) => (o.key === key ? { ...o, value } : o)) // update
            : [...newData, { key, value }]; // create new
      });
      actionSetChartData(newData);
    },
    [chartData]
  );
  const renderExtra = React.useCallback(() => {
    switch (option) {
      case "sankey":
      case "bubble": {
        const obj = chartData.find((i) => i.key === "name");
        const title = obj?.value || "Upload file";
        return (
          <CoreInput
            label="Data"
            type="file"
            isRequired
            optionProps={
              {
                title,
                useToUploadFile: true,
                onHandleUploadFile: (
                  e: React.ChangeEvent<HTMLInputElement>
                ) => {
                  e.preventDefault();
                  const { files } = e.target;
                  if (files) {
                    readData({
                      files,
                      callbackSetData: async (jsonData: string, file: File) => {
                        setChartData([
                          {
                            key: "name",
                            value: file.name,
                          },
                          {
                            key: option,
                            value: jsonData,
                          },
                        ]);
                      },
                    });
                  }
                },
              } as ICoreButtonProps
            }
          />
        );
      }
      case "hexbin": {
        const geometryObj: ChartDataItem | undefined = chartData.find(
          (i) => i.key === "geometryFileName"
        );
        const geometryTitle = geometryObj?.value || "Upload *.json, *.geojson";
        const pointsObj: ChartDataItem | undefined = chartData.find(
          (i) => i.key === "name"
        );
        const pointsTitle = pointsObj?.value || "Upload *.csv";
        return (
          <>
            <CoreInput
              label="Geometry"
              type="file"
              isRequired
              optionProps={
                {
                  title: geometryTitle,
                  useToUploadFile: true,
                  onHandleUploadFile: (
                    e: React.ChangeEvent<HTMLInputElement>
                  ) => {
                    e.preventDefault();
                    const { files } = e.target;
                    if (files) {
                      readData({
                        files,
                        callbackSetData: async (
                          jsonData: string,
                          file: File
                        ) => {
                          setChartData([
                            {
                              key: "geometry",
                              value: jsonData,
                            },
                            {
                              key: "geometryFileName",
                              value: file.name,
                            },
                          ]);
                        },
                      });
                    }
                  },
                } as ICoreButtonProps
              }
            />
            <CoreInput
              label="Points"
              type="file"
              isRequired
              optionProps={
                {
                  title: pointsTitle,
                  useToUploadFile: true,
                  onHandleUploadFile: (
                    e: React.ChangeEvent<HTMLInputElement>
                  ) => {
                    e.preventDefault();
                    const { files } = e.target;
                    if (files) {
                      readData({
                        files,
                        callbackSetData: async (
                          jsonData: string,
                          file: File
                        ) => {
                          setChartData([
                            {
                              key: option,
                              value: jsonData,
                            },
                            {
                              key: "name",
                              value: file.name,
                            },
                          ]);
                        },
                      });
                    }
                  },
                } as ICoreButtonProps
              }
            />
          </>
        );
      }

      default:
        break;
    }
  }, [option, chartData]);
  const handleSaveData = React.useCallback(async () => {
    if (isSaving) {
      return;
    }
    actionSetIsSaving(true);
    const chartId = await createChart({
      data: JSON.stringify(chartData),
      type: option,
      name: chartName,
    });
    if (isNumber(chartId)) {
      actionSetChartId(chartId as unknown as number);
      setVisibleModal({ isVisible: false });
      handleGetCharts({});
    }
    actionSetIsSaving(false);
  }, [chartData, option, isSaving, handleGetCharts]);
  return (
    <ModalContent>
      <div className="form">
        <CoreInput
          label="Name"
          isRequired
          type="input"
          optionProps={
            {
              value: chartName,
              onChange: (e) =>
                setChartData([{ key: "name", value: e.target.value }]),
            } as React.InputHTMLAttributes<HTMLInputElement>
          }
        />
        {renderExtra()}
        <Button
          title={isSaving ? `Saving...` : `Save`}
          onClick={handleSaveData}
          isDisabled={isDisabled}
          className="ml-auto"
        />
      </div>
    </ModalContent>
  );
};

export default React.memo(Content);
