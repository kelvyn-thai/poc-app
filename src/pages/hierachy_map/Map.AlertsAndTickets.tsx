import Panel from "components/core/Panel";
import React from "react";
import style from "./Map.style.module.scss";
import { useActivedCountry, useQueryAlertsAndTicketsData } from "./Map.hooks";

const AlertsAndTickets = () => {
  const { countryName: country } = useActivedCountry();
  const {
    alertsFormatted,
    ticketsFormatted,
    alertsDisplayName,
    ticketsDisplayName,
    isLoading,
  } = useQueryAlertsAndTicketsData(country);
  return (
    <Panel
      title={`${alertsDisplayName} & ${ticketsDisplayName}`}
      isLoading={isLoading}
      classNameBlockTitle="mb-3"
      panelTitleClassName="text-base"
    >
      <div
        className={`grid items-center gap-8 justify-center abs-center ${style.blockAlertsAndTickets} w-[100%]`}
      >
        {[
          {
            label: `Total ${alertsDisplayName}`,
            value: alertsFormatted,
            sub: "",
            icon: (
              <i className="fa-solid fa-triangle-exclamation text-red-500 fa-2x" />
            ),
          },
          {
            label: `Total ${ticketsDisplayName}`,
            value: ticketsFormatted,
            sub: "",
            icon: <i className="fa-solid fa-list text-yellow-500 fa-2x" />,
          },
        ].map(({ label, value, sub, icon }, index) => (
          <div
            key={label}
            className={`flex flex-col justify-center items-center ${
              index === 0 ? "justify-self-end" : "justify-self-start"
            }`}
          >
            <div className="text-sm text-gray-500 font-medium mb-2">
              {label}
            </div>
            <div
              className={`grid items-center gap-3 ${style.alertAndTicketExtra}`}
            >
              <div>{icon}</div>
              <div className="text-2xl sub-font font-medium truncate text-center">
                {value}
              </div>
              <div className="text-xs text-gray-500">{sub}</div>
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
};

export default React.memo(AlertsAndTickets);
