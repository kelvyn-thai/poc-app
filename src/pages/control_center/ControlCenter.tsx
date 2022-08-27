import React from "react";
import ControlCentreImgSrc from "assets/images/control-center.png";
import ChillerOffImgSrc from "assets/images/chiller-off.png";
import CHWPOffImgSrc from "assets/images/chwp-off.png";
import CTOffImgSrc from "assets/images/ct-off.png";
import AHUffImgSrc from "assets/images/ahu-off.png";
import VAVOffImgSrc from "assets/images/vav-off.png";
import FCUOffImgSrc from "assets/images/fcu-off.png";
import LightOnImgSrc from "assets/images/lighting-on.png";
import LightNightOffImgSrc from "assets/images/nightlight-off.png";
import MVOnImgSrc from "assets/images/mv-on.png";
import { useI18n } from "i18n";
import { LinesFiveSystemsSvg } from "./components/Icons/LinesFiveSystemsSvg";
import ControlCenterItem from "./components/ControlCenterItem";
import { ChillerPlantSvg } from "./components/Icons/ChillerPlantSvg";
import { AirSystemSvg } from "./components/Icons/AirSystemSvg";
import { LightingSvg } from "./components/Icons/LightingSvg";
import { MechanicalVentilationSvg } from "./components/Icons/MechanicalVentilationSvg";
import "./ControlCenter.style.scss";
import { IControlCenterItem } from "./components/ControlCenterItem/interface";

const controlCenterData: IControlCenterItem[] = [
  {
    title: "Chiller Plant",
    devices: [
      { name: "Chiller", value: "0/5" },
      { name: "CHWP", value: "0/5" },
      { name: "CT", value: "0/5" },
      { name: "CWP", value: "0/5" },
    ],
    icon: <ChillerPlantSvg />,
    deviceIcons: [
      {
        icon: ChillerOffImgSrc,
        className: "left-[100px] top-[12px] w-[65px] h-[55px]",
      },
      {
        icon: CHWPOffImgSrc,
        className: "left-[172px] top-[44px] w-[73px] h-[55px]",
      },
      {
        icon: CTOffImgSrc,
        className: "left-[26px] top-[50px] w-[60px] h-[51px]",
      },
      {
        icon: CHWPOffImgSrc,
        className: "left-[101px] top-[88px] w-[60px] h-[51px]",
      },
    ],
  },
  {
    title: "Air System",
    devices: [
      { name: "AHU", value: "0/37" },
      { name: "FAU", value: "0/3" },
      { name: "VAV", value: "0/13" },
      { name: "FCU", value: "0/12" },
    ],
    icon: <AirSystemSvg />,
    deviceIcons: [
      {
        icon: AHUffImgSrc,
        className: "left-[100px] top-[12px] w-[65px] h-[55px]",
      },
      {
        icon: AHUffImgSrc,
        className: "left-[172px] top-[44px] w-[73px] h-[55px]",
      },
      {
        icon: VAVOffImgSrc,
        className: "left-[26px] top-[50px] w-[60px] h-[51px]",
      },
      {
        icon: FCUOffImgSrc,
        className: "left-[101px] top-[88px] w-[60px] h-[51px]",
      },
    ],
  },
  {
    title: "VRV",
    devices: [{ name: "Outdoor Unit", value: "-/2" }],
    icon: <AirSystemSvg />,
    deviceIcons: [],
  },
  {
    title: "Lighting",
    devices: [
      { name: "Lighting", value: "2/4" },
      { name: "Night Lighting", value: "0/2" },
    ],
    icon: <LightingSvg />,
    deviceIcons: [
      {
        icon: LightOnImgSrc,
        className: "left-[42px] top-[-8px] w-[100px] h-[120px]",
      },
      {
        icon: LightNightOffImgSrc,
        className: "left-[147px] top-[-8px] w-[77px] h-[116px]",
      },
    ],
  },
  {
    title: "Mechanical Ventilation",
    devices: [
      { name: "Supply Fan", value: "3/4" },
      { name: "Exhaust Fan", value: "2/2" },
    ],
    icon: <MechanicalVentilationSvg />,
    deviceIcons: [
      {
        icon: MVOnImgSrc,
        className: "left-[72px] top-[29px] w-[52px] h-[69px]",
      },
      {
        icon: MVOnImgSrc,
        className: "left-[138px] top-[55px] w-[52px] h-[69px]",
      },
    ],
  },
];

const HomePage = React.memo(() => {
  const t = useI18n();
  return (
    <div>
      <div className="flex flex-col items-center">
        <div className="flex max-w-fit bg-[#212029] items-center shadow-[0_2px_20px_0_rgba(0,0,0,0.64)] py-[15px] px-[25px]">
          <div className="max-w-[60px] mr-[20px]">
            <img src={ControlCentreImgSrc} alt="" />
          </div>
          <span className="text-lg">{t("REMOTE_CONTROL_CONTROL_CENTRE")}</span>
        </div>
        <div>
          <LinesFiveSystemsSvg />
        </div>
        <div className="control-center-item grid w-[1368px] gap-[20px]">
          {controlCenterData.map((controlCenterItem) => (
            <ControlCenterItem
              key={controlCenterItem.title}
              {...controlCenterItem}
            />
          ))}
        </div>
      </div>
    </div>
  );
});

export default HomePage;
