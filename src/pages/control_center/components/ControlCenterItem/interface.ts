import React from "react";

export interface IDevice {
  name: string;
  value: string;
}

export interface DeviceIcon {
  className?: string;
  icon: string;
}

export interface IControlCenterItem {
  title: string;
  icon: React.ReactNode | React.ReactElement | React.FC | any;
  deviceIcons: DeviceIcon[];
  devices: IDevice[];
}
