import { ContainerOutlined } from "@ant-design/icons";
import React from "react";
import { MenuProps } from "./Menu.typings";
import "./Menu.style.scss";

const MenuCore: React.FC<MenuProps> = ({
  items,
  defaultItemKey = "",
  type,
}) => {
  const [defaultItem, setDefaultItem] = React.useState(
    defaultItemKey || items[0]?.key || ""
  );
  return (
    <div
      className={`menu-container flex ${
        type === "vertical" ? "menu-vertical" : "menu-horizontal"
      }`}
    >
      {items.map((item) => {
        const { key, label, onClickMenuItem } = item;
        const selected = defaultItem === key;
        return (
          <div
            key={key}
            onClick={() => {
              setDefaultItem(item.key);
              onClickMenuItem(item);
            }}
            className={`menu-item grid items-center cursor-pointer gap-3 px-5 ${
              selected ? "bg-blue-600" : ""
            } ${selected && "menu-item-selected"}`}
            style={{
              gridTemplateColumns: `min-content 1fr`,
            }}
          >
            <ContainerOutlined className="text-sm" />
            <span className="menu-item-label h-10 leading-10 truncate">
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default React.memo(MenuCore);
