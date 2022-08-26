import { TabsProps, TabPaneProps } from "antd";

export type ITabPane = {
  key: string;
  tab: React.ReactNode | React.ReactElement | any;
} & TabPaneProps;

export type ITabs = {
  tabPanes: ITabPane[];
  onChangeTab?: (key: string) => any;
} & TabsProps;
