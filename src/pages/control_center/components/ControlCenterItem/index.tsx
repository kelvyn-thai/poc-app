import React from "react";
import GreyBoard from "assets/images/grey-board.png";
import { DeckToDevicesConnectionSvg } from "../Icons/DeckToDevicesConnectionSvg";
import { IControlCenterItem } from "./interface";
import styles from "./styles.module.scss";

const ControlCenterItem: React.FC<IControlCenterItem> = ({
  title,
  icon,
  devices,
  deviceIcons,
}) => (
  <div className="control-center-item">
    <div className="box-shadow-item py-[20px] px-[25px] h-[230px]">
      <div className="flex items-center mb-[25px] ">
        <div
          className={`${styles.icon} w-[24px] h-[24px] rounded-full flex items-center justify-center  mr-[10px]`}
        >
          {icon}
        </div>
        <span>{title}</span>
      </div>
      {devices.map(({ name, value }) => (
        <div
          className="flex items-center justify-between mb-[15px] last:mb-[0]"
          key={name}
        >
          <div>{name}</div>
          <div>{value}</div>
        </div>
      ))}
    </div>
    <div className="flex justify-center items-center">
      <DeckToDevicesConnectionSvg />
    </div>
    <div
      className={`${styles.boardOfDevices} relative h-[160px] bg-no-repeat bg-center bg-contain top-[-22px]`}
      style={{ backgroundImage: `url(${GreyBoard})` }}
    >
      {deviceIcons.map(({ icon: deviceIcon, className }) => (
        <div
          key={className}
          className={`bg-no-repeat bg-center bg-contain absolute ${className}`}
          style={{ backgroundImage: `url(${deviceIcon})` }}
        />
      ))}
    </div>
  </div>
);
export default React.memo(ControlCenterItem);
