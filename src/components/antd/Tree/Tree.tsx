/* eslint-disable react/no-unstable-nested-components */
import { Tree } from "antd";
import { CaretDownFilled } from "@ant-design/icons";
import React from "react";
import { DataNode } from "antd/lib/tree";
import { Key } from "rc-tree/lib/interface";
import { ITree } from "./Tree.typings";

const TitleRender = React.memo(
  ({ keys, node }: { keys: Key[]; node: DataNode }) => {
    const isSelected = keys[0] === node.key;
    return (
      <div
        key={node.key}
        className={`${isSelected ? "text-white font-medium" : "text-gray-400"}`}
      >
        {node.title as React.ReactNode}
      </div>
    );
  }
);

const AntdTree: React.FC<ITree> = ({ onSelectKey, treeData = [], ...rest }) => {
  const [keys, setSelectedKeys] = React.useState<Key[]>([]);
  React.useEffect(() => {
    setSelectedKeys([treeData[0]?.key]);
  }, [treeData]);
  return (
    <Tree
      defaultExpandAll={false}
      onSelect={(selectedKeys) => {
        if (selectedKeys?.length > 0) {
          setSelectedKeys(selectedKeys);
          if (typeof onSelectKey === "function") {
            onSelectKey(selectedKeys);
          }
        }
      }}
      titleRender={(node: DataNode) => <TitleRender {...{ node, keys }} />}
      switcherIcon={<CaretDownFilled className="text-white" />}
      treeData={treeData}
      defaultSelectedKeys={keys}
      {...rest}
    />
  );
};

export default React.memo(AntdTree);
