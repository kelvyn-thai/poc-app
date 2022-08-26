import React from "react";
import BreakLine from "components/core/BreakLine";

interface TabItem {
  key: string;
  value: string;
  children: React.ReactNode | React.ReactElement | any;
}

interface IProps {
  tabItems: TabItem[];
  onClickTabItem?: (value: string) => any;
}

const TabList: React.FC<IProps> = ({ tabItems, onClickTabItem }) => {
  const [defaultTab, setDefaultTab] = React.useState<string>(tabItems[0].key);
  return (
    <div className="tab">
      <div
        className="tab-header grid items-center gap-4 relative"
        style={{
          gridTemplateColumns: `repeat(${tabItems.length}, fit-content(100%))`,
        }}
      >
        {tabItems.map(({ value, key }) => (
          <div
            key={key}
            className={`tab-item cursor-pointer py-1 border-b-2 border-b-blue-500 border-solid ${
              key === defaultTab
                ? "border-b-blue-500"
                : "border-b-transparent opacity-50"
            }`}
            onClick={() => {
              setDefaultTab(key);
              if (typeof onClickTabItem === "function") {
                onClickTabItem(key);
              }
            }}
          >
            {value}
          </div>
        ))}
        <BreakLine className="absolute bottom-0 left-0 h-[2px] opacity-10" />
      </div>
      <div className="tab-content mt-5">
        {tabItems.find((t) => t.key === defaultTab)?.children}
      </div>
    </div>
  );
};

TabList.defaultProps = {
  onClickTabItem: undefined,
};

export default React.memo(TabList);
