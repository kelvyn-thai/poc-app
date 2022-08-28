import React from "react";
import Tabs, { ITabPane } from "components/antd/Tabs";
import { Menu, Dropdown, Button } from "antd";
import Panels from "./components/Panels";
import {
  TAB_CERTIFICATES_REC,
  TAB_SUMMARY_REC,
  REPORTING_PERIOD_INPUT,
  REPORTING_PERIOD_INPUT1,
  REPORTING_PERIOD_INPUT2,
} from "./GeneralInfo.constant";
import Chart from "./components/Chart";
import "./GeneralInfo.style.scss";

const GeneralInfoTabs = React.memo(() => {
  const [selectedTab, setSelected] = React.useState(TAB_SUMMARY_REC.key);
  const onChangeTab = (tab: string) => {
    setSelected(tab);
  };
  const tabPanes = React.useMemo(
    (): ITabPane[] =>
      [TAB_SUMMARY_REC, TAB_CERTIFICATES_REC].map((i) => ({
        key: i.key,
        tab: i.value,
      })),
    []
  );
  return (
    <Tabs tabPanes={tabPanes} onChangeTab={onChangeTab} />
  );
});

export const ReportingPeriod = React.memo(() => {
  const [selected, setSelected] = React.useState(REPORTING_PERIOD_INPUT.key);
  const menuItems = React.useMemo(
    () =>
      [
        REPORTING_PERIOD_INPUT,
        REPORTING_PERIOD_INPUT1,
        REPORTING_PERIOD_INPUT2,
      ].map(({ key, value }) => ({ key, label: value })),
    []
  );
  return (
    <Dropdown
      overlay={
        <Menu
          selectedKeys={[selected]}
          onSelect={(info) => {
            setSelected(
              menuItems.find((i) => i.key === info.key)
                ?.label as unknown as string
            );
          }}
          selectable
          items={menuItems}
        />
      }
    >
      <Button type="primary">{selected}</Button>
    </Dropdown>
  );
});

const GeneralInfoPage = () => (
  <>
    <GeneralInfoTabs />
    <div className="main px-5">
      <ReportingPeriod />
      <Panels />
      <Chart />
    </div>
  </>
);

export default React.memo(GeneralInfoPage);
