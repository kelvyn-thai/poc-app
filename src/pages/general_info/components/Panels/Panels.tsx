import React from "react";
import { AntDesignOutlined } from "@ant-design/icons";
import { PanelItem } from "./Panels.typings";
import "./Panels.style.scss";

const Panel: React.FC<PanelItem> = ({ icon, title, value, unit }) => (
  <div className="panel-item grid gap-5 items-center justify-self-center">
    {icon}
    <div className="extra">
      <div className="panel-item-hook grid gap-2 mb-1 items-center">
        <div className="sub-font text-2xl">{value}</div>
        {unit && <span className="text-sm mb-1">{unit}</span>}
      </div>
      <div className="text-sm text-gray-500">{title}</div>
    </div>
  </div>
);

const data: PanelItem[] = [
  {
    id: "1",
    icon: <AntDesignOutlined />,
    title: "Carbon emission",
    value: 4096,
    unit: "kw",
  },
  {
    id: "2",
    icon: <AntDesignOutlined />,
    title: "Retired RECs",
    value: 2014,
    unit: "",
  },
  {
    id: "3",
    icon: <AntDesignOutlined />,
    title: "Total cost of retired RECs",
    value: 4096,
    unit: "$",
  },
  {
    id: "4",
    icon: <AntDesignOutlined />,
    title: "Average cost/REC",
    value: 4096,
    unit: "$",
  },
];

const Panels = () => (
  <div className="panels my-10 grid gap-5 grid-cols-4 box-shadow py-5">
    {data.map((i) => (
      <Panel {...i} key={i.id} />
    ))}
  </div>
);

export default React.memo(Panels);
