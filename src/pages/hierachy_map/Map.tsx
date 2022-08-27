import React from "react";
import bg from "assets/images/background-map.png";
import "./Map.style.scss";
import HierachyMap from "./Map.HierachyMap";
import AlertsAndTickets from "./Map.AlertsAndTickets";
import Ranking from "./Map.Ranking";
import EnergyConsumption from "./Map.EnergyConsumption";

const MapPage = () => (
  <div className="relative map-page">
    <div
      className="bg-no-repeat bg-center bg-auto opacity-50 absolute left-0 top-0 w-[100%] h-[100%]"
      style={{
        backgroundImage: `url(${bg})`,
      }}
    />
    <div className="bg-flash" />
    <HierachyMap />
    <div className="extra grid gap-8 mt-5 absolute bottom-0 left-0 z-50 px-5 pb-3 extra">
      <EnergyConsumption />
      <Ranking />
      <AlertsAndTickets />
    </div>
  </div>
);
export default React.memo(MapPage);
