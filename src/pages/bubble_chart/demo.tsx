import React from "react";
import { useLoaderFile } from "hooks/useLoaderFile";
import D3Bubble from "components/charts/D3Bubble";
import { TypeBubbleItem } from "components/charts/D3Bubble/typings";
import flareCSV from "./flare.csv";

interface IState {
  data: TypeBubbleItem[];
  isLoading: boolean;
}

const ControlCenter4: React.FC = () => {
  const [state, setState] = React.useState<IState>({
    isLoading: true,
    data: [],
  });
  const { loadFile } = useLoaderFile();
  const handleFetchJSONData = React.useCallback(async () => {
    let jsonData = [];
    try {
      const jsonStringData = await loadFile({ url: flareCSV, type: "csv" });
      if (jsonStringData) {
        jsonData = JSON.parse(jsonStringData);
        if (jsonData.length > 0) {
          jsonData = jsonData.map((d: TypeBubbleItem) => {
            const { id, value } = d;
            const groupInfo = id.split(".") as any;
            const foo = [...groupInfo.pop().split(/(?=[A-Z][a-z])/g)];
            const label = [...foo, value.toLocaleString("en")].join("\n");
            const group = groupInfo[1];
            const link = `https://google.com/${label}`;
            const title = `${label}\n${value.toLocaleString("en")}`;
            return {
              ...d,
              label,
              group,
              link,
              title,
            };
          });
        }
      }
    } catch (error) {
      //
    } finally {
      setState({
        data: jsonData,
        isLoading: false,
      });
    }
  }, []);
  React.useEffect(() => {
    handleFetchJSONData();
  }, []);
  return (
    <D3Bubble
      data={state.data}
      chartName="Bubble Chart"
      isLoading={state.isLoading}
    />
  );
};

export default React.memo(ControlCenter4);
