export interface TableHeadItem {
  value: React.ReactElement | React.ReactNode | string | any;
}

export interface TableItem {
  id: string | any;
  values: React.ReactElement[] | React.ReactNode[] | string[] | any[];
  onClickItem?: (tableItemId: string | any) => any;
}

export interface ITable {
  tableHeadItems?: TableHeadItem[];
  tableItems?: TableItem[];
  maxItemsPerPage?: number;
  isLoading?: boolean;
}
