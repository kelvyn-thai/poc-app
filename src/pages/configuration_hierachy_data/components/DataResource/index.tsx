import React from "react";
import { Divider } from "antd";
import TableEnergyRanking from "pages/configuration_hierachy_data/components/EnergyRanking";
import AlertsAndTickets from "pages/configuration_hierachy_data/components/AlertsAndTickets";

const ConfigurationDataResource = () => (
  <>
    <AlertsAndTickets />
    <Divider plain />
    <TableEnergyRanking />
  </>
);

export default React.memo(ConfigurationDataResource);
