import React from "react";
import Loading from "components/core/Loading";
import { ITable, TableItem } from "./typings";

const CoreTable: React.FC<ITable> = (props: ITable) => {
  const {
    tableHeadItems = [],
    tableItems = [],
    maxItemsPerPage = 10,
    isLoading = false,
  } = props;
  const [page, setCurrentPage] = React.useState<number>(1);
  const size = tableHeadItems?.length || 0;
  const totalPage = React.useMemo(
    () => Math.ceil(tableItems.length / maxItemsPerPage),
    [tableItems, maxItemsPerPage]
  );
  const paginationData = React.useMemo(() => {
    const startPos = (page - 1) * maxItemsPerPage;
    const endPos = startPos + maxItemsPerPage;
    let paginationItems = tableItems.slice(startPos, endPos);
    if (page > 1 && page === totalPage) {
      const remain = maxItemsPerPage - paginationItems.length;
      paginationItems = [
        ...paginationItems,
        ...(remain > 0
          ? ([...Array(remain)].map((_, emptyIndex) => ({
              id: `empty-${emptyIndex}`,
              values: [],
              //  [...Array(size)].map((__, emptyValueIndex) => ({
              //   id: `empty-value-${emptyValueIndex}`,
              //   value: "",
              // })),
            })) as TableItem[])
          : []),
      ];
    }
    return {
      items: paginationItems,
      startPos,
      endPos,
    };
  }, [tableItems, maxItemsPerPage, page, totalPage]);
  const { items, startPos } = paginationData;
  return (
    <div className="table-core">
      {isLoading && (
        <div className="relative h-10 mb-5">
          <Loading />
        </div>
      )}
      <div
        className="table-head grid text-white font-medium text-sm bg-gray-500 h-auto min-h-[48px] items-center gap-4"
        style={{
          gridTemplateColumns: `min-content repeat(${size}, 1fr)`,
        }}
      >
        <div>#</div>
        {tableHeadItems.length > 0 && tableHeadItems.map(({ value }) => value)}
      </div>
      <div className="table-body">
        {items.length > 0 &&
          items.map(({ id, values, onClickItem }, index) => (
            <div
              key={id}
              className="grid cursor-pointer font-medium min-h-[40px] items-center text-sm hover:bg-gray-50 hover:font-medium hover:text-black hover:border-t-[0.5px] hover:border-t-transparent border-solid border-t-[0.5px] border-t-gray-300 gap-4"
              style={{
                gridTemplateColumns: `min-content repeat(${size}, 1fr)`,
              }}
              onClick={onClickItem}
            >
              <div>{index + startPos}</div>
              {values.length > 0 && values.map(({ value }) => value)}
            </div>
          ))}
      </div>
      {totalPage > 1 && (
        <div
          className="pagination grid justify-center items-center my-5"
          style={{ gridTemplateColumns: "36px auto 36px" }}
        >
          <i
            className="fa-solid fa-chevron-left text-left cursor-pointer"
            onClick={() => page > 1 && setCurrentPage(page - 1)}
          />
          <div className="cursor-pointe text-white text-lg p-1 rounded text-center w-auto h-7 flex justify-center items-center">
            <span className="text-blue-500">{page}</span>
            <span className="mx-1">/</span>
            <span className="text-white">{totalPage}</span>
          </div>
          <i
            className="fa-solid fa-chevron-right text-right cursor-pointer"
            onClick={() => page < totalPage && setCurrentPage(page + 1)}
          />
        </div>
      )}
    </div>
  );
};

export default React.memo(CoreTable);
