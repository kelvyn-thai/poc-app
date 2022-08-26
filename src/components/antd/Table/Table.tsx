import {
  DeleteOutlined,
  EditOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Popconfirm, Space, Table, TableProps } from "antd";
import { ColumnsType } from "antd/lib/table";
import React from "react";

const AntdTable: React.FC<
  TableProps<any> & {
    hasOperationColumn?: boolean;
    onEditRecord?: (value: any, record: any, index: number) => any;
    onRemoveRecord?: (value: any, record: any, index: number) => any;
  }
> = (props) => {
  const {
    dataSource,
    columns = [],
    onEditRecord,
    onRemoveRecord,
    hasOperationColumn,
    ...rest
  } = props;
  const columnsWithOperation: ColumnsType<any> = React.useMemo(
    () => [
      ...columns,
      {
        title: "",
        key: "operation",
        render: (...renderProps) => (
          <Space>
            {typeof onEditRecord === "function" && (
              <EditOutlined onClick={() => onEditRecord(...renderProps)} />
            )}

            {typeof onRemoveRecord === "function" && (
              <Popconfirm
                title="Are you sure to remove this record?"
                onConfirm={() => onRemoveRecord(...renderProps)}
              >
                <DeleteOutlined />
              </Popconfirm>
            )}
          </Space>
        ),
        fixed: "right",
      },
    ],
    [columns, hasOperationColumn, onEditRecord, onRemoveRecord]
  );
  const handleShowTotal = React.useCallback(
    (total: number) => (
      <div className="text-xs font-medium absolute left-0 ">Total: {total}</div>
    ),
    [dataSource]
  );
  const handleRenderPaginationItem = React.useCallback(
    (
      page: number,
      type: "page" | "prev" | "next" | "jump-prev" | "jump-next"
    ) => {
      switch (type) {
        case "page":
          return page;
        case "next":
          return <RightOutlined />;
        case "prev":
          return <LeftOutlined />;
        case "jump-next":
        case "jump-prev":
          return <>...</>;
        default:
          break;
      }
      return <div>{page}</div>;
    },
    [dataSource]
  );
  return (
    <Table
      size="small"
      pagination={{
        position: ["none" as any, "bottomCenter"],
        showTotal: handleShowTotal,
        itemRender: handleRenderPaginationItem,
      }}
      columns={hasOperationColumn ? columnsWithOperation : columns}
      dataSource={dataSource}
      {...rest}
    />
  );
};

AntdTable.defaultProps = {
  onEditRecord: undefined,
  onRemoveRecord: undefined,
  hasOperationColumn: false,
};

export default React.memo(AntdTable);
