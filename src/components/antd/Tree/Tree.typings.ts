import { TreeProps } from "antd";
import { Key } from "antd/lib/table/interface";

export type ITree = {
  onSelectKey: (keys: Key[]) => any;
} & TreeProps;
