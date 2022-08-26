import React from "react";
import { Tabs } from "antd";
import { ITabs } from "./Tabs.typings";

const { TabPane } = Tabs;

const AntdTabs: React.FC<ITabs> = ({
  tabPanes,
  onChangeTab = undefined,
  ...rest
}) => {
  const [tabSelected, setTabSelected] = React.useState(tabPanes[0].key);
  const onChange = React.useCallback(
    (key: string) => {
      setTabSelected(key);
      if (typeof onChangeTab === "function") {
        onChangeTab(key);
      }
    },
    [onChangeTab]
  );
  return (
    <Tabs
      defaultActiveKey={tabSelected}
      activeKey={tabSelected}
      onChange={onChange}
      destroyInactiveTabPane
      {...rest}
    >
      {tabPanes.map(({ key, tab, children, ...restTabPane }) => {
        const isSelected = key === tabSelected;
        return (
          <TabPane
            key={key}
            tab={
              <div
                className={`${
                  isSelected ? "text-white font-medium" : "text-gray-400"
                }`}
              >
                {tab}
              </div>
            }
            {...restTabPane}
          >
            {children && children}
          </TabPane>
        );
      })}
    </Tabs>
  );
};

export default React.memo(AntdTabs);
